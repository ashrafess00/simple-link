 /** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    colors: {
      violet : {
        '1': '#633CFF',
        '2': '#BEADFF',
        '3': "#EFEBFF",  
      },
      grey: {
        '1': '#737373',
        '2': '#D9D9D9',
        '3': '#FAFAFA',
      },
      white: '#FFFFFF',
      dark: '#333333',
      red: '#FF3939',
    },
    btn_default: {
      backgroundColor: "#633CFF",
    }
  },
  plugins: [],
};

