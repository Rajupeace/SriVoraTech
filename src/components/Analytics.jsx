import React, { useEffect } from 'react'

/**
 * Analytics component to initialize Google Analytics 4 (GA4) and Google Tag Manager (GTM).
 * SriVoraTech GA4 Measurement ID: G-HH0PJXC25F
 * SriVoraTech GTM Container ID: GTM-MNG59GDZ
 */
export default function Analytics({ gaId = 'G-HH0PJXC25F', gtmId = 'GTM-MNG59GDZ' }) {
  useEffect(() => {
    if (typeof window === 'undefined') return

    // Inject Google Tag Manager (GTM) Container Script
    if (gtmId && gtmId !== 'GTM-TAG_ID') {
      const gtmScript = document.createElement('script')
      gtmScript.async = true
      gtmScript.src = `https://www.googletagmanager.com/gtm.js?id=${gtmId}`
      document.head.appendChild(gtmScript)

      window.dataLayer = window.dataLayer || []
      window.dataLayer.push({
        'gtm.start': new Date().getTime(),
        event: 'gtm.js'
      })
    }

    // Inject GA4 Script
    if (gaId && gaId !== 'G-MEASUREMENT_ID') {
      const script = document.createElement('script')
      script.async = true
      script.src = `https://www.googletagmanager.com/gtag/js?id=${gaId}`
      document.head.appendChild(script)

      window.dataLayer = window.dataLayer || []
      function gtag() {
        window.dataLayer.push(arguments)
      }
      gtag('js', new Date())
      gtag('config', gaId, { page_path: window.location.pathname })
    }
  }, [gaId, gtmId])

  return null
}
