import jwt from 'jsonwebtoken';
export const protect = (req, res, next)=> {
    const authHeader = req.header('Authorization');
    console.log(authHeader)
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).send('Access denied. No token provided.');
    }
    const token = authHeader.split(' ')[1];
    // console.log(token);
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = decoded;
      next();
    } catch (ex) {
      return res.status(400).send('Invalid token.'); 
    }
  };
  