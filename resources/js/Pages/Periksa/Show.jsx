import { useForm } from "@inertiajs/react";

export default function Show({ daftarPoli, obat, pasien }) {
    const { data, setData, post } = useForm({
        catatan: "",
        obat: [],
    });

    const biayaPemeriksaan = 150000;

    const handleSubmit = (e) => {
        e.preventDefault();
        post(`/periksa/${daftarPoli.id}`, {
            onSuccess: () => alert("Pemeriksaan selesai"),
        });
    };

    // Filter data obat yang dipilih berdasarkan ID
    const selectedObatDetails = obat.filter((obatItem) =>
        data.obat.includes(String(obatItem.id))
    );

    // Hitung total harga obat yang dipilih
    const totalHargaObat = selectedObatDetails.reduce(
        (sum, obatItem) => sum + obatItem.harga,
        0
    );

    // Hitung total keseluruhan (biaya pemeriksaan + total harga obat)
    const totalKeseluruhan = biayaPemeriksaan + totalHargaObat;

    const removeObat = (id) => {
        setData(
            "obat",
            data.obat.filter((obatId) => obatId !== String(id))
        );
    };

    return (
        <div style={{ maxWidth: "600px", margin: "0 auto" }}>
            <h1>Periksa Pasien {daftarPoli.no_antrian}</h1>
            <h2>Nama Pasien: {pasien.nama}</h2>
            <h2>Keluhan Pasien: {pasien.keluhan}</h2>

            <form onSubmit={handleSubmit}>
                <div style={{ marginBottom: "20px" }}>
                    <label style={{ display: "block", marginBottom: "8px" }}>
                        Catatan
                    </label>
                    <textarea
                        value={data.catatan}
                        onChange={(e) => setData("catatan", e.target.value)}
                        rows="4"
                        style={{
                            width: "100%",
                            padding: "8px",
                            border: "1px solid #ccc",
                            borderRadius: "4px",
                        }}
                    />
                </div>

                <div style={{ marginBottom: "20px" }}>
                    <label style={{ display: "block", marginBottom: "8px" }}>
                        Pilih Obat
                    </label>
                    <select
                        multiple
                        value={data.obat}
                        onChange={(e) =>
                            setData(
                                "obat",
                                Array.from(
                                    e.target.selectedOptions,
                                    (option) => option.value
                                )
                            )
                        }
                        style={{
                            width: "100%",
                            height: "120px",
                            padding: "8px",
                            border: "1px solid #ccc",
                            borderRadius: "4px",
                        }}
                    >
                        {obat.map((obatItem) => (
                            <option key={obatItem.id} value={obatItem.id}>
                                {obatItem.nama_obat} - Rp{" "}
                                {obatItem.harga.toLocaleString()}
                            </option>
                        ))}
                    </select>
                </div>

                <div style={{ marginBottom: "20px" }}>
                    <h3>Obat yang Dipilih:</h3>
                    {selectedObatDetails.length > 0 ? (
                        <>
                            <ul style={{ listStyleType: "none", padding: 0 }}>
                                {selectedObatDetails.map((obatItem) => (
                                    <li
                                        key={obatItem.id}
                                        style={{
                                            display: "flex",
                                            justifyContent: "space-between",
                                            alignItems: "center",
                                            marginBottom: "8px",
                                            padding: "8px",
                                            border: "1px solid #ccc",
                                            borderRadius: "4px",
                                            backgroundColor: "#f9f9f9",
                                        }}
                                    >
                                        <span>
                                            {obatItem.nama_obat} - Rp{" "}
                                            {obatItem.harga.toLocaleString()}
                                        </span>
                                        <button
                                            type="button"
                                            onClick={() =>
                                                removeObat(obatItem.id)
                                            }
                                            style={{
                                                backgroundColor: "red",
                                                color: "white",
                                                border: "none",
                                                padding: "5px 10px",
                                                borderRadius: "4px",
                                                cursor: "pointer",
                                            }}
                                        >
                                            Hapus
                                        </button>
                                    </li>
                                ))}
                            </ul>
                            <p>
                                <strong>Total Harga Obat: </strong>Rp{" "}
                                {totalHargaObat.toLocaleString()}
                            </p>
                        </>
                    ) : (
                        <p>Tidak ada obat yang dipilih.</p>
                    )}
                </div>

                <div style={{ marginBottom: "20px" }}>
                    <h3>Total Biaya Pemeriksaan</h3>
                    <p>
                        <strong>Biaya Pemeriksaan: </strong>Rp{" "}
                        {biayaPemeriksaan.toLocaleString()}
                    </p>
                    <p>
                        <strong>Total Keseluruhan: </strong>Rp{" "}
                        {totalKeseluruhan.toLocaleString()}
                    </p>
                </div>

                <button
                    type="submit"
                    style={{
                        padding: "10px 20px",
                        backgroundColor: "blue",
                        color: "white",
                        border: "none",
                        borderRadius: "4px",
                        cursor: "pointer",
                    }}
                >
                    Selesai Pemeriksaan
                </button>
            </form>
        </div>
    );
}
