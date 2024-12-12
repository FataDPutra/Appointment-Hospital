import React from "react";
import { useForm } from "@inertiajs/inertia-react";

const PasienEdit = ({ pasien }) => {
    const { data, setData, put, errors } = useForm({
        nama: pasien.nama,
        alamat: pasien.alamat,
        no_ktp: pasien.no_ktp,
        no_hp: pasien.no_hp,
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        put(route("pasiens.update", pasien.id));
    };

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4">Edit Pasien</h1>
            <form onSubmit={handleSubmit}>
                <div className="mb-4">
                    <label className="block mb-2">No RM</label>
                    <input
                        type="text"
                        value={pasien.no_rm}
                        disabled
                        className="w-full border p-2 bg-gray-100"
                    />
                </div>

                <div className="mb-4">
                    <label className="block mb-2">Nama</label>
                    <input
                        type="text"
                        value={data.nama}
                        onChange={(e) => setData("nama", e.target.value)}
                        className="w-full border p-2"
                    />
                    {errors.nama && (
                        <div className="text-red-500">{errors.nama}</div>
                    )}
                </div>

                <div className="mb-4">
                    <label className="block mb-2">Alamat</label>
                    <input
                        type="text"
                        value={data.alamat}
                        onChange={(e) => setData("alamat", e.target.value)}
                        className="w-full border p-2"
                    />
                    {errors.alamat && (
                        <div className="text-red-500">{errors.alamat}</div>
                    )}
                </div>

                <div className="mb-4">
                    <label className="block mb-2">No KTP</label>
                    <input
                        type="text"
                        value={data.no_ktp}
                        onChange={(e) => setData("no_ktp", e.target.value)}
                        className="w-full border p-2"
                    />
                    {errors.no_ktp && (
                        <div className="text-red-500">{errors.no_ktp}</div>
                    )}
                </div>

                <div className="mb-4">
                    <label className="block mb-2">No HP</label>
                    <input
                        type="text"
                        value={data.no_hp}
                        onChange={(e) => setData("no_hp", e.target.value)}
                        className="w-full border p-2"
                    />
                    {errors.no_hp && (
                        <div className="text-red-500">{errors.no_hp}</div>
                    )}
                </div>

                <button
                    type="submit"
                    className="bg-blue-500 text-white px-4 py-2 rounded"
                >
                    Update
                </button>
            </form>
        </div>
    );
};

export default PasienEdit;
