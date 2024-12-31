// Utility function to create custom error objects
const createError = (message, statusCode, details = null) => {
  const error = new Error(message);
  error.statusCode = statusCode;
  error.details = details;
  return error;
};

// Factory for creating predefined error types
const errorProducer = {
  missingFields: () => createError("Missing required fields", 400),
  notFound: () => createError("Resource not found", 404),
  createError: (details) =>
    createError("Error creating resource", 500, details),
  getError: (details) => createError("Error fetching resource", 500, details),
  updateError: (details) =>
    createError("Error updating resource", 500, details),
  deleteError: (details) =>
    createError("Error deleting resource", 500, details),
};

export default errorProducer;
