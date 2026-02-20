import { loaderTrigger } from "./loader";

let isLocked = false;
let sections;
let routes;

function getIndex() {
    const params = new URLSearchParams(window.location.search);
    const page = params.get("page") || "";

    let index = routes.findIndex(route => route.path === page);
    return index === -1 ? 0 : index;
}

async function updateSectionDOM(targetIndex, showLoader = false) {
    const targetRoute = routes[targetIndex];
    routes.forEach((route, index) => {
        const scrollArea = route.element.querySelector('.scroll-area')
        if (scrollArea) {
            scrollArea.scrollTop = 0;
        }

        const isTarget = index === targetIndex;
        route.element.classList.toggle("active", isTarget);
        route.element.classList.toggle("waiting", isTarget);

        if (isTarget) {
            const page = route.path;
            const url = page ? `?page=${page}` : location.pathname;
            history.pushState(null, "", url);
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
        if (element.classList.contains("scroll-area") || element.matches("aside")) {
            return false;
        }

        element = element.parentElement;
    }

    return true;
}

export function initRouter() {
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

    const navLinks = document.querySelectorAll(".section-btn");
    navLinks.forEach((link, index) => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            updateSectionDOM(index);
        });
    });
}