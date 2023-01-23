"use strict";

const db = require("../db.js");
const { BadRequestError, NotFoundError } = require("../expressError");
const Company = require("./company.js");
const Job = require("./job.js");
const {
  commonBeforeAll,
  commonBeforeEach,
  commonAfterEach,
  commonAfterAll,
} = require("./_testCommon");

beforeAll(commonBeforeAll);
beforeEach(commonBeforeEach);
afterEach(commonAfterEach);
afterAll(commonAfterAll);

/************************************** create */

describe("create", function () {
  const newJob = {
    title: "New",
    salary: 100000,
    equity: 0,
    companyHandle: "c1",
  };
  test("works", async function () {
    let job = await Job.create(newJob);
    expect(job).toEqual(newJob);

    const result = await db.query(
      `SELECT id, name, salary, equity, company_handle
           FROM companies
           WHERE name = 'New'`
    );
    expect(result.rows).toEqual([
      {
        id: expect.any(Number),
        name: "New",
        salary: 100000,
        equity: 0,
        comapanyHandle: "c1",
      },
    ]);
  });
});
