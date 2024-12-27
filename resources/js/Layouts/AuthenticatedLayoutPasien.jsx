import { useForm } from "@inertiajs/react";
import Swal from "sweetalert2"; // Import SweetAlert
import ApplicationLogo from "@/Components/ApplicationLogo"; // Logo aplikasi
import { FaSignOutAlt } from "react-icons/fa"; // Ikon logout

export default function AuthenticatedLayoutPasien({ header, children }) {
    const { post } = useForm();

    // Fungsi untuk menampilkan konfirmasi logout
    const confirmLogout = (e) => {
        e.preventDefault();

        // SweetAlert untuk konfirmasi logout
        Swal.fire({
            title: "Anda yakin ingin keluar?",
            text: "Anda harus login kembali untuk mengakses halaman ini.",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#d33",
            cancelButtonColor: "#3085d6",
            confirmButtonText: "Ya, logout",
            cancelButtonText: "Batal",
            reverseButtons: true,
        }).then((result) => {
            if (result.isConfirmed) {
                post(route("pasien.logout")); // Arahkan ke route logout jika dikonfirmasi
            }
        });
    };

    return (
        <div className="min-h-screen bg-[#FBF8EF]">
            {/* Navbar */}
            <nav className="bg-gradient-to-r from-[#78B3CE] to-[#C9E6F0] shadow-md">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="flex h-16 justify-between items-center">
                        <div className="flex items-center">
                            {/* Application Logo */}
                            <div className="flex-shrink-0">
                                <ApplicationLogo className="block h-10 w-auto fill-current text-white" />
                            </div>
                            {/* Title */}
                            <h1 className="ml-4 text-white text-xl font-semibold">
                                Dashboard Pasien
                            </h1>
                        </div>

                        <div className="flex items-center">
                            {/* Logout Button */}
                            <button
                                onClick={confirmLogout}
                                className="flex items-center gap-2 text-white bg-[#F96E2A] px-4 py-2 rounded-md shadow-md hover:bg-[#FBF8EF] hover:text-[#F96E2A] transition-all"
                            >
                                <FaSignOutAlt className="text-lg" />
                                Logout
                            </button>
                        </div>
                    </div>
                </div>
            </nav>

            {/* Header Section (if provided) */}
            {header && (
                <header className="bg-white shadow-md">
                    <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
                        {header}
                    </div>
                </header>
            )}

            {/* Main Content */}
            <main>{children}</main>
        </div>
    );
}
