/**
 * Unified Form Submission Utility
 * SriVoraTech Contact & Applications Workflow
 * 
 * Flow:
 * 1. For Contact enquiries: Direct POST to `/api/contact` (verified status, durable persistence, no opaque no-cors)
 * 2. For Careers applications: Direct POST to `/api/apply/*` with local/serverless fallback
 */

const backendEndpoints = {
  fresher: '/api/apply/fresher',
  experience: '/api/apply/experienced',
  experienced: '/api/apply/experienced',
  contact: '/api/contact',
}

const GOOGLE_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbzzB8S5E3JqKFYuj-2RX7oHWXkv0taRPv0aQBAjIr2TQkVp0K0grPCIcZWVrbbXQlSo/exec'

/**
 * Submit form data with verified response handling
 * @param {'fresher' | 'experience' | 'experienced' | 'contact'} formType
 * @param {Object} data - The form data to submit
 * @returns {Promise<{ success: boolean, enquiryId?: string, error?: string }>}
 */
export async function submitToSheet(formType, data) {
  // Strategy for Contact Forms: Always send directly to verified /api/contact endpoint
  if (formType === 'contact') {
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify(data),
      })

      const result = await response.json().catch(() => null)

      if (!response.ok || !result?.success) {
        return {
          success: false,
          error: result?.message || `Server error (${response.status}) processing enquiry.`
        }
      }

      return {
        success: true,
        enquiryId: result.enquiryId,
        message: result.message
      }
    } catch (err) {
      console.error('Contact submission error:', err)
      return {
        success: false,
        error: 'Network error submitting enquiry. Please email contact@srivoratech.in directly.'
      }
    }
  }

  // Strategy for Careers applications: Submit via FormData to application endpoints
  const endpoint = backendEndpoints[formType]
  if (endpoint) {
    try {
      const formData = new FormData()
      Object.entries(data).forEach(([key, value]) => {
        if (value !== undefined && value !== null) {
          formData.append(key, value)
        }
      })

      const response = await fetch(endpoint, {
        method: 'POST',
        body: formData,
      })

      if (response.ok) {
        const body = await response.json().catch(() => null)
        return { success: true, message: body?.message }
      }
    } catch (e) {
      console.warn('Backend application endpoint failed, attempting secondary webhook...')
    }
  }

  // Fallback for applications if backend is temporarily unreachable
  if (GOOGLE_SCRIPT_URL) {
    try {
      const jsonPayload = {}
      Object.entries(data).forEach(([key, value]) => {
        if (value instanceof File) {
          jsonPayload[key + '_filename'] = value.name
        } else if (value !== undefined && value !== null) {
          jsonPayload[key] = value
        }
      })
      jsonPayload.type = formType === 'fresher' ? 'Fresher' : 'Experienced'

      await fetch(GOOGLE_SCRIPT_URL, {
        method: 'POST',
        mode: 'no-cors',
        headers: { 'Content-Type': 'text/plain' },
        body: JSON.stringify(jsonPayload),
      })

      return { success: true }
    } catch (err) {
      return {
        success: false,
        error: 'Unable to submit application. Please contact us directly at contact@srivoratech.in.'
      }
    }
  }

  return {
    success: false,
    error: 'Submission service temporarily unavailable. Please email contact@srivoratech.in.'
  }
}
