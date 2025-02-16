import supertest from "supertest";
import { ContactTest, UserTest } from "./test-util";
import { logger } from "../application/logging";
import { web } from "../application/web";

describe("POST /api/contacts", () => {
  beforeEach(async () => {
    await UserTest.create();
  });

  afterEach(async () => {
    await ContactTest.deleteAll();
    await UserTest.delete();
  });

  it("should be able to create a contact", async () => {
    const response = await supertest(web)
      .post("/api/contacts")
      .set("X-API-TOKEN", "test")
      .send({
        first_name: "test",
        last_name: "test",
        email: "test@example.com",
        phone: "1234567890",
      });

    logger.debug(response.body);
    expect(response.status).toBe(200);
    expect(response.body.data.id).toBeDefined();
    expect(response.body.data.first_name).toBe("test");
    expect(response.body.data.last_name).toBe("test");
    expect(response.body.data.email).toBe("test@example.com");
    expect(response.body.data.phone).toBe("1234567890");
  });

  it("should reject create new contact if data is invalid", async () => {
    const response = await supertest(web)
      .post("/api/contacts")
      .set("X-API-TOKEN", "test")
      .send({
        first_name: "",
        last_name: "",
        email: "test",
        phone: "193735198981357000000000098739817519",
      });

    logger.debug(response.body);
    expect(response.status).toBe(400);
    expect(response.body.errors).toBeDefined();
  });
});

describe("GET /api/contact/:contactId", () => {
  beforeEach(async () => {
    await UserTest.create();
    await ContactTest.create();
  });

  afterEach(async () => {
    await ContactTest.deleteAll();
    await UserTest.delete();
  });

  it("should be able to get contact", async () => {
    const contact = await ContactTest.get();
    const response = await supertest(web)
      .get(`/api/contacts/${contact.id}`)
      .set("X-API-TOKEN", "test");

    logger.debug(response.body);

    expect(response.status).toBe(200);
    expect(response.body.data.id).toBeDefined();
    expect(response.body.data.first_name).toBe(contact.first_name);
    expect(response.body.data.last_name).toBe(contact.last_name);
    expect(response.body.data.email).toBe(contact.email);
    expect(response.body.data.phone).toBe(contact.phone);
  });

  it("should reject get contact if contact is not found", async () => {
    const contact = await ContactTest.get();
    const response = await supertest(web)
      .get(`/api/contacts/${contact.id + 1}`)
      .set("X-API-TOKEN", "test");

    logger.debug(response.body);

    expect(response.status).toBe(404);
    expect(response.body.errors).toBeDefined();
  });
});

describe("PUT /api/contacts/:contactId", () => {
  beforeEach(async () => {
    await UserTest.create();
    await ContactTest.create();
  });

  afterEach(async () => {
    await ContactTest.deleteAll();
    await UserTest.delete();
  });

  it("should be able to update contact", async () => {
    const contact = await ContactTest.get();
    const response = await supertest(web)
      .put(`/api/contacts/${contact.id}`)
      .set("X-API-TOKEN", "test")
      .send({
        first_name: "Nidzam",
        last_name: "Musthafa",
        email: "updated@example.com",
        phone: "98273605132",
      });

    logger.debug(response.body);

    expect(response.status).toBe(200);
    expect(response.body.data.id).toBe(contact.id);
    expect(response.body.data.first_name).toBe("Nidzam");
    expect(response.body.data.last_name).toBe("Musthafa");
    expect(response.body.data.email).toBe("updated@example.com");
    expect(response.body.data.phone).toBe("98273605132");
  });

  it("should reject update contact if data is invalid", async () => {
    const contact = await ContactTest.get();
    const response = await supertest(web)
      .put(`/api/contacts/${contact.id}`)
      .set("X-API-TOKEN", "test")
      .send({
        first_name: "",
        last_name: "",
        email: "test",
        phone: "193735198981357000000000098739817519",
      });

    logger.debug(response.body);

    expect(response.status).toBe(400);
    expect(response.body.errors).toBeDefined();
  });
});

