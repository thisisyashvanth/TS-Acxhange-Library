"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const prompt_sync_1 = __importDefault(require("prompt-sync"));
const book_service_1 = require("./services/book.service");
const user_service_1 = require("./services/user.service");
const borrowings_service_1 = require("./services/borrowings.service");
const initDbandTables_1 = require("./db/initDbandTables");
const prompt = (0, prompt_sync_1.default)();
async function main() {
    await (0, initDbandTables_1.initDb)();
    await (0, initDbandTables_1.initTables)();
    while (true) {
        console.log("Hellowwww, Welcome to Acx Library");
        console.log("1. Add User");
        console.log("2. View Users");
        console.log("3. Add Book");
        console.log("4. View Books");
        console.log("5. Borrow Book");
        console.log("6. Return Book");
        console.log("7. View Borrow Records");
        console.log("8. Exit");
        const choice = prompt("Choice: ");
        switch (choice) {
            case "1": {
                const name = prompt("Name: ");
                const email = prompt("Email: ");
                const phoneNumber = prompt("Phone Number: ");
                const userIp = { name: name, email: email, phoneNumber: phoneNumber };
                const result = await (0, user_service_1.addUser)(userIp);
                console.log(result);
                break;
            }
            case "2": {
                const users = await (0, user_service_1.viewUsers)();
                console.table(users);
                break;
            }
            case "3": {
                const title = prompt("Title: ");
                const description = prompt("Description: ");
                const rating = Number(prompt("Rating: "));
                const copies = Number(prompt("Total Copies: "));
                const bookIp = { title: title, description: description, rating: rating, copies: copies };
                const result = await (0, book_service_1.addBook)(bookIp);
                console.log(result);
                break;
            }
            case "4": {
                const books = await (0, book_service_1.viewBooks)();
                console.table(books);
                break;
            }
            case "5": {
                const userId = Number(prompt("User ID: "));
                const bookId = Number(prompt("Book ID: "));
                const result = await (0, borrowings_service_1.borrowBook)(userId, bookId);
                console.log(result);
                break;
            }
            case "6": {
                const userId = Number(prompt("User ID: "));
                const bookId = Number(prompt("Book ID: "));
                const result = await (0, borrowings_service_1.returnBook)(userId, bookId);
                console.log(result);
                break;
            }
            case "7": {
                const borrowings = await (0, borrowings_service_1.viewBorrowings)();
                console.table(borrowings);
                break;
            }
            case "8": {
                console.log("BaBaiiii");
                process.exit(0);
            }
            default: {
                console.log("Invalid Choice.");
            }
        }
    }
}
main();
//# sourceMappingURL=main.js.map