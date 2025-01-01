import React from "react";
import { Inertia } from "@inertiajs/inertia"; // Import Inertia
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import Sidebar from "../../Components/Sidebar";
import { Head } from "@inertiajs/react";
import { IoIosArrowBack } from "react-icons/io";

export default function Show({ riwayat, pasien }) {
    console.log("Data Riwayat:", riwayat);
    console.log("Data Pasien:", pasien);

    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-2xl font-semibold leading-tight text-gray-800">
                    Riwayat Lengkap Pasien
                </h2>
            }
        >
            <Head title="Riwayat Lengkap Pasien" />
            <div className="flex">
                <Sidebar />

                <div className="container mx-auto p-6 ml-0 bg-[#FBF8EF] rounded-lg shadow-lg w-full">
                    {/* Back button */}
                    <div className="mb-4">
                        <button
                            type="button"
                            onClick={() =>
                                Inertia.visit(route("riwayat-pasien.index"))
                            }
                            className="bg-gray-500 text-white px-5 py-2 rounded-lg shadow-md hover:bg-gray-600 flex items-center space-x-2 transition duration-200 ease-in-out"
                        >
                            <IoIosArrowBack className="w-5 h-5" />
                            <span className="text-lg">Back</span>
                        </button>
                    </div>
                    {/* Tampilkan nama pasien */}
                    <div className="mb-6 bg-white p-4 rounded shadow-md">
                        <h3 className="text-xl font-bold text-gray-800">
                            Nama Pasien:{" "}
                            {pasien.pasien?.nama || "Nama tidak tersedia"}
                        </h3>
                        <p className="text-gray-600">
                            No. Rekam Medis:{" "}
                            {pasien.pasien?.no_rm || "Tidak tersedia"}
                        </p>
                    </div>

                    {/* Jika tidak ada riwayat */}
                    {!riwayat || riwayat.length === 0 ? (
                        <div className="text-center text-gray-500 py-4">
                            Tidak ada riwayat pemeriksaan untuk pasien ini.
                        </div>
                    ) : (
                        <div className="overflow-x-auto bg-white rounded-lg shadow-md">
                            <table className="w-full table-auto border-collapse">
                                <thead className="bg-[#78B3CE] text-white text-sm">
                                    <tr>
                                        <th className="border p-3 text-left">
                                            No
                                        </th>
                                        <th className="border p-3 text-left">
                                            Keluhan
                                        </th>
                                        <th className="border p-3 text-left">
                                            Tanggal Periksa
                                        </th>
                                        <th className="border p-3 text-left">
                                            Catatan
                                        </th>
                                        <th className="border p-3 text-left">
                                            Biaya Periksa
                                        </th>
                                        <th className="border p-3 text-left">
                                            Dokter
                                        </th>
                                        <th className="border p-3 text-left">
                                            Obat yang Diberikan
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className="text-sm">
                                    {riwayat.map((daftarPoli, index) => {
                                        const keluhan = daftarPoli.keluhan;
                                        const dokter =
                                            daftarPoli.jadwal?.dokter;
                                        const periksaData = daftarPoli.periksa;

                                        if (!periksaData) {
                                            return (
                                                <tr key={index}>
                                                    <td
                                                        colSpan={7}
                                                        className="border p-4 text-center text-gray-500"
                                                    >
                                                        Tidak ada riwayat
                                                        pemeriksaan
                                                    </td>
                                                </tr>
                                            );
                                        }

                                        return (
                                            <tr
                                                key={index}
                                                className="hover:bg-[#F3F3F3] transition-all duration-200"
                                            >
                                                <td className="border p-4">
                                                    {index + 1}
                                                </td>
                                                <td className="border p-4">
                                                    {keluhan ||
                                                        "Tidak ada keluhan"}
                                                </td>
                                                <td className="border p-4">
                                                    {periksaData.tgl_periksa ||
                                                        "Tanggal tidak tersedia"}
                                                </td>
                                                <td className="border p-4">
                                                    {periksaData.catatan ||
                                                        "Catatan tidak tersedia"}
                                                </td>
                                                <td className="border p-4">
                                                    {periksaData.biaya_periksa
                                                        ? `Rp ${new Intl.NumberFormat().format(
                                                              periksaData.biaya_periksa
                                                          )}`
                                                        : "Biaya tidak tersedia"}
                                                </td>
                                                <td className="border p-4">
                                                    {dokter
                                                        ? dokter.nama
                                                        : "Dokter tidak tersedia"}
                                                </td>
                                                <td className="border p-4">
                                                    {periksaData.detail_periksa &&
                                                    periksaData.detail_periksa
                                                        .length > 0 ? (
                                                        <ul className="list-disc list-inside">
                                                            {periksaData.detail_periksa.map(
                                                                (
                                                                    detail,
                                                                    detailIdx
                                                                ) => (
                                                                    <li
                                                                        key={
                                                                            detailIdx
                                                                        }
                                                                    >
                                                                        {detail
                                                                            .obat
                                                                            ?.nama_obat ||
                                                                            "Nama obat tidak tersedia"}{" "}
                                                                        (
                                                                        {detail
                                                                            .obat
                                                                            ?.kemasan ||
                                                                            "Kemasan tidak tersedia"}
                                                                        )
                                                                    </li>
                                                                )
                                                            )}
                                                        </ul>
                                                    ) : (
                                                        <span>
                                                            Tidak ada obat
                                                        </span>
                                                    )}
                                                </td>
                                            </tr>
                                        );
                                    })}
                                </tbody>
                            </table>
                        </div>
                    )}
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
