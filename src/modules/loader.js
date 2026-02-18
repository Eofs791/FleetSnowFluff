export async function loaderTrigger() {
    const loader = document.getElementById("loader");
    const mask = document.getElementById("mask");
    loader.style.display = 'flex'; 
    loader.style.opacity = '1';
    void mask.offsetWidth; 

    mask.style.transition = 'width 2s linear';
    mask.style.width = '100%';

    await new Promise(resolve => {
        mask.addEventListener('transitionend', resolve, { once: true });
    });

    loader.style.transition = 'opacity 0.5s ease';
    loader.style.opacity = '0';

    setTimeout(() => {
        loader.style.display = 'none';
        mask.style.width = '0';
    }, 500);
}