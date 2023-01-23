"use strict";

const db = require("../db");
const { BadRequestError, NotFoundError } = require("../expressError");
const { sqlForPartialUpdate } = require("../helpers/sql");

/** related functions for jobs. */

class Job {

    /** Create a job (from data), update db, return new job data.
   *
   * data should be { id, title, salary, equity, company_handle }
   *
   * Returns { id, title, salary, equity, company_handle }
   *
   * Throws BadRequestError if job already in database.
   * */
  static async create (title, salary, equity, company_handle) {
      const result = await db.query(
        `INSERT INTO jobs
             (title, salary, equity, company_handle)
             VALUES ($1, $2, $3, $4, $5)
             RETURNING id, title, salary, equity, company_handle AS "companyHandle"`,
        [title, salary, equity, company_handle]
      );
      return result.rows[0];
  }
}