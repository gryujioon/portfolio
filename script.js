const grid = document.getElementById('gallery-grid');
const uploader = document.getElementById('bulk-uploader');

uploader.addEventListener('change', (e) => {
    const files = Array.from(e.target.files);
    files.forEach(file => {
        const url = URL.createObjectURL(file);
        const type = file.type.startsWith('video') ? 'video' : 'img';
        createArchiveItem(url, type);
    });
});

function createArchiveItem(url, type) {
    const item = document.createElement('article');
    item.className = 'work-item';
    item.innerHTML = `
        <span style="position:absolute;top:15px;right:15px;cursor:pointer;color:#c5a363;font-size:10px;z-index:10;opacity:0.6;" onclick="this.parentElement.remove()">[ DELETE ]</span>
        <div class="media-frame">
            ${type === 'video' ? `<video src="${url}" autoplay muted loop playsinline></video>` : `<img src="${url}">`}
        </div>
        <div style="margin-top:20px;text-align:center;">
            <h3 contenteditable="true" spellcheck="false" style="font-family:'Cormorant Garamond';font-weight:300;color:#c5a363;font-style:italic;font-size:1.3rem;">Enter Project Title</h3>
        </div>
    `;
    grid.appendChild(item);
}

function savePortfolio() {
    localStorage.setItem('ryu_final_v5', grid.innerHTML);
    alert('PORTFOLIO ARCHIVE SAVED.');
}

function clearPortfolio() {
    if(confirm('ERASE ALL DATA?')) {
        grid.innerHTML = '';
        localStorage.removeItem('ryu_final_v5');
    }
}

window.onload = () => {
    const saved = localStorage.getItem('ryu_final_v5');
    if(saved) grid.innerHTML = saved;
};
