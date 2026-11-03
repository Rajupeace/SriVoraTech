import fs from 'fs'
import path from 'path'

export default async function handler(req, res) {
  // Set CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS')
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type')

  if (req.method === 'OPTIONS') {
    return res.status(200).end()
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ success: false, message: 'Method Not Allowed' })
  }

  try {
    const body = req.body || {}
    const name = (body.name || body.fullName || '').trim()
    const email = (body.email || '').trim()
    const phone = (body.phone || '').trim()
    const company = (body.company || '').trim()
    const budget = (body.budget || '').trim()
    const message = (body.message || body.whySriVoraTech || '').trim()

    if (!name || !email) {
      return res.status(400).json({
        success: false,
        message: 'Name and email are required fields.'
      })
    }

    const enquiry = {
      id: Date.now(),
      type: 'Contact',
      name,
      email,
      phone,
      company,
      budget,
      message,
      submittedAt: new Date().toISOString()
    }

    // Write to tmp store for serverless resilience
    try {
      const tmpPath = path.join('/tmp', 'contact_enquiries.json')
      let list = []
      if (fs.existsSync(tmpPath)) {
        list = JSON.parse(fs.readFileSync(tmpPath, 'utf8'))
      }
      list.push(enquiry)
      fs.writeFileSync(tmpPath, JSON.stringify(list, null, 2))
    } catch (e) {
      // non-fatal in serverless
    }

    return res.status(200).json({
      success: true,
      message: 'Enquiry received successfully! Our team will contact you within 24 hours.',
      enquiryId: enquiry.id
    })
  } catch (error) {
    console.error('API Contact Error:', error)
    return res.status(500).json({
      success: false,
      message: 'Internal server error processing enquiry'
    })
  }
}

