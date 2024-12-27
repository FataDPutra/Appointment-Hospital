import { InertiaLink } from "@inertiajs/inertia-react";
import { FaEdit } from "react-icons/fa";
import { FaSuitcaseMedical } from "react-icons/fa6";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import Sidebar from "../../Components/Sidebar"; // Pastikan untuk mengimpor Sidebar

const PeriksaIndex = ({ daftarPoli }) => {
    // Fungsi untuk mengubah status pemeriksaan
    const handlePeriksa = (id) => {
        window.location.href = `/periksa/${id}`;
    };

    const handleEdit = (id) => {
        window.location.href = `/periksa/${id}/edit`;
    };

    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-2xl font-semibold leading-tight text-gray-800">
                    Daftar Pemeriksaan
                </h2>
            }
        >
            <div className="flex">
                <Sidebar />
                <div className="container mx-auto p-6 ml-0 bg-[#FBF8EF] rounded-lg shadow-lg w-full">
                    {/* Jika tidak ada data pemeriksaan */}
                    {daftarPoli.data.length === 0 ? (
                        <div className="text-center text-gray-500 py-4">
                            Tidak ada data pemeriksaan.
                        </div>
                    ) : (
                        <div className="overflow-x-auto bg-white rounded-lg shadow-md">
                            <table className="w-full table-auto border-collapse">
                                <thead className="bg-[#78B3CE] text-white text-sm">
                                    <tr>
                                        <th className="border p-3 text-center">
                                            No Antrian
                                        </th>
                                        <th className="border p-3 text-center">
                                            Nama Pasien
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
                                    {daftarPoli.data.map((poli) => (
                                        <tr
                                            key={poli.id}
                                            className="hover:bg-[#F3F3F3] transition-all duration-200"
                                        >
                                            <td className="border p-4">
                                                {poli.no_antrian}
                                            </td>
                                            <td className="border p-4">
                                                {poli.pasien?.nama ||
                                                    "Tidak Ada Nama"}
                                            </td>
                                            <td className="border p-4">
                                                {poli.status ===
                                                "Sudah Diperiksa" ? (
                                                    <span className="bg-gray-500 text-white py-1 px-3 rounded-full text-xs">
                                                        Sudah Diperiksa
                                                    </span>
                                                ) : (
                                                    <span className="bg-green-500 text-white py-1 px-3 rounded-full text-xs">
                                                        Belum Diperiksa
                                                    </span>
                                                )}
                                            </td>
                                            <td className="border p-4">
                                                <div className="flex space-x-3 justify-center">
                                                    {/* Periksa Button */}
                                                    {poli.status ===
                                                    "Belum Diperiksa" ? (
                                                        <button
                                                            onClick={() =>
                                                                handlePeriksa(
                                                                    poli.id
                                                                )
                                                            }
                                                            className="bg-blue-500 text-white px-4 py-2 rounded-md shadow-md flex items-center space-x-2 transition-all duration-200 hover:bg-blue-600"
                                                        >
                                                            <FaSuitcaseMedical className="w-4 h-4" />
                                                            <span className="text-sm">
                                                                Periksa
                                                            </span>
                                                        </button>
                                                    ) : (
                                                        <button
                                                            onClick={() =>
                                                                handleEdit(
                                                                    poli.id
                                                                )
                                                            }
                                                            className="bg-yellow-500 text-white px-4 py-2 rounded-md shadow-md flex items-center space-x-2 transition-all duration-200 hover:bg-yellow-600"
                                                        >
                                                            <FaEdit className="w-4 h-4" />
                                                            <span className="text-sm">
                                                                Edit
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
                            <div className="my-4 mx-4">
                                <div className="flex justify-between">
                                    {/* Previous page button */}
                                    {daftarPoli.prev_page_url && (
                                        <InertiaLink
                                            href={daftarPoli.prev_page_url}
                                            className="px-4 py-2 bg-gray-300 text-black rounded-md hover:bg-gray-400"
                                        >
                                            &laquo; Sebelumnya
                                        </InertiaLink>
                                    )}

                                    {/* Next page button */}
                                    {daftarPoli.next_page_url && (
                                        <InertiaLink
                                            href={daftarPoli.next_page_url}
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

export default PeriksaIndex;
