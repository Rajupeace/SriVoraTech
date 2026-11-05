import { useState, useEffect, useMemo } from 'react'
import { useScrollAnimation } from '../hooks/useScrollAnimation'
import { Send, Sparkles, CheckCircle2, AlertCircle, Mail, User, Building2, Phone as PhoneIcon, MessageSquareText, Wallet } from 'lucide-react'
import { submitToSheet } from '../utils/submitToSheet'
import './Contact.css'

export default function Contact() {
  const [ref, isVisible] = useScrollAnimation()
  const [submitting, setSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [submittedEnquiryId, setSubmittedEnquiryId] = useState('')
  const [serverError, setServerError] = useState('')
  const [touched, setTouched] = useState({})

  // Client "Book a Call" form state
  const [clientForm, setClientForm] = useState({
    name: '',
    email: '',
    company: '',
    phone: '',
    budget: '',
    message: '',
  })

  useEffect(() => {
    const handlePopulate = (e) => {
      const { message, budget } = e.detail || {}
      setClientForm(prev => ({
        ...prev,
        message: message || prev.message,
        budget: budget || prev.budget
      }))
    }

    window.addEventListener('svt_populate_estimate', handlePopulate)
    return () => window.removeEventListener('svt_populate_estimate', handlePopulate)
  }, [])

  // Validation rules
  const validations = useMemo(() => ({
    name: {
      valid: clientForm.name.trim().length >= 2,
      message: 'Name must be at least 2 characters',
    },
    email: {
      valid: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(clientForm.email.trim()),
      message: 'Enter a valid email address',
    },
    company: {
      valid: clientForm.company.trim().length >= 1,
      message: 'Company or startup name is required',
    },
    phone: {
      valid: clientForm.phone.trim().length === 0 || /^[+\d\s()-]{7,20}$/.test(clientForm.phone.trim()),
      message: 'Enter a valid phone number (or leave blank)',
    },
    budget: {
      valid: clientForm.budget.length > 0,
      message: 'Please select an estimated budget range',
    },
    message: {
      valid: clientForm.message.trim().length >= 10,
      message: 'Please describe your requirements (at least 10 characters)',
    },
  }), [clientForm])

  const allValid = Object.values(validations).every(v => v.valid)
  const filledCount = Object.keys(validations).filter(k => validations[k].valid).length
  const totalFields = Object.keys(validations).length

  const handleClientChange = (e) => {
    const { name, value } = e.target
    setClientForm(prev => ({ ...prev, [name]: value }))
    if (serverError) setServerError('')
  }

  const handleBlur = (fieldName) => {
    setTouched(prev => ({ ...prev, [fieldName]: true }))
  }

  const handleClientSubmit = async (e) => {
    e.preventDefault()
    setServerError('')

    // Mark all fields touched
    const allTouched = {}
    Object.keys(validations).forEach(k => { allTouched[k] = true })
    setTouched(allTouched)

    if (!allValid) return

    setSubmitting(true)

    try {
      const payload = {
        name: clientForm.name.trim(),
        fullName: clientForm.name.trim(),
        email: clientForm.email.trim(),
        company: clientForm.company.trim(),
        phone: clientForm.phone.trim(),
        budget: clientForm.budget,
        message: clientForm.message.trim(),
      }

      const res = await submitToSheet('contact', payload)

      if (res.success) {
        setSubmitted(true)
        setSubmittedEnquiryId(res.enquiryId || '')
        setClientForm({
          name: '',
          email: '',
          company: '',
          phone: '',
          budget: '',
          message: '',
        })
        setTouched({})
        setTimeout(() => setSubmitted(false), 8000)
      } else {
        setServerError(res.error || 'Unable to submit enquiry. Please try again or email contact@srivoratech.in directly.')
      }
    } catch (error) {
      console.error('Client contact submission error:', error)
      setServerError('An unexpected error occurred. Please try again or email contact@srivoratech.in.')
    } finally {
      setSubmitting(false)
    }
  }

  const renderFieldStatus = (fieldName) => {
    if (!touched[fieldName]) return null
    const v = validations[fieldName]
    if (v.valid) return <CheckCircle2 size={14} className="field-valid-icon" />
    return (
      <span className="field-error-group">
        <AlertCircle size={13} className="field-error-icon" />
        <span className="field-error-msg">{v.message}</span>
      </span>
    )
  }

  return (
    <section className="contact section" id="contact">
      <div className="container">
        <div ref={ref} className={`animate-on-scroll ${isVisible ? 'visible' : ''}`}>
          <div className="contact-badge">
            <Sparkles size={14} />
            Let's Build Something Great
          </div>
          <h2 className="section-title">
            Get in <span className="gradient-text">Touch</span>
          </h2>
          <p className="section-subtitle">
            Looking to build a custom web app, mobile product, or AI platform? Book a 30-minute discovery call with our technical leads.
          </p>
        </div>

        <div className="contact-wrapper">
          <div className="form-container">
            {submitted ? (
              <div className="success-message animate-pop" style={{ padding: '36px 24px', textAlign: 'center' }}>
                <CheckCircle2 size={40} style={{ color: '#10b981', margin: '0 auto 16px' }} />
                <h3 style={{ fontSize: '22px', fontWeight: 700, color: '#0f172a', marginBottom: '8px' }}>
                  Enquiry Received Successfully!
                </h3>
                <p style={{ color: '#475569', fontSize: '15px', lineHeight: 1.6, maxWidth: '480px', margin: '0 auto 12px' }}>
                  Our technical engineering team will review your requirements and respond within 24 hours.
                </p>
                {submittedEnquiryId && (
                  <span style={{ display: 'inline-block', padding: '6px 14px', background: '#f1f5f9', border: '1px solid #cbd5e1', borderRadius: '6px', fontSize: '12.5px', fontFamily: 'monospace', color: '#334155' }}>
                    Reference: {submittedEnquiryId}
                  </span>
                )}
              </div>
            ) : (
              <form onSubmit={handleClientSubmit} className="application-form" noValidate>
                {/* Form completion progress */}
                <div className="form-progress-track">
                  <div className="form-progress-fill" style={{ width: `${(filledCount / totalFields) * 100}%` }} />
                  <span className="form-progress-text">
                    {filledCount} / {totalFields} fields completed
                  </span>
                </div>

                {serverError && (
                  <div style={{ background: '#fef2f2', border: '1px solid #fecaca', borderRadius: '8px', padding: '12px 16px', color: '#b91c1c', fontSize: '13.5px', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <AlertCircle size={16} style={{ flexShrink: 0 }} />
                    <span>{serverError}</span>
                  </div>
                )}

                <div className="form-row">
                  <div className={`form-group ${touched.name ? (validations.name.valid ? 'valid' : 'invalid') : ''}`}>
                    <label><User size={13} /> Full Name *</label>
                    <input
                      type="text"
                      name="name"
                      value={clientForm.name}
                      onChange={handleClientChange}
                      onBlur={() => handleBlur('name')}
                      placeholder="e.g. Alex Morgan"
                      required
                    />
                    {renderFieldStatus('name')}
                  </div>

                  <div className={`form-group ${touched.email ? (validations.email.valid ? 'valid' : 'invalid') : ''}`}>
                    <label><Mail size={13} /> Official Email *</label>
                    <input
                      type="email"
                      name="email"
                      value={clientForm.email}
                      onChange={handleClientChange}
                      onBlur={() => handleBlur('email')}
                      placeholder="alex@company.com"
                      required
                    />
                    {renderFieldStatus('email')}
                  </div>
                </div>

                <div className="form-row">
                  <div className={`form-group ${touched.company ? (validations.company.valid ? 'valid' : 'invalid') : ''}`}>
                    <label><Building2 size={13} /> Company / Startup *</label>
                    <input
                      type="text"
                      name="company"
                      value={clientForm.company}
                      onChange={handleClientChange}
                      onBlur={() => handleBlur('company')}
                      placeholder="e.g. Acme Corp or Seed Startup"
                      required
                    />
                    {renderFieldStatus('company')}
                  </div>

                  <div className={`form-group ${touched.phone ? (validations.phone.valid ? 'valid' : 'invalid') : ''}`}>
                    <label><PhoneIcon size={13} /> Phone / WhatsApp (Optional)</label>
                    <input
                      type="tel"
                      name="phone"
                      value={clientForm.phone}
                      onChange={handleClientChange}
                      onBlur={() => handleBlur('phone')}
                      placeholder="+1 (555) 000-0000"
                    />
                    {renderFieldStatus('phone')}
                  </div>
                </div>

                <div className={`form-group ${touched.budget ? (validations.budget.valid ? 'valid' : 'invalid') : ''}`}>
                  <label><Wallet size={13} /> Estimated Project Scope / Budget *</label>
                  <select
                    name="budget"
                    value={clientForm.budget}
                    onChange={handleClientChange}
                    onBlur={() => handleBlur('budget')}
                    required
                  >
                    <option value="">Select scope or budget range...</option>
                    <option value="Under $2,000">Under $2,000 (Small Feature / Fix)</option>
                    <option value="$2,000 - $5,000">$2,000 - $5,000 (MVP / Fast Prototype)</option>
                    <option value="$5,000 - $15,000">$5,000 - $15,000 (Full Web / Mobile Application)</option>
                    <option value="$15,000 - $50,000">$15,000 - $50,000 (Enterprise Cloud / SaaS Platform)</option>
                    <option value="$50,000+">$50,000+ (Comprehensive Custom ERP & AI Ecosystem)</option>
                  </select>
                  {renderFieldStatus('budget')}
                </div>

                <div className={`form-group ${touched.message ? (validations.message.valid ? 'valid' : 'invalid') : ''}`}>
                  <label><MessageSquareText size={13} /> Project Requirements & Goals *</label>
                  <textarea
                    name="message"
                    rows={4}
                    value={clientForm.message}
                    onChange={handleClientChange}
                    onBlur={() => handleBlur('message')}
                    placeholder="Tell us about the product you want to build, key timeline requirements, and any preferred technologies..."
                    required
                  />
                  {renderFieldStatus('message')}
                </div>

                <button
                  type="submit"
                  disabled={submitting}
                  className="btn-primary submit-btn"
                  style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}
                >
                  <Send size={16} />
                  {submitting ? 'Submitting Enquiry...' : 'Schedule Discovery Sprint'}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
