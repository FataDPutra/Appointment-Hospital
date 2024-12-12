import React from "react";
import { useForm } from "@inertiajs/react";
import { InertiaLink } from "@inertiajs/inertia-react";

const Create = ({ jadwal }) => {
    const { data, setData, post, processing, errors } = useForm({
        id_jadwal: "",
        keluhan: "",
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        post(route("daftar-poli.store"));
    };

    return (
        <div>
            <h1>Daftar Poli</h1>
            <InertiaLink
                href={route("daftar-poli.index")}
                className="btn btn-secondary mb-3"
            >
                Kembali
            </InertiaLink>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="id_jadwal">Jadwal Dokter</label>
                    <select
                        id="id_jadwal"
                        className="form-control"
                        value={data.id_jadwal}
                        onChange={(e) => setData("id_jadwal", e.target.value)}
                    >
                        <option value="">Pilih Jadwal</option>
                        {jadwal.map((item) => (
                            <option key={item.id} value={item.id}>
                                {item.dokter?.nama || "N/A"} -{" "}
                                {item.dokter?.poli?.nama_poli || "N/A"}(
                                {item.hari} {item.jam_mulai} -{" "}
                                {item.jam_selesai})
                            </option>
                        ))}
                    </select>
                    {errors.id_jadwal && (
                        <div className="text-danger">{errors.id_jadwal}</div>
                    )}
                </div>

                <div className="form-group">
                    <label htmlFor="keluhan">Keluhan</label>
                    <textarea
                        id="keluhan"
                        className="form-control"
                        value={data.keluhan}
                        onChange={(e) => setData("keluhan", e.target.value)}
                    ></textarea>
                    {errors.keluhan && (
                        <div className="text-danger">{errors.keluhan}</div>
                    )}
                </div>

                <button
                    type="submit"
                    className="btn btn-primary"
                    disabled={processing}
                >
                    Daftar
                </button>
            </form>
        </div>
    );
};

export default Create;
