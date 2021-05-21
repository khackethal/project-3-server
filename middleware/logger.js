export default function logger(req, res, next) {
  console.log(`-----🤖 Incoming Request: ${req.method} / URL: ${req.url}-----`)
  next()
}