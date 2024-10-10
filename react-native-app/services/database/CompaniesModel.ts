import { createTableDefault } from "./DefaultModel";

const tableName = "companies";

const createTable = (drop = false) => {
    console.log("aq");
  const sql = `
        CREATE TABLE IF NOT EXISTS 
        ${tableName}
        (
            id INTEGER PRIMARY KEY,
            server_id INT,
            name TEXT,
            observation TEXT,
            location TEXT,
            phone_number TEXT,
            email TEXT,
            perfil_photo TEXT,
            created_at TEXT DEFAULT (datetime('now', 'localtime')), 
            updated_at TEXT
        );
    `;
    return createTableDefault(sql, tableName, drop);
};

createTable(false);