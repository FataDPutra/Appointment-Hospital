import React, { useState } from "react";
import { useForm } from "@inertiajs/react";
import { Inertia } from "@inertiajs/inertia";
import { IoIosArrowBack } from "react-icons/io";
import { FaSuitcaseMedical } from "react-icons/fa6";
import Select from "react-select";
import makeAnimated from "react-select/animated";
import Swal from "sweetalert2"; // Import SweetAlert2
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import Sidebar from "../../Components/Sidebar";

// Misalnya 'obat' berisi array objek {id, nama_obat, harga}
const animatedComponents = makeAnimated();

const PeriksaEdit = ({ periksa, obat, detailPeriksa }) => {
    console.log(detailPeriksa);
    const { data, setData, put, errors } = useForm({
        catatan: periksa.catatan || "",
        obat: detailPeriksa.map((item) => item.id_obat) || [],
    });

    // Menyusun opsi obat dalam format yang diperlukan oleh react-select
    const obatOptions = obat.map((item) => ({
        value: item.id,
        label: `${item.nama_obat} - Rp. ${item.harga}`,
    }));

    const handleSubmit = (e) => {
        e.preventDefault();

        // Menampilkan SweetAlert2 Konfirmasi
        Swal.fire({
            title: "Apakah Anda yakin?",
            text: "Data yang Anda ubah akan disimpan.",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Ya, Simpan",
            cancelButtonText: "Batal",
            reverseButtons: true,
        }).then((result) => {
            if (result.isConfirmed) {
                // Jika pengguna menekan 'Ya, Simpan'
                put(`/periksa/${periksa.id}`, {
                    onSuccess: () => {
                        Swal.fire(
                            "Sukses!",
                            "Perubahan berhasil disimpan.",
                            "success"
                        );
                    },
                    onError: () => {
                        Swal.fire(
                            "Error!",
                            "Gagal menyimpan perubahan.",
                            "error"
                        );
                    },
                });
            }
        });
    };

    const handleObatChange = (selectedOptions) => {
        const selectedValues = selectedOptions.map((option) => option.value);
        setData("obat", selectedValues);
    };

    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-2xl font-semibold leading-tight">
                    Edit Pemeriksaan
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
                            {/* Catatan */}
                            <div>
                                <label className="block mb-2 text-[#78B3CE]">
                                    Catatan
                                </label>
                                <textarea
                                    id="catatan"
                                    value={data.catatan}
                                    onChange={(e) =>
                                        setData("catatan", e.target.value)
                                    }
                                    className="w-full border border-[#78B3CE] rounded-md p-4 focus:outline-none focus:ring-2 focus:ring-[#F96E2A] transition-all"
                                />
                                {errors.catatan && (
                                    <div className="text-red-500 mt-1">
                                        {errors.catatan}
                                    </div>
                                )}
                            </div>

                            {/* Pilih Obat (Dengan Animasi) */}
                            <div>
                                <label className="block mb-2 text-[#78B3CE]">
                                    Pilih Obat
                                </label>
                                <Select
                                    closeMenuOnSelect={false}
                                    components={animatedComponents}
                                    isMulti
                                    value={obatOptions.filter((option) =>
                                        data.obat.includes(option.value)
                                    )}
                                    onChange={handleObatChange}
                                    options={obatOptions}
                                    placeholder="Pilih obat"
                                    className="w-full border border-[#78B3CE] rounded-md p-4 focus:outline-none focus:ring-2 focus:ring-[#F96E2A] transition-all"
                                />
                                {errors.obat && (
                                    <div className="text-red-500 mt-1">
                                        {errors.obat}
                                    </div>
                                )}
                            </div>

                            <div className="mt-6 flex space-x-4">
                                {/* Back Button */}
                                <button
                                    type="button"
                                    onClick={() =>
                                        Inertia.visit(route("periksa.index"))
                                    }
                                    className="bg-gray-500 text-white px-5 py-2 rounded-lg shadow-md hover:bg-gray-600 flex items-center space-x-2 transition duration-200 ease-in-out"
                                >
                                    <IoIosArrowBack className="w-5 h-5" />
                                    <span className="text-lg">Kembali</span>
                                </button>

                                {/* Save Button */}
                                <button
                                    type="submit"
                                    className="bg-[#F96E2A] text-white px-5 py-2 rounded-lg shadow-md flex items-center space-x-2 transition-transform transform hover:scale-105 hover:bg-[#F96E2A]/90 duration-200 ease-in-out"
                                >
                                    <FaSuitcaseMedical className="w-5 h-5" />
                                    <span className="text-lg">Simpan</span>
                                </button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </AuthenticatedLayout>
    );
};

export default PeriksaEdit;
