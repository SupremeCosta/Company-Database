const mysql = require('mysql2/promise');

class Database {
  constructor() {
    this.pool = mysql.createPool({
      host: 'localhost',
      user: 'root',
      password: '',
      database: 'employeeManager',
    });
  }

  async connect() {
    return await this.pool.getConnection();
  }

  async query(sql, args) {
    const connection = await this.connect();
    try {
      const [rows] = await connection.query(sql, args);
      return rows;
    } finally {
      connection.release();
    }
  }

  async end() {
    await this.pool.end();
  }
}

module.exports = new Database();