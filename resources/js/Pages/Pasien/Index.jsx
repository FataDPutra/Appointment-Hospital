import React from "react";
import { InertiaLink } from "@inertiajs/inertia-react";
import { Inertia } from "@inertiajs/inertia";
import { FaEdit, FaShower, FaTrashAlt, FaSadCry } from "react-icons/fa"; // Import ikon Edit dan Hapus
import { BiSolidUserPlus } from "react-icons/bi";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import Sidebar from "../../Components/Sidebar";
import Swal from "sweetalert2"; // Import SweetAlert2

const PasienIndex = ({ pasiens }) => {
    const handleDelete = (id) => {
        Swal.fire({
            title: "Apakah Anda yakin?",
            text: "Data pasien ini akan dihapus!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#d33",
            cancelButtonColor: "#3085d6",
            confirmButtonText: "Hapus",
            cancelButtonText: "Batal",
            reverseButtons: true,
        }).then((result) => {
            if (result.isConfirmed) {
                Inertia.delete(route("pasiens.destroy", id));
                Swal.fire("Terhapus!", "Data pasien telah dihapus.", "success");
            }
        });
    };

    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-2xl font-semibold leading-tight text-gray-800">
                    Daftar Pasien
                </h2>
            }
        >
            <div className="flex">
                <Sidebar />
                <div className="container mx-auto p-6 ml-0 bg-[#FBF8EF] rounded-lg shadow-lg w-full">
                    {/* Tombol untuk Tambah Pasien */}
                    <div className="flex justify-between items-center mb-6">
                        <InertiaLink
                            href={route("pasiens.create")}
                            className="bg-[#F96E2A] text-white px-5 py-2 rounded-lg shadow-md flex items-center space-x-2 transition-transform transform hover:scale-105 hover:bg-[#F96E2A]/90 duration-200 ease-in-out"
                        >
                            <BiSolidUserPlus className="w-5 h-5" />
                            <span>Tambah Pasien</span>
                        </InertiaLink>
                    </div>

                    {/* Jika Tidak Ada Data Pasien */}
                    {pasiens.data.length === 0 ? (
                        <div className="text-center text-gray-500 py-4">
                            Tidak ada data pasien.
                        </div>
                    ) : (
                        <div className="overflow-x-auto bg-white rounded-lg shadow-md">
                            <table className="w-full table-auto border-collapse">
                                <thead className="bg-[#78B3CE] text-white text-sm">
                                    <tr>
                                        <th className="border p-3 text-left">
                                            No RM
                                        </th>
                                        <th className="border p-3 text-left">
                                            Nama
                                        </th>
                                        <th className="border p-3 text-left">
                                            No KTP
                                        </th>
                                        <th className="border p-3 text-left">
                                            No HP
                                        </th>
                                        <th className="border p-3 text-left">
                                            Alamat
                                        </th>
                                        <th className="border p-3 text-left">
                                            Aksi
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className="text-sm">
                                    {pasiens.data.map((pasien) => (
                                        <tr
                                            key={pasien.id}
                                            className="hover:bg-[#F3F3F3] transition-all duration-200"
                                        >
                                            <td className="border p-4">
                                                {pasien.no_rm}
                                            </td>
                                            <td className="border p-4">
                                                {pasien.nama}
                                            </td>
                                            <td className="border p-4">
                                                {pasien.no_ktp}
                                            </td>
                                            <td className="border p-4">
                                                {pasien.no_hp}
                                            </td>
                                            <td className="border p-4">
                                                {pasien.alamat}
                                            </td>
                                            <td className="border p-4">
                                                <div className="flex space-x-3 justify-center">
                                                    {/* Tombol Edit */}
                                                    <InertiaLink
                                                        href={route(
                                                            "pasiens.show",
                                                            pasien.id
                                                        )}
                                                        className="bg-orange-500 text-white px-4 py-2 rounded-md shadow-md flex items-center space-x-2 transition-all duration-200 hover:bg-orange-600"
                                                    >
                                                        <FaSadCry className="w-4 h-4" />
                                                        <span className="text-sm">
                                                            Lihat
                                                        </span>
                                                    </InertiaLink>
                                                    <InertiaLink
                                                        href={route(
                                                            "pasiens.edit",
                                                            pasien.id
                                                        )}
                                                        className="bg-yellow-500 text-white px-4 py-2 rounded-md shadow-md flex items-center space-x-2 transition-all duration-200 hover:bg-yellow-600"
                                                    >
                                                        <FaEdit className="w-4 h-4" />
                                                        <span className="text-sm">
                                                            Edit
                                                        </span>
                                                    </InertiaLink>

                                                    {/* Tombol Hapus */}
                                                    <button
                                                        onClick={() =>
                                                            handleDelete(
                                                                pasien.id
                                                            )
                                                        }
                                                        className="bg-red-500 text-white px-4 py-2 rounded-md shadow-md flex items-center space-x-2 transition-all duration-200 hover:bg-red-600"
                                                    >
                                                        <FaTrashAlt className="w-4 h-4" />
                                                        <span className="text-sm">
                                                            Hapus
                                                        </span>
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}

                    {/* Pagination controls */}
                    <div className="my-4 mx-4">
                        <div className="flex justify-between">
                            {/* Previous Page */}
                            {pasiens.prev_page_url && (
                                <InertiaLink
                                    href={pasiens.prev_page_url}
                                    className="px-4 py-2 bg-gray-300 text-black rounded-md hover:bg-gray-400 transition-all duration-200"
                                >
                                    Previous
                                </InertiaLink>
                            )}
                            {/* Next Page */}
                            {pasiens.next_page_url && (
                                <InertiaLink
                                    href={pasiens.next_page_url}
                                    className="px-4 py-2 bg-gray-300 text-black rounded-md hover:bg-gray-400 transition-all duration-200"
                                >
                                    Next
                                </InertiaLink>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
};

export default PasienIndex;
