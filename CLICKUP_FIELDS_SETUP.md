# Complete ClickUp CRM Setup for Intake Form

This guide will help you create a robust ClickUp CRM with all 17 intake questions as custom fields, plus score and contact info.

---

## Step 1: Create Your List

1. Go to ClickUp
2. Create a new List called **"Intake Form Leads"**
3. Open the List and get the List ID from URL: `https://app.clickup.com/xxxxx/v/li/YOUR_LIST_ID`
4. Add to `.env`: `CLICKUP_LIST_ID=YOUR_LIST_ID`

---

## Step 2: Create Custom Fields

Click **"+ Add Field"** in your List and create these 21 custom fields:

### Contact Information (4 fields)

| Field Name        | Type       | Notes                                                                  |
| ----------------- | ---------- | ---------------------------------------------------------------------- |
| **Email**         | Email      | Store contact email                                                    |
| **Full Name**     | Short Text | Store contact name                                                     |
| **Freedom Score** | Number     | 0-100 percentage                                                       |
| **Segment**       | Dropdown   | Options: `foundation-builder`, `system-optimizer`, `sovereign-founder` |

---

### Yes/No Questions (10 fields)

Create these as **Dropdown** fields with options: `Yes`, `No`

| Field Name                   | Question Text                                      |
| ---------------------------- | -------------------------------------------------- |
| **Q1: Operations**           | Do you spend most of your week on operations?      |
| **Q2: Documented Systems**   | Do you have documented systems / SOPs?             |
| **Q3: Revenue Depends Time** | Does revenue depend on your time?                  |
| **Q4: Team Without You**     | Does revenue depend on your time?                 |
| **Q5: Leave Two Weeks**      | Could you leave for two weeks and stay profitable? |
| **Q6: Review Metrics**       | Do you review key metrics weekly?                  |
| **Q7: Workflows Automated**  | Are workflows automated with AI or software?       |
| **Q8: Block Strategy Time**  | Do you block time for strategy and creation?       |
| **Q9: Quarterly Goals**      | Are quarterly goals clear and executed?            |
| **Q10: Brand Consistent**    | Is your brand and marketing consistent?            |

---

### Qualifying Questions (5 fields)

| Field Name           | Type      | Options                                                                                     |
| -------------------- | --------- | ------------------------------------------------------------------------------------------- |
| **Current Stage**    | Dropdown  | `Solo`, `Small Team`, `Scaling`, `Established`                                              |
| **Next 90 Day Goal** | Dropdown  | `Automate`, `Streamline`, `Launch`, `Scale`, `Work Less`                                    |
| **Biggest Obstacle** | Dropdown  | `Manual Tasks`, `No Systems`, `Team Dependence`, `Product Not Converting`, `Weak Marketing` |
| **Preferred Path**   | Dropdown  | `DIY Learning`, `Coaching`, `Software`, `Done-For-You`                                      |
| **Additional Notes** | Long Text | Free text field for "anything else"                                                         |

---

## Step 3: Get Your Field IDs

After creating all fields, run this command:

```bash
node scripts/get-clickup-fields.js
```

This will output all your field IDs. You'll see something like:

```
✅ Custom Fields in your ClickUp List:

- Email
  ID: "abc123-xyz"
  Type: email

- Freedom Score
  ID: "def456-xyz"
  Type: number

...etc
```

---

## Step 4: Update the API Route

Copy the field IDs and update `/src/app/api/submit-intake/route.ts`.

Find the `custom_fields` section and replace with your actual IDs:

```typescript
custom_fields: [
  // Contact Info
  { id: "YOUR_EMAIL_FIELD_ID", value: email },
  { id: "YOUR_NAME_FIELD_ID", value: name },
  { id: "YOUR_SCORE_FIELD_ID", value: freedomScore },
  { id: "YOUR_SEGMENT_FIELD_ID", value: segment },

  // Yes/No Questions
  { id: "YOUR_Q1_FIELD_ID", value: formData.q1_operations },
  { id: "YOUR_Q2_FIELD_ID", value: formData.q2_documented_systems },
  { id: "YOUR_Q3_FIELD_ID", value: formData.q3_revenue_depends_time },
  { id: "YOUR_Q4_FIELD_ID", value: formData.q4_team_delivers_without_you },
  { id: "YOUR_Q5_FIELD_ID", value: formData.q5_leave_two_weeks },
  { id: "YOUR_Q6_FIELD_ID", value: formData.q6_review_metrics },
  { id: "YOUR_Q7_FIELD_ID", value: formData.q7_workflows_automated },
  { id: "YOUR_Q8_FIELD_ID", value: formData.q8_block_time_strategy },
  { id: "YOUR_Q9_FIELD_ID", value: formData.q9_quarterly_goals },
  { id: "YOUR_Q10_FIELD_ID", value: formData.q10_brand_consistent },

  // Qualifying Questions
  { id: "YOUR_CURRENT_STAGE_FIELD_ID", value: formData.current_stage },
  { id: "YOUR_NEXT_90_FIELD_ID", value: formData.next_90_day_goal },
  { id: "YOUR_OBSTACLE_FIELD_ID", value: formData.biggest_obstacle },
  { id: "YOUR_PATH_FIELD_ID", value: formData.preferred_path },
  { id: "YOUR_NOTES_FIELD_ID", value: formData.anything_else },
];
```

---

## Step 5: Test It!

1. Restart your dev server: `npm run dev`
2. Complete the intake form
3. Check ClickUp - you should see:
   - A new task with the lead's name
   - All 21 custom fields populated
   - Proper tags and status
   - Clean, filterable data

---

## Benefits of This Setup

✅ **Filter by any question** - Find all "foundation-builders" with no documented systems
✅ **Sort by Freedom Score** - Prioritize high-scoring leads
✅ **Create views** - Separate lists for each segment
✅ **Automate workflows** - Trigger actions based on custom fields
✅ **Export data** - Clean CSV exports for analysis
✅ **Search & Report** - Full ClickUp search and reporting capabilities

---

## Quick Copy-Paste Field Names

When creating fields in ClickUp, use these exact names for consistency:

```
Email
Full Name
Freedom Score
Segment
Q1: Operations
Q2: Documented Systems
Q3: Revenue Depends Time
Q4: Team Without You
Q5: Leave Two Weeks
Q6: Review Metrics
Q7: Workflows Automated
Q8: Block Strategy Time
Q9: Quarterly Goals
Q10: Brand Consistent
Current Stage
Next 90 Day Goal
Biggest Obstacle
Preferred Path
Additional Notes
```

---

## Need Help?

- **Field IDs not showing?** Make sure your API token has access to the List
- **Values not populating?** Check the dropdown options match exactly (case-sensitive)
- **Email field?** Use ClickUp's "Email" field type, not "Short Text"
- **Yes/No not working?** Make sure dropdown has exactly "Yes" and "No" (capital Y and N)
