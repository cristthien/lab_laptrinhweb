
class Book {
    constructor(title, author, isbn, availableCopies) {
        this.title = title;
        this.author = author;
        this.isbn = isbn;
        this.availableCopies = availableCopies;
    }

    borrowBook() {
        if (this.availableCopies > 0) {
            this.availableCopies--;
            return true;
        } else {
            throw new Error("Book is not available.");
        }
    }

    returnBook() {
        this.availableCopies++;
    }
}

class User {
    constructor(name, userType) {
        if (new.target === User) {
            throw new Error("Cannot instantiate abstract class User.");
        }
        this.name = name;
        this.userType = userType;
        this.borrowedBooks = [];
    }

    borrow(book) {
        throw new Error("Method borrow() must be implemented by subclasses.");
    }

    return(book) {
        const index = this.borrowedBooks.indexOf(book);
        if (index !== -1) {
            this.borrowedBooks.splice(index, 1);
            book.returnBook();
        } else {
            throw new Error("You haven't borrowed this book.");
        }
    }
}

class Student extends User {
    constructor(name) {
        super(name, "Student");
    }

    borrow(book) {
        if (this.borrowedBooks.includes(book)) {
            throw new Error("You cannot borrow a books twice");
        } else if (this.borrowedBooks.length < 3 && book.borrowBook() ) {
            this.borrowedBooks.push(book);
            return true;
        } else {
            throw new Error("You cannot borrow more than 3 books.");
        }
    }
}

class Teacher extends User {
    constructor(name) {
        super(name, "Teacher");
    }

    borrow(book) {
        if (this.borrowedBooks.includes(book)) {
            throw new Error("You cannot borrow a books twice");
        } else if (this.borrowedBooks.length < 5 && book.borrowBook() ) {
            this.borrowedBooks.push(book);
            return true;
        } else {
            throw new Error("You cannot borrow more than 5 books.");
        }
    }
}


class Library {
    constructor(bookRepository, userRepository) {
        this.bookRepository = bookRepository; 
        this.userRepository = userRepository; 
    }

    addBook(book) {
        this.bookRepository.addBook(book);
    }

    addUser(user) {
        this.userRepository.addUser(user);
    }

    borrowBook(user, book) {
        user.borrow(book);
    }

    returnBook(user, book) {
        user.return(book);
    }

    listAvailableBooks() {
        return this.bookRepository.getAvailableBooks();
    }
}

class BookRepository {
    constructor() {
        this.books = [];
    }

    addBook(book) {
        this.books.push(book);
    }

    getAvailableBooks() {
        return this.books.filter(book => book.availableCopies > 0);
    }
}

class UserRepository {
    constructor() {
        this.users = [];
    }

    addUser(user) {
        this.users.push(user);
    }

    getUsers() {
        return this.users;
    }
}

const bookRepo = new BookRepository();
const userRepo = new UserRepository();

const myLibrary = new Library(bookRepo, userRepo);

const book1 = new Book("JavaScript: The Good Parts", "Douglas Crockford", "978-0596517748", 3);
const book2 = new Book("Eloquent JavaScript", "Marijn Haverbeke", "978-1593279509", 2);
myLibrary.addBook(book1);
myLibrary.addBook(book2);

// Can not create instance from the abstract class
// const user = new User("Huu Thien", "Student")
const student1 = new Student("Huu Thien");
const teacher1 = new Teacher("Gia Han");
myLibrary.addUser(student1);
myLibrary.addUser(teacher1);

myLibrary.borrowBook(student1, book1);
// Check duplicate 
// myLibrary.borrowBook(student1, book1);
myLibrary.borrowBook(teacher1, book2);

myLibrary.returnBook(student1, book1);
