// Test script for Beehiv API integration
// Run with: node scripts/test-beehiv.js

require('dotenv').config({ path: '.env.local' });

const BEEHIV_API_KEY = process.env.BEEHIV_API_KEY;
const BEEHIV_PUBLICATION_ID = process.env.BEEHIV_PUBLICATION_ID;

console.log('🔍 Testing Beehiv API Connection...\n');

// Check if credentials are set
if (!BEEHIV_API_KEY) {
  console.error('❌ BEEHIV_API_KEY is not set in .env.local');
  process.exit(1);
}

if (!BEEHIV_PUBLICATION_ID) {
  console.error('❌ BEEHIV_PUBLICATION_ID is not set in .env.local');
  process.exit(1);
}

console.log('✅ API Key found:', BEEHIV_API_KEY.substring(0, 10) + '...');
console.log('✅ Publication ID:', BEEHIV_PUBLICATION_ID);
console.log('\n📡 Testing API connection...\n');

// Test the API connection
async function testBeehivConnection() {
  try {
    // First, let's verify the publication exists
    const publicationResponse = await fetch(
      `https://api.beehiiv.com/v2/publications/${BEEHIV_PUBLICATION_ID}`,
      {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${BEEHIV_API_KEY}`,
          'Content-Type': 'application/json',
        },
      }
    );

    if (!publicationResponse.ok) {
      const errorData = await publicationResponse.json();
      console.error('❌ Failed to fetch publication:', publicationResponse.status);
      console.error('Error details:', JSON.stringify(errorData, null, 2));
      return false;
    }

    const publicationData = await publicationResponse.json();
    console.log('✅ Publication found!');
    console.log('   Name:', publicationData.data?.name || 'N/A');
    console.log('   Status:', publicationData.data?.status || 'N/A');
    console.log('\n📝 Testing subscription endpoint...\n');

    // Test with a dummy email to see if the endpoint is accessible
    // Note: This will actually attempt to subscribe, so use a test email
    const testEmail = `test+${Date.now()}@example.com`;
    
    const subscribeResponse = await fetch(
      `https://api.beehiiv.com/v2/publications/${BEEHIV_PUBLICATION_ID}/subscriptions`,
      {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${BEEHIV_API_KEY}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: testEmail,
          reactivate_existing: false,
          send_welcome_email: false,
          utm_source: 'api_test',
        }),
      }
    );

    const subscribeData = await subscribeResponse.json();

    if (!subscribeResponse.ok) {
      console.error('❌ Subscription test failed:', subscribeResponse.status);
      console.error('Error details:', JSON.stringify(subscribeData, null, 2));
      return false;
    }

    console.log('✅ Subscription endpoint is working!');
    console.log('   Test email:', testEmail);
    console.log('   Status:', subscribeData.data?.status || 'N/A');
    console.log('\n⚠️  Note: A test subscription was created. You may want to remove it from your Beehiv dashboard.');
    
    return true;

  } catch (error) {
    console.error('❌ Connection error:', error.message);
    return false;
  }
}

testBeehivConnection().then(success => {
  if (success) {
    console.log('\n✅ All tests passed! Your Beehiv integration is ready to use.');
    process.exit(0);
  } else {
    console.log('\n❌ Tests failed. Please check your credentials and try again.');
    process.exit(1);
  }
});

