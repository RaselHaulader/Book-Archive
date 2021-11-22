// catch ui 
const inputField = document.getElementById('input-value');
const totalFound = document.getElementById('total-found');
const bookContainer = document.getElementById('book-container');
const spinner = document.getElementById('spinner');
// load data from server
const loadBooks = () => {
    // check search value
    if (inputField.value === '') {
        totalFound.classList.remove('text-dark');
        totalFound.classList.add('text-danger');
        totalFound.innerText = 'Please Provide a Book Name';
        return
    };
    // clear previous data
    bookContainer.textContent = '';
    totalFound.textContent = '';
    // show loader
    spinner.classList.remove('d-none')
    // fetch data
    fetch(`https://openlibrary.org/search.json?q=${inputField.value}`)
        .then(res => res.json())
        .then(data => displayBooks(data))
        .catch(err => console.log('server gese'))
}
// fetching data set to display
const displayBooks = books => {
    inputField.value = '';
    // stop loader
    spinner.classList.add('d-none')
    // set total result 
    if (books.numFound) {
        totalFound.classList.remove('text-danger')
        totalFound.classList.add('text-dark')
        totalFound.innerText = `Total Result Found: ${books.numFound}`;
    } else {
        // error validation 
        totalFound.classList.remove('text-dark');
        totalFound.classList.add('text-danger');
        totalFound.innerText = `No Result Found`
    }
    const container = document.getElementById('book-container');
    // iterate all books 
    books.docs.forEach(book => {
        let author = 'unknown'
        let img = ''
        // check author name
        if (book.author_name) {
            author = book.author_name[0]
        };
        // check cover image
        if (book.cover_i) {
            img = `<img height="250px" width="160px" src="https://covers.openlibrary.org/b/id/${book.cover_i}-L.jpg" class="mx-auto mt-4" alt="..."> `
        } else {
            img = `<img height="250px" width="160px" src="images/image-not-found.jpg" class="mx-auto mt-4" alt="..."> `
        };
        // set book to display
        const div = document.createElement('div');
        div.className = 'col'
        div.innerHTML = ` 
        <div class="card h-100 text-white" style="background-color: CornflowerBlue">
        ${img}
        <div class="card-body">
            <p class="card-title fs-3 text-center text-white fw-bolder">${book.title}</p>
            <p class=" ">Author: <span class="fst-italic"> ${author} </span></p>
            <p>Publisher : ${book.publisher?.[0]} </p>
            <p>First published in ${book.first_publish_year}</p>
           </div>
    </div>
        `
        container.appendChild(div)
    });
}