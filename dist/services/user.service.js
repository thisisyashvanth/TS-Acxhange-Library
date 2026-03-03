"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.addUser = addUser;
exports.viewUsers = viewUsers;
const initDbandTables_1 = require("../db/initDbandTables");
const loadSql_1 = require("../utils/loadSql");
const createUser = (0, loadSql_1.loadSql)("users/createUser.sql");
const getAllUsers = (0, loadSql_1.loadSql)("users/getAllUsers.sql");
async function addUser(user) {
    await initDbandTables_1.db.query(createUser, [user.name, user.email, user.phoneNumber]);
    return "User Added";
}
async function viewUsers() {
    const [users] = await initDbandTables_1.db.query(getAllUsers);
    return users;
}
//# sourceMappingURL=user.service.js.map