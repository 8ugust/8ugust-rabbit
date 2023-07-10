// ==================== ==================== ====================
// Global Variable
// ==================== ==================== ====================
this.today = 'hello';





// ==================== ==================== ====================
// Document OnLoad Event.
// ==================== ==================== ====================
document.addEventListener("DOMContentLoaded", function(){
    // =============== =============== ===============
    // Create LocalStorage When Site Come First.
    // =============== =============== ===============
    if (localStorage.getItem('contents') == null) {
        localStorage.setItem('contents', "[]");
        localStorage.setItem('nextval', 0);
    }

    // =============== =============== ===============
    // Generate Content Tag.
    // =============== =============== ===============
    const storage = JSON.parse(localStorage.getItem('contents'));
    if (storage.length != 0) storage.forEach(content => {
        const isExist = document.getElementById('content_id_' + content.id);
        if (isExist != null) return;

        let textContent = '';
        textContent += '<div style="height: 11%;" id="content_id_' + content.id +'">';
        textContent +=    '<div class="Content-wrap">';
        textContent +=        '<div class="Content-inner" style="width: 25%;">';
        textContent +=            '<p>' + content.date + '</p>';
        textContent +=        '</div>';
        textContent +=        '<div class="Vertical-line"></div>';
        textContent +=        '<div class="Content-inner" style="width: 50%;">';
        textContent +=            '<p>' + content.title + '</p>';
        textContent +=        '</div>';
        textContent +=        '<div class="Vertical-line"></div>';
        textContent +=        '<div class="Content-inner" style="width: 25%;">';
        textContent +=            '<div class="Content-button" onclick="fnShowHideModal(\'content\', true, false, ' + content.id + ')">수정</div>';
        textContent +=        '</div>';
        textContent +=    '</div>';
        textContent +=    '<div class="Bottom-line"></div>';
        textContent += '</div>';

        const template = document.createElement('template');
        template.innerHTML = textContent;

        const contentsBody = document.getElementById('contentsBody');
        contentsBody.appendChild(template.content.firstChild);
    });
    
    // =============== =============== ===============
    // Set DatePicker First.
    // =============== =============== ===============
    const contentsBody = document.getElementById('contentsBody');
    const lastTemplate = document.createElement('div');
    lastTemplate.style.height = '9%';

    contentsBody.appendChild(lastTemplate);
    fnSetDate();
});





// ==================== ==================== ====================
// Set Date in Select Tag.
// ==================== ==================== ====================
const fnSetDate = () => {
    const parentY = document.getElementById('dateY');
    const parentM = document.getElementById('dateM');

    const today = new Date();
    const MM = today.getMonth() + 1;
    const YYYY = today.getFullYear();

    for (let i=0; i<3; i++) {
        let tag = document.createElement('option');
        tag.innerText = (YYYY - i);
        tag.value = (YYYY - i);

        parentY.appendChild(tag);
    }

    parentM.value = MM;
    parentY.value = YYYY;

    fnChangeMonth(false);
};





// ==================== ==================== ====================
// Change Month Tag Event.
// ==================== ==================== ====================
const fnChangeMonth = (isChange) => {
    const Year = document.getElementById('dateY').value;
    const Mnth = document.getElementById('dateM').value;
    const parentD = document.getElementById('dateD');
    const lastDate = new Date(Year, Mnth, 0).getDate();
    while (parentD.firstChild) parentD.removeChild(parentD.firstChild);

    for (let i=1; i<=lastDate; i++) {
        let tag = document.createElement('option');
        tag.innerText = (String(i).length == 1) ? '0' + i : i;
        tag.value = i;

        parentD.appendChild(tag);
    }

    parentD.value = (isChange) ? 1 : new Date().getDate();
    if (!isChange) {fnChangeDatepicker(new Date().toISOString().split('T')[0]);}
};





// ==================== ==================== ====================
// Change Datepicker Value Evnet.
// ==================== ==================== ====================
const fnChangeDatepicker = () => {
    let yy = document.getElementById('dateY').value;
    let mm = document.getElementById('dateM').value;
    let dd = document.getElementById('dateD').value;
    mm = (mm.length == 1) ? '0' + mm : mm;
    dd = (dd.length == 1) ? '0' + dd : dd;
    
    const date = yy + '-' + mm + '-' + dd;
    document.getElementById('datepicker').value = date;
    fnShowHideModal('date', false);
};





