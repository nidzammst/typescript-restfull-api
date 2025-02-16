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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const supertest_1 = __importDefault(require("supertest"));
const logging_1 = require("../application/logging");
const web_1 = require("../application/web");
const test_util_1 = require("./test-util");
const bcrypt_1 = __importDefault(require("bcrypt"));
describe("POST /api/users", () => {
    afterEach(() => __awaiter(void 0, void 0, void 0, function* () {
        yield test_util_1.UserTest.delete();
    }));
    it("should reject register new user if request is invalid", () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield (0, supertest_1.default)(web_1.web).post(`/api/users`).send({
            username: "",
            password: "",
            name: "",
        });
        logging_1.logger.debug(response.body);
        expect(response.status).toBe(400);
        expect(response.body.errors).toBeDefined();
    }));
    it("should register new user", () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield (0, supertest_1.default)(web_1.web).post("/api/users").send({
            username: "test",
            password: "test",
            name: "test",
        });
        logging_1.logger.debug(response.body);
        expect(response.status).toBe(200);
        expect(response.body.data.username).toBe("test");
        expect(response.body.data.name).toBe("test");
    }));
});
describe("POST /api/users/login", () => {
    beforeEach(() => __awaiter(void 0, void 0, void 0, function* () {
        yield test_util_1.UserTest.create();
    }));
    afterEach(() => __awaiter(void 0, void 0, void 0, function* () {
        yield test_util_1.UserTest.delete();
    }));
    it("should be able to login", () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield (0, supertest_1.default)(web_1.web).post("/api/users/login").send({
            username: "test",
            password: "test",
        });
        logging_1.logger.debug(response.body);
        expect(response.status).toBe(200);
        expect(response.body.data.username).toBe("test");
        expect(response.body.data.name).toBe("test");
        expect(response.body.data.token).toBeDefined();
    }));
    it("should reject login user if username is wrong", () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield (0, supertest_1.default)(web_1.web).post("/api/users/login").send({
            username: "test",
            password: "salah",
        });
        logging_1.logger.debug(response.body);
        expect(response.status).toBe(401);
        expect(response.body.errors).toBeDefined();
    }));
});
describe("GET /api/users/current", () => {
    beforeEach(() => __awaiter(void 0, void 0, void 0, function* () {
        yield test_util_1.UserTest.create();
    }));
    afterEach(() => __awaiter(void 0, void 0, void 0, function* () {
        yield test_util_1.UserTest.delete();
    }));
    it("should be able to get current user", () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield (0, supertest_1.default)(web_1.web)
            .get("/api/users/current")
            .set("X-API-TOKEN", "test");
        logging_1.logger.debug(response.body);
        expect(response.status).toBe(200);
        expect(response.body.data.username).toBe("test");
        expect(response.body.data.name).toBe("test");
    }));
    it("should reject get user if token is invalid", () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield (0, supertest_1.default)(web_1.web)
            .get("/api/users/current")
            .set("X-API-TOKEN", "salah");
        logging_1.logger.debug(response.body);
        expect(response.status).toBe(401);
        expect(response.body.errors).toBeDefined();
    }));
});
describe("Patch /api/user/current", () => {
    beforeEach(() => __awaiter(void 0, void 0, void 0, function* () {
        yield test_util_1.UserTest.create();
    }));
    afterEach(() => __awaiter(void 0, void 0, void 0, function* () {
        yield test_util_1.UserTest.delete();
    }));
    it("should reject upadete user if request is invalid", () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield (0, supertest_1.default)(web_1.web)
            .patch("/api/users/current")
            .set("X-API-TOKEN", "test")
            .send({
            password: "",
            name: "",
        });
        logging_1.logger.debug(response.body);
        expect(response.status).toBe(400);
        expect(response.body.errors).toBeDefined();
    }));
    it("should reject upadete user if token is wrong", () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield (0, supertest_1.default)(web_1.web)
            .patch("/api/users/current")
            .set("X-API-TOKEN", "salah")
            .send({
            password: "benar",
            name: "test benar",
        });
        logging_1.logger.debug(response.body);
        expect(response.status).toBe(401);
        expect(response.body.errors).toBeDefined();
    }));
    it("should be able to update name", () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield (0, supertest_1.default)(web_1.web)
            .patch("/api/users/current")
            .set("X-API-TOKEN", "test")
            .send({
            // password: "",
            name: "benar",
        });
        logging_1.logger.debug(response.body);
        expect(response.status).toBe(200);
        expect(response.body.data.name).toBe("benar");
    }));
    it("should be able to update password", () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield (0, supertest_1.default)(web_1.web)
            .patch("/api/users/current")
            .set("X-API-TOKEN", "test")
            .send({
            password: "benar",
            // name: "benar",
        });
        logging_1.logger.debug(response.body);
        expect(response.status).toBe(200);
        const user = yield test_util_1.UserTest.get();
        expect(yield bcrypt_1.default.compare("benar", user.password)).toBe(true);
    }));
});
describe("DELETE /api/user/current", () => {
    beforeEach(() => __awaiter(void 0, void 0, void 0, function* () {
        yield test_util_1.UserTest.create();
    }));
    afterEach(() => __awaiter(void 0, void 0, void 0, function* () {
        yield test_util_1.UserTest.delete();
    }));
    it("should be able to logout", () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield (0, supertest_1.default)(web_1.web)
            .delete("/api/users/current")
            .set("X-API-TOKEN", "test");
        logging_1.logger.debug(response.body);
        expect(response.status).toBe(200);
        expect(response.body.data).toBe("OK");
        const user = yield test_util_1.UserTest.get();
        expect(user.token).toBe(null);
    }));
    it("should reject logout user if token is wrong", () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield (0, supertest_1.default)(web_1.web)
            .delete("/api/users/current")
            .set("X-API-TOKEN", "salah");
        logging_1.logger.debug(response.body);
        expect(response.status).toBe(401);
        expect(response.body.errors).toBeDefined();
    }));
});
