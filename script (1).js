const grid = document.getElementById('gallery-grid');
const uploader = document.getElementById('bulk-uploader');

uploader.addEventListener('change', (e) => {
    const files = Array.from(e.target.files);
    files.forEach(file => {
        const url = URL.createObjectURL(file);
        const type = file.type.startsWith('video') ? 'video' : 'img';
        createWorkItem(url, type, file.name.split('.')[0].toUpperCase());
    });
});

function createWorkItem(url, type, title) {
    const item = document.createElement('div');
    item.className = 'work-item';
    item.innerHTML = `
        <span class="delete-x" onclick="this.parentElement.remove()">[ REMOVE ]</span>
        <div class="media-container">
            ${type === 'video' 
                ? `<video src="${url}" autoplay muted loop playsinline></video>` 
                : `<img src="${url}">`}
        </div>
        <div class="work-desc">
            <h3 contenteditable="true" spellcheck="false">${title}</h3>
        </div>
    `;
    grid.appendChild(item);
}

function savePortfolio() {
    localStorage.setItem('ryu_grad_luxury', grid.innerHTML);
    alert('YOUR CINEMATIC ARCHIVE HAS BEEN SAVED.');
}

function clearPortfolio() {
    if (confirm('ERASE ALL GALLERY DATA?')) {
        grid.innerHTML = '';
        localStorage.removeItem('ryu_grad_luxury');
    }
}

window.onload = () => {
    const saved = localStorage.getItem('ryu_grad_luxury');
    if (saved) grid.innerHTML = saved;
};
