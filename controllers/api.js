const User = require("../model/user");
const bcrypt = require("bcryptjs");

module.exports = {
  login: async function (req, res) {
    const { email, password } = req.body;
    try {
      // const user = await User.findOne({ where: { email } });
      const user = await User.findOne({ email });
      if (user === null) {
        let loginFail = {
          msg: "User Does Not Exist",
        };
        res.status(403).render("login", loginFail);
      } else if (!bcrypt.compareSync(password, user.password)) {
        let loginFail = {
          msg: "Incorrect Password",
        };
        res.status(404).render("login", loginFail);
      } else {
        const loggedIn = {
          email: user.email,
          username: user.username,
        };
        res.render("home", { loggedIn });
      }
    } catch (error) {
      console.log(error.message);
      let loginFail = {
        msg: "Login Fail, please try again in a few minutes",
      };
      res.status(503).render("login", loginFail);
    }
  },
  signup: function (req, res) {
    const { username, email, password1, password2 } = req.body;

    if (password1 !== password2) {
      let failRegister = {
        msg: "Passwords don't match.",
      };
      res.status(401).render("login", failRegister);
    } else {
      // User.create({ username, email, password: password1 })
      //   .then((user) => {
      //     res.render("login", { newUser: true });
      //   })
      //   .catch((err) => {
      //     console.log(err.message);
      //   });
      let newUser = new User({
        username,
        password: password1,
        email,
      });
      User.addUser(newUser, (err, user) => {
        if (err) {
          // console.log(err);
          let failRegister = {
            msg: "Registration Fail, please try again",
          };
          res.status(503).render("login", failRegister);
        } else {
          let registered = {
            msg: `${user.username} thanks for signing up! Please login.`,
          };
          res.status(200).render("login", { registered });
        }
      });
    }
  },
};
