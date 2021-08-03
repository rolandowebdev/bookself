const UNREAD_BOOKSELF_ID = 'unread';
const READ_BOOKSELF_ID = 'read';
const BOOKSELF_ID = 'bookselfId';


const makeBookself = (title, author, year, isCompleted) => {

    const textTitle = document.createElement('h2');
    textTitle.innerText = title;

    const textAuthor = document.createElement('p');
    textAuthor.innerText = author;

    const textYear= document.createElement('small');
    textYear.innerText = `${year}`;

    const textContainer = document.createElement('div');
    textContainer.classList.add('detail-information');
    textContainer.append(textTitle, textAuthor, textYear);

    const container = document.createElement('div');
    container.classList.add('card-bookself', 'shadow');
    container.append(textContainer);

    if(isCompleted) {
        container.append(
            createUndoButton(),
            createTrashButton(),
        );
    } else {
        container.append(
            createCheckButton(),
            createTrashButton()
        );
    }

    return container;
}


const addUnreadBookself = () => {
    const unreadBookself = document.getElementById(UNREAD_BOOKSELF_ID);
    const textTitle = document.getElementById('title').value;
    const textAuthor = document.getElementById('author').value;
    const textYear = document.getElementById('year').value;

    const bookselfs = makeBookself(textTitle, textAuthor, textYear, false);
    const bookselfObject = composeBookselfObject(textTitle, textAuthor, textYear, false);

    bookselfs[BOOKSELF_ID] = bookselfObject.id;
    bookself.push(bookselfObject);

    unreadBookself.append(bookselfs);
    updateDataStorage();

}


const addReadBook = (bookselfElement) => {
    const readCompleted = document.getElementById(READ_BOOKSELF_ID);
    const readTitle = bookselfElement.querySelector('.detail-information > h2').innerText;
    const readAuthor = bookselfElement.querySelector('.detail-information > p').innerText;
    const readYear = bookselfElement.querySelector('.detail-information > small').innerText;

    const newBookself = makeBookself(readTitle, readAuthor, readYear, true);

    const bookselfs = findBookself(bookselfElement[BOOKSELF_ID]);
    bookselfs.isCompleted = true;
    newBookself[BOOKSELF_ID] = bookselfs.id;

    readCompleted.append(newBookself);
    bookselfElement.remove();

    updateDataStorage();
}


const removeBookFromRead = (bookselfElement) => {
    const bookselfPosition = findBookselfIndex(bookselfElement[BOOKSELF_ID]);
    bookself.splice(bookselfPosition, 1);

    bookselfElement.remove();
    updateDataStorage();
}


const undoBookFromRead = (bookselfElement) => {
    const listUnread  = document.getElementById(UNREAD_BOOKSELF_ID);
    const unreadTitle = bookselfElement.querySelector('.detail-information > h2').innerText;
    const unreadAuthor = bookselfElement.querySelector('.detail-information > p').innerText;
    const unreadYear = bookselfElement.querySelector('.detail-information > small').innerText;

    const newBookself = makeBookself(unreadTitle, unreadAuthor, unreadYear, false);

    const bookselfs = findBookself(bookselfElement[BOOKSELF_ID]);
    bookselfs.isCompleted = false;
    newBookself[BOOKSELF_ID] = bookselfs.id;
    
    listUnread.append(newBookself);
    bookselfElement.remove();

    updateDataStorage();
}


const refreshDataFromBookself = () => {
    const listUnread = document.getElementById(UNREAD_BOOKSELF_ID);
    let listRead = document.getElementById(READ_BOOKSELF_ID);

    for(book of bookself) {
        const newBookself = makeBookself(book.title, book.author, book.year, book.isCompleted);
        newBookself[BOOKSELF_ID] = book.id;

        if(book.isCompleted) {
            listRead.append(newBookself);
        } else {
            listUnread.append(newBookself);
        }
    }
}



const createUndoButton = () => {
    return createButton('unread-button', function (event) {
        undoBookFromRead(event.target.parentElement);
    });
}

const createTrashButton = () => {
    return createButton('trash-book', function (event) {
        let result = confirm('Yakin ingin manghapus bookself?');
        if (result) {
            removeBookFromRead(event.target.parentElement);
        }
    });
}

const createCheckButton = () => {
    return createButton('read-button', function (event) {
        addReadBook(event.target.parentElement);
    });
}



const createButton = (buttonTypeClass, eventListener) => {

    const button = document.createElement('button');

    button.classList.add(buttonTypeClass);
    button.addEventListener('click', function (event) {
        eventListener(event);
        event.stopPropagation();
    });

    return button;
}


const bookselfLength = () => {
    const allBookText = document.getElementById('allbooks');
    allBookText.innerText = bookself.length;
}