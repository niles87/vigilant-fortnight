const User = require("../model/user");
const bcrypt = require("bcryptjs");

module.exports = {
  login: async function (req, res) {
    
    const { email, password } = req.body;
    try {
      // const user = await User.findOne({ where: { email } });
      const user = await User.findOne({email})
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
    
    const { username, email, password1, password2 } = req.body;

    if (password1 !== password2) {
      res.send({ status: 400, msg: "Passwords don't match" });
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
          res.render('login', {newUser:false});
        } else {
          res.render("login", { newUser: true });
        }
      });
    }
  },
};
