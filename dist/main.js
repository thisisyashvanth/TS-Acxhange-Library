"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const db_1 = require("./db");
async function setupDb() {
    await (0, db_1.initDb)();
    await (0, db_1.initTables)();
    console.log("DB and Tables Init Successful");
}
async function main() {
    await setupDb();
    await (0, db_1.addUser)({
        name: "Yashvanth T V", email: "yashvanthtv@gmail.com", phoneNumber: "9123456780"
    });
    await (0, db_1.viewUsers)();
    await (0, db_1.addBook)({
        title: "Java", description: "Learn Java", rating: 9.5
    });
    await (0, db_1.viewBooks)();
}
main();
//# sourceMappingURL=main.js.map