import React, { useState } from "react";
import { useForm } from "@inertiajs/react";
import { Head } from "@inertiajs/react";
import Select from "react-select";
import { Inertia } from "@inertiajs/inertia";
import { IoIosArrowBack } from "react-icons/io";
import { TbClockPlus } from "react-icons/tb";
import Swal from "sweetalert2"; // Import SweetAlert2
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import Sidebar from "../../Components/Sidebar";

const JadwalCreate = () => {
    const { data, setData, post, errors } = useForm({
        hari: "",
        jam_mulai: "",
        jam_selesai: "",
    });

    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        setIsSubmitting(true);

        Swal.fire({
            title: "Apakah Anda yakin?",
            text: "Jadwal akan disimpan!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Ya, simpan!",
            cancelButtonText: "Batal",
            reverseButtons: true,
        }).then((result) => {
            if (result.isConfirmed) {
                post(route("jadwal.store"), {
                    onError: (err) => {
                        Swal.fire({
                            icon: "error",
                            title: "Gagal disimpan",
                            text: err.hari || err.jam_mulai || err.jam_selesai,
                        });
                    },
                    onSuccess: () => {
                        Swal.fire({
                            icon: "success",
                            title: "Berhasil",
                            text: "Jadwal berhasil disimpan!",
                        });
                    },
                    onFinish: () => setIsSubmitting(false), // Reset state after process finishes
                });
            }else {
                setIsSubmitting(false); // Reset state jika dibatalkan
            }
        });
    };

    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-2xl font-semibold leading-tight">
                    Tambah Jadwal Periksa
                </h2>
            }
        >
            <Head title="Tambah Jadwal" />
            <div className="flex">
                <Sidebar />
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
                            <div>
                                <label className="block mb-2 text-[#78B3CE]">
                                    Hari
                                </label>
                                <Select
                                    options={[
                                        { value: "Senin", label: "Senin" },
                                        { value: "Selasa", label: "Selasa" },
                                        { value: "Rabu", label: "Rabu" },
                                        { value: "Kamis", label: "Kamis" },
                                        { value: "Jumat", label: "Jumat" },
                                        { value: "Sabtu", label: "Sabtu" },
                                        { value: "Minggu", label: "Minggu" },
                                    ]}
                                    value={
                                        data.hari
                                            ? {
                                                  value: data.hari,
                                                  label: data.hari,
                                              }
                                            : null
                                    }
                                    onChange={(selectedOption) =>
                                        setData("hari", selectedOption.value)
                                    }
                                    placeholder="Pilih Hari"
                                    className="w-full border border-[#78B3CE] rounded-md p-4 focus:outline-none focus:ring-2 focus:ring-[#F96E2A] transition-all"
                                />
                                {errors.hari && (
                                    <div className="text-red-500 mt-1">
                                        {errors.hari}
                                    </div>
                                )}
                            </div>

                            <div>
                                <label className="block mb-2 text-[#78B3CE]">
                                    Jam Mulai
                                </label>
                                <input
                                    type="time"
                                    value={data.jam_mulai}
                                    onChange={(e) =>
                                        setData("jam_mulai", e.target.value)
                                    }
                                    className="w-full border border-[#78B3CE] rounded-md p-4 focus:outline-none focus:ring-2 focus:ring-[#F96E2A] transition-all"
                                />
                                {errors.jam_mulai && (
                                    <div className="text-red-500 mt-1">
                                        {errors.jam_mulai}
                                    </div>
                                )}
                            </div>

                            <div>
                                <label className="block mb-2 text-[#78B3CE]">
                                    Jam Selesai
                                </label>
                                <input
                                    type="time"
                                    value={data.jam_selesai}
                                    onChange={(e) =>
                                        setData("jam_selesai", e.target.value)
                                    }
                                    className="w-full border border-[#78B3CE] rounded-md p-4 focus:outline-none focus:ring-2 focus:ring-[#F96E2A] transition-all"
                                />
                                {errors.jam_selesai && (
                                    <div className="text-red-500 mt-1">
                                        {errors.jam_selesai}
                                    </div>
                                )}
                            </div>

                            <div className="mt-6 flex space-x-4">
                                <button
                                    type="button"
                                    onClick={() =>
                                        Inertia.visit(route("jadwal.index"))
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
                                    <TbClockPlus className="w-5 h-5" />
                                    <span className="text-lg">
                                        {isSubmitting
                                            ? "Menyimpan..."
                                            : "Tambah Jadwal"}
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

export default JadwalCreate;
