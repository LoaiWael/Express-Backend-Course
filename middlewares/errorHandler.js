module.exports = (err, req, res, nxt) => {
  console.log(err);
  res.status(500).send('Internal Server Error')
}