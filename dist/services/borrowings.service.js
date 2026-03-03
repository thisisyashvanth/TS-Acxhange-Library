"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.borrowBook = borrowBook;
exports.returnBook = returnBook;
exports.viewBorrowings = viewBorrowings;
const initDbandTables_1 = require("../db/initDbandTables");
const loadSql_1 = require("../utils/loadSql");
const createBorrowing = (0, loadSql_1.loadSql)("borrowings/createBorrowing.sql");
const getAllBorrowings = (0, loadSql_1.loadSql)("borrowings/getAllBorrowings.sql");
const getBookCount = (0, loadSql_1.loadSql)("borrowings/getBookCount.sql");
const decrementBookCount = (0, loadSql_1.loadSql)("borrowings/decrementBookCount.sql");
const incrementBookCount = (0, loadSql_1.loadSql)("borrowings/incrementBookCount.sql");
const getBorrowingRecord = (0, loadSql_1.loadSql)("borrowings/getBorrowingRecord.sql");
const existingBorrow = (0, loadSql_1.loadSql)("borrowings/existingBorrow.sql");
const returnBorrowing = (0, loadSql_1.loadSql)("borrowings/returnBorrowing.sql");
// Wrong Borrow Book
// export async function borrowBook(userId: number, bookId: number) {
//     const connection = await db.getConnection()
//     try {
//         await connection.beginTransaction();
//         const [rows]: any = await connection.query(getBookCount, [bookId]);
//         const currentCount = rows[0].book_count;
//         if (currentCount <= 0) {
//             throw new Error("No Copies Available.");
//         }
//         await connection.query(decrementBookCount, [bookId]);
//         await connection.query(createBorrowing, [userId, bookId]);
//         await connection.commit();
//         return "Book Borrowed";
//     } 
//     catch (err: any) {
//         await connection.rollback();
//         return err.message;
//     } finally {
//         connection.release();
//     }
// }
// COrrect Borrow Book
async function borrowBook(userId, bookId) {
    const connection = await initDbandTables_1.db.getConnection();
    try {
        await connection.beginTransaction();
        const [existing] = await connection.query(existingBorrow, [userId, bookId]);
        if (existing.length > 0) {
            throw new Error("Book already borrowed and not returned");
        }
        const [rows] = await connection.query(getBookCount, [bookId]);
        const currentCount = rows[0].book_count;
        if (currentCount <= 0) {
            throw new Error("No Copies Available");
        }
        await connection.query(decrementBookCount, [bookId]);
        await connection.query(createBorrowing, [userId, bookId]);
        await connection.commit();
        return "Book Borrowed";
    }
    catch (err) {
        await connection.rollback();
        return err.message;
    }
    finally {
        connection.release();
    }
}
// Wrong Return Book
// export async function returnBook(userId: number, bookId: number) {
//     const connection = await db.getConnection();
//     try {
//         await connection.beginTransaction();
//         const [rows]: any = await connection.query(getBorrowingRecord, [userId, bookId]);
//         await connection.query(incrementBookCount, [bookId]);
//         await connection.commit();
//         return "Book Returned";
//     } 
//     catch (err: any) {
//         await connection.rollback();
//         return err.message;
//     }
//     finally {
//         connection.release();
//     }
// }
// COrrect Return Book
async function returnBook(userId, bookId) {
    const connection = await initDbandTables_1.db.getConnection();
    try {
        await connection.beginTransaction();
        const [rows] = await connection.query(existingBorrow, [userId, bookId]);
        if (rows.length === 0) {
            throw new Error("No active borrowing record found.");
        }
        const borrowingId = rows[0].id;
        await connection.query(returnBorrowing, [borrowingId]);
        await connection.query(incrementBookCount, [bookId]);
        await connection.commit();
        return "Book Returned";
    }
    catch (err) {
        await connection.rollback();
        return err.message;
    }
    finally {
        connection.release();
    }
}
async function viewBorrowings() {
    const [borrowings] = await initDbandTables_1.db.query(getAllBorrowings);
    return borrowings;
}
//# sourceMappingURL=borrowings.service.js.map