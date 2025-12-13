# Portfolio Website Chatbot & Supabase Integration - Setup Guide

This guide will help you set up the chatbot, Supabase integration, and WhatsApp connection for your portfolio website.

## 📋 Overview

Your website now includes:
- ✅ **Intelligent Chatbot** - Understands all your services and website content
- ✅ **Supabase Integration** - Stores contact form submissions in a database
- ✅ **WhatsApp Integration** - Connect chatbot to WhatsApp (via Twilio)
- ✅ **Backend API** - Node.js server handling all integrations

## 🚀 Quick Start

### Step 1: Set Up Supabase Database

1. **Create a Supabase Account**
   - Go to https://supabase.com
   - Sign up and create a new project
   - Wait for the project to be ready (takes ~2 minutes)

2. **Get Your Supabase Credentials**
   - Go to Project Settings → API
   - Copy your `Project URL` and `anon public` key

3. **Create the Database Table**
   - Go to SQL Editor in Supabase dashboard
   - Copy and paste the SQL from `server/supabase-setup.sql`
   - Click "Run" to create the `contact_submissions` table

### Step 2: Set Up Backend Server

1. **Install Node.js** (if not already installed)
   - Download from https://nodejs.org/
   - Verify: `node --version` and `npm --version`

2. **Install Server Dependencies**
   ```bash
   cd server
   npm install
   ```

3. **Configure Environment Variables**
   ```bash
   # Copy the example file
   cp .env.example .env
   
   # Edit .env with your credentials
   # Use a text editor to add your Supabase URL and key
   ```

   Edit `server/.env`:
   ```env
   PORT=3000
   SUPABASE_URL=https://your-project-id.supabase.co
   SUPABASE_ANON_KEY=your_anon_key_here
   ```

4. **Start the Server**
   ```bash
   npm start
   # or for development with auto-reload:
   npm run dev
   ```

   You should see: `🚀 Server running on port 3000`

### Step 3: Update Website Configuration

1. **Update API URL in `index.html`**
   
   Find this section near the end of `index.html`:
   ```javascript
   window.CHATBOT_API_URL = 'http://localhost:3000/api';
   ```
   
   - For local development: Keep as `http://localhost:3000/api`
   - For production: Change to your deployed server URL (e.g., `https://your-api.herokuapp.com/api`)

2. **Test the Chatbot**
   - Open `index.html` in your browser
   - Click the chat icon in the bottom right
   - Try asking: "What services do you offer?"

### Step 4: Test Form Submission

1. **Fill out the contact form** on your website
2. **Check Supabase Dashboard**
   - Go to Table Editor → `contact_submissions`
   - You should see your form submission

## 📱 WhatsApp Integration (Optional)

### Option 1: Twilio WhatsApp Sandbox (Free for Testing)

1. **Sign up for Twilio**
   - Go to https://www.twilio.com/try-twilio
   - Create a free account

2. **Get Twilio Credentials**
   - From Twilio Console, copy:
     - Account SID
     - Auth Token

3. **Set Up WhatsApp Sandbox**
   - Go to Messaging → Try it out → Send a WhatsApp message
   - Follow instructions to join the sandbox
   - Copy the sandbox number (format: `whatsapp:+14155238886`)

4. **Update `.env` file**
   ```env
   TWILIO_ACCOUNT_SID=your_account_sid
   TWILIO_AUTH_TOKEN=your_auth_token
   TWILIO_WHATSAPP_NUMBER=whatsapp:+14155238886
   ```

5. **Configure Webhook**
   - In Twilio Console → Messaging → Settings → WhatsApp Sandbox Settings
   - Set webhook URL: `https://your-domain.com/api/whatsapp`
   - For local testing, use ngrok: `ngrok http 3000`

6. **Test WhatsApp**
   - Send a message to the Twilio WhatsApp number
   - The chatbot should respond!

### Option 2: WhatsApp Business API (Production)

For production use, you'll need:
- WhatsApp Business Account
- Business verification
- Use a provider like:
  - Twilio (paid)
  - MessageBird
  - 360dialog

## 🧠 Enhanced Chatbot with OpenAI (Optional)

For more intelligent responses:

1. **Get OpenAI API Key**
   - Sign up at https://platform.openai.com/
   - Go to API Keys section
   - Create a new secret key

2. **Add to `.env`**
   ```env
   OPENAI_API_KEY=sk-your-key-here
   ```

3. **Restart Server**
   - The chatbot will now use GPT-3.5 for responses

## 🌐 Deploying to Production

### Deploy Backend Server

**Option 1: Heroku**
```bash
cd server
heroku create your-app-name
heroku config:set SUPABASE_URL=your_url
heroku config:set SUPABASE_ANON_KEY=your_key
git push heroku main
```

**Option 2: Railway**
1. Connect GitHub repository
2. Set environment variables in dashboard
3. Deploy automatically

**Option 3: Vercel**
```bash
cd server
npm i -g vercel
vercel
# Follow prompts
```

### Update Website

1. **Update API URL** in `index.html` to your deployed server URL
2. **Deploy website** to:
   - GitHub Pages
   - Netlify
   - Vercel
   - Your own hosting

## 📝 File Structure

```
iPortfolio-1.0.0/
├── index.html (updated with chatbot integration)
├── assets/
│   ├── js/
│   │   └── chatbot.js (chatbot widget)
│   └── css/
│       └── chatbot.css (chatbot styles)
├── server/
│   ├── server.js (backend API)
│   ├── package.json (dependencies)
│   ├── .env.example (config template)
│   ├── supabase-setup.sql (database setup)
│   └── README.md (server documentation)
├── supabase-integration.js (form integration)
└── SETUP_GUIDE.md (this file)
```

## 🔧 Troubleshooting

### Chatbot not appearing
- Check browser console for errors
- Verify `chatbot.js` and `chatbot.css` are loaded
- Check that API URL is correct

### Form not saving to Supabase
- Verify Supabase credentials in `.env`
- Check that table was created (run SQL setup)
- Check server logs for errors
- Verify RLS policies allow inserts

### WhatsApp not working
- Verify Twilio credentials
- Check webhook URL is accessible
- For local testing, use ngrok
- Check Twilio console for error logs

### Server won't start
- Check Node.js is installed: `node --version`
- Verify all dependencies installed: `npm install`
- Check `.env` file exists and has correct values
- Check port 3000 is not in use

## 📞 Support

If you encounter issues:
1. Check server logs for error messages
2. Verify all environment variables are set
3. Test API endpoints with curl or Postman
4. Check Supabase dashboard for database issues

## ✅ Checklist

- [ ] Supabase account created and project set up
- [ ] Database table created (ran SQL setup)
- [ ] Supabase credentials added to `.env`
- [ ] Node.js installed and server running
- [ ] Chatbot appears on website
- [ ] Form submissions save to Supabase
- [ ] (Optional) WhatsApp integration configured
- [ ] (Optional) OpenAI integration configured
- [ ] Production deployment completed

## 🎉 You're All Set!

Your portfolio website now has:
- ✅ Intelligent chatbot that understands your services
- ✅ Database storage for contact forms
- ✅ WhatsApp integration capability
- ✅ Professional backend API

Enjoy your enhanced portfolio website!

