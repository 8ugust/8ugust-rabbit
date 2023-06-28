// ==================== ==================== ====================
// Document OnLoad Event.
// ==================== ==================== ====================
document.addEventListener("DOMContentLoaded", function(){
    // ==================== ====================
    // Global Variable
    // ==================== ====================
    this.today = 'hello';

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
// Change Month Tag Event
// ==================== ==================== ====================
const fnChangeMonth = (isChange) => {
    const Year = document.getElementById('dateY').value;
    const Mnth = document.getElementById('dateM').value;
    const parentD = document.getElementById('dateD');
    const lastDate = new Date(Year, Mnth, 0).getDate();

    for (let i=1; i<=lastDate; i++) {
        let tag = document.createElement('option');
        tag.innerText = (String(i).length == 1) ? '0' + i : i;
        tag.value = i;

        parentD.appendChild(tag);
    }

    parentD.value = (isChange) ? 1 : new Date().getDate();
}





// ==================== ==================== ====================
// Modal OFF Event
// ==================== ==================== ====================
const fnCloseModal = (id, isBlock) => {
    if (id == 'content') id = 'Popup-wrap';
    if (id == 'date')    id = 'Date-wrap';
    isBlock = isBlock ? 'flex' : 'none';

    document.getElementsByClassName(id)[0].style.display = isBlock;
}