import React, { useState } from "react";
import { useForm } from "@inertiajs/react"; // Menggunakan useForm hook dari Inertia.js

const PoliCreate = () => {
    const { data, setData, post, processing, errors } = useForm({
        nama_poli: "",
        keterangan: "",
    });

    // Fungsi untuk menangani perubahan input
    const handleChange = (e) => {
        const { name, value } = e.target;
        setData(name, value);
    };

    // Fungsi untuk menangani submit form
    const handleSubmit = (e) => {
        e.preventDefault();
        post("/polis", data); // Mengirim data ke rute store
    };

    return (
        <div>
            <h2>Tambah Poli</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="nama_poli">Nama Poli</label>
                    <input
                        id="nama_poli"
                        type="text"
                        name="nama_poli"
                        value={data.nama_poli}
                        onChange={handleChange}
                        required
                    />
                    {errors.nama_poli && <div>{errors.nama_poli}</div>}
                </div>

                <div>
                    <label htmlFor="keterangan">Keterangan</label>
                    <textarea
                        id="keterangan"
                        name="keterangan"
                        value={data.keterangan}
                        onChange={handleChange}
                    />
                    {errors.keterangan && <div>{errors.keterangan}</div>}
                </div>

                <button type="submit" disabled={processing}>
                    {processing ? "Menambahkan..." : "Tambah Poli"}
                </button>
            </form>
        </div>
    );
};

export default PoliCreate;
