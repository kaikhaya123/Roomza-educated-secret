/**
 * Font fallback configuration for better performance and reliability
 */
export const fontFallbacks = {
  inter: 'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
  manrope: 'ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
  poppins: '"Helvetica Neue", Helvetica, Arial, sans-serif',
  rubik: 'ui-sans-serif, system-ui, sans-serif'
};

export const fontLoadingStrategy = {
  // Critical fonts that should be preloaded
  preload: ['inter'],
  // Fonts that can be loaded on demand
  fallback: ['manrope', 'poppins', 'rubik']
};