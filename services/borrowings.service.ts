import { db } from "../db/initDbandTables";
import { loadSql } from "../utils/loadSql";


const createBorrowing = loadSql("borrowings/createBorrowing.sql");
const getAllBorrowings = loadSql("borrowings/getAllBorrowings.sql");

const getBookCount = loadSql("borrowings/getBookCount.sql");
const decrementBookCount = loadSql("borrowings/decrementBookCount.sql");
const incrementBookCount = loadSql("borrowings/incrementBookCount.sql");
const getBorrowingRecord = loadSql("borrowings/getBorrowingRecord.sql");

const existingBorrow = loadSql("borrowings/existingBorrow.sql");
const returnBorrowing = loadSql("borrowings/returnBorrowing.sql");



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

export async function borrowBook(userId: number, bookId: number) {
    const connection = await db.getConnection();

    try {
        await connection.beginTransaction();

        const [existing]: any = await connection.query(existingBorrow, [userId, bookId]);

        if (existing.length > 0) {
            throw new Error("Book already borrowed and not returned");
        }

        const [rows]: any = await connection.query(getBookCount, [bookId]);
        const currentCount = rows[0].book_count;

        if (currentCount <= 0) {
            throw new Error("No Copies Available");
        }

        await connection.query(decrementBookCount, [bookId]);

        await connection.query(createBorrowing, [userId, bookId]);

        await connection.commit();
        return "Book Borrowed";
    } 
    catch (err: any) {
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

export async function returnBook(userId: number, bookId: number) {
    const connection = await db.getConnection();

    try {
        await connection.beginTransaction();

        const [rows]: any = await connection.query(existingBorrow, [userId, bookId]);

        if (rows.length === 0) {
            throw new Error("No active borrowing record found.");
        }

        const borrowingId = rows[0].id;

        await connection.query(returnBorrowing, [borrowingId]);

        await connection.query(incrementBookCount, [bookId]);

        await connection.commit();
        return "Book Returned";
    } 
    catch (err: any) {
        await connection.rollback();
        return err.message;
    } 
    finally {
        connection.release();
    }
}


export async function viewBorrowings() {
    const [borrowings] = await db.query(getAllBorrowings);
    return borrowings;
}