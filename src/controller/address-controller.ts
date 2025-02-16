// import { NextFunction, Response } from "express";
// import { UserRequest } from "../type/user-request";
// import {
//   CreateAddressRequest,
//   UpdateAddressRequest,
// } from "../model/address-model";
// import { AddressService } from "../service/address-service";

// export class AddressController {
//   static async create(req: UserRequest, res: Response, next: NextFunction) {
//     try {
//       const request: CreateAddressRequest = req.body as CreateAddressRequest;
//       request.contact_id = Number(req.params.contactId);

//       const response = await AddressService.create(req.user!, request);
//       res.status(200).json({
//         data: response,
//       });
//     } catch (error) {
//       next(error);
//     }
//   }

//   static async get(req: UserRequest, res: Response, next: NextFunction) {
//     try {
//       const contactId = Number(req.params.contactId);
//       const addressId = Number(req.params.addressId);

//       const response = await AddressService.get(req.user!, {
//         contact_id: contactId,
//         id: addressId,
//       });

//       res.status(200).json({
//         data: response,
//       });
//     } catch (error) {
//       next(error);
//     }
//   }

//   static async update(req: UserRequest, res: Response, next: NextFunction) {
//     try {
//       const request: UpdateAddressRequest = req.body as UpdateAddressRequest;
//       request.contact_id = Number(req.params.contactId);
//       request.id = Number(req.params.addressId);

//       const response = await AddressService.update(req.user!, request);
//       res.status(200).json({
//         data: response,
//       });
//     } catch (error) {
//       next(error);
//     }
//   }

//   static async remove(
//     req: UserRequest,
//     res: Response,
//     next: NextFunction
//   ): Promise<void> {
//     try {
//       const contactId = Number(req.params.contactId);
//       const addressId = Number(req.params.addressId);

//       await AddressService.remove(req.user!, {
//         contact_id: contactId,
//         id: addressId,
//       });

//       res.status(204).json({
//         data: "OK",
//       });
//     } catch (error) {
//       next(error);
//     }
//   }

//   static async list(req: UserRequest, res: Response, next: NextFunction) {
//     try {
//       const contactId = Number(req.params.contactId);

//       const response = await AddressService.list(req.user!, contactId);

//       res.status(200).json({
//         data: response,
//       });
//     } catch (error) {
//       next(error);
//     }
//   }
// }
