import React, { useState } from "react";
import { useForm } from "@inertiajs/react";
import Select from "react-select";
import { Inertia } from "@inertiajs/inertia";
import { IoIosArrowBack } from "react-icons/io";
import { FaUserPlus } from "react-icons/fa";
import AuthenticatedLayoutPasien from "@/Layouts/AuthenticatedLayoutPasien";
import PasienSidebar from "../../Components/PasienSidebar";

const Create = ({ jadwal }) => {
    const { data, setData, post, processing, errors } = useForm({
        id_jadwal: "",
        keluhan: "",
    });

    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        post(route("daftar-poli.store"), {
            onFinish: () => setIsSubmitting(false),
        });
    };

    const jadwalOptions = jadwal.map((item) => ({
        value: item.id,
        label: `${item.dokter?.nama || "N/A"} - ${
            item.dokter?.poli?.nama_poli || "N/A"
        } (${item.hari} ${item.jam_mulai} - ${item.jam_selesai})`,
    }));

    return (
        <AuthenticatedLayoutPasien
            header={
                <h2 className="text-2xl font-semibold leading-tight">
                    Daftar Poli
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
                            {/* Input Jadwal Dokter */}
                            <div>
                                <label className="block mb-2 text-[#78B3CE]">
                                    Jadwal Dokter
                                </label>
                                <Select
                                    options={jadwalOptions}
                                    onChange={(option) =>
                                        setData("id_jadwal", option.value)
                                    }
                                    placeholder="Pilih Jadwal"
                                    className="w-full border border-[#78B3CE] rounded-md focus:outline-none focus:ring-2 focus:ring-[#F96E2A] transition-all"
                                />
                                {errors.id_jadwal && (
                                    <div className="text-red-500 mt-1">
                                        {errors.id_jadwal}
                                    </div>
                                )}
                            </div>

                            {/* Input Keluhan */}
                            <div>
                                <label className="block mb-2 text-[#78B3CE]">
                                    Keluhan
                                </label>
                                <textarea
                                    id="keluhan"
                                    value={data.keluhan}
                                    onChange={(e) =>
                                        setData("keluhan", e.target.value)
                                    }
                                    className="w-full border border-[#78B3CE] rounded-md p-4 focus:outline-none focus:ring-2 focus:ring-[#F96E2A] transition-all"
                                    placeholder="Masukkan keluhan pasien"
                                />
                                {errors.keluhan && (
                                    <div className="text-red-500 mt-1">
                                        {errors.keluhan}
                                    </div>
                                )}
                            </div>

                            <div className="mt-6 flex space-x-4">
                                {/* Tombol Back */}
                                <button
                                    type="button"
                                    onClick={() =>
                                        Inertia.visit(
                                            route("daftar-poli.index")
                                        )
                                    }
                                    className="bg-gray-500 text-white px-5 py-2 rounded-lg shadow-md hover:bg-gray-600 flex items-center space-x-2 transition duration-200 ease-in-out"
                                >
                                    <IoIosArrowBack className="w-5 h-5" />
                                    <span className="text-lg">Kembali</span>
                                </button>

                                {/* Tombol Daftar */}
                                <button
                                    type="submit"
                                    disabled={isSubmitting}
                                    className={`bg-[#F96E2A] text-white px-5 py-2 rounded-lg shadow-md flex items-center space-x-2 transition-transform transform hover:scale-105 hover:bg-[#F96E2A]/90 duration-200 ease-in-out ${
                                        isSubmitting
                                            ? "opacity-50 cursor-not-allowed"
                                            : ""
                                    }`}
                                >
                                    <FaUserPlus className="w-5 h-5" />
                                    <span className="text-lg">
                                        {isSubmitting
                                            ? "Mendaftar..."
                                            : "Daftar Poli"}
                                    </span>
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
