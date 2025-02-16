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
Object.defineProperty(exports, "__esModule", { value: true });
exports.AddressService = void 0;
const address_model_1 = require("../model/address-model");
const validation_1 = require("../validation/validation");
const address_validation_1 = require("../validation/address-validation");
const contact_service_1 = require("./contact-service");
const database_1 = require("../application/database");
const response_error_1 = require("../error/response-error");
const logging_1 = require("../application/logging");
class AddressService {
    static create(user, request) {
        return __awaiter(this, void 0, void 0, function* () {
            const createRequest = validation_1.Validation.validate(address_validation_1.AddressValidation.CREATE, request);
            yield contact_service_1.ContactService.checkContactMustExist(user.username, request.contact_id);
            const address = yield database_1.prismaClient.address.create({
                data: createRequest,
            });
            return (0, address_model_1.toAddressResponse)(address);
        });
    }
    static checkAddressMustExist(contactId, addressId) {
        return __awaiter(this, void 0, void 0, function* () {
            const address = yield database_1.prismaClient.address.findFirst({
                where: {
                    id: addressId,
                    contact_id: contactId,
                },
            });
            if (!address)
                throw new response_error_1.ResponseError(404, "Address not found");
            return address;
        });
    }
    static get(user, request) {
        return __awaiter(this, void 0, void 0, function* () {
            const getRequest = validation_1.Validation.validate(address_validation_1.AddressValidation.GET, request);
            yield contact_service_1.ContactService.checkContactMustExist(user.username, request.contact_id);
            const address = yield this.checkAddressMustExist(request.contact_id, request.id);
            return (0, address_model_1.toAddressResponse)(address);
        });
    }
    static update(user, request) {
        return __awaiter(this, void 0, void 0, function* () {
            const updateRequest = validation_1.Validation.validate(address_validation_1.AddressValidation.UPDATE, request);
            logging_1.logger.info(updateRequest);
            yield contact_service_1.ContactService.checkContactMustExist(user.username, request.contact_id);
            yield this.checkAddressMustExist(updateRequest.contact_id, updateRequest.id);
            const address = yield database_1.prismaClient.address.update({
                where: {
                    id: updateRequest.id,
                    contact_id: updateRequest.contact_id,
                },
                data: updateRequest,
            });
            return (0, address_model_1.toAddressResponse)(address);
        });
    }
    static remove(user, request) {
        return __awaiter(this, void 0, void 0, function* () {
            const removeRequest = validation_1.Validation.validate(address_validation_1.AddressValidation.REMOVE, request);
            yield contact_service_1.ContactService.checkContactMustExist(user.username, removeRequest.contact_id);
            yield this.checkAddressMustExist(removeRequest.contact_id, removeRequest.id);
            const address = yield database_1.prismaClient.address.delete({
                where: {
                    id: removeRequest.id,
                    contact_id: removeRequest.contact_id,
                },
            });
            return (0, address_model_1.toAddressResponse)(address);
        });
    }
    static list(user, contactId) {
        return __awaiter(this, void 0, void 0, function* () {
            yield contact_service_1.ContactService.checkContactMustExist(user.username, contactId);
            const addresses = yield database_1.prismaClient.address.findMany({
                where: {
                    contact_id: contactId,
                },
            });
            return addresses.map((address) => (0, address_model_1.toAddressResponse)(address));
        });
    }
}
exports.AddressService = AddressService;
