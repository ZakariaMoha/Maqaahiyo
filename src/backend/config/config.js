require('dotenv').config();\n\nmodule.exports = {\n    PORT: process.env.PORT || 5000,\n    MONGODB_URI: process.env.MONGODB_URI,\n    JWT_SECRET: process.env.JWT_SECRET,\n};
