import { loaderTrigger } from "./loader";

let isLocked = false;
let sections;
let routes;
let basePath;

function getIndex() {
    const currentPath = window.location.pathname.slice(basePath.length);
    let index = routes.findIndex(route => route.path === currentPath);
    return index === -1 ? 0 : index;
}

async function updateSectionDOM(targetIndex, showLoader = false) {
    const targetRoute = routes[targetIndex];
    routes.forEach((route, index) => {
        const isTarget = index === targetIndex;
        route.element.classList.toggle("active", isTarget);
        route.element.classList.toggle("waiting", isTarget);

        if (isTarget) {
            const finalUrl = `${basePath.replace(/\/+$/, '')}/${targetPath.replace(/^\/+/, '')}`;
            history.pushState(null, "", finalUrl);
        }

    });

    if (showLoader) {
        await loaderTrigger();
    }

    if (targetRoute?.element) {
        targetRoute.element.classList.remove("waiting");
    }
}

function switchSection(direction) {
    if (isLocked || document.getElementById("desktop").dataset.modalCount > 0) {
        return;
    }

    const targetIndex = getIndex() + direction;

    if (targetIndex < 0 || targetIndex >= routes.length) {
        return;
    }

    updateSectionDOM(targetIndex);

    isLocked = true;
    setTimeout(() => {
        isLocked = false;
    }, 700);
}

function canScroll(element) {
    while (element && element.tagName.toLowerCase() !== 'section') {
        const style = window.getComputedStyle(element);
        const overflowY = style.getPropertyValue('overflow-y');
        const isScrollableStyle = overflowY === 'auto' || overflowY === 'scroll';

        if (isScrollableStyle) {
            return false;
        }

        element = element.parentElement;
    }

    return true;
}

export function initRouter() {
    basePath = window.location.pathname;
    sections = document.querySelectorAll("section");

    routes = Array.from(sections).map(el => {
        const pathName = el.id === 'info' ? '' : el.id;

        return {
            id: el.id,
            path: pathName,
            element: el
        };
    });

    updateSectionDOM(getIndex(), true);

    window.addEventListener("wheel", e => {
        if (canScroll(e.target)) {
            switchSection(e.deltaY < 0 ? -1 : 1);
        };
    });

    window.addEventListener("popstate", () => {
        updateSectionDOM(getIndex(), true);
    });

    const navLinks = document.querySelectorAll("aside a");
    navLinks.forEach((link, index) => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            updateSectionDOM(index);
        });
    });
}