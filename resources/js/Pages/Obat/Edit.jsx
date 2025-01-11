import React, { useState } from "react";
import { useForm } from "@inertiajs/react";
import { Head } from "@inertiajs/react";
import Swal from "sweetalert2";
import { Inertia } from "@inertiajs/inertia";
import { IoIosArrowBack } from "react-icons/io";
import { GiMedicinePills } from "react-icons/gi";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import Sidebar from "../../Components/Sidebar";

const ObatEdit = ({ obat }) => {
    const { data, setData, put, errors } = useForm({
        nama_obat: obat.nama_obat || "",
        kemasan: obat.kemasan || "",
        harga: obat.harga || "",
    });

    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleHargaChange = (e) => {
        const rawValue = e.target.value.replace(/[^0-9]/g, ""); // Remove non-numeric characters
        setData("harga", rawValue);
    };

    const formatHarga = (value) =>
        `Rp. ${value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")}`; // Add thousands separator

    const handleSubmit = (e) => {
        e.preventDefault();
        setIsSubmitting(true);

        Swal.fire({
            title: "Apakah Anda yakin?",
            text: "Data obat ini akan diperbarui!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Ya, perbarui!",
            cancelButtonText: "Batal",
            reverseButtons: true,
        }).then((result) => {
            if (result.isConfirmed) {
                put(route("obats.update", obat.id), {
                    onError: (err) => {
                        Swal.fire({
                            icon: "error",
                            title: "Gagal diperbarui",
                            text: err.nama_obat || err.kemasan || err.harga,
                        });
                    },
                    onSuccess: () => {
                        Swal.fire({
                            icon: "success",
                            title: "Berhasil",
                            text: "Data obat berhasil diperbarui!",
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
                    Edit Obat
                </h2>
            }
        >
            <Head title="Edit Obat" />

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
                            {/* Input Nama Obat */}
                            <div>
                                <label className="block mb-2 text-[#78B3CE]">
                                    Nama Obat
                                </label>
                                <input
                                    type="text"
                                    name="nama_obat"
                                    value={data.nama_obat}
                                    onChange={(e) =>
                                        setData("nama_obat", e.target.value)
                                    }
                                    className={`w-full border ${
                                        errors.nama_obat
                                            ? "border-red-500"
                                            : "border-[#78B3CE]"
                                    } rounded-md p-4 focus:outline-none focus:ring-2 focus:ring-[#F96E2A] transition-all`}
                                    placeholder="Masukkan nama obat"
                                />
                                {errors.nama_obat && (
                                    <div className="text-red-500 mt-1">
                                        {errors.nama_obat}
                                    </div>
                                )}
                            </div>

                            {/* Input Kemasan */}
                            <div>
                                <label className="block mb-2 text-[#78B3CE]">
                                    Kemasan
                                </label>
                                <input
                                    type="text"
                                    name="kemasan"
                                    value={data.kemasan}
                                    onChange={(e) =>
                                        setData("kemasan", e.target.value)
                                    }
                                    className={`w-full border ${
                                        errors.kemasan
                                            ? "border-red-500"
                                            : "border-[#78B3CE]"
                                    } rounded-md p-4 focus:outline-none focus:ring-2 focus:ring-[#F96E2A] transition-all`}
                                    placeholder="Masukkan kemasan obat"
                                />
                                {errors.kemasan && (
                                    <div className="text-red-500 mt-1">
                                        {errors.kemasan}
                                    </div>
                                )}
                            </div>

                            {/* Input Harga */}
                            <div>
                                <label className="block mb-2 text-[#78B3CE]">
                                    Harga
                                </label>
                                <input
                                    type="text"
                                    name="harga"
                                    value={formatHarga(data.harga)}
                                    onChange={handleHargaChange}
                                    className={`w-full border ${
                                        errors.harga
                                            ? "border-red-500"
                                            : "border-[#78B3CE]"
                                    } rounded-md p-4 focus:outline-none focus:ring-2 focus:ring-[#F96E2A] transition-all`}
                                    placeholder="Masukkan harga obat"
                                />
                                {errors.harga && (
                                    <div className="text-red-500 mt-1">
                                        {errors.harga}
                                    </div>
                                )}
                            </div>

                            <div className="mt-6 flex space-x-4">
                                {/* Tombol Kembali */}
                                <button
                                    type="button"
                                    onClick={() =>
                                        Inertia.visit(route("obats.index"))
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
                                    <GiMedicinePills className="w-5 h-5" />
                                    <span className="text-lg">
                                        {isSubmitting
                                            ? "Menyimpan..."
                                            : "Update Obat"}
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

export default ObatEdit;
