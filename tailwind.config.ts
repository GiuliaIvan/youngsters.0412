import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // Vipps Design System Colors
        background: {
          primary: '#FFFFFF',
        },
        surface: {
          primary: '#f7f7f7',
        },
        label: {
          primary: '#000000',
          secondary: 'rgba(60, 60, 67, 0.6)',
          tertiary: 'rgba(60, 60, 67, 0.3)',
          disabled: '#999999',
        },
        tint: {
          primary: '#ff5b24',      // Orange - primary action
          secondary: '#5e3dc2',    // Purple - active tab
          tertiary: '#49367D',     // Dark purple
          success: '#006627',      // Green
        },
        fill: {
          primary: 'rgba(118, 118, 128, 0.12)',
          success: 'rgba(8, 145, 63, 0.12)',
        },
        separator: {
          primary: 'rgba(60, 60, 67, 0.29)',
        },
        special: {
          floatingBar: 'rgba(255, 91, 36, 0.99)',
          avatarUser: '#ffe5db',
          avatarMerchant: '#e6e4ec',
          tabActive: '#5e3dc2',
        },
        fixed: {
          white: '#ffffff',
        },
        // Vipps brand colors
        vipps: {
          orange: '#ff5b24',
          purple60: '#722AC9',
          gray100: '#161225',
        }
      },
      spacing: {
        // Primitives spacing system
        'single': '8px',
        'single-half': '12px',
        'double': '16px',
        'triple': '24px',
        'section-gap': '24px',
        'section-padding': '8px',
      },
      borderRadius: {
        'default': '10px',
        'floating': '40px',
        'avatar': '999px',
      },
      fontFamily: {
        sans: [
          '-apple-system',
          'BlinkMacSystemFont', 
          'SF Pro Text',
          'SF Pro Display',
          'system-ui',
          'Segoe UI',
          'Roboto',
          'Helvetica Neue',
          'Arial',
          'sans-serif'
        ],
      },
      fontSize: {
        '12': ['12px', { lineHeight: '16px', letterSpacing: '0' }],
        '14': ['14px', { lineHeight: '20px', letterSpacing: '-0.15px' }],
        '16': ['16px', { lineHeight: '18px', letterSpacing: '-0.32px' }],
        '18': ['18px', { lineHeight: '24px', letterSpacing: '-0.45px' }],
      },
      boxShadow: {
        'floating': '0px 4px 16px 0px rgba(0, 0, 0, 0.2)',
      },
      backdropBlur: {
        'material': '25px',
        'chrome': '50px',
      },
    },
  },
  plugins: [],
}
export default config
