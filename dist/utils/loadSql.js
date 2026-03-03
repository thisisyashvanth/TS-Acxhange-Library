"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.loadSql = loadSql;
const fs_1 = require("fs");
const path_1 = require("path");
function loadSql(path) {
    return (0, fs_1.readFileSync)((0, path_1.join)(process.cwd(), "sql", path), "utf-8");
}
//# sourceMappingURL=loadSql.js.map