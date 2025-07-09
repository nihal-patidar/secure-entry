// CORS middleware - strict matching

const allowedOrigins = [
  (process.env.ORIGIN_PRODUCTION || "").replace(/\/+$/, ""),
  (process.env.ORIGIN_DEVELOPMENT || "").replace(/\/+$/, "")
];

module.exports = (req, res, next) => {
  const origin = req.headers.origin?.replace(/\/+$/, ""); // remove trailing slash

  console.log("Request Origin:", origin);
  console.log("Allowed Origins:", allowedOrigins);

  if (origin && allowedOrigins.includes(origin)) {
    res.setHeader("Access-Control-Allow-Origin", origin);
  }

  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Content-Disposition"
  );
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");

  if (req.method === "OPTIONS") {
    return res.status(204).end();
  }

  next();
};
