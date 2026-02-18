import '../styles/components/modal.css';
let modalCounter = 0;

export function openModal(item) {
    const modal = document.createElement("div");
    modal.className = "modal";
    
    modal.innerHTML = `
        <div class="modal-bar">
            <h1 class="modal-title" id="modal-title">${item.category}</h1>
            <button class="modal-btn"><i class="ri-close-line"></i></button>
        </div>
        <div class="modal-main" id="modal-main"></div>
    `;
    
    modalCounter++;
    const desktop = document.getElementById("desktop");
    desktop.appendChild(modal);
     desktop.dataset.modalCount = modalCounter;

    modal.querySelector('.modal-btn').onclick = () => {
        modal.remove()
        modalCounter--;
        desktop.dataset.modalCount = modalCounter;
    };

    return modal.querySelector(".modal-main");
}