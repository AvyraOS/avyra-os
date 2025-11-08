# Intake Form API Setup Guide

The intake form now integrates with **ClickUp CRM**, **Beehiv**, and **Gmail SMTP** to create a complete lead capture system.

## Required Environment Variables

Add these to your `.env.local` file:

```bash
# Beehiv Configuration
BEEHIV_API_KEY=your_beehiv_api_key_here
BEEHIV_PUBLICATION_ID=your_publication_id_here

# ClickUp CRM Configuration
CLICKUP_API_KEY=your_clickup_api_key_here
CLICKUP_LIST_ID=your_clickup_list_id_here

# SMTP Email Configuration (Gmail)
SMTP_EMAIL=your_gmail_address@gmail.com
SMTP_PASSWORD=your_gmail_app_password_here

# Base URL for email links
NEXT_PUBLIC_BASE_URL=https://yourdomain.com
```

---

## 1. ClickUp Setup (CRM for Leads)

### Get Your ClickUp API Key (Personal Token):

**Note:** Use the Personal API Token (NOT OAuth client_id/client_secret)

1. Go to your ClickUp workspace
2. Click your profile icon (bottom left) → **Settings**
3. Click **Apps** in the left sidebar
4. Scroll down to **API Token** section
5. Click **Generate** (or **Regenerate** if you already have one)
6. Click **Copy** to copy your personal API token
7. Add it to `CLICKUP_API_KEY` in your `.env.local` file

**Important:** This is different from OAuth credentials (client_id/client_secret). We're using the simpler Personal API Token for direct integration.

### Get Your ClickUp List ID:
1. Open the List where you want leads to be created
2. Look at the URL: `https://app.clickup.com/123456/v/li/987654321`
3. The number after `/li/` is your List ID
4. Copy it to `CLICKUP_LIST_ID`

### What Gets Created:
Each intake form submission creates a task in ClickUp with:
- **Task Name**: `[Name] - [Email]`
- **Description**: All intake form responses formatted nicely
- **Tags**: Segment (foundation-builder, system-optimizer, sovereign-founder) + score
- **Status**: "to do"

---

## 2. Beehiv Setup (Mailing List)

You already have Beehiv configured! The intake form will:
- Silently subscribe users (no welcome email)
- Add custom fields: `full_name`, `freedom_score`, `segment`
- Source tagged as "intake_form"

---

## 3. Gmail SMTP Setup (Results Email)

### Enable App Passwords:
1. Go to your Google Account: https://myaccount.google.com/
2. Navigate to **Security**
3. Enable **2-Step Verification** (required)
4. Go back to Security → **App passwords**
5. Create a new app password for "Mail"
6. Copy the 16-character password
7. Add your Gmail to `SMTP_EMAIL`
8. Add the app password to `SMTP_PASSWORD`

### What Email Gets Sent:
Users receive an email with:
- Their Freedom Score
- Their Segment
- A button linking to their full results page
- Clean, branded HTML email

---

## 4. Testing

After setting up all environment variables:

1. Restart your dev server: `npm run dev`
2. Complete the intake form
3. Submit with email/name
4. Check:
   - ✅ ClickUp task created
   - ✅ Beehiv subscriber added
   - ✅ Email received

---

## How It Works

When a user clicks "Get My Automation Plan":

1. **Calculate Score** - Analyzes their 10 Yes/No answers
2. **Determine Segment** - Assigns foundation-builder, system-optimizer, or sovereign-founder
3. **Create ClickUp Task** - All data stored in your CRM with tags and formatting
4. **Subscribe to Beehiv** - Silent addition to mailing list with custom fields
5. **Send Results Email** - Professional email with link to their results page
6. **Redirect to Results** - User sees their Freedom Score and next steps

All operations use graceful degradation - if one service fails, the others still work!

---

## Troubleshooting

### ClickUp Not Working?
- **Make sure you're using the Personal API Token** (not OAuth client_id/client_secret)
- The API token should start with `pk_` and be a long string
- Verify your API key is valid and hasn't been revoked
- Check the List ID is correct (should be a number like `901234567890`)
- Make sure you have permission to create tasks in that list
- Test your token: `curl -H "Authorization: YOUR_TOKEN" https://api.clickup.com/api/v2/team`

### Beehiv Not Working?
- Check your API key and Publication ID
- Verify custom fields exist in Beehiv

### Email Not Sending?
- Ensure 2-Step Verification is enabled on Gmail
- Use an App Password, not your regular Gmail password
- Check the SMTP_EMAIL format is correct

---

## Quick Start (Works Right Now!)

**You don't need custom fields to get started!** The integration works immediately by putting all data in the task description.

### Step 1: Create a List
1. Go to ClickUp and create a new List called "Intake Form Leads"
2. Open that List and copy the List ID from the URL
3. Add to `.env.local`: `CLICKUP_LIST_ID=your_list_id_here`

### Step 2: Test It
1. Restart your dev server
2. Complete and submit the intake form
3. Check ClickUp - you should see a new task with all the data!

---

## Optional: Advanced Setup with Custom Fields

Want to filter/sort by specific fields? Add custom fields to your ClickUp List:

### Recommended Custom Fields:
- **Freedom Score** (Number field)
- **Segment** (Dropdown: foundation-builder, system-optimizer, sovereign-founder)
- **Current Stage** (Dropdown: Solo, Small Team, Scaling, Established)
- **Next 90 Day Goal** (Dropdown: Automate, Streamline, Launch, Scale, Work Less)
- **Biggest Obstacle** (Dropdown: Manual Tasks, No Systems, Team Dependence, Product Not Converting, Weak Marketing)
- **Preferred Path** (Dropdown: DIY Learning, Coaching, Software, Done-For-You)

### To Set Up Custom Fields:

1. **Create the custom fields in your ClickUp List:**
   - Click **+ Add Field** in your List
   - Add each field with the correct type (Number, Dropdown, etc.)

2. **Get the Field IDs:**
   ```bash
   node scripts/get-clickup-fields.js
   ```
   This will show you all field IDs

3. **Update the API route:**
   - Open `/src/app/api/submit-intake/route.ts`
   - Find the `custom_fields: [` section
   - Uncomment and add your field IDs:
   ```typescript
   custom_fields: [
     { id: "abc123", value: freedomScore }, // Freedom Score
     { id: "def456", value: segment }, // Segment
     { id: "ghi789", value: formData.current_stage }, // Current Stage
     // ... etc
   ]
   ```

4. **Restart your server** and test again

