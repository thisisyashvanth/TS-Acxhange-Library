"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.addBook = addBook;
exports.viewBooks = viewBooks;
const initDbandTables_1 = require("../db/initDbandTables");
const loadSql_1 = require("../utils/loadSql");
const createBook = (0, loadSql_1.loadSql)("books/createBook.sql");
const getAllBooks = (0, loadSql_1.loadSql)("books/getAllBooks.sql");
async function addBook(book) {
    await initDbandTables_1.db.query(createBook, [book.title, book.description, book.rating, book.copies]);
    return "Book Added";
}
async function viewBooks() {
    const [books] = await initDbandTables_1.db.query(getAllBooks);
    return books;
}
//# sourceMappingURL=book.service.js.map