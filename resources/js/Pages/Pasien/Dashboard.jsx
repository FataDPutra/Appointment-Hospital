import React from "react";
import { useForm } from "@inertiajs/react";

export default function Dashboard({ pasien }) {
    const { post } = useForm();

    const logout = (e) => {
        e.preventDefault();
        post(route("pasien.logout"));
    };

    return (
        <div>
            <h1>Selamat Datang, {pasien.nama}</h1>
            <p>Nomor Rekam Medis Anda: {pasien.no_rm}</p>
            <button onClick={logout}>Logout</button>
        </div>
    );
}
