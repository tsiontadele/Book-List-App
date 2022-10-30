class Book{
    constructor(title, author, isbn){
        this.title=title;
        this.author=author;
        this.isbn=isbn;
    }
}
class UI{
    static displayBooks(){
        const bookList=[
            {
                title:"Book One",
                author:"Jhone Doe",
                isbn:"1234",
            },
            {
                title:"Book Two",
                author:"jane Doe",
                isbn:"1234",
            }
        ]
        const books=bookList;
        books.forEach(book=>{
            UI.addBookToList(book)
        })
    }
    static addBookToList(book){
        const list= document.querySelector('#book-list')
        const row= document.createElement('tr')
        row.innerHTML=`
        <td>${book.title}</td>
        <td>${book.author}</td>
        <td>${book.isbn}</td>
        <td><a href="#" class="btn btn-outline-danger btn-sm delet">X</td>
        `
        list.appendChild(row)
    }
}

//Event: display Books
document.addEventListener('DOMContentLoaded', UI.displayBooks)

//Event: Add Books
document.querySelector('#book-form').addEventListener('submit', (e) => {
    // Prevent actual submit
    e.preventDefault();
  
    // Get form values
    const title = document.querySelector('#title').value;
    const author = document.querySelector('#author').value;
    const isbn = document.querySelector('#isbn').value;
    const book = new Book(title, author, isbn);

    // Add Book to UI
    UI.addBookToList(book);
})