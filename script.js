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
        <span style="position:absolute;top:10px;right:10px;cursor:pointer;color:#c5a363;font-size:10px;z-index:10;" onclick="this.parentElement.remove()">[ DELETE ]</span>
        <div class="media-frame">
            ${type === 'video' ? `<video src="${url}" autoplay muted loop playsinline></video>` : `<img src="${url}">`}
        </div>
        <div style="margin-top:15px;text-align:center;">
            <h3 contenteditable="true" style="font-family:'Cormorant Garamond';font-weight:300;color:#c5a363;font-style:italic;">Enter Title</h3>
        </div>
    `;
    grid.appendChild(item);
}

function savePortfolio() {
    localStorage.setItem('ryu_final_archive_v4', grid.innerHTML);
    alert('YOUR ARCHIVE HAS BEEN SAVED.');
}

function clearPortfolio() {
    if(confirm('ERASE ALL?')) {
        grid.innerHTML = '';
        localStorage.removeItem('ryu_final_archive_v4');
    }
}

window.onload = () => {
    const saved = localStorage.getItem('ryu_final_archive_v4');
    if(saved) grid.innerHTML = saved;
};
