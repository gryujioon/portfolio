// 데이터 로드 및 초기화
document.addEventListener('DOMContentLoaded', () => {
    const savedData = localStorage.getItem('portfolioData');
    if (savedData) {
        document.getElementById('works-container').innerHTML = savedData;
    }
});

// 프로젝트 추가 함수
function addProject() {
    const container = document.getElementById('works-container');
    const newProject = document.createElement('article');
    newProject.className = 'work-item';
    newProject.innerHTML = `
        <button class="btn-delete" onclick="this.parentElement.remove()">X</button>
        <div class="media-container" onclick="uploadMedia(this)">
            <span>클릭하여 영상/이미지 업로드</span>
        </div>
        <div class="work-info">
            <h2 contenteditable="true">새 프로젝트 제목</h2>
            <p contenteditable="true">여기에 상세 설명을 입력하세요.</p>
        </div>
    `;
    container.appendChild(newProject);
}

// 미디어 업로드 함수
function uploadMedia(container) {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/*,video/*';

    input.onchange = e => {
        const file = e.target.files[0];
        if (!file) return;

        const url = URL.createObjectURL(file);

        if (file.type.startsWith('video')) {
            container.innerHTML = `<video src="${url}" autoplay muted loop playsinline></video>`;
        } else {
            container.innerHTML = `<img src="${url}" alt="uploaded media">`;
        }
    };

    input.click();
}

// 브라우저에 현재 상태 저장
function saveData() {
    const content = document.getElementById('works-container').innerHTML;
    localStorage.setItem('portfolioData', content);
    alert('포트폴리오가 저장되었습니다.');
}
