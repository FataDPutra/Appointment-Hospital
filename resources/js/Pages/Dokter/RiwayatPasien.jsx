import React from "react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link } from "@inertiajs/react";

export default function RiwayatPasien({ auth, pasiens }) {
    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                    Riwayat Pasien
                </h2>
            }
        >
            <Head title="Riwayat Pasien" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 bg-white border-b border-gray-200">
                            <table className="min-w-full divide-y divide-gray-200">
                                <thead>
                                    <tr>
                                        <th>No</th>
                                        <th>Nama Pasien</th>
                                        <th>No. RM</th>
                                        <th>No. KTP</th>
                                        <th>Jumlah Kunjungan</th>
                                        <th>Aksi</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {pasiens.map((pasien, index) => (
                                        <tr key={pasien.id}>
                                            <td>{index + 1}</td>
                                            <td>{pasien.nama}</td>
                                            <td>{pasien.no_rm}</td>
                                            <td>{pasien.no_ktp}</td>
                                            <td>{pasien.daftar_poli_count}</td>
                                            <td>
                                                <Link
                                                    href={route(
                                                        "riwayat-pasien.show",
                                                        pasien.id
                                                    )}
                                                    className="text-blue-500 hover:underline"
                                                >
                                                    Riwayat Lengkap
                                                </Link>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
