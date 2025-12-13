# Form Submission Fix - Troubleshooting Guide

## ✅ What Was Fixed

1. **Added proper fallback mechanism**: Form now tries API first, then falls back to direct Supabase
2. **Better error handling**: Clear error messages and logging
3. **Improved CORS configuration**: Server now properly handles cross-origin requests
4. **Submission tracking**: Prevents duplicate submissions

## 🔧 How to Fix "Failed to fetch" Error

### Option 1: Use Direct Supabase (Easiest - No Server Required)

1. **Get your Supabase credentials:**
   - Go to https://supabase.com/dashboard
   - Select your project
   - Go to Settings → API
   - Copy your "Project URL" and "anon public" key

2. **Update `index.html`** (around line 732):
   ```javascript
   window.SUPABASE_URL = 'https://your-project-id.supabase.co';
   window.SUPABASE_ANON_KEY = 'your_anon_key_here';
   ```

3. **Make sure the database table exists:**
   - Go to Supabase SQL Editor
   - Run the SQL from `server/supabase-setup.sql`

4. **Test the form** - it should now save directly to Supabase!

### Option 2: Use Backend API Server

1. **Start the server:**
   ```bash
   cd server
   npm install
   cp .env.example .env
   # Edit .env with your Supabase credentials
   npm start
   ```

2. **Verify server is running:**
   - Check console: `🚀 Server running on port 3000`
   - Visit: http://localhost:3000/api/health

3. **Update API URL in `index.html`** (if needed):
   ```javascript
   window.CHATBOT_API_URL = 'http://localhost:3000/api';
   ```

4. **Test the form** - it will use the API, with automatic fallback to direct Supabase

## 🐛 Common Issues & Solutions

### Issue: "TypeError: Failed to fetch"

**Causes:**
- API server not running
- Supabase credentials not configured
- CORS issues
- Network/firewall blocking

**Solutions:**
1. **Check browser console** for specific error message
2. **If using API**: Make sure server is running on port 3000
3. **If using direct Supabase**: Make sure credentials are set in `index.html`
4. **Check Supabase table exists**: Run the SQL setup script
5. **Verify Supabase RLS policies**: Should allow public inserts

### Issue: "Supabase credentials not configured"

**Solution:**
- Uncomment and fill in `SUPABASE_URL` and `SUPABASE_ANON_KEY` in `index.html`
- Make sure values are not empty strings

### Issue: "API error: 404"

**Solution:**
- Check API URL is correct
- Make sure server is running
- Verify endpoint exists: `/api/submit-form`

### Issue: "Supabase error: 401"

**Solution:**
- Check your Supabase API key is correct
- Make sure you're using the "anon public" key, not the service role key
- Verify the key hasn't expired

### Issue: "Supabase error: 404 - relation does not exist"

**Solution:**
- Run the SQL setup script: `server/supabase-setup.sql`
- Make sure table name is exactly: `contact_submissions`

## 📋 Testing Checklist

- [ ] Supabase credentials configured in `index.html`
- [ ] Database table created (ran SQL setup)
- [ ] Form can be submitted
- [ ] Check browser console for errors
- [ ] Check Supabase dashboard for new submissions
- [ ] (If using API) Server is running and accessible

## 🔍 Debugging Steps

1. **Open browser console** (F12)
2. **Submit the form**
3. **Look for messages:**
   - ✅ `Form submitted to Supabase via API` - Success!
   - ✅ `Form submitted directly to Supabase` - Success (fallback)!
   - ❌ `Failed to fetch` - Check API server or Supabase config
   - ❌ `Supabase credentials not configured` - Add credentials to `index.html`

4. **Check Network tab:**
   - Look for requests to `/api/submit-form` or Supabase REST API
   - Check response status codes
   - Look at error messages

## 💡 Quick Test

To quickly test if Supabase is working:

1. Open browser console (F12)
2. Run this command:
   ```javascript
   fetch('YOUR_SUPABASE_URL/rest/v1/contact_submissions', {
     method: 'POST',
     headers: {
       'Content-Type': 'application/json',
       'apikey': 'YOUR_ANON_KEY',
       'Authorization': 'Bearer YOUR_ANON_KEY'
     },
     body: JSON.stringify({
       name: 'Test',
       email: 'test@example.com',
       subject: 'Test',
       message: 'Test message'
     })
   }).then(r => r.json()).then(console.log).catch(console.error);
   ```

If this works, Supabase is configured correctly!

## 🎯 Recommended Setup

**For Development:**
- Use direct Supabase (no server needed)
- Configure credentials in `index.html`

**For Production:**
- Use backend API server
- Deploy server to Heroku/Railway/Vercel
- Update API URL in `index.html` to production URL
- Keep Supabase credentials as fallback

## 📞 Still Having Issues?

1. Check all error messages in browser console
2. Verify Supabase table exists and has correct structure
3. Test Supabase connection directly (see Quick Test above)
4. Check server logs if using API
5. Verify CORS settings if getting CORS errors

