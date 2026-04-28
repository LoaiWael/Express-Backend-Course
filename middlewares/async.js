module.exports = function asyncHandler(routeHandler) {
  return async function (req, res, nxt) {
    try {
      await routeHandler(req, res);
    }
    catch (err) {
      nxt(err)
    }
  }
}