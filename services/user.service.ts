import { db } from "../db/initDbandTables";
import { User } from "../models/user.model";
import { loadSql } from "../utils/loadSql";


const createUser = loadSql("users/createUser.sql")
const getAllUsers = loadSql("users/getAllUsers.sql")


export async function addUser(user: User) {
    await db.query(createUser, [user.name, user.email, user.phoneNumber]);
    return "User Added";
}

export async function viewUsers() {
    const [users] = await db.query(getAllUsers);
    return users;
}