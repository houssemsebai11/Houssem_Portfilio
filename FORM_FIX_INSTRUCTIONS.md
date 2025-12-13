# Form Submission Fix - Instructions

## Problem
The form was showing "TypeError: Failed to fetch" when trying to submit to Supabase.

## Solution
I've updated the form integration to:
1. Try the API server first (if configured)
2. Automatically fallback to direct Supabase submission if API fails
3. Better error handling and logging

## Setup Options

### Option 1: Use Backend API (Recommended)

1. **Start your backend server:**
   ```bash
   cd server
   npm install
   # Edit .env with your Supabase credentials
   npm start
   ```

2. **Update `index.html` (line ~729):**
   ```javascript
   window.CHATBOT_API_URL = 'http://localhost:3000/api';
   ```

3. **Make sure Supabase credentials are in `server/.env`:**
   ```env
   SUPABASE_URL=https://your-project.supabase.co
   SUPABASE_ANON_KEY=your_anon_key
   ```

### Option 2: Direct Supabase (No Backend Server Needed)

If you don't want to run the backend server, you can submit directly to Supabase:

1. **Get your Supabase credentials:**
   - Go to https://supabase.com/dashboard
   - Select your project
   - Go to Settings → API
   - Copy "Project URL" and "anon public" key

2. **Update `index.html` (lines ~732-733):**
   ```javascript
   window.SUPABASE_URL = 'https://your-project-id.supabase.co';
   window.SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...';
   ```

3. **Make sure the database table exists:**
   - Go to Supabase SQL Editor
   - Run the SQL from `server/supabase-setup.sql`

4. **Set API URL to empty or null:**
   ```javascript
   window.CHATBOT_API_URL = null; // or ''
   ```

## How It Works Now

1. Form submits normally (PHP email still works)
2. In parallel, tries to save to Supabase:
   - First tries: Backend API (`/api/submit-form`)
   - If that fails: Direct Supabase REST API
   - If both fail: Logs error but doesn't interrupt user

## Testing

1. **Open browser console** (F12)
2. **Submit the form**
3. **Check console for messages:**
   - Success: "Form submitted to Supabase via API" or "Form submitted directly to Supabase"
   - Error: Will show what went wrong

## Troubleshooting

### "Failed to fetch" Error

**If using API:**
- Make sure server is running: `cd server && npm start`
- Check API URL is correct in `index.html`
- Check server logs for errors

**If using direct Supabase:**
- Verify Supabase URL and key are correct
- Check browser console for specific error
- Make sure table `contact_submissions` exists
- Check Supabase dashboard → Table Editor

### CORS Errors

If you see CORS errors:
- **For API**: Make sure CORS is enabled in `server/server.js` (it is by default)
- **For Supabase**: Check RLS policies allow inserts from anonymous users

### "Supabase credentials not configured"

- Make sure you've set `window.SUPABASE_URL` and `window.SUPABASE_ANON_KEY` in `index.html`
- Or make sure API server has them in `.env`

## Quick Test

1. Fill out the contact form
2. Submit it
3. Check Supabase dashboard → Table Editor → `contact_submissions`
4. You should see your submission!

## Still Having Issues?

1. Open browser console (F12)
2. Look for error messages
3. Check:
   - Is the API server running? (if using API)
   - Are Supabase credentials correct? (if using direct)
   - Does the database table exist?
   - Are there any CORS errors?

