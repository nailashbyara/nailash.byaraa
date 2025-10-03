// Mobile Menu Toggle
document.querySelector('.hamburger').addEventListener('click', function() {
    document.querySelector('.nav-links').classList.toggle('active');
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        document.querySelector('.nav-links').classList.remove('active');
    });
});

// =======================================================
//                    BAGIAN TESTIMONIAL SLIDER
// =======================================================
const testimonialItems = document.querySelectorAll('.testimonial-item');
const sliderDots = document.querySelectorAll('.slider-dot');
let currentTestimonial = 0;
let autoSlideInterval; // Variabel untuk menyimpan timer

function showTestimonial(index) {
    // Fungsi ini menampilkan slide yang benar
    testimonialItems.forEach(item => item.classList.remove('active'));
    sliderDots.forEach(dot => dot.classList.remove('active'));
    
    testimonialItems[index].classList.add('active');
    sliderDots[index].classList.add('active');
    currentTestimonial = index;
}

// Fungsi untuk memulai auto slide
function startAutoSlide() {
    // Pastikan ada testimonial sebelum memulai interval
    if (testimonialItems.length > 0) {
        autoSlideInterval = setInterval(() => {
            currentTestimonial = (currentTestimonial + 1) % testimonialItems.length;
            showTestimonial(currentTestimonial);
        }, 5000); // Ganti slide setiap 5 detik
    }
}

// Fungsi untuk menghentikan auto slide
function stopAutoSlide() {
    clearInterval(autoSlideInterval);
}

sliderDots.forEach((dot, index) => {
    dot.addEventListener('click', () => {
        stopAutoSlide(); // Hentikan timer saat tombol diklik
        showTestimonial(index);
        startAutoSlide(); // Mulai lagi timernya dari awal
    });
});

// Jalankan auto slide pertama kali saat halaman dimuat
startAutoSlide();
// =======================================================


// =======================================================
//        BAGIAN FORM SUBMISSION (KIRIM KE WHATSAPP)
// =======================================================
document.querySelector('.booking-form').addEventListener('submit', function(e) {
    e.preventDefault();

    // Mengambil elemen input file
    const buktiTransferInput = document.getElementById('proof');

    // Validasi: Memeriksa apakah file sudah dipilih
    if (buktiTransferInput.files.length === 0) {
        alert('Mohon upload bukti transfer Anda terlebih dahulu.');
        return; // Menghentikan eksekusi jika tidak ada file
    }

    // GANTI DENGAN NOMOR WHATSAPP ANDA (gunakan format 62, bukan 0)
    const nomorTujuan = '6281260598004';

    // Mengambil data dari setiap input formulir
    const nama = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const telepon = document.getElementById('phone').value;
    const layanan = document.getElementById('service').options[document.getElementById('service').selectedIndex].text;
    const tanggal = document.getElementById('date').value;
    const waktu = document.getElementById('time').value;
    const pesan = document.getElementById('message').value;

    // Membuat format pesan WhatsApp yang baru dan lebih jelas
    // %0A digunakan untuk membuat baris baru di URL
    const pesanWhatsApp = `
Halo NailAsh Medan, Saya ingin melakukan booking jadwal.
-----------------------------------
*Nama            :* ${nama}
*Email             :* ${email}
*No. Telepon  :* ${telepon}
*Layanan        :* ${layanan}
*Tanggal         :* ${tanggal}
*Waktu           :* ${waktu}
*Pesan Tambahan  :* ${pesan}
-----------------------------------

*Saya sudah melakukan pembayaran DP dan akan melampirkan bukti transfer di chat ini.*

Mohon konfirmasi ketersediaannya. Terima kasih!
    `;

    // Membuat link WhatsApp yang akan dibuka
    const linkWhatsApp = `https://wa.me/${nomorTujuan}?text=${encodeURIComponent(pesanWhatsApp.trim())}`;

    // Memberi notifikasi kepada pengguna dan membuka link di tab baru
    alert('Anda akan diarahkan ke WhatsApp. Jangan lupa untuk melampirkan bukti transfer Anda di dalam chat.');
    window.open(linkWhatsApp, '_blank');

    // Mengosongkan formulir setelah data diambil
    this.reset();
});
// =======================================================


// =======================================================
//      SCRIPT LAIN (BERJALAN SETELAH HALAMAN DIMUAT)
// =======================================================
document.addEventListener('DOMContentLoaded', function() {
    // Smooth scrolling untuk anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 70, // offset untuk header yang fixed
                    behavior: 'smooth'
                });
            }
        });
    });

    // Mengatur tanggal minimum pada form booking menjadi hari ini
    const today = new Date().toISOString().split('T')[0];
    document.getElementById('date').setAttribute('min', today);

    // Memperbarui tahun di footer secara otomatis
    const currentYear = new Date().getFullYear();
    document.querySelector('.footer-bottom p').innerHTML = `&copy; ${currentYear} Nail Ash Studio. All rights reserved.`;
});