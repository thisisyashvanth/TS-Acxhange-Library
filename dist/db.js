"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.db = void 0;
exports.initDb = initDb;
exports.initTables = initTables;
exports.addUser = addUser;
exports.viewUsers = viewUsers;
exports.addBook = addBook;
exports.viewBooks = viewBooks;
const dotenv = require("dotenv");
const mysql = require("mysql2/promise");
dotenv.config();
async function initDb() {
    const connection = await mysql.createConnection({
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD
    });
    await connection.query(`CREATE DATABASE IF NOT EXISTS ${process.env.DB_NAME}`);
    console.log("DB Created");
    await connection.end();
}
async function initTables() {
    await exports.db.query(`
        CREATE TABLE IF NOT EXISTS users (
            id INT AUTO_INCREMENT PRIMARY KEY,
            name VARCHAR(50),
            email VARCHAR(50),
            phoneNumber VARCHAR(10)
        )
    `);
    await exports.db.query(`
        CREATE TABLE IF NOT EXISTS books (
            id INT AUTO_INCREMENT PRIMARY KEY,
            title VARCHAR(50),
            description VARCHAR(100),
            rating FLOAT
        )
    `);
    console.log("Tables Created");
}
exports.db = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
});
async function addUser(user) {
    await exports.db.query("INSERT INTO users (name, email, phoneNumber) VALUES (?, ?, ?)", [user.name, user.email, user.phoneNumber]);
    console.log("User Added");
}
async function viewUsers() {
    const [users] = await exports.db.query("SELECT * FROM users");
    console.table(users);
}
async function addBook(book) {
    await exports.db.query("INSERT INTO books (title, description, rating) VALUES (?, ?, ?)", [book.title, book.description, book.rating]);
    console.log("Book Added");
}
async function viewBooks() {
    const [books] = await exports.db.query("SELECT * FROM books");
    console.table(books);
}
//# sourceMappingURL=db.js.map