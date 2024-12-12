import React from "react";
import { Inertia } from "@inertiajs/inertia";

const JadwalIndex = ({ jadwal }) => {
    // Fungsi untuk mengaktifkan jadwal
    const handleActivate = (id) => {
        if (
            window.confirm("Apakah Anda yakin ingin mengaktifkan jadwal ini?")
        ) {
            Inertia.put(`/jadwal/${id}/restore`);
        }
    };

    // Fungsi untuk menonaktifkan jadwal
    const handleDeactivate = (id) => {
        if (
            window.confirm("Apakah Anda yakin ingin menonaktifkan jadwal ini?")
        ) {
            Inertia.delete(`/jadwal/${id}`);
        }
    };

    return (
        <div>
            <h1>Daftar Jadwal Periksa</h1>

            {/* Tombol untuk menambah jadwal baru */}
            <button
                onClick={() => Inertia.get("/jadwal/create")}
                className="btn btn-primary mb-4"
            >
                Tambah Jadwal
            </button>

            <table>
                <thead>
                    <tr>
                        <th>Hari</th>
                        <th>Jam Mulai</th>
                        <th>Jam Selesai</th>
                        <th>Status</th>
                        <th>Aksi</th>
                    </tr>
                </thead>
                <tbody>
                    {jadwal.map((item) => (
                        <tr key={item.id}>
                            <td>{item.hari}</td>
                            <td>{item.jam_mulai}</td>
                            <td>{item.jam_selesai}</td>
                            <td>{item.deleted_at ? "Nonaktif" : "Aktif"}</td>
                            <td>
                                {/* Tombol untuk mengaktifkan dan menonaktifkan jadwal */}
                                {item.deleted_at ? (
                                    <button
                                        onClick={() => handleActivate(item.id)}
                                    >
                                        Aktifkan
                                    </button>
                                ) : (
                                    <button
                                        onClick={() =>
                                            handleDeactivate(item.id)
                                        }
                                    >
                                        Nonaktifkan
                                    </button>
                                )}
                                {/* Tombol Edit */}
                                <button
                                    onClick={() =>
                                        Inertia.get(`/jadwal/${item.id}/edit`)
                                    }
                                    className="btn btn-secondary ml-2"
                                >
                                    Edit
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default JadwalIndex;
