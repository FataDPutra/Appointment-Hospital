import React, { useState } from "react";
import { useForm } from "@inertiajs/react";
import { Head } from "@inertiajs/react";
import { Inertia } from "@inertiajs/inertia";
import Swal from "sweetalert2";
import { IoIosArrowBack } from "react-icons/io";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import Sidebar from "../../Components/Sidebar";
import { TbHomeEdit } from "react-icons/tb";

const PoliEdit = ({ poli }) => {
    const { data, setData, put, errors } = useForm({
        nama_poli: poli.nama_poli || "",
        keterangan: poli.keterangan || "",
    });

    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setData(name, value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setIsSubmitting(true);

        Swal.fire({
            title: "Apakah Anda yakin?",
            text: "Data poli ini akan diperbarui!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Ya, perbarui!",
            cancelButtonText: "Batal",
            reverseButtons: true,
        }).then((result) => {
            if (result.isConfirmed) {
                put(route("polis.update", poli.id), {
                    onError: (err) => {
                        Swal.fire({
                            icon: "error",
                            title: "Gagal diperbarui",
                            text: err.nama_poli || err.keterangan,
                        });
                    },
                    onSuccess: () => {
                        Swal.fire({
                            icon: "success",
                            title: "Berhasil",
                            text: "Data poli berhasil diperbarui!",
                        });
                    },
                    onFinish: () => setIsSubmitting(false),
                });
            } else {
                setIsSubmitting(false); // Reset state jika dibatalkan
            }
        });
    };

    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-2xl font-semibold leading-tight">
                    Edit Poli
                </h2>
            }
        >
            <Head title="Edit Poli" />

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
                            {/* Input Nama Poli */}
                            <div>
                                <label className="block mb-2 text-[#78B3CE]">
                                    Nama Poli
                                </label>
                                <input
                                    type="text"
                                    name="nama_poli"
                                    value={data.nama_poli}
                                    onChange={handleChange}
                                    className="w-full border border-[#78B3CE] rounded-md p-4 focus:outline-none focus:ring-2 focus:ring-[#F96E2A] transition-all"
                                    placeholder="Masukkan nama poli"
                                />
                                {errors.nama_poli && (
                                    <div className="text-red-500 mt-1">
                                        {errors.nama_poli}
                                    </div>
                                )}
                            </div>

                            {/* Input Keterangan */}
                            <div>
                                <label className="block mb-2 text-[#78B3CE]">
                                    Keterangan
                                </label>
                                <textarea
                                    name="keterangan"
                                    value={data.keterangan}
                                    onChange={handleChange}
                                    className="w-full border border-[#78B3CE] rounded-md p-4 focus:outline-none focus:ring-2 focus:ring-[#F96E2A] transition-all"
                                    placeholder="Masukkan keterangan poli"
                                />
                                {errors.keterangan && (
                                    <div className="text-red-500 mt-1">
                                        {errors.keterangan}
                                    </div>
                                )}
                            </div>

                            {/* Tombol Aksi */}
                            <div className="mt-6 flex space-x-4">
                                <button
                                    type="button"
                                    onClick={() =>
                                        Inertia.visit(route("polis.index"))
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
                                    <TbHomeEdit className="w-5 h-5" />
                                    <span className="text-lg">
                                        {isSubmitting
                                            ? "Menyimpan..."
                                            : "Update Poli"}
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

export default PoliEdit;
