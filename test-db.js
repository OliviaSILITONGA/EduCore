// Test database connection and queries
const { Pool } = require("pg");

const pool = new Pool({
  user: "postgres",
  password: "Ciau2007",
  host: "localhost",
  database: "educore",
  port: 5432,
});

async function testDatabase() {
  let client;
  try {
    console.log("=== Testing Database Connection ===\n");
    console.log("Config:", {
      user: "postgres",
      host: "localhost",
      database: "educore",
      port: 5432,
    });

    client = await pool.connect();
    console.log("✓ Connected to database\n");

    // Test 1: Check tables exist
    console.log("=== Test 1: Check Tables ===");
    const tables = await client.query(`
      SELECT table_name FROM information_schema.tables 
      WHERE table_schema = 'public' 
      ORDER BY table_name
    `);
    console.log("Tables:", tables.rows.map((r) => r.table_name).join(", "));
    console.log("");

    // Test 2: Check matpel data
    console.log("=== Test 2: Matpel Data ===");
    const matpel = await client.query(
      "SELECT id, nama FROM matpel ORDER BY id"
    );
    console.log("Matpel count:", matpel.rows.length);
    matpel.rows.forEach((m) => console.log(`  ${m.id}. ${m.nama}`));
    console.log("");

    // Test 3: Check kelas data
    console.log("=== Test 3: Kelas Data ===");
    const kelas = await client.query(
      "SELECT id, nama, no_kelas FROM kelas ORDER BY no_kelas"
    );
    console.log("Kelas count:", kelas.rows.length);
    kelas.rows.forEach((k) =>
      console.log(`  ${k.id} - ${k.nama} (${k.no_kelas})`)
    );
    console.log("");

    // Test 4: Check guru data
    console.log("=== Test 4: Guru Data ===");
    const guru = await client.query("SELECT id, nama, id_akun FROM guru");
    console.log("Guru count:", guru.rows.length);
    if (guru.rows.length > 0) {
      guru.rows.forEach((g) =>
        console.log(`  ID: ${g.id}, Nama: ${g.nama}, Akun ID: ${g.id_akun}`)
      );
    } else {
      console.log("  No guru data yet. Register a guru account to add data.");
    }
    console.log("");

    // Test 5: Check akun data
    console.log("=== Test 5: Akun Data ===");
    const akun = await client.query("SELECT id, email, role FROM akun");
    console.log("Akun count:", akun.rows.length);
    if (akun.rows.length > 0) {
      akun.rows.forEach((a) =>
        console.log(`  ${a.id}. ${a.email} (${a.role})`)
      );
    } else {
      console.log("  No accounts yet. Register to add accounts.");
    }
    console.log("");

    // Test 6: Check materi data
    console.log("=== Test 6: Materi Data ===");
    const materi = await client.query(
      "SELECT id, nama, id_guru, id_matpel, id_kelas FROM materi"
    );
    console.log("Materi count:", materi.rows.length);
    if (materi.rows.length > 0) {
      materi.rows.forEach((m) =>
        console.log(
          `  ID: ${m.id}, Nama: ${m.nama}, Guru: ${m.id_guru}, Matpel: ${m.id_matpel}, Kelas: ${m.id_kelas}`
        )
      );
    } else {
      console.log("  No materi yet. Add materi from frontend.");
    }
    console.log("");

    console.log("✓ All database tests passed!");
  } catch (err) {
    console.error("❌ Database test failed:", err.message);
    console.error("Full error:", err);
  } finally {
    if (client) client.release();
    await pool.end();
  }
}

testDatabase();
