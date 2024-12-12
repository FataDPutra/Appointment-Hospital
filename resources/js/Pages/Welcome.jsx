import { Head, Link } from "@inertiajs/react";

export default function Welcome({ auth }) {
    return (
        <>
            <Head title="RS Sehat Sejahtera" />
            <div className="min-h-screen bg-gray-100 flex flex-col">
                {/* Header */}
                <header className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-6 shadow-md">
                    <div className="container mx-auto px-4 flex justify-between items-center">
                        <div className="flex items-center">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-10 w-10 mr-3"
                                viewBox="0 0 24 24"
                                fill="currentColor"
                            >
                                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm5 11h-4v4h-2v-4H7v-2h4V7h2v4h4v2z" />
                            </svg>
                            <h1 className="text-2xl font-extrabold">
                                RS Sehat Sejahtera
                            </h1>
                        </div>
                        <nav>
                            <ul className="flex space-x-6">
                                <li>
                                    <a
                                        href="#"
                                        className="hover:text-blue-200 transition duration-200"
                                    >
                                        Beranda
                                    </a>
                                </li>
                                <li>
                                    <a
                                        href="#"
                                        className="hover:text-blue-200 transition duration-200"
                                    >
                                        Layanan
                                    </a>
                                </li>
                                <li>
                                    <a
                                        href="#"
                                        className="hover:text-blue-200 transition duration-200"
                                    >
                                        Kontak
                                    </a>
                                </li>
                            </ul>
                        </nav>
                    </div>
                </header>

                {/* Hero Section */}
                <main className="flex-grow container mx-auto px-4 py-12">
                    <div className="grid md:grid-cols-2 gap-8 items-center">
                        <div>
                            <h2 className="text-4xl font-extrabold text-gray-800 mb-6">
                                Selamat Datang di Rumah Sakit Sehat Sejahtera
                            </h2>
                            <p className="text-gray-600 mb-8 leading-relaxed">
                                Kami memberikan pelayanan kesehatan terbaik
                                dengan tenaga medis profesional dan fasilitas
                                modern untuk kesembuhan Anda.
                            </p>
                            <div className="flex space-x-4">
                                <Link
                                    href={route("pasien.login")}
                                    className="bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg hover:bg-green-600 transition duration-300"
                                >
                                    Login Pasien
                                </Link>
                                <Link
                                    href={route("login")}
                                    className="bg-blue-500 text-white px-6 py-3 rounded-lg shadow-lg hover:bg-blue-600 transition duration-300"
                                >
                                    Login Dokter
                                </Link>
                            </div>
                        </div>
                        <div>
                            <img
                                src="/images/hospital-illustration.svg"
                                alt="Rumah Sakit Ilustrasi"
                                className="w-full h-auto transform hover:scale-105 transition duration-300"
                            />
                        </div>
                    </div>

                    {/* Layanan Unggulan */}
                    <section className="mt-16">
                        <h3 className="text-3xl font-extrabold text-center mb-10 text-gray-800">
                            Layanan Unggulan
                        </h3>
                        <div className="grid md:grid-cols-3 gap-6">
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
                                    className="bg-white p-6 rounded-xl shadow-lg text-center transition transform hover:scale-105 hover:shadow-xl"
                                >
                                    <div className="text-5xl mb-4">
                                        {service.icon}
                                    </div>
                                    <h4 className="text-xl font-semibold mb-3 text-gray-800">
                                        {service.title}
                                    </h4>
                                    <p className="text-gray-600">
                                        {service.description}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </section>
                </main>

                {/* Footer */}
                <footer className="bg-gradient-to-r from-blue-700 to-indigo-700 text-white py-6">
                    <div className="container mx-auto px-4 text-center">
                        <p>&copy; 2024 Fata Dwi Putra. Semua Hak Dilindungi.</p>
                    </div>
                </footer>
            </div>
        </>
    );
}
