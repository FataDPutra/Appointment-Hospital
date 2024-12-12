import React, { useState } from "react";
import { Inertia } from "@inertiajs/inertia";

const Create = () => {
    const [formData, setFormData] = useState({
        nama_obat: "",
        kemasan: "",
        harga: "",
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        Inertia.post("/obats", formData);
    };

    return (
        <div>
            <h1>Tambah Obat</h1>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="nama_obat">Nama Obat</label>
                    <input
                        type="text"
                        id="nama_obat"
                        name="nama_obat"
                        value={formData.nama_obat}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label htmlFor="kemasan">Kemasan</label>
                    <input
                        type="text"
                        id="kemasan"
                        name="kemasan"
                        value={formData.kemasan}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label htmlFor="harga">Harga</label>
                    <input
                        type="number"
                        id="harga"
                        name="harga"
                        value={formData.harga}
                        onChange={handleChange}
                        required
                    />
                </div>
                <button type="submit">Simpan</button>
            </form>
        </div>
    );
};

export default Create;
