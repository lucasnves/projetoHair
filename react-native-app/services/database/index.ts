import * as SQLite from "expo-sqlite";

const db = SQLite.openDatabaseSync("db.db");

console.info("[DataBase] cache_size:", db.getAllSync("PRAGMA cache_size;"));
db.runSync("PRAGMA cache_size=16384;");
console.info("[DataBase] cache_size:", db.getAllSync("PRAGMA cache_size;"));

export default db;