describe("DELETE /api/contacts/:contactId", () => {
  beforeEach(async () => {
    await UserTest.create();
    await ContactTest.create();
  });

  afterEach(async () => {
    await ContactTest.deleteAll();
    await UserTest.delete();
  });

  it("should be able to delete contact", async () => {
    const contact = await ContactTest.get();
    const response = await supertest(web)
      .delete(`/api/contacts/${contact.id}`)
      .set("X-API-TOKEN", "test");

    logger.debug(response.body);

    expect(response.status).toBe(200);
    expect(response.body.data).toBe("OK");
  });

  it("should reject delete contact if contact is not found", async () => {
    const contact = await ContactTest.get();
    const response = await supertest(web)
      .delete(`/api/contacts/${contact.id + 1}`)
      .set("X-API-TOKEN", "test");

    logger.debug(response.body);

    expect(response.status).toBe(404);
    expect(response.body.errors).toBeDefined();
  });
});

describe("GET /api/contacts", () => {
  beforeEach(async () => {
    await UserTest.create();
    await ContactTest.create();
  });

  afterEach(async () => {
    await ContactTest.deleteAll();
    await UserTest.delete();
  });

  it("should be able to search contacts", async () => {
    const response = await supertest(web)
      .get("/api/contacts")
      .set("X-API-TOKEN", "test");

    logger.debug(response.body);

    expect(response.status).toBe(200);
    expect(response.body.data.length).toBe(1);
    expect(response.body.paging.current_page).toBe(1);
    expect(response.body.paging.total_pages).toBe(1);
    expect(response.body.paging.size).toBe(10);
  });

  it("should be able to filter contacts by name", async () => {
    const response = await supertest(web)
      .get("/api/contacts?name=es")
      .set("X-API-TOKEN", "test");
    // .query({
    //   name: "test",
    // })

    logger.debug(response.body);

    expect(response.status).toBe(200);
    expect(response.body.data.length).toBe(1);
    expect(response.body.data[0].first_name).toBe("test");
    expect(response.body.data[0].last_name).toBe("test");
    expect(response.body.paging.current_page).toBe(1);
    expect(response.body.paging.total_pages).toBe(1);
    expect(response.body.paging.size).toBe(10);
  });

  it("should be able to filter contacts by email", async () => {
    const response = await supertest(web)
      .get("/api/contacts?email=example.com")
      .set("X-API-TOKEN", "test");
    // .query({
    //   email: "test@example.com",
    // })

    logger.debug(response.body);

    expect(response.status).toBe(200);
    expect(response.body.data.length).toBe(1);
    expect(response.body.data[0].email).toBe("test@example.com");
    expect(response.body.paging.current_page).toBe(1);
    expect(response.body.paging.total_pages).toBe(1);
    expect(response.body.paging.size).toBe(10);
  });

  it("should be able to filter contacts by phone", async () => {
    const response = await supertest(web)
      .get("/api/contacts?phone=3727")
      .set("X-API-TOKEN", "test");
    // .query({
    //   phone: "3727",
    // })

    logger.debug(response.body);

    expect(response.status).toBe(200);
    expect(response.body.data.length).toBe(1);
    expect(response.body.data[0].phone).toBe("01283727");
    expect(response.body.paging.current_page).toBe(1);
    expect(response.body.paging.total_pages).toBe(1);
    expect(response.body.paging.size).toBe(10);
  });

  it("should be able to search contact no result", async () => {
    const response = await supertest(web)
      .get("/api/contacts?name=nonexistent")
      .set("X-API-TOKEN", "test");

    logger.debug(response.body);

    expect(response.status).toBe(200);
    expect(response.body.data.length).toBe(0);
    expect(response.body.paging.current_page).toBe(1);
    expect(response.body.paging.total_pages).toBe(0);
    expect(response.body.paging.size).toBe(10);
  });

  it("should be able to paginate contacts", async () => {
    const response = await supertest(web)
      .get("/api/contacts?page=2&size=10")
      .set("X-API-TOKEN", "test");

    logger.debug(response.body);

    expect(response.status).toBe(200);
    expect(response.body.data.length).toBe(0);
    expect(response.body.paging.current_page).toBe(2);
    expect(response.body.paging.total_pages).toBe(1);
    expect(response.body.paging.size).toBe(10);
  });
});
