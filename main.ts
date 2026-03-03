import promptSync from "prompt-sync";
import { Book } from "./models/book.model";
import { addBook, viewBooks } from "./services/book.service";
import { User } from "./models/user.model";
import { addUser, viewUsers } from "./services/user.service";
import { borrowBook, returnBook, viewBorrowings } from "./services/borrowings.service";
import { initDb, initTables } from "./db/initDbandTables";

const prompt = promptSync();

async function main() {

    await initDb();
    await initTables();

    console.log("Hellowwww, Welcome to Acx Library");
    
    while (true) {
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
                const userIp: User = {name: name, email: email, phoneNumber: phoneNumber};
                const result = await addUser(userIp);
                console.log(result);
                break; 
            }
    
            case "2": {
                const users = await viewUsers();
                console.table(users);
                break;
            }
    
            case "3": {
                const title = prompt("Title: ");
                const description = prompt("Description: ");
                const rating = Number(prompt("Rating: "));
                const copies = Number(prompt("Total Copies: "));
                const bookIp: Book = {title: title, description: description, rating: rating, copies: copies};
                const result = await addBook(bookIp);
                console.log(result);
                break;
            }
            
            case "4": {
                const books = await viewBooks();
                console.table(books);
                break;
            }

            case "5": {
                const userId = Number(prompt("User ID: "));
                const bookId = Number(prompt("Book ID: "));
                const result = await borrowBook(userId, bookId);
                console.log(result);
                break;
            }
    
            case "6": {
                const userId = Number(prompt("User ID: "));
                const bookId = Number(prompt("Book ID: "));            
                const result = await returnBook(userId, bookId);
                console.log(result);
                break;
            }
    
            case "7": {
                const borrowings = await viewBorrowings();
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