import InputLabel from "@/Components/InputLabel";
import TextInput from "@/Components/TextInput";
import PrimaryButton from "@/Components/PrimaryButton";
import InputError from "@/Components/InputError";
import { useForm, usePage } from "@inertiajs/react";

export default function UpdateProfileInformationForm({
    mustVerifyEmail,
    status,
    className = "",
}) {
    const user = usePage().props.auth.user;

    const { data, setData, patch, errors, processing, recentlySuccessful } =
        useForm({
            nama: user.nama,
            email: user.email,
            no_hp: user.no_hp || "",
            alamat: user.alamat || "",
        });

    const submit = (e) => {
        e.preventDefault();
        patch(route("profile.update"));
    };

    return (
        <section className={className}>
            <header>
                <h2 className="text-lg font-medium text-gray-900">
                    Informasi Profil
                </h2>

                <p className="mt-1 text-sm text-gray-600">
                    Ubah informasi profil Anda.
                </p>
            </header>

            <form onSubmit={submit} className="mt-6 space-y-6">
                <div>
                    <InputLabel htmlFor="nama" value="Nama" />
                    <TextInput
                        id="nama"
                        value={data.nama}
                        onChange={(e) => setData("nama", e.target.value)}
                        className="mt-1 block w-full"
                        autoComplete="name"
                    />
                    <InputError message={errors.nama} />
                </div>

                <div>
                    <InputLabel htmlFor="email" value="Email" />
                    <TextInput
                        id="email"
                        type="email"
                        value={data.email}
                        onChange={(e) => setData("email", e.target.value)}
                        className="mt-1 block w-full"
                        autoComplete="username"
                    />
                    <InputError message={errors.email} />
                </div>

                <div>
                    <InputLabel htmlFor="no_hp" value="Nomor HP" />
                    <TextInput
                        id="no_hp"
                        value={data.no_hp}
                        onChange={(e) => setData("no_hp", e.target.value)}
                        className="mt-1 block w-full"
                        autoComplete="tel"
                    />
                    <InputError message={errors.no_hp} />
                </div>

                <div>
                    <InputLabel htmlFor="alamat" value="Alamat" />
                    <TextInput
                        id="alamat"
                        value={data.alamat}
                        onChange={(e) => setData("alamat", e.target.value)}
                        className="mt-1 block w-full"
                        autoComplete="street-address"
                    />
                    <InputError message={errors.alamat} />
                </div>

                <div className="flex items-center gap-4">
                    <PrimaryButton disabled={processing}>Simpan</PrimaryButton>
                    {recentlySuccessful && (
                        <p className="text-sm text-green-600">Tersimpan.</p>
                    )}
                </div>
            </form>
        </section>
    );
}
