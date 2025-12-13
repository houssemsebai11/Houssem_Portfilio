# WhatsApp Notification Setup Guide

## 📱 Overview

When someone submits the contact form on your website, you'll receive a WhatsApp notification with all the form details.

## 🚀 Quick Setup

### Step 1: Set Up Twilio WhatsApp (Free Sandbox)

1. **Sign up for Twilio**
   - Go to https://www.twilio.com/try-twilio
   - Create a free account (includes $15.50 credit)

2. **Get Your Credentials**
   - Go to Twilio Console: https://console.twilio.com/
   - Copy your **Account SID** and **Auth Token**

3. **Set Up WhatsApp Sandbox**
   - Go to: https://console.twilio.com/us1/develop/sms/try-it-out/whatsapp-learn
   - Follow instructions to join the sandbox
   - You'll get a number like: `whatsapp:+14155238886`
   - Send the join code to activate

4. **Get Your WhatsApp Number**
   - Your WhatsApp number format: `whatsapp:+21621988631`
   - Include country code (216 for Tunisia)
   - Format: `whatsapp:+[country code][number]`
   - Example: `whatsapp:+21621988631`

### Step 2: Configure Environment Variables

1. **Edit `server/.env` file:**
   ```env
   # Twilio Configuration
   TWILIO_ACCOUNT_SID=ACxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
   TWILIO_AUTH_TOKEN=your_auth_token_here
   TWILIO_WHATSAPP_NUMBER=whatsapp:+14155238886
   
   # Your WhatsApp number to receive notifications
   WHATSAPP_TO_NUMBER=whatsapp:+21621988631
   ```

2. **Replace with your actual values:**
   - `TWILIO_ACCOUNT_SID`: From Twilio Console
   - `TWILIO_AUTH_TOKEN`: From Twilio Console
   - `TWILIO_WHATSAPP_NUMBER`: The sandbox number (usually `whatsapp:+14155238886`)
   - `WHATSAPP_TO_NUMBER`: **Your WhatsApp number** (format: `whatsapp:+21621988631`)

### Step 3: Restart Server

```bash
cd server
npm start
```

You should see:
```
✅ Twilio configured
✅ WhatsApp notifications enabled for: whatsapp:+21621988631
```

### Step 4: Test It!

1. Submit the contact form on your website
2. Check your WhatsApp - you should receive a message like:

```
📧 *New Contact Form Submission*

👤 *Name:* John Doe
📧 *Email:* john@example.com
📌 *Subject:* Project Inquiry

💬 *Message:*
I'm interested in your services...

---
Portfolio Website Contact Form
```

## 🔧 Troubleshooting

### Issue: "WhatsApp not configured"

**Solution:**
- Check that all Twilio credentials are set in `.env`
- Make sure `WHATSAPP_TO_NUMBER` is set
- Restart the server after changing `.env`

### Issue: "Failed to send notification"

**Possible causes:**
1. **Not joined sandbox**: Send the join code to the Twilio WhatsApp number
2. **Wrong number format**: Must be `whatsapp:+21621988631` (with country code)
3. **Sandbox restrictions**: Can only message numbers that joined the sandbox
4. **Insufficient credits**: Check Twilio account balance

**Solutions:**
- Verify your number format: `whatsapp:+[country][number]`
- Make sure you sent the join code to activate sandbox
- Check Twilio console for error logs
- Verify you have credits in your Twilio account

### Issue: Not receiving messages

**Check:**
1. Server logs for errors
2. Twilio console → Monitor → Logs
3. WhatsApp number format is correct
4. You've joined the sandbox

## 📋 WhatsApp Number Format

**Important:** Your WhatsApp number must include country code!

- ✅ Correct: `whatsapp:+21621988631`
- ✅ Correct: `whatsapp:+12125551234`
- ❌ Wrong: `whatsapp:21988631` (missing country code)
- ❌ Wrong: `+21621988631` (missing `whatsapp:` prefix)

**For Tunisia:**
- Country code: `216`
- Format: `whatsapp:+216[your number]`
- Example: `whatsapp:+21621988631`

## 🚀 Production Setup

For production use (outside sandbox):

1. **Apply for WhatsApp Business API**
   - Requires business verification
   - Go to Twilio Console → Messaging → WhatsApp
   - Follow approval process

2. **Use Production Number**
   - After approval, you'll get a production number
   - Update `TWILIO_WHATSAPP_NUMBER` in `.env`
   - No need to join sandbox

3. **Costs**
   - Sandbox: Free for testing
   - Production: ~$0.005 per message (very cheap!)

## 🎯 Alternative: WhatsApp Business API Direct

If you have WhatsApp Business API access:

1. Use providers like:
   - Twilio (easiest)
   - MessageBird
   - 360dialog
   - WhatsApp Cloud API (Meta)

2. Update the `sendWhatsAppNotification` function in `server.js` to use your provider

## ✅ Testing Checklist

- [ ] Twilio account created
- [ ] Credentials added to `.env`
- [ ] WhatsApp sandbox joined
- [ ] `WHATSAPP_TO_NUMBER` set correctly
- [ ] Server restarted
- [ ] Test form submission
- [ ] Received WhatsApp notification

## 📞 Support

If you need help:
1. Check Twilio console logs
2. Review server logs
3. Verify number format
4. Test with Twilio's test tools

---

**You're all set!** Every form submission will now notify you on WhatsApp! 🎉

