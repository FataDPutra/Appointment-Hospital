import { useForm } from "@inertiajs/react";
import { IoIosArrowBack } from "react-icons/io";
import { FaSuitcaseMedical } from "react-icons/fa6";
import Select from "react-select";
import makeAnimated from "react-select/animated";
import Swal from "sweetalert2";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import Sidebar from "../../Components/Sidebar";

const animatedComponents = makeAnimated();

export default function Show({ daftarPoli, obat, pasien }) {
    const { data, setData, post } = useForm({
        catatan: "",
        obat: [],
    });

    const biayaPemeriksaan = 150000;

    const handleSubmit = (e) => {
        e.preventDefault();

        Swal.fire({
            title: "Konfirmasi Pemeriksaan",
            text: "Apakah Anda yakin ingin menyelesaikan pemeriksaan ini?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Ya, Selesaikan",
            cancelButtonText: "Batal",
            reverseButtons: true,
        }).then((result) => {
            if (result.isConfirmed) {
                post(`/periksa/${daftarPoli.id}`, {
                    onSuccess: () =>
                        Swal.fire(
                            "Selesai!",
                            "Pemeriksaan telah berhasil diselesaikan.",
                            "success"
                        ),
                });
            }
        });
    };

    const obatOptions = obat.map((item) => ({
        value: item.id,
        label: `${item.nama_obat} - Rp. ${item.harga.toLocaleString()}`,
    }));

    const selectedObatDetails = obat.filter((obatItem) =>
        data.obat.includes(obatItem.id)
    );

    const totalHargaObat = selectedObatDetails.reduce(
        (sum, obatItem) => sum + obatItem.harga,
        0
    );

    const totalKeseluruhan = biayaPemeriksaan + totalHargaObat;

    const handleObatChange = (selectedOptions) => {
        const selectedValues = selectedOptions.map((option) => option.value);
        setData("obat", selectedValues);
    };

    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-2xl font-semibold leading-tight">
                    Pemeriksaan Pasien
                </h2>
            }
        >
            <div className="flex">
                <Sidebar />
                <div className="container mx-auto p-6 bg-[#FBF8EF] w-full ml-0 rounded-lg shadow-lg">
                    <h1 className="text-xl font-bold mb-4">
                        Periksa Pasien {daftarPoli.no_antrian}
                    </h1>
                    <p className="text-lg mb-2">
                        <strong>Nama Pasien:</strong> {pasien.nama}
                    </p>
                    <p className="text-lg mb-4">
                        <strong>Keluhan Pasien:</strong> {daftarPoli.keluhan}
                    </p>

                    <form onSubmit={handleSubmit}>
                        <div className="space-y-6">
                            <div>
                                <label className="block mb-2 text-[#78B3CE]">
                                    Catatan
                                </label>
                                <textarea
                                    value={data.catatan}
                                    onChange={(e) =>
                                        setData("catatan", e.target.value)
                                    }
                                    rows="4"
                                    className="w-full border border-[#78B3CE] rounded-md p-4 focus:outline-none focus:ring-2 focus:ring-[#F96E2A] transition-all"
                                />
                            </div>

                            <div>
                                <label className="block mb-2 text-[#78B3CE]">
                                    Pilih Obat
                                </label>
                                <Select
                                    closeMenuOnSelect={false}
                                    components={animatedComponents}
                                    isMulti
                                    value={obatOptions.filter((option) =>
                                        data.obat.includes(option.value)
                                    )}
                                    onChange={handleObatChange}
                                    options={obatOptions}
                                    placeholder="Pilih obat"
                                    className="w-full border border-[#78B3CE] rounded-md p-4 focus:outline-none focus:ring-2 focus:ring-[#F96E2A] transition-all"
                                />
                            </div>

                            <div>
                                <h3 className="text-lg font-bold">Ringkasan</h3>
                                <p>
                                    <strong>Biaya Pemeriksaan:</strong> Rp{" "}
                                    {biayaPemeriksaan.toLocaleString()}
                                </p>
                                <p>
                                    <strong>Total Harga Obat:</strong> Rp{" "}
                                    {totalHargaObat.toLocaleString()}
                                </p>
                                <p>
                                    <strong>Total Keseluruhan:</strong> Rp{" "}
                                    {totalKeseluruhan.toLocaleString()}
                                </p>
                            </div>

                            <div className="mt-6 flex space-x-4">
                                <button
                                    type="button"
                                    onClick={() => history.back()}
                                    className="bg-gray-500 text-white px-5 py-2 rounded-lg shadow-md hover:bg-gray-600 flex items-center space-x-2 transition duration-200 ease-in-out"
                                >
                                    <IoIosArrowBack className="w-5 h-5" />
                                    <span className="text-lg">Kembali</span>
                                </button>

                                <button
                                    type="submit"
                                    className="bg-[#F96E2A] text-white px-5 py-2 rounded-lg shadow-md flex items-center space-x-2 transition-transform transform hover:scale-105 hover:bg-[#F96E2A]/90 duration-200 ease-in-out"
                                >
                                    <FaSuitcaseMedical className="w-5 h-5" />
                                    <span className="text-lg">
                                        Selesai Pemeriksaan
                                    </span>
                                </button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
