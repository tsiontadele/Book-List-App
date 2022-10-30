class Book{
    constructor(title, author, isbn){
        this.title=title;
        this.author=author;
        this.isbn=isbn;
    }
}
class UI{
    static displayBooks(){
       const books=Store.getBooks()
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
        <td><a href="#" class="btn btn-outline-danger btn-sm delete">X</td>
        `
        list.appendChild(row)
    }
    static deleteBook(targetElement) {
        if(targetElement.classList.contains('delete')) {
          targetElement.parentElement.parentElement.remove();
        }
      }
      static showAlert(message, className){
        const div=document.createElement('div')
        div.className=`alert alert-${className}`
        div.appendChild(document.createTextNode(message))

        const container=document.querySelector('.container');
        const form=document.querySelector('#book-form')
        container.insertBefore(div,form)

        //vanish in 3sec
       
        setTimeout(()=>{document.querySelector('.alert').remove()},2000)
      }
    static clearFilds(){
        document.querySelector('#title').value=''
        document.querySelector('#author').value=''
        document.querySelector('#isbn').value=''
    }
}
class Store{
    static getBooks(){
        let books;
        if(localStorage.getItem('books')===null){
            books=[]
        }else{
            books=JSON.parse(localStorage.getItem('books'))
        }
        return books
    }
    static addBook(book){
        const books= Store.getBooks()
        books.push(book)
        localStorage.setItem('books',JSON.stringify(books))
    }
    static removeBook(isbn) {
        const books = Store.getBooks();
    
        books.forEach((book, index) => {
          if(book.isbn === isbn) {
            books.splice(index, 1);
          }
        });
    
        localStorage.setItem('books', JSON.stringify(books));
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

    //validate
    if(title===''||author===''||isbn===''){
        UI.showAlert("please fill in all filds","danger")
        
    }else{
        const book = new Book(title, author, isbn);

    // Add Book to UI
    UI.addBookToList(book);

    //add book to store
    Store.addBook(book)
    UI.showAlert("Book Added","success")
    //clear filds
    UI.clearFilds()
    }
    
}) 

//Event :Remove a Book
document.querySelector('#book-list').addEventListener('click', (e) => {
    // Remove book from UI
    UI.deleteBook(e.target);

    //remove book from store
    Store.removeBook(e.target.parentElement.previousElementSibling.textContent);
    UI.showAlert("book removed","info")
})