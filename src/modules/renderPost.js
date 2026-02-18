import { openModal } from "./modal";

function renderPostList(posts) {
    const list = document.getElementById("post-list");
    list.innerHTML = '';

    posts.forEach(post => {
        const item = document.createElement("div");
        item.className = "post-item";

        const picsHtml = post.category !== 'TEXT' ?
            `<div class="post-images img-count-${post.pics.length}">
                    ${post.pics.map(pic =>
                `<img src="${pic.url}" alt="image">`
            ).join('')}
               </div>`
            : '';

        item.innerHTML = `
            <a href="javascript:void(0)" class="card post-card">
                <p class="post-time">${post.pub_ts} // ${post.category}<p>
                <h4 class="post-title">${post.title || ''}</h4>
                <p class="post-text">${post.text || ''}</p>
            </a>
            ${picsHtml}
            `;

        item.addEventListener('click', () => {

            renderPostDetail(post, openModal(post));
        });

        list.appendChild(item);
    });
}

function renderPostDetail(post, main) {
    let mediaHtml;

    switch (post.category) {
        case 'TEXT':
            mediaHtml = '';
            break;
        case 'POST':
            mediaHtml = '';
            break;
        case 'REEL':
            mediaHtml = `
                <div class="media post-vedio">
                    <video src="${post.video}" controls></video>
                </div>
            `;
            break;
    }

    main.innerHTML = `
        <h1>${post.title || ''}</h1>
        <p>${post.pub_ts} // ${post.category}</p>
        ${mediaHtml}
        <p>${post.text || ''}</p>
    `;
}

export function initPostSection(posts) {
    if (!posts || posts.length === 0) return;

    posts.sort((a, b) => {
        const numA = Number(a.id.split('_')[1]);
        const numB = Number(b.id.split('_')[1]);
        return numB - numA;
    });

    renderPostList(posts);
}