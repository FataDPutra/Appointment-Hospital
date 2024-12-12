import React from "react";
import { Inertia } from "@inertiajs/inertia";
import { InertiaLink } from "@inertiajs/inertia-react";

const Index = ({ obats }) => {
    const handleDelete = (id) => {
        if (confirm("Apakah Anda yakin ingin menghapus obat ini?")) {
            Inertia.delete(`/obats/${id}`);
        }
    };

    return (
        <div>
            <h1>Daftar Obat</h1>
            <InertiaLink href="/obats/create" className="btn btn-primary">
                Tambah Obat
            </InertiaLink>
            <table>
                <thead>
                    <tr>
                        <th>Nama Obat</th>
                        <th>Kemasan</th>
                        <th>Harga</th>
                        <th>Aksi</th>
                    </tr>
                </thead>
                <tbody>
                    {obats.map((obat) => (
                        <tr key={obat.id}>
                            <td>{obat.nama_obat}</td>
                            <td>{obat.kemasan}</td>
                            <td>{obat.harga}</td>
                            <td>
                                <InertiaLink
                                    href={`/obats/${obat.id}/edit`}
                                    className="btn btn-warning"
                                >
                                    Edit
                                </InertiaLink>
                                <button
                                    onClick={() => handleDelete(obat.id)}
                                    className="btn btn-danger"
                                    style={{ marginLeft: "5px" }}
                                >
                                    Hapus
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default Index;
