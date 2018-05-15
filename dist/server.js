"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var path_1 = __importDefault(require("path"));
var app = express_1.default();
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({
    extended: true
}));
app.use('/', express_1.default.static(path_1.default.join(__dirname, 'local-management-front/dist')));
app.use('/courses', require('./routes/api/courses').route);
app.use('/teachers', require('./routes/api/teachers').route);
app.use('/students', require('./routes/api/students').route);
app.use('/subjects', require('./routes/api/subjects').route);
app.use('/batches', require('./routes/api/batches').route);
app.listen(2678, function () {
    console.log("Server started at http://localhost:2678");
});
