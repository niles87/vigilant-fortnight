module.exports = {
  login: function (req, res) {
    console.log(req.body);
    res.sendStatus(200);
  },
  signup: function (req, res) {
    console.log(req.body);
    res.sendStatus(200);
  },
};
