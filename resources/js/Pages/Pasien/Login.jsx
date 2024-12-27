import React from "react";
import { useForm } from "@inertiajs/react";
import { HiIdentification } from "react-icons/hi";
import { IoIosArrowBack } from "react-icons/io";

export default function Login() {
    const { data, setData, post, errors } = useForm({
        no_rm: "",
    });

    const submit = (e) => {
        e.preventDefault();
        post(route("pasien.login.submit"));
    };

    return (
        <div className="min-h-screen bg-[#78B3CE] flex items-center justify-center relative">
            {/* Tombol Back */}
            <button
                onClick={() => (window.location.href = "/")}
                className="absolute top-4 left-4 text-gray-500 hover:text-[#FF8F50] transition duration-300"
            >
                <IoIosArrowBack className="w-8 h-8" />
            </button>

            <div className="bg-[#FBF8EF] p-10 rounded-2xl shadow-xl w-full max-w-lg">
                <h1 className="text-4xl font-extrabold text-center text-[#F96E2A] mb-8">
                    Login Pasien
                </h1>
                <form onSubmit={submit} className="space-y-6">
                    <div>
                        <label
                            htmlFor="no_rm"
                            className="block text-[#F96E2A] font-medium mb-2"
                        >
                            Nomor Rekam Medis (No RM)
                        </label>
                        <div className="flex items-center border-2 border-[#78B3CE] rounded-lg px-4 py-2">
                            <HiIdentification className="text-[#78B3CE] mr-3" />
                            <input
                                id="no_rm"
                                type="text"
                                placeholder="Nomor Rekam Medis"
                                value={data.no_rm}
                                onChange={(e) =>
                                    setData("no_rm", e.target.value)
                                }
                                className="w-full outline-none text-[#78B3CE] placeholder-[#F96E2A]"
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
                            className="w-full py-3 bg-[#78B3CE] text-white rounded-lg hover:bg-[#C9E6F0] transition duration-300"
                        >
                            Login
                        </button>
                    </div>

                    {/* Tombol untuk Register */}
                    <div className="text-center mt-4">
                        <p className="text-sm text-[#78B3CE]">
                            Pasien Baru?{" "}
                            <a
                                href={route("pasien.register")}
                                className="text-[#F96E2A] hover:underline"
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
