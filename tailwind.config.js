/** @type {import('tailwindcss').Config} */
// eslint-disable-next-line no-undef
module.exports = {
    important: true,
    corePlugins: {
        preflight: false,
    },
    content: ['./src/**/*.{js,ts,jsx,tsx}'],
    theme: {
        extend: {
            colors: {
                primary: '#5932EA',
            },
            screens: {
                sm: '415px', // iphone SE
                md: '900px', // ipad 直向
                lg: '1080px', // ipad 橫向
                xl: '1280px', // mac air
                xxl: '1440px',
            },
            fontFamily: {
                sans: ['Graphik', 'sans-serif'],
                serif: ['Merriweather', 'serif'],
            },
        },
    },
    safelist: [],
};
