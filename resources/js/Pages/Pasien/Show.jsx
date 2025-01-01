import React from "react";
import { Inertia } from "@inertiajs/inertia";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import Sidebar from "../../Components/Sidebar";
import { IoIosArrowBack } from "react-icons/io";
import { Head } from "@inertiajs/react";

const PasienShow = ({ pasien }) => {
    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-2xl font-semibold leading-tight">
                    Detail Pasien
                </h2>
            }
        >
            <Head title="Detail Pasien" />
            <div className="flex">
                {/* Sidebar */}
                <Sidebar />

                {/* Konten Utama */}
                <div className="container mx-auto p-6 bg-[#FBF8EF] w-full ml-0 rounded-lg shadow-lg">
                    <div className="mb-6">
                        <h1 className="text-2xl font-bold mb-4 text-[#78B3CE]">
                            Informasi Pasien
                        </h1>
                    </div>
                    <div className="space-y-4">
                        <div>
                            <strong className="text-[#78B3CE]">No RM:</strong>{" "}
                            {pasien.no_rm}
                        </div>
                        <div>
                            <strong className="text-[#78B3CE]">Nama:</strong>{" "}
                            {pasien.nama}
                        </div>
                        <div>
                            <strong className="text-[#78B3CE]">No KTP:</strong>{" "}
                            {pasien.no_ktp}
                        </div>
                        <div>
                            <strong className="text-[#78B3CE]">No HP:</strong>{" "}
                            {pasien.no_hp}
                        </div>
                        <div>
                            <strong className="text-[#78B3CE]">Alamat:</strong>{" "}
                            {pasien.alamat}
                        </div>
                    </div>

                    {/* Tombol Back */}
                    <div className="mt-6">
                        <button
                            type="button"
                            onClick={() =>
                                Inertia.visit(route("pasiens.index"))
                            }
                            className="bg-gray-500 text-white px-5 py-2 rounded-lg shadow-md hover:bg-gray-600 flex items-center space-x-2 transition duration-200 ease-in-out"
                        >
                            <IoIosArrowBack className="w-5 h-5" />
                            <span className="text-lg">Kembali</span>
                        </button>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
};

export default PasienShow;
