const inputField = document.getElementById('input-value');
const totalFound =   document.getElementById('total-found');
const bookContainer =  document.getElementById('book-container');
const spinner =  document.getElementById('spinner');
const loadBooks = () => {
   
    if (inputField.value === '') {
        totalFound.classList.remove('text-primary');
        totalFound.classList.add('text-danger');
        totalFound.innerText = 'Please Provide a Book Name';
        return
    };
    bookContainer.textContent = '';
    totalFound.textContent = '';
    spinner.classList.remove('d-none')
    fetch(`https://openlibrary.org/search.json?q=${inputField.value}`)
        .then(res => res.json())
        .then(data => displayBooks(data))
}
const displayBooks = books => {
    inputField.value = '';
    spinner.classList.add('d-none')
    if (books.numFound) {
        totalFound.classList.remove('text-danger')
        totalFound.classList.add('text-primary')
        totalFound.innerText = `Total result found ${books.numFound}`;
    } else {
        totalFound.classList.remove('text-primary');
        totalFound.classList.add('text-danger');
        totalFound.innerText = `No Result Found`
    }
    const container = document.getElementById('book-container');
    books.docs.forEach(book => {
        let author = 'unknown'
        let img = ''
        if (book.author_name) {
            author = book.author_name[0]
        }
        if (book.cover_i) {
            img = `<img height="250px" width="160px" src="https://covers.openlibrary.org/b/id/${book.cover_i}-L.jpg" class="mx-auto mt-4" alt="..."> `
        } else {
            img = `<img height="250px" width="160px" src="image-not-found.jpg" class="mx-auto mt-4" alt="..."> `
        }
        const div = document.createElement('div');
        div.className = 'col'
        div.innerHTML = ` 
        <div class="card h-100">
        ${img}
        <div class="card-body">
            <p class="card-title fs-3 fw-bolder">${book.title}</p>
            <p class="fs-5">by <span class="text-primary"> ${author} </span></p>
            <p>Publisher : ${book.publisher ? book.publisher[0] : 'unknown'} </p>
            <p>First published in ${book.first_publish_year}</p>
           </div>
        
    </div>
        `
        container.appendChild(div)
    });

}