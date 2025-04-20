"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const express_rate_limit_1 = __importDefault(require("express-rate-limit"));
const cors_1 = __importDefault(require("cors"));
const body_parser_1 = __importDefault(require("body-parser"));
const mongoose_1 = __importDefault(require("mongoose"));
const dotenv_1 = __importDefault(require("dotenv"));
const morgan_1 = __importDefault(require("morgan"));
const blogspost_1 = __importDefault(require("./routes/blogspost"));
const user_1 = __importDefault(require("./routes/user"));
dotenv_1.default.config();
const PORT = process.env.PORT || 5000;
const app = (0, express_1.default)();
app.use((0, express_rate_limit_1.default)({
    windowMs: 60000,
    max: 10
}));
// CORS Setup
const whitelist = ["http://localhost:3000", "https://dev-blog.ca"];
const corsOptions = {
    origin: function (origin, callback) {
        if (!origin)
            return callback(null, true);
        if (whitelist.indexOf(origin) !== -1) {
            callback(null, true);
        }
        else {
            callback(new Error("Not allowed by CORS"));
        }
    },
    methods: ["GET", "POST", "DELETE"],
    credentials: true,
};
app.use((0, cors_1.default)(corsOptions));
// Enable preflight across-the-board
app.options("*", (0, cors_1.default)(corsOptions));
// logging
app.use((0, morgan_1.default)("dev"));
// simple console logger - Logging middleware for debugging each request
app.use((req, res, next) => {
    console.log(`${req.method} ${req.url}`);
    next();
});
// middleware - body parser
app.use(body_parser_1.default.urlencoded({ extended: true }));
app.use(body_parser_1.default.json());
app.use(express_1.default.json());
// serves static files
app.use(express_1.default.static("public"));
// Routes
app.get("/", (req, res) => {
    res.json({ message: "Welcome to the A Dev's Blog Backend" });
});
app.get("/api/status", async (req, res) => {
    res.json({
        status: "ok",
        timestamp: new Date().toString()
    });
});
app.use("/api/blogposts", blogspost_1.default);
app.use("/api/user", user_1.default);
app.use((err, req, res, next) => {
    console.error("❌ Uncaught error:", err);
    res
        .status(500)
        .json({ error: err.message || "Internal server error" });
});
// --- MongoDB Connection ---
// connect to db
mongoose_1.default.set("strictQuery", false);
mongoose_1.default
    .connect(process.env.MONGODB || "")
    .then(() => {
    // listen for requests
    app.listen(PORT, () => {
        console.log(`connected to db & listening on port ${PORT}`);
    });
})
    .catch((err) => {
    console.log(err, "the mongodb string is not correct");
});
