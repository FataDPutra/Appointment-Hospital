import React, { useState } from "react";
import { Inertia } from "@inertiajs/inertia";
import { IoIosArrowBack } from "react-icons/io";
import Sidebar from "../../Components/Sidebar";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";

const PoliCreate = ({ errors: serverErrors = {} }) => {
    const [formData, setFormData] = useState({
        nama_poli: "",
        keterangan: "",
    });

    const [errors, setErrors] = useState(serverErrors);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        setIsSubmitting(true);

        Inertia.post("/polis", formData, {
            onFinish: () => setIsSubmitting(false),
            onError: (err) => setErrors(err), // Handle errors from server
        });
    };

    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-2xl font-semibold leading-tight">
                    Tambah Poli Baru
                </h2>
            }
        >
            <Head title="Tambah Poli" />

            <div className="flex">
                <Sidebar />
                <div className="container mx-auto p-6 bg-[#FBF8EF] w-full ml-0 rounded-lg shadow-lg">
                    <form onSubmit={handleSubmit}>
                        <div className="space-y-6">
                            {/* Input Nama Poli */}
                            <div>
                                <label className="block mb-2 text-[#78B3CE]">
                                    Nama Poli
                                </label>
                                <input
                                    id="nama_poli"
                                    type="text"
                                    name="nama_poli"
                                    value={formData.nama_poli}
                                    onChange={(e) =>
                                        setFormData({
                                            ...formData,
                                            nama_poli: e.target.value,
                                        })
                                    }
                                    className={`w-full border ${
                                        errors.nama_poli
                                            ? "border-red-500"
                                            : "border-[#78B3CE]"
                                    } rounded-md p-4 focus:outline-none focus:ring-2 focus:ring-[#F96E2A] transition-all`}
                                    placeholder="Masukkan nama poli"
                                    required
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
                                    id="keterangan"
                                    name="keterangan"
                                    value={formData.keterangan}
                                    onChange={(e) =>
                                        setFormData({
                                            ...formData,
                                            keterangan: e.target.value,
                                        })
                                    }
                                    className={`w-full border ${
                                        errors.keterangan
                                            ? "border-red-500"
                                            : "border-[#78B3CE]"
                                    } rounded-md p-4 focus:outline-none focus:ring-2 focus:ring-[#F96E2A] transition-all`}
                                    placeholder="Masukkan keterangan poli"
                                    required
                                />
                                {errors.keterangan && (
                                    <div className="text-red-500 mt-1">
                                        {errors.keterangan}
                                    </div>
                                )}
                            </div>

                            <div className="mt-6 flex space-x-4">
                                {/* Back Button */}
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
                                    <span className="text-lg">
                                        {isSubmitting
                                            ? "Menyimpan..."
                                            : "Tambah Poli"}
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

export default PoliCreate;
