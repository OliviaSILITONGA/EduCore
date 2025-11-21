const service = require("../services/service");
const { success, error } = require("../utils/response");

async function handlerLoginSiswa(req, res) {
  try {
    const student = service.handlerLoginSiswa(req.body);
    if (!student) return error(res, 401, "Login gagal");
    return success(res, 200, "Login berhasil");
  } catch (err) {
    return error(res, 500, err.message);
  }
}

async function handlerLoginGuru(req, res) {
  try {
    const student = service.handlerLoginGuru(req.body);
    if (!student) return error(res, 401, "Login gagal");
    return success(res, 200, "Login berhasil");
  } catch (err) {
    return error(res, 500, err.message);
  }
}

async function handlerRegisterSiswa(req, res) {
  try {
    const newStudent = await service.handlerRegisterSiswa(req.body);
    return success(res, 201, "Akun siswa berhasil dibuat", newStudent);
  } catch (err) {
    return error(res, 500, err.message);
  }
}

async function handlerRegisterGuru(req, res) {
  try {
    const newTeacher = await service.handlerRegisterGuru(req.body);
    return success(res, 201, "Akun guru berhasil dibuat", newTeacher);
  } catch (err) {
    return error(res, 500, err.message);
  }
}

async function handlerBerandaSiswa(req, res) {
  try {
    const data = await service.handlerBerandaSiswa(req.params.id);
    return success(res, 200, "Beranda siswa", data);
  } catch (err) {
    return error(res, 500, err.message);
  }
}

async function handlerBerandaGuru(req, res) {
  try {
    const data = await service.handlerBerandaGuru(req.params.id);
    return success(res, 200, "Beranda guru", data);
  } catch (err) {
    return error(res, 500, err.message);
  }
}

async function handlerMapel(req, res) {
  try {
    const data = await service.handlerMapel(req.params.subject);
    return success(res, 200, "Detail mata pelajaran", data);
  } catch (err) {
    return error(res, 500, err.message);
  }
}

async function handlerMapelSiswa(req, res) {
  try {
    const data = await service.handlerMapelSiswa(req.params.subject);
    return success(res, 200, "Detail mata pelajaran siswa", data);
  } catch (err) {
    return error(res, 500, err.message);
  }
}

async function handlerKelas(req, res) {
  try {
    const data = await service.handlerKelas(req.params.mapel);
    return success(res, 200, "Manajemen kelas", data);
  } catch (err) {
    return error(res, 500, err.message);
  }
}

async function handlerMateri(req, res) {
  try {
    const data = await service.handlerMateri(req.params.subject);
    return success(res, 200, "Materi siswa", data);
  } catch (err) {
    return error(res, 500, err.message);
  }
}

async function handlerBelajar(req, res) {
  try {
    const { subject, materiId } = req.params;
    const data = await service.handlerBelajar(subject, materiId);
    return success(res, 200, "Data materi belajar", data);
  } catch (err) {
    return error(res, 500, err.message);
  }
}

module.exports = {
  handlerLoginSiswa,
  handlerLoginGuru,
  handlerRegisterSiswa,
  handlerRegisterGuru,
  handlerBerandaSiswa,
  handlerBerandaGuru,
  handlerMapel,
  handlerMapelSiswa,
  handlerKelas,
  handlerMateri,
  handlerBelajar,
};
