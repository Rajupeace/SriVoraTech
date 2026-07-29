import React from 'react'

/**
 * StructuredData component to inject JSON-LD script tag safely into the DOM.
 */
export default function StructuredData({ data }) {
  if (!data) return null

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data, null, 2) }}
    />
  )
}
