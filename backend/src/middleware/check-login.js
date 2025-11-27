const db = require("../config/db");
const { error } = require("../utils/response");

async function checkLogin(req, res, next) {
  try {
    const token = req.headers.authorization;

    if (!token) return error(res, 401, "Tidak ada token");

    const query = `
      SELECT id_akun, role, waktu_berakhir
      FROM sesi
      WHERE token = $1
    `;
    const result = await db.query(query, [token]);

    if (result.rows.length === 0) return error(res, 401, "Token tidak valid");

    const session = result.rows[0];

    if (new Date(session.waktu_berakhir) < new Date())
      return error(res, 401, "Token kedaluwarsa");

    // Inject ke request
    req.user = {
      id: session.user_id,
      role: session.role,
    };

    next();
  } catch (err) {
    return error(res, 500, err.message);
  }
}

module.exports = checkLogin;
