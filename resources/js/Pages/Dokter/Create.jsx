import React, { useState } from "react";
import { Inertia } from "@inertiajs/inertia";
import { InertiaLink } from "@inertiajs/inertia-react";

const CreateDokter = ({ poli }) => {
    const [formData, setFormData] = useState({
        nama: "",
        alamat: "",
        no_hp: "",
        id_poli: "",
        email: "",
        password: "",
    });

    const [errors, setErrors] = useState({});

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        Inertia.post(route("dokter.store"), formData, {
            onError: (err) => setErrors(err),
        });
    };

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4">Tambah Dokter</h1>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label className="block">Nama</label>
                    <input
                        type="text"
                        name="nama"
                        value={formData.nama}
                        onChange={handleChange}
                        className="w-full border px-4 py-2"
                    />
                    {errors.nama && (
                        <div className="text-red-500">{errors.nama}</div>
                    )}
                </div>
                <div>
                    <label className="block">Alamat</label>
                    <textarea
                        name="alamat"
                        value={formData.alamat}
                        onChange={handleChange}
                        className="w-full border px-4 py-2"
                    />
                    {errors.alamat && (
                        <div className="text-red-500">{errors.alamat}</div>
                    )}
                </div>
                <div>
                    <label className="block">No HP</label>
                    <input
                        type="text"
                        name="no_hp"
                        value={formData.no_hp}
                        onChange={handleChange}
                        className="w-full border px-4 py-2"
                    />
                    {errors.no_hp && (
                        <div className="text-red-500">{errors.no_hp}</div>
                    )}
                </div>
                <div>
                    <label className="block">Poli</label>
                    <select
                        name="id_poli"
                        value={formData.id_poli}
                        onChange={handleChange}
                        className="w-full border px-4 py-2"
                    >
                        <option value="">Pilih Poli</option>
                        {poli.map((p) => (
                            <option key={p.id} value={p.id}>
                                {p.nama_poli}
                            </option>
                        ))}
                    </select>
                    {errors.id_poli && (
                        <div className="text-red-500">{errors.id_poli}</div>
                    )}
                </div>
                <div>
                    <label className="block">Email</label>
                    <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        className="w-full border px-4 py-2"
                    />
                    {errors.email && (
                        <div className="text-red-500">{errors.email}</div>
                    )}
                </div>
                <div>
                    <label className="block">Password</label>
                    <input
                        type="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        className="w-full border px-4 py-2"
                    />
                    {errors.password && (
                        <div className="text-red-500">{errors.password}</div>
                    )}
                </div>
                <div className="flex justify-between">
                    <InertiaLink
                        href={route("dokter.index")}
                        className="bg-gray-500 text-white px-4 py-2 rounded"
                    >
                        Batal
                    </InertiaLink>
                    <button
                        type="submit"
                        className="bg-blue-500 text-white px-4 py-2 rounded"
                    >
                        Simpan
                    </button>
                </div>
            </form>
        </div>
    );
};

export default CreateDokter;
