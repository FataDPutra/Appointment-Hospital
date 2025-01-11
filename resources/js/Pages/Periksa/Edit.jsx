import React, { useState } from "react";
import { useForm } from "@inertiajs/react";
import { Head } from "@inertiajs/react";
import { Inertia } from "@inertiajs/inertia";
import Swal from "sweetalert2";
import { IoIosArrowBack } from "react-icons/io";
import { FaSuitcaseMedical } from "react-icons/fa6";
import Select from "react-select";
import makeAnimated from "react-select/animated";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import Sidebar from "../../Components/Sidebar";

const animatedComponents = makeAnimated();

const PeriksaEdit = ({ periksa, obat, detailPeriksa }) => {
    const { data, setData, put, errors } = useForm({
        catatan: periksa.catatan || "",
        obat: detailPeriksa.map((item) => item.id_obat) || [],
    });

    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setData(name, value);
    };

    const handleObatChange = (selectedOptions) => {
        const selectedValues = selectedOptions.map((option) => option.value);
        setData("obat", selectedValues);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setIsSubmitting(true);

        Swal.fire({
            title: "Apakah Anda yakin?",
            text: "Data pemeriksaan ini akan diperbarui!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Ya, perbarui!",
            cancelButtonText: "Batal",
            reverseButtons: true,
        }).then((result) => {
            if (result.isConfirmed) {
                put(route("periksa.update", periksa.id), {
                    onError: (err) => {
                        Swal.fire({
                            icon: "error",
                            title: "Gagal diperbarui",
                            text: "Terjadi kesalahan, periksa kembali data Anda.",
                        });
                    },
                    onSuccess: () => {
                        Swal.fire({
                            icon: "success",
                            title: "Berhasil",
                            text: "Data pemeriksaan berhasil diperbarui!",
                        });
                    },
                    onFinish: () => setIsSubmitting(false),
                });
            } else {
                setIsSubmitting(false); // Reset state jika dibatalkan
            }
        });
    };

    // Menyusun opsi obat dalam format untuk react-select
    const obatOptions = obat.map((item) => ({
        value: item.id,
        label: `${item.nama_obat} - Rp. ${item.harga}`,
    }));

    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-2xl font-semibold leading-tight">
                    Edit Pemeriksaan
                </h2>
            }
        >
            <Head title="Edit Pemeriksaan" />
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
                            {/* Catatan */}
                            <div>
                                <label className="block mb-2 text-[#78B3CE]">
                                    Catatan
                                </label>
                                <textarea
                                    name="catatan"
                                    value={data.catatan}
                                    onChange={handleChange}
                                    className="w-full border border-[#78B3CE] rounded-md p-4 focus:outline-none focus:ring-2 focus:ring-[#F96E2A] transition-all"
                                    placeholder="Masukkan catatan pemeriksaan"
                                />
                                {errors.catatan && (
                                    <div className="text-red-500 mt-1">
                                        {errors.catatan}
                                    </div>
                                )}
                            </div>

                            {/* Pilih Obat */}
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

                            {/* Tombol Aksi */}
                            <div className="mt-6 flex space-x-4">
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

                                <button
                                    type="submit"
                                    disabled={isSubmitting}
                                    className={`bg-[#F96E2A] text-white px-5 py-2 rounded-lg shadow-md flex items-center space-x-2 transition-transform transform hover:scale-105 hover:bg-[#F96E2A]/90 duration-200 ease-in-out ${
                                        isSubmitting
                                            ? "opacity-50 cursor-not-allowed"
                                            : ""
                                    }`}
                                >
                                    <FaSuitcaseMedical className="w-5 h-5" />
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
        </AuthenticatedLayout>
    );
};

export default PeriksaEdit;
