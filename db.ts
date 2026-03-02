import * as dotenv from "dotenv";
import * as mysql from "mysql2/promise";

dotenv.config()


export async function initDb() {
    const connection = await mysql.createConnection({
        host: process.env.DB_HOST!,
        user: process.env.DB_USER!, 
        password: process.env.DB_PASSWORD!
    });

    await connection.query(`CREATE DATABASE IF NOT EXISTS ${process.env.DB_NAME}`);

    console.log("DB Created");

    await connection.end();
}

export async function initTables() {
     await db.query(`
        CREATE TABLE IF NOT EXISTS users (
            id INT AUTO_INCREMENT PRIMARY KEY,
            name VARCHAR(50),
            email VARCHAR(50),
            phoneNumber VARCHAR(10)
        )
    `);

    await db.query(`
        CREATE TABLE IF NOT EXISTS books (
            id INT AUTO_INCREMENT PRIMARY KEY,
            title VARCHAR(50),
            description VARCHAR(100),
            rating FLOAT
        )
    `);

    console.log("Tables Created");
}

export const db = mysql.createPool({
    host: process.env.DB_HOST!,
    user: process.env.DB_USER!,
    password: process.env.DB_PASSWORD!,
    database: process.env.DB_NAME!
})

interface User {
    name: string,
    email: string,
    phoneNumber: string
}

interface Book {
    title: string,
    description: string,
    rating: number
}

export async function addUser(user: User) {
    await db.query("INSERT INTO users (name, email, phoneNumber) VALUES (?, ?, ?)", [user.name, user.email, user.phoneNumber]);
    console.log("User Added");
}

export async function viewUsers() {
    const [users] = await db.query("SELECT * FROM users");
    console.table(users);
}

export async function addBook(book: Book) {
    await db.query("INSERT INTO books (title, description, rating) VALUES (?, ?, ?)", [book.title, book.description, book.rating]);
    console.log("Book Added");
}

export async function viewBooks() {
    const [books] = await db.query("SELECT * FROM books");
    console.table(books);
}