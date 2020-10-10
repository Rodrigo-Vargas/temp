module.exports = {
  future: {
    // removeDeprecatedGapUtilities: true,
    // purgeLayersByDefault: true,
  },
  purge: [],
  prefix: 'tw-',
  theme: {
    colors: {
      white: '#fff',
      black: '#000',
      primary: {
        '100': '#EBF8FF',
        '200': '#BEE3F8',
        '300': '#8C63dE',
        '400': '#7750C3',
        '500': '#603BAB',
        '600': '#5714B4',
        '700': '#1976D2',
        '800': '#20084E',
        '900': '#0E024A',
      },
      gray: {
        '100': '#F7FAFC',
        '200': '#EDF2F7',
        '300': '#E2E8F0',
        '400': '#CBD5E0',
        '500': '#A0AEC0',
        '600': '#718096',
        '700': '#4A5568',
        '800': '#2D3748',
        '900': '#1A202C',
      }
    },
    extend: {
      spacing: {
        '80': '20rem'
      }
    },
    fontFamily: {
      'sans': ['Open Sans', 'sans-serif'],
    }
  },
  variants: {},
  plugins: [],
}
