import db from ".";

export const createTableDefault = async (
  createTable: string,
  tableName: string,
  drop = false
) => {
  if (drop) {
    await db
      .runAsync(`DROP TABLE ${tableName};`)
      .then(() => {
        console.info(`TABELA ${tableName} destruida.`);
      })
      .catch((error) => {
        console.info(`[DROP ERROR] ${tableName}; ${error}`);
      });
  }
  await db
    .runAsync(createTable)
    .then(() => {
      console.info(`TABELA ${tableName} criada.`);
    })
    .catch((error) => {
      console.info(`[CREATE ERROR] ${tableName}; ${error}`);
    });
};
