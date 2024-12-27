import { FaEnvelope, FaLock, FaSignInAlt } from "react-icons/fa"; // Import the icons
import Checkbox from "@/Components/Checkbox";
import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import PrimaryButton from "@/Components/PrimaryButton";
import TextInput from "@/Components/TextInput";
import GuestLayout from "@/Layouts/GuestLayout";
import { IoIosArrowBack } from "react-icons/io";
import { Head, Link, useForm } from "@inertiajs/react";

export default function Login({ status, canResetPassword }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        email: "",
        password: "",
        remember: false,
    });

    const submit = (e) => {
        e.preventDefault();

        post(route("login"), {
            onFinish: () => reset("password"),
        });
    };

    return (
        <GuestLayout>
            <Head title="Login" />
            <button
                onClick={() => (window.location.href = "/")}
                className="absolute top-4 left-4 text-gray-500 hover:text-[#FF8F50] transition duration-300"
            >
                <IoIosArrowBack className="w-8 h-8" />
            </button>

            {status && (
                <div className="mb-4 text-sm font-medium text-green-600">
                    {status}
                </div>
            )}

            <form onSubmit={submit}>
                <div>
                    <InputLabel htmlFor="email" value="Email" />

                    <div className="relative">
                        <TextInput
                            id="email"
                            type="email"
                            name="email"
                            value={data.email}
                            className="mt-1 block w-full pl-10 border border-[#78B3CE] focus:ring-[#F96E2A] focus:border-[#F96E2A]"
                            autoComplete="username"
                            isFocused={true}
                            onChange={(e) => setData("email", e.target.value)}
                        />
                        <FaEnvelope className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#78B3CE]" />
                    </div>

                    <InputError message={errors.email} className="mt-2" />
                </div>

                <div className="mt-4">
                    <InputLabel htmlFor="password" value="Password" />

                    <div className="relative">
                        <TextInput
                            id="password"
                            type="password"
                            name="password"
                            value={data.password}
                            className="mt-1 block w-full pl-10 border border-[#78B3CE] focus:ring-[#F96E2A] focus:border-[#F96E2A]"
                            autoComplete="current-password"
                            onChange={(e) =>
                                setData("password", e.target.value)
                            }
                        />
                        <FaLock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#78B3CE]" />
                    </div>

                    <InputError message={errors.password} className="mt-2" />
                </div>

                {/* <div className="mt-4 block">
                    <label className="flex items-center">
                        <Checkbox
                            name="remember"
                            checked={data.remember}
                            onChange={(e) =>
                                setData("remember", e.target.checked)
                            }
                        />
                        <span className="ms-2 text-sm text-[#333333]">
                            Remember me
                        </span>
                    </label>
                </div> */}

                <div className="mt-4 flex items-center justify-end">
                    {/* {canResetPassword && (
                        <Link
                            href={route("password.request")}
                            className="rounded-md text-sm text-[#F96E2A] underline hover:text-[#333333] focus:outline-none focus:ring-2 focus:ring-[#F96E2A] focus:ring-offset-2"
                        >
                            Forgot your password?
                        </Link>
                    )} */}

                    <PrimaryButton
                        className="ms-4 hover:bg-[#F96E2A]/80 transition duration-300 ease-in-out flex items-center justify-center"
                        disabled={processing}
                        style={{ backgroundColor: "#F96E2A" }}
                    >
                        <FaSignInAlt className="mr-2" />
                        Log in
                    </PrimaryButton>
                </div>
            </form>
        </GuestLayout>
    );
}
