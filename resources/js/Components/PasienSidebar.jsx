import React from "react";
import { Link, usePage } from "@inertiajs/react";
import { IoIosHome } from "react-icons/io";
import { MdOutlineSick } from "react-icons/md";
import { RiHospitalFill } from "react-icons/ri";

export default function Sidebar() {
    const { url } = usePage(); // Mendapatkan URL saat ini dan props untuk akses user data

    // Fungsi untuk memeriksa apakah URL saat ini cocok dengan path
    const isActive = (path) => url.includes(path);

    // Menu untuk Admin
    const Items = [
        {
            label: "Home",
            route: "/pasien/dashboard",
            icon: <IoIosHome className="w-6 h-6" />,
        },
        {
            label: "Daftar Poli",
            route: "/pasien/daftar-poli",
            icon: <RiHospitalFill className="w-6 h-6" />,
        },
    ];

    return (
        <div className="w-64 h-screen bg-gradient-to-b from-[#78B3CE] to-[#C9E6F0] text-white shadow-lg relative">
            {/* Header Section */}
            <div className="flex flex-col items-center py-6 border-b border-[#C9E6F0]">
                <div className="w-16 h-16 bg-[#F96E2A] rounded-full flex items-center justify-center shadow-md mb-3">
                    <MdOutlineSick className="w-10 h-10 text-white" />
                </div>
                <h1 className="text-xl font-bold">Pasien</h1>
            </div>

            {/* Navigation Menu */}
            <nav className="mt-6">
                <ul className="space-y-4 px-4">
                    {Items.map((item, index) => (
                        <li key={index}>
                            <Link
                                href={item.route} // Menggunakan route statis
                                className={`flex items-center py-3 px-4 ${
                                    isActive(item.route) // Cek apakah URL saat ini sama dengan route
                                        ? "bg-[#FBF8EF] text-[#475860] font-semibold" // Jika aktif
                                        : "bg-[#78B3CE] text-white hover:bg-[#FBF8EF] hover:text-[#78B3CE]" // Jika tidak aktif, warna latar belakang oranye
                                } rounded-md transition-all shadow-sm`}
                            >
                                {item.icon} {/* Menampilkan ikon */}
                                <span className="ml-2">{item.label}</span>
                            </Link>
                        </li>
                    ))}
                </ul>
            </nav>

            {/* Footer */}
            <div className="absolute bottom-6 left-0 w-full text-center">
                <p className="text-sm text-black">Fata Dwi Putra &copy; 2024</p>
            </div>
        </div>
    );
}
