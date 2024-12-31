import {
  getAllForms,
  getFormById,
  createForm,
  updateForm,
  deleteForm,
} from "./formController.js";

export const handleRequest = (req, res) => {
  const url = new URL(req.url, `http://${req.headers.host}`);
  const { pathname } = url;

  const id = pathname.split("/")[2]; // Extract ID from the URL if present

  if (req.method === "GET" && pathname === "/forms") {
    getAllForms(req, res);
  } else if (req.method === "GET" && pathname.startsWith("/forms/")) {
    getFormById(req, res, id);
  } else if (req.method === "POST" && pathname === "/forms") {
    createForm(req, res);
  } else if (req.method === "PUT" && pathname.startsWith("/forms/")) {
    updateForm(req, res, id);
  } else if (req.method === "DELETE" && pathname.startsWith("/forms/")) {
    deleteForm(req, res, id);
  } else {
    res.writeHead(404, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ error: "Not Found" }));
  }
};
