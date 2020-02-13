const router = require("express").Router();
const bcrypt = require("bcryptjs");
const User = require("./userModel");

router.get("/", (req, res) => {
  User.findAll()
    .then(user => res.status(200).json(user))
    .catch(err => {
      console.log("does this show");
      res
        .status(500)
        .json({ message: "There was a problem getting the users" });
    });
});

router.post("/:id/register", (req, res) => {
  const user = { ...req.body, role_id: req.params.id };
  const hash = bcrypt.hashSync(user.password, 10);
  user.password = hash;
  if (!user.username) {
    res.status(404).json({ message: "Please add a username" });
  } else if (!user.password) {
    res.status(404).json({ messsage: "Please add a password" });
  } else {
    User.add(user)
      .then(user => res.status(201).json(user))
      .catch(err =>
        res
          .status(500)
          .json({ message: "There was a problem when creating the user." })
      );
  }
});

router.post("/roles", (req, res) => {
  const role = req.body;

  User.addRole(role)
    .then(role => res.status(201).json(role))
    .catch(err => res.status(500).json({ message: "Could not set a role." }));
});

router.get("/roles", (req, res) => {
  User.findAllRoles()
    .then(role => res.status(200).json(role))
    .catch(err =>
      res.status(500).json({ message: "Could not find this role" })
    );
});

module.exports = router;
