const formCard = document.getElementById('form-container');
const addButton = document.getElementById('add-book');
const closeButton = document.getElementById('close');

document.addEventListener('DOMContentLoaded', function () {

    const submitForm  = document.getElementById('form');

    submitForm.addEventListener('submit', function (event) {
        event.preventDefault();
        formCard.classList.remove('form-open');
        addUnreadBookself();
    });

    if(isStorageExist){
        loadDataStorage();
    }
});

document.addEventListener('datasaved', () => {
    bookselfLength();
});

document.addEventListener('dataloaded', () => {
    refreshDataFromBookself();
    bookselfLength();
});

addButton.addEventListener('click', () => {
    formCard.classList.toggle('form-open')
})

closeButton.addEventListener('click', () => {
    formCard.style.transition = '3s';
    formCard.classList.toggle('form-open')
})
  





