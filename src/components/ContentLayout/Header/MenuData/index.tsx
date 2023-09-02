import pragmaticplayFavicon from '@/assets/images/pragmaticplay_favicon.ico';
import evolutionFavicon from '@/assets/images/evolution_favicon.png';
import golfFavicon from '@/assets/images/gigxProviderImg.png';
import btiFavicon from '@/assets/images/btiProviderImg.png';
import mgFavicon from '@/assets/images/mg_favicon.png';
import agFavicon from '@/assets/images/ag_favicon.png';

export interface MenuItem {
    title: string;
    path?: string;
    submenu?: MenuItem[];
    imgSrc?: string;
}

export const fakeMenuData: MenuItem[] = [
    { title: 'Home', path: '/' },
    {
        title: 'Sports',
        // path: '/Sports',
        submenu: [
            {
                title: 'BTI',
                path: '/bti',
                imgSrc: btiFavicon,
            },
            {
                title: 'IGX Golf',
                path: '/gigx',
                imgSrc: golfFavicon,
            },
        ],
    },
    {
        title: 'Live Casino',
        // path: '/live',
        submenu: [
            {
                title: 'Evolution',
                path: '/evolution/live',
                imgSrc: evolutionFavicon,
            },
            {
                title: 'Pragmatic Play',
                path: '/pragmatic/live',
                imgSrc: pragmaticplayFavicon,
            },
            {
                title: 'Asia Gaming',
                path: '/softgamings/live',
                imgSrc: agFavicon,
            },
            {
                title: 'Micro Gaming',
                path: '/microgaming/live',
                imgSrc: mgFavicon,
            },
        ],
    },
    {
        title: 'Slot Game',
        // path: '/slots',
        submenu: [
            {
                title: 'Evolution',
                path: '/evolution/slot',
                imgSrc: evolutionFavicon,
            },
            {
                title: 'Pragmatic Play',
                path: '/pragmatic/slot',
                imgSrc: pragmaticplayFavicon,
            },
            {
                title: 'Asia Gaming',
                path: '/softgamings/slot',
                imgSrc: agFavicon,
            },
            {
                title: 'Micro Gaming',
                path: '/microgaming/slot',
                imgSrc: mgFavicon,
            },
        ],
    },

    // {
    //     title: 'Promotion',
    //     path: '/promotion',
    // },
    {
        title: 'Responsible Gaming',
        path: '/about',
    },
    // {
    //     title: 'Terms of Service',
    //     path: '/terms-of-service',
    // },
    {
        title: 'Service Center',
        path: '/customer',
    },
];
