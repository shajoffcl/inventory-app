const users = require('../configs/users.json');
const JwtUtils = require('../utils/jwt.utils');
const responseCodes = require('../configs/responseCodes');
const Response = require('../utils/response');

class UserService {

  static userLogin(reqObj) {
    const { userName, password } = reqObj;

    const user = users.find(usr => usr.userName === userName);

    if (!user) return new Response(responseCodes.NOT_FOUND.code, responseCodes.NOT_FOUND.msg, {});

    if (user.password === password) {
      const token = JwtUtils.sign({ user: userName, actions: user.actions })
      return new Response(responseCodes.SUCCESS.code, responseCodes.SUCCESS.msg, {token});
    } else {
      return new Response(responseCodes.UNAUTHORIZED.code, responseCodes.UNAUTHORIZED.msg, {});
    }
  }

  static userList() {
    return new Response(responseCodes.SUCCESS.code, responseCodes.SUCCESS.msg, {
      list: users
    })
  }
  
}

module.exports = UserService;
