import React, { useState } from "react";
import { useForm } from "@inertiajs/react";
import { Head } from "@inertiajs/react";
import { Inertia } from "@inertiajs/inertia";
import { IoIosArrowBack } from "react-icons/io";
import { TiMessages } from "react-icons/ti";
import Swal from "sweetalert2";
import AuthenticatedLayoutPasien from "@/Layouts/AuthenticatedLayoutPasien";
import PasienSidebar from "../../Components/PasienSidebar";

const Edit = ({ konsultasi }) => {
    const { data, setData, put, processing, errors } = useForm({
        subject: konsultasi.subject,
        pertanyaan: konsultasi.pertanyaan,
    });

    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        Swal.fire({
            title: "Apakah Anda yakin?",
            text: "Konsultasi akan diubah",
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Ya, ubah!",
            cancelButtonText: "Batal",
            reverseButtons: true,
        }).then((result) => {
            if (result.isConfirmed) {
                put(route("konsultasi.update"), {
                    onError: () => {
                        Swal.fire({
                            icon: "error",
                            title: "Gagal diubah",
                            text: "Terjadi kesalahan saat mengubah konsultasi.",
                            confirmButtonText: "OK",
                        });
                    },
                    onSuccess: () => {
                        Swal.fire({
                            icon: "success",
                            title: "Berhasil",
                            text: "Konsultasi berhasil diubah!",
                            confirmButtonText: "OK",
                        });
                    },
                    onFinish: () => setIsSubmitting(false),
                });
            } else {
                setIsSubmitting(false);
            }
        });
    };

    return (
        <AuthenticatedLayoutPasien
            header={
                <h2 className="text-2xl font-semibold leading-tight">
                    Konsultasi Dokter
                </h2>
            }
        >
            <Head title="Konsultasi Dokter" />

            <div className="flex">
                <PasienSidebar />
                <div className="container mx-auto p-6 bg-[#FBF8EF] w-full ml-0 rounded-lg shadow-lg">
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
                            {/* Input Subject */}
                            <div>
                                <label className="block mb-2 text-[#78B3CE]">
                                    Subject
                                </label>
                                <input
                                    type="text"
                                    name="subject"
                                    value={data.subject}
                                    onChange={(e) =>
                                        setData("subject", e.target.value)
                                    }
                                    className={`w-full border ${
                                        errors.subject
                                            ? "border-red-500"
                                            : "border-[#78B3CE]"
                                    } rounded-md p-4 focus:outline-none focus:ring-2 focus:ring-[#F96E2A] transition-all`}
                                    placeholder="Masukkan subject"
                                />
                                {errors.subject && (
                                    <div className="text-red-500 mt-1">
                                        {errors.subject}
                                    </div>
                                )}
                            </div>

                            {/* Input Pertanyaan */}
                            <div>
                                <label className="block mb-2 text-[#78B3CE]">
                                    Pertanyaan
                                </label>
                                <textarea
                                    id="pertanyaan"
                                    value={data.pertanyaan}
                                    onChange={(e) =>
                                        setData("pertanyaan", e.target.value)
                                    }
                                    className="w-full border border-[#78B3CE] rounded-md p-4 focus:outline-none focus:ring-2 focus:ring-[#F96E2A] transition-all"
                                    placeholder="Masukkan pertanyaan pasien"
                                />
                                {errors.pertanyaan && (
                                    <div className="text-red-500 mt-1">
                                        {errors.pertanyaan}
                                    </div>
                                )}
                            </div>

                            <div className="mt-6 flex space-x-4">
                                {/* Tombol Back */}
                                <button
                                    type="button"
                                    onClick={() =>
                                        Inertia.visit(route("konsultasi.index"))
                                    }
                                    className="bg-gray-500 text-white px-5 py-2 rounded-lg shadow-md hover:bg-gray-600 flex items-center space-x-2 transition duration-200 ease-in-out"
                                >
                                    <IoIosArrowBack className="w-5 h-5" />
                                    <span className="text-lg">Kembali</span>
                                </button>

                                {/* Tombol Simpan */}
                                <button
                                    type="submit"
                                    disabled={isSubmitting}
                                    className={`bg-[#F96E2A] text-white px-5 py-2 rounded-lg shadow-md flex items-center space-x-2 transition-transform transform hover:scale-105 hover:bg-[#F96E2A]/90 duration-200 ease-in-out ${
                                        isSubmitting
                                            ? "opacity-50 cursor-not-allowed"
                                            : ""
                                    }`}
                                >
                                    <TiMessages className="w-5 h-5" />
                                    <span className="text-lg">
                                        {isSubmitting
                                            ? "Menyimpan..."
                                            : "Simpan"}
                                    </span>
                                </button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </AuthenticatedLayoutPasien>
    );
};

export default Edit;
