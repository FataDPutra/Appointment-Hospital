import React from "react";
import { useForm } from "@inertiajs/react";
import { Head } from "@inertiajs/react";
import Select from "react-select";
import Swal from "sweetalert2";
import { Inertia } from "@inertiajs/inertia";
import { useState } from "react";
import { IoIosArrowBack } from "react-icons/io";
import { FaUserEdit } from "react-icons/fa";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import Sidebar from "../../Components/Sidebar";

const EditDokter = ({ dokter, poli }) => {
    const { data, setData, put, errors } = useForm({
        nama: dokter.nama || "",
        alamat: dokter.alamat || "",
        no_hp: dokter.no_hp || "",
        id_poli: dokter.id_poli || "",
        email: dokter.email || "",
        password: "", // Kosongkan password jika tidak ingin diubah
    });

    const [isSubmitting, setIsSubmitting] = useState(false);

    const poliOptions = poli.map((p) => ({
        value: p.id,
        label: p.nama_poli,
    }));

    const handleSubmit = (e) => {
        e.preventDefault();
        setIsSubmitting(true);

        Swal.fire({
            title: "Apakah Anda yakin?",
            text: "Data dokter ini akan diperbarui!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Ya, perbarui!",
            cancelButtonText: "Batal",
            reverseButtons: true,
        }).then((result) => {
            if (result.isConfirmed) {
                put(route("dokter.update", dokter.id), {
                    onError: (err) => {
                        Swal.fire({
                            icon: "error",
                            title: "Gagal diperbarui",
                            text:
                                err.nama ||
                                err.password ||
                                err.email ||
                                err.no_hp ||
                                err.alamat ||
                                err.id_poli,
                        });
                    },
                    onSuccess: () => {
                        Swal.fire({
                            icon: "success",
                            title: "Berhasil",
                            text: "Data dokter berhasil diperbarui!",
                        });
                    },
                    onFinish: () => setIsSubmitting(false),
                });
            } else {
                setIsSubmitting(false); // Reset if cancelled
            }
        });
    };

    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-2xl font-semibold leading-tight">
                    Edit Dokter
                </h2>
            }
        >
            <Head title="Edit Dokter" />

            <div className="flex">
                <Sidebar />
                <div className="container mx-auto p-6 bg-[#FBF8EF] w-full ml-0 rounded-lg shadow-lg">
                    {/* Pesan Error */}
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
                                    placeholder="Masukkan nama dokter"
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
                                <textarea
                                    value={data.alamat}
                                    onChange={(e) =>
                                        setData("alamat", e.target.value)
                                    }
                                    className="w-full border border-[#78B3CE] rounded-md p-4 focus:outline-none focus:ring-2 focus:ring-[#F96E2A] transition-all"
                                    placeholder="Masukkan alamat dokter"
                                />
                                {errors.alamat && (
                                    <div className="text-red-500 mt-1">
                                        {errors.alamat}
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
                                    placeholder="Masukkan nomor HP dokter"
                                />
                                {errors.no_hp && (
                                    <div className="text-red-500 mt-1">
                                        {errors.no_hp}
                                    </div>
                                )}
                            </div>

                            {/* Input Poli */}
                            <div>
                                <label className="block mb-2 text-[#78B3CE]">
                                    Poli
                                </label>
                                <Select
                                    options={poliOptions}
                                    value={poliOptions.find(
                                        (option) =>
                                            option.value === data.id_poli
                                    )}
                                    onChange={(option) =>
                                        setData("id_poli", option?.value || "")
                                    }
                                    isClearable
                                    placeholder="Pilih Poli"
                                />
                                {errors.id_poli && (
                                    <div className="text-red-500 mt-1">
                                        {errors.id_poli}
                                    </div>
                                )}
                            </div>

                            {/* Input Email */}
                            <div>
                                <label className="block mb-2 text-[#78B3CE]">
                                    Email
                                </label>
                                <input
                                    type="email"
                                    value={data.email}
                                    onChange={(e) =>
                                        setData("email", e.target.value)
                                    }
                                    className="w-full border border-[#78B3CE] rounded-md p-4 focus:outline-none focus:ring-2 focus:ring-[#F96E2A] transition-all"
                                    placeholder="Masukkan email dokter"
                                />
                                {errors.email && (
                                    <div className="text-red-500 mt-1">
                                        {errors.email}
                                    </div>
                                )}
                            </div>

                            {/* Input Password */}
                            <div>
                                <label className="block mb-2 text-[#78B3CE]">
                                    Password
                                </label>
                                <input
                                    type="password"
                                    value={data.password}
                                    onChange={(e) =>
                                        setData("password", e.target.value)
                                    }
                                    className="w-full border border-[#78B3CE] rounded-md p-4 focus:outline-none focus:ring-2 focus:ring-[#F96E2A] transition-all"
                                    placeholder="Biarkan kosong jika tidak ingin diubah"
                                />
                                {errors.password && (
                                    <div className="text-red-500 mt-1">
                                        {errors.password}
                                    </div>
                                )}
                            </div>

                            {/* Tombol Aksi */}
                            <div className="mt-6 flex space-x-4">
                                <button
                                    type="button"
                                    onClick={() =>
                                        Inertia.visit(route("dokter.index"))
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
                                    <FaUserEdit className="w-5 h-5" />
                                    <span className="text-lg">
                                        {isSubmitting
                                            ? "Menyimpan..."
                                            : "Update Dokter"}
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

export default EditDokter;
