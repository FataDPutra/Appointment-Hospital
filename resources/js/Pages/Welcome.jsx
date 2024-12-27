import { Head, Link } from "@inertiajs/react";
import ApplicationLogo from "@/Components/ApplicationLogo";

export default function Welcome({ auth }) {
    return (
        <>
            {/* Page Title */}
            <Head title="RS Sehat Sepertinya" />

            <div className="min-h-screen bg-[#FBF8EF] flex flex-col">
                {/* Header */}
                <header className="bg-gradient-to-r from-[#78B3CE] to-[#c9e6f0] text-white py-8 shadow-lg">
                    <div className="container mx-auto px-6 flex justify-between items-center">
                        {/* Logo and Title */}
                        <div className="flex items-center space-x-4">
                            <Link href="/">
                                <ApplicationLogo className="block h-10 w-auto fill-current text-white" />
                            </Link>
                            <h1 className="text-3xl font-extrabold tracking-tight">
                                <a
                                    href="#"
                                    className="hover:text-[#F96E2A] transition duration-200"
                                >
                                    RS Sehat Sepertinya
                                </a>
                            </h1>
                        </div>

                        {/* Navigation */}
                        <nav>
                            <ul className="flex space-x-8 text-lg font-semibold">
                                <li>
                                    <a
                                        href="#"
                                        className="hover:text-[#F96E2A] transition duration-200"
                                    >
                                        Beranda
                                    </a>
                                </li>
                                <li>
                                    <a
                                        href="#"
                                        className="hover:text-[#F96E2A] transition duration-200"
                                    >
                                        Layanan
                                    </a>
                                </li>
                                <li>
                                    <a
                                        href="#"
                                        className="hover:text-[#F96E2A] transition duration-200"
                                    >
                                        Kontak
                                    </a>
                                </li>
                            </ul>
                        </nav>
                    </div>
                </header>

                {/* Hero Section */}
                <main className="flex-grow container mx-auto px-6 py-16">
                    <div className="grid md:grid-cols-2 gap-12 items-center">
                        {/* Hero Text */}
                        <div>
                            <h2 className="text-4xl font-extrabold text-[#78B3CE] mb-6">
                                Selamat Datang di Rumah Sakit Sehat Sepertinya
                            </h2>
                            <p className="text-gray-600 mb-8 leading-relaxed text-lg">
                                Kami memberikan pelayanan kesehatan terbaik
                                dengan tenaga medis profesional dan fasilitas
                                modern untuk kesembuhan Anda.
                            </p>
                            <div className="flex space-x-6">
                                <Link
                                    href={route("pasien.login")}
                                    className="bg-[#F96E2A] text-white px-8 py-4 rounded-lg shadow-lg hover:bg-[#F96E2A]/90 transition duration-300 transform hover:scale-105 hover:shadow-xl"
                                >
                                    Login Pasien
                                </Link>
                                <Link
                                    href={route("login")}
                                    className="bg-[#78B3CE] text-white px-8 py-4 rounded-lg shadow-lg hover:bg-[#78B3CE]/90 transition duration-300 transform hover:scale-105 hover:shadow-xl"
                                >
                                    Login Dokter
                                </Link>
                            </div>
                        </div>

                        {/* Hero Image */}
                        <div>
                            <img
                                src="/images/rumahsakit.webp" // Path ke file gambar
                                alt="Rumah Sakit Ilustrasi"
                                className="w-full h-auto rounded-xl transform hover:scale-105 transition duration-300"
                            />
                        </div>
                    </div>

                    {/* Layanan Unggulan */}
                    <section className="mt-16">
                        <h3 className="text-3xl font-extrabold text-center mb-12 text-[#78B3CE]">
                            Layanan Unggulan
                        </h3>
                        <div className="grid md:grid-cols-3 gap-8">
                            {[
                                {
                                    title: "Rawat Inap",
                                    description:
                                        "Fasilitas rawat inap dengan perawatan berkualitas",
                                    icon: "🏥",
                                },
                                {
                                    title: "Rawat Jalan",
                                    description:
                                        "Pemeriksaan dan konsultasi dengan dokter spesialis",
                                    icon: "👩‍⚕️",
                                },
                                {
                                    title: "IGD 24 Jam",
                                    description:
                                        "Pelayanan darurat siap setiap saat",
                                    icon: "🚑",
                                },
                            ].map((service, index) => (
                                <div
                                    key={index}
                                    className="bg-white p-8 rounded-xl shadow-lg text-center hover:scale-105 hover:shadow-xl transition transform"
                                >
                                    <div className="text-5xl mb-6 text-[#78B3CE]">
                                        {service.icon}
                                    </div>
                                    <h4 className="text-2xl font-semibold mb-4 text-[#F96E2A]">
                                        {service.title}
                                    </h4>
                                    <p className="text-gray-600 text-lg">
                                        {service.description}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </section>
                </main>

                {/* Footer */}
                <footer className="bg-gradient-to-r from-[#78B3CE] to-[#C9E6F0] text-white py-6 mt-16">
                    <div className="container mx-auto px-6 text-center">
                        <p>&copy; 2024 Fata Dwi Putra. Semua Hak Dilindungi.</p>
                    </div>
                </footer>
            </div>
        </>
    );
}
