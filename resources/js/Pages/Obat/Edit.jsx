import React, { useState } from "react";
import { Inertia } from "@inertiajs/inertia";
import { GiMedicinePills } from "react-icons/gi";
import { IoIosArrowBack } from "react-icons/io";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import Sidebar from "../../Components/Sidebar";
import Swal from "sweetalert2";

const ObatEdit = ({ obat }) => {
    if (!obat) {
        return <div>Loading...</div>;
    }

    // Initialize state for form data and original data
    const [formData, setFormData] = useState({
        nama_obat: obat.nama_obat || "",
        kemasan: obat.kemasan || "",
        harga: obat.harga || "",
    });

    const originalData = {
        nama_obat: obat.nama_obat || "",
        kemasan: obat.kemasan || "",
        harga: obat.harga || "",
    };

    const [errors, setErrors] = useState({});

    // Update form data on input change
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    // Submit handler
    const handleSubmit = (e) => {
        e.preventDefault();

        // Check if the form data is different from the original data
        const hasChanges = Object.keys(formData).some(
            (key) => formData[key] !== originalData[key]
        );

        if (!hasChanges) {
            Swal.fire({
                icon: "info",
                title: "Tidak ada perubahan",
                text: "Data tidak berubah, tidak ada yang disimpan.",
            });
            return;
        }

        // Confirm before submission
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
                Inertia.put(`/obats/${obat.id}`, formData, {
                    onSuccess: () => {
                        Swal.fire(
                            "Berhasil!",
                            "Data obat berhasil diperbarui.",
                            "success"
                        );
                    },
                    onError: (errors) => {
                        setErrors(errors);
                    },
                });
            }
        });
    };

    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-2xl font-semibold leading-tight text-gray-800">
                    Edit Obat
                </h2>
            }
        >
            <div className="flex">
                <Sidebar />
                <div className="container mx-auto p-6 bg-[#FBF8EF] w-full ml-0 rounded-lg shadow-lg">
                    {/* Display global error messages */}
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
                            <div>
                                <label className="block mb-2 text-[#78B3CE]">
                                    Nama Obat
                                </label>
                                <input
                                    type="text"
                                    name="nama_obat"
                                    value={formData.nama_obat}
                                    onChange={handleChange}
                                    className="w-full border border-[#78B3CE] rounded-md p-4 focus:outline-none focus:ring-2 focus:ring-[#F96E2A] transition-all"
                                    placeholder="Masukkan nama obat"
                                />
                                {errors.nama_obat && (
                                    <div className="text-red-500 mt-1">
                                        {errors.nama_obat}
                                    </div>
                                )}
                            </div>

                            <div>
                                <label className="block mb-2 text-[#78B3CE]">
                                    Kemasan
                                </label>
                                <input
                                    type="text"
                                    name="kemasan"
                                    value={formData.kemasan}
                                    onChange={handleChange}
                                    className="w-full border border-[#78B3CE] rounded-md p-4 focus:outline-none focus:ring-2 focus:ring-[#F96E2A] transition-all"
                                    placeholder="Masukkan kemasan obat"
                                />
                                {errors.kemasan && (
                                    <div className="text-red-500 mt-1">
                                        {errors.kemasan}
                                    </div>
                                )}
                            </div>

                            <div>
                                <label className="block mb-2 text-[#78B3CE]">
                                    Harga
                                </label>
                                <input
                                    type="text"
                                    name="harga"
                                    value={formData.harga}
                                    onChange={handleChange}
                                    className="w-full border border-[#78B3CE] rounded-md p-4 focus:outline-none focus:ring-2 focus:ring-[#F96E2A] transition-all"
                                    placeholder="Masukkan harga obat"
                                />
                                {errors.harga && (
                                    <div className="text-red-500 mt-1">
                                        {errors.harga}
                                    </div>
                                )}
                            </div>

                            <div className="mt-6 flex space-x-4">
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

                                <button
                                    type="submit"
                                    className="bg-[#F96E2A] text-white px-5 py-2 rounded-lg shadow-md flex items-center space-x-2 transition-transform transform hover:scale-105 hover:bg-[#F96E2A]/90 duration-200 ease-in-out"
                                >
                                    <GiMedicinePills className="w-5 h-5" />
                                    <span className="text-lg">Update Obat</span>
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
