"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const server_1 = require("./application/server");
const port = process.env.PORT || 5000;
server_1.server.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
