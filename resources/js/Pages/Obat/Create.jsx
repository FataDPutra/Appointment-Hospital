import React, { useState } from "react";
import { Inertia } from "@inertiajs/inertia";
import { IoIosArrowBack } from "react-icons/io";
import { GiMedicinePills } from "react-icons/gi";
import Sidebar from "../../Components/Sidebar";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";

const ObatCreate = ({ errors: serverErrors = {} }) => {
    const [formData, setFormData] = useState({
        nama_obat: "",
        kemasan: "",
        harga: "",
    });

    const [errors, setErrors] = useState(serverErrors);
    const [isSubmitting, setIsSubmitting] = useState(false);

    // Format Harga with Rp. (display only)
    const handleHargaChange = (e) => {
        const rawValue = e.target.value.replace(/[^0-9]/g, ""); // Remove non-numeric characters
        const formattedValue = rawValue.replace(/\B(?=(\d{3})+(?!\d))/g, "."); // Add thousands separator
        setFormData({
            ...formData,
            harga: formattedValue, // Store formatted value in state
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setIsSubmitting(true);

        // Remove the "Rp." formatting before submitting
        const numericHarga = formData.harga.replace(/\./g, ""); // Remove thousands separator

        // Send only numeric value of harga to the server
        Inertia.post(
            "/obats",
            {
                ...formData,
                harga: numericHarga,
            },
            {
                onFinish: () => setIsSubmitting(false),
                onError: (err) => setErrors(err), // Handle errors from the server
            }
        );
    };

    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-2xl font-semibold leading-tight">
                    Tambah Obat Baru
                </h2>
            }
        >
            <div className="flex">
                <Sidebar />
                <div className="container mx-auto p-6 bg-[#FBF8EF] w-full ml-0 rounded-lg shadow-lg">
                    <form onSubmit={handleSubmit}>
                        <div className="space-y-6">
                            {/* Input Nama Obat */}
                            <div>
                                <label className="block mb-2 text-[#78B3CE]">
                                    Nama Obat
                                </label>
                                <input
                                    id="nama_obat"
                                    type="text"
                                    name="nama_obat"
                                    value={formData.nama_obat}
                                    onChange={(e) =>
                                        setFormData({
                                            ...formData,
                                            nama_obat: e.target.value,
                                        })
                                    }
                                    className={`w-full border ${
                                        errors.nama_obat
                                            ? "border-red-500"
                                            : "border-[#78B3CE]"
                                    } rounded-md p-4 focus:outline-none focus:ring-2 focus:ring-[#F96E2A] transition-all`}
                                    placeholder="Masukkan nama obat"
                                    required
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
                                    id="kemasan"
                                    type="text"
                                    name="kemasan"
                                    value={formData.kemasan}
                                    onChange={(e) =>
                                        setFormData({
                                            ...formData,
                                            kemasan: e.target.value,
                                        })
                                    }
                                    className={`w-full border ${
                                        errors.kemasan
                                            ? "border-red-500"
                                            : "border-[#78B3CE]"
                                    } rounded-md p-4 focus:outline-none focus:ring-2 focus:ring-[#F96E2A] transition-all`}
                                    placeholder="Masukkan kemasan obat"
                                    required
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
                                    id="harga"
                                    type="text"
                                    name="harga"
                                    value={`Rp. ${formData.harga}`} // Display "Rp." with the value
                                    onChange={handleHargaChange}
                                    className={`w-full border ${
                                        errors.harga
                                            ? "border-red-500"
                                            : "border-[#78B3CE]"
                                    } rounded-md p-4 focus:outline-none focus:ring-2 focus:ring-[#F96E2A] transition-all`}
                                    placeholder="Masukkan harga obat"
                                    required
                                />
                                {errors.harga && (
                                    <div className="text-red-500 mt-1">
                                        {errors.harga}
                                    </div>
                                )}
                            </div>

                            <div className="mt-6 flex space-x-4">
                                {/* Back Button */}
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

                                {/* Submit Button */}
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
                                            : "Tambah Obat"}
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

export default ObatCreate;
