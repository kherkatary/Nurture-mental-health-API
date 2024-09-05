"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyEmail = exports.protectedRoute = exports.Login = exports.Register = void 0;
var userModel_ts_1 = require("../../models/userModel.ts");
var crypto_1 = require("crypto");
var auth_ts_1 = require("../helper/auth.ts");
var jsonwebtoken_1 = require("jsonwebtoken");
var Register = function (_req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, name, email, password, auth_mail, auth_pass, existingUser, hasedPassword, rand, user, token, err_1;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _a = _req.body, name = _a.name, email = _a.email, password = _a.password;
                auth_mail = process.env.AUTH_MAIL;
                auth_pass = process.env.AUTH_pass;
                if (!name)
                    return [2 /*return*/, res.status(400).send({ message: "Name required" })];
                if (!email)
                    return [2 /*return*/, res.status(400).send({ message: "email required" })];
                if (!password)
                    return [2 /*return*/, res.status(400).send({ message: "Password required" })];
                _b.label = 1;
            case 1:
                _b.trys.push([1, 5, , 6]);
                return [4 /*yield*/, userModel_ts_1.default.findOne({ email: email })];
            case 2:
                existingUser = _b.sent();
                if (existingUser)
                    return [2 /*return*/, res.status(201).send({ message: "Existing user, please login" })];
                return [4 /*yield*/, (0, auth_ts_1.hashingPassword)(password)];
            case 3:
                hasedPassword = _b.sent();
                rand = crypto_1.default.randomBytes(10).toString('hex');
                return [4 /*yield*/, new userModel_ts_1.default({ name: name, password: hasedPassword, email: email, mailCrypto: rand }).save()];
            case 4:
                user = _b.sent();
                token = jsonwebtoken_1.default.sign({ id: user._id, email: email }, process.env.SUPER_SECRET_KEY, { expiresIn: "7d" });
                return [2 /*return*/, res.status(200).send({
                        message: "User Created",
                    })];
            case 5:
                err_1 = _b.sent();
                return [2 /*return*/, res.status(500).send({
                        message: "Error registering",
                        error: err_1
                    })];
            case 6: return [2 /*return*/];
        }
    });
}); };
exports.Register = Register;
var Login = function (_req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, email, password, user, compare, token, err_2;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _a = _req.body, email = _a.email, password = _a.password;
                if (!password)
                    return [2 /*return*/, res.status(400).send({ message: "password required" })];
                if (!email)
                    return [2 /*return*/, res.status(400).send({ message: "Name required" })];
                _b.label = 1;
            case 1:
                _b.trys.push([1, 4, , 5]);
                return [4 /*yield*/, userModel_ts_1.default.findOne({ email: email })];
            case 2:
                user = _b.sent();
                if (!user)
                    return [2 /*return*/, res.status(400).send({ message: "User not found, please register first" })];
                return [4 /*yield*/, (0, auth_ts_1.passwordCompare)(password, user.password)];
            case 3:
                compare = _b.sent();
                if (!compare)
                    return [2 /*return*/, res.status(400).send({ message: "Password incorrect" })];
                token = jsonwebtoken_1.default.sign({ id: user._id, email: user.email }, process.env.SUPER_SECRET_KEY, { expiresIn: '7d' });
                return [2 /*return*/, res.status(200).send({
                        message: "Login successfull",
                        name: user.name,
                        email: user.email,
                        token: token
                    })];
            case 4:
                err_2 = _b.sent();
                return [2 /*return*/, res.status(500).send({ message: "Error Logging in", error: err_2 })];
            case 5: return [2 /*return*/];
        }
    });
}); };
exports.Login = Login;
var protectedRoute = function (_req, res) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        return [2 /*return*/, res.send("Hello i am a protected route")];
    });
}); };
exports.protectedRoute = protectedRoute;
var verifyEmail = function (_req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var id, verfiedCrypto, user, newUpdate, err_3;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                id = _req.params.id;
                verfiedCrypto = _req.params.slug;
                _a.label = 1;
            case 1:
                _a.trys.push([1, 6, , 7]);
                return [4 /*yield*/, userModel_ts_1.default.findById(id)];
            case 2:
                user = _a.sent();
                if (!user)
                    return [2 /*return*/, res.status(500).send("Couldnt find User")];
                if (!(verfiedCrypto != user.mailCrypto)) return [3 /*break*/, 4];
                return [4 /*yield*/, userModel_ts_1.default.findByIdAndDelete(id, function (err, data) {
                        if (!err)
                            return res.status(500).send({
                                message: "Token unmatched, User deleted",
                            });
                    })];
            case 3:
                _a.sent();
                return [2 /*return*/, res.status(300).send("Verification failed, token unmatched")];
            case 4: return [4 /*yield*/, userModel_ts_1.default.findByIdAndUpdate(id, { isMailVerified: true })];
            case 5:
                newUpdate = _a.sent();
                return [2 /*return*/, res.status(200).send("Email Verified, thank you")];
            case 6:
                err_3 = _a.sent();
                return [2 /*return*/, res.status(500).send({
                        message: "Error email verification process",
                        error: err_3
                    })];
            case 7: return [2 /*return*/];
        }
    });
}); };
exports.verifyEmail = verifyEmail;
