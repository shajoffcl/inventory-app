const jwt = require('jsonwebtoken');
const constants = require('../configs/constants');

module.exports = class JwtUtils {
     static sign(req) {
          const token = jwt.sign(req, constants.JWT_SECRET, { expiresIn: '2h' });
          return token
     }

     static verify(token) {
          const user = jwt.verify(token, constants.JWT_SECRET);
          return user
     }
}