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

describe("create new job", () => {
  const newJob = {
    id: expect.any(Number),
    title: "New",
    salary: 100000,
    equity: 0,
    companyHandle: "c1",
  };
  test("works", async () => {
    const job = await Job.create(
      newJob.title,
      newJob.salary,
      newJob.equity,
      newJob.companyHandle
    );
    expect(job).toEqual({
      id: expect.any(Number),
      title: newJob.title,
      salary: newJob.salary,
      equity: newJob.equity,
      companyHandle: newJob.companyHandle,
    });

    const result = await db.query(
      `SELECT id, title, salary, equity, company_handle AS "companyHandle"
           FROM jobs
           WHERE title = 'New'`
    );
    expect(result.rows[0]).toEqual({
      id: expect.any(Number),
      title: "New",
      salary: 100000,
      equity: 0,
      companyHandle: "c1",
    });
  });
});

describe("find all jobs", () => {
  test("works", async () => {
    let jobs = await Job.findAll();
    expect(jobs).toEqual([
      {
        id: expect.any(Number),
        title: "testJob1",
        salary: 50000,
        equity: 0,
        companyHandle: "c1",
      },
      {
        id: expect.any(Number),
        title: "testJob2",
        salary: 100000,
        equity: 0.091,
        companyHandle: "c2",
      },
    ]);
  });
});
