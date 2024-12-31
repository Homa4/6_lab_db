import { connection } from "./connection.js";
import errorProducer from "./errors.js";
import sendResponse from "./sendResponse.js";
import HTTP_STATUS_CODES from "./statusCode.js";

// Utility to parse JSON body
const parseRequestBody = async (req) => {
  return new Promise((resolve, reject) => {
    let body = "";
    req.on("data", (chunk) => {
      body += chunk.toString();
    });
    req.on("end", () => {
      try {
        resolve(JSON.parse(body));
      } catch (err) {
        reject(err);
      }
    });
  });
};

export const getAllForms = (req, res) => {
  const query = "SELECT * FROM Form";
  console.log(query);

  connection.query(query, (err, results) => {
    if (err) {
      return sendResponse(res, 500, { error: err.message });
    }
    sendResponse(res, 200, results);
  });
};

export const getFormById = (req, res, id) => {
  const query = "SELECT * FROM Form WHERE id = ?";
  console.log(query);

  connection.query(query, [id], (err, results) => {
    if (err) {
      return sendResponse(res, 500, { error: err.message });
    }
    if (results.length === 0) {
      return sendResponse(res, 404, { error: "Form not found" });
    }
    sendResponse(res, 200, results[0]);
  });
};

export const createForm = async (req, res) => {
  try {
    const form = await parseRequestBody(req);
    const query =
      "INSERT INTO Form (id, name, description, content) VALUES (?, ?, ?, ?)";
    console.log(query);

    const values = [
      form.id,
      form.name,
      form.description,
      JSON.stringify(form.content),
    ];

    connection.query(query, values, (err) => {
      if (err) {
        return sendResponse(res, 500, { error: err.message });
      }
      sendResponse(res, 201, { message: "Form created successfully" });
    });
  } catch (error) {
    sendResponse(res, 400, { error: "Invalid request data" });
  }
};

export const updateForm = async (req, res, id) => {
  try {
    const updatedForm = await parseRequestBody(req);
    const query =
      "UPDATE Form SET name = ?, description = ?, content = ? WHERE id = ?";
    const values = [
      updatedForm.name,
      updatedForm.description,
      JSON.stringify(updatedForm.content),
      id,
    ];

    connection.query(query, values, (err, results) => {
      if (err) {
        return sendResponse(res, 500, { error: err.message });
      }
      if (results.affectedRows === 0) {
        return sendResponse(res, 404, { error: "Form not found" });
      }
      sendResponse(res, 200, { message: "Form updated successfully" });
    });
  } catch (error) {
    sendResponse(res, 400, { error: "Invalid request data" });
  }
};

export const deleteForm = (req, res, id) => {
  const query = "DELETE FROM Form WHERE id = ?";

  connection.query(query, [id], (err, results) => {
    if (err) {
      return sendResponse(res, 500, { error: err.message });
    }
    if (results.affectedRows === 0) {
      return sendResponse(res, 404, { error: "Form not found" });
    }
    sendResponse(res, 200, { message: "Form deleted successfully" });
  });
};
