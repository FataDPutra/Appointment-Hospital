import { useState } from "react";

export default function Index({ daftarPoli }) {
    const [isEditing, setIsEditing] = useState(null);

    const handlePeriksa = (id) => {
        window.location.href = `/periksa/${id}`;
    };

    const handleEdit = (id) => {
        setIsEditing(id); // Set state isEditing to the id of the selected record for editing
        window.location.href = `/periksa/${id}/edit`; // Navigate to the Edit page
    };

    const handleCancelEdit = () => {
        setIsEditing(null); // Cancel editing
    };

    return (
        <div style={{ maxWidth: "900px", margin: "0 auto", padding: "20px" }}>
            <h1>Daftar Pemeriksaan</h1>
            <table style={{ width: "100%", borderCollapse: "collapse" }}>
                <thead>
                    <tr>
                        <th>No Antrian</th>
                        <th>Nama Pasien</th>
                        <th>Status</th>
                        <th>Aksi</th>
                    </tr>
                </thead>
                <tbody>
                    {daftarPoli.map((poli) => (
                        <tr key={poli.id}>
                            <td>{poli.no_antrian}</td>
                            <td>{poli.pasien?.nama || "Tidak Ada Nama"}</td>
                            <td>
                                {poli.status === "Sudah Diperiksa" ? (
                                    <span
                                        style={{
                                            backgroundColor: "gray",
                                            color: "white",
                                            padding: "5px",
                                            borderRadius: "4px",
                                        }}
                                    >
                                        Sudah Diperiksa
                                    </span>
                                ) : (
                                    <span
                                        style={{
                                            backgroundColor: "green",
                                            color: "white",
                                            padding: "5px",
                                            borderRadius: "4px",
                                        }}
                                    >
                                        Belum Diperiksa
                                    </span>
                                )}
                            </td>
                            <td>
                                {poli.status === "Belum Diperiksa" ? (
                                    <button
                                        onClick={() => handlePeriksa(poli.id)}
                                        style={{
                                            backgroundColor: "blue",
                                            color: "white",
                                            padding: "8px 16px",
                                            borderRadius: "4px",
                                            border: "none",
                                            cursor: "pointer",
                                        }}
                                    >
                                        Periksa
                                    </button>
                                ) : (
                                    <div>
                                        <button
                                            onClick={() => handleEdit(poli.id)}
                                            style={{
                                                backgroundColor: "orange",
                                                color: "white",
                                                padding: "8px 16px",
                                                borderRadius: "4px",
                                                border: "none",
                                                cursor: "pointer",
                                                marginRight: "10px",
                                            }}
                                        >
                                            Edit
                                        </button>
                                    </div>
                                )}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {/* Add a message if no data is available */}
            {daftarPoli.length === 0 && (
                <p style={{ textAlign: "center", fontStyle: "italic" }}>
                    Belum ada data pemeriksaan.
                </p>
            )}
        </div>
    );
}
