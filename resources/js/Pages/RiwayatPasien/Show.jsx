import React from "react";

export default function Show({ riwayat }) {
    console.log("Data Riwayat:", riwayat); // Debugging

    if (!riwayat || riwayat.length === 0) {
        return <div>Tidak ada riwayat pemeriksaan untuk pasien ini.</div>;
    }

    return (
        <div>
            <h1>Riwayat Lengkap Pasien</h1>
            <table className="table">
                <thead>
                    <tr>
                        <th>No</th>
                        <th>Keluhan</th>
                        <th>Tanggal Periksa</th>
                        <th>Catatan</th>
                        <th>Biaya Periksa</th>
                        <th>Dokter</th>
                        <th>Obat yang Diberikan</th>
                    </tr>
                </thead>
                <tbody>
                    {riwayat.map((daftarPoli, index) => {
                        // Ambil keluhan dari daftarPoli
                        const keluhan = daftarPoli.keluhan;

                        // Ambil dokter dari jadwal
                        const dokter = daftarPoli.jadwal?.dokter;

                        // Ambil data periksa
                        const periksaData = daftarPoli.periksa;

                        // Jika tidak ada periksa, tampilkan baris kosong
                        if (!periksaData) {
                            return (
                                <tr key={index}>
                                    <td colSpan={7}>
                                        Tidak ada riwayat pemeriksaan
                                    </td>
                                </tr>
                            );
                        }

                        return (
                            <tr key={index}>
                                <td>{index + 1}</td>
                                <td>{keluhan || "Tidak ada keluhan"}</td>
                                <td>
                                    {periksaData.tgl_periksa ||
                                        "Tanggal tidak tersedia"}
                                </td>
                                <td>
                                    {periksaData.catatan ||
                                        "Catatan tidak tersedia"}
                                </td>
                                <td>
                                    {periksaData.biaya_periksa
                                        ? new Intl.NumberFormat().format(
                                              periksaData.biaya_periksa
                                          )
                                        : "Biaya tidak tersedia"}
                                </td>
                                <td>
                                    {dokter
                                        ? dokter.nama
                                        : "Dokter tidak tersedia"}
                                </td>
                                <td>
                                    {periksaData.detail_periksa &&
                                    periksaData.detail_periksa.length > 0 ? (
                                        <ul>
                                            {periksaData.detail_periksa.map(
                                                (detail, detailIdx) => (
                                                    <li key={detailIdx}>
                                                        {detail.obat
                                                            ?.nama_obat ||
                                                            "Nama obat tidak tersedia"}{" "}
                                                        (
                                                        {detail.obat?.kemasan ||
                                                            "Kemasan tidak tersedia"}
                                                        )
                                                    </li>
                                                )
                                            )}
                                        </ul>
                                    ) : (
                                        <span>Tidak ada obat</span>
                                    )}
                                </td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        </div>
    );
}
