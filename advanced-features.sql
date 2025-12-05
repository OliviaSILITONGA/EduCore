CREATE OR REPLACE FUNCTION update_progres_mapel_kelas()
RETURNS TRIGGER AS $$
DECLARE
    v_id_matpel INT;
    v_id_kelas VARCHAR(100);
    total_materi INT;
    total_selesai INT;
    progres_baru INT;
BEGIN
    -- Ambil mapel dan kelas dari materi terkait
    SELECT id_matpel, id_kelas 
    INTO v_id_matpel, v_id_kelas
    FROM materi
    WHERE id = NEW.id_materi;

    -- Hitung total materi dalam MAPEL tersebut untuk KELAS tersebut
    SELECT COUNT(*) INTO total_materi
    FROM materi
    WHERE id_matpel = v_id_matpel
      AND id_kelas = v_id_kelas;

    -- Hitung jumlah materi yang SELesai untuk siswa ini
    SELECT COUNT(*) INTO total_selesai
    FROM pembelajaran p
    JOIN materi m ON p.id_materi = m.id
    WHERE p.id_siswa = NEW.id_siswa
      AND m.id_matpel = v_id_matpel
      AND m.id_kelas = v_id_kelas
      AND p.selesai = TRUE;

    -- Hitung persentase progres (jaga-jaga 0 division)
    IF total_materi = 0 THEN
        progres_baru := 0;
    ELSE
        progres_baru := ROUND((total_selesai * 100) / total_materi);
    END IF;

    -- Update progres di tabel detail_kelas
    UPDATE detail_kelas
    SET progres = progres_baru
    WHERE id_siswa = NEW.id_siswa
      AND id_matpel = v_id_matpel
      AND id_kelas = v_id_kelas;

    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trg_update_progres_mapel_kelas
AFTER INSERT OR UPDATE OF selesai ON pembelajaran
FOR EACH ROW
EXECUTE FUNCTION update_progres_mapel_kelas();

CREATE VIEW view_materi_lengkap AS
SELECT 
  m.id AS id_materi,
  m.nama AS nama_materi,
  g.nama AS nama_guru,
  mp.nama AS nama_matpel,
  k.nama AS nama_kelas,
  m.tanggal_pembuatan
FROM materi m
JOIN guru g ON m.id_guru = g.id
JOIN matpel mp ON m.id_matpel = mp.id
JOIN kelas k ON m.id_kelas = k.id;

CREATE VIEW view_progress_siswa AS
SELECT 
  s.nama AS siswa,
  mp.nama AS matpel,
  k.nama AS kelas,
  dk.progres
FROM detail_kelas dk
JOIN siswa s ON dk.id_siswa = s.id
JOIN matpel mp ON dk.id_matpel = mp.id
JOIN kelas k ON dk.id_kelas = k.id;
