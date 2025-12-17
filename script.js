const grid = document.getElementById('gallery-grid');
const uploader = document.getElementById('bulk-uploader');

uploader.addEventListener('change', (e) => {
    const files = Array.from(e.target.files);
    files.forEach(file => {
        const url = URL.createObjectURL(file);
        const type = file.type.startsWith('video') ? 'video' : 'img';
        addWork(url, type);
    });
});

function addWork(url, type) {
    const el = document.createElement('div');
    el.className = 'work-card';
    el.innerHTML = `
        <span style="position:absolute;top:20px;right:20px;cursor:pointer;color:#c5a363;font-size:11px;z-index:5;" onclick="this.parentElement.remove()">[ REMOVE ]</span>
        <div class="frame">
            ${type === 'video' ? `<video src="${url}" autoplay muted loop playsinline></video>` : `<img src="${url}">`}
        </div>
        <div style="margin-top:20px;text-align:center;">
            <h3 contenteditable="true" style="font-family:'Cormorant Garamond';font-weight:300;color:#c5a363;font-style:italic;font-size:1.5rem;opacity:0.8;">Enter Project Title</h3>
        </div>
    `;
    grid.appendChild(el);
}

function savePortfolio() {
    localStorage.setItem('ryu_vfx_final_final', grid.innerHTML);
    alert('ARCHIVE SECURED.');
}

function clearPortfolio() {
    if(confirm('ERASE EVERYTHING?')) {
        grid.innerHTML = '';
        localStorage.removeItem('ryu_vfx_final_final');
    }
}

window.onload = () => {
    const saved = localStorage.getItem('ryu_vfx_final_final');
    if(saved) grid.innerHTML = saved;
};
