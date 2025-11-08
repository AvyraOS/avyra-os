require('dotenv').config({ path: '.env.local' });

const CLICKUP_API_KEY = process.env.CLICKUP_API_KEY;
const CLICKUP_LIST_ID = process.env.CLICKUP_LIST_ID;

// The exact data from the failed submission
const testData = {
  email: "jcruzfff@gmail.com",
  name: "jonathan Cruz",
  freedomScore: 90,
  segment: "Sovereign-Founder",
  q1_operations: "No",
  q2_documented_systems: "No",
  q3_revenue_depends_time: "No",
  q4_team_delivers_without_you: "Yes",
  q5_leave_two_weeks: "Yes",
  q6_review_metrics: "Yes",
  q7_workflows_automated: "Yes",
  q8_block_time_strategy: "Yes",
  q9_quarterly_goals: "Yes",
  q10_brand_consistent: "Yes",
  current_stage: "Small Team",
  next_90_day_goal: "Launch",
  biggest_obstacle: "Team Dependence",
  preferred_path: "Coaching"
};

async function testField(fieldName, fieldId, value, testNum) {
  console.log(`\nTest ${testNum}: Adding ${fieldName} = "${value}"`);
  
  const custom_fields = [
    { id: "264d1c14-d47d-4439-b613-8220d335dd15", value: testData.email },
    { id: "84379c1b-105f-477f-9053-194e0824e38a", value: testData.name },
  ];
  
  // Add the field being tested
  if (fieldId) {
    custom_fields.push({ id: fieldId, value: value });
  }
  
  const response = await fetch(
    `https://api.clickup.com/api/v2/list/${CLICKUP_LIST_ID}/task`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': CLICKUP_API_KEY,
      },
      body: JSON.stringify({
        name: `TEST ${testNum} - ${fieldName}`,
        description: `Testing field: ${fieldName}`,
        custom_fields: custom_fields
      }),
    }
  );

  if (response.ok) {
    const data = await response.json();
    console.log(`✅ SUCCESS! Task ID: ${data.id}`);
    return true;
  } else {
    const error = await response.text();
    console.log(`❌ FAILED: ${error}`);
    console.log(`🔍 Field ID: ${fieldId}`);
    console.log(`🔍 Value sent: "${value}" (type: ${typeof value})`);
    return false;
  }
}

async function runTests() {
  console.log('🧪 Testing each custom field incrementally...\n');
  console.log('='.repeat(60));
  
  const fieldsToTest = [
    ['Freedom Score', '01b68954-abc5-4113-9152-3efa74d6975a', testData.freedomScore],
    ['Segment', '56f2a9ad-e10e-4496-8d02-0b76416fa8ca', testData.segment],
    ['Operations (Q1)', 'ee90ea95-61ec-49f0-b996-fac2b44303f4', testData.q1_operations],
    ['Documented Systems (Q2)', '8740efe2-42cf-48cd-b1be-2d6182dadeb1', testData.q2_documented_systems],
    ['Current Stage', '68d8e2ce-a364-4cfb-870a-5e4db3e4eac5', testData.current_stage],
    ['Next 90 Day Goal', '1ae62202-b169-4b10-9b09-abc91e4391e2', testData.next_90_day_goal],
    ['Biggest Obstacle', '94392c2d-631b-4fb1-8f3a-a8b051c240c1', testData.biggest_obstacle],
    ['Preferred Path', '861a2d8a-c208-4b65-9b43-47f54729476a', testData.preferred_path],
  ];
  
  let testNum = 1;
  for (const [name, id, value] of fieldsToTest) {
    const success = await testField(name, id, value, testNum);
    if (!success) {
      console.log('\n' + '='.repeat(60));
      console.log('🎯 FOUND THE PROBLEM!');
      console.log(`The field "${name}" with value "${value}" is causing the error.`);
      console.log('='.repeat(60));
      break;
    }
    testNum++;
    // Small delay between tests
    await new Promise(resolve => setTimeout(resolve, 500));
  }
}

runTests();

