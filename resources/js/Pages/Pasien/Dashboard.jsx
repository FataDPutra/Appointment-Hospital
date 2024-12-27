import React from "react";
import AuthenticatedLayoutPasien from "../../Layouts/AuthenticatedLayoutPasien";
import PasienSidebar from "../../Components/PasienSidebar";
import { useForm } from "@inertiajs/react";

export default function Dashboard({ pasien }) {
    const { post } = useForm();

    const logout = (e) => {
        e.preventDefault();
        post(route("pasien.logout"));
    };

    return (
        <AuthenticatedLayoutPasien
            header={
                <h2 className="text-2xl font-semibold leading-tight text-gray-800">
                    Dashboard Pasien
                </h2>
            }
        >
            <div className="flex">
                {/* Sidebar Pasien */}
                <PasienSidebar />

                <div className="container mx-auto p-6 ml-0 bg-[#FBF8EF] rounded-lg shadow-lg w-full">
                    <h1 className="text-2xl font-bold text-[#475860]">
                        Selamat Datang, {pasien.nama}
                    </h1>
                    <p className="text-lg text-[#475860] mt-2">
                        Nomor Rekam Medis Anda: {pasien.no_rm}
                    </p>
                </div>
            </div>
        </AuthenticatedLayoutPasien>
    );
}
