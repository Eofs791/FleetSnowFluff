import { openModal } from "./modal";

function renderWorkList(works) {
    const list = document.getElementById("work-list");
    list.innerHTML = '';

    works.forEach(work => {
        const item = document.createElement("div");
        item.className = "work-item";

        const typeHtml = work.type.map(t => `<span class="type">${t} </span>`).join('');

        item.innerHTML = `
                <div class="work-main">
                    <div class="work-cover">
                        <img src="${work.cover}" alt="cover">
                    </div>

                    <div class="work-meta">
                        <div class="work-types">${typeHtml}</div>
                        <h3 class="post-title">${work.title}</h3>
                    </div>
                </div>
            `;

        item.addEventListener('click', () => {
            work.category === "ALBUM" ? renderAlbumDetail(work, openModal(work)) : renderVideodetail(work, openModal(work));
        });

        list.appendChild(item);
    });
}

export function renderAlbumDetail(album, main) {
    const hero = document.createElement("div");
    hero.className = "detail-hero";

    const type = album.type.map(t => `<span class="type">${t} </span>`).join('');

    hero.innerHTML = `
        <img src="${album.cover}" class="hero-cover">
        <div class="hero-info">
            <h1 class="meta-title">${album.title}</h1>
            <p class="meta-tags">${type}</p>
            <blockquote class="meta-desc">${album.desc}</blockquote>
            <div class="meta-button"></div>
        </div>
    `;

    const videoButtons = hero.querySelector('.meta-button');
    album.video.forEach(v => {
        const btn = document.createElement('button');
        btn.className = 'play-btn';
        btn.textContent = `${v.id}`;

        btn.onclick = () => {
            renderVideodetail(v, openModal(v));
        };

        videoButtons.appendChild(btn);
    });

    const trackList = document.createElement("div");
    trackList.className = "detail-track";
    let trackCounter = 0;
    trackList.innerHTML = `<hr>` + album.tracks.map(track => `
        <div class="track-item" id="${track.id}">
            <button class="play-btn">${(++trackCounter)}</button>
            <span class="track-title">${track.title}</span>
            <span class="track-duration">${track.duration}</span>
        </div>`
    ).join('');

    main.append(hero, trackList);
}

function renderVideodetail(video, main) {
    main.innerHTML = `
            <h1 class="meta-title">${video.title}</h1>
            <blockquote class="meta-desc">${video.desc}</blockquote>
            <div class="media"><video controls poster="${video.cover}" src="${video.video}"></video></div>
    `;
}

export function initWorkSection(works) {
    if (!works || works.length === 0) return;

    works.sort((a, b) => {
        const numA = Number(a.id.split('_')[1]);
        const numB = Number(b.id.split('_')[1]);
        return numB - numA;
    });

    renderWorkList(works);
}