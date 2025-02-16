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
const web_1 = require("../application/web");
const logging_1 = require("../application/logging");
describe("POST /api/contacts/:contactsId/addresses", () => {
    beforeEach(() => __awaiter(void 0, void 0, void 0, function* () {
        yield test_util_1.UserTest.create();
        yield test_util_1.ContactTest.create();
    }));
    afterEach(() => __awaiter(void 0, void 0, void 0, function* () {
        yield test_util_1.AddressTest.deleteAll();
        yield test_util_1.ContactTest.deleteAll();
        yield test_util_1.UserTest.delete();
    }));
    it("should be able to create a new address", () => __awaiter(void 0, void 0, void 0, function* () {
        const contact = yield test_util_1.ContactTest.get();
        const response = yield (0, supertest_1.default)(web_1.web)
            .post(`/api/contacts/${contact.id}/addresses`)
            .set("X-API-TOKEN", "test")
            .send({
            street: "Cendana III",
            city: "Bandung",
            province: "Jawa Barat",
            country: "Indonesia",
            postal_code: "40215",
        });
        console.log(response.body);
        logging_1.logger.debug(response.body);
        expect(response.status).toBe(200);
        expect(response.body.data.id).toBeDefined();
        expect(response.body.data.street).toBe("Cendana III");
        expect(response.body.data.city).toBe("Bandung");
        expect(response.body.data.province).toBe("Jawa Barat");
        expect(response.body.data.country).toBe("Indonesia");
        expect(response.body.data.postal_code).toBe("40215");
    }));
    it("should reject create new address if data is invalid", () => __awaiter(void 0, void 0, void 0, function* () {
        const contact = yield test_util_1.ContactTest.get();
        const response = yield (0, supertest_1.default)(web_1.web)
            .post(`/api/contacts/${contact.id}/addresses`)
            .set("X-API-TOKEN", "test")
            .send({
            street: "",
            city: "",
            province: "",
            country: "",
            postal_code: "",
        });
        logging_1.logger.debug(response.body);
        expect(response.status).toBe(400);
        expect(response.body.errors).toBeDefined();
    }));
    it("should reject create new address if contact is not found", () => __awaiter(void 0, void 0, void 0, function* () {
        const contact = yield test_util_1.ContactTest.get();
        const response = yield (0, supertest_1.default)(web_1.web)
            .post(`/api/contacts/${contact.id + 1}/addresses`)
            .set("X-API-TOKEN", "test")
            .send({
            street: "Cendana III",
            city: "Bandung",
            province: "Jawa Barat",
            country: "Indonesia",
            postal_code: "40215",
        });
        logging_1.logger.debug(response.body);
        expect(response.status).toBe(404);
        expect(response.body.errors).toBeDefined();
    }));
});
describe("GET /api/contacts/:contactId/addresses/:contactId", () => {
    beforeEach(() => __awaiter(void 0, void 0, void 0, function* () {
        yield test_util_1.UserTest.create();
        yield test_util_1.ContactTest.create();
        yield test_util_1.AddressTest.create();
    }));
    afterEach(() => __awaiter(void 0, void 0, void 0, function* () {
        yield test_util_1.AddressTest.deleteAll();
        yield test_util_1.ContactTest.deleteAll();
        yield test_util_1.UserTest.delete();
    }));
    it("should be able to get address by contactId", () => __awaiter(void 0, void 0, void 0, function* () {
        const contact = yield test_util_1.ContactTest.get();
        const address = yield test_util_1.AddressTest.get();
        const response = yield (0, supertest_1.default)(web_1.web)
            .get(`/api/contacts/${contact.id}/addresses/${address.id}`)
            .set("X-API-TOKEN", "test");
        logging_1.logger.debug(response.body);
        expect(response.status).toBe(200);
        expect(response.body.data.id).toBeDefined();
        expect(response.body.data.street).toBe("test");
        expect(response.body.data.city).toBe("test");
        expect(response.body.data.province).toBe("test");
        expect(response.body.data.country).toBe("test");
        expect(response.body.data.postal_code).toBe("12345");
    }));
    it("should reject get address if contactId is not found", () => __awaiter(void 0, void 0, void 0, function* () {
        const address = yield test_util_1.AddressTest.get();
        const contact = yield test_util_1.ContactTest.get();
        const response = yield (0, supertest_1.default)(web_1.web)
            .get(`/api/contacts/${contact.id + 1}/addresses/${address.id}`)
            .set("X-API-TOKEN", "test");
        logging_1.logger.debug(response.body);
        expect(response.status).toBe(404);
        expect(response.body.errors).toBeDefined();
    }));
    it("should reject get address if addressId is not found", () => __awaiter(void 0, void 0, void 0, function* () {
        const address = yield test_util_1.AddressTest.get();
        const contact = yield test_util_1.ContactTest.get();
        const response = yield (0, supertest_1.default)(web_1.web)
            .get(`/api/contacts/${contact.id}/addresses/${address.id + 1}`)
            .set("X-API-TOKEN", "test");
        logging_1.logger.debug(response.body);
        expect(response.status).toBe(404);
        expect(response.body.errors).toBeDefined();
    }));
});
describe("PUT /api/contacts/:contactId/addresses/:addressId", () => {
    beforeEach(() => __awaiter(void 0, void 0, void 0, function* () {
        yield test_util_1.UserTest.create();
        yield test_util_1.ContactTest.create();
        yield test_util_1.AddressTest.create();
    }));
    afterEach(() => __awaiter(void 0, void 0, void 0, function* () {
        yield test_util_1.AddressTest.deleteAll();
        yield test_util_1.ContactTest.deleteAll();
        yield test_util_1.UserTest.delete();
    }));
    it("should be able to update address by addressId", () => __awaiter(void 0, void 0, void 0, function* () {
        const contact = yield test_util_1.ContactTest.get();
        const address = yield test_util_1.AddressTest.get();
        const response = yield (0, supertest_1.default)(web_1.web)
            .put(`/api/contacts/${contact.id}/addresses/${address.id}`)
            .set("X-API-TOKEN", "test")
            .send({
            street: "Updated Street",
            city: "Updated City",
            province: "Updated Province",
            country: "Updated Country",
            postal_code: "54321",
        });
        logging_1.logger.debug(response.body);
        expect(response.status).toBe(200);
        expect(response.body.data.id).toBe(address.id);
        expect(response.body.data.street).toBe("Updated Street");
        expect(response.body.data.city).toBe("Updated City");
        expect(response.body.data.province).toBe("Updated Province");
        expect(response.body.data.country).toBe("Updated Country");
        expect(response.body.data.postal_code).toBe("54321");
    }));
    it("should reject update address if data is invalid", () => __awaiter(void 0, void 0, void 0, function* () {
        const contact = yield test_util_1.ContactTest.get();
        const address = yield test_util_1.AddressTest.get();
        const response = yield (0, supertest_1.default)(web_1.web)
            .put(`/api/contacts/${contact.id + 1}/addresses/${address.id}`)
            .set("X-API-TOKEN", "test")
            .send({
            street: "Updated Street",
            city: "Updated City",
            province: "Updated Province",
            country: "Updated Country",
            postal_code: "",
        });
        logging_1.logger.debug(response.body);
        expect(response.status).toBe(400);
        expect(response.body.errors).toBeDefined();
    }));
    it("should reject update address if contactId is not found", () => __awaiter(void 0, void 0, void 0, function* () {
        const contact = yield test_util_1.ContactTest.get();
        const address = yield test_util_1.AddressTest.get();
        const response = yield (0, supertest_1.default)(web_1.web)
            .put(`/api/contacts/${contact.id + 1}/addresses/${address.id}`)
            .set("X-API-TOKEN", "test")
            .send({
            street: "Updated Street",
            city: "Updated City",
            province: "Updated Province",
            country: "Updated Country",
            postal_code: "12345",
        });
        logging_1.logger.debug(response.body);
        expect(response.status).toBe(404);
        expect(response.body.errors).toBeDefined();
    }));
    it("should reject update address if addressId is not found", () => __awaiter(void 0, void 0, void 0, function* () {
        const contact = yield test_util_1.ContactTest.get();
        const address = yield test_util_1.AddressTest.get();
        const response = yield (0, supertest_1.default)(web_1.web)
            .put(`/api/contacts/${contact.id}/addresses/${address.id + 1}`)
            .set("X-API-TOKEN", "test")
            .send({
            street: "Updated Street",
            city: "Updated City",
            province: "Updated Province",
            country: "Updated Country",
            postal_code: "12345",
        });
        logging_1.logger.debug(response.body);
        expect(response.status).toBe(404);
        expect(response.body.errors).toBeDefined();
    }));
});
describe("DELETE /api/contacts/:contactId/addresses/:addressId", () => {
    beforeEach(() => __awaiter(void 0, void 0, void 0, function* () {
        yield test_util_1.UserTest.create();
        yield test_util_1.ContactTest.create();
        yield test_util_1.AddressTest.create();
    }));
    afterEach(() => __awaiter(void 0, void 0, void 0, function* () {
        yield test_util_1.AddressTest.deleteAll();
        yield test_util_1.ContactTest.deleteAll();
        yield test_util_1.UserTest.delete();
    }));
    it("should be able to remove address by addressId", () => __awaiter(void 0, void 0, void 0, function* () {
        const contact = yield test_util_1.ContactTest.get();
        const address = yield test_util_1.AddressTest.get();
        const response = yield (0, supertest_1.default)(web_1.web)
            .delete(`/api/contacts/${contact.id}/addresses/${address.id}`)
            .set("X-API-TOKEN", "test");
        logging_1.logger.debug(response.body);
        expect(response.status).toBe(204);
    }));
    it("should reject remove address if contactId is not found", () => __awaiter(void 0, void 0, void 0, function* () {
        const contact = yield test_util_1.ContactTest.get();
        const address = yield test_util_1.AddressTest.get();
        const response = yield (0, supertest_1.default)(web_1.web)
            .delete(`/api/contacts/${contact.id + 1}/addresses/${address.id}`)
            .set("X-API-TOKEN", "test");
        logging_1.logger.debug(response.body);
        expect(response.status).toBe(404);
        expect(response.body.errors).toBeDefined();
    }));
    it("should reject remove address if addressId is not found", () => __awaiter(void 0, void 0, void 0, function* () {
        const contact = yield test_util_1.ContactTest.get();
        const address = yield test_util_1.AddressTest.get();
        const response = yield (0, supertest_1.default)(web_1.web)
            .delete(`/api/contacts/${contact.id}/addresses/${address.id + 1}`)
            .set("X-API-TOKEN", "test");
        logging_1.logger.debug(response.body);
        expect(response.status).toBe(404);
        expect(response.body.errors).toBeDefined();
    }));
});
describe("GET /api/contacts/:contactId/addresses", () => {
    beforeEach(() => __awaiter(void 0, void 0, void 0, function* () {
        yield test_util_1.UserTest.create();
        yield test_util_1.ContactTest.create();
        yield test_util_1.AddressTest.create();
    }));
    afterEach(() => __awaiter(void 0, void 0, void 0, function* () {
        yield test_util_1.AddressTest.deleteAll();
        yield test_util_1.ContactTest.deleteAll();
        yield test_util_1.UserTest.delete();
    }));
    it("should be able to list addresses", () => __awaiter(void 0, void 0, void 0, function* () {
        const contact = yield test_util_1.ContactTest.get();
        const response = yield (0, supertest_1.default)(web_1.web)
            .get(`/api/contacts/${contact.id}/addresses`)
            .set("X-API-TOKEN", "test");
        logging_1.logger.debug(response.body);
        expect(response.status).toBe(200);
        expect(response.body.data.length).toBe(1);
    }));
    it("should reject list address if contact is not found", () => __awaiter(void 0, void 0, void 0, function* () {
        const contact = yield test_util_1.ContactTest.get();
        const response = yield (0, supertest_1.default)(web_1.web)
            .get(`/api/contacts/${contact.id + 1}/addresses`)
            .set("X-API-TOKEN", "test");
        logging_1.logger.debug(response.body);
        expect(response.status).toBe(404);
        expect(response.body.errors).toBeDefined();
    }));
});