// ==================== ==================== ====================
// Modal OFF Event
// ==================== ==================== ====================
const fnShowHideModal = (id, isBlock, isCreate, content_id) => {
    // =============== =============== ===============
    // Show Popup-Wrap or Date-Wrap.
    // =============== =============== ===============
    if (id == 'content') id = 'Popup-wrap';
    if (id == 'date')    id = 'Date-wrap';
    if (id == 'warning') { id = 'Warning-wrap'; document.getElementById('confirmWrap').style.display = 'none'; document.getElementById('alertWrap').style.display = 'flex'; }
    if (id == 'confirm') { id = 'Warning-wrap'; document.getElementById('confirmWrap').style.display = 'flex'; document.getElementById('alertWrap').style.display = 'none'; }
    document.getElementsByClassName(id)[0].style.display = isBlock ? 'flex' : 'none';

    // =============== =============== ===============
    // Change Popup-Warp Footer (Create / Update)
    // =============== =============== ===============
    let createWrap = document.getElementById('CreateWrap');
    let updateWrap = document.getElementById('UpdateWrap');
    if (isCreate != null && isCreate == true)  { createWrap.style.display = 'flex'; updateWrap.style.display = 'none'; fnSetDate(); document.getElementById('title').value = '';}
    if (isCreate != null && isCreate == false) { createWrap.style.display = 'none'; updateWrap.style.display = 'flex'; }

    // =============== =============== ===============
    // Change Content Value.
    // =============== =============== ===============
    if (content_id != null) {
        let contents = JSON.parse(localStorage.getItem('contents'));
        if (contents != null) contents.forEach(content => {
            if (content.id == content_id) {
                document.getElementById('title').value = content.title;
                document.getElementById('content_id').value = content_id;
                document.getElementById('datepicker').value = content.date;
            }
        });
    }
};





// ==================== ==================== ====================
// Create Button Click Event on Modal.
// ==================== ==================== ====================
const fnCreateContent = () => {
    if (document.getElementById('title').value.replace(/ /g,"") == '') {
        document.getElementById('warningTitle').innerHTML = '웹툰 제목은 필수입니다.';
        document.getElementById('title').value = "";
        fnShowHideModal('warning', true);
        return false;
    }

    const content = {
        id:localStorage.getItem('nextval'),
        title:document.getElementById('title').value,
        date:document.getElementById('datepicker').value
    };

    let storage = JSON.parse(localStorage.getItem('contents'));
    storage.push(content);

    storage = storage.sort((a, b) => {
        const dateA = a.date.split('-').join('');
        const dateB = b.date.split('-').join('');

        return dateA - dateB;
    });

    const newStorage = JSON.stringify(storage);
    localStorage.setItem('contents', newStorage);
    localStorage.setItem('nextval', Number(localStorage.getItem('nextval')) + 1);

    fnShowHideModal('content', false);
    window.location.reload();
};





// ==================== ==================== ====================
// Delete Button Click Event on Modal.
// ==================== ==================== ====================
const fnOnClickDelete = (code) => {
    let text = '';
    if (code == 'delete') text = '삭제';
    if (code == 'update')  text = '수정';
    document.getElementById('warningTitle').innerHTML = (text + '하시겠습니까?');
    fnShowHideModal('confirm', true);
}




// ==================== ==================== ====================
// Delete or Update Content Event
// ==================== ==================== ====================
const fnDeleteOrUpdate = () => {
    let code = document.getElementById('warningTitle').innerHTML;
    if (code.indexOf('수정') != -1) code = 'update';
    if (code.indexOf('삭제') != -1) code = 'delete';

    // =============== =============== ===============
    // Get Index of Content In Storage.
    // =============== =============== ===============
    const content_id = document.getElementById('content_id').value;
    const storage = JSON.parse(localStorage.getItem('contents'));
    let target_id = null; for (let i=0; i<storage.length; i++) {
        if (storage[i].id == content_id) {
            target_id = i;
            break;
        }
    }
    
    // =============== =============== ===============
    // Update or Delete Storage.
    // =============== =============== ===============
    if (code == 'update') {
        storage[target_id].date  = document.getElementById('datepicker').value;
        storage[target_id].title = document.getElementById('title').value;
    } else { storage.splice(target_id, 1); }
    
    localStorage.setItem('contents', JSON.stringify(storage));
    window.location.reload();
};