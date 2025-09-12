// Logos
import logoPng from './logos/logo.png'
import pakmotorsLogo from './logos/pakmotors_Logo.jpg'
import transferLetterLogo from './logos/transferletter_logo_C3W_icon.ico'

// Export logos with descriptive names
export const logos = {
  logo: logoPng,
  pakmotors: pakmotorsLogo,
  transferLetter: transferLetterLogo,
} as const

// Export individual logos for direct import
export { logoPng, pakmotorsLogo, transferLetterLogo }

// Images (for future use)
// import exampleImage from './images/example.jpg'
// export const images = {
//   example: exampleImage,
// } as const

// Default export for convenience
export default {
  logos,
  // images,
}
