/**
 * SriVoraTech Centralized Company Configuration
 * Single source of truth for company contact details, branding, and legal identifiers.
 */

export const COMPANY_CONFIG = {
  name: 'SriVoraTech',
  legalName: 'SriVoraTech Technologies',
  tagline: 'Next-Gen IT Services & Intelligent AI Solutions',
  domain: 'https://www.srivoratech.in',
  canonicalUrl: 'https://www.srivoratech.in',
  
  // Official Communication Channels
  email: {
    support: 'contact@srivoratech.in',
    founder: 'srikanth@srivoratech.in',
    alternateFounder: 'srikanthbsqy@gmail.com',
  },
  
  phone: {
    display: '+91 91820 30946',
    international: '+919182030946',
    whatsapp: '919182030946',
    whatsappLink: 'https://wa.me/919182030946?text=Hi%20SriVoraTech%2C%20I%20would%20like%20to%20discuss%20a%20project',
  },

  location: {
    city: 'Hyderabad',
    state: 'Telangana',
    country: 'India',
    addressDisplay: 'Hyderabad, Telangana, India',
    geo: {
      latitude: '17.385044',
      longitude: '78.486671',
    },
  },

  leadership: [
    {
      name: 'Badisa Srikanth',
      title: 'Founder & Chief Executive Officer',
      email: 'srikanth@srivoratech.in',
      linkedin: 'https://www.linkedin.com/in/srikanth-badisa-7090b4317',
      bio: 'Visionary entrepreneur and full-stack software architect specializing in scalable enterprise platforms, cloud architecture, and AI engineering.',
    },
    {
      name: 'Badisa Vamsi Krishna',
      title: 'Co-Founder & Chief Operating Officer',
      email: 'vamsibadisabadisa126@gmail.com',
      linkedin: 'https://www.linkedin.com/in/vamsi-krishna-badisa-460621371',
      bio: 'Operations and client success lead dedicated to agile project execution, operational excellence, and enterprise relationship management.',
    },
    {
      name: 'Garapati Sai Manindra',
      title: 'Chief Technology Officer',
      email: 'saimanindragarapati@gmail.com',
      linkedin: 'https://www.linkedin.com/in/sai-manindra-garapati-430b20317',
      bio: 'Cloud infrastructure and AI architect leading modern web architecture, distributed systems, and intelligent workflow automation.',
    },
  ],

  social: {
    linkedin: 'https://www.linkedin.com/company/srivoratech',
    github: 'https://github.com/Rajupeace/SriVoraTech',
    twitter: 'https://x.com/srivorateclrqn',
    instagram: 'https://www.instagram.com/srivora_tech?igsh=MWRxOWJ6Z2F6bnUzdg==',
    facebook: 'https://www.facebook.com/p/SriVoratech-SriVoratech-61591870486562/',
  },

  yearEstablished: 2024,
  copyrightYear: new Date().getFullYear(),
}

// Convenient alias for components
export const COMPANY = {
  ...COMPANY_CONFIG,
  website: COMPANY_CONFIG.canonicalUrl,
  contactEmail: COMPANY_CONFIG.email.support,
  phone: COMPANY_CONFIG.phone.display,
  phoneRaw: COMPANY_CONFIG.phone.whatsapp,
  socials: COMPANY_CONFIG.social,
}

export default COMPANY_CONFIG
