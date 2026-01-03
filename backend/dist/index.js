"use strict";
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const express_1 = __importDefault(require("express"));
const DB_1 = require("./config/DB");
const user_route_1 = __importDefault(require("./router/user.route"));
const app = (0, express_1.default)();
const PORT = 4000;
// parse JSON data
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.get("/", (req, res) => {
  res.send("server running");
});
app.use(user_route_1.default);
app.listen(PORT, () => {
  (0, DB_1.connectDB)();
  console.log(`Server running on http://localhost:${PORT}`);
});
