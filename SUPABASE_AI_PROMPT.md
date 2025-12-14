# Supabase AI Prompt for Database Setup

Copy and paste this prompt to Supabase AI (Claude in Supabase Dashboard):

---

**I need help setting up a database table for my portfolio website's contact form. Here's what I need:**

## Project Context:
I have a portfolio website with a contact form that collects user inquiries. The form submits data via JavaScript to Supabase using the REST API.

## Required Database Table:

**Table Name:** `contact_submissions`

**Columns Needed:**
- `id` - Auto-incrementing primary key (UUID or serial)
- `name` - Text field for user's name (VARCHAR/TEXT, NOT NULL)
- `email` - Email address (VARCHAR/TEXT, NOT NULL, should validate email format)
- `subject` - Text field for message subject (VARCHAR/TEXT, NOT NULL)
- `message` - Text field for the message content (TEXT, NOT NULL)
- `created_at` - Timestamp of when the submission was created (TIMESTAMP, default to NOW())

## Data Structure:
The JavaScript code sends data in this format:
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "subject": "Project Inquiry",
  "message": "I'm interested in working with you..."
}
```

## Requirements:
1. **Create the table** with appropriate data types and constraints
2. **Set up Row Level Security (RLS)** - Enable RLS and create policies that:
   - Allow INSERT operations for anonymous users (so the contact form can submit)
   - Allow SELECT operations only for authenticated users (so I can view submissions)
   - Prevent UPDATE and DELETE for anonymous users
3. **Provide the SQL migration** or step-by-step instructions to create this table
4. **Verify the table structure** matches what my JavaScript code expects

## Current Setup:
- I'm using Supabase REST API with fetch() calls
- The endpoint being called is: `{SUPABASE_URL}/rest/v1/contact_submissions`
- Headers used: `apikey`, `Authorization: Bearer {ANON_KEY}`, `Content-Type: application/json`
- I need to use the `anon` key for public form submissions

## Additional Questions:
1. Should I use UUID or serial for the ID? What are the pros/cons?
2. What's the best way to validate email format at the database level?
3. Should I add any indexes for better query performance?
4. How can I set up email notifications when a new submission is received?

Please provide:
- Complete SQL migration script
- RLS policies SQL
- Any additional recommendations for security and performance

---

## Alternative Shorter Prompt:

**"I need to create a contact form submissions table in Supabase. The table should store: name, email, subject, and message fields. I need RLS policies that allow anonymous users to INSERT (submit forms) but only authenticated users can SELECT (view submissions). Please provide the complete SQL migration and RLS setup."**

