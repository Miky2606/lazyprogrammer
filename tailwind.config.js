/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",

    // Or if using `src` directory:
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      animation: {
        move: "move_text 3s ease-in infinite",
      },
      keyframes: {
        move_text: {
          to: {
            "background-position": "200% center",
          },
        },
      },
    },
  },
  plugins: [],
};
