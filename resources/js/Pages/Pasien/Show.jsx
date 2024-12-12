import React from "react";
import { InertiaLink } from "@inertiajs/inertia-react";

const PasienShow = ({ pasien }) => {
    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4">Detail Pasien</h1>
            <div className="mb-4">
                <strong>No RM:</strong> {pasien.no_rm}
            </div>
            <div className="mb-4">
                <strong>Nama:</strong> {pasien.nama}
            </div>
            <div className="mb-4">
                <strong>No KTP:</strong> {pasien.no_ktp}
            </div>
            <div className="mb-4">
                <strong>No HP:</strong> {pasien.no_hp}
            </div>
            <div className="mb-4">
                <strong>Alamat:</strong> {pasien.alamat}
            </div>
            <InertiaLink
                href={route("pasiens.edit", pasien.id)}
                className="bg-yellow-500 text-white px-4 py-2 rounded"
            >
                Edit
            </InertiaLink>
        </div>
    );
};

export default PasienShow;
