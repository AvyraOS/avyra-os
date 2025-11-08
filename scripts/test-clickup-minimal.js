require('dotenv').config({ path: '.env.local' });

const CLICKUP_API_KEY = process.env.CLICKUP_API_KEY;
const CLICKUP_LIST_ID = process.env.CLICKUP_LIST_ID;

async function testMinimalTask() {
  try {
    console.log('🧪 Testing minimal ClickUp task creation...\n');
    
    // Test 1: Create task with NO custom fields
    console.log('Test 1: Creating task with NO custom fields...');
    const response1 = await fetch(
      `https://api.clickup.com/api/v2/list/${CLICKUP_LIST_ID}/task`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': CLICKUP_API_KEY,
        },
        body: JSON.stringify({
          name: 'TEST - Minimal Task',
          description: 'This is a test task with no custom fields'
        }),
      }
    );

    if (response1.ok) {
      const data = await response1.json();
      console.log('✅ SUCCESS! Task created with ID:', data.id);
      console.log('Task URL:', data.url);
    } else {
      const error = await response1.text();
      console.log('❌ FAILED:', error);
    }

    console.log('\n---\n');

    // Test 2: Create task with ONLY email and name
    console.log('Test 2: Creating task with ONLY email and name fields...');
    const response2 = await fetch(
      `https://api.clickup.com/api/v2/list/${CLICKUP_LIST_ID}/task`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': CLICKUP_API_KEY,
        },
        body: JSON.stringify({
          name: 'TEST - With 2 Fields',
          description: 'Test task with email and name only',
          custom_fields: [
            { id: "264d1c14-d47d-4439-b613-8220d335dd15", value: "test@example.com" },
            { id: "84379c1b-105f-477f-9053-194e0824e38a", value: "Test User" }
          ]
        }),
      }
    );

    if (response2.ok) {
      const data = await response2.json();
      console.log('✅ SUCCESS! Task created with ID:', data.id);
      console.log('Task URL:', data.url);
    } else {
      const error = await response2.text();
      console.log('❌ FAILED:', error);
    }

  } catch (error) {
    console.error('❌ Error:', error.message);
  }
}

testMinimalTask();

