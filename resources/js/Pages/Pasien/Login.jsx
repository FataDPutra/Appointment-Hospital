import React from "react";
import { useForm } from "@inertiajs/react";
import { HiIdentification } from "react-icons/hi"; // Anda bisa menginstal react-icons untuk ikon yang lebih mudah digunakan

export default function Login() {
    const { data, setData, post, errors } = useForm({
        no_rm: "",
    });

    const submit = (e) => {
        e.preventDefault();
        post(route("pasien.login.submit"));
    };

    return (
        <div className="min-h-screen bg-gradient-to-r from-blue-500 to-indigo-600 flex items-center justify-center">
            <div className="bg-white p-10 rounded-2xl shadow-xl w-full max-w-lg relative overflow-hidden">
                <div className="absolute inset-0 bg-blue-100 opacity-30"></div>{" "}
                {/* Overlay latar belakang yang halus */}
                <h1 className="text-4xl font-extrabold text-center text-gray-800 mb-8 z-10">
                    Login Pasien
                </h1>
                <form onSubmit={submit} className="space-y-6 z-10 relative">
                    <div>
                        <label
                            htmlFor="no_rm"
                            className="block text-gray-700 font-medium mb-2"
                        >
                            Nomor Rekam Medis (No RM)
                        </label>
                        <div className="flex items-center border-2 border-gray-300 rounded-lg px-4 py-2 transition duration-300 hover:border-blue-500 focus-within:border-blue-500">
                            <HiIdentification className="text-gray-500 mr-3" />
                            <input
                                id="no_rm"
                                type="text"
                                placeholder="Nomor Rekam Medis"
                                value={data.no_rm}
                                onChange={(e) =>
                                    setData("no_rm", e.target.value)
                                }
                                className="w-full outline-none text-gray-800 placeholder-gray-400"
                            />
                        </div>
                        {errors.no_rm && (
                            <div className="text-red-500 text-sm mt-2">
                                {errors.no_rm}
                            </div>
                        )}
                    </div>

                    <div>
                        <button
                            type="submit"
                            className="w-full py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-lg hover:from-blue-500 hover:to-indigo-500 transition duration-300 transform hover:scale-105"
                        >
                            Login
                        </button>
                    </div>

                    {/* Tombol untuk Register */}
                    <div className="text-center mt-4">
                        <p className="text-sm text-gray-600">
                            Pasien Baru?{" "}
                            <a
                                href={route("pasien.register")}
                                className="text-blue-600 hover:underline"
                            >
                                Daftar Sekarang
                            </a>
                        </p>
                    </div>
                </form>
            </div>
        </div>
    );
}
