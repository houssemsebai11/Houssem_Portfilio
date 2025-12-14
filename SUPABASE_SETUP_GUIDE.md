# Supabase Setup Guide

## Where to Find Your Supabase Credentials

### Step 1: Find Your SUPABASE_URL and Keys

1. Go to [Supabase Dashboard](https://supabase.com/dashboard)
2. Select your project (or create a new one)
3. Go to **Settings** (gear icon in the left sidebar)
4. Click on **API** in the settings menu
5. You'll see:
   - **Project URL** - This is your `SUPABASE_URL` (format: `https://xxxxxxxxxxxxx.supabase.co`)
   - **Project API keys** section with:
     - **anon public** - This is your `SUPABASE_ANON_KEY` (use this for client-side)
     - **service_role** - This is your `SUPABASE_SERVICE_ROLE_KEY` (keep secret, server-side only)

### Step 2: Create .env File

Create a file named `.env` in your project root directory (`C:\Users\houssem sebai\Desktop\iPortfolio-1.0.01\.env`)

**Copy and paste this template, then fill in your actual values:**

```env
# Supabase Configuration
# Get these values from: https://supabase.com/dashboard/project/YOUR_PROJECT_ID/settings/api

# Your Supabase Project URL
# Format: https://xxxxxxxxxxxxx.supabase.co
SUPABASE_URL=https://your-project-id.supabase.co

# Your Supabase Anon/Public Key (for client-side access)
# This is what you'll use in your frontend JavaScript
SUPABASE_ANON_KEY=your-anon-key-here

# Your Supabase Service Role Key (for server-side/admin operations - KEEP SECRET!)
# ⚠️ NEVER expose this in client-side code!
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key-here

# Supabase API Access Token (for CLI/API operations)
# This is the token you generated: sbp_ddc4d1383be6a6fb0be6c77c88722e2a3609517e
SUPABASE_ACCESS_TOKEN=sbp_ddc4d1383be6a6fb0be6c77c88722e2a3609517e

# Backend API URL (if using a backend server)
# For local development: http://localhost:3000/api
# For production: https://your-api-domain.com/api
CHATBOT_API_URL=http://localhost:3000/api
```

### Step 3: Update Your index.html

After creating the `.env` file, you'll need to update your `index.html` file to use these values. 

**Option 1: Manual Update (for static sites)**
Update lines 783-784 in `index.html`:

```javascript
window.SUPABASE_URL = 'https://your-actual-project-id.supabase.co';
window.SUPABASE_ANON_KEY = 'your-actual-anon-key-here';
```

**Option 2: Use Environment Variables (if using a build tool)**
If you're using a build tool like Vite, Webpack, or similar, you can access `.env` variables.

## Important Notes:

1. **The `.env` file is already in `.gitignore`** - Your secrets are safe and won't be committed to GitHub
2. **Use ANON_KEY for frontend** - The `anon public` key is safe to use in client-side JavaScript
3. **Never expose SERVICE_ROLE_KEY** - This key has admin access and should only be used server-side
4. **Access Token** - The token you have (`sbp_ddc4d1383be6a6fb0be6c77c88722e2a3609517e`) is for CLI/API operations, not for frontend use

## Quick Reference:

- **SUPABASE_URL**: Settings > API > Project URL
- **SUPABASE_ANON_KEY**: Settings > API > Project API keys > anon public
- **SUPABASE_SERVICE_ROLE_KEY**: Settings > API > Project API keys > service_role
- **SUPABASE_ACCESS_TOKEN**: Account Settings > Access Tokens (the one you already have)

## Example .env File:

```env
SUPABASE_URL=https://abcdefghijklmnop.supabase.co
SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFiY2RlZmdoaWprbG1ub3AiLCJyb2xlIjoiYW5vbiIsImlhdCI6MTYxNjIzOTAyMiwiZXhwIjoxOTMxODE1MDIyfQ.example
SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFiY2RlZmdoaWprbG1ub3AiLCJyb2xlIjoic2VydmljZV9yb2xlIiwiaWF0IjoxNjE2MjM5MDIyLCJleHAiOjE5MzE4MTUwMjJ9.example
SUPABASE_ACCESS_TOKEN=sbp_ddc4d1383be6a6fb0be6c77c88722e2a3609517e
CHATBOT_API_URL=http://localhost:3000/api
```

