import React from "react";
import { InertiaLink } from "@inertiajs/inertia-react";

const Index = ({ daftarPoli }) => {
    return (
        <div className="container mx-auto p-6">
            <h1 className="text-3xl font-semibold mb-6">
                Daftar Pendaftaran Poli
            </h1>

            {/* Button untuk menambah pendaftaran */}
            <InertiaLink
                href={route("daftar-poli.create")}
                className="bg-blue-600 text-white px-4 py-2 rounded-md shadow-md hover:bg-blue-700 mb-4 inline-block"
            >
                Tambah Pendaftaran
            </InertiaLink>

            {/* Tabel Daftar Pendaftaran Poli */}
            <div className="overflow-x-auto bg-white rounded-lg shadow-md">
                <table className="min-w-full table-auto">
                    <thead className="bg-gray-100">
                        <tr>
                            <th className="py-3 px-4 text-left text-sm font-medium text-gray-600">
                                No
                            </th>
                            <th className="py-3 px-4 text-left text-sm font-medium text-gray-600">
                                Dokter
                            </th>
                            <th className="py-3 px-4 text-left text-sm font-medium text-gray-600">
                                Poli
                            </th>
                            <th className="py-3 px-4 text-left text-sm font-medium text-gray-600">
                                Hari
                            </th>
                            <th className="py-3 px-4 text-left text-sm font-medium text-gray-600">
                                Jam
                            </th>
                            <th className="py-3 px-4 text-left text-sm font-medium text-gray-600">
                                Nomor Antrian
                            </th>
                            <th className="py-3 px-4 text-left text-sm font-medium text-gray-600">
                                Status
                            </th>
                            <th className="py-3 px-4 text-left text-sm font-medium text-gray-600">
                                Riwayat
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {daftarPoli.length > 0 ? (
                            daftarPoli.map((item, index) => (
                                <tr key={item.id} className="border-t">
                                    <td className="py-3 px-4 text-sm text-gray-800">
                                        {index + 1}
                                    </td>
                                    <td className="py-3 px-4 text-sm text-gray-800">
                                        {item.jadwal?.dokter?.nama || "N/A"}
                                    </td>
                                    <td className="py-3 px-4 text-sm text-gray-800">
                                        {item.jadwal?.dokter?.poli?.nama_poli ||
                                            "N/A"}
                                    </td>
                                    <td className="py-3 px-4 text-sm text-gray-800">
                                        {item.jadwal?.hari || "N/A"}
                                    </td>
                                    <td className="py-3 px-4 text-sm text-gray-800">
                                        {item.jadwal?.jam_mulai} -{" "}
                                        {item.jadwal?.jam_selesai}
                                    </td>
                                    <td className="py-3 px-4 text-sm text-gray-800">
                                        {item.no_antrian}
                                    </td>
                                    <td className="py-3 px-4 text-sm text-gray-800">
                                        {item.deleted_at ? (
                                            <span className="text-green-600">
                                                Sudah Diperiksa
                                            </span>
                                        ) : (
                                            <span className="text-yellow-600">
                                                Pending
                                            </span>
                                        )}
                                    </td>
                                    <td className="py-3 px-4 text-sm text-gray-800">
                                        <InertiaLink
                                            href={route(
                                                "daftar-poli.riwayat",
                                                item.id
                                            )}
                                            className="text-blue-600 hover:text-blue-800"
                                        >
                                            Riwayat
                                        </InertiaLink>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td
                                    colSpan="8"
                                    className="py-3 px-4 text-center text-gray-500"
                                >
                                    Tidak ada data pendaftaran.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Index;
