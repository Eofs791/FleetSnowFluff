import './styles/main.css';

import postsData from './data/posts.json';
import worksData from './data/works.json';

import { initRouter } from './modules/router.js';
import { initPostSection } from './modules/renderPost.js';
import { initWorkSection } from './modules/renderWork.js';
import { initPlayer } from './modules/player.js';
import { init } from 'https://unpkg.com/@waline/client@v3/dist/waline.js';


document.addEventListener("DOMContentLoaded", () => {
    initWorkSection(worksData);
    initPostSection(postsData);
    init({
        el: '#waline',
        serverURL: 'https://waline-blush-ten.vercel.app/',
    });
    initRouter();
    initPlayer();
});