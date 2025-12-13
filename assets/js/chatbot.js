/**
 * Chatbot Widget for Sebai Houssem Portfolio
 * Understands all website content and services
 */

class PortfolioChatbot {
  constructor() {
    this.isOpen = false;
    this.apiUrl = window.CHATBOT_API_URL || 'http://localhost:3000/api';
    this.init();
    this.loadKnowledgeBase();
  }

  // Knowledge base extracted from website content
  knowledgeBase = {
    about: {
      name: "Sebai Houssem",
      profession: "Multimedia professional specializing in design, photography, videography, and photo editing",
      description: "Creative and detail-oriented, I excel at producing high-quality visual content that effectively communicates ideas and strengthens brand identity. Passionate about innovation and continuous improvement, I combine strong technical expertise with artistic vision to deliver impactful, professional, and visually engaging results.",
      birthday: "29 May 2001",
      age: 24,
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
      graphicDesign: ["Brand Identity & Logo Design", "Marketing Collateral (Social Media, Print, Billboards)", "UI/UX Basics", "Typography & Layout"],
      photography: ["Studio Lighting & Composition", "High-end Retouching & Manipulation", "Product, Event, & Portrait Photography"],
      videography: ["Video Editing & Storytelling", "Color Grading (Log/RAW workflows)", "Motion Graphics & Title Animation", "Scriptwriting & Storyboarding"],
      software: ["Adobe Creative Cloud: Photoshop, Illustrator, InDesign, Premiere Pro, After Effects, Lightroom", "Other: DaVinci Resolve (Color), Figma (Design), Capture One"]
    },
    portfolio: {
      categories: ["Posters", "Branding", "Illustration"],
      projects: ["Posters Collection", "Moly Night Bar", "Aura Clothing", "Illustration Gallery"]
    },
    experience: [
      {
        company: "CJ Studio",
        period: "2025-09 to 2025-05",
        location: "Laouina, Tunis, Tunisia, 2045",
        role: "Internship - videography, video editing, photography, and image retouching"
      },
      {
        company: "Asnopub",
        period: "Oct 2021 - Jul 2023",
        location: "Avenue Farhat Hached, Morneg 2090, Tunis",
        role: "Internship in printing - file preparation, print monitoring, and quality control"
      },
      {
        company: "Travel Center",
        period: "2020-09 to 2021-05",
        location: "Centre Nawrez, Bloc B 2-1, Rue du Lac Lémon, Les Berges du Lac, Tunis",
        role: "Internship - media videographer and designer"
      }
    ]
  };

  init() {
    this.createChatbotUI();
    this.attachEventListeners();
  }

  createChatbotUI() {
    const chatbotHTML = `
      <div id="chatbot-container" class="chatbot-container">
        <div id="chatbot-header" class="chatbot-header">
          <div class="chatbot-header-content">
            <div class="chatbot-avatar">
              <i class="bi bi-robot"></i>
            </div>
            <div class="chatbot-info">
              <h4>Portfolio Assistant</h4>
              <p>Ask me anything about services & portfolio</p>
            </div>
          </div>
          <button id="chatbot-close" class="chatbot-close">
            <i class="bi bi-x-lg"></i>
          </button>
        </div>
        <div id="chatbot-messages" class="chatbot-messages"></div>
        <div id="chatbot-input-container" class="chatbot-input-container">
          <input type="text" id="chatbot-input" placeholder="Type your message..." autocomplete="off">
          <button id="chatbot-send" class="chatbot-send">
            <i class="bi bi-send-fill"></i>
          </button>
        </div>
      </div>
      <button id="chatbot-toggle" class="chatbot-toggle">
        <i class="bi bi-chat-dots-fill"></i>
      </button>
    `;

    document.body.insertAdjacentHTML('beforeend', chatbotHTML);
    this.addWelcomeMessage();
  }

  addWelcomeMessage() {
    const welcomeMessage = "Hello! I'm your portfolio assistant. I can help you learn about:\n\n• Services offered\n• Skills and expertise\n• Portfolio projects\n• Contact information\n• Experience and background\n\nWhat would you like to know?";
    this.addMessage(welcomeMessage, 'bot');
  }

  attachEventListeners() {
    const toggle = document.getElementById('chatbot-toggle');
    const close = document.getElementById('chatbot-close');
    const send = document.getElementById('chatbot-send');
    const input = document.getElementById('chatbot-input');

    toggle.addEventListener('click', () => this.toggleChatbot());
    close.addEventListener('click', () => this.toggleChatbot());
    send.addEventListener('click', () => this.sendMessage());
    input.addEventListener('keypress', (e) => {
      if (e.key === 'Enter') this.sendMessage();
    });
  }

  toggleChatbot() {
    this.isOpen = !this.isOpen;
    const container = document.getElementById('chatbot-container');
    if (this.isOpen) {
      container.classList.add('chatbot-open');
    } else {
      container.classList.remove('chatbot-open');
    }
  }

  async sendMessage() {
    const input = document.getElementById('chatbot-input');
    const message = input.value.trim();
    
    if (!message) return;

    this.addMessage(message, 'user');
    input.value = '';

    // Show typing indicator
    const typingId = this.showTypingIndicator();

    try {
      // Try to get response from API, fallback to local processing
      const response = await this.getChatbotResponse(message);
      this.hideTypingIndicator(typingId);
      this.addMessage(response, 'bot');
    } catch (error) {
      console.error('Chatbot error:', error);
      this.hideTypingIndicator(typingId);
      // Fallback to local processing
      const localResponse = this.processMessageLocally(message);
      this.addMessage(localResponse, 'bot');
    }
  }

