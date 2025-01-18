import React, { useState, useEffect } from "react";
import { useForm } from "@inertiajs/react";
import Select from "react-select";
import { Head } from "@inertiajs/react";
import Swal from "sweetalert2";
import AuthenticatedLayoutPasien from "@/Layouts/AuthenticatedLayoutPasien";
import PasienSidebar from "../../Components/PasienSidebar";

const Create = ({ poli, dokter }) => {
    const { data, setData, post, processing, errors } = useForm({
        subject: "",
        pertanyaan: "",
        id_dokter: "",
    });

    const [selectedPoli, setSelectedPoli] = useState(null);
    const [filteredDokter, setFilteredDokter] = useState([]);

    // Update daftar dokter ketika poli berubah
    useEffect(() => {
        if (selectedPoli) {
            const filtered = dokter.filter(
                (doc) => doc.poli.id === selectedPoli.value
            );
            setFilteredDokter(filtered);
            setData("id_dokter", ""); // Reset pilihan dokter
        } else {
            setFilteredDokter([]);
        }
    }, [selectedPoli, dokter]);

    const poliOptions = poli.map((item) => ({
        value: item.id,
        label: item.nama_poli,
    }));

    const dokterOptions = filteredDokter.map((item) => ({
        value: item.id,
        label: item.nama,
    }));

    const handleSubmit = (e) => {
        e.preventDefault();
        Swal.fire({
            title: "Konfirmasi",
            text: "Apakah Anda yakin ingin melanjutkan konsultasi?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Ya, Lanjutkan",
            cancelButtonText: "Batal",
        }).then((result) => {
            if (result.isConfirmed) {
                post(route("konsultasi.store"), {
                    onSuccess: () =>
                        Swal.fire(
                            "Berhasil",
                            "Konsultasi berhasil dilakukan!",
                            "success"
                        ),
                    onError: () =>
                        Swal.fire(
                            "Gagal",
                            "Terjadi kesalahan saat konsultasi.",
                            "error"
                        ),
                });
            }
        });
    };

    return (
        <AuthenticatedLayoutPasien header={<h2>Konsultasi Dokter</h2>}>
            <Head title="Konsultasi Dokter" />
            <div className="flex">
                <PasienSidebar />
                <div className="container mx-auto p-6 bg-[#FBF8EF] w-full rounded-lg shadow-lg">
                    <form onSubmit={handleSubmit}>
                        <div className="space-y-6">
                            <div>
                                <label className="block mb-2">Poli</label>
                                <Select
                                    options={poliOptions}
                                    onChange={(option) =>
                                        setSelectedPoli(option)
                                    }
                                    placeholder="Pilih Poli"
                                    className="w-full"
                                />
                                {errors.poli && (
                                    <div className="text-red-500 mt-1">
                                        {errors.poli}
                                    </div>
                                )}
                            </div>
                            <div>
                                <label className="block mb-2">Dokter</label>
                                <Select
                                    options={dokterOptions}
                                    onChange={(option) =>
                                        setData("id_dokter", option.value)
                                    }
                                    placeholder="Pilih Dokter"
                                    className="w-full"
                                />
                                {errors.id_dokter && (
                                    <div className="text-red-500 mt-1">
                                        {errors.id_dokter}
                                    </div>
                                )}
                            </div>
                            <div>
                                <label className="block mb-2">Subject</label>
                                <input
                                    type="text"
                                    value={data.subject}
                                    onChange={(e) =>
                                        setData("subject", e.target.value)
                                    }
                                    className="w-full border rounded-md p-2"
                                />
                                {errors.subject && (
                                    <div className="text-red-500 mt-1">
                                        {errors.subject}
                                    </div>
                                )}
                            </div>
                            <div>
                                <label className="block mb-2">Pertanyaan</label>
                                <textarea
                                    value={data.pertanyaan}
                                    onChange={(e) =>
                                        setData("pertanyaan", e.target.value)
                                    }
                                    className="w-full border rounded-md p-2"
                                />
                                {errors.pertanyaan && (
                                    <div className="text-red-500 mt-1">
                                        {errors.pertanyaan}
                                    </div>
                                )}
                            </div>
                            <div className="flex space-x-4">
                                <button
                                    type="submit"
                                    className="bg-blue-500 text-white px-4 py-2 rounded"
                                    disabled={processing}
                                >
                                    Daftar
                                </button>
                                <button
                                    type="button"
                                    onClick={() => history.back()}
                                    className="bg-gray-500 text-white px-4 py-2 rounded"
                                >
                                    Kembali
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
