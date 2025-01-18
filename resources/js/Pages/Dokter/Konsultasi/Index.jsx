import React from "react";
import { Inertia } from "@inertiajs/inertia";
import Swal from "sweetalert2";
import { InertiaLink } from "@inertiajs/inertia-react";
import AuthenticatedLayoutDokter from "@/Layouts/AuthenticatedLayoutDokter"; // Layout khusus untuk dokter
import DokterSidebar from "../../Components/DokterSidebar"; // Sidebar khusus dokter
import { FaNotesMedical } from "react-icons/fa";
import { Head } from "@inertiajs/react";
import { FaEdit, FaTrashAlt } from "react-icons/fa";

const Index = ({ konsultasi }) => {
    const handleDelete = (id) => {
        Swal.fire({
            title: "Apakah Anda yakin?",
            text: "Konsultasi ini akan dihapus!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#d33",
            cancelButtonColor: "#3085d6",
            confirmButtonText: "Hapus",
            cancelButtonText: "Batal",
            reverseButtons: true,
        }).then((result) => {
            if (result.isConfirmed) {
                Inertia.delete(route("dokter.konsultasi.destroy", id));
                Swal.fire("Terhapus!", "Konsultasi telah dihapus.", "success");
            }
        });
    };

    // Fungsi untuk memformat tanggal
    const formatDate = (dateString) => {
        if (!dateString) {
            return "Belum Dijawab"; // Return default message jika tidak ada tanggal
        }
        const date = new Date(dateString);
        return date.toLocaleDateString(); // Format tanggal menjadi 'MM/DD/YYYY'
    };

    return (
        <AuthenticatedLayoutDokter
            header={
                <h2 className="text-2xl font-semibold leading-tight text-gray-800">
                    Konsultasi Pasien
                </h2>
            }
        >
            <Head title="Konsultasi Pasien" />

            <div className="flex">
                <DokterSidebar />
                <div className="container mx-auto p-6 ml-0 bg-[#FBF8EF] rounded-lg shadow-lg w-full">
                    <div className="flex justify-between items-center mb-6">
                        <InertiaLink
                            href={route("dokter.konsultasi.create")}
                            className="bg-[#F96E2A] text-white px-5 py-2 rounded-lg shadow-md flex items-center space-x-2 transition-transform transform hover:scale-105 hover:bg-[#F96E2A]/90 duration-200 ease-in-out"
                        >
                            <FaNotesMedical className="w-5 h-5" />
                            <span>Tambah Konsultasi</span>
                        </InertiaLink>
                    </div>
                    <div className="text-center text-gray-500 py-4">
                        Riwayat Konsultasi
                    </div>
                    {konsultasi.data.length === 0 ? (
                        <div className="text-center text-gray-500 py-4">
                            Tidak ada data riwayat konsultasi.
                        </div>
                    ) : (
                        <>
                            <div className="overflow-x-auto bg-white rounded-lg shadow-md">
                                <table className="w-full table-auto border-collapse">
                                    <thead className="bg-[#78B3CE] text-white text-sm">
                                        <tr>
                                            <th className="border p-2 text-center">
                                                No
                                            </th>
                                            <th className="border p-2 text-center">
                                                Tanggal Konsultasi
                                            </th>
                                            <th className="border p-2 text-center">
                                                Pasien
                                            </th>
                                            <th className="border p-2 text-center">
                                                Subject
                                            </th>
                                            <th className="border p-2 text-center">
                                                Pertanyaan
                                            </th>
                                            <th className="border p-2 text-center">
                                                Jawaban
                                            </th>
                                            <th className="border p-2 text-center">
                                                Aksi
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody className="text-sm">
                                        {konsultasi.data.map((item, index) => (
                                            <tr
                                                key={item.id}
                                                className="hover:bg-[#F3F3F3] transition-all duration-200"
                                            >
                                                <td className="border p-4 text-center">
                                                    {index +
                                                        1 +
                                                        (konsultasi.current_page -
                                                            1) *
                                                            konsultasi.per_page}
                                                </td>
                                                <td className="border p-4 text-center">
                                                    {formatDate(
                                                        item.tgl_konsultasi
                                                    )}
                                                </td>
                                                <td className="border p-4">
                                                    {item.pasien?.nama || "N/A"}
                                                </td>
                                                <td className="border p-4 text-center">
                                                    {item.subject || "N/A"}
                                                </td>
                                                <td className="border p-4 text-center">
                                                    {item.pertanyaan || "N/A"}
                                                </td>
                                                <td className="border p-4 text-center">
                                                    {item.jawaban ||
                                                        "Belum Terjawab"}
                                                </td>
                                                <div className="border p-4 flex space-x-3 justify-center">
                                                    {/* Edit Button */}
                                                    <InertiaLink
                                                        href={route(
                                                            "dokter.konsultasi.edit",
                                                            item.id
                                                        )}
                                                        className="bg-yellow-500 text-white px-4 py-2 rounded-md shadow-md flex items-center space-x-2 transition-all duration-200 hover:bg-yellow-600"
                                                    >
                                                        <FaEdit className="w-4 h-4" />
                                                        <span className="text-sm">
                                                            Edit
                                                        </span>
                                                    </InertiaLink>

                                                    {/* Delete Button */}
                                                    <button
                                                        onClick={() =>
                                                            handleDelete(
                                                                item.id
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
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                            <div className="mt-4 flex justify-center">
                                {konsultasi.links.map((link, index) => (
                                    <InertiaLink
                                        key={index}
                                        href={link.url}
                                        className={`px-3 py-1 mx-1 rounded ${
                                            link.active
                                                ? "bg-[#F96E2A] text-white"
                                                : "bg-white text-[#F96E2A]"
                                        }`}
                                        dangerouslySetInnerHTML={{
                                            __html: link.label,
                                        }}
                                    />
                                ))}
                            </div>
                        </>
                    )}
                </div>
            </div>
        </AuthenticatedLayoutDokter>
    );
};

export default Index;
