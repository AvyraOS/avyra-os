require('dotenv').config({ path: '.env.local' });

const CLICKUP_API_KEY = process.env.CLICKUP_API_KEY;
const CLICKUP_LIST_ID = process.env.CLICKUP_LIST_ID;

async function getDropdownOptions() {
  try {
    console.log('📋 Fetching custom field details from ClickUp...\n');
    
    const response = await fetch(
      `https://api.clickup.com/api/v2/list/${CLICKUP_LIST_ID}/field`,
      {
        method: 'GET',
        headers: {
          'Authorization': CLICKUP_API_KEY,
        },
      }
    );

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    
    // Filter for dropdown fields only
    const dropdownFields = data.fields.filter(f => f.type === 'drop_down');
    
    console.log('🎯 Dropdown Fields with Option UUIDs:\n');
    console.log('='.repeat(80));
    
    for (const field of dropdownFields) {
      console.log(`\n📌 ${field.name}`);
      console.log(`   ID: ${field.id}`);
      console.log(`   Type: ${field.type}`);
      console.log(`   Options:`);
      
      if (field.type_config && field.type_config.options) {
        field.type_config.options.forEach((opt, index) => {
          console.log(`     ${index}. "${opt.name}" → orderindex: ${opt.orderindex}, color: ${opt.color || 'none'}`);
        });
      }
    }
    
    console.log('\n' + '='.repeat(80));
    console.log('\n💡 For dropdowns, you can use either:');
    console.log('   - The orderindex number (0, 1, 2, etc.)');
    console.log('   - The exact name string (must match exactly)');
    
  } catch (error) {
    console.error('❌ Error:', error.message);
  }
}

getDropdownOptions();

