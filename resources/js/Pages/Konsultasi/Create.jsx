import React, { useState, useEffect } from "react";
import Select from "react-select";
import { useForm } from "@inertiajs/react";
import Swal from "sweetalert2";
import AuthenticatedLayoutPasien from "@/Layouts/AuthenticatedLayoutPasien";
import PasienSidebar from "../../Components/PasienSidebar";

const Create = ({ poli, dokter }) => {
    const { data, setData, post, errors } = useForm({
        subject: "",
        pertanyaan: "",
        id_dokter: "",
    });

    const [selectedPoli, setSelectedPoli] = useState(null); // Untuk Poli
    const [filteredDokter, setFilteredDokter] = useState([]); // Dokter yang difilter berdasarkan Poli

    // Filter dokter berdasarkan Poli yang dipilih
    useEffect(() => {
        if (selectedPoli) {
            const filtered = dokter.filter(
                (item) => item.poli?.id === selectedPoli.value
            );
            setFilteredDokter(filtered);
            setData("id_dokter", ""); // Reset value dokter
        } else {
            setFilteredDokter([]);
        }
    }, [selectedPoli, dokter]);

    // Mengirim data form
    const handleSubmit = (e) => {
        e.preventDefault();

        Swal.fire({
            title: "Apakah Anda yakin?",
            text: "Konsultasi akan dilakukan",
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Ya, daftar!",
            cancelButtonText: "Batal",
        }).then((result) => {
            if (result.isConfirmed) {
                post(route("konsultasi.store"), {
                    onError: (err) => {
                        Swal.fire({
                            icon: "error",
                            title: "Gagal konsultasi",
                            text: "Terjadi kesalahan saat konsultasi.",
                            confirmButtonText: "OK",
                        });
                    },
                    onSuccess: () => {
                        Swal.fire({
                            icon: "success",
                            title: "Berhasil",
                            text: "Konsultasi berhasil dilakukan!",
                            confirmButtonText: "OK",
                        });
                    },
                });
            }
        });
    };

    // Konversi data ke format Select
    const poliOptions = poli.map((item) => ({
        value: item.id,
        label: item.nama_poli,
    }));

    const dokterOptions = filteredDokter.map((item) => ({
        value: item.id,
        label: item.nama,
    }));

    return (
        <AuthenticatedLayoutPasien
            header={
                <h2 className="text-2xl font-semibold leading-tight">
                    Konsultasi Dokter
                </h2>
            }
        >
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
                            {/* Dropdown Poli */}
                            <div>
                                <label className="block mb-2 text-[#78B3CE]">
                                    Poli
                                </label>
                                <Select
                                    options={poliOptions}
                                    value={poliOptions.find(
                                        (opt) =>
                                            opt.value === selectedPoli?.value
                                    )}
                                    onChange={(option) =>
                                        setSelectedPoli(option)
                                    }
                                    placeholder="Pilih Poli"
                                    className="w-full border border-[#78B3CE] rounded-md focus:outline-none focus:ring-2 focus:ring-[#F96E2A] transition-all"
                                />
                            </div>

                            {/* Dropdown Dokter */}
                            <div>
                                <label className="block mb-2 text-[#78B3CE]">
                                    Dokter
                                </label>
                                <Select
                                    options={dokterOptions}
                                    value={dokterOptions.find(
                                        (opt) => opt.value === data.id_dokter
                                    )}
                                    onChange={(option) =>
                                        setData("id_dokter", option.value)
                                    }
                                    placeholder="Pilih Dokter"
                                    className="w-full border border-[#78B3CE] rounded-md focus:outline-none focus:ring-2 focus:ring-[#F96E2A] transition-all"
                                />
                                {errors.id_dokter && (
                                    <div className="text-red-500 mt-1">
                                        {errors.id_dokter}
                                    </div>
                                )}
                            </div>

                            {/* Input Subject */}
                            <div>
                                <label className="block mb-2 text-[#78B3CE]">
                                    Subject
                                </label>
                                <input
                                    type="text"
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
                                    Kembali
                                </button>

                                {/* Tombol Submit */}
                                <button
                                    type="submit"
                                    className="bg-[#F96E2A] text-white px-5 py-2 rounded-lg shadow-md hover:bg-[#F96E2A]/90 flex items-center space-x-2 transition-transform transform hover:scale-105 duration-200 ease-in-out"
                                >
                                    Konsultasi
                                </button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </AuthenticatedLayoutPasien>
    );
};

export default Create;
