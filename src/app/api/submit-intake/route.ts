import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(request: Request) {
  try {
    const formData = await request.json();
    const { email, name } = formData;

    // Validate required fields
    if (!email || !email.includes('@')) {
      return NextResponse.json(
        { error: 'Please provide a valid email address' },
        { status: 400 }
      );
    }

    if (!name || !name.trim()) {
      return NextResponse.json(
        { error: 'Please provide your name' },
        { status: 400 }
      );
    }

    // Calculate score and segment (from LeadCaptureGate logic)
    const calculateScore = () => {
      let score = 0;
      const totalQuestions = 10;
      
      const noIsGoodQuestions = ['q1_operations', 'q3_revenue_depends_time'];
      const yesIsGoodQuestions = [
        'q2_documented_systems',
        'q4_team_delivers_without_you',
        'q5_leave_two_weeks',
        'q6_review_metrics',
        'q7_workflows_automated',
        'q8_block_time_strategy',
        'q9_quarterly_goals',
        'q10_brand_consistent'
      ];
      
      noIsGoodQuestions.forEach(q => {
        if (formData[q]?.toLowerCase() === 'no') score++;
      });
      
      yesIsGoodQuestions.forEach(q => {
        if (formData[q]?.toLowerCase() === 'yes') score++;
      });
      
      return Math.round((score / totalQuestions) * 100);
    };

    const getSegment = (score: number) => {
      if (score >= 75) return 'Sovereign-Founder';
      if (score >= 40) return 'System-Optimizer';
      return 'Foundation-Builder';
    };

    const freedomScore = calculateScore();
    const segment = getSegment(freedomScore);

    // ClickUp dropdown mappings - dropdowns require orderindex (number) not string
    const dropdownMappings: { [key: string]: { [key: string]: number } } = {
      yesno: { 'yes': 0, 'no': 1 },
      segment: { 'foundation builder': 0, 'system optimizer': 1, 'sovereign founder': 2 },
      current_stage: { 'solo': 0, 'small team': 1, 'scaling': 2, 'established': 3 },
      next_90_day_goal: { 'automate': 0, 'streamline': 1, 'launch': 2, 'scale': 3, 'work less': 4 },
      biggest_obstacle: { 'manual tasks': 0, 'no systems': 1, 'team dependence': 2, 'product not converting': 3, 'weak marketing': 4 },
      preferred_path: { 'diy learning': 0, 'coaching': 1, 'software': 2, 'done for you': 3 }
    };

    // Convert value to orderindex
    const toOrderIndex = (value: string | undefined, mappingKey: string): number | undefined => {
      if (!value) return undefined;
      
      // Convert kebab-case to space-separated and normalize
      const normalizedValue = value.toLowerCase().trim().replace(/-/g, ' ');
      const mapping = dropdownMappings[mappingKey];
      
      if (!mapping) {
        console.warn(`⚠️ No mapping found for key: ${mappingKey}`);
        return undefined;
      }
      
      const orderIndex = mapping[normalizedValue];
      
      if (orderIndex === undefined) {
        console.warn(`⚠️ No orderindex found for "${value}" (normalized: "${normalizedValue}") in ${mappingKey}`);
      }
      
      return orderIndex;
    };

    console.log('📊 Intake Form Submission:');
    console.log('- Email:', email);
    console.log('- Name:', name);
    console.log('- Freedom Score:', freedomScore);
    console.log('- Segment:', segment);

    // Environment variables
    const CLICKUP_API_KEY = process.env.CLICKUP_API_KEY;
    const CLICKUP_LIST_ID = process.env.CLICKUP_LIST_ID;
    const BEEHIV_API_KEY = process.env.BEEHIV_API_KEY;
    const BEEHIV_PUBLICATION_ID = process.env.BEEHIV_PUBLICATION_ID;
    const SMTP_EMAIL = process.env.SMTP_EMAIL;
    const SMTP_PASSWORD = process.env.SMTP_PASSWORD;

    // Track success of each operation
    const results = {
      clickup: false,
      beehiv: false,
      email: false
    };

    // 1. CREATE CLICKUP TASK (CRM Lead)
    if (CLICKUP_API_KEY && CLICKUP_LIST_ID) {
      try {
        const clickupPayload = {
              name: name,
              description: `**Freedom Score:** ${freedomScore}%\n**Segment:** ${segment}\n\n` +
                `**Yes/No Questions:**\n` +
                `- Spend most time on operations: ${formData.q1_operations}\n` +
                `- Have documented systems: ${formData.q2_documented_systems}\n` +
                `- Revenue depends on time: ${formData.q3_revenue_depends_time}\n` +
                `- Team delivers without you: ${formData.q4_team_delivers_without_you}\n` +
                `- Could leave for 2 weeks: ${formData.q5_leave_two_weeks}\n` +
                `- Review metrics weekly: ${formData.q6_review_metrics}\n` +
                `- Workflows automated: ${formData.q7_workflows_automated}\n` +
                `- Block time for strategy: ${formData.q8_block_time_strategy}\n` +
                `- Quarterly goals clear: ${formData.q9_quarterly_goals}\n` +
                `- Brand consistent: ${formData.q10_brand_consistent}\n\n` +
                `**Qualifying Questions:**\n` +
                `- Current Stage: ${formData.current_stage}\n` +
                `- Next 90-Day Goal: ${formData.next_90_day_goal}\n` +
                `- Biggest Obstacle: ${formData.biggest_obstacle}\n` +
                `- Preferred Path: ${formData.preferred_path}\n` +
                `- Additional Notes: ${formData.anything_else || 'None'}`,
              custom_fields: [
                // Contact Information
                { id: "264d1c14-d47d-4439-b613-8220d335dd15", value: email }, // Email
                { id: "84379c1b-105f-477f-9053-194e0824e38a", value: name }, // Full Name
                { id: "01b68954-abc5-4113-9152-3efa74d6975a", value: freedomScore }, // Freedom Score (number field)
                { id: "56f2a9ad-e10e-4496-8d02-0b76416fa8ca", value: toOrderIndex(segment, 'segment') }, // Segment (dropdown orderindex)
                
                // Yes/No Questions (10 fields) - Use orderindex for dropdowns
                { id: "ee90ea95-61ec-49f0-b996-fac2b44303f4", value: toOrderIndex(formData.q1_operations, 'yesno') }, // Operations
                { id: "8740efe2-42cf-48cd-b1be-2d6182dadeb1", value: toOrderIndex(formData.q2_documented_systems, 'yesno') }, // Documented Systems
                { id: "002ad36c-9b09-4b46-bf7e-effcc5ec7567", value: toOrderIndex(formData.q3_revenue_depends_time, 'yesno') }, // Revenue Depends Time
                { id: "d2049d9a-f2d5-46f2-bf93-2d867ff34dc3", value: toOrderIndex(formData.q4_team_delivers_without_you, 'yesno') }, // Team Without You
                { id: "94e9fdf1-c1cb-42f7-91ac-2ff66c09367d", value: toOrderIndex(formData.q5_leave_two_weeks, 'yesno') }, // Leave Two Weeks
                { id: "57885880-d327-455e-af08-9fa462d64b2b", value: toOrderIndex(formData.q6_review_metrics, 'yesno') }, // Review Metrics
                { id: "ba73cf98-7aeb-4599-9ffb-f82cc626cf65", value: toOrderIndex(formData.q7_workflows_automated, 'yesno') }, // Workflows Automated
                { id: "287147c4-2b9a-4cd1-b0e2-5ec5897537b6", value: toOrderIndex(formData.q8_block_time_strategy, 'yesno') }, // Block Strategy Time
                { id: "1ca09971-cec7-4ada-9865-1aa22fc1f2e2", value: toOrderIndex(formData.q9_quarterly_goals, 'yesno') }, // Quarterly Goals
                { id: "ab999400-60a6-47ed-bfda-be7b4fd02672", value: toOrderIndex(formData.q10_brand_consistent, 'yesno') }, // Brand Consistent
                
                // Qualifying Questions (5 fields) - Use orderindex for dropdowns
                { id: "68d8e2ce-a364-4cfb-870a-5e4db3e4eac5", value: toOrderIndex(formData.current_stage, 'current_stage') }, // Current Stage
                { id: "1ae62202-b169-4b10-9b09-abc91e4391e2", value: toOrderIndex(formData.next_90_day_goal, 'next_90_day_goal') }, // Next 90 Day Goal
                { id: "94392c2d-631b-4fb1-8f3a-a8b051c240c1", value: toOrderIndex(formData.biggest_obstacle, 'biggest_obstacle') }, // Biggest Obstacle
                { id: "861a2d8a-c208-4b65-9b43-47f54729476a", value: toOrderIndex(formData.preferred_path, 'preferred_path') }, // Preferred Path
                ...(formData.anything_else ? [{ id: "07c35e4a-b55f-433c-9679-fed25d79d567", value: formData.anything_else }] : []), // Additional Notes (text field)
              ].filter(field => field && field.value !== undefined && field.value !== null && field.value !== '') // Remove empty/undefined fields
        };
        
        // Log the ACTUAL payload being sent
        console.log('📤 Sending to ClickUp:', JSON.stringify(clickupPayload, null, 2));
        
        const clickupResponse = await fetch(
          `https://api.clickup.com/api/v2/list/${CLICKUP_LIST_ID}/task`,
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': CLICKUP_API_KEY,
            },
            body: JSON.stringify(clickupPayload),
          }
        );

        if (clickupResponse.ok) {
          results.clickup = true;
          console.log('✅ ClickUp task created successfully');
        } else {
          const error = await clickupResponse.text();
          console.error('❌ ClickUp error:', error);
        }
      } catch (error) {
        console.error('❌ ClickUp error:', error);
      }
    } else {
      console.warn('⚠️ ClickUp credentials not configured');
    }

    // 2. SUBSCRIBE TO BEEHIV (Silent)
    if (BEEHIV_API_KEY && BEEHIV_PUBLICATION_ID) {
      try {
        const beehivResponse = await fetch(
          `https://api.beehiiv.com/v2/publications/${BEEHIV_PUBLICATION_ID}/subscriptions`,
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${BEEHIV_API_KEY}`,
            },
            body: JSON.stringify({
              email: email,
              reactivate_existing: false,
              send_welcome_email: false,
              utm_source: 'website',
              utm_medium: 'intake_form',
              referring_site: 'avyra-intake-form',
              custom_fields: [
                { name: 'full_name', value: name },
                { name: 'freedom_score', value: String(freedomScore) },
                { name: 'segment', value: segment },
              ].filter(field => field.value),
            }),
          }
        );

        if (beehivResponse.ok || beehivResponse.status === 409) {
          results.beehiv = true;
          console.log('✅ Beehiv subscription successful');
        } else {
          const error = await beehivResponse.text();
          console.error('❌ Beehiv error:', error);
        }
      } catch (error) {
        console.error('❌ Beehiv error:', error);
      }
    } else {
      console.warn('⚠️ Beehiv credentials not configured');
    }

    // 3. SEND RESULTS EMAIL via SMTP
    if (SMTP_EMAIL && SMTP_PASSWORD) {
      try {
        const transporter = nodemailer.createTransport({
          service: 'gmail',
          auth: {
            user: SMTP_EMAIL,
            pass: SMTP_PASSWORD,
          },
        });

        const resultsUrl = `${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}/results?score=${freedomScore}&segment=${segment}&name=${encodeURIComponent(name)}&email=${encodeURIComponent(email)}`;

        const mailOptions = {
          from: `Avyra AI <${SMTP_EMAIL}>`,
          replyTo: SMTP_EMAIL,
          to: email,
          subject: `Your Freedom Score Results - ${freedomScore}%`,
          text: `Hi ${name},\n\nThank you for completing the Avyra Freedom Assessment!\n\nYour Freedom Score: ${freedomScore}%\n\nYou've been identified as a ${segment.replace(/-/g, ' ')}.\n\nView your complete results and personalized automation plan here:\n${resultsUrl}\n\nBest regards,\nThe Avyra Team\n\nAvyra AI - Your Operating System for Growth`,
          html: `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
</head>
<body style="margin: 0; padding: 0; background-color: #080808; font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;">
  <table role="presentation" style="width: 100%; border-collapse: collapse;">
    <tr>
      <td align="center" style="padding: 40px 20px;">
        <table role="presentation" style="max-width: 600px; width: 100%; border-collapse: collapse; background-color: #0f0f0f; border-radius: 8px; border: 1px solid #1a1a1a;">
          <!-- Header -->
          <tr>
            <td style="padding: 32px 32px 24px 32px; text-align: center; border-bottom: 1px solid #1a1a1a;">
              <h1 style="margin: 0; color: #ffffff; font-size: 24px; font-weight: 600; letter-spacing: -0.5px;">Your Freedom Score Results</h1>
            </td>
          </tr>
          
          <!-- Content -->
          <tr>
            <td style="padding: 32px;">
              <p style="margin: 0 0 20px 0; color: #d5dbe6; font-size: 16px; line-height: 1.6;">Hi ${name},</p>
              
              <p style="margin: 0 0 24px 0; color: #d5dbe6; font-size: 16px; line-height: 1.6;">Thank you for completing the Avyra Freedom Assessment. Here are your results:</p>
              
              <!-- Score Box -->
              <table role="presentation" style="width: 100%; border-collapse: collapse; margin: 0 0 24px 0; background-color: #1a1b20; border-radius: 8px; border: 1px solid #242424;">
                <tr>
                  <td style="padding: 24px; text-align: center;">
                    <div style="color: #ffffff; font-size: 42px; font-weight: 700; margin: 0 0 8px 0;">${freedomScore}%</div>
                    <div style="color: #a0a0a0; font-size: 14px; text-transform: uppercase; letter-spacing: 0.5px;">Freedom Score</div>
                  </td>
                </tr>
              </table>
              
              <p style="margin: 0 0 32px 0; color: #d5dbe6; font-size: 16px; line-height: 1.6;">Based on your assessment, you've been identified as a <strong style="color: #ffffff;">${segment.replace(/-/g, ' ')}</strong>.</p>
              
              <!-- CTA Button -->
              <table role="presentation" style="width: 100%; border-collapse: collapse;">
                <tr>
                  <td align="center" style="padding: 0 0 24px 0;">
                    <a href="${resultsUrl}" style="display: inline-block; background: linear-gradient(to bottom, #FFFFFF, #F3F3F3); color: #000000; font-size: 16px; font-weight: 600; text-decoration: none; padding: 14px 32px; border-radius: 8px; text-align: center;">View Your Full Results & Next Steps</a>
                  </td>
                </tr>
              </table>
              
              <p style="margin: 0 0 8px 0; color: #d5dbe6; font-size: 16px; line-height: 1.6;">Best regards,</p>
              <p style="margin: 0; color: #d5dbe6; font-size: 16px; line-height: 1.6;">The Avyra Team</p>
            </td>
          </tr>
          
          <!-- Footer -->
          <tr>
            <td style="padding: 24px 32px; text-align: center; border-top: 1px solid #1a1a1a;">
              <p style="margin: 0 0 8px 0; color: #6a6a6a; font-size: 13px; line-height: 1.5;">Avyra AI - Your Operating System for Growth</p>
              <p style="margin: 0; color: #6a6a6a; font-size: 12px; line-height: 1.5;">
                You're receiving this because you completed the Freedom Assessment at avyra.ai
              </p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>
          `,
        };

        await transporter.sendMail(mailOptions);
        results.email = true;
        console.log('✅ Results email sent successfully');
      } catch (error) {
        console.error('❌ Email error:', error);
      }
    } else {
      console.warn('⚠️ SMTP credentials not configured');
    }

    // Return success even if some operations failed (graceful degradation)
    return NextResponse.json(
      { 
        success: true,
        message: 'Successfully submitted!',
        results: results
      },
      { status: 200 }
    );

  } catch (error) {
    console.error('Intake submission error:', error);
    return NextResponse.json(
      { error: 'An unexpected error occurred. Please try again later.' },
      { status: 500 }
    );
  }
}

