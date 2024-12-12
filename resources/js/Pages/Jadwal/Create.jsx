import React, { useState } from "react";
import { useForm } from "@inertiajs/react";
import { Link } from "@inertiajs/react";

const JadwalCreate = () => {
    const { data, setData, post, errors } = useForm({
        hari: "",
        jam_mulai: "",
        jam_selesai: "",
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        post("/jadwal", {
            onSuccess: () => alert("Jadwal berhasil ditambahkan!"),
        });
    };

    return (
        <div>
            <h1>Tambah Jadwal Periksa</h1>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="hari" className="form-label">
                        Hari
                    </label>
                    <select
                        id="hari"
                        className="form-control"
                        value={data.hari}
                        onChange={(e) => setData("hari", e.target.value)}
                    >
                        <option value="">Pilih Hari</option>
                        <option value="Senin">Senin</option>
                        <option value="Selasa">Selasa</option>
                        <option value="Rabu">Rabu</option>
                        <option value="Kamis">Kamis</option>
                        <option value="Jumat">Jumat</option>
                        <option value="Sabtu">Sabtu</option>
                        <option value="Minggu">Minggu</option>
                    </select>
                    {errors.hari && (
                        <div className="text-danger">{errors.hari}</div>
                    )}
                </div>

                <div className="mb-3">
                    <label htmlFor="jam_mulai" className="form-label">
                        Jam Mulai
                    </label>
                    <input
                        type="time"
                        id="jam_mulai"
                        className="form-control"
                        value={data.jam_mulai}
                        onChange={(e) => setData("jam_mulai", e.target.value)}
                    />
                    {errors.jam_mulai && (
                        <div className="text-danger">{errors.jam_mulai}</div>
                    )}
                </div>

                <div className="mb-3">
                    <label htmlFor="jam_selesai" className="form-label">
                        Jam Selesai
                    </label>
                    <input
                        type="time"
                        id="jam_selesai"
                        className="form-control"
                        value={data.jam_selesai}
                        onChange={(e) => setData("jam_selesai", e.target.value)}
                    />
                    {errors.jam_selesai && (
                        <div className="text-danger">{errors.jam_selesai}</div>
                    )}
                </div>

                <button type="submit" className="btn btn-primary">
                    Simpan
                </button>
                <Link href="/jadwal" className="btn btn-secondary ms-2">
                    Kembali
                </Link>
            </form>
        </div>
    );
};

export default JadwalCreate;
