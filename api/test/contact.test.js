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
const test_util_1 = require("./test-util");
const logging_1 = require("../application/logging");
const web_1 = require("../application/web");
describe("POST /api/contacts", () => {
    beforeEach(() => __awaiter(void 0, void 0, void 0, function* () {
        yield test_util_1.UserTest.create();
    }));
    afterEach(() => __awaiter(void 0, void 0, void 0, function* () {
        yield test_util_1.ContactTest.deleteAll();
        yield test_util_1.UserTest.delete();
    }));
    it("should be able to create a contact", () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield (0, supertest_1.default)(web_1.web)
            .post("/api/contacts")
            .set("X-API-TOKEN", "test")
            .send({
            first_name: "test",
            last_name: "test",
            email: "test@example.com",
            phone: "1234567890",
        });
        logging_1.logger.debug(response.body);
        expect(response.status).toBe(200);
        expect(response.body.data.id).toBeDefined();
        expect(response.body.data.first_name).toBe("test");
        expect(response.body.data.last_name).toBe("test");
        expect(response.body.data.email).toBe("test@example.com");
        expect(response.body.data.phone).toBe("1234567890");
    }));
    it("should reject create new contact if data is invalid", () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield (0, supertest_1.default)(web_1.web)
            .post("/api/contacts")
            .set("X-API-TOKEN", "test")
            .send({
            first_name: "",
            last_name: "",
            email: "test",
            phone: "193735198981357000000000098739817519",
        });
        logging_1.logger.debug(response.body);
        expect(response.status).toBe(400);
        expect(response.body.errors).toBeDefined();
    }));
});
describe("GET /api/contact/:contactId", () => {
    beforeEach(() => __awaiter(void 0, void 0, void 0, function* () {
        yield test_util_1.UserTest.create();
        yield test_util_1.ContactTest.create();
    }));
    afterEach(() => __awaiter(void 0, void 0, void 0, function* () {
        yield test_util_1.ContactTest.deleteAll();
        yield test_util_1.UserTest.delete();
    }));
    it("should be able to get contact", () => __awaiter(void 0, void 0, void 0, function* () {
        const contact = yield test_util_1.ContactTest.get();
        const response = yield (0, supertest_1.default)(web_1.web)
            .get(`/api/contacts/${contact.id}`)
            .set("X-API-TOKEN", "test");
        logging_1.logger.debug(response.body);
        expect(response.status).toBe(200);
        expect(response.body.data.id).toBeDefined();
        expect(response.body.data.first_name).toBe(contact.first_name);
        expect(response.body.data.last_name).toBe(contact.last_name);
        expect(response.body.data.email).toBe(contact.email);
        expect(response.body.data.phone).toBe(contact.phone);
    }));
    it("should reject get contact if contact is not found", () => __awaiter(void 0, void 0, void 0, function* () {
        const contact = yield test_util_1.ContactTest.get();
        const response = yield (0, supertest_1.default)(web_1.web)
            .get(`/api/contacts/${contact.id + 1}`)
            .set("X-API-TOKEN", "test");
        logging_1.logger.debug(response.body);
        expect(response.status).toBe(404);
        expect(response.body.errors).toBeDefined();
    }));
});
describe("PUT /api/contacts/:contactId", () => {
    beforeEach(() => __awaiter(void 0, void 0, void 0, function* () {
        yield test_util_1.UserTest.create();
        yield test_util_1.ContactTest.create();
    }));
    afterEach(() => __awaiter(void 0, void 0, void 0, function* () {
        yield test_util_1.ContactTest.deleteAll();
        yield test_util_1.UserTest.delete();
    }));
    it("should be able to update contact", () => __awaiter(void 0, void 0, void 0, function* () {
        const contact = yield test_util_1.ContactTest.get();
        const response = yield (0, supertest_1.default)(web_1.web)
            .put(`/api/contacts/${contact.id}`)
            .set("X-API-TOKEN", "test")
            .send({
            first_name: "Nidzam",
            last_name: "Musthafa",
            email: "updated@example.com",
            phone: "98273605132",
        });
        logging_1.logger.debug(response.body);
        expect(response.status).toBe(200);
        expect(response.body.data.id).toBe(contact.id);
        expect(response.body.data.first_name).toBe("Nidzam");
        expect(response.body.data.last_name).toBe("Musthafa");
        expect(response.body.data.email).toBe("updated@example.com");
        expect(response.body.data.phone).toBe("98273605132");
    }));
    it("should reject update contact if data is invalid", () => __awaiter(void 0, void 0, void 0, function* () {
        const contact = yield test_util_1.ContactTest.get();
        const response = yield (0, supertest_1.default)(web_1.web)
            .put(`/api/contacts/${contact.id}`)
            .set("X-API-TOKEN", "test")
            .send({
            first_name: "",
            last_name: "",
            email: "test",
            phone: "193735198981357000000000098739817519",
        });
        logging_1.logger.debug(response.body);
        expect(response.status).toBe(400);
        expect(response.body.errors).toBeDefined();
    }));
});
describe("DELETE /api/contacts/:contactId", () => {
    beforeEach(() => __awaiter(void 0, void 0, void 0, function* () {
        yield test_util_1.UserTest.create();
        yield test_util_1.ContactTest.create();
    }));
    afterEach(() => __awaiter(void 0, void 0, void 0, function* () {
        yield test_util_1.ContactTest.deleteAll();
        yield test_util_1.UserTest.delete();
    }));
    it("should be able to delete contact", () => __awaiter(void 0, void 0, void 0, function* () {
        const contact = yield test_util_1.ContactTest.get();
        const response = yield (0, supertest_1.default)(web_1.web)
            .delete(`/api/contacts/${contact.id}`)
            .set("X-API-TOKEN", "test");
        logging_1.logger.debug(response.body);
        expect(response.status).toBe(200);
        expect(response.body.data).toBe("OK");
    }));
    it("should reject delete contact if contact is not found", () => __awaiter(void 0, void 0, void 0, function* () {
        const contact = yield test_util_1.ContactTest.get();
        const response = yield (0, supertest_1.default)(web_1.web)
            .delete(`/api/contacts/${contact.id + 1}`)
            .set("X-API-TOKEN", "test");
        logging_1.logger.debug(response.body);
        expect(response.status).toBe(404);
        expect(response.body.errors).toBeDefined();
    }));
});
describe("GET /api/contacts", () => {
    beforeEach(() => __awaiter(void 0, void 0, void 0, function* () {
        yield test_util_1.UserTest.create();
        yield test_util_1.ContactTest.create();
    }));
    afterEach(() => __awaiter(void 0, void 0, void 0, function* () {
        yield test_util_1.ContactTest.deleteAll();
        yield test_util_1.UserTest.delete();
    }));
    it("should be able to search contacts", () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield (0, supertest_1.default)(web_1.web)
            .get("/api/contacts")
            .set("X-API-TOKEN", "test");
        logging_1.logger.debug(response.body);
        expect(response.status).toBe(200);
        expect(response.body.data.length).toBe(1);
        expect(response.body.paging.current_page).toBe(1);
        expect(response.body.paging.total_pages).toBe(1);
        expect(response.body.paging.size).toBe(10);
    }));
    it("should be able to filter contacts by name", () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield (0, supertest_1.default)(web_1.web)
            .get("/api/contacts?name=es")
            .set("X-API-TOKEN", "test");
        // .query({
        //   name: "test",
        // })
        logging_1.logger.debug(response.body);
        expect(response.status).toBe(200);
        expect(response.body.data.length).toBe(1);
        expect(response.body.data[0].first_name).toBe("test");
        expect(response.body.data[0].last_name).toBe("test");
        expect(response.body.paging.current_page).toBe(1);
        expect(response.body.paging.total_pages).toBe(1);
        expect(response.body.paging.size).toBe(10);
    }));
    it("should be able to filter contacts by email", () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield (0, supertest_1.default)(web_1.web)
            .get("/api/contacts?email=example.com")
            .set("X-API-TOKEN", "test");
        // .query({
        //   email: "test@example.com",
        // })
        logging_1.logger.debug(response.body);
        expect(response.status).toBe(200);
        expect(response.body.data.length).toBe(1);
        expect(response.body.data[0].email).toBe("test@example.com");
        expect(response.body.paging.current_page).toBe(1);
        expect(response.body.paging.total_pages).toBe(1);
        expect(response.body.paging.size).toBe(10);
    }));
    it("should be able to filter contacts by phone", () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield (0, supertest_1.default)(web_1.web)
            .get("/api/contacts?phone=3727")
            .set("X-API-TOKEN", "test");
        // .query({
        //   phone: "3727",
        // })
        logging_1.logger.debug(response.body);
        expect(response.status).toBe(200);
        expect(response.body.data.length).toBe(1);
        expect(response.body.data[0].phone).toBe("01283727");
        expect(response.body.paging.current_page).toBe(1);
        expect(response.body.paging.total_pages).toBe(1);
        expect(response.body.paging.size).toBe(10);
    }));
    it("should be able to search contact no result", () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield (0, supertest_1.default)(web_1.web)
            .get("/api/contacts?name=nonexistent")
            .set("X-API-TOKEN", "test");
        logging_1.logger.debug(response.body);
        expect(response.status).toBe(200);
        expect(response.body.data.length).toBe(0);
        expect(response.body.paging.current_page).toBe(1);
        expect(response.body.paging.total_pages).toBe(0);
        expect(response.body.paging.size).toBe(10);
    }));
    it("should be able to paginate contacts", () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield (0, supertest_1.default)(web_1.web)
            .get("/api/contacts?page=2&size=10")
            .set("X-API-TOKEN", "test");
        logging_1.logger.debug(response.body);
        expect(response.status).toBe(200);
        expect(response.body.data.length).toBe(0);
        expect(response.body.paging.current_page).toBe(2);
        expect(response.body.paging.total_pages).toBe(1);
        expect(response.body.paging.size).toBe(10);
    }));
});
