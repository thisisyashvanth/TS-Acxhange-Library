import * as dotenv from "dotenv";
import * as mysql from "mysql2/promise";
import { loadSql } from "../utils/loadSql";


const createUsersTable = loadSql("users/createUsersTable.sql");
const createBooksTable = loadSql("books/createBooksTable.sql");
const createBorrowingsTable = loadSql("borrowings/createBorrowingsTable.sql");


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

export const db = mysql.createPool({
    host: process.env.DB_HOST!,
    user: process.env.DB_USER!,
    password: process.env.DB_PASSWORD!,
    database: process.env.DB_NAME!
})

export async function initTables() {
    await db.query(createUsersTable);
    await db.query(createBooksTable);
    await db.query(createBorrowingsTable);
    console.log("Tables Created");
}