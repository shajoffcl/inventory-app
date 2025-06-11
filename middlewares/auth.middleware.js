const JwtUtils = require('../utils/jwt.utils');

function authMiddleware(req, res, next) {
     const authHeader = req.headers.authorization;
     if (!authHeader?.startsWith('Bearer ')) return res.status(401).send({ message: 'token is missing' });

   
     const token = authHeader.split(' ')[1];
     const reqMethod = req.method;
     
     try {
       const user = JwtUtils.verify(token);

       const actions = user?.actions;
   
       if (reqMethod === 'GET' && !actions.includes('r')) {
         throw new Error('read is not allowed')
       } else if (reqMethod === 'POST' && !actions.includes('w')) {
         throw new Error('write is not allowed')
       } else if (reqMethod === 'PUT' && !actions.includes('u')) {
         throw new Error('update is not allowed')
       } else if (reqMethod === 'DELETE' && !actions.includes('d')) {
         throw new Error('delete is not allowed')
       } else {
         req.user = user;
         next();
       }
     } catch (err) {
       console.error(err);
       res.status(401).send({ message: err.message });
     }
}

module.exports = authMiddleware