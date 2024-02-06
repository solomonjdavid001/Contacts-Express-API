module.exports = (res, status, message, data) => {
  res.status(status).json({ statusCode: status, message, data });
};
