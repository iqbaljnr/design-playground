export type CraftStageTag =
  | '01 Pahami'
  | '02 Susun'
  | '03 Terjemahkan'
  | '04 Buat & Review';

export interface CraftSlideMeta {
  id: string;
  number: string;
  label: string;
  sectionLabel: string;
  stageTag: CraftStageTag;
  sessionId: string;
  hasLiveDemo?: boolean;
  demoLabel?: string;
  speakerNotes: string;
}

export const CRAFT_SLIDES: CraftSlideMeta[] = [
  /* ==========================================================================
     SECTION 01 — OPENING & DESIGN MINDSET (10 minutes)
     ========================================================================== */
  {
    id: 'slide-01',
    number: '01',
    label: '01 · CREATIVE WORKSHOP',
    sectionLabel: '01 · Pembukaan & Mindset',
    stageTag: '01 Pahami',
    sessionId: 'session-opening',
    speakerNotes:
      'Halo semuanya, selamat datang di workshop DESIGN TO UI/UX: From Visual Thinking to Digital Experience. Gua pengen buka sesi ini dengan sebuah kenyataan yang sering gua temuin di lapangan: banyak orang tertarik belajar desain karena melihat tampilan yang keren atau langsung pengen belajar tools seperti Figma. Tapi di dunia industri nyata, antarmuka digital yang berhasil bukan lahir cuma dari rasa seni atau keberuntungan. Tampilan yang sukses selalu dibangun dari cara berpikir visual yang terstruktur, pemahaman masalah yang jujur, dan alasan yang jelas di balik setiap keputusan. Selama 120 menit ke depan, kita akan belajar bersama layaknya seorang desainer praktisi: bagaimana sebuah masalah dianalisis, dibangun pondasi visualnya, lalu diwujudkan menjadi antarmuka digital yang fungsional.',
  },
  {
    id: 'slide-02',
    number: '02',
    label: '02 · Apa yang Membuat Desain Bagus?',
    sectionLabel: '01 · Pembukaan & Mindset',
    stageTag: '01 Pahami',
    sessionId: 'session-opening',
    hasLiveDemo: true,
    demoLabel: 'Diskusi Terbuka',
    speakerNotes:
      'Sebelum kita masuk ke teori visual, gua pengen lempar satu pertanyaan mendasar ke temen-temen: menurut kalian, apa sih yang membuat sebuah desain dikatakan "bagus"? Apakah karena tampilannya menarik secara estetika? Ataukah karena pesannya langsung jelas tanpa audiens harus berpikir keras? Atau karena sukses membantu pengguna menyelesaikan tujuannya dengan mudah? Coba klik salah satu kartu di depan untuk melihat sudut pandang yang berbeda. Nah, rahasianya: ketiga hal ini bukan pilihan ganda yang saling menjatuhkan. Desain yang hebat membutuhkan ketiganya sekaligus secara seimbang: daya tarik visual mencuri perhatian awal, kejelasan pesan membangun pemahaman, dan kegunaan yang mulus memastikan pengguna mencapai tujuannya dengan tenang.',
  },
  {
    id: 'slide-03',
    number: '03',
    label: '03 · Visual Menjadi Desain',
    sectionLabel: '01 · Pembukaan & Mindset',
    stageTag: '01 Pahami',
    sessionId: 'session-opening',
    hasLiveDemo: true,
    demoLabel: 'Konversi Desain',
    speakerNotes:
      'Di slide ini kita melihat contoh konkret bagaimana sebuah tampilan yang cantik di-convert menjadi desain yang utuh dan bermakna. Di sebelah kiri, kita punya foto kursi yang secara estetika sudah sangat bagus—pencahayaannya pas, bentuknya indah. Tetapi ini baru sebatas "tampilan cantik" atau objek visual polos tanpa konteks. Orang belum tahu kursi apa ini, siapa pembuatnya, atau pesan apa yang ingin disampaikan.\n\nDi sebelah kanan, tampilan cantik ini kita konversi menjadi "desain". Kita tambahkan hierarki tipografi judul "CHAIR", kita atur komposisi bidang miring untuk menciptakan ritme visual yang dinamis, kita masukkan narasi produk, dan metadata seperti nomor model serta edisi koleksi. Sekarang karya ini bukan lagi sekadar foto pajangan, melainkan desain komunikasi visual yang berbicara dan memiliki tujuan jelas.',
  },

  /* ==========================================================================
     SECTION 02 — UNDERSTANDING DESIGN (12 minutes)
     ========================================================================== */
  {
    id: 'slide-04',
    number: '04',
    label: '04 · Apa Itu Desain?',
    sectionLabel: '02 · Memahami Desain',
    stageTag: '01 Pahami',
    sessionId: 'session-m01',
    hasLiveDemo: true,
    demoLabel: 'Masalah vs Solusi',
    speakerNotes:
      'Kalau ditanya secara definitif, apa itu desain? Menurut gua: Desain adalah proses pemecahan masalah dengan niat dan keputusan yang terarah (Intentional Problem Solving). Desain berbeda dengan seni murni. Seni adalah ekspresi bebas perasaan sang seniman tanpa beban menyelesaikan masalah orang lain. Sedangkan desain selalu memiliki audiens, memiliki batasan konteks, dan bertugas mengubah kebingungan menjadi kejelasan. Di demo bawah, kalian bisa amati bagaimana masalah nyata seperti "pengunjung bingung layanan apa yang ditawarkan" dipecahkan lewat perumusan pesan kunci dan solusi tata visual yang tegas.',
  },
  {
    id: 'slide-05',
    number: '05',
    label: '05 · Desain Lebih dari Hiasan',
    sectionLabel: '02 · Memahami Desain',
    stageTag: '01 Pahami',
    sessionId: 'session-m01',
    hasLiveDemo: true,
    demoLabel: 'Peran Tiap Elemen',
    speakerNotes:
      'Di studio desain profesional, lu nggak akan pernah mendengar kalimat "gua taruh kotak ini di sini soalnya kelihatan lucu aja". Setiap elemen visual yang kita pasang di atas kanvas memiliki tugas konkret dalam sistem komunikasi: judul berukuran besar bertugas memimpin pandangan mata pertama kali; warna aksen bertugas menuntun jari untuk mengklik tombol utama; ruang kosong bertugas memberi jeda agar informasi tidak saling bertabrakan; dan garis pembatas bertugas mengelompokkan data yang relevan. Belajar desain pada dasarnya adalah belajar memberi peran fungsional pada setiap elemen visual.',
  },
  {
    id: 'slide-06',
    number: '06',
    label: '06 · Dari Grafis ke Interface',
    sectionLabel: '02 · Memahami Desain',
    stageTag: '01 Pahami',
    sessionId: 'session-m01',
    speakerNotes:
      'Banyak peserta workshop bertanya ke gua: "Gua sudah terbiasa bikin desain grafis poster atau feeds media sosial, apa bedanya saat masuk ke dunia antarmuka digital (UI/UX)?" Jawabannya: pondasi visualnya sama persis—kita tetap menggunakan grid, tipografi, warna, dan kontras. Tetapi konteks penggunaannya berubah total. Desain grafis cetak bersifat pasif satu arah pada media statis berukuran pasti. Sedangkan antarmuka digital bersifat interaktif dua arah di atas layar dinamis yang responsif. Ada interaksi klik, alur berpindah halaman, kondisi loading, dan formulir input. Di dunia digital, desain bukan hanya dilihat, tetapi dipakai langsung oleh manusia nyata.',
  },

  /* ==========================================================================
     SECTION 03 — DESIGN FUNDAMENTALS (30 minutes)
     ========================================================================== */
  {
    id: 'slide-07',
    number: '07',
    label: '07 · Core Principles',
    sectionLabel: '03 · Pondasi Desain Visual',
    stageTag: '02 Susun',
    sessionId: 'session-m02',
    speakerNotes:
      'Sekarang kita memasuki bagian paling fundamental dari seluruh workshop ini. Jangan terburu-buru membuka software desain sebelum menguasai pondasinya. Seluruh antarmuka digital terbaik di dunia berdiri kokoh di atas 3 pilar visual: 1. Tata Letak (Grid & Space) yang menjaga kestabilan posisi; 2. Tipografi yang menyuarakan pesan serta mengatur urutan membaca; dan 3. Warna serta Kontras yang membangun suasana dan menyorot titik fokus tombol CTA. Jika salah satu pilar ini rapuh, tampilan antarmuka akan langsung terasa amatir dan membingungkan pengguna.',
  },
  {
    id: 'slide-08',
    number: '08',
    label: '08 · Teori Warna',
    sectionLabel: '03 · Pondasi Desain Visual',
    stageTag: '02 Susun',
    sessionId: 'session-m04',
    hasLiveDemo: true,
    demoLabel: 'Roda Warna Harmoni',
    speakerNotes:
      'Mari kita pelajari pilar warna. Warna diatur oleh tiga parameter utama: Hue (identitas warna seperti merah atau biru), Saturation (kepekatan pigmen warna), dan Value atau Lightness (tingkat terang-gelapnya warna). Di demo interaktif ini, kalian bisa mencoba harmoni Analogous untuk nuansa tenang yang bersandingan, dan Complementary untuk kontras tinggi yang berseberangan. Satu catatan kritis dari pengalaman gua: psikologi warna itu sangat bergantung pada konteks dan budaya, bukan mitos mutlak. Warna merah di aplikasi trading melambangkan penurunan, di aplikasi makanan membangkitkan selera, dan di budaya Tionghoa melambangkan kemakmuran. Pahami konteks produkmu sebelum memilih palet warna.',
  },
  {
    id: 'slide-09',
    number: '09',
    label: '09 · Warna dalam Desain UI',
    sectionLabel: '03 · Pondasi Desain Visual',
    stageTag: '02 Susun',
    sessionId: 'session-m04',
    speakerNotes:
      'Di antarmuka antarmuka digital, pemilihan warna dilakukan secara fungsional, bukan dekoratif. Kita menggunakan panduan distribusi 60/30/10: 60% warna dominan untuk latar kanvas netral agar mata pengguna tidak cepat lelah; 30% warna struktural untuk kartu dan batasan komponen; dan 10% warna aksen terfokus khusus untuk tombol Call-to-Action (CTA). Ingat, 60/30/10 adalah panduan distribusi luas area. Teks utama (#171717) tidak terikat pada kuota 30% tersebut, melainkan wajib mengikuti standar keterbacaan yang tajam.',
  },
  {
    id: 'slide-10',
    number: '10',
    label: '10 · Mengenal Tipografi',
    sectionLabel: '03 · Pondasi Desain Visual',
    stageTag: '02 Susun',
    sessionId: 'session-m04',
    hasLiveDemo: true,
    demoLabel: 'Definisi & 4 Kegunaan',
    speakerNotes:
      'Setelah menguasai warna, sekarang kita masuk ke pilar kedua: Tipografi. Oliver Reichenstein pernah menyatakan bahwa "Web design is 95% typography". Mengapa? Karena sebagian besar antarmuka digital adalah teks yang dibaca oleh pengguna. Secara definisi, tipografi bukan sekadar memilih font estetik, melainkan seni dan teknik menyusun huruf agar pesan terbaca dengan mudah, nyaman, dan meninggalkan impresi yang tepat. Di dunia UI/UX, ada 4 kegunaan mutlak tipografi: Pertama, menjamin Keterbacaan (Readability) dengan jarak baris 1.5x; Kedua, membangun Hierarki Ukuran agar pengguna langsung tahu judul utama; Ketiga, memancarkan Karakter & Brand Voice; dan Keempat, Menuntun Tombol CTA secara tegas. Di demo ini, coba aktifkan satu per satu kegunaan tersebut untuk melihat perbedaannya secara langsung.',
  },
  {
    id: 'slide-11',
    number: '11',
    label: '11 · Aplikasi pada UI Nyata',
    sectionLabel: '03 · Pondasi Desain Visual',
    stageTag: '02 Susun',
    sessionId: 'session-m04',
    hasLiveDemo: true,
    demoLabel: 'Penerapan Palet UI Nyata',
    speakerNotes:
      'Setelah memahami teori warna dan pondasi tipografi, sekarang kita melihat bagaimana keduanya bersinergi di atas antarmuka nyata. Perhatikan bagaimana warna brand (#C2185B) dipadukan dengan tipografi yang tajam: teks judul menggunakan ukuran besar dan tebal dengan rasio kontras 7:1 di atas kanvas netral, sementara tombol CTA utama mendapatkan porsi warna aksen 10%. Di demo interaktif ini, kalian bisa mencoba mengganti harmoni palet ke Fintech Trust atau Organic Growth—perhatikan bagaimana hierarki tipografi dan struktur layout tetap kokoh dan nyaman dibaca di berbagai pilihan harmoni warna.',
  },
  {
    id: 'slide-12',
    number: '12',
    label: '12 · Hirarki Tipografi',
    sectionLabel: '03 · Pondasi Desain Visual',
    stageTag: '02 Susun',
    sessionId: 'session-m04',
    speakerNotes:
      'Hirarki tipografi adalah cara kita memandu mata pembaca: apa yang harus dibaca nomor 1, nomor 2, dan nomor 3. Kita menyusun skala teks ke dalam 4 tingkatan jelas: H1 Display untuk judul utama yang paling dominan (#1); H2 Subjudul sebagai jembatan penjelas konteks (#2); Body Copy untuk paragraf yang nyaman dibaca (#3); dan Caption atau Label kecil untuk metadata pelengkap (#4). Kesalahan yang paling sering gua temukan pada pemula adalah membuat ukuran judul dan teks isi terlalu mirip, sehingga pembaca kehilangan arah prioritas.',
  },
  {
    id: 'slide-13',
    number: '13',
    label: '13 · Grid & Layout',
    sectionLabel: '03 · Pondasi Desain Visual',
    stageTag: '02 Susun',
    sessionId: 'session-m05',
    hasLiveDemo: true,
    demoLabel: 'Grid 6/12 Kolom',
    speakerNotes:
      'Banyak pemula mengira sistem Grid membatasi kreativitas. Padahal dalam tradisi Swiss Style dan Material Design, Grid adalah fondasi kebebasan. Grid adalah kerangka tak kasat mata yang memastikan setiap elemen duduk sejajar dan teratur. Di desain web modern, kita umumnya menggunakan sistem 12 kolom untuk desktop dan 4 kolom untuk mobile. Tiga anatomi dasarnya adalah: Column tempat meletakkan modul konten, Gutter sebagai celah pemisah antar kolom agar tidak tabrakan, dan Margin sebagai jarak aman di tepi layar agar desain tidak menempel ke batas monitor.',
  },
  {
    id: 'slide-14',
    number: '14',
    label: '14 · Anatomi Ruang Antarmuka',
    sectionLabel: '03 · Pondasi Desain Visual',
    stageTag: '02 Susun',
    sessionId: 'session-m05',
    hasLiveDemo: true,
    demoLabel: 'Peta Ruang Antarmuka',
    speakerNotes:
      'Mari kita terjemahkan istilah tata letak ke dalam analogi nyata yang mudah dipahami: Margin adalah jarak aman di tepi kanvas agar tulisan tidak menempel ke pinggir; Padding adalah ruang bernapas di dalam sebuah tombol atau kotak agar teks tidak terjepit bingkai; Gutter adalah jalan pembatas antar kolom; dan Alignment adalah kelurusan garis vertikal tempat elemen bersandar. Ketika alignment antarmukamu terjaga rapi dalam satu garis lurus, desainmu seketika memancarkan kesan teratur, bersih, dan profesional.',
  },
  {
    id: 'slide-15',
    number: '15',
    label: '15 · Hirarki Visual',
    sectionLabel: '03 · Pondasi Desain Visual',
    stageTag: '02 Susun',
    sessionId: 'session-m03',
    speakerNotes:
      'Berdasarkan riset eye-tracking dari Nielsen Norman Group, pengguna internet jarang membaca teks kata demi kata—mereka melakukan pemindaian visual (scanning). Di halaman artikel mereka memindai dengan pola F-Pattern, sementara di landing page mereka memindai dengan pola Z-Pattern dari kiri atas ke kanan bawah. Hirarki visual adalah instrumen kendali kita: kita mengombinasikan ukuran, ketebalan, kontras warna, dan posisi untuk memastikan mata pengguna langsung tertuju pada pesan utama dan tombol CTA yang kita tuju.',
  },
  {
    id: 'slide-16',
    number: '16',
    label: '16 · Kontras & Keseimbangan',
    sectionLabel: '03 · Pondasi Desain Visual',
    stageTag: '02 Susun',
    sessionId: 'session-m03',
    speakerNotes:
      'Kontras dan Keseimbangan (Visual Balance) bekerja saling menguatkan. Keseimbangan simetris memberikan kesan formal dan stabil, sedangkan keseimbangan asimetris menghasilkan energi visual yang dinamis dan modern. Ingat bahwa kontras bukan hanya tentang warna: ada kontras skala (elemen besar dipasangkan dengan teks kecil), kontras bentuk (lingkaran di antara kotak-kotak teratur), dan kontras ruang (area padat diimbangi ruang terbuka yang lapang). Gunakan kontras secara hemat agar daya tariknya tetap tajam.',
  },
  {
    id: 'slide-17',
    number: '17',
    label: '17 · Menggabungkan Semua Pondasi',
    sectionLabel: '03 · Pondasi Desain Visual',
    stageTag: '02 Susun',
    sessionId: 'session-m05',
    speakerNotes:
      'Sekarang mari kita satukan seluruh puzzle pondasi visual yang sudah kita pelajari: Grid menjaga keteraturan posisi kolom; Tipografi mengatur urutan baca dari judul hingga rincian; Warna fungsional menuntun fokus ke tombol CTA; dan Kontras keterbacaan menjamin pesan langsung ditangkap pengguna. Ketika seluruh pondasi ini bersinergi, antarmuka yang kalian buat bukan hanya sedap dipandang, tetapi terasa kokoh, terpercaya, dan siap bertransformasi menjadi produk digital.',
  },

  /* ==========================================================================
     SECTION 04 — UNDERSTANDING UI/UX (15 minutes)
     ========================================================================== */
  {
    id: 'slide-18',
    number: '18',
    label: '18 · Apa Itu Desain UI/UX?',
    sectionLabel: '04 · Memahami UI/UX',
    stageTag: '03 Terjemahkan',
    sessionId: 'session-m07',
    hasLiveDemo: true,
    demoLabel: 'Keputusan UI/UX',
    speakerNotes:
      'Kita melangkah ke Bagian 4: Memahami UI dan UX. Jangan sampai kalian menyelesaikan workshop ini dengan anggapan bahwa UI dan UX adalah dua disiplin yang terpisah. UI (User Interface) adalah bagian di dalam ekosistem UX (User Experience). UI adalah wujud nyata yang dilihat dan disentuh: warna, tombol, tipografi, dan tata letak. Sedangkan UX mencakup keseluruhan pengalaman: kemudahan alur, efisiensi langkah, aksesibilitas, dan kepuasan pengguna. Analogi kedai kopi favorit gua: Buku menu yang tertata rapi dan cangkir yang estetik adalah UI; tetapi antrean yang tertib, keramahan pelayanan, rasa kopi yang pas, dan suasana nyaman sampai kita pulang adalah UX.',
  },
  {
    id: 'slide-19',
    number: '19',
    label: '19 · Contoh Alur Pesan Makanan',
    sectionLabel: '04 · Memahami UI/UX',
    stageTag: '03 Terjemahkan',
    sessionId: 'session-m07',
    speakerNotes:
      'Agar konsep ini semakin konkrit, mari kita bedah perjalanan pengguna saat memesan makanan secara online: Proses dimulai dari rasa lapar pengguna (kebutuhan). Pengguna membuka aplikasi, mencari menu lewat bilah pencarian (interaksi UI), memilih makanan, lalu checkout dengan formulir ringkas dan transparansi ongkos kirim (efisiensi UX). Setelah pembayaran, ada fitur pelacakan kurir secara langsung (memberikan kepastian waktu dan rasa tenang pada UX), hingga pesanan tiba dengan selamat. Bayangkan jika tampilan aplikasinya luar biasa indah, tetapi sistem pembayarannya sering gagal atau status kurir tidak jelas—pengguna pasti akan frustrasi dan menghapus aplikasi. Itulah bukti bahwa pengalaman pengguna yang utuh selalu memegang peranan penentu.',
  },
  {
    id: 'slide-20',
    number: '20',
    label: '20 · Mengapa Usability Penting?',
    sectionLabel: '04 · Memahami UI/UX',
    stageTag: '03 Terjemahkan',
    sessionId: 'session-m03',
    speakerNotes:
      'Di industri produk teknologi, tolak ukur keberhasilan desain adalah Usability (kebergunaan). Jakob Nielsen dari Nielsen Norman Group merumuskan 5 dimensi kualitas usability yang wajib kita evaluasi: 1. Learnability: seberapa cepat pengguna baru memahami antarmuka saat pertama kali bertemu?; 2. Efficiency: seberapa cepat mereka menyelesaikan tugas saat sudah terbiasa?; 3. Memorability: jika mereka kembali setelah beberapa waktu, apakah mereka masih mengingat caranya?; 4. Errors: seberapa sedikit kesalahan yang dilakukan, dan seberapa mudah mereka memulihkannya?; 5. Satisfaction: apakah mereka merasa nyaman dan puas menggunakannya? Jika antarmuka gagal pada usability, keindahan visualnya menjadi sia-sia.',
  },
  {
    id: 'slide-21',
    number: '21',
    label: '21 · Human-Centred Design',
    sectionLabel: '04 · Memahami UI/UX',
    stageTag: '03 Terjemahkan',
    sessionId: 'session-m01',
    speakerNotes:
      'Prinsip filosofis yang menaungi seluruh dunia UI/UX modern adalah Human-Centred Design, yang distandardisasi dalam ISO 9241-210. Prinsip intinya sangat jujur: kita merancang untuk manusia nyata dengan segala keterbatasan, kebiasaan, dan kondisi emosinya—bukan untuk selera pribadi sang desainer. Siklusnya berjalan dalam 4 tahap berkesinambungan: 1. Memahami konteks penggunaan pengguna di dunia nyata; 2. Merumuskan kebutuhan spesifik pengguna; 3. Merancang solusi antarmuka; dan 4. Mengevaluasi hasil rancangan langsung bersama pengguna. Desainer yang hebat selalu menaruh empati pada pengguna sebagai pusat dari setiap keputusan.',
  },

  /* ==========================================================================
     SECTION 05 — DESIGN PROCESS (10 minutes)
     ========================================================================== */
  {
    id: 'slide-22',
    number: '22',
    label: '22 · Desain Adalah Proses',
    sectionLabel: '05 · Proses Desain',
    stageTag: '03 Terjemahkan',
    sessionId: 'session-m01',
    speakerNotes:
      'Salah satu kesalahpahaman terbesar pemula adalah menganggap desain adalah proses garis lurus yang langsung jadi sekali coba. Tidak pernah ada desainer profesional yang bekerja seperti itu. Desain adalah proses yang berulang (iterative). Kerangka kerja paling terkenal di dunia adalah Double Diamond dari British Design Council: Berlian pertama adalah Ruang Masalah (Problem Space)—kita membuka eksplorasi secara luas (Discover) lalu mengerucutkan masalah inti (Define). Berlian kedua adalah Ruang Solusi (Solution Space)—kita mengeksplorasi banyak alternatif rancangan (Develop) lalu menyempurnakan solusi terbaik (Deliver). Jangan pernah takut merevisi karya saat menemukan wawasan baru.',
  },
  {
    id: 'slide-23',
    number: '23',
    label: '23 · Design Thinking',
    sectionLabel: '05 · Proses Desain',
    stageTag: '03 Terjemahkan',
    sessionId: 'session-m01',
    speakerNotes:
      'Metodologi praktis dari proses tadi adalah 5 Tahap Design Thinking yang dikembangkan Stanford d.school: 1. Empathize: amati dan dengarkan kebutuhan pengguna tanpa asumsi; 2. Define: rumuskan pernyataan masalah yang tajam dan berpusat pada manusia; 3. Ideate: lontarkan sebanyak mungkin alternatif gagasan solusi; 4. Prototype: wujudkan ide ke dalam model nyata yang bisa diuji; dan 5. Test: berikan prototipe tersebut kepada pengguna langsung dan catat letak kebingungan mereka. Ingat bahwa kelima tahapan ini bukan prosedur kaku satu arah—saat tahap pengujian menemukan kelemahan, kita bisa langsung melompat kembali ke tahap perumusan ide atau prototipe.',
  },

  /* ==========================================================================
     SECTION 06 — FROM PRINCIPLES TO INTERFACE (8 minutes)
     ========================================================================== */
  {
    id: 'slide-24',
    number: '24',
    label: '24 · Memahami Tingkat Fidelity',
    sectionLabel: '06 · Prinsip ke Interface',
    stageTag: '03 Terjemahkan',
    sessionId: 'session-m07',
    speakerNotes:
      'Sebelum kita memulai proyek praktik, pahami konsep Design Fidelity (tingkat kedalaman rancangan): Low-Fidelity (Lo-Fi) adalah sketsa kasar di kertas atau wireframe kotak dasar untuk menyepakati alur struktur tanpa terganggu warna; Mid-Fidelity (Mid-Fi) adalah tata letak digital grayscale bergrid terukur untuk memvalidasi spasi dan alur baca; dan High-Fidelity (Hi-Fi) adalah hasil akhir dengan warna brand, tipografi asli, dan interaksi nyata. Catatan penting dari gua: High-Fidelity tidak otomatis berarti kegunaan lebih baik. Jangan habiskan waktu berjam-jam mewarnai tombol jika struktur informasinya masih rapuh di tahap sketsa.',
  },
  {
    id: 'slide-25',
    number: '25',
    label: '25 · Anatomi Hero Section',
    sectionLabel: '06 · Prinsip ke Interface',
    stageTag: '03 Terjemahkan',
    sessionId: 'session-m07',
    hasLiveDemo: true,
    demoLabel: '7 Bagian Hero Web',
    speakerNotes:
      'Inilah komponen antarmuka yang akan kita buat di sesi praktik: Website Hero Section berukuran desktop 1440 × 900 px. Hero section adalah area pertama di atas lipatan layar yang dilihat pengunjung sebelum mereka menggulir halaman. Terdapat 7 bagian kunci yang wajib ada: 1. Bilah Navigasi Atas; 2. Logo Studio; 3. Judul Utama (Primary Headline) yang menyatakan nilai produk; 4. Kalimat Penjelas (Value Proposition) yang ringkas; 5. Tombol CTA Utama (Primary CTA); 6. Tombol CTA Kedua (Secondary CTA); dan 7. Visual Utama penangkap mata. Di demo interaktif ini, kalian bisa mengecek peran masing-masing elemen secara mendalam.',
  },
  {
    id: 'slide-26',
    number: '26',
    label: '26 · Dari Prinsip ke Keputusan',
    sectionLabel: '06 · Prinsip ke Interface',
    stageTag: '03 Terjemahkan',
    sessionId: 'session-m07',
    speakerNotes:
      'Di slide ini, seluruh teori yang telah kita pelajari diterjemahkan secara nyata menjadi keputusan antarmuka: Mengapa judul diletakkan di kiri atas? Karena mengikuti pola baca Z-Pattern dan hirarki tipografi H1. Mengapa tombol Call-to-Action diberi warna magenta kontras? Karena menerapkan prinsip Gestalt Similarity dan porsi aksen 10% agar langsung tertangkap mata. Mengapa ada jarak aman 80px di tepi kanvas? Karena mengikuti sistem Grid dan Whitespace. Dan mengapa teks menggunakan warna gelap berasio 12:1? Karena mematuhi standar aksesibilitas WCAG. Setiap pixel di layar memiliki alasan yang dapat dipertanggungjawabkan.',
  },

  /* ==========================================================================
     SECTION 07 — PRACTICAL CHALLENGE (30 minutes)
     ========================================================================== */
  {
    id: 'slide-27',
    number: '27',
    label: '27 · Tantangan Desain Kamu',
    sectionLabel: '07 · Tantangan Praktik',
    stageTag: '04 Buat & Review',
    sessionId: 'session-c02',
    speakerNotes:
      'Saatnya kalian beraksi langsung! Ini adalah brief proyek praktik kita: Buat 1 tampilan Hero Section Website untuk sebuah Studio Kreatif (FORM / STUDIO) di kanvas desktop 1440 × 900 px. Komponen yang wajib disertakan: Logo Studio, Menu Navigasi, Judul Utama yang tegas, Kalimat Penjelas singkat, Tombol CTA Utama + Tombol Kedua, dan 1 Visual Hero di sebelah kanan. Batasan desainnya: gunakan grid teratur, batasi palet warna fungsional maksimal 3 warna, dan terapkan hirarki tipografi 4 level. Jangan takut salah—fokuskan perhatian pada kejelasan pesan dan kerapian penataan ruang.',
  },

  /* ==========================================================================
     SECTION 08 — REVIEW & CLOSING (5 minutes)
     ========================================================================== */
  {
    id: 'slide-28',
    number: '28',
    label: '28 · Pesan Penutup & Manifesto',
    sectionLabel: '08 · Review & Penutup',
    stageTag: '04 Buat & Review',
    sessionId: 'session-closing',
    speakerNotes:
      'Sebagai penutup workshop hari ini, gua ingin menitipkan satu prinsip penting yang selalu gua pegang di meja kerja: "Don\'t Just Make It Look Good. Make It Make Sense." Estetika visual akan selalu kehilangan makna jika pengguna merasa bingung atau tersesat. Desainlah dengan empati, berkaryalah dengan tujuan yang jelas, dan jangan pernah berhenti mengamati antarmuka di sekitar kalian. Manfaatkan fitur kuis dan tantangan lanjutan di platform ini untuk terus mengasah kepekaan desain kalian. Terima kasih banyak atas antusiasme dan proses kreatif teman-teman semua hari ini!',
  },
];
