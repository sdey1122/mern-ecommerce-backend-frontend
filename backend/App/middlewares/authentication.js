const jwt = require('jsonwebtoken');
const User = require('../models/user-model');

const authenticateByJWT = async (req, res, next) => {
    const authHeader = req.header('Authorization');

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({ message: 'Unauthorized' });
    }

    const token = authHeader.slice(7); // Remove 'Bearer ' from the token

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await User.findById(decoded.userId);

        if (!user) {
            return res.status(401).json({ message: 'Unauthorized' });
        }

        req.user = user;
        next();
    } catch (error) {
        return res.status(401).json({ message: 'Unauthorized' });
    }
};

const authorizeAdmin = (req, res, next) => {
    const user = req.user;

    if (!user || user.role !== 'admin') {
        return res.status(403).json({ message: 'Forbidden' });
    }

    next();
};

module.exports = { authenticateByJWT, authorizeAdmin };