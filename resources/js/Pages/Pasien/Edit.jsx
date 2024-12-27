import React from "react";
import { Inertia } from "@inertiajs/inertia";
import { useForm } from "@inertiajs/inertia-react";
import { FaUserEdit } from "react-icons/fa";
import { IoIosArrowBack } from "react-icons/io";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import Sidebar from "../../Components/Sidebar";
import Swal from "sweetalert2"; // Import SweetAlert

const PasienEdit = ({ pasien }) => {
    const { data, setData, put, errors } = useForm({
        nama: pasien.nama,
        alamat: pasien.alamat,
        no_ktp: pasien.no_ktp,
        no_hp: pasien.no_hp,
    });

    const handleSubmit = (e) => {
        e.preventDefault();

        // Periksa apakah ada perubahan data
        const dataChanged =
            data.nama !== pasien.nama ||
            data.alamat !== pasien.alamat ||
            data.no_ktp !== pasien.no_ktp ||
            data.no_hp !== pasien.no_hp;

        // Jika tidak ada perubahan, tampilkan pesan
        if (!dataChanged) {
            Swal.fire({
                icon: "info",
                title: "Tidak ada perubahan",
                text: "Data tidak berubah, tidak ada yang disimpan.",
            });
            return;
        }

        // Jika ada perubahan, lanjutkan dengan konfirmasi
        Swal.fire({
            title: "Apakah Anda yakin?",
            text: "Data pasien ini akan diperbarui!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Ya, perbarui!",
            cancelButtonText: "Batal",
            reverseButtons: true,
        }).then((result) => {
            if (result.isConfirmed) {
                put(route("pasiens.update", pasien.id));
            }
        });
    };

    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-2xl font-semibold leading-tight">
                    Edit Pasien
                </h2>
            }
        >
            <div className="flex">
                <Sidebar />
                <div className="container mx-auto p-6 bg-[#FBF8EF] w-full ml-0 rounded-lg shadow-lg">
                    {/* Tampilkan pesan kesalahan global jika ada */}
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
                            {/* Input No RM */}
                            <div>
                                <label className="block mb-2 text-[#78B3CE]">
                                    No RM
                                </label>
                                <input
                                    type="text"
                                    value={pasien.no_rm}
                                    disabled
                                    className="w-full border border-[#78B3CE] rounded-md p-4 bg-gray-100 focus:outline-none focus:ring-2 focus:ring-[#F96E2A] transition-all"
                                />
                            </div>

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
                                    placeholder="Masukkan nama pasien"
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
                                <input
                                    type="text"
                                    value={data.alamat}
                                    onChange={(e) =>
                                        setData("alamat", e.target.value)
                                    }
                                    className="w-full border border-[#78B3CE] rounded-md p-4 focus:outline-none focus:ring-2 focus:ring-[#F96E2A] transition-all"
                                    placeholder="Masukkan alamat pasien"
                                />
                                {errors.alamat && (
                                    <div className="text-red-500 mt-1">
                                        {errors.alamat}
                                    </div>
                                )}
                            </div>

                            {/* Input No KTP */}
                            <div>
                                <label className="block mb-2 text-[#78B3CE]">
                                    No KTP
                                </label>
                                <input
                                    type="text"
                                    value={data.no_ktp}
                                    onChange={(e) =>
                                        setData("no_ktp", e.target.value)
                                    }
                                    className="w-full border border-[#78B3CE] rounded-md p-4 focus:outline-none focus:ring-2 focus:ring-[#F96E2A] transition-all"
                                    placeholder="Masukkan nomor KTP pasien"
                                />
                                {errors.no_ktp && (
                                    <div className="text-red-500 mt-1">
                                        {errors.no_ktp}
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
                                        setData("no_hp", e.target.value)
                                    }
                                    className="w-full border border-[#78B3CE] rounded-md p-4 focus:outline-none focus:ring-2 focus:ring-[#F96E2A] transition-all"
                                    placeholder="Masukkan nomor HP pasien"
                                />
                                {errors.no_hp && (
                                    <div className="text-red-500 mt-1">
                                        {errors.no_hp}
                                    </div>
                                )}
                            </div>

                            <div className="mt-6 flex space-x-4">
                                {/* Tombol Back */}
                                <button
                                    type="button"
                                    onClick={() =>
                                        Inertia.visit(route("pasiens.index"))
                                    } // Navigate to the list of pasien
                                    className="bg-gray-500 text-white px-5 py-2 rounded-lg shadow-md hover:bg-gray-600 flex items-center space-x-2 transition duration-200 ease-in-out"
                                >
                                    <IoIosArrowBack className="w-5 h-5" />
                                    <span className="text-lg">Back</span>
                                </button>

                                {/* Tombol Update */}
                                <button
                                    type="submit"
                                    className="bg-[#F96E2A] text-white px-5 py-2 rounded-lg shadow-md flex items-center space-x-2 transition-transform transform hover:scale-105 hover:bg-[#F96E2A]/90 duration-200 ease-in-out"
                                >
                                    <FaUserEdit className="w-5 h-5" />
                                    <span className="text-lg">
                                        Update Pasien
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

export default PasienEdit;
