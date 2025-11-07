import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const { email, name } = await request.json();

    // Validate email
    if (!email || !email.includes('@')) {
      return NextResponse.json(
        { message: 'Please provide a valid email address' },
        { status: 400 }
      );
    }

    // Beehiv API configuration
    const BEEHIV_API_KEY = process.env.BEEHIV_API_KEY;
    const BEEHIV_PUBLICATION_ID = process.env.BEEHIV_PUBLICATION_ID;

    if (!BEEHIV_API_KEY || !BEEHIV_PUBLICATION_ID) {
      console.error('Beehiv credentials not configured');
      return NextResponse.json(
        { message: 'Newsletter service not configured. Please contact support.' },
        { status: 500 }
      );
    }

    // Subscribe to Beehiv
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
          send_welcome_email: true,
          utm_source: 'website',
          utm_medium: 'newsletter_page',
          ...(name && { custom_fields: [{ name: 'full_name', value: name }] }),
        }),
      }
    );

    const beehivData = await beehivResponse.json();

    if (!beehivResponse.ok) {
      console.error('Beehiv API error:', beehivData);
      
      // Handle specific Beehiv errors
      if (beehivResponse.status === 409) {
        return NextResponse.json(
          { message: 'This email is already subscribed!' },
          { status: 409 }
        );
      }

      return NextResponse.json(
        { message: beehivData.message || 'Failed to subscribe. Please try again.' },
        { status: beehivResponse.status }
      );
    }

    return NextResponse.json(
      { 
        message: 'Successfully subscribed!',
        data: beehivData 
      },
      { status: 200 }
    );

  } catch (error) {
    console.error('Subscription error:', error);
    return NextResponse.json(
      { message: 'An unexpected error occurred. Please try again later.' },
      { status: 500 }
    );
  }
}

