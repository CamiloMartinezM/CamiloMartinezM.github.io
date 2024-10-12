/** @type {import('tailwindcss').Config} */
// eslint-disable-next-line no-undef
const colors = require('tailwindcss/colors')

export default {
    content: ["./src/**/*.{html,vue,ts,tsx}", "./public/index.html", "./node_modules/flowbite/**/*.js"],
    theme: {
        extend: {},
        colors: {
            transparent: 'transparent',
            current: 'currentColor',
            black: colors.black,
            white: colors.white,
            gray: colors.gray,
            emerald: colors.emerald,
            indigo: colors.indigo,
            yellow: colors.yellow,
            "primary": "#09090b",
            "secondary": "#596673",
            "secondary-white": "#A9ABAE", // #F5F7FA darkened 30% (https://www.cssfontstack.com/oldsites/hexcolortool/)
            "highlighted": "#0D92F4",
            "header": "#1C1C1D",
            "body": "#1C1C1D",
            "footer": "#1C1C1D",
        },
    },
    darkMode: 'class',
    plugins: [
        require('flowbite/plugin')
    ]
}