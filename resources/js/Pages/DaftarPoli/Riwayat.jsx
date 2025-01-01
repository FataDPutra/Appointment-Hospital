import React from "react";
import { InertiaLink } from "@inertiajs/inertia-react";
import AuthenticatedLayoutPasien from "@/Layouts/AuthenticatedLayoutPasien";
import PasienSidebar from "../../Components/PasienSidebar";
import { FaArrowLeft } from "react-icons/fa"; // Import ikon untuk tombol kembali
import { Head } from "@inertiajs/react";

const Riwayat = ({ riwayat }) => {
    console.log(riwayat); // Debugging untuk melihat struktur data

    return (
        <AuthenticatedLayoutPasien
            header={
                <h2 className="text-2xl font-semibold leading-tight text-gray-700">
                    Detail Riwayat
                </h2>
            }
        >
            <Head title="Detail Riwayat" />
            <div className="flex">
                <PasienSidebar />
                <div className="container mx-auto p-6 w-full bg-[#FBF8EF] rounded-lg shadow-md">
                    <div className="bg-white p-6 rounded-lg shadow-lg">
                        {/* Informasi Pemeriksaan */}
                        <h2 className="text-xl font-semibold mb-4 text-gray-800">
                            Informasi Pemeriksaan
                        </h2>
                        <p className="text-gray-600">
                            <strong>Poli:</strong>{" "}
                            {riwayat.jadwal?.dokter?.poli?.nama_poli || "N/A"}
                        </p>
                        <p className="text-gray-600">
                            <strong>Dokter:</strong>{" "}
                            {riwayat.jadwal?.dokter?.nama || "N/A"}
                        </p>
                        <p className="text-gray-600">
                            <strong>Hari:</strong>{" "}
                            {riwayat.jadwal?.hari || "N/A"}
                        </p>
                        <p className="text-gray-600">
                            <strong>Jam:</strong> {riwayat.jadwal?.jam_mulai} -{" "}
                            {riwayat.jadwal?.jam_selesai}
                        </p>
                        <p className="text-gray-600">
                            <strong>Nomor Antrian:</strong> {riwayat.no_antrian}
                        </p>

                        {/* Keluhan Pasien */}
                        <h2 className="text-xl font-semibold mt-6 mb-4 text-gray-800">
                            Keluhan Pasien
                        </h2>
                        <p className="text-gray-600">
                            {riwayat.keluhan || "Tidak ada keluhan."}
                        </p>

                        {/* Hasil Pemeriksaan */}
                        <h2 className="text-xl font-semibold mt-6 mb-4 text-gray-800">
                            Hasil Pemeriksaan
                        </h2>
                        <p className="text-gray-600">
                            <strong>Tanggal Periksa:</strong>{" "}
                            {riwayat.periksa?.tgl_periksa || "N/A"}
                        </p>
                        <p className="text-gray-600">
                            <strong>Catatan:</strong>{" "}
                            {riwayat.periksa?.catatan || "Tidak ada catatan"}
                        </p>
                        <p className="text-gray-600">
                            <strong>Total Biaya:</strong> Rp{" "}
                            {riwayat.periksa?.biaya_periksa || "0"}
                        </p>

                        {/* Obat yang Diberikan */}
                        <h2 className="text-xl font-semibold mt-6 mb-4 text-gray-800">
                            Obat yang Diberikan
                        </h2>
                        <ul className="list-disc pl-5 text-gray-600">
                            {riwayat.periksa?.detail_periksa?.length > 0 ? (
                                riwayat.periksa.detail_periksa.map(
                                    (detail, index) => (
                                        <li key={detail.id}>
                                            {detail.obat?.nama_obat || "N/A"} -{" "}
                                            {detail.obat?.kemasan || "N/A"} - Rp{" "}
                                            {detail.obat?.harga || "0"}
                                        </li>
                                    )
                                )
                            ) : (
                                <li>Tidak ada obat yang diberikan.</li>
                            )}
                        </ul>

                        {/* Tombol Kembali */}
                        <InertiaLink
                            href={route("daftar-poli.index")} // Ganti dengan rute yang sesuai
                            className="inline-flex items-center px-4 py-2 mt-6 text-white bg-gray-500 hover:bg-gray-600 rounded-lg shadow-md focus:outline-none"
                        >
                            <FaArrowLeft className="mr-2" /> Kembali
                        </InertiaLink>
                    </div>
                </div>
            </div>
        </AuthenticatedLayoutPasien>
    );
};

export default Riwayat;
