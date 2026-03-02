import * as mysql from "mysql2/promise";
export declare function initDb(): Promise<void>;
export declare function initTables(): Promise<void>;
export declare const db: mysql.Pool;
interface User {
    name: string;
    email: string;
    phoneNumber: string;
}
interface Book {
    title: string;
    description: string;
    rating: number;
}
export declare function addUser(user: User): Promise<void>;
export declare function viewUsers(): Promise<void>;
export declare function addBook(book: Book): Promise<void>;
export declare function viewBooks(): Promise<void>;
export {};
//# sourceMappingURL=db.d.ts.map