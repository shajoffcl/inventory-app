exports.validateUserLogin = (req, res, next) => {
  const { userName, password } = req.body;

  if (!userName) {
    return res.status(400).json({ error: "User Name is required" });
  } else if (typeof userName !== "string") {
    return res.status(400).json({ error: "User Name must be a string" });
  } else if (!password) {
    return res.status(400).json({ error: "Password is required" });
  } else if (typeof password !== "string") {
    return res.status(400).json({ error: "Password must be a string" });
  } else {
    next();
  }
  
};

