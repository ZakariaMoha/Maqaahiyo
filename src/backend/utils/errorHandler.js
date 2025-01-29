// Error handling utility\n\nexports.handleError = (res, error) => {\n    console.error(error);\n    res.status(500).json({ message: 'Internal Server Error' });\n};