  async getChatbotResponse(message) {
    try {
      const response = await fetch(`${this.apiUrl}/chat`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          message,
          knowledgeBase: this.knowledgeBase 
        })
      });

      if (!response.ok) throw new Error('API request failed');
      
      const data = await response.json();
      return data.response || this.processMessageLocally(message);
    } catch (error) {
      // Fallback to local processing if API fails
      return this.processMessageLocally(message);
    }
  }

  processMessageLocally(message) {
    const lowerMessage = message.toLowerCase();

    // Service queries
    if (lowerMessage.includes('service') || lowerMessage.includes('what do you offer') || lowerMessage.includes('what can you do')) {
      let response = "I offer the following services:\n\n";
      this.knowledgeBase.services.forEach((service, index) => {
        response += `${index + 1}. ${service.name}\n   ${service.description}\n\n`;
      });
      return response;
    }

    // Specific service queries
    for (const service of this.knowledgeBase.services) {
      if (lowerMessage.includes(service.name.toLowerCase().split(' ')[0]) || 
          lowerMessage.includes(service.name.toLowerCase().split(' ')[1])) {
        return `${service.name}:\n${service.description}`;
      }
    }

    // Contact information
    if (lowerMessage.includes('contact') || lowerMessage.includes('email') || lowerMessage.includes('phone') || lowerMessage.includes('address')) {
      return `Contact Information:\n\n📧 Email: ${this.knowledgeBase.about.email}\n📱 Phone: ${this.knowledgeBase.about.phone}\n📍 Address: ${this.knowledgeBase.about.address}\n\nI'm available for freelance work!`;
    }

    // About queries
    if (lowerMessage.includes('about') || lowerMessage.includes('who are you') || lowerMessage.includes('introduce')) {
      return `About ${this.knowledgeBase.about.name}:\n\n${this.knowledgeBase.about.description}\n\nI'm ${this.knowledgeBase.about.age} years old, based in ${this.knowledgeBase.about.city}, and currently ${this.knowledgeBase.about.freelance.toLowerCase()} for freelance projects.`;
    }

    // Skills queries
    if (lowerMessage.includes('skill') || lowerMessage.includes('expertise') || lowerMessage.includes('what are you good at')) {
      return `My Skills:\n\n🎨 Graphic Design:\n${this.knowledgeBase.skills.graphicDesign.join(', ')}\n\n📸 Photography:\n${this.knowledgeBase.skills.photography.join(', ')}\n\n🎬 Videography:\n${this.knowledgeBase.skills.videography.join(', ')}\n\n💻 Software:\n${this.knowledgeBase.skills.software.join(', ')}`;
    }

    // Portfolio queries
    if (lowerMessage.includes('portfolio') || lowerMessage.includes('project') || lowerMessage.includes('work')) {
      return `Portfolio Projects:\n\n${this.knowledgeBase.portfolio.projects.join(', ')}\n\nYou can view these projects in the Portfolio section of the website. Each project showcases different styles and visual fields.`;
    }

    // Pricing queries
    if (lowerMessage.includes('price') || lowerMessage.includes('cost') || lowerMessage.includes('rate') || lowerMessage.includes('how much')) {
      return `For pricing information, please contact me directly at ${this.knowledgeBase.about.email} or ${this.knowledgeBase.about.phone}. I'd be happy to discuss your project requirements and provide a customized quote.`;
    }

    // Experience queries
    if (lowerMessage.includes('experience') || lowerMessage.includes('work history') || lowerMessage.includes('background')) {
      let response = "Professional Experience:\n\n";
      this.knowledgeBase.experience.forEach(exp => {
        response += `🏢 ${exp.company}\n   Period: ${exp.period}\n   Location: ${exp.location}\n   Role: ${exp.role}\n\n`;
      });
      return response;
    }

    // Default response
    return "I can help you with information about:\n\n• Services offered\n• Skills and expertise\n• Portfolio projects\n• Contact information\n• Experience\n\nCould you be more specific about what you'd like to know?";
  }

  addMessage(text, sender) {
    const messagesContainer = document.getElementById('chatbot-messages');
    const messageDiv = document.createElement('div');
    messageDiv.className = `chatbot-message chatbot-message-${sender}`;
    
    const messageContent = document.createElement('div');
    messageContent.className = 'chatbot-message-content';
    messageContent.textContent = text;
    
    messageDiv.appendChild(messageContent);
    messagesContainer.appendChild(messageDiv);
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
  }

  showTypingIndicator() {
    const messagesContainer = document.getElementById('chatbot-messages');
    const typingDiv = document.createElement('div');
    typingDiv.className = 'chatbot-message chatbot-message-bot chatbot-typing';
    typingDiv.id = 'typing-indicator';
    typingDiv.innerHTML = '<div class="chatbot-message-content"><span></span><span></span><span></span></div>';
    messagesContainer.appendChild(typingDiv);
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
    return 'typing-indicator';
  }

  hideTypingIndicator(id) {
    const typing = document.getElementById(id);
    if (typing) typing.remove();
  }

  loadKnowledgeBase() {
    // Knowledge base is already loaded in the class
    // This method can be extended to load from API if needed
  }
}

// Initialize chatbot when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => {
    window.portfolioChatbot = new PortfolioChatbot();
  });
} else {
  window.portfolioChatbot = new PortfolioChatbot();
}

