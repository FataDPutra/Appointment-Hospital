import React from "react";
import { Link } from "@inertiajs/inertia-react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import Sidebar from "../../Components/Sidebar";

const RiwayatPasienIndex = ({ pasiens }) => {
    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-2xl font-semibold leading-tight text-gray-800">
                    Riwayat Pasien
                </h2>
            }
        >
            <div className="flex">
                <Sidebar />
                <div className="container mx-auto p-6 ml-0 bg-[#FBF8EF] rounded-lg shadow-lg w-full">
                    {/* Jika tidak ada data pasien */}
                    {pasiens.length === 0 ? (
                        <div className="text-center text-gray-500 py-4">
                            Tidak ada data pasien.
                        </div>
                    ) : (
                        <div className="overflow-x-auto bg-white rounded-lg shadow-md">
                            <table className="w-full table-auto border-collapse">
                                <thead className="bg-[#78B3CE] text-white text-sm">
                                    <tr>
                                        <th className="border p-3 text-center">
                                            Nama Pasien
                                        </th>
                                        <th className="border p-3 text-center">
                                            Alamat
                                        </th>
                                        <th className="border p-3 text-center">
                                            No. KTP
                                        </th>
                                        <th className="border p-3 text-center">
                                            No. HP
                                        </th>
                                        <th className="border p-3 text-center">
                                            Aksi
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className="text-sm">
                                    {pasiens.map((pasien) => (
                                        <tr
                                            key={pasien.id}
                                            className="hover:bg-[#F3F3F3] transition-all duration-200"
                                        >
                                            <td className="border p-4">
                                                {pasien.nama}
                                            </td>
                                            <td className="border p-4">
                                                {pasien.alamat}
                                            </td>
                                            <td className="border p-4">
                                                {pasien.no_ktp || "-"}
                                            </td>
                                            <td className="border p-4">
                                                {pasien.no_hp || "-"}
                                            </td>
                                            <td className="border p-4">
                                                <div className="flex justify-center">
                                                    <Link
                                                        href={route(
                                                            "riwayat-pasien.show",
                                                            pasien.id
                                                        )}
                                                        className="bg-[#F96E2A] text-white px-4 py-2 rounded-md shadow-md flex items-center space-x-2 transition-all duration-200 hover:bg-orange-400"
                                                    >
                                                        <span className="text-sm">
                                                            Riwayat Lengkap
                                                        </span>
                                                    </Link>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}
                </div>
            </div>
        </AuthenticatedLayout>
    );
};

export default RiwayatPasienIndex;
