import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../components/Button";
import { getSiswaSelesai, getToken } from "../services/api";

export default function Datasiswa() {
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  const load = async () => {
    if (!getToken()) return;
    setLoading(true);
    try {
      const res = await getSiswaSelesai();
      if (res && res.data) setData(res.data);
    } catch (err) {
      console.error("Gagal memuat data siswa selesai", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="min-h-screen p-6">
      <div className="max-w-5xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-semibold">Data Siswa - Selesai Materi</h1>
          <div className="flex items-center gap-3">
            <Button onClick={load} variant="menu">Refresh</Button>
            <Button variant="link" onClick={() => navigate(-1)}>
              Kembali
            </Button>
          </div>
        </div>

        <div className="bg-white shadow rounded p-4">
          <div className="overflow-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="text-left text-gray-600">
                  <th className="p-2">Nama</th>
                  <th className="p-2">Mata Pelajaran</th>
                  <th className="p-2">Kelas</th>
                </tr>
              </thead>
              <tbody>
                {loading && (
                  <tr>
                    <td colSpan={3} className="p-2 text-gray-500">
                      Memuat...
                    </td>
                  </tr>
                )}
                {!loading && data.length === 0 && (
                  <tr>
                    <td colSpan={3} className="p-2 text-gray-500">
                      Belum ada siswa yang menandai selesai.
                    </td>
                  </tr>
                )}
                {data.map((r) => (
                  <tr key={r.pembelajaran_id} className="border-t">
                    <td className="p-2">{r.nama_siswa}</td>
                    <td className="p-2">{r.nama_matpel}</td>
                    <td className="p-2">{r.kelas}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {/* Debug: show raw JSON for troubleshooting */}
          <div className="mt-4 text-xs text-gray-600">
            <strong>Raw response (debug):</strong>
            <pre className="mt-2 p-2 bg-gray-100 rounded max-h-48 overflow-auto">{JSON.stringify(data, null, 2)}</pre>
          </div>
        </div>
      </div>
    </div>
  );
}
