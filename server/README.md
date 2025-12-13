# Portfolio Chatbot API Server

Backend API server for the portfolio website chatbot, form submissions, and WhatsApp integration.

## Features

- 🤖 Chatbot API with website knowledge base
- 📝 Form submission handling with Supabase integration
- 📱 WhatsApp integration via Twilio
- 🧠 Optional OpenAI integration for enhanced responses

## Setup Instructions

### 1. Install Dependencies

```bash
cd server
npm install
```

### 2. Configure Environment Variables

Copy `.env.example` to `.env` and fill in your credentials:

```bash
cp .env.example .env
```

Edit `.env` with your actual values:

```env
PORT=3000

# Supabase (Required for form storage)
SUPABASE_URL=https://your-project.supabase.co
SUPABASE_ANON_KEY=your_anon_key

# OpenAI (Optional - for enhanced chatbot)
OPENAI_API_KEY=your_openai_key

# Twilio (Optional - for WhatsApp)
TWILIO_ACCOUNT_SID=your_account_sid
TWILIO_AUTH_TOKEN=your_auth_token
```

### 3. Set Up Supabase Database

1. Go to your Supabase project dashboard
2. Navigate to SQL Editor
3. Run the SQL from `supabase-setup.sql` to create the `contact_submissions` table

### 4. Run the Server

**Development mode:**
```bash
npm run dev
```

**Production mode:**
```bash
npm start
```

The server will start on `http://localhost:3000`

## API Endpoints

### POST `/api/chat`
Chatbot endpoint for processing user messages.

**Request:**
```json
{
  "message": "What services do you offer?",
  "knowledgeBase": {} // optional
}
```

**Response:**
```json
{
  "response": "I offer the following services..."
}
```

### POST `/api/submit-form`
Submit contact form to Supabase.

**Request:**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "subject": "Project Inquiry",
  "message": "I'm interested in..."
}
```

**Response:**
```json
{
  "success": true,
  "message": "Form submitted successfully",
  "id": "uuid-here"
}
```

### POST `/api/whatsapp`
Twilio webhook endpoint for WhatsApp messages.

### GET `/api/health`
Health check endpoint.

## WhatsApp Integration Setup

### Using Twilio

1. Sign up for a Twilio account: https://www.twilio.com/
2. Get your Account SID and Auth Token from the Twilio Console
3. Set up WhatsApp Sandbox: https://www.twilio.com/docs/whatsapp/sandbox
4. Configure webhook URL in Twilio Console: `https://your-domain.com/api/whatsapp`
5. Add credentials to `.env`

### Alternative: WhatsApp Business API

For production use, you'll need to:
1. Apply for WhatsApp Business API access
2. Use a service like Twilio, MessageBird, or 360dialog
3. Configure webhooks accordingly

## Deployment

### Deploy to Heroku

```bash
heroku create your-app-name
heroku config:set SUPABASE_URL=your_url
heroku config:set SUPABASE_ANON_KEY=your_key
# ... set other env vars
git push heroku main
```

### Deploy to Vercel

1. Install Vercel CLI: `npm i -g vercel`
2. Run `vercel` in the server directory
3. Set environment variables in Vercel dashboard

### Deploy to Railway

1. Connect your GitHub repository
2. Set environment variables in Railway dashboard
3. Deploy automatically

## Testing

Test the API endpoints using curl or Postman:

```bash
# Test chatbot
curl -X POST http://localhost:3000/api/chat \
  -H "Content-Type: application/json" \
  -d '{"message": "What services do you offer?"}'

# Test form submission
curl -X POST http://localhost:3000/api/submit-form \
  -H "Content-Type: application/json" \
  -d '{"name": "Test", "email": "test@example.com", "subject": "Test", "message": "Test message"}'

# Health check
curl http://localhost:3000/api/health
```

## Troubleshooting

- **Supabase connection issues**: Verify your URL and API key are correct
- **WhatsApp not working**: Check Twilio credentials and webhook configuration
- **OpenAI errors**: Verify API key and check usage limits
- **CORS errors**: Ensure your frontend URL is allowed in CORS settings

## License

MIT

