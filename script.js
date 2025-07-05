// Daftar provinsi dan kode area untuk generate NIK
const provinsiCodes = {
    'ACEH': '11',
    'SUMATERA UTARA': '12',
    'SUMATERA BARAT': '13',
    'RIAU': '14',
    'JAMBI': '15',
    'SUMATERA SELATAN': '16',
    'BENGKULU': '17',
    'LAMPUNG': '18',
    'KEPULAUAN BANGKA BELITUNG': '19',
    'KEPULAUAN RIAU': '21',
    'DKI JAKARTA': '31',
    'JAWA BARAT': '32',
    'JAWA TENGAH': '33',
    'DI YOGYAKARTA': '34',
    'JAWA TIMUR': '35',
    'BANTEN': '36',
    'BALI': '51',
    'NUSA TENGGARA BARAT': '52',
    'NUSA TENGGARA TIMUR': '53',
    'KALIMANTAN BARAT': '61',
    'KALIMANTAN TENGAH': '62',
    'KALIMANTAN SELATAN': '63',
    'KALIMANTAN TIMUR': '64',
    'KALIMANTAN UTARA': '65',
    'SULAWESI UTARA': '71',
    'SULAWESI TENGAH': '72',
    'SULAWESI SELATAN': '73',
    'SULAWESI TENGGARA': '74',
    'GORONTALO': '75',
    'SULAWESI BARAT': '76',
    'MALUKU': '81',
    'MALUKU UTARA': '82',
    'PAPUA BARAT': '91',
    'PAPUA': '94'
};

// Fungsi untuk generate NIK
function generateNIK() {
    const provinsi = document.getElementById('provinsi').value.toUpperCase();
    const tanggalLahir = document.getElementById('tanggal_lahir').value;
    const jenisKelamin = document.getElementById('jenis_kelamin').value;
    
    if (!provinsi || !tanggalLahir || !jenisKelamin) {
        alert('Mohon isi Provinsi, Tanggal Lahir, dan Jenis Kelamin terlebih dahulu untuk generate NIK!');
        return;
    }

    // Kode provinsi (2 digit)
    const kodeProvinsi = provinsiCodes[provinsi] || '31'; // Default Jakarta jika tidak ditemukan
    
    // Kode kabupaten/kota (2 digit) - random
    const kodeKabKota = String(Math.floor(Math.random() * 99) + 1).padStart(2, '0');
    
    // Kode kecamatan (2 digit) - random
    const kodeKecamatan = String(Math.floor(Math.random() * 99) + 1).padStart(2, '0');
    
    // Tanggal lahir (6 digit: DDMMYY)
    const date = new Date(tanggalLahir);
    let tanggal = String(date.getDate()).padStart(2, '0');
    
    // Jika perempuan, tambah 40 ke tanggal
    if (jenisKelamin === 'PEREMPUAN') {
        tanggal = String(parseInt(tanggal) + 40).padStart(2, '0');
    }
    
    const bulan = String(date.getMonth() + 1).padStart(2, '0');
    const tahun = String(date.getFullYear()).slice(-2);
    const tanggalLahirFormatted = tanggal + bulan + tahun;
    
    // Nomor urut (4 digit) - random
    const nomorUrut = String(Math.floor(Math.random() * 9999) + 1).padStart(4, '0');
    
    // Gabungkan semua
    const nik = kodeProvinsi + kodeKabKota + kodeKecamatan + tanggalLahirFormatted + nomorUrut;
    
    // Tampilkan di form
    const nikDisplay = document.createElement('div');
    nikDisplay.innerHTML = `
        <div style="background: #e6fffa; border: 2px solid #38b2ac; border-radius: 8px; padding: 15px; margin: 15px 0;">
            <h4 style="color: #2c7a7b; margin-bottom: 10px;">
                <i class="fas fa-check-circle"></i> NIK Berhasil Di-generate!
            </h4>
            <p style="font-size: 18px; font-weight: bold; color: #2d3748; font-family: 'Courier New', monospace;">
                ${nik}
            </p>
            <small style="color: #4a5568;">
                Klik "Buat KTP" untuk melihat hasil KTP dengan NIK ini
            </small>
        </div>
    `;
    
    // Hapus display NIK sebelumnya jika ada
    const existingDisplay = document.querySelector('.nik-display');
    if (existingDisplay) {
        existingDisplay.remove();
    }
    
    // Tambahkan class untuk styling
    nikDisplay.className = 'nik-display';
    
    // Insert setelah tombol generate
    const generateBtn = document.getElementById('generateNIK');
    generateBtn.parentNode.insertBefore(nikDisplay, generateBtn.nextSibling);
    
    // Simpan NIK untuk digunakan saat buat KTP
    window.generatedNIK = nik;
    
    return nik;
}

