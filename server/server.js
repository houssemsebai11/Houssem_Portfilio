/**
 * Backend API Server for Portfolio Chatbot
 * Handles chatbot requests, form submissions, and WhatsApp integration
 */

require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { createClient } = require('@supabase/supabase-js');
const twilio = require('twilio');
const axios = require('axios');
const OpenAI = require('openai');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
// CORS configuration - allow requests from any origin (for development)
// In production, you should restrict this to your website domain
app.use(cors({
  origin: '*', // Allow all origins (change in production)
  methods: ['GET', 'POST', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Supabase Configuration
const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_ANON_KEY;
const supabase = supabaseUrl && supabaseKey ? createClient(supabaseUrl, supabaseKey) : null;

// OpenAI Configuration (optional - for enhanced chatbot)
const openai = process.env.OPENAI_API_KEY ? new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
}) : null;

// Twilio Configuration (for WhatsApp)
const twilioClient = process.env.TWILIO_ACCOUNT_SID && process.env.TWILIO_AUTH_TOKEN 
  ? twilio(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN)
  : null;

// Website Knowledge Base
const knowledgeBase = {
  about: {
    name: "Sebai Houssem",
    profession: "Multimedia professional specializing in design, photography, videography, and photo editing",
    description: "Creative and detail-oriented, I excel at producing high-quality visual content that effectively communicates ideas and strengthens brand identity.",
    phone: "+216 21 988 631",
    email: "sebaihoussem11@gmail.com",
    city: "Tunis, Tunisia",
    address: "Tunis, Tunisia Les Berge du Lac1 1053",
    freelance: "Available"
  },
  services: [
    {
      name: "Brand Identity & Logo Design",
      description: "I personally develop complete brand identities and logos that align with your vision and enhance your market presence."
    },
    {
      name: "Graphic Design for Marketing Collateral",
      description: "I create compelling and professional visual assets for all your marketing needs, including social media, print, and billboards."
    },
    {
      name: "Complete Videography & Editing",
      description: "I handle the entire video workflow, from initial scriptwriting and storyboarding to shooting, editing, storytelling, and professional color grading (Log/RAW workflows)."
    },
    {
      name: "Photography & Image Retouching",
      description: "I offer high-quality professional photography services and use expert image retouching and photo editing to ensure a polished final product."
    },
    {
      name: "Motion Graphics & Animation",
      description: "I produce dynamic animated graphics and title sequences to make your videos and digital content more engaging and impactful."
    },
    {
      name: "Print File Preparation & Quality Control",
      description: "I ensure your design files are correctly prepared for professional printing, including quality control and print monitoring."
    }
  ],
  skills: {
    graphicDesign: ["Brand Identity & Logo Design", "Marketing Collateral", "UI/UX Basics", "Typography & Layout"],
    photography: ["Studio Lighting & Composition", "High-end Retouching & Manipulation", "Product, Event, & Portrait Photography"],
    videography: ["Video Editing & Storytelling", "Color Grading", "Motion Graphics & Title Animation", "Scriptwriting & Storyboarding"],
    software: ["Adobe Creative Cloud", "DaVinci Resolve", "Figma", "Capture One"]
  }
};

/**
 * Process chatbot message with AI or rule-based response
 */
function processChatbotMessage(message, userKnowledgeBase = null) {
  const kb = userKnowledgeBase || knowledgeBase;
  const lowerMessage = message.toLowerCase();

  // Service queries
  if (lowerMessage.includes('service') || lowerMessage.includes('what do you offer') || lowerMessage.includes('what can you do')) {
    let response = "I offer the following services:\n\n";
    kb.services.forEach((service, index) => {
      response += `${index + 1}. ${service.name}\n   ${service.description}\n\n`;
    });
    return response;
  }

  // Specific service queries
  for (const service of kb.services) {
    const serviceKeywords = service.name.toLowerCase().split(' ');
    if (serviceKeywords.some(keyword => lowerMessage.includes(keyword))) {
      return `${service.name}:\n${service.description}\n\nWould you like to know more or discuss a project?`;
    }
  }

  // Contact information
  if (lowerMessage.includes('contact') || lowerMessage.includes('email') || lowerMessage.includes('phone') || lowerMessage.includes('address')) {
    return `Contact Information:\n\n📧 Email: ${kb.about.email}\n📱 Phone: ${kb.about.phone}\n📍 Address: ${kb.about.address}\n\nI'm available for freelance work! Feel free to reach out.`;
  }

  // About queries
  if (lowerMessage.includes('about') || lowerMessage.includes('who are you') || lowerMessage.includes('introduce')) {
    return `About ${kb.about.name}:\n\n${kb.about.description}\n\nI'm based in ${kb.about.city} and currently ${kb.about.freelance.toLowerCase()} for freelance projects.`;
  }

  // Skills queries
  if (lowerMessage.includes('skill') || lowerMessage.includes('expertise') || lowerMessage.includes('what are you good at')) {
    return `My Skills:\n\n🎨 Graphic Design:\n${kb.skills.graphicDesign.join(', ')}\n\n📸 Photography:\n${kb.skills.photography.join(', ')}\n\n🎬 Videography:\n${kb.skills.videography.join(', ')}\n\n💻 Software:\n${kb.skills.software.join(', ')}`;
  }

  // Pricing queries
  if (lowerMessage.includes('price') || lowerMessage.includes('cost') || lowerMessage.includes('rate') || lowerMessage.includes('how much')) {
    return `For pricing information, please contact me directly at ${kb.about.email} or ${kb.about.phone}. I'd be happy to discuss your project requirements and provide a customized quote.`;
  }

  // Portfolio queries
  if (lowerMessage.includes('portfolio') || lowerMessage.includes('project') || lowerMessage.includes('work')) {
    return `I have worked on various projects including:\n• Posters Collection\n• Brand Identity (Moly Night Bar, Aura Clothing)\n• Illustration Gallery\n\nYou can view these projects in the Portfolio section of the website.`;
  }

  // Default response
  return `I can help you with information about:\n\n• Services offered\n• Skills and expertise\n• Portfolio projects\n• Contact information\n• Pricing\n\nCould you be more specific about what you'd like to know?`;
}

/**
 * Enhanced chatbot response using OpenAI (if available)
 */
async function getEnhancedResponse(message, knowledgeBase) {
  if (!openai) {
    return processChatbotMessage(message, knowledgeBase);
  }

  try {
    const prompt = `You are a helpful assistant for Sebai Houssem's portfolio website. 
    
About Sebai Houssem:
- Name: ${knowledgeBase.about.name}
- Profession: ${knowledgeBase.about.profession}
- Description: ${knowledgeBase.about.description}
- Email: ${knowledgeBase.about.email}
- Phone: ${knowledgeBase.about.phone}
- Location: ${knowledgeBase.about.city}

Services Offered:
${knowledgeBase.services.map((s, i) => `${i + 1}. ${s.name}: ${s.description}`).join('\n')}

Skills:
- Graphic Design: ${knowledgeBase.skills.graphicDesign.join(', ')}
- Photography: ${knowledgeBase.skills.photography.join(', ')}
- Videography: ${knowledgeBase.skills.videography.join(', ')}
- Software: ${knowledgeBase.skills.software.join(', ')}

User Question: ${message}

Provide a helpful, friendly, and professional response. Keep it concise (2-3 sentences max unless detailed explanation is needed).`;

    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        { role: "system", content: "You are a helpful portfolio assistant. Be friendly, professional, and concise." },
        { role: "user", content: prompt }
      ],
      max_tokens: 200,
      temperature: 0.7
    });

    return completion.choices[0].message.content;
  } catch (error) {
    console.error('OpenAI error:', error);
    return processChatbotMessage(message, knowledgeBase);
  }
}

