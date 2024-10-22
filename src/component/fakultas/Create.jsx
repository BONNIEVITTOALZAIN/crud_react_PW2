import React, { useState } from "react";
import axios from "axios";

export default function CreateFakultas() {
  const [namaFakultas, setNamaFakultas] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(""); 
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess(""); 

    if (namaFakultas.trim() === "") {
      setError("Nama fakultas harus diisi");
      return;
    }

    try {
      const response = await axios.post(
        "https://project-apiif-3-b.vercel.app/api/api/fakultas",
        { nama: namaFakultas }
      );

      if (response.status === 201) {
        setSuccess("Berhasil menyimpan data");
        setNamaFakultas("");
      } else {
        setError("Failed to create fakultas");
      }
    } catch (e) {
      setError("An error occurred while creating fakultas");
    }
  };

  return (
    <>
      <div className="container mt-5">
        <h2 className="mb-4">Tambah Fakultas</h2>
        {error && <div className="alert alert-danger">{error}</div>}
        {success && <div className="alert alert-success">{success}</div>}

        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="namaFakultas" className="form-label">
              Nama Fakultas
            </label>
            <input
              type="text"
              className="form-control"
              id="namaFakultas"
              value={namaFakultas}
              onChange={(e) => setNamaFakultas(e.target.value)}
              placeholder="Nama Fakultas"
              required
            />
          </div>
          <button type="submit" className="btn btn-primary">
            Tambah Fakultas
          </button>
        </form>
      </div>
    </>
  );
}