// Fungsi untuk format tanggal Indonesia
function formatTanggalIndonesia(dateString) {
    const months = [
        'JANUARI', 'FEBRUARI', 'MARET', 'APRIL', 'MEI', 'JUNI',
        'JULI', 'AGUSTUS', 'SEPTEMBER', 'OKTOBER', 'NOVEMBER', 'DESEMBER'
    ];
    
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, '0');
    const month = months[date.getMonth()];
    const year = date.getFullYear();
    
    return `${day}-${month}-${year}`;
}

// Fungsi untuk membuat KTP
function buatKTP(event) {
    event.preventDefault();
    
    // Ambil semua data dari form
    const formData = new FormData(event.target);
    const data = {};
    
    for (let [key, value] of formData.entries()) {
        data[key] = value;
    }
    
    // Validasi data wajib
    const requiredFields = ['nama', 'tempat_lahir', 'tanggal_lahir', 'jenis_kelamin', 'alamat', 'rt_rw', 'kelurahan', 'kecamatan', 'kota', 'provinsi', 'agama', 'status_perkawinan', 'pekerjaan', 'kewarganegaraan'];
    
    for (let field of requiredFields) {
        if (!data[field]) {
            alert(`Mohon isi field ${field.replace('_', ' ')}!`);
            return;
        }
    }
    
    // Generate NIK jika belum ada
    let nik = window.generatedNIK;
    if (!nik) {
        nik = generateNIK();
        if (!nik) return;
    }    // Update display KTP dengan layout baru
    document.getElementById('display_nik').textContent = `: ${nik}`;
    document.getElementById('display_nama').textContent = `: ${data.nama.toUpperCase()}`;
    document.getElementById('display_ttl').textContent = `: ${data.tempat_lahir.toUpperCase()}, ${formatTanggalIndonesia(data.tanggal_lahir)}`;
    document.getElementById('display_jk_gol').innerHTML = `: ${data.jenis_kelamin} &nbsp;&nbsp;&nbsp; Gol. Darah : ${data.golongan_darah || '-'}`;
    document.getElementById('display_alamat').textContent = `: ${data.alamat.toUpperCase()}`;
    document.getElementById('display_rt_rw').textContent = `: ${data.rt_rw}`;
    document.getElementById('display_kelurahan').textContent = `: ${data.kelurahan.toUpperCase()}`;
    document.getElementById('display_kecamatan').textContent = `: ${data.kecamatan.toUpperCase()}`;
    document.getElementById('display_agama').textContent = `: ${data.agama}`;
    document.getElementById('display_status').textContent = `: ${data.status_perkawinan}`;
    document.getElementById('display_pekerjaan').textContent = `: ${data.pekerjaan.toUpperCase()}`;
    document.getElementById('display_kewarganegaraan').textContent = `: ${data.kewarganegaraan}`;
    document.getElementById('display_berlaku').textContent = `: SEUMUR HIDUP`;
    document.getElementById('display_kota_ktp').textContent = data.kota.toUpperCase();
    document.getElementById('display_provinsi_header').textContent = data.provinsi.toUpperCase();
    document.getElementById('display_kota_header').textContent = data.kota.toUpperCase();
    
    // Set tanggal KTP (tanggal hari ini)
    const today = new Date();
    const tanggalKTP = `${String(today.getDate()).padStart(2, '0')}-${String(today.getMonth() + 1).padStart(2, '0')}-${today.getFullYear()}`;
    document.getElementById('display_tanggal_ktp').textContent = tanggalKTP;
      // Handle foto
    const fotoFile = document.getElementById('foto').files[0];
    if (fotoFile) {
        const reader = new FileReader();
        reader.onload = function(e) {
            document.getElementById('display_foto').src = e.target.result;
        };
        reader.readAsDataURL(fotoFile);
    }
    
    // Copy signature to display
    copySignatureToDisplay();
    
    // Tampilkan section KTP
    document.getElementById('ktpSection').style.display = 'block';
    
    // Scroll ke KTP
    document.getElementById('ktpSection').scrollIntoView({ behavior: 'smooth' });
    
    // Simpan data untuk keperluan download/print
    window.ktpData = {
        ...data,
        nik: nik,
        tanggal_ktp: tanggalKTP
    };
}

