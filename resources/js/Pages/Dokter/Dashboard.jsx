import React from "react";
import { Link } from "@inertiajs/inertia-react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import Sidebar from "../../Components/Sidebar";

const DokterDashboard = ({ dokter, poli, jadwals }) => {
    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-2xl font-semibold leading-tight text-gray-800">
                    Dashboard Dokter
                </h2>
            }
        >
            <div className="flex">
                <Sidebar />
                <div className="container mx-auto p-6 ml-0 bg-[#FBF8EF] rounded-lg shadow-lg w-full">
                    {/* Menampilkan Selamat Datang */}
                    <div className="mb-6">
                        <h3 className="text-xl font-semibold">
                            Selamat datang, Dr. {dokter.nama}
                        </h3>
                        <p className="text-md text-gray-700">
                            Anda bertugas di{" "}
                            {poli?.nama_poli || "Poli tidak ditemukan"}
                        </p>
                    </div>

                    {/* Menampilkan Jadwal Aktif */}
                    <div className="text-lg font-semibold mb-4">
                        Jadwal Aktif
                    </div>
                    <div className="overflow-x-auto bg-white rounded-lg shadow-md">
                        <table className="w-full table-auto border-collapse">
                            <thead className="bg-[#78B3CE] text-white text-sm">
                                <tr>
                                    <th className="border p-3 text-center">
                                        Hari
                                    </th>
                                    <th className="border p-3 text-center">
                                        Jam Mulai
                                    </th>
                                    <th className="border p-3 text-center">
                                        Jam Selesai
                                    </th>

                                    <th className="border p-3 text-center">
                                        Jumlah Pasien Belum Diperiksa
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="text-sm">
                                {jadwals.map((jadwal) => (
                                    <tr
                                        key={jadwal.id}
                                        className="hover:bg-[#F3F3F3] transition-all duration-200"
                                    >
                                        <td className="border p-4 text-center">
                                            {jadwal.hari}
                                        </td>
                                        <td className="border p-4 text-center">
                                            {jadwal.jam_mulai}
                                        </td>
                                        <td className="border p-4 text-center">
                                            {jadwal.jam_selesai}
                                        </td>

                                        <td className="border p-4 text-center">
                                            {jadwal.jumlah_belum_diperiksa}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
};

export default DokterDashboard;
