import { readFileSync } from "fs";
import { join } from "path";

export function loadSql(path: string): string {
    return readFileSync(join(process.cwd(), "sql", path), "utf-8");
}