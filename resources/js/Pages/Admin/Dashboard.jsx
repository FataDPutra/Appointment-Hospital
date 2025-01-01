import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";
import Sidebar from "@/Components/Sidebar";
import { Line } from "react-chartjs-2"; // Import Line chart from react-chartjs-2
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
} from "chart.js";

// Register components to use Line chart
ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
);

export default function Dashboard({
    totalPasien,
    totalDokter,
    totalPoli,
    totalObat,
}) {
    // Data for each line chart with dots (points)
    const chartDataPasien = {
        labels: ["Pasien"],
        datasets: [
            {
                label: "Jumlah Pasien",
                data: [totalPasien],
                backgroundColor: "rgba(120, 179, 206, 0.7)", // Set color for points
                borderColor: "rgba(95, 141, 151, 1)", // Set border color for points
                pointBackgroundColor: "rgba(120, 179, 206, 0.7)", // Point color
                pointBorderColor: "rgba(95, 141, 151, 1)", // Point border color
                pointRadius: 5, // Radius of the points
                fill: false, // Don't fill the area under the line
                borderWidth: 2, // Border width for the line
            },
        ],
    };

    const chartDataDokter = {
        labels: ["Dokter"],
        datasets: [
            {
                label: "Jumlah Dokter",
                data: [totalDokter],
                backgroundColor: "rgba(201, 230, 240, 0.7)",
                borderColor: "rgba(168, 212, 232, 1)",
                pointBackgroundColor: "rgba(201, 230, 240, 0.7)",
                pointBorderColor: "rgba(168, 212, 232, 1)",
                pointRadius: 5,
                fill: false,
                borderWidth: 2,
            },
        ],
    };

    const chartDataPoli = {
        labels: ["Poli"],
        datasets: [
            {
                label: "Jumlah Poli",
                data: [totalPoli],
                backgroundColor: "rgba(249, 110, 42, 0.7)",
                borderColor: "rgba(249, 115, 22, 1)",
                pointBackgroundColor: "rgba(249, 110, 42, 0.7)",
                pointBorderColor: "rgba(249, 115, 22, 1)",
                pointRadius: 5,
                fill: false,
                borderWidth: 2,
            },
        ],
    };

    const chartDataObat = {
        labels: ["Obat"],
        datasets: [
            {
                label: "Jumlah Obat",
                data: [totalObat],
                backgroundColor: "rgba(120, 179, 206, 0.7)",
                borderColor: "rgba(95, 141, 151, 1)",
                pointBackgroundColor: "rgba(120, 179, 206, 0.7)",
                pointBorderColor: "rgba(95, 141, 151, 1)",
                pointRadius: 5,
                fill: false,
                borderWidth: 2,
            },
        ],
    };

    const chartOptions = {
        responsive: true,
        plugins: {
            legend: {
                display: false, // Hide legend
            },
            title: {
                display: false, // Hide title
            },
        },
        scales: {
            y: {
                beginAtZero: true, // Make sure the y-axis starts from 0
            },
            x: {
                beginAtZero: true, // Make sure the x-axis starts from 0
                grid: {
                    display: false, // Hide gridlines on x-axis
                },
            },
        },
    };

    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-2xl font-semibold leading-tight text-gray-800">
                    Dashboard Admin
                </h2>
            }
        >
            <Head title="Dashboard Admin" />
            <div className="flex">
                {/* Sidebar */}
                <Sidebar />
                {/* Main Content */}
                <div className="container mx-auto p-6 ml-0 bg-[#FBF8EF] rounded-lg shadow-lg w-full">
                    {/* Welcome Message */}
                    <div className="mb-6 p-6 bg-gradient-to-r from-[#78B3CE] to-[#C9E6F0] text-white rounded-lg shadow-md">
                        <h1 className="text-2xl font-bold">
                            Selamat Datang, Admin!
                        </h1>
                        <p className="mt-2">
                            Kelola data dengan menggunakan panel ini.
                        </p>
                    </div>

                    {/* Statistics Cards */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        <div className="p-6 bg-white rounded-lg shadow-md border-l-4 border-[#78B3CE]">
                            <h2 className="text-lg font-semibold text-gray-700">
                                Total Pasien
                            </h2>
                            <p className="mt-4 text-3xl font-bold text-[#78B3CE]">
                                {totalPasien}
                            </p>
                            {/* Line Chart for Pasien with dots */}
                            <div className="mt-4 h-24">
                                <Line
                                    data={chartDataPasien}
                                    options={chartOptions}
                                />
                            </div>
                        </div>

                        <div className="p-6 bg-white rounded-lg shadow-md border-l-4 border-[#C9E6F0]">
                            <h2 className="text-lg font-semibold text-gray-700">
                                Total Dokter
                            </h2>
                            <p className="mt-4 text-3xl font-bold text-[#C9E6F0]">
                                {totalDokter}
                            </p>
                            {/* Line Chart for Dokter with dots */}
                            <div className="mt-4 h-24">
                                <Line
                                    data={chartDataDokter}
                                    options={chartOptions}
                                />
                            </div>
                        </div>

                        <div className="p-6 bg-white rounded-lg shadow-md border-l-4 border-[#F96E2A]">
                            <h2 className="text-lg font-semibold text-gray-700">
                                Total Poli
                            </h2>
                            <p className="mt-4 text-3xl font-bold text-[#F96E2A]">
                                {totalPoli}
                            </p>
                            {/* Line Chart for Poli with dots */}
                            <div className="mt-4 h-24">
                                <Line
                                    data={chartDataPoli}
                                    options={chartOptions}
                                />
                            </div>
                        </div>

                        <div className="p-6 bg-white rounded-lg shadow-md border-l-4 border-[#78B3CE]">
                            <h2 className="text-lg font-semibold text-gray-700">
                                Total Obat
                            </h2>
                            <p className="mt-4 text-3xl font-bold text-[#78B3CE]">
                                {totalObat}
                            </p>
                            {/* Line Chart for Obat with dots */}
                            <div className="mt-4 h-24">
                                <Line
                                    data={chartDataObat}
                                    options={chartOptions}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
