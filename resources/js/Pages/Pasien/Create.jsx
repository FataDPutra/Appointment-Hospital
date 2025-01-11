import React, { useState } from "react";
import { useForm } from "@inertiajs/react";
import { Head } from "@inertiajs/react";
import { IoIosArrowBack } from "react-icons/io";
import { FaUserPlus } from "react-icons/fa";
import { Inertia } from "@inertiajs/inertia";
import Swal from "sweetalert2";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import Sidebar from "../../Components/Sidebar";

const CreatePasien = () => {
    const { data, setData, post, errors } = useForm({
        nama: "",
        alamat: "",
        no_ktp: "",
        no_hp: "",
    });

    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        setIsSubmitting(true);

        Swal.fire({
            title: "Apakah Anda yakin?",
            text: "Data pasien akan disimpan!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Ya, simpan!",
            cancelButtonText: "Batal",
            reverseButtons: true,
        }).then((result) => {
            if (result.isConfirmed) {
                post(route("pasiens.store"), {
                    onError: (err) => {
                        Swal.fire({
                            icon: "error",
                            title: "Gagal disimpan",
                            text:
                                err.nama ||
                                err.no_ktp ||
                                err.no_hp ||
                                err.alamat,
                        });
                    },
                    onSuccess: () => {
                        Swal.fire({
                            icon: "success",
                            title: "Berhasil",
                            text: "Data pasien berhasil disimpan!",
                        });
                    },
                    onFinish: () => setIsSubmitting(false), // Reset state after process finishes
                });
            }
        });
    };

    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-2xl font-semibold leading-tight">
                    Tambah Pasien Baru
                </h2>
            }
        >
            <Head title="Tambah Pasien Baru" />
            <div className="flex">
                <Sidebar />
                <div className="container mx-auto p-6 bg-[#FBF8EF] w-full ml-0 rounded-lg shadow-lg">
                    {/* Pesan Error Global */}
                    {Object.keys(errors).length > 0 && (
                        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4">
                            <strong className="font-bold">
                                Terjadi kesalahan!
                            </strong>
                            <ul className="list-disc pl-5">
                                {Object.values(errors).map((error, index) => (
                                    <li key={index}>{error}</li>
                                ))}
                            </ul>
                        </div>
                    )}

                    <form onSubmit={handleSubmit}>
                        <div className="space-y-6">
                            {/* Input Nama */}
                            <div>
                                <label className="block mb-2 text-[#78B3CE]">
                                    Nama
                                </label>
                                <input
                                    type="text"
                                    value={data.nama}
                                    onChange={(e) =>
                                        setData("nama", e.target.value)
                                    }
                                    className="w-full border border-[#78B3CE] rounded-md p-4 focus:outline-none focus:ring-2 focus:ring-[#F96E2A] transition-all"
                                    placeholder="Masukkan nama pasien"
                                />
                                {errors.nama && (
                                    <div className="text-red-500 mt-1">
                                        {errors.nama}
                                    </div>
                                )}
                            </div>

                            {/* Input Alamat */}
                            <div>
                                <label className="block mb-2 text-[#78B3CE]">
                                    Alamat
                                </label>
                                <input
                                    type="text"
                                    value={data.alamat}
                                    onChange={(e) =>
                                        setData("alamat", e.target.value)
                                    }
                                    className="w-full border border-[#78B3CE] rounded-md p-4 focus:outline-none focus:ring-2 focus:ring-[#F96E2A] transition-all"
                                    placeholder="Masukkan alamat pasien"
                                />
                                {errors.alamat && (
                                    <div className="text-red-500 mt-1">
                                        {errors.alamat}
                                    </div>
                                )}
                            </div>

                            {/* Input No KTP */}
                            <div>
                                <label className="block mb-2 text-[#78B3CE]">
                                    No KTP
                                </label>
                                <input
                                    type="text"
                                    value={data.no_ktp}
                                    onChange={(e) =>
                                        setData(
                                            "no_ktp",
                                            e.target.value.replace(/\D/g, "")
                                        )
                                    }
                                    className="w-full border border-[#78B3CE] rounded-md p-4 focus:outline-none focus:ring-2 focus:ring-[#F96E2A] transition-all"
                                    placeholder="Masukkan nomor KTP pasien"
                                />
                                {errors.no_ktp && (
                                    <div className="text-red-500 mt-1">
                                        {errors.no_ktp}
                                    </div>
                                )}
                            </div>

                            {/* Input No HP */}
                            <div>
                                <label className="block mb-2 text-[#78B3CE]">
                                    No HP
                                </label>
                                <input
                                    type="text"
                                    value={data.no_hp}
                                    onChange={(e) =>
                                        setData(
                                            "no_hp",
                                            e.target.value.replace(/\D/g, "")
                                        )
                                    }
                                    className="w-full border border-[#78B3CE] rounded-md p-4 focus:outline-none focus:ring-2 focus:ring-[#F96E2A] transition-all"
                                    placeholder="Masukkan nomor HP pasien"
                                />
                                {errors.no_hp && (
                                    <div className="text-red-500 mt-1">
                                        {errors.no_hp}
                                    </div>
                                )}
                            </div>

                            {/* Tombol Aksi */}
                            <div className="mt-6 flex space-x-4">
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
                                <button
                                    type="submit"
                                    disabled={isSubmitting}
                                    className={`bg-[#F96E2A] text-white px-5 py-2 rounded-lg shadow-md flex items-center space-x-2 transition-transform transform hover:scale-105 hover:bg-[#F96E2A]/90 duration-200 ease-in-out ${
                                        isSubmitting
                                            ? "opacity-50 cursor-not-allowed"
                                            : ""
                                    }`}
                                >
                                    <FaUserPlus className="w-5 h-5" />
                                    <span className="text-lg">
                                        {isSubmitting
                                            ? "Menyimpan..."
                                            : "Tambah Pasien"}
                                    </span>
                                </button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </AuthenticatedLayout>
    );
};

export default CreatePasien;
