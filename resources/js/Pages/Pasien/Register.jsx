import React from "react";
import { useForm } from "@inertiajs/react";

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

    return (
        <div className="min-h-screen bg-gradient-to-r from-blue-500 to-indigo-600 flex items-center justify-center">
            <div className="bg-white p-10 rounded-2xl shadow-xl w-full max-w-lg relative overflow-hidden">
                <div className="absolute inset-0 bg-blue-100 opacity-30"></div>
                {/* Overlay latar belakang yang halus */}
                <h1 className="text-4xl font-extrabold text-center text-gray-800 mb-8 z-10">
                    Pendaftaran Pasien
                </h1>
                <form onSubmit={submit} className="space-y-6 z-10 relative">
                    <div>
                        <label
                            htmlFor="nama"
                            className="block text-gray-700 font-medium mb-2"
                        >
                            Nama Lengkap
                        </label>
                        <input
                            id="nama"
                            type="text"
                            placeholder="Masukkan Nama Lengkap"
                            value={data.nama}
                            onChange={(e) => setData("nama", e.target.value)}
                            className="w-full p-3 border-2 border-gray-300 rounded-lg outline-none focus:border-blue-500"
                        />
                        {errors.nama && (
                            <div className="text-red-500 text-sm mt-2">
                                {errors.nama}
                            </div>
                        )}
                    </div>

                    <div>
                        <label
                            htmlFor="alamat"
                            className="block text-gray-700 font-medium mb-2"
                        >
                            Alamat
                        </label>
                        <input
                            id="alamat"
                            type="text"
                            placeholder="Masukkan Alamat"
                            value={data.alamat}
                            onChange={(e) => setData("alamat", e.target.value)}
                            className="w-full p-3 border-2 border-gray-300 rounded-lg outline-none focus:border-blue-500"
                        />
                        {errors.alamat && (
                            <div className="text-red-500 text-sm mt-2">
                                {errors.alamat}
                            </div>
                        )}
                    </div>

                    <div>
                        <label
                            htmlFor="no_ktp"
                            className="block text-gray-700 font-medium mb-2"
                        >
                            Nomor KTP
                        </label>
                        <input
                            id="no_ktp"
                            type="text"
                            placeholder="Masukkan Nomor KTP"
                            value={data.no_ktp}
                            onChange={(e) => setData("no_ktp", e.target.value)}
                            className="w-full p-3 border-2 border-gray-300 rounded-lg outline-none focus:border-blue-500"
                        />
                        {errors.no_ktp && (
                            <div className="text-red-500 text-sm mt-2">
                                {errors.no_ktp}
                            </div>
                        )}
                    </div>

                    <div>
                        <label
                            htmlFor="no_hp"
                            className="block text-gray-700 font-medium mb-2"
                        >
                            Nomor HP
                        </label>
                        <input
                            id="no_hp"
                            type="text"
                            placeholder="Masukkan Nomor HP"
                            value={data.no_hp}
                            onChange={(e) => setData("no_hp", e.target.value)}
                            className="w-full p-3 border-2 border-gray-300 rounded-lg outline-none focus:border-blue-500"
                        />
                        {errors.no_hp && (
                            <div className="text-red-500 text-sm mt-2">
                                {errors.no_hp}
                            </div>
                        )}
                    </div>

                    <div>
                        <button
                            type="submit"
                            className="w-full py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-lg hover:from-blue-500 hover:to-indigo-500 transition duration-300 transform hover:scale-105"
                        >
                            Daftar
                        </button>
                    </div>
                </form>

                {/* Optional: Link ke halaman login */}
                <div className="text-center mt-6">
                    <p className="text-sm text-gray-600">
                        Sudah punya akun?{" "}
                        <a
                            href={route("pasien.login")}
                            className="text-blue-600 hover:underline"
                        >
                            Login Sekarang
                        </a>
                    </p>
                </div>
            </div>
        </div>
    );
}
