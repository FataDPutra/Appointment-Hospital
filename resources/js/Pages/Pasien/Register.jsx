import React from "react";
import { Head } from "@inertiajs/react";
import { useForm } from "@inertiajs/react";
import {
    HiIdentification,
    HiHome,
    HiPhone,
    HiDocumentText,
} from "react-icons/hi";

export default function Register() {
    const { data, setData, post, errors } = useForm({
        nama: "",
        alamat: "",
        no_ktp: "",
        no_hp: "",
    });

    const submit = (e) => {
        e.preventDefault();
        post(route("pasien.register.submit"));
    };

    const handleNumberInput = (field, value) => {
        setData(field, value.replace(/\D/g, "")); // Hanya izinkan angka
    };

    return (
        <div className="min-h-screen bg-[#78B3CE] flex items-center justify-center">
            <Head title="Register" />

            <div className="bg-[#FBF8EF] p-10 rounded-2xl shadow-xl w-full max-w-lg">
                <h1 className="text-4xl font-extrabold text-center text-[#F96E2A] mb-8">
                    Pendaftaran Pasien
                </h1>
                <form onSubmit={submit} className="space-y-6">
                    <div>
                        <label
                            htmlFor="nama"
                            className="block text-[#F96E2A] font-medium mb-2"
                        >
                            Nama Lengkap
                        </label>
                        <div className="flex items-center border-2 border-[#78B3CE] rounded-lg px-4 py-2">
                            <HiIdentification className="text-[#78B3CE] mr-3" />
                            <input
                                id="nama"
                                type="text"
                                placeholder="Masukkan Nama Lengkap"
                                value={data.nama}
                                onChange={(e) =>
                                    setData("nama", e.target.value)
                                }
                                className="w-full outline-none text-black placeholder-[#F96E2A]"
                            />
                        </div>
                        {errors.nama && (
                            <div className="text-red-500 text-sm mt-2">
                                {errors.nama}
                            </div>
                        )}
                    </div>

                    <div>
                        <label
                            htmlFor="alamat"
                            className="block text-[#F96E2A] font-medium mb-2"
                        >
                            Alamat
                        </label>
                        <div className="flex items-center border-2 border-[#78B3CE] rounded-lg px-4 py-2">
                            <HiHome className="text-[#78B3CE] mr-3" />
                            <input
                                id="alamat"
                                type="text"
                                placeholder="Masukkan Alamat"
                                value={data.alamat}
                                onChange={(e) =>
                                    setData("alamat", e.target.value)
                                }
                                className="w-full outline-none text-black placeholder-[#F96E2A]"
                            />
                        </div>
                        {errors.alamat && (
                            <div className="text-red-500 text-sm mt-2">
                                {errors.alamat}
                            </div>
                        )}
                    </div>

                    <div>
                        <label
                            htmlFor="no_ktp"
                            className="block text-[#F96E2A] font-medium mb-2"
                        >
                            Nomor KTP
                        </label>
                        <div className="flex items-center border-2 border-[#78B3CE] rounded-lg px-4 py-2">
                            <HiDocumentText className="text-[#78B3CE] mr-3" />
                            <input
                                id="no_ktp"
                                type="text"
                                placeholder="Masukkan Nomor KTP"
                                value={data.no_ktp}
                                onChange={(e) =>
                                    handleNumberInput("no_ktp", e.target.value)
                                }
                                className="w-full outline-none text-black placeholder-[#F96E2A]"
                            />
                        </div>
                        {errors.no_ktp && (
                            <div className="text-red-500 text-sm mt-2">
                                {errors.no_ktp}
                            </div>
                        )}
                    </div>

                    <div>
                        <label
                            htmlFor="no_hp"
                            className="block text-[#F96E2A] font-medium mb-2"
                        >
                            Nomor HP
                        </label>
                        <div className="flex items-center border-2 border-[#78B3CE] rounded-lg px-4 py-2">
                            <HiPhone className="text-[#78B3CE] mr-3" />
                            <input
                                id="no_hp"
                                type="text"
                                placeholder="Masukkan Nomor HP"
                                value={data.no_hp}
                                onChange={(e) =>
                                    handleNumberInput("no_hp", e.target.value)
                                }
                                className="w-full outline-none text-black placeholder-[#F96E2A]"
                            />
                        </div>
                        {errors.no_hp && (
                            <div className="text-red-500 text-sm mt-2">
                                {errors.no_hp}
                            </div>
                        )}
                    </div>

                    <div>
                        <button
                            type="submit"
                            className="w-full py-3 bg-[#78B3CE] text-white rounded-lg hover:bg-[#C9E6F0] transition duration-300"
                        >
                            Daftar
                        </button>
                    </div>
                </form>

                <div className="text-center mt-6">
                    <p className="text-sm text-[#78B3CE]">
                        Pasien Lama ?{" "}
                        <a
                            href={route("pasien.login")}
                            className="text-[#F96E2A] hover:underline"
                        >
                            Login Sekarang
                        </a>
                    </p>
                </div>
            </div>
        </div>
    );
}
