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
exports.AddressTest = exports.ContactTest = exports.UserTest = void 0;
const database_1 = require("../application/database");
const bcrypt_1 = __importDefault(require("bcrypt"));
class UserTest {
    static delete() {
        return __awaiter(this, void 0, void 0, function* () {
            yield database_1.prismaClient.user.deleteMany({
                where: {
                    username: "test",
                },
            });
        });
    }
    static create() {
        return __awaiter(this, void 0, void 0, function* () {
            yield database_1.prismaClient.user.create({
                data: {
                    username: "test",
                    name: "test",
                    password: yield bcrypt_1.default.hash("test", 10),
                    token: "test",
                },
            });
        });
    }
    static get() {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield database_1.prismaClient.user.findFirst({
                where: {
                    username: "test",
                },
            });
            if (!user) {
                throw new Error("User not found");
            }
            return user;
        });
    }
}
exports.UserTest = UserTest;
class ContactTest {
    static deleteAll() {
        return __awaiter(this, void 0, void 0, function* () {
            yield database_1.prismaClient.contact.deleteMany({
                where: {
                    user: {
                        username: "test",
                    },
                },
            });
        });
    }
    static create() {
        return __awaiter(this, void 0, void 0, function* () {
            yield database_1.prismaClient.contact.create({
                data: {
                    first_name: "test",
                    last_name: "test",
                    email: "test@example.com",
                    phone: "01283727",
                    username: "test",
                },
            });
        });
    }
    static get() {
        return __awaiter(this, void 0, void 0, function* () {
            const contact = yield database_1.prismaClient.contact.findFirst({
                where: {
                    username: "test",
                },
            });
            if (!contact) {
                throw new Error("Contact not found");
            }
            return contact;
        });
    }
}
exports.ContactTest = ContactTest;
class AddressTest {
    static deleteAll() {
        return __awaiter(this, void 0, void 0, function* () {
            yield database_1.prismaClient.address.deleteMany({
                where: {
                    contact: {
                        username: "test",
                    },
                },
            });
        });
    }
    static create() {
        return __awaiter(this, void 0, void 0, function* () {
            const contact = yield ContactTest.get();
            yield database_1.prismaClient.address.create({
                data: {
                    street: "test",
                    city: "test",
                    province: "test",
                    country: "test",
                    postal_code: "12345",
                    contact_id: contact.id,
                },
            });
        });
    }
    static get() {
        return __awaiter(this, void 0, void 0, function* () {
            const address = yield database_1.prismaClient.address.findFirst({
                where: {
                    contact: {
                        username: "test",
                    },
                },
            });
            if (!address) {
                throw new Error("Address not found");
            }
            return address;
        });
    }
}
exports.AddressTest = AddressTest;
