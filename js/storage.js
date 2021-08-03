const KEY_STORAGE = 'BOOKSELF_APPS';
let bookself = [];


const isStorageExist = () => {
    if(typeof(Storage) === undefined){
        alert('Browser tidak mendukung!');
        return false;
    }
    return true;
}

const saveData = () => {
    const parsedData = JSON.stringify(bookself);
    localStorage.setItem(KEY_STORAGE, parsedData);
    document.dispatchEvent(new Event('datasaved'));
}

const loadDataStorage = () => {
    const serializedData = localStorage.getItem(KEY_STORAGE);
    let data = JSON.parse(serializedData);

    if(data !== null){
        bookself = data;
    }

    document.dispatchEvent(new Event('dataloaded'));
}

const updateDataStorage = () => {
    if(isStorageExist()){
        saveData();
    }
}

const composeBookselfObject = (title, author, year, isCompleted) => {
    return {
        id: +new Date(),
        title,
        author,
        year,
        isCompleted
    };
}


const findBookself = (bookselfId) => {
    for(book of bookself){
        if(book.id === bookselfId)
        return book;
    }

    return null;
}

const findBookselfIndex = (bookselfId) => {
    let bookIndex = 0;
    for(book of bookself){
        if(book.id === bookselfId)
            return bookIndex;
            
        bookIndex++;
    }

    return -1;
} 