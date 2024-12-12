import React from "react";
import { Inertia } from "@inertiajs/inertia";
import { InertiaLink } from "@inertiajs/inertia-react";

const PoliIndex = ({ polis }) => {
    // Fungsi untuk menghapus data poli
    const handleDelete = (e, id) => {
        e.preventDefault();

        if (confirm("Apakah Anda yakin ingin menghapus data ini?")) {
            Inertia.delete(route("polis.destroy", id));
        }
    };

    return (
        <div className="container mx-auto p-4">
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl font-bold">Daftar Poli</h2>
                <InertiaLink
                    href={route("polis.create")}
                    className="text-white bg-blue-600 px-4 py-2 rounded hover:bg-blue-700 transition-colors"
                >
                    Tambah Poli
                </InertiaLink>
            </div>

            {polis.length === 0 ? (
                <div className="text-center text-gray-500 py-4">
                    Tidak ada data poli
                </div>
            ) : (
                <table className="min-w-full border-collapse border border-gray-200">
                    <thead>
                        <tr className="bg-gray-100">
                            <th className="px-4 py-2 border border-gray-300">
                                Nama Poli
                            </th>
                            <th className="px-4 py-2 border border-gray-300">
                                Keterangan
                            </th>
                            <th className="px-4 py-2 border border-gray-300">
                                Aksi
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {polis.map((poli) => (
                            <tr key={poli.id} className="hover:bg-gray-50">
                                <td className="px-4 py-2 border border-gray-300">
                                    {poli.nama_poli}
                                </td>
                                <td className="px-4 py-2 border border-gray-300">
                                    {poli.keterangan || "-"}
                                </td>
                                <td className="px-4 py-2 border border-gray-300 text-center">
                                    <div className="flex justify-center space-x-2">
                                        <InertiaLink
                                            href={route("polis.edit", poli.id)}
                                            className="text-yellow-500 hover:text-yellow-700 transition-colors"
                                        >
                                            Edit
                                        </InertiaLink>
                                        <button
                                            onClick={(e) =>
                                                handleDelete(e, poli.id)
                                            }
                                            className="text-red-500 hover:text-red-700 transition-colors"
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

export default PoliIndex;
