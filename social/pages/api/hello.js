export default function handler(req, res) {
  res.status(200).json({
    message: "Social Network API",
    status: "running",
  });
}
