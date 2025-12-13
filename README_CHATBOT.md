# 🤖 Portfolio Chatbot & Integration System

A comprehensive chatbot and integration system for your portfolio website with Supabase database storage and WhatsApp connectivity.

## ✨ Features

- **Intelligent Chatbot**: Understands all your services, skills, portfolio, and contact information
- **Supabase Integration**: Automatically saves contact form submissions to a database
- **WhatsApp Integration**: Connect your chatbot to WhatsApp via Twilio
- **AI-Powered Responses**: Optional OpenAI integration for enhanced conversational abilities
- **Modern UI**: Beautiful, responsive chatbot widget that matches your portfolio design

## 🎯 What the Chatbot Knows

The chatbot is pre-loaded with knowledge about:

- ✅ All 6 services you offer
- ✅ Your skills and expertise
- ✅ Portfolio projects
- ✅ Contact information
- ✅ Professional experience
- ✅ Pricing inquiries

## 📦 What's Included

### Frontend Files
- `assets/js/chatbot.js` - Chatbot widget logic
- `assets/css/chatbot.css` - Chatbot styling
- `supabase-integration.js` - Form submission integration
- Updated `index.html` - Integrated chatbot

### Backend Files
- `server/server.js` - Node.js API server
- `server/package.json` - Dependencies
- `server/supabase-setup.sql` - Database schema
- `server/.env.example` - Configuration template

### Documentation
- `SETUP_GUIDE.md` - Complete setup instructions
- `server/README.md` - API documentation

## 🚀 Quick Setup

### 1. Supabase Setup (5 minutes)

1. Create account at https://supabase.com
2. Create new project
3. Copy Project URL and API key
4. Run SQL from `server/supabase-setup.sql` in SQL Editor

### 2. Backend Setup (5 minutes)

```bash
cd server
npm install
cp .env.example .env
# Edit .env with your Supabase credentials
npm start
```

### 3. Website Integration (Already Done!)

The chatbot is already integrated into your `index.html`. Just:
1. Update the API URL in `index.html` (line ~720)
2. Open your website
3. Click the chat icon in bottom right!

## 💬 Using the Chatbot

Users can ask questions like:
- "What services do you offer?"
- "Tell me about your photography services"
- "What's your contact information?"
- "How much do you charge?"
- "Show me your portfolio"
- "What are your skills?"

## 📝 Form Integration

Contact forms are automatically saved to Supabase:
- All submissions stored in `contact_submissions` table
- Original PHP email still works
- Database backup of all inquiries

## 📱 WhatsApp Integration

### Free Testing (Twilio Sandbox)
1. Sign up at https://www.twilio.com
2. Join WhatsApp sandbox
3. Add credentials to `.env`
4. Configure webhook URL

### Production
- Use WhatsApp Business API
- Providers: Twilio, MessageBird, 360dialog
- Requires business verification

## 🧠 Enhanced AI (Optional)

Add OpenAI for smarter responses:
1. Get API key from https://platform.openai.com
2. Add to `.env`: `OPENAI_API_KEY=sk-...`
3. Restart server

## 🌐 Deployment

### Backend
Deploy to:
- **Heroku**: `heroku create && git push heroku main`
- **Railway**: Connect GitHub repo
- **Vercel**: `vercel` command

### Frontend
Deploy to:
- GitHub Pages
- Netlify
- Vercel
- Your hosting

**Important**: Update API URL in `index.html` to your deployed backend URL.

## 🔧 Configuration

### Environment Variables

```env
# Required
SUPABASE_URL=https://xxx.supabase.co
SUPABASE_ANON_KEY=your_key

# Optional - Enhanced AI
OPENAI_API_KEY=sk-...

# Optional - WhatsApp
TWILIO_ACCOUNT_SID=AC...
TWILIO_AUTH_TOKEN=...
```

### Website Configuration

In `index.html`, update:
```javascript
window.CHATBOT_API_URL = 'https://your-api-domain.com/api';
```

## 📊 Database Schema

The `contact_submissions` table stores:
- `id` - UUID
- `name` - Text
- `email` - Text
- `subject` - Text
- `message` - Text
- `created_at` - Timestamp
- `read` - Boolean
- `responded` - Boolean

## 🎨 Customization

### Chatbot Appearance
Edit `assets/css/chatbot.css`:
- Colors: Change gradient in `.chatbot-toggle` and `.chatbot-header`
- Size: Adjust width/height in `.chatbot-container`
- Position: Modify `bottom` and `right` values

### Chatbot Knowledge
Edit `assets/js/chatbot.js`:
- Update `knowledgeBase` object
- Add new response patterns in `processMessageLocally()`

### API Responses
Edit `server/server.js`:
- Modify `processChatbotMessage()` function
- Add new response patterns
- Customize OpenAI prompts

## 🐛 Troubleshooting

**Chatbot not appearing?**
- Check browser console
- Verify files are loaded
- Check API URL is correct

**Forms not saving?**
- Verify Supabase credentials
- Check table exists
- Review server logs

**WhatsApp not working?**
- Check Twilio credentials
- Verify webhook URL
- Use ngrok for local testing

## 📚 API Endpoints

- `POST /api/chat` - Chatbot messages
- `POST /api/submit-form` - Form submissions
- `POST /api/whatsapp` - WhatsApp webhook
- `GET /api/health` - Health check

## 🔒 Security

- Environment variables for sensitive data
- Row Level Security (RLS) in Supabase
- CORS protection
- Input validation

## 📄 License

MIT License - Feel free to use and modify!

## 🆘 Support

For issues:
1. Check `SETUP_GUIDE.md` for detailed instructions
2. Review server logs
3. Verify all environment variables
4. Test API endpoints directly

## 🎉 Success!

Your portfolio now has:
- ✅ Professional chatbot
- ✅ Database-backed forms
- ✅ WhatsApp connectivity
- ✅ AI-powered responses

Enjoy your enhanced portfolio website!

