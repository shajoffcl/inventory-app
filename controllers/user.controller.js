const UserService = require("../services/user.service");

exports.login = (req, res) => {
  try {
    const response = UserService.userLogin(req.body);
    res.status(response.code).json(response);
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "Could not retrieve user", err: error });
  }
};

exports.list = (req, res) => {
  try {
    const response = UserService.userList();
    res.status(response.code).json(response);
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "Could not retrieve user list", err: error });
  }
}



