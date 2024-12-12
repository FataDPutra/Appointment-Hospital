import React from "react";
import { InertiaLink } from "@inertiajs/inertia-react";
import { Inertia } from "@inertiajs/inertia";

const PasienIndex = ({ pasiens }) => {
    const handleDelete = (id) => {
        if (confirm("Apakah Anda yakin ingin menghapus data pasien ini?")) {
            Inertia.delete(route("pasiens.destroy", id));
        }
    };

    return (
        <div className="container mx-auto p-4">
            <div className="flex justify-between items-center mb-4">
                <h1 className="text-2xl font-bold">Daftar Pasien</h1>
                <InertiaLink
                    href={route("pasiens.create")}
                    className="bg-blue-500 text-white px-4 py-2 rounded"
                >
                    Tambah Pasien
                </InertiaLink>
            </div>

            {pasiens.length === 0 ? (
                <div className="text-center text-gray-500 py-4">
                    Tidak ada data pasien
                </div>
            ) : (
                <table className="w-full border-collapse">
                    <thead>
                        <tr className="bg-gray-200">
                            <th className="border p-2">No RM</th>
                            <th className="border p-2">Nama</th>
                            <th className="border p-2">No KTP</th>
                            <th className="border p-2">No HP</th>
                            <th className="border p-2">Alamat</th>
                            <th className="border p-2">Aksi</th>
                        </tr>
                    </thead>
                    <tbody>
                        {pasiens.map((pasien) => (
                            <tr key={pasien.id}>
                                <td className="border p-2">{pasien.no_rm}</td>
                                <td className="border p-2">{pasien.nama}</td>
                                <td className="border p-2">{pasien.no_ktp}</td>
                                <td className="border p-2">{pasien.no_hp}</td>
                                <td className="border p-2">{pasien.alamat}</td>
                                <td className="border p-2">
                                    <div className="flex space-x-2 justify-center">
                                        <InertiaLink
                                            href={route(
                                                "pasiens.edit",
                                                pasien.id
                                            )}
                                            className="text-yellow-500 hover:text-yellow-700"
                                        >
                                            Edit
                                        </InertiaLink>
                                        <button
                                            onClick={() =>
                                                handleDelete(pasien.id)
                                            }
                                            className="text-red-500 hover:text-red-700"
                                        >
                                            Hapus
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
};

export default PasienIndex;
