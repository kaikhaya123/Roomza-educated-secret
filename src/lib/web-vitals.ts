// Using dynamic import in initWebVitals to support multiple web-vitals versions
// (avoid static named imports to keep builds compatible across versions)

// Function to report Web Vitals to console and external service
export function reportWebVitals(metric: any) {
  console.log('Web Vitals:', {
    name: metric.name,
    value: Math.round(metric.value),
    rating: metric.rating,
  })

  // Send to analytics service in production
  if (process.env.NODE_ENV === 'production') {
    // Example: Send to your analytics endpoint
    const body = JSON.stringify({
      name: metric.name,
      value: metric.value,
      timestamp: new Date().toISOString(),
      page: window.location.pathname,
      userAgent: navigator.userAgent,
    })

    // Use sendBeacon for reliability
    if (navigator.sendBeacon) {
      navigator.sendBeacon('/api/analytics/vitals', body)
    }
  }
}

// Initialize all Web Vitals tracking (uses dynamic import and fallbacks to be compatible with web-vitals versions)
export async function initWebVitals() {
  try {
    const webVitals = await import('web-vitals')
    const w = webVitals as any

    const cls = w.getCLS ?? w.onCLS
    const fid = w.getFID ?? w.onFID
    const fcp = w.getFCP ?? w.onFCP
    const lcp = w.getLCP ?? w.onLCP
    const ttfb = w.getTTFB ?? w.onTTFB

    if (typeof cls === 'function') cls(reportWebVitals)
    if (typeof fid === 'function') fid(reportWebVitals)
    if (typeof fcp === 'function') fcp(reportWebVitals)
    if (typeof lcp === 'function') lcp(reportWebVitals)
    if (typeof ttfb === 'function') ttfb(reportWebVitals)
  } catch (err) {
    // If the package isn't available or its API differs, fail silently in non-critical contexts
    // and log for visibility
    // eslint-disable-next-line no-console
    console.warn('Could not initialize web-vitals:', err)
  }
}