// Fungsi download KTP sebagai gambar
function downloadKTP() {
    const ktpCard = document.querySelector('.ktp-card');
    
    // Import html2canvas library
    if (typeof html2canvas === 'undefined') {
        // Jika library belum dimuat, muat secara dinamis
        const script = document.createElement('script');
        script.src = 'https://cdnjs.cloudflare.com/ajax/libs/html2canvas/1.4.1/html2canvas.min.js';
        script.onload = function() {
            captureKTP();
        };
        document.head.appendChild(script);
    } else {
        captureKTP();
    }
    
    function captureKTP() {
        html2canvas(ktpCard, {
            backgroundColor: '#f7fafc',
            scale: 2,
            useCORS: true
        }).then(function(canvas) {
            // Buat link download
            const link = document.createElement('a');
            link.download = `KTP-${window.ktpData.nama.replace(/\s+/g, '_')}.png`;
            link.href = canvas.toDataURL();
            link.click();
        }).catch(function(error) {
            console.error('Error generating image:', error);
            alert('Gagal membuat gambar KTP. Silakan coba lagi.');
        });
    }
}

// Fungsi print KTP
function printKTP() {
    window.print();
}

// Fungsi reset form
function resetForm() {
    if (confirm('Apakah Anda yakin ingin mereset semua data?')) {
        document.getElementById('ktpForm').reset();
        document.getElementById('ktpSection').style.display = 'none';
        
        // Reset foto ke default
        document.getElementById('display_foto').src = "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwIiBoZWlnaHQ9IjEyMCIgdmlld0JveD0iMCAwIDEwMCAxMjAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIxMDAiIGhlaWdodD0iMTIwIiBmaWxsPSIjRjNGNEY2Ii8+CjxjaXJjbGUgY3g9IjUwIiBjeT0iNDAiIHI9IjE1IiBmaWxsPSIjOUNBM0FGIi8+CjxwYXRoIGQ9Ik0yNSA4NUMyNSA3NS4zIDMzLjUgNjcuNSA0NCA2Ny41aDEyYzEwLjUgMCAxOSA3LjggMTkgMTcuNXYxNUgyNVY4NVoiIGZpbGw9IiM5Q0EzQUYiLz4KPC9zdmc+";
        
        // Hapus generated NIK
        window.generatedNIK = null;
        
        // Hapus display NIK jika ada
        const existingDisplay = document.querySelector('.nik-display');
        if (existingDisplay) {
            existingDisplay.remove();
        }
        
        // Scroll ke atas
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }
}

// Signature Canvas functionality
let isDrawing = false;
let signatureCanvas, signatureCtx;

function initializeSignature() {
    signatureCanvas = document.getElementById('signatureCanvas');
    signatureCtx = signatureCanvas.getContext('2d');
    
    signatureCtx.strokeStyle = '#000';
    signatureCtx.lineWidth = 2;
    signatureCtx.lineCap = 'round';
    
    // Mouse events
    signatureCanvas.addEventListener('mousedown', startDrawing);
    signatureCanvas.addEventListener('mousemove', draw);
    signatureCanvas.addEventListener('mouseup', stopDrawing);
    signatureCanvas.addEventListener('mouseout', stopDrawing);
    
    // Touch events
    signatureCanvas.addEventListener('touchstart', handleTouch);
    signatureCanvas.addEventListener('touchmove', handleTouch);
    signatureCanvas.addEventListener('touchend', stopDrawing);
}

function startDrawing(e) {
    isDrawing = true;
    const rect = signatureCanvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    signatureCtx.beginPath();
    signatureCtx.moveTo(x, y);
}

function draw(e) {
    if (!isDrawing) return;
    
    const rect = signatureCanvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    signatureCtx.lineTo(x, y);
    signatureCtx.stroke();
}

function stopDrawing() {
    isDrawing = false;
}

function handleTouch(e) {
    e.preventDefault();
    const touch = e.touches[0];
    const mouseEvent = new MouseEvent(e.type === 'touchstart' ? 'mousedown' : 
                                     e.type === 'touchmove' ? 'mousemove' : 'mouseup', {
        clientX: touch.clientX,
        clientY: touch.clientY
    });
    signatureCanvas.dispatchEvent(mouseEvent);
}

function clearSignature() {
    signatureCtx.clearRect(0, 0, signatureCanvas.width, signatureCanvas.height);
}

function copySignatureToDisplay() {
    const displayCanvas = document.getElementById('displaySignature');
    const displayCtx = displayCanvas.getContext('2d');
    
    // Clear display canvas
    displayCtx.clearRect(0, 0, displayCanvas.width, displayCanvas.height);
    
    // Copy signature to display canvas (scaled)
    displayCtx.drawImage(signatureCanvas, 0, 0, signatureCanvas.width, signatureCanvas.height,
                        0, 0, displayCanvas.width, displayCanvas.height);
}

