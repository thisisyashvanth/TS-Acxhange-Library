import { db } from "../db/initDbandTables";
import { Book } from "../models/book.model";
import { loadSql } from "../utils/loadSql";


const createBook = loadSql("books/createBook.sql");
const getAllBooks = loadSql("books/getAllBooks.sql");


export async function addBook(book: Book) {
    await db.query(createBook, [book.title, book.description, book.rating, book.copies]);
    return "Book Added";
}

export async function viewBooks() {
    const [books] = await db.query(getAllBooks);
    return books;
}