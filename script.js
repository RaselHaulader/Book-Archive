const loadBooks = () => {
    const inputValue = document.getElementById('input-value').value;
    if (inputValue === '') {
        document.getElementById('total-found').innerText = 'Please provide a book name'
        return
    }

    document.getElementById('book-container').textContent = '';
    document.getElementById('total-found').textContent = '';
    console.log(inputValue)
    document.getElementById('spinner').classList.remove('d-none')
    fetch(`https://openlibrary.org/search.json?q=${inputValue}`)
        .then(res => res.json())
        .then(data => displayBooks(data))
}
const displayBooks = books => {
    document.getElementById('input-value').value = '';
    console.log(books)
    document.getElementById('spinner').classList.add('d-none')
    if (books.numFound) {
        document.getElementById('total-found').innerText = `Total result found ${books.numFound}`
    } else {
        document.getElementById('total-found').innerText = `No Result Found`
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