// Event Listeners
document.addEventListener('DOMContentLoaded', function() {
    // Event listener untuk form submit
    document.getElementById('ktpForm').addEventListener('submit', buatKTP);
    
    // Event listener untuk generate NIK
    document.getElementById('generateNIK').addEventListener('click', generateNIK);
    
    // Event listener untuk download KTP
    document.getElementById('downloadKTP').addEventListener('click', downloadKTP);
    
    // Event listener untuk print KTP
    document.getElementById('printKTP').addEventListener('click', printKTP);
      // Event listener untuk reset form
    document.getElementById('resetForm').addEventListener('click', resetForm);
    
    // Event listener untuk clear signature
    document.getElementById('clearSignature').addEventListener('click', clearSignature);
    
    // Initialize signature canvas
    initializeSignature();
    
    // Auto-capitalize input text
    const textInputs = document.querySelectorAll('input[type="text"], textarea');
    textInputs.forEach(input => {
        input.addEventListener('input', function() {
            if (this.id === 'nama' || this.id === 'tempat_lahir' || this.id === 'alamat' || 
                this.id === 'kelurahan' || this.id === 'kecamatan' || this.id === 'kota' || 
                this.id === 'provinsi' || this.id === 'pekerjaan') {
                this.value = this.value.toUpperCase();
            }
        });
    });
    
    // Preview foto saat diupload
    document.getElementById('foto').addEventListener('change', function(event) {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = function(e) {
                // Buat preview kecil
                const preview = document.createElement('div');
                preview.innerHTML = `
                    <div style="margin-top: 10px; padding: 10px; background: #f0f8ff; border-radius: 5px;">
                        <small style="color: #2d3748; font-weight: 500;">Preview Foto:</small><br>
                        <img src="${e.target.result}" style="width: 60px; height: 72px; object-fit: cover; border-radius: 3px; border: 1px solid #ccc; margin-top: 5px;">
                    </div>
                `;
                
                // Hapus preview sebelumnya
                const existingPreview = document.querySelector('.foto-preview');
                if (existingPreview) {
                    existingPreview.remove();
                }
                
                preview.className = 'foto-preview';
                document.getElementById('foto').parentNode.appendChild(preview);
            };
            reader.readAsDataURL(file);
        }
    });
    
    // Efek animasi saat scroll
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    // Observe form sections
    document.querySelectorAll('.form-section, .ktp-section').forEach(section => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(20px)';
        section.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(section);
    });
});

// Utility function untuk validasi NIK
function validateNIK(nik) {
    // NIK harus 16 digit
    if (!/^\d{16}$/.test(nik)) {
        return false;
    }
    
    // Validasi format tanggal dalam NIK
    const tanggal = parseInt(nik.substr(6, 2));
    const bulan = parseInt(nik.substr(8, 2));
    const tahun = parseInt('20' + nik.substr(10, 2));
    
    // Untuk perempuan, kurangi 40 dari tanggal
    const realTanggal = tanggal > 40 ? tanggal - 40 : tanggal;
    
    // Validasi tanggal
    if (realTanggal < 1 || realTanggal > 31) return false;
    if (bulan < 1 || bulan > 12) return false;
    if (tahun < 1900 || tahun > new Date().getFullYear()) return false;
    
    return true;
}

// Function untuk menampilkan tips penggunaan
function showTips() {
    const tips = `
    📋 TIPS PENGGUNAAN KTP GENERATOR:
    
    ✅ Isi semua data dengan lengkap dan benar
    ✅ Gunakan huruf kapital untuk nama dan alamat
    ✅ Format RT/RW: 001/002 (3 digit/3 digit)
    ✅ Upload foto dengan kualitas baik (opsional)
    ✅ Klik "Generate NIK" untuk membuat NIK otomatis
    ✅ Setelah KTP jadi, bisa di-download atau di-print
    
    ⚠️ PENTING:
    • KTP ini HANYA untuk hiburan dan game Roblox
    • JANGAN gunakan untuk keperluan resmi
    • NIK yang dihasilkan adalah ACAK/PALSU
    
    🎮 Untuk Roblox:
    • Gunakan KTP ini untuk verifikasi voice chat
    • Pastikan umur sesuai requirement Roblox
    • Simpan file KTP yang sudah di-download
    `;
    
    alert(tips);
}

// Tambahkan tombol tips di header
document.addEventListener('DOMContentLoaded', function() {
    const header = document.querySelector('.header');
    const tipsButton = document.createElement('button');
    tipsButton.innerHTML = '<i class="fas fa-question-circle"></i> Tips Penggunaan';
    tipsButton.className = 'btn btn-info';
    tipsButton.style.marginTop = '15px';
    tipsButton.onclick = showTips;
    header.appendChild(tipsButton);
});
