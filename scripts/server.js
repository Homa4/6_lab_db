import { createServer } from "http";
import { connection, connectToDB } from "./connection.js";
import { handleRequest } from "./router.js";
import chalk from "chalk";

const PORT = 3000;

// Initialize database connection once
connectToDB();

createServer(async (req, res) => {
  try {
    // Виклик функції handleRequest для обробки всіх запитів
    handleRequest(req, res);
  } catch (error) {
    console.error("Error handling request:", error.message);
    res.writeHead(500, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ error: error.message }));
  }
}).listen(PORT, () => {
  console.log(
    chalk.greenBright(`Server is running on http://localhost:${PORT}`)
  );
});