// API Routes

/**
 * Chatbot endpoint
 */
app.post('/api/chat', async (req, res) => {
  try {
    const { message, knowledgeBase: userKB } = req.body;

    if (!message) {
      return res.status(400).json({ error: 'Message is required' });
    }

    const kb = userKB || knowledgeBase;
    const response = await getEnhancedResponse(message, kb);

    res.json({ response });
  } catch (error) {
    console.error('Chat error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

/**
 * Form submission endpoint (Supabase + WhatsApp Notification)
 */
app.post('/api/submit-form', async (req, res) => {
  try {
    const { name, email, subject, message } = req.body;

    if (!name || !email || !subject || !message) {
      return res.status(400).json({ error: 'All fields are required' });
    }

    // Save to Supabase if configured
    let submissionId = null;
    if (supabase) {
      const { data, error } = await supabase
        .from('contact_submissions')
        .insert([
          {
            name,
            email,
            subject,
            message,
            created_at: new Date().toISOString()
          }
        ])
        .select();

      if (error) {
        console.error('Supabase error:', error);
        return res.status(500).json({ error: 'Failed to save submission: ' + error.message });
      }

      submissionId = data[0].id;
      console.log('✅ Form saved to Supabase:', submissionId);
    } else {
      console.warn('⚠️ Supabase not configured - form not saved to database');
    }

    // Send WhatsApp notification if configured
    if (twilioClient && process.env.WHATSAPP_TO_NUMBER) {
      try {
        await sendWhatsAppNotification(name, email, subject, message);
        console.log('✅ WhatsApp notification sent');
      } catch (whatsappError) {
        console.error('⚠️ WhatsApp notification failed:', whatsappError.message);
        // Don't fail the request if WhatsApp fails
      }
    }

    return res.json({ 
      success: true, 
      message: 'Form submitted successfully',
      id: submissionId 
    });
  } catch (error) {
    console.error('Form submission error:', error);
    res.status(500).json({ error: 'Internal server error: ' + error.message });
  }
});

/**
 * Send WhatsApp notification for new form submission
 */
async function sendWhatsAppNotification(name, email, subject, message) {
  if (!twilioClient || !process.env.WHATSAPP_TO_NUMBER) {
    throw new Error('WhatsApp not configured');
  }

  const whatsappMessage = `📧 *New Contact Form Submission*

👤 *Name:* ${name}
📧 *Email:* ${email}
📌 *Subject:* ${subject}

💬 *Message:*
${message}

---
Portfolio Website Contact Form`;

  try {
    const message = await twilioClient.messages.create({
      from: process.env.TWILIO_WHATSAPP_NUMBER || 'whatsapp:+14155238886',
      to: process.env.WHATSAPP_TO_NUMBER, // Your WhatsApp number
      body: whatsappMessage
    });

    console.log('WhatsApp message sent:', message.sid);
    return message;
  } catch (error) {
    console.error('Twilio WhatsApp error:', error);
    throw error;
  }
}

/**
 * WhatsApp webhook endpoint (Twilio)
 */
app.post('/api/whatsapp', async (req, res) => {
  try {
    if (!twilioClient) {
      return res.status(503).send('WhatsApp integration not configured');
    }

    const incomingMessage = req.body.Body;
    const from = req.body.From;

    console.log(`WhatsApp message from ${from}: ${incomingMessage}`);

    // Get chatbot response
    const response = await getEnhancedResponse(incomingMessage, knowledgeBase);

    // Send response via Twilio
    const twiml = new twilio.twiml.MessagingResponse();
    twiml.message(response);

    res.type('text/xml');
    res.send(twiml.toString());
  } catch (error) {
    console.error('WhatsApp webhook error:', error);
    res.status(500).send('Error processing WhatsApp message');
  }
});

/**
 * WhatsApp notification endpoint (standalone)
 */
app.post('/api/notify-whatsapp', async (req, res) => {
  try {
    const { name, email, subject, message } = req.body;

    if (!name || !email || !subject || !message) {
      return res.status(400).json({ error: 'All fields are required' });
    }

    if (!twilioClient || !process.env.WHATSAPP_TO_NUMBER) {
      return res.status(503).json({ error: 'WhatsApp not configured' });
    }

    await sendWhatsAppNotification(name, email, subject, message);
    
    res.json({ success: true, message: 'WhatsApp notification sent' });
  } catch (error) {
    console.error('WhatsApp notification error:', error);
    res.status(500).json({ error: 'Failed to send notification: ' + error.message });
  }
});

/**
 * Health check endpoint
 */
app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'ok',
    supabase: supabase ? 'configured' : 'not configured',
    openai: openai ? 'configured' : 'not configured',
    twilio: twilioClient ? 'configured' : 'not configured',
    whatsapp_notifications: (twilioClient && process.env.WHATSAPP_TO_NUMBER) ? 'configured' : 'not configured'
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
  console.log(`📡 API endpoints available at http://localhost:${PORT}/api`);
  if (supabase) {
    console.log('✅ Supabase connected');
  } else {
    console.log('⚠️  Supabase not configured (set SUPABASE_URL and SUPABASE_ANON_KEY)');
  }
  if (openai) {
    console.log('✅ OpenAI configured');
  } else {
    console.log('⚠️  OpenAI not configured (optional, set OPENAI_API_KEY)');
  }
  if (twilioClient) {
    console.log('✅ Twilio configured');
    if (process.env.WHATSAPP_TO_NUMBER) {
      console.log(`✅ WhatsApp notifications enabled for: ${process.env.WHATSAPP_TO_NUMBER}`);
    } else {
      console.log('⚠️  WhatsApp notifications not configured (set WHATSAPP_TO_NUMBER in .env)');
    }
  } else {
    console.log('⚠️  Twilio not configured (optional, set TWILIO_ACCOUNT_SID and TWILIO_AUTH_TOKEN)');
  }
});

module.exports = app;

