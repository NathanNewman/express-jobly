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
    const job = await Job.create(newJob);
    expect(job).toEqual(newJob);

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

/************************************* find all */

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
      {
        id: expect.any(Number),
        title: "testJob3",
        salary: 100000,
        equity: 0,
        companyHandle: "c1",
      },
    ]);
  });
});

/************************************************* search */

describe("Search for jobs", () => {
  test("equity is true", async () => {
    let jobs = await Job.search("", 0, true);
    expect(jobs).toEqual([
      {
        id: expect.any(Number),
        title: "testJob2",
        salary: 100000,
        equity: 0.091,
        companyHandle: "c2",
      },
    ]);
  });
  test("minSalary works", async () => {
    let jobs = await Job.search("", 75000, false);
    expect(jobs).toEqual([
      {
        id: expect.any(Number),
        title: "testJob3",
        salary: 100000,
        equity: 0,
        companyHandle: "c1",
      },
    ]);
  });
  test("Invalid Equity", async () => {
    try {
      await Job.search("", 50000, 10);
      fail();
    } catch (err) {
      expect(err instanceof BadRequestError).toBeTruthy();
    }
  });
  test("Invalid minSalary", async () => {
    try {
      await Job.search("", "five", true);
      fail();
    } catch (err) {
      expect(err instanceof BadRequestError).toBeTruthy();
    }
  });
  test("Invalid title", async () => {
    try {
      await Job.search(10, 50000, true);
      fail();
    } catch (err) {
      expect(err instanceof BadRequestError).toBeTruthy();
    }
  });
});
