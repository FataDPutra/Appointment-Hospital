import React from "react";
import { InertiaLink } from "@inertiajs/inertia-react";
import { Inertia } from "@inertiajs/inertia";

const DokterIndex = ({ dokters }) => {
    const handleDelete = (id) => {
        if (confirm("Apakah Anda yakin ingin menghapus data dokter ini?")) {
            Inertia.delete(route("dokter.destroy", id));
        }
    };

    return (
        <div className="container mx-auto p-4">
            <div className="flex justify-between items-center mb-4">
                <h1 className="text-2xl font-bold">Daftar Dokter</h1>
                <InertiaLink
                    href={route("dokter.create")}
                    className="bg-blue-500 text-white px-4 py-2 rounded"
                >
                    Tambah Dokter
                </InertiaLink>
            </div>

            {dokters.length === 0 ? (
                <div className="text-center text-gray-500 py-4">
                    Tidak ada data dokter
                </div>
            ) : (
                <table className="w-full border-collapse">
                    <thead>
                        <tr className="bg-gray-200">
                            <th className="border p-2">Nama</th>
                            <th className="border p-2">Poli</th>
                            <th className="border p-2">Email</th>
                            <th className="border p-2">No HP</th>
                            <th className="border p-2">Alamat</th>
                            <th className="border p-2">Aksi</th>
                        </tr>
                    </thead>
                    <tbody>
                        {dokters.map((dokter) => (
                            <tr key={dokter.id}>
                                <td className="border p-2">{dokter.nama}</td>
                                <td className="border p-2">
                                    {dokter.poli?.nama_poli || "Tidak ada poli"}
                                </td>
                                <td className="border p-2">{dokter.email}</td>
                                <td className="border p-2">{dokter.no_hp}</td>
                                <td className="border p-2">{dokter.alamat}</td>
                                <td className="border p-2">
                                    <div className="flex space-x-2 justify-center">
                                        <InertiaLink
                                            href={route(
                                                "dokter.edit",
                                                dokter.id
                                            )}
                                            className="text-yellow-500 hover:text-yellow-700"
                                        >
                                            Edit
                                        </InertiaLink>
                                        <button
                                            onClick={() =>
                                                handleDelete(dokter.id)
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

export default DokterIndex;
