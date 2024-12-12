import { useState } from "react";
import { Inertia } from "@inertiajs/inertia";

export default function Edit({ periksa, obat, detailPeriksa }) {
    const [catatan, setCatatan] = useState(periksa.catatan || "");
    const [selectedObat, setSelectedObat] = useState(
        detailPeriksa.map((item) => item.id_obat)
    );

    const handleSubmit = (e) => {
        e.preventDefault();

        // Kirim data ke backend untuk diupdate menggunakan Inertia
        Inertia.put(`/periksa/${periksa.id}`, {
            catatan,
            obat: selectedObat,
        });
    };

    const handleObatChange = (e) => {
        const value = Array.from(
            e.target.selectedOptions,
            (option) => option.value
        );
        setSelectedObat(value);
    };

    return (
        <div style={{ maxWidth: "900px", margin: "0 auto", padding: "20px" }}>
            <h1>Edit Pemeriksaan</h1>
            <form onSubmit={handleSubmit}>
                <div style={{ marginBottom: "20px" }}>
                    <label
                        htmlFor="catatan"
                        style={{ display: "block", marginBottom: "8px" }}
                    >
                        Catatan
                    </label>
                    <textarea
                        id="catatan"
                        value={catatan}
                        onChange={(e) => setCatatan(e.target.value)}
                        style={{
                            width: "100%",
                            padding: "8px",
                            borderRadius: "4px",
                            border: "1px solid #ccc",
                        }}
                    />
                </div>

                <div style={{ marginBottom: "20px" }}>
                    <label
                        htmlFor="obat"
                        style={{ display: "block", marginBottom: "8px" }}
                    >
                        Pilih Obat
                    </label>
                    <select
                        id="obat"
                        multiple
                        value={selectedObat}
                        onChange={handleObatChange}
                        style={{
                            width: "100%",
                            padding: "8px",
                            borderRadius: "4px",
                            border: "1px solid #ccc",
                        }}
                    >
                        {obat.map((item) => (
                            <option key={item.id} value={item.id}>
                                {item.nama_obat} - Rp. {item.harga}
                            </option>
                        ))}
                    </select>
                </div>

                <button
                    type="submit"
                    style={{
                        backgroundColor: "green",
                        color: "white",
                        padding: "8px 16px",
                        borderRadius: "4px",
                        border: "none",
                        cursor: "pointer",
                    }}
                >
                    Simpan Perubahan
                </button>
            </form>
        </div>
    );
}
