const jwt = require('jsonwebtoken');\nconst config = require('../config/config');\n\n// Middleware to authenticate users\nexports.authenticate = (req, res, next) => {\n    const token = req.header('Authorization');\n    if (!token) return res.status(401).json({ message: 'Access denied. No token provided.' });\n\n    try {\n        const decoded = jwt.verify(token, config.JWT_SECRET);\n        req.user = decoded;\n        next();\n    } catch (ex) {\n        res.status(400).json({ message: 'Invalid token.' });\n    }\n};
