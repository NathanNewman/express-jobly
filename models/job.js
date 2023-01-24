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
  static async create(title, salary, equity, companyHandle) {
    const result = await db.query(
      `INSERT INTO jobs
             (title, salary, equity, company_handle)
             VALUES ($1, $2, $3, $4)
             RETURNING id, title, salary, equity, company_handle AS "companyHandle"`,
      [title, salary, equity, companyHandle]
    );
    return result.rows[0];
  }
  static async findAll() {
    const results = await db.query(
      `SELECT id, title, salary, equity, company_handle AS "companyHandle"
        FROM jobs
        ORDER BY title`
    );
    return results.rows;
  }
  static async search(title, minSalary, equity) {
    if (typeof title !== "string") throw new BadRequestError("Invalid input!");
    if (typeof minSalary !== "number") throw new BadRequestError("Invalid input!");
    if (typeof equity !== "boolean") throw new BadRequestError("Invalid input!");
    if (equity === true) {
      const results = await db.query(
        `SELECT id, title, salary, equity, company_handle AS "companyHandle"
            FROM jobs
            WHERE salary > $1 AND equity > 0 AND title ILIKE $2
            ORDER BY salary`,
        [minSalary, `%${title}%`]
      );
      return results.rows;
    } else {
      const results = await db.query(
        `SELECT id, title, salary, equity, company_handle AS "companyHandle"
            FROM jobs
            WHERE salary > $1
            AND title ILIKE $2
            ORDER BY salary`,
        [minSalary, title]
      );
      return results;
    }
  }
}

module.exports = Job;
