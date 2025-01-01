import React from "react";
import { InertiaLink } from "@inertiajs/inertia-react";
import AuthenticatedLayoutPasien from "@/Layouts/AuthenticatedLayoutPasien";
import PasienSidebar from "../../Components/PasienSidebar";
import { FaNotesMedical } from "react-icons/fa";
import { Head } from "@inertiajs/react";

const Index = ({ daftarPoli }) => {
    // Function to format the date
    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString(); // Formats as 'MM/DD/YYYY'
    };

    return (
        <AuthenticatedLayoutPasien
            header={
                <h2 className="text-2xl font-semibold leading-tight text-gray-800">
                    Pendaftaran Poli
                </h2>
            }
        >
            <Head title="Pendaftaran Poli" />

            <div className="flex">
                <PasienSidebar />
                <div className="container mx-auto p-6 ml-0 bg-[#FBF8EF] rounded-lg shadow-lg w-full">
                    <div className="flex justify-between items-center mb-6">
                        <InertiaLink
                            href={route("daftar-poli.create")}
                            className="bg-[#F96E2A] text-white px-5 py-2 rounded-lg shadow-md flex items-center space-x-2 transition-transform transform hover:scale-105 hover:bg-[#F96E2A]/90 duration-200 ease-in-out"
                        >
                            <FaNotesMedical className="w-5 h-5" />
                            <span>Tambah Pendaftaran</span>
                        </InertiaLink>
                    </div>
                    <div className="text-center text-gray-500 py-4">
                        Riwayat Pendaftaran
                    </div>
                    {daftarPoli.data.length === 0 ? (
                        <div className="text-center text-gray-500 py-4">
                            Tidak ada data riwayat pendaftaran.
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
                                                Tanggal Periksa
                                            </th>
                                            <th className="border p-2 text-center">
                                                Dokter
                                            </th>
                                            <th className="border p-2 text-center">
                                                Poli
                                            </th>
                                            <th className="border p-2 text-center">
                                                Hari
                                            </th>
                                            <th className="border p-2 text-center">
                                                Jam
                                            </th>
                                            <th className="border p-2 text-center">
                                                Nomor Antrian
                                            </th>
                                            <th className="border p-2 text-center">
                                                Status
                                            </th>
                                            <th className="border p-2 text-center">
                                                Riwayat
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody className="text-sm">
                                        {daftarPoli.data.map((item, index) => (
                                            <tr
                                                key={item.id}
                                                className="hover:bg-[#F3F3F3] transition-all duration-200"
                                            >
                                                <td className="border p-4 text-center">
                                                    {index +
                                                        1 +
                                                        (daftarPoli.current_page -
                                                            1) *
                                                            daftarPoli.per_page}
                                                </td>
                                                <td className="border p-4 text-center">
                                                    {formatDate(
                                                        item.periksa
                                                            ?.tgl_periksa
                                                    )}
                                                </td>
                                                <td className="border p-4">
                                                    {item.jadwal?.dokter
                                                        ?.nama || "N/A"}
                                                </td>
                                                <td className="border p-4">
                                                    {item.jadwal?.dokter?.poli
                                                        ?.nama_poli || "N/A"}
                                                </td>
                                                <td className="border p-4 text-center">
                                                    {item.jadwal?.hari || "N/A"}
                                                </td>
                                                <td className="border p-4 text-center">
                                                    {item.jadwal?.jam_mulai} -{" "}
                                                    {item.jadwal?.jam_selesai}
                                                </td>
                                                <td className="border p-4 text-center">
                                                    {item.no_antrian}
                                                </td>
                                                <td className="border p-4 text-center">
                                                    {item.deleted_at ? (
                                                        <span className="text-green-600">
                                                            Sudah Diperiksa
                                                        </span>
                                                    ) : (
                                                        <span className="text-yellow-600">
                                                            Pending
                                                        </span>
                                                    )}
                                                </td>
                                                <td className="border p-4 text-center">
                                                    <InertiaLink
                                                        href={route(
                                                            "daftar-poli.riwayat",
                                                            item.id
                                                        )}
                                                        className="text-blue-600 hover:text-blue-800"
                                                    >
                                                        Riwayat
                                                    </InertiaLink>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                            <div className="mt-4 flex justify-center">
                                {daftarPoli.links.map((link, index) => (
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
        </AuthenticatedLayoutPasien>
    );
};

export default Index;
