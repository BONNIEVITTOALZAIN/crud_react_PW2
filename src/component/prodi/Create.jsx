import React, { useState, useEffect } from "react";
import axios from "axios";

export default function CreateProdi() {
  const [namaProdi, setNamaProdi] = useState(""); 
  const [fakultasId, setFakultasId] = useState("");
  const [fakultasList, setFakultasList] = useState([]);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  useEffect(() => {
        const fetchfakultas = async () => {
            try {
                const response = await axios.get(
                  "https://project-apiif-3-b.vercel.app/api/api/fakultas"
                );
                setFakultasList(response.data.result);
              } catch (e) {
                setError("Failed to fetch fakultas");
  
            }
        };
        fetchfakultas();
  },[]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (namaProdi.trim() === "" || fakultasId.trim() === "") {
      setError("Nama fakultas dan nama prodi harus diisi");
      return;
    }

    try {
      const response = await axios.post(
        "https://project-apiif-3-b.vercel.app/api/api/prodi",
        { nama: namaProdi,
            fakultas_id: fakultasId ,
        }
      );

      if (response.status === 201) {
        setSuccess("Berhasil menyimpan data Prodi");
        setNamaProdi(""); 
        setFakultasId("");
      } else {
        setError("Failed to create Prodi");
      }
    } catch (e) {
      setError("An error occurred while creating Prodi");
    }
  };

  return (
    <>
      <div className="container mt-5">
        <h2 className="mb-4">Tambah Program Studi</h2>
        {error && <div className="alert alert-danger">{error}</div>}
        {success && <div className="alert alert-success">{success}</div>}

        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="namaProdi" className="form-label">
              Nama Prodi
            </label>
            <input
              type="text"
              className="form-control"
              id="namaProdi"
              value={namaProdi}
              onChange={(e) => setNamaProdi(e.target.value)}
              placeholder="Nama Prodi"
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label">
              Fakultas
            </label>
           <select className="form-select" id="fakultasid" 
           value={fakultasId}
           onChange={(e) => setFakultasId(e.target.value)}
           >
            <option value="">Select</option>
            {fakultasList.map((fakultas) => (
                <option key={fakultas.id} value={fakultas.id}>
                  {fakultas.nama}
                </option>
            ))}
           </select>
          </div>

          <button type="submit" className="btn btn-primary">
            Tambah Program Studi
          </button>
        </form>
      </div>
    </>
  );
}
