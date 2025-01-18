import React from "react";
import { Link, usePage } from "@inertiajs/react";
import { CiHospital1 } from "react-icons/ci";
import { GiPill } from "react-icons/gi";
import { IoIosHome } from "react-icons/io";
import { GiPlagueDoctorProfile } from "react-icons/gi";
import { FaPeopleGroup, FaUserDoctor } from "react-icons/fa6";
import { PiClockUserBold } from "react-icons/pi";
import { TbCheckupList } from "react-icons/tb";
import { FaBookMedical } from "react-icons/fa";
import { TiMessages } from "react-icons/ti";

export default function Sidebar() {
    const { url, props } = usePage(); // Mendapatkan URL saat ini dan props untuk akses user data

    const userRole = props.auth.user.role; // Mendapatkan role pengguna (admin atau dokter)

    // Fungsi untuk memeriksa apakah URL saat ini cocok dengan path
    const isActive = (path) => url.includes(path);

    // Menu untuk Admin
    const adminMenuItems = [
        {
            label: "Home",
            route: "/admin/dashboard",
            icon: <IoIosHome className="w-6 h-6" />,
        },
        {
            label: "Data Pasien",
            route: "/pasiens",
            icon: <FaPeopleGroup className="w-6 h-6" />,
        },
        {
            label: "Data Dokter",
            route: "/dokter",
            icon: <FaUserDoctor className="w-6 h-6" />,
        },
        {
            label: "Data Poli",
            route: "/polis",
            icon: <CiHospital1 className="w-6 h-6" />,
        },
        {
            label: "Data Obat",
            route: "/obats",
            icon: <GiPill className="w-6 h-6" />,
        },

    ];

    // Menu untuk Dokter
    const dokterMenuItems = [
        {
            label: "Home",
            route: "/dashboard",
            icon: <IoIosHome className="w-6 h-6" />,
        },
        {
            label: "Jadwal Periksa",
            route: "/jadwal",
            icon: <PiClockUserBold className="w-6 h-6" />,
        },
        {
            label: "Periksa Pasien",
            route: "/periksa",
            icon: <TbCheckupList className="w-6 h-6" />,
        },
        {
            label: "Riwayat Pasien",
            route: "/riwayat-pasien",
            icon: <FaBookMedical className="w-6 h-6" />,
        },
        {
            label: "Konsultasi",
            route: "/konsultasi-pasien",
            icon: <TiMessages className="w-6 h-6" />,
        },
    ];

    // Menentukan menu berdasarkan role
    const menuItems = userRole === "admin" ? adminMenuItems : dokterMenuItems;

    return (
        <div className="w-64 bg-gradient-to-b from-[#78B3CE] to-[#C9E6F0] text-white shadow-lg min-h-screen sticky top-0">
            {/* Header Section */}
            <div className="flex flex-col items-center py-6 border-b border-[#C9E6F0]">
                <div className="w-16 h-16 bg-[#F96E2A] rounded-full flex items-center justify-center shadow-md mb-3">
                    <GiPlagueDoctorProfile className="w-10 h-10 text-white" />
                </div>
                <h1 className="text-xl font-bold">
                    {userRole === "admin" ? "Admin Panel" : "Dokter Panel"}
                </h1>
            </div>

            {/* Navigation Menu */}
            <nav className="mt-6">
                <ul className="space-y-4 px-4">
                    {menuItems.map((item, index) => (
                        <li key={index}>
                            <Link
                                href={item.route} // Menggunakan route statis
                                className={`flex items-center py-3 px-4 ${
                                    isActive(item.route)
                                        ? "bg-[#FBF8EF] text-[#475860] font-semibold"
                                        : "bg-[#78B3CE] text-white hover:bg-[#FBF8EF] hover:text-[#78B3CE]"
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
