require('dotenv').config({ path: '.env.local' });

const CLICKUP_API_KEY = process.env.CLICKUP_API_KEY;
const CLICKUP_LIST_ID = process.env.CLICKUP_LIST_ID;

async function testSegmentValues() {
  console.log('🧪 Testing different ways to send Segment dropdown value...\n');
  
  // Test 1: Using string value (what we're currently doing)
  console.log('Test 1: Using string "Sovereign-Founder"');
  let response = await fetch(
    `https://api.clickup.com/api/v2/list/${CLICKUP_LIST_ID}/task`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': CLICKUP_API_KEY,
      },
      body: JSON.stringify({
        name: 'TEST - Segment String',
        custom_fields: [
          { id: "56f2a9ad-e10e-4496-8d02-0b76416fa8ca", value: "Sovereign-Founder" }
        ]
      }),
    }
  );

  if (response.ok) {
    const data = await response.json();
    console.log('✅ SUCCESS with string value! Task ID:', data.id);
  } else {
    const error = await response.text();
    console.log('❌ FAILED with string:', error);
  }

  console.log('\n---\n');

  // Test 2: Using orderindex (number)
  console.log('Test 2: Using orderindex 2 (Sovereign-Founder)');
  response = await fetch(
    `https://api.clickup.com/api/v2/list/${CLICKUP_LIST_ID}/task`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': CLICKUP_API_KEY,
      },
      body: JSON.stringify({
        name: 'TEST - Segment Orderindex',
        custom_fields: [
          { id: "56f2a9ad-e10e-4496-8d02-0b76416fa8ca", value: 2 }
        ]
      }),
    }
  );

  if (response.ok) {
    const data = await response.json();
    console.log('✅ SUCCESS with orderindex! Task ID:', data.id);
  } else {
    const error = await response.text();
    console.log('❌ FAILED with orderindex:', error);
  }
}

testSegmentValues();

