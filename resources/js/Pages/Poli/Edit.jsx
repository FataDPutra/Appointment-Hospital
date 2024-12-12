import React, { useState } from "react";
import { Inertia } from "@inertiajs/inertia";

const PoliEdit = ({ poli }) => {
    // Memastikan bahwa data poli ada
    if (!poli) {
        return <div>Loading...</div>; // Menunggu data poli
    }

    const [formData, setFormData] = useState({
        nama_poli: poli.nama_poli || "",
        keterangan: poli.keterangan || "",
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
        // Kirim data untuk update
        Inertia.put(`/polis/${poli.id}`, formData, {
            onSuccess: () => {
                console.log("Data berhasil diperbarui");
            },
            onError: (errors) => {
                console.error("Terjadi kesalahan:", errors);
            },
        });
    };

    return (
        <div>
            <h2>Edit Poli</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="nama_poli">Nama Poli</label>
                    <input
                        type="text"
                        id="nama_poli"
                        name="nama_poli"
                        value={formData.nama_poli}
                        onChange={handleChange}
                    />
                </div>

                <div>
                    <label htmlFor="keterangan">Keterangan</label>
                    <textarea
                        id="keterangan"
                        name="keterangan"
                        value={formData.keterangan}
                        onChange={handleChange}
                    />
                </div>

                <div>
                    <button type="submit">Update</button>
                </div>
            </form>
        </div>
    );
};

export default PoliEdit;
