import React from "react";
import { Inertia } from "@inertiajs/inertia";
import { FaEdit, FaTrashAlt } from "react-icons/fa"; // Import icons for Edit and Delete
import { TbClockPlus } from "react-icons/tb";
import Swal from "sweetalert2"; // Import SweetAlert2
import { CiAlarmOff, CiAlarmOn } from "react-icons/ci";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { InertiaLink } from "@inertiajs/inertia-react";
import Sidebar from "../../Components/Sidebar"; // Make sure to import Sidebar

const JadwalIndex = ({ jadwal }) => {
    // Fungsi untuk mengaktifkan jadwal
    const handleActivate = (id) => {
        Swal.fire({
            title: "Apakah Anda yakin?",
            text: "Jadwal ini akan diaktifkan!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Aktifkan",
            cancelButtonText: "Batal",
            reverseButtons: true,
        }).then((result) => {
            if (result.isConfirmed) {
                Inertia.put(`/jadwal/${id}/restore`);
                Swal.fire("Aktif!", "Jadwal berhasil diaktifkan.", "success");
            }
        });
    };

    // Fungsi untuk menonaktifkan jadwal
    const handleDeactivate = (id) => {
        Swal.fire({
            title: "Apakah Anda yakin?",
            text: "Jadwal ini akan dinonaktifkan!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#d33",
            cancelButtonColor: "#3085d6",
            confirmButtonText: "Nonaktifkan",
            cancelButtonText: "Batal",
            reverseButtons: true,
        }).then((result) => {
            if (result.isConfirmed) {
                Inertia.delete(`/jadwal/${id}`);
                Swal.fire(
                    "Nonaktif!",
                    "Jadwal berhasil dinonaktifkan.",
                    "success"
                );
            }
        });
    };

    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-2xl font-semibold leading-tight text-gray-800">
                    Daftar Jadwal Periksa
                </h2>
            }
        >
            <div className="flex">
                <Sidebar />
                <div className="container mx-auto p-6 ml-0 bg-[#FBF8EF] rounded-lg shadow-lg w-full">
                    <div className="flex justify-between items-center mb-6">
                        {/* Tombol untuk menambah jadwal baru */}
                        <InertiaLink
                            href={route("jadwal.create")}
                            className="bg-[#F96E2A] text-white px-5 py-2 rounded-lg shadow-md flex items-center space-x-2 transition-transform transform hover:scale-105 hover:bg-[#F96E2A]/90 duration-200 ease-in-out"
                        >
                            <TbClockPlus className="w-5 h-5" />
                            <span>Tambah Jadwal</span>
                        </InertiaLink>
                    </div>

                    {/* If there are no jadwal */}
                    {jadwal.data.length === 0 ? (
                        <div className="text-center text-gray-500 py-4">
                            Tidak ada data jadwal.
                        </div>
                    ) : (
                        <div className="overflow-x-auto bg-white rounded-lg shadow-md">
                            <table className="w-full table-auto border-collapse">
                                <thead className="bg-[#78B3CE] text-white text-sm">
                                    <tr>
                                        <th className="border p-3 text-center">
                                            Hari
                                        </th>
                                        <th className="border p-3 text-center">
                                            Jam Mulai
                                        </th>
                                        <th className="border p-3 text-center">
                                            Jam Selesai
                                        </th>
                                        <th className="border p-3 text-center">
                                            Status
                                        </th>
                                        <th className="border p-3 text-center">
                                            Aksi
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className="text-sm">
                                    {jadwal.data.map((item) => (
                                        <tr
                                            key={item.id}
                                            className="hover:bg-[#F3F3F3] transition-all duration-200"
                                        >
                                            <td className="border p-4">
                                                {item.hari}
                                            </td>
                                            <td className="border p-4">
                                                {item.jam_mulai}
                                            </td>
                                            <td className="border p-4">
                                                {item.jam_selesai}
                                            </td>
                                            <td className="border p-4">
                                                {item.deleted_at
                                                    ? "Nonaktif"
                                                    : "Aktif"}
                                            </td>
                                            <td className="border p-4">
                                                <div className="flex space-x-3 justify-center">
                                                    {/* Edit Button */}
                                                    <InertiaLink
                                                        href={route(
                                                            "jadwal.edit",
                                                            item.id
                                                        )}
                                                        className="bg-yellow-500 text-white px-4 py-2 rounded-md shadow-md flex items-center space-x-2 transition-all duration-200 hover:bg-yellow-600"
                                                    >
                                                        <FaEdit className="w-4 h-4" />
                                                        <span className="text-sm">
                                                            Edit
                                                        </span>
                                                    </InertiaLink>

                                                    {/* Activate/Deactivate Button */}
                                                    {item.deleted_at ? (
                                                        <button
                                                            onClick={() =>
                                                                handleActivate(
                                                                    item.id
                                                                )
                                                            }
                                                            className="bg-green-500 text-white px-4 py-2 rounded-md shadow-md flex items-center space-x-2 transition-all duration-200 hover:bg-green-600"
                                                        >
                                                            <CiAlarmOff className="w-4 h-4" />
                                                            <span className="text-sm">
                                                                Aktifkan
                                                            </span>
                                                        </button>
                                                    ) : (
                                                        <button
                                                            onClick={() =>
                                                                handleDeactivate(
                                                                    item.id
                                                                )
                                                            }
                                                            className="bg-red-500 text-white px-4 py-2 rounded-md shadow-md flex items-center space-x-2 transition-all duration-200 hover:bg-red-600"
                                                        >
                                                            <CiAlarmOn className="w-4 h-4" />
                                                            <span className="text-sm">
                                                                Nonaktifkan
                                                            </span>
                                                        </button>
                                                    )}
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>

                            {/* Pagination controls */}
                            <div className="my-2 mx-2">
                                <div className="flex justify-between">
                                    {/* Previous page button */}
                                    {jadwal.prev_page_url && (
                                        <InertiaLink
                                            href={jadwal.prev_page_url}
                                            className="px-4 py-2 bg-gray-300 text-black rounded-md hover:bg-gray-400"
                                        >
                                            &laquo; Sebelumnya
                                        </InertiaLink>
                                    )}

                                    {/* Next page button */}
                                    {jadwal.next_page_url && (
                                        <InertiaLink
                                            href={jadwal.next_page_url}
                                            className="px-4 py-2 bg-gray-300 text-black rounded-md hover:bg-gray-400"
                                        >
                                            Berikutnya &raquo;
                                        </InertiaLink>
                                    )}
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </AuthenticatedLayout>
    );
};

export default JadwalIndex;
