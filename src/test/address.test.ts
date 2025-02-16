import supertest from "supertest";
import { AddressTest, ContactTest, UserTest } from "./test-util";
import { web } from "../application/web";
import { logger } from "../application/logging";

describe("POST /api/contacts/:contactsId/addresses", () => {
  beforeEach(async () => {
    await UserTest.create();
    await ContactTest.create();
  });

  afterEach(async () => {
    await AddressTest.deleteAll();
    await ContactTest.deleteAll();
    await UserTest.delete();
  });

  it("should be able to create a new address", async () => {
    const contact = await ContactTest.get();
    const response = await supertest(web)
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
    logger.debug(response.body);

    expect(response.status).toBe(200);
    expect(response.body.data.id).toBeDefined();
    expect(response.body.data.street).toBe("Cendana III");
    expect(response.body.data.city).toBe("Bandung");
    expect(response.body.data.province).toBe("Jawa Barat");
    expect(response.body.data.country).toBe("Indonesia");
    expect(response.body.data.postal_code).toBe("40215");
  });

  it("should reject create new address if data is invalid", async () => {
    const contact = await ContactTest.get();
    const response = await supertest(web)
      .post(`/api/contacts/${contact.id}/addresses`)
      .set("X-API-TOKEN", "test")
      .send({
        street: "",
        city: "",
        province: "",
        country: "",
        postal_code: "",
      });

    logger.debug(response.body);

    expect(response.status).toBe(400);
    expect(response.body.errors).toBeDefined();
  });

  it("should reject create new address if contact is not found", async () => {
    const contact = await ContactTest.get();
    const response = await supertest(web)
      .post(`/api/contacts/${contact.id + 1}/addresses`)
      .set("X-API-TOKEN", "test")
      .send({
        street: "Cendana III",
        city: "Bandung",
        province: "Jawa Barat",
        country: "Indonesia",
        postal_code: "40215",
      });

    logger.debug(response.body);

    expect(response.status).toBe(404);
    expect(response.body.errors).toBeDefined();
  });
});

describe("GET /api/contacts/:contactId/addresses/:contactId", () => {
  beforeEach(async () => {
    await UserTest.create();
    await ContactTest.create();
    await AddressTest.create();
  });

  afterEach(async () => {
    await AddressTest.deleteAll();
    await ContactTest.deleteAll();
    await UserTest.delete();
  });

  it("should be able to get address by contactId", async () => {
    const contact = await ContactTest.get();
    const address = await AddressTest.get();

    const response = await supertest(web)
      .get(`/api/contacts/${contact.id}/addresses/${address.id}`)
      .set("X-API-TOKEN", "test");

    logger.debug(response.body);

    expect(response.status).toBe(200);
    expect(response.body.data.id).toBeDefined();
    expect(response.body.data.street).toBe("test");
    expect(response.body.data.city).toBe("test");
    expect(response.body.data.province).toBe("test");
    expect(response.body.data.country).toBe("test");
    expect(response.body.data.postal_code).toBe("12345");
  });

  it("should reject get address if contactId is not found", async () => {
    const address = await AddressTest.get();
    const contact = await ContactTest.get();
    const response = await supertest(web)
      .get(`/api/contacts/${contact.id + 1}/addresses/${address.id}`)
      .set("X-API-TOKEN", "test");

    logger.debug(response.body);

    expect(response.status).toBe(404);
    expect(response.body.errors).toBeDefined();
  });

  it("should reject get address if addressId is not found", async () => {
    const address = await AddressTest.get();
    const contact = await ContactTest.get();
    const response = await supertest(web)
      .get(`/api/contacts/${contact.id}/addresses/${address.id + 1}`)
      .set("X-API-TOKEN", "test");

    logger.debug(response.body);

    expect(response.status).toBe(404);
    expect(response.body.errors).toBeDefined();
  });
});

