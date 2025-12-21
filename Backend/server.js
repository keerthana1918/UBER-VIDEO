const http = require('http');
require("dotenv").config();
const app = require("./app");
const PORT = process.env.PORT || 4000;

const server = http.createServer(app);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
