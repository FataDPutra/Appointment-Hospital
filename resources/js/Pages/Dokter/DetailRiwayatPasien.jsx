import React from "react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";

export default function DetailRiwayatPasien({ auth, riwayatPemeriksaan }) {
    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                    Detail Riwayat Pasien
                </h2>
            }
        >
            <Head title="Detail Riwayat Pasien" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    {riwayatPemeriksaan.length > 0 ? (
                        <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                            <div className="p-6 bg-white border-b border-gray-200">
                                <h3 className="text-lg font-semibold mb-4">
                                    Nama Pasien:{" "}
                                    {riwayatPemeriksaan[0].pasien.nama}
                                </h3>
                                <table className="min-w-full divide-y divide-gray-200">
                                    <thead>
                                        <tr>
                                            <th>Tanggal Periksa</th>
                                            <th>Dokter</th>
                                            <th>Keluhan</th>
                                            <th>Catatan</th>
                                            <th>Obat</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {riwayatPemeriksaan.map((item) => (
                                            <tr key={item.id}>
                                                <td>
                                                    {item.periksa
                                                        ? new Date(
                                                              item.periksa.tgl_periksa
                                                          ).toLocaleDateString()
                                                        : "Belum diperiksa"}
                                                </td>
                                                <td>
                                                    {item.jadwal.dokter.nama}
                                                </td>
                                                <td>{item.keluhan}</td>
                                                <td>
                                                    {item.periksa
                                                        ? item.periksa.catatan
                                                        : "Tidak ada catatan"}
                                                </td>
                                                <td>
                                                    {item.periksa &&
                                                    item.periksa.detail_periksa
                                                        .length > 0
                                                        ? item.periksa.detail_periksa
                                                              .map(
                                                                  (detail) =>
                                                                      detail
                                                                          .obat
                                                                          .nama_obat
                                                              )
                                                              .join(", ")
                                                        : "Tidak ada obat"}
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    ) : (
                        <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg p-6">
                            <p>
                                Tidak ada riwayat pemeriksaan untuk pasien ini.
                            </p>
                        </div>
                    )}
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
