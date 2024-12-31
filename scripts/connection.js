import { config } from "dotenv";
import { createConnection } from "mysql2";
import chalk from "chalk";

config();

const connection = createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
});

const connectToDB = () => {
  connection.connect((error) => {
    if (error) {
      console.error("Failed to connect to the database:", error.message);
    } else {
      console.log(chalk.greenBright("Successfully connected to the database"));
    }
  });
};

export { connection, connectToDB };
