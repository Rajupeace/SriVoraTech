import React, { useEffect } from 'react'
import { applyRouteSEO, generateBreadcrumbSchema } from '../lib/seo'
import StructuredData from './StructuredData'

/**
 * SEO Component wrapping pages to set dynamic titles, canonicals, meta tags, and breadcrumbs.
 */
export default function SEO({ pathname = '/', breadcrumbs = [], schema = null }) {
  useEffect(() => {
    applyRouteSEO(pathname)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }, [pathname])

  const breadcrumbSchemaData = breadcrumbs && breadcrumbs.length > 0 ? generateBreadcrumbSchema(breadcrumbs) : null

  return (
    <>
      {breadcrumbSchemaData && <StructuredData data={breadcrumbSchemaData} />}
      {schema && <StructuredData data={schema} />}
    </>
  )
}
