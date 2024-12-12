import React from "react";
import { InertiaLink } from "@inertiajs/inertia-react";

const Riwayat = ({ riwayat }) => {
    console.log(riwayat); // Debugging untuk melihat struktur data

    return (
        <div className="container mx-auto p-6">
            <h1 className="text-3xl font-semibold mb-6">Detail Riwayat</h1>

            <div className="bg-white p-6 rounded-lg shadow-md">
                <h2 className="text-xl font-semibold mb-4">
                    Informasi Pemeriksaan
                </h2>
                <p>
                    <strong>Poli:</strong>{" "}
                    {riwayat.jadwal?.dokter?.poli?.nama_poli || "N/A"}
                </p>
                <p>
                    <strong>Dokter:</strong>{" "}
                    {riwayat.jadwal?.dokter?.nama || "N/A"}
                </p>
                <p>
                    <strong>Hari:</strong> {riwayat.jadwal?.hari || "N/A"}
                </p>
                <p>
                    <strong>Jam:</strong> {riwayat.jadwal?.jam_mulai} -{" "}
                    {riwayat.jadwal?.jam_selesai}
                </p>
                <p>
                    <strong>Nomor Antrian:</strong> {riwayat.no_antrian}
                </p>

                <h2 className="text-xl font-semibold mt-6 mb-4">
                    Keluhan Pasien
                </h2>
                <p>{riwayat.keluhan || "Tidak ada keluhan."}</p>

                <h2 className="text-xl font-semibold mt-6 mb-4">
                    Hasil Pemeriksaan
                </h2>
                <p>
                    <strong>Tanggal Periksa:</strong>{" "}
                    {riwayat.periksa?.tgl_periksa || "N/A"}
                </p>
                <p>
                    <strong>Catatan:</strong>{" "}
                    {riwayat.periksa?.catatan || "Tidak ada catatan"}
                </p>
                <p>
                    <strong>Biaya Periksa:</strong> Rp{" "}
                    {riwayat.periksa?.biaya_periksa || "0"}
                </p>

                <h2 className="text-xl font-semibold mt-6 mb-4">
                    Obat yang Diberikan
                </h2>
                <ul className="list-disc pl-5">
                    {riwayat.periksa?.detail_periksa?.length > 0 ? (
                        riwayat.periksa.detail_periksa.map((detail, index) => (
                            <li key={detail.id}>
                                {detail.obat?.nama_obat || "N/A"} -{" "}
                                {detail.obat?.kemasan || "N/A"} - Rp{" "}
                                {detail.obat?.harga || "0"}
                            </li>
                        ))
                    ) : (
                        <li>Tidak ada obat yang diberikan.</li>
                    )}
                </ul>

                <InertiaLink
                    href={route("daftar-poli.index")}
                    className="mt-6 inline-block bg-blue-600 text-white px-4 py-2 rounded-md shadow-md hover:bg-blue-700"
                >
                    Kembali
                </InertiaLink>
            </div>
        </div>
    );
};

export default Riwayat;
