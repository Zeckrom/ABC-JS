const supertest = require("supertest");

const app = require("../../server");

const request = supertest(app);

describe("User", () => {
  it("Should be able to register", async () => {
    const user = await request.post("/users/register").send({
      name: "admin",
      password: "admin",
    });

    expect(user.status).toBe(201);
  });

  it("Should be able to login", async () => {
    /* Here we will created a user and get the token to be able to test the api */
    const user = await request.post("/users/register").send({
      name: "admin",
      password: "admin",
    });
    /*************/

    const login = await request.post("/users/login").send({
      name: "admin",
      password: "admin",
    });

    expect(login.status).toBe(200);
  });
});

describe("Employee", () => {
  it("should be able to create Employee", async () => {
    /* Here we will created a user and get the token to be able to test the api */
    const user = await request.post("/users/register").send({
      name: "admin",
      password: "admin",
    });
    /*************/

    const response = await request
      .post("/employees")
      .send({
        name: "baccour",
        firstName: "yahia",
        department: "science",
        currentSession: {},
      })
      .set("Authorization", user.body.token);

    expect(response.status).toBe(200);
  });

  it("Should not be able to create Employee", async () => {
    const response = await request.post("/employees").send({
      name: "baccour",
      firstName: "yahia",
      department: "science",
      currentSession: {},
    });

    expect(response.status).toBe(403);
  });

  it("should be able to fetch all Employees", async () => {
    /* Here we will created a user and get the token to be able to test the api */
    const user = await request.post("/users/register").send({
      name: "admin",
      password: "admin",
    });
    /*************/

    /* Creating an employee to test fetching route properly */
    const employee = await request
      .post("/employees")
      .send({
        name: "baccour",
        firstName: "yahia",
        department: "science",
        currentSession: {},
      })
      .set("Authorization", user.body.token);
    /***************/

    const response = await request
      .get("/employees")
      .set("Authorization", user.body.token);
    expect(response.status).toBe(200);
    expect(response.body.length).toBe(1);
  });

  it("Should be able to check in and check out", async () => {
    /* Here we will created a user and get the token to be able to test the api */
    const user = await request.post("/users/register").send({
      name: "admin",
      password: "admin",
    });
    /*************/

    /* Creating an employee to test fetching route properly */
    const employee = await request
      .post("/employees")
      .send({
        name: "baccour",
        firstName: "yahia",
        department: "science",
        currentSession: {},
      })
      .set("Authorization", user.body.token);

    const employeeId = employee.body.employee._id;
    /***************/
    // Checking in
    const checkIn = await request
      .post(`/employees/check-in/${employeeId}`)
      .send({ comment: "Traffic delay" });

    expect(checkIn.status).toBe(200);

    // Checking out

    const checkOut = await request.post(`/employees/check-out/${employeeId}`);

    expect(checkOut.status).toBe(200);
  });

  it("Should not be able to check in without checking out", async () => {
    /* Here we will created a user and get the token to be able to test the api */
    const user = await request.post("/users/register").send({
      name: "admin",
      password: "admin",
    });
    /*************/

    /* Creating an employee to test fetching route properly */
    const employee = await request
      .post("/employees")
      .send({
        name: "baccour",
        firstName: "yahia",
        department: "science",
        currentSession: {},
      })
      .set("Authorization", user.body.token);

    const employeeId = employee.body.employee._id;
    /***************/

    // Checking in
    const checkIn = await request
      .post(`/employees/check-in/${employeeId}`)
      .send({ comment: "Traffic delay" });

    const secondCheckIn = await request
      .post(`/employees/check-in/${employeeId}`)
      .send({ comment: "Traffic delay" });

    expect(secondCheckIn.status).toBe(400);
  });

  it("Should not be able to check out without checking in", async () => {
    /* Here we will created a user and get the token to be able to test the api */
    const user = await request.post("/users/register").send({
      name: "admin",
      password: "admin",
    });
    /*************/

    /* Creating an employee to test fetching route properly */
    const employee = await request
      .post("/employees")
      .send({
        name: "baccour",
        firstName: "yahia",
        department: "science",
        currentSession: {},
      })
      .set("Authorization", user.body.token);

    const employeeId = employee.body.employee._id;
    /***************/

    // Checking out

    const checkOut = await request.post(`/employees/check-out/${employeeId}`);

    expect(checkOut.status).toBe(400);
  });
});
