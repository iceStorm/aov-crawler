"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const crawler_1 = __importDefault(require("./crawler"));
const morgan_1 = __importDefault(require("morgan"));
const express_1 = __importDefault(require("express"));
const app = express_1.default();
app.use(morgan_1.default('dev'));
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log('⚡️ Listening on port:', PORT);
    console.log(`http://localhost:${PORT}`);
});
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    next();
});
app.get('/:id', async (req, res) => {
    const heroId = req.params.id;
    crawler_1.default(parseInt(heroId))
        .then((data) => {
        res.status(200).send(data);
    })
        .catch((err) => {
        res.status(500).send(err);
    });
});
