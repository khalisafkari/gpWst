export default () => {
  return `<!DOCTYPE html>
<html>
<head>
<meta name="viewport" content="width=device-width, initial-scale=1">
<style>
body {
    margin: 0;
    background-color: #262b36;
}
.collapsible {
  background-color: #262b36;
  color: white;
  cursor: pointer;
  padding: 18px;
  width: 100%;
  border: none;
  text-align: left;
  outline: none;
  font-size: 12px;
  font-weight: bold;
  text-transform: uppercase;
}

.active, .collapsible:hover {
  background-color: #555;
}

.content {
  padding: 0 18px;
  display: none;
  overflow: hidden;
  background-color: #f1f1f1;
}

.content p {
    font-size: 14px;
}

</style>
</head>
<body>
<button type="button" class="collapsible">1.1 Apakah anda perlu mendaftar</button>
<div class="content">
  <p>
       Tidak, untuk saat ini kami tidak berencana membuka layanan login / register
  </p>
</div>

<button type="button" class="collapsible">1.2 Bisakah saya melakukan bookmark</button>
<div class="content">
  <p> 
    Bisa, Namun terkadang bookmark di kunci mungkin anda harus berlangganan untuk membuka fiture ini.
    Kami tidak melarang anda melakukan bookmark, 
    silahkan anda lakukan bookmark dengan cara pilih item dan klik save atau icon book,
   </p>
</div>

<button type="button" class="collapsible">1.3 Apakah layanan ini gratis</button>
<div class="content">
  <p>
    Ya, layanan ini gratis dan kami mengikuti ketentuan berdasarkan licensi public / commercial use yang kami gunakan,
    Namun untuk berbayar itu adalah fiture dari aplikasi bukan dari kami menjual product dari licensi public yang kami gunakan
  </p>
</div>

<button type="button" class="collapsible">1.4 Bagaimana cara berlangganan</button>
<div class="content">
  <p>
    Silahkan pilih menu buy / beli / langganan jika tersedia, setiap langganan akan automaticaly di perpanjang.
    Namun anda bisa membatalkannya kapan saja.
  </p>
</div>


<button type="button" class="collapsible">1.5 Bagaimana berhenti berlangganan</button>
<div class="content">
  <p>
    Anda bisa melakukannya melalui playstore anda, dan setelah anda berhenti 
    tidak ada lagi langganan yang akan berjalan
  </p>
</div>


<button type="button" class="collapsible">1.6 Bisakah langganan saya di gunakan di beberapa device</button>
<div class="content">
  <p>
    Perlu di jelaskan kami tidak menyimpan pembelian user di server kami, melainkan semua menggunakan api iap-billing dari google
    Dan setiap pemanggilan menu kami menggukan getInfoPurchase untuk mendeteksi status langganan,
    Namun jika untuk langganan mungkin bisa di gunakan di device lain yang menggukana akun google yang sama.
    Namun kami tidak yakin, untuk lebih jelasnya silahkan hubungi contact payment google
  </p>
</div>

<button type="button" class="collapsible">1.7 Adakah iklan di layanan ini</button>
<div class="content">
  <p>
      Ada namun jarang, kami tidak suka iklan, jadi kami membatasi ruang lingkup iklan, 
      mungkin sekali dalam 30 menit / tidak ada sama sekali.
  </p>
</div>

<button type="button" class="collapsible">1.8 Bisakah saya menghubungi anda</button>
<div class="content">
  <p>
    Dipersilahkan, namun kami akan melihat satu persatu email yang masuk dan kami membalas jika memang itu di perlukan,
    kontak tersedia pada playstore.
  </p>
</div>

<script>
var coll = document.getElementsByClassName("collapsible");
var i;

for (i = 0; i < coll.length; i++) {
  coll[i].addEventListener("click", function() {
    this.classList.toggle("active");
    var content = this.nextElementSibling;
    if (content.style.display === "block") {
      content.style.display = "none";
    } else {
      content.style.display = "block";
    }
  });
}
</script>

</body>
</html>
`;
};
