import React, { useState } from "react";
import Select from "react-select";
import { Inertia } from "@inertiajs/inertia";
import { InertiaLink } from "@inertiajs/inertia-react";
import Swal from "sweetalert2"; // Import SweetAlert
import { IoIosArrowBack } from "react-icons/io";
import { FaUserEdit } from "react-icons/fa";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import Sidebar from "../../Components/Sidebar";

const EditDokter = ({ dokter, poli }) => {
    const [formData, setFormData] = useState({
        nama: dokter.nama || "",
        alamat: dokter.alamat || "",
        no_hp: dokter.no_hp || "",
        id_poli: dokter.id_poli || "",
        email: dokter.email || "",
        password: "", // Kosongkan password jika tidak ingin diubah
    });

    const originalData = {
        nama: dokter.nama || "",
        alamat: dokter.alamat || "",
        no_hp: dokter.no_hp || "",
        id_poli: dokter.id_poli || "",
        email: dokter.email || "",
        password: "", // Kosongkan password jika tidak ingin diubah
    };

    const [errors, setErrors] = useState({});

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSelectChange = (selectedOption) => {
        setFormData({
            ...formData,
            id_poli: selectedOption ? selectedOption.value : "",
        });
    };

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

        // SweetAlert confirmation
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
                Inertia.put(route("dokter.update", dokter.id), formData, {
                    onError: (err) => setErrors(err),
                });
            }
        });
    };

    const poliOptions = poli.map((p) => ({ value: p.id, label: p.nama_poli }));

    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-2xl font-semibold leading-tight">
                    Edit Dokter
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
                            {/* Nama */}
                            <div>
                                <label className="block mb-2 text-[#78B3CE]">
                                    Nama
                                </label>
                                <input
                                    type="text"
                                    name="nama"
                                    value={formData.nama}
                                    onChange={handleChange}
                                    className="w-full border border-[#78B3CE] rounded-md p-4 focus:outline-none focus:ring-2 focus:ring-[#F96E2A ] transition-all"
                                    placeholder="Masukkan nama dokter"
                                />
                                {errors.nama && (
                                    <div className="text-red-500 mt-1">
                                        {errors.nama}
                                    </div>
                                )}
                            </div>

                            {/* Alamat */}
                            <div>
                                <label className="block mb-2 text-[#78B3CE]">
                                    Alamat
                                </label>
                                <textarea
                                    name="alamat"
                                    value={formData.alamat}
                                    onChange={handleChange}
                                    className="w-full border border-[#78B3CE] rounded-md p-4 focus:outline-none focus:ring-2 focus:ring-[#F96E2A] transition-all"
                                    placeholder="Masukkan alamat dokter"
                                />
                                {errors.alamat && (
                                    <div className="text-red-500 mt-1">
                                        {errors.alamat}
                                    </div>
                                )}
                            </div>

                            {/* No HP */}
                            <div>
                                <label className="block mb-2 text-[#78B3CE]">
                                    No HP
                                </label>
                                <input
                                    type="text"
                                    name="no_hp"
                                    value={formData.no_hp}
                                    onChange={handleChange}
                                    className="w-full border border-[#78B3CE] rounded-md p-4 focus:outline-none focus:ring-2 focus:ring-[#F96E2A] transition-all"
                                    placeholder="Masukkan nomor HP dokter"
                                />
                                {errors.no_hp && (
                                    <div className="text-red-500 mt-1">
                                        {errors.no_hp}
                                    </div>
                                )}
                            </div>

                            {/* Poli */}
                            <div>
                                <label className="block mb-2 text-[#78B3CE]">
                                    Poli
                                </label>
                                <Select
                                    options={poliOptions}
                                    value={poliOptions.find(
                                        (option) =>
                                            option.value === formData.id_poli
                                    )}
                                    onChange={handleSelectChange}
                                    isClearable
                                    placeholder="Pilih Poli"
                                    className="react-select-container"
                                    classNamePrefix="react-select"
                                />
                                {errors.id_poli && (
                                    <div className="text-red-500 mt-1">
                                        {errors.id_poli}
                                    </div>
                                )}
                            </div>

                            {/* Email */}
                            <div>
                                <label className="block mb-2 text-[#78B3CE]">
                                    Email
                                </label>
                                <input
                                    type="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    className="w-full border border-[#78B3CE] rounded-md p-4 focus:outline-none focus:ring-2 focus:ring-[#F96E2A] transition-all"
                                    placeholder="Masukkan email dokter"
                                />
                                {errors.email && (
                                    <div className="text-red-500 mt-1">
                                        {errors.email}
                                    </div>
                                )}
                            </div>

                            {/* Password */}
                            <div>
                                <label className="block mb-2 text-[#78B3CE]">
                                    Password
                                </label>
                                <input
                                    type="password"
                                    name="password"
                                    value={formData.password}
                                    onChange={handleChange}
                                    className="w-full border border-[#78B3CE] rounded-md p-4 focus:outline-none focus:ring-2 focus:ring-[#F96E2A] transition-all"
                                    placeholder="Biarkan kosong jika tidak ingin diubah"
                                />
                                {errors.password && (
                                    <div className="text-red-500 mt-1">
                                        {errors.password}
                                    </div>
                                )}
                            </div>

                            <div className="mt-6 flex space-x-4">
                                {/* Back Button */}
                                <InertiaLink
                                    href={route("dokter.index")}
                                    className="bg-gray-500 text-white px-5 py-2 rounded-lg shadow-md hover:bg-gray-600 flex items-center space-x-2 transition duration-200 ease-in-out"
                                >
                                    <IoIosArrowBack className="w-5 h-5" />
                                    <span className="text-lg">Kembali</span>
                                </InertiaLink>

                                {/* Submit Button */}
                                <button
                                    type="submit"
                                    className="bg-[#F96E2A] text-white px-5 py-2 rounded-lg shadow-md flex items-center space-x-2 transition-transform transform hover:scale-105 hover:bg-[#F96E2A]/90 duration-200 ease-in-out"
                                >
                                    <FaUserEdit className="w-5 h-5" />
                                    <span className="text-lg">
                                        Update Dokter
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
