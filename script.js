// ==========================================
// DATA PESANAN
// ==========================================

let pesanan = JSON.parse(
    localStorage.getItem("pesananSariRoti")
) || [];


// ==========================================
// FORM PEMESANAN
// ==========================================

document.addEventListener("DOMContentLoaded", function () {

    const orderForm = document.getElementById("orderForm");

    if (orderForm) {

        orderForm.addEventListener("submit", function (event) {

            event.preventDefault();


            const nama = document.getElementById("nama").value.trim();
            const email = document.getElementById("email").value.trim();
            const telepon = document.getElementById("telepon").value.trim();
            const produk = document.getElementById("produk").value;
            const jumlah = document.getElementById("jumlah").value;
            const alamat = document.getElementById("alamat").value.trim();
            const metode = document.getElementById("metode").value;


            if (
                nama === "" ||
                email === "" ||
                telepon === "" ||
                produk === "" ||
                jumlah === "" ||
                alamat === "" ||
                metode === ""
            ) {

                alert("Mohon lengkapi semua data pesanan.");

                return;

            }


            const yakin = confirm(
                "Apakah Anda sudah yakin untuk menyimpan pesanan?"
            );


            if (!yakin) {

                return;

            }


            const dataPesanan = {

                id: Date.now(),

                nama: nama,

                email: email,

                telepon: telepon,

                produk: produk,

                jumlah: Number(jumlah),

                alamat: alamat,

                metode: metode,

                tanggal: new Date().toLocaleString("id-ID")

            };


            pesanan.push(dataPesanan);


            localStorage.setItem(
                "pesananSariRoti",
                JSON.stringify(pesanan)
            );


            alert(
                "Pesanan berhasil disimpan."
            );


            window.location.href = "laporan.html";

        });

    }


    tampilkanLaporan();

});


// ==========================================
// MENAMPILKAN LAPORAN
// ==========================================

function tampilkanLaporan() {

    const tabel = document.getElementById("tabelPesanan");

    if (!tabel) {
        return;
    }


    tabel.innerHTML = "";


    const totalPesanan =
        document.getElementById("totalPesanan");

    const totalProduk =
        document.getElementById("totalProduk");


    if (totalPesanan) {

        totalPesanan.textContent =
            pesanan.length;

    }


    let jumlahSemuaProduk = 0;


    if (pesanan.length === 0) {

        tabel.innerHTML = `

            <tr>

                <td colspan="7">

                    <div class="empty-report">

                        <h3>
                            Belum Ada Pesanan
                        </h3>

                        <p>
                            Belum ada data pesanan yang tersimpan.
                        </p>

                        <br>

                        <a href="pesanan.html"
                           class="btn">

                            Buat Pesanan

                        </a>

                    </div>

                </td>

            </tr>

        `;


        if (totalProduk) {

            totalProduk.textContent = "0";

        }


        return;

    }


    pesanan.forEach(function (item, index) {

        jumlahSemuaProduk += Number(item.jumlah);


        const row =
            document.createElement("tr");


        row.innerHTML = `

            <td>
                ${index + 1}
            </td>

            <td>
                ${item.nama}
            </td>

            <td>
                ${item.email}
            </td>

            <td>
                ${item.produk}
            </td>

            <td>
                ${item.jumlah}
            </td>

            <td>

                <span class="payment-badge">
                    ${item.metode}
                </span>

            </td>

            <td>

                <button
                    class="delete-btn"
                    onclick="hapusPesanan(${item.id})">

                    Hapus

                </button>

            </td>

        `;


        tabel.appendChild(row);

    });


    if (totalProduk) {

        totalProduk.textContent =
            jumlahSemuaProduk;

    }

}


// ==========================================
// HAPUS SATU PESANAN
// ==========================================

function hapusPesanan(id) {

    const yakin = confirm(
        "Apakah Anda yakin ingin menghapus pesanan ini?"
    );


    if (!yakin) {

        return;

    }


    pesanan = pesanan.filter(function (item) {

        return item.id !== id;

    });


    localStorage.setItem(
        "pesananSariRoti",
        JSON.stringify(pesanan)
    );


    tampilkanLaporan();

}


// ==========================================
// HAPUS SEMUA PESANAN
// ==========================================

function hapusSemuaPesanan() {

    if (pesanan.length === 0) {

        alert(
            "Belum ada data pesanan."
        );

        return;

    }


    const yakin = confirm(
        "Apakah Anda yakin ingin menghapus semua pesanan?"
    );


    if (!yakin) {

        return;

    }


    pesanan = [];


    localStorage.removeItem(
        "pesananSariRoti"
    );


    tampilkanLaporan();

}