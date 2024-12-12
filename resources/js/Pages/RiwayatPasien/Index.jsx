import React from "react";
import { Link } from "@inertiajs/inertia-react";

export default function Index({ pasiens }) {
    return (
        <div>
            <h1>Riwayat Pasien</h1>
            <table className="table">
                <thead>
                    <tr>
                        <th>Nama Pasien</th>
                        <th>No. KTP</th>
                        <th>No. HP</th>
                        <th>Riwayat Lengkap</th>
                    </tr>
                </thead>
                <tbody>
                    {pasiens.map((pasien) => (
                        <tr key={pasien.id}>
                            <td>{pasien.nama}</td>
                            <td>{pasien.no_ktp}</td>
                            <td>{pasien.no_hp}</td>
                            <td>
                                <Link
                                    href={route(
                                        "riwayat-pasien.show",
                                        pasien.id
                                    )}
                                    className="btn btn-primary"
                                >
                                    Riwayat Lengkap
                                </Link>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
