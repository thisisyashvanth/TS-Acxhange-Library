import { addBook, addUser, initDb, initTables, viewBooks, viewUsers } from "./db";

async function setupDb() {
    await initDb();
    await initTables();

    console.log("DB and Tables Init Successful");
}


async function main() {

    await setupDb();

    await addUser({
        name: "Yashvanth T V",email: "yashvanthtv@gmail.com", phoneNumber: "9123456780"
    });

    await viewUsers();

    await addBook({
        title: "Java", description: "Learn Java", rating: 9.5
    });

    await viewBooks();
}


main()