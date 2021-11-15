module.exports = {
	mode: "jit",
	purge: ["./pages/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}"],
	darkMode: false, // or 'media' or 'class'
	theme: {
		extend: {
			colors: {
				primary: "#5C61F0",
				"primary-dark": "#4145a9",
				"background-light": "#282B30",
				"background-lighter": "#404348",
				"background-dark": "#1D2025",
				white: "#ffffff",
			},
			height: {
				"15%": "15%",
				"85%": "85%",
				"10%": "10%",
				"90%": "90%",
			},
			maxHeight: {
				"50%": "50%",
				"75%": "75%",
			},
			width: {
				"90%": "90%",
				"10%": "10%",
			},
			fontSize: {
				small: "12px",
				medium: "14px",
				large: "18px",
			},
			borderRadius: {
				default: "0.5rem",
			},
			fontFamily: {
				default: ["Inter", "system-ui"],
			},
		},
	},
	variants: {
		extend: {},
	},
	plugins: [require("tailwind-scrollbar")],
};
