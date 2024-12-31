const sendResponse = (res, statusCode, data = null) => {
  const response = {
    message: "Success",
  };

  if (data !== null) {
    response.data = data;
  }

  // Встановлення статусу відповіді та заголовків
  res.writeHead(statusCode, { "Content-Type": "application/json" });

  // Надсилання JSON-відповіді
  res.end(JSON.stringify(response));
};

export default sendResponse;
