// Helper script to get ClickUp List custom field IDs
// Run with: node scripts/get-clickup-fields.js

const CLICKUP_API_KEY = process.env.CLICKUP_API_KEY;
const CLICKUP_LIST_ID = process.env.CLICKUP_LIST_ID;

if (!CLICKUP_API_KEY || !CLICKUP_LIST_ID) {
  console.error('❌ Please set CLICKUP_API_KEY and CLICKUP_LIST_ID in your .env file');
  process.exit(1);
}

async function getCustomFields() {
  try {
    const response = await fetch(
      `https://api.clickup.com/api/v2/list/${CLICKUP_LIST_ID}/field`,
      {
        headers: {
          'Authorization': CLICKUP_API_KEY,
        },
      }
    );

    if (!response.ok) {
      const error = await response.text();
      console.error('❌ ClickUp API Error:', error);
      process.exit(1);
    }

    const data = await response.json();
    
    console.log('\n✅ Custom Fields in your ClickUp List:\n');
    console.log('Copy these IDs into your route.ts file:\n');
    
    data.fields.forEach(field => {
      console.log(`- ${field.name}`);
      console.log(`  ID: "${field.id}"`);
      console.log(`  Type: ${field.type}`);
      if (field.type_config?.options) {
        console.log(`  Options:`, field.type_config.options.map(o => o.name).join(', '));
      }
      console.log('');
    });

    console.log('\n📋 Copy this into /src/app/api/submit-intake/route.ts:\n');
    console.log('Replace the custom_fields section with:\n');
    console.log('custom_fields: [');
    
    // Try to intelligently map field names to variables
    data.fields.forEach(field => {
      const name = field.name.toLowerCase();
      let value = 'REPLACE_ME';
      
      // Smart mapping
      if (name.includes('email')) value = 'email';
      else if (name.includes('name')) value = 'name';
      else if (name.includes('score')) value = 'freedomScore';
      else if (name.includes('segment')) value = 'segment';
      else if (name.includes('q1') || name.includes('operations')) value = 'formData.q1_operations';
      else if (name.includes('q2') || name.includes('documented')) value = 'formData.q2_documented_systems';
      else if (name.includes('q3') || name.includes('revenue')) value = 'formData.q3_revenue_depends_time';
      else if (name.includes('q4') || name.includes('team without')) value = 'formData.q4_team_delivers_without_you';
      else if (name.includes('q5') || name.includes('leave')) value = 'formData.q5_leave_two_weeks';
      else if (name.includes('q6') || name.includes('metrics')) value = 'formData.q6_review_metrics';
      else if (name.includes('q7') || name.includes('automated')) value = 'formData.q7_workflows_automated';
      else if (name.includes('q8') || name.includes('block') || name.includes('strategy time')) value = 'formData.q8_block_time_strategy';
      else if (name.includes('q9') || name.includes('quarterly')) value = 'formData.q9_quarterly_goals';
      else if (name.includes('q10') || name.includes('brand')) value = 'formData.q10_brand_consistent';
      else if (name.includes('current stage')) value = 'formData.current_stage';
      else if (name.includes('90') || name.includes('goal')) value = 'formData.next_90_day_goal';
      else if (name.includes('obstacle')) value = 'formData.biggest_obstacle';
      else if (name.includes('path')) value = 'formData.preferred_path';
      else if (name.includes('notes') || name.includes('additional')) value = 'formData.anything_else';
      
      console.log(`  { id: "${field.id}", value: ${value} }, // ${field.name}`);
    });
    
    console.log('].filter(field => field);\n');
    
    console.log('\n💡 Review the mappings above and adjust if needed!');
    console.log('Make sure each value matches the correct form field.\n');

  } catch (error) {
    console.error('❌ Error:', error.message);
  }
}

getCustomFields();

