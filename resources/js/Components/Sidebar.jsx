import { Link } from "@inertiajs/react";
import { HiUser, HiOfficeBuilding, HiUserGroup } from "react-icons/hi";
import { FaPlus } from "react-icons/fa"; // FaPlus for the pill icon

export default function Sidebar() {
    return (
        <div className="w-64 h-screen bg-gray-800 text-white">
            <div className="flex justify-center items-center p-6">
                <h1 className="text-2xl font-semibold text-white">
                    Admin Panel
                </h1>
            </div>

            <nav>
                <ul className="space-y-4 px-6 py-4">
                    <li>
                        <Link
                            href={route("pasiens.index")}
                            className="flex items-center space-x-3 text-gray-200 hover:text-white hover:bg-gray-700 rounded-md p-2"
                        >
                            <HiUser className="w-6 h-6" />
                            <span>Data Pasien</span>
                        </Link>
                    </li>
                    <li>
                        <Link
                            href={route("dokter.index")}
                            className="flex items-center space-x-3 text-gray-200 hover:text-white hover:bg-gray-700 rounded-md p-2"
                        >
                            <HiUserGroup className="w-6 h-6" />
                            <span>Data Dokter</span>
                        </Link>
                    </li>
                    <li>
                        <Link
                            href={route("polis.index")}
                            className="flex items-center space-x-3 text-gray-200 hover:text-white hover:bg-gray-700 rounded-md p-2"
                        >
                            <HiOfficeBuilding className="w-6 h-6" />
                            <span>Data Poli</span>
                        </Link>
                    </li>
                    <li>
                        <Link
                            href={route("obats.index")}
                            className="flex items-center space-x-3 text-gray-200 hover:text-white hover:bg-gray-700 rounded-md p-2"
                        >
                            <FaPlus className="w-6 h-6" />{" "}
                            {/* Use FaPill from Font Awesome */}
                            <span>Data Obat</span>
                        </Link>
                    </li>
                </ul>
            </nav>
        </div>
    );
}
