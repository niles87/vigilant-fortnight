const User = require("../model/user");
const bcrypt = require("bcryptjs");

module.exports = {
  login: async function (req, res) {
    console.log(req.body);
    const { email, password } = req.body;
    try {
      const user = await User.findOne({ where: { email } });
      if (user === null) {
        res.sendStatus(403);
      } else if (!bcrypt.compareSync(password, user.password)) {
        res.sendStatus(404);
      } else {
        const loggedIn = { email: user.email, username: user.username, id: user.id };
        res.render("home", { loggedIn });
      }
    } catch (error) {
      console.log(error.message);
    }
  },
  signup: function (req, res) {
    console.log(req.body);
    const { username, email, password1, password2 } = req.body;

    if (password1 !== password2) {
      res.send({ status: 400, msg: "Passwords don't match" });
    } else {
      User.create({ username, email, password: password1 })
        .then((user) => {
          res.render("login", { newUser: true });
        })
        .catch((err) => {
          console.log(err.message);
        });
    }
  },
};