describe("PUT /api/contacts/:contactId/addresses/:addressId", () => {
  beforeEach(async () => {
    await UserTest.create();
    await ContactTest.create();
    await AddressTest.create();
  });

  afterEach(async () => {
    await AddressTest.deleteAll();
    await ContactTest.deleteAll();
    await UserTest.delete();
  });

  it("should be able to update address by addressId", async () => {
    const contact = await ContactTest.get();
    const address = await AddressTest.get();
    const response = await supertest(web)
      .put(`/api/contacts/${contact.id}/addresses/${address.id}`)
      .set("X-API-TOKEN", "test")
      .send({
        street: "Updated Street",
        city: "Updated City",
        province: "Updated Province",
        country: "Updated Country",
        postal_code: "54321",
      });

    logger.debug(response.body);

    expect(response.status).toBe(200);
    expect(response.body.data.id).toBe(address.id);
    expect(response.body.data.street).toBe("Updated Street");
    expect(response.body.data.city).toBe("Updated City");
    expect(response.body.data.province).toBe("Updated Province");
    expect(response.body.data.country).toBe("Updated Country");
    expect(response.body.data.postal_code).toBe("54321");
  });

  it("should reject update address if data is invalid", async () => {
    const contact = await ContactTest.get();
    const address = await AddressTest.get();
    const response = await supertest(web)
      .put(`/api/contacts/${contact.id + 1}/addresses/${address.id}`)
      .set("X-API-TOKEN", "test")
      .send({
        street: "Updated Street",
        city: "Updated City",
        province: "Updated Province",
        country: "Updated Country",
        postal_code: "",
      });

    logger.debug(response.body);

    expect(response.status).toBe(400);
    expect(response.body.errors).toBeDefined();
  });

  it("should reject update address if contactId is not found", async () => {
    const contact = await ContactTest.get();
    const address = await AddressTest.get();
    const response = await supertest(web)
      .put(`/api/contacts/${contact.id + 1}/addresses/${address.id}`)
      .set("X-API-TOKEN", "test")
      .send({
        street: "Updated Street",
        city: "Updated City",
        province: "Updated Province",
        country: "Updated Country",
        postal_code: "12345",
      });

    logger.debug(response.body);

    expect(response.status).toBe(404);
    expect(response.body.errors).toBeDefined();
  });

  it("should reject update address if addressId is not found", async () => {
    const contact = await ContactTest.get();
    const address = await AddressTest.get();
    const response = await supertest(web)
      .put(`/api/contacts/${contact.id}/addresses/${address.id + 1}`)
      .set("X-API-TOKEN", "test")
      .send({
        street: "Updated Street",
        city: "Updated City",
        province: "Updated Province",
        country: "Updated Country",
        postal_code: "12345",
      });

    logger.debug(response.body);

    expect(response.status).toBe(404);
    expect(response.body.errors).toBeDefined();
  });
});

describe("DELETE /api/contacts/:contactId/addresses/:addressId", () => {
  beforeEach(async () => {
    await UserTest.create();
    await ContactTest.create();
    await AddressTest.create();
  });

  afterEach(async () => {
    await AddressTest.deleteAll();
    await ContactTest.deleteAll();
    await UserTest.delete();
  });

  it("should be able to remove address by addressId", async () => {
    const contact = await ContactTest.get();
    const address = await AddressTest.get();
    const response = await supertest(web)
      .delete(`/api/contacts/${contact.id}/addresses/${address.id}`)
      .set("X-API-TOKEN", "test");

    logger.debug(response.body);

    expect(response.status).toBe(204);
  });

  it("should reject remove address if contactId is not found", async () => {
    const contact = await ContactTest.get();
    const address = await AddressTest.get();
    const response = await supertest(web)
      .delete(`/api/contacts/${contact.id + 1}/addresses/${address.id}`)
      .set("X-API-TOKEN", "test");

    logger.debug(response.body);

    expect(response.status).toBe(404);
    expect(response.body.errors).toBeDefined();
  });

  it("should reject remove address if addressId is not found", async () => {
    const contact = await ContactTest.get();
    const address = await AddressTest.get();
    const response = await supertest(web)
      .delete(`/api/contacts/${contact.id}/addresses/${address.id + 1}`)
      .set("X-API-TOKEN", "test");

    logger.debug(response.body);

    expect(response.status).toBe(404);
    expect(response.body.errors).toBeDefined();
  });
});

describe("GET /api/contacts/:contactId/addresses", () => {
  beforeEach(async () => {
    await UserTest.create();
    await ContactTest.create();
    await AddressTest.create();
  });

  afterEach(async () => {
    await AddressTest.deleteAll();
    await ContactTest.deleteAll();
    await UserTest.delete();
  });

  it("should be able to list addresses", async () => {
    const contact = await ContactTest.get();
    const response = await supertest(web)
      .get(`/api/contacts/${contact.id}/addresses`)
      .set("X-API-TOKEN", "test");

    logger.debug(response.body);
    expect(response.status).toBe(200);
    expect(response.body.data.length).toBe(1);
  });

  it("should reject list address if contact is not found", async () => {
    const contact = await ContactTest.get();

    const response = await supertest(web)
      .get(`/api/contacts/${contact.id + 1}/addresses`)
      .set("X-API-TOKEN", "test");

    logger.debug(response.body);
    expect(response.status).toBe(404);
    expect(response.body.errors).toBeDefined();
  });
});
