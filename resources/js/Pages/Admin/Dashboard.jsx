import Sidebar from "@/Components/Sidebar";
import { Head } from "@inertiajs/react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";

export default function Dashboard({ auth, totalPoli, totalObat, totalPasien }) {
    return (
        <div className="flex">
            {/* Sidebar */}
            <Sidebar />

            {/* Main Content Area */}
            <div className="flex-1 bg-gray-100">
                <AuthenticatedLayout
                    user={auth.user}
                    header={
                        <h2 className="text-xl font-semibold leading-tight text-gray-800">
                            Dashboard Admin
                        </h2>
                    }
                >
                    <Head title="Dashboard Admin" />

                    <div className="py-12">
                        <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                            <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                                <div className="p-6 text-gray-900">
                                    Selamat datang, {auth.user.name}!
                                </div>
                                <div className="p-6 grid grid-cols-3 gap-4">
                                    <div className="bg-blue-100 p-4 rounded">
                                        <h3 className="font-bold">
                                            Total Poli
                                        </h3>
                                        <p>{totalPoli}</p>
                                    </div>
                                    <div className="bg-green-100 p-4 rounded">
                                        <h3 className="font-bold">
                                            Total Obat
                                        </h3>
                                        <p>{totalObat}</p>
                                    </div>
                                    <div className="bg-red-100 p-4 rounded">
                                        <h3 className="font-bold">
                                            Total Pasien
                                        </h3>
                                        <p>{totalPasien}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </AuthenticatedLayout>
            </div>
        </div>
    );
}
