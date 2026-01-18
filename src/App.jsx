import React, { useState, useEffect } from 'react';
// Kita hapus import module langsung agar tidak error di preview
// import jsPDF from 'jspdf'; 
// import 'jspdf-autotable';
// import { ... } from 'docx';

// --- Komponen Ikon SVG ---
const Icons = {
    BrainCircuit: ({ size = 24, className = "" }) => (
        <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M12 5a3 3 0 1 0-5.997.125 4 4 0 0 0-2.526 5.77 4 4 0 0 0 .556 6.588A4 4 0 1 0 12 18Z"/><path d="M12 5a3 3 0 1 1 5.997.125 4 4 0 0 1 2.526 5.77 4 4 0 0 1-.556 6.588A4 4 0 1 1 12 18Z"/><path d="M15 13a4.5 4.5 0 0 1-3-4 4.5 4.5 0 0 1-3 4"/><path d="M17.599 6.5a3 3 0 0 0 .399-1.375"/><path d="M6.003 5.125A3 3 0 0 0 6.401 6.5"/><path d="M3.477 10.896a4 4 0 0 1 .585-.396"/><path d="M19.938 10.5a4 4 0 0 1 .585.396"/><path d="M6 18a4 4 0 0 1-1.97-3.284"/><path d="M17.97 14.716A4 4 0 0 1 18 18"/></svg>
    ),
    Wand2: ({ size = 24, className = "" }) => (
        <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="m21.64 3.64-1.28-1.28a1.21 1.21 0 0 0-1.72 0L2.36 18.64a1.21 1.21 0 0 0 0 1.72l1.28 1.28a1.2 1.2 0 0 0 1.72 0L21.64 5.36a1.2 1.2 0 0 0 0-1.72Z"/><path d="m14 7 3 3"/><path d="M5 6v4"/><path d="M19 14v4"/><path d="M10 2v2"/><path d="M7 8H3"/><path d="M21 16h-4"/><path d="M11 3H9"/></svg>
    ),
    FileText: ({ size = 24, className = "" }) => (
        <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><line x1="10" y1="9" x2="8" y2="9"/></svg>
    ),
    Table: ({ size = 24, className = "" }) => (
        <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M12 3h7a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-7m0-18H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h7m0-18v18"/></svg>
    ),
    FileType: ({ size = 24, className = "" }) => (
        <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"/><polyline points="14 2 14 8 20 8"/><path d="M9 13v-1h6v1"/><path d="M12 12v6"/><path d="M11 18h2"/></svg>
    ),
    AlertCircle: ({ size = 24, className = "" }) => (
        <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
    ),
    Sparkles: ({ size = 24, className = "" }) => (
        <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z"/><path d="M5 3v4"/><path d="M9 3v4"/><path d="M3 5h4"/><path d="M3 9h4"/></svg>
    )
};

// --- Helper: Load Script Dinamis untuk PDF & Word (Solusi Tanpa NPM) ---
const loadScript = (src, id) => {
    return new Promise((resolve, reject) => {
        if (document.getElementById(id)) {
            resolve();
            return;
        }
        const script = document.createElement('script');
        script.src = src;
        script.id = id;
        script.onload = resolve;
        script.onerror = reject;
        document.body.appendChild(script);
    });
};

export default function App() {
    // --- KONFIGURASI API KEY ---
    // Menggunakan variabel environment dari Vercel
    // Pastikan di dashboard Vercel > Settings > Environment Variables sudah ada VITE_GEMINI_API_KEY
    let envApiKey = '';
    try {
        // Kita gunakan try-catch agar aman jika dijalankan di environment non-Vite standar
        if (import.meta && import.meta.env) {
            envApiKey = import.meta.env.VITE_GEMINI_API_KEY || '';
        }
    } catch (e) {
        console.log("Info: Menjalankan di mode tanpa env var build time.");
    }
    
    // Kita tidak lagi menggunakan state untuk input manual user
    const [loading, setLoading] = useState(false);
    const [generatedData, setGeneratedData] = useState(null);
    const [activeTab, setActiveTab] = useState('utama'); 
    const [libsLoaded, setLibsLoaded] = useState(false);
    
    // Form State
    const [formData, setFormData] = useState({
        tipe: 'pg', 
        mapel: '',
        kelas: '',
        topik: '',
        jumlah: 5,
        tingkat: 'Campuran (LOTS & HOTS)'
    });

    // Load libraries secara manual (CDN) agar jalan di mana saja
    useEffect(() => {
        const loadLibraries = async () => {
            try {
                // 1. Load jsPDF
                await loadScript('https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js', 'jspdf-lib');
                // 2. Load AutoTable
                await loadScript('https://cdnjs.cloudflare.com/ajax/libs/jspdf-autotable/3.5.29/jspdf.plugin.autotable.min.js', 'autotable-lib');
                // 3. Load Docx & FileSaver
                await Promise.all([
                    loadScript('https://unpkg.com/docx@7.1.0/build/index.js', 'docx-lib'),
                    loadScript('https://cdnjs.cloudflare.com/ajax/libs/FileSaver.js/2.0.5/FileSaver.min.js', 'filesaver-lib')
                ]);
                setLibsLoaded(true);
            } catch (err) {
                console.error("Gagal load library:", err);
            }
        };
        loadLibraries();
    }, []);

    const handleGenerate = async () => {
        // Langsung gunakan key dari Env Variable
        const currentKey = envApiKey; 

        if (!currentKey) {
            // Pesan error ini hanya akan muncul jika Admin lupa setting di Vercel
            alert("Sistem belum dikonfigurasi. Admin: Mohon set VITE_GEMINI_API_KEY di Vercel.");
            return;
        }
        
        if (!formData.mapel || !formData.topik) {
            alert("Mohon lengkapi Mata Pelajaran dan Topik.");
            return;
        }

        setLoading(true);
        setGeneratedData(null);
        setActiveTab('utama');

        let prompt = "";
        
        if (formData.tipe === 'pg') {
            prompt = `
                Bertindaklah sebagai Guru Profesional. Buatkan ${formData.jumlah} Soal Pilihan Ganda.
                Mapel: ${formData.mapel}, Kelas: ${formData.kelas}, Topik: ${formData.topik}, Level: ${formData.tingkat}.
                OUTPUT WAJIB JSON ARRAY MURNI (tanpa markdown):
                [{ "no": 1, "soal": "...", "pilihan": ["Opsi 1", "Opsi 2", "Opsi 3", "Opsi 4", "Opsi 5"], "kunci": "A", "kunci_deskripsi": "...", "level_kognitif": "C4", "indikator": "..." }]
                Catatan: Pilihan jawaban TIDAK PERLU pakai "A.", "B." di depannya, nanti sistem saya yang kasih nomor.
            `;
        } else if (formData.tipe === 'essay') {
            prompt = `
                Bertindaklah sebagai Guru Profesional. Buatkan ${formData.jumlah} Soal Essay (Uraian) High Order Thinking Skills.
                Mapel: ${formData.mapel}, Kelas: ${formData.kelas}, Topik: ${formData.topik}, Level: ${formData.tingkat}.
                OUTPUT WAJIB JSON ARRAY MURNI (tanpa markdown):
                [{ "no": 1, "soal": "Pertanyaan essay...", "kunci_jawaban": "Jawaban model...", "rubrik": "Poin 5 jika..., Poin 3 jika...", "skor_maksimal": 10, "level_kognitif": "C5" }]
            `;
        } else if (formData.tipe === 'ice_breaking') {
            prompt = `
                Bertindaklah sebagai Guru Kreatif. Buatkan 3 Ide Ice Breaking atau Energizer yang RELEVAN dengan materi ajar.
                Mapel: ${formData.mapel}, Topik: ${formData.topik}.
                OUTPUT WAJIB JSON ARRAY MURNI (tanpa markdown):
                [{ "no": 1, "judul": "Nama Permainan", "durasi": "5-10 menit", "langkah": ["Langkah 1", "Langkah 2"], "tujuan": "Manfaat permainan untuk materi ini..." }]
            `;
        }

        try {
            const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-preview-09-2025:generateContent?key=${currentKey}`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ contents: [{ parts: [{ text: prompt }] }] })
            });

            if (!response.ok) throw new Error('Gagal menghubungi Gemini API');

            const result = await response.json();
            let text = result.candidates?.[0]?.content?.parts?.[0]?.text || '';
            text = text.replace(/```json/g, '').replace(/```/g, '').trim();
            
            setGeneratedData(JSON.parse(text));
        } catch (error) {
            console.error(error);
            alert("Terjadi kesalahan: " + error.message);
        } finally {
            setLoading(false);
        }
    };

    // --- LOGIKA EXPORT (PDF - Versi CDN) ---
    const exportPDF = () => {
        if (!generatedData || !window.jspdf) {
            alert("Sistem PDF belum siap. Coba refresh."); 
            return;
        }
        
        try {
            const { jsPDF } = window.jspdf;
            const doc = new jsPDF();
            
            if (typeof doc.autoTable !== 'function') {
                console.error("AutoTable belum terload.");
                return;
            }

            const pageWidth = doc.internal.pageSize.getWidth();
            const pageHeight = doc.internal.pageSize.getHeight();
            const margin = 14;
            const textWidth = pageWidth - (margin * 2);

            // Fungsi Header Dinamis
            const addHeader = (startY = 15) => {
                 doc.setFontSize(16); doc.setFont("helvetica", "bold");
                 const title = formData.tipe === 'ice_breaking' ? "PANDUAN ICE BREAKING" : `BANK SOAL: ${formData.mapel.toUpperCase()}`;
                 doc.text(title, pageWidth / 2, startY, { align: "center" });
                 
                 doc.setFontSize(11); doc.setFont("helvetica", "normal");
                 const subTitle = `Kelas: ${formData.kelas}`;
                 
                 let currentY = startY + 7;
                 doc.text(subTitle, pageWidth / 2, currentY, { align: "center" });
                 
                 currentY += 5;
                 doc.setLineWidth(0.5);
                 doc.line(margin, currentY, pageWidth - margin, currentY);
                 
                 return currentY + 10;
            };

            let yPos = addHeader();

            if (formData.tipe === 'pg') {
                 const labels = ['A', 'B', 'C', 'D', 'E'];
                 generatedData.forEach((item) => {
                    doc.setFont("helvetica", "normal");
                    const questionText = `${item.no}. ${item.soal}`;
                    const questionLines = doc.splitTextToSize(questionText, textWidth);
                    
                    if (yPos + (questionLines.length * 7) > pageHeight - margin) { 
                        doc.addPage(); 
                        yPos = addHeader(); 
                    }
                    
                    doc.text(questionLines, margin, yPos);
                    yPos += (questionLines.length * 6) + 2;

                    item.pilihan.forEach((opt, idx) => {
                        let cleanOpt = opt.replace(/^[A-Ea-e][.)]\s*/, ''); 
                        let optText = `${labels[idx]}. ${cleanOpt}`;
                        const optLines = doc.splitTextToSize(optText, textWidth - 5);
                        
                        if (yPos + (optLines.length * 6) > pageHeight - margin) { 
                            doc.addPage(); 
                            yPos = addHeader();
                        }

                        doc.text(optLines, margin + 5, yPos);
                        yPos += (optLines.length * 6);
                    });
                    yPos += 6; 
                 });

                 doc.addPage();
                 yPos = addHeader();
                 doc.setFontSize(12); doc.setFont("helvetica", "bold");
                 doc.text("KUNCI JAWABAN & KISI-KISI", margin, yPos);
                 
                 doc.autoTable({
                    startY: yPos + 5,
                    head: [['No', 'Level', 'Indikator', 'Kunci']],
                    body: generatedData.map(i => [i.no, i.level_kognitif, i.indikator, `${i.kunci}. ${i.kunci_deskripsi}`]),
                    headStyles: { fillColor: [79, 70, 229] },
                    theme: 'grid'
                 });

            } else if (formData.tipe === 'essay') {
                generatedData.forEach(item => {
                    const questionText = `${item.no}. ${item.soal} (Skor: ${item.skor_maksimal})`;
                    const qLines = doc.splitTextToSize(questionText, textWidth);

                    if (yPos + (qLines.length * 7) > pageHeight - margin) { 
                        doc.addPage(); 
                        yPos = addHeader(); 
                    }
                    
                    doc.text(qLines, margin, yPos);
                    yPos += (qLines.length * 7) + 10;
                });

                doc.addPage();
                yPos = addHeader();
                doc.text("PEDOMAN PENSKORAN", margin, yPos);
                doc.autoTable({
                    startY: yPos + 5,
                    head: [['No', 'Jawaban Model', 'Rubrik', 'Skor']],
                    body: generatedData.map(i => [i.no, i.kunci_jawaban, i.rubrik, i.skor_maksimal]),
                    headStyles: { fillColor: [220, 38, 38] },
                    columnStyles: { 1: { cellWidth: 60 }, 2: { cellWidth: 70 } }
                });
            } else if (formData.tipe === 'ice_breaking') {
                generatedData.forEach(item => {
                    if (yPos > pageHeight - 60) {
                        doc.addPage(); 
                        yPos = addHeader(); 
                    }
                    
                    doc.setFont("helvetica", "bold");
                    doc.text(`${item.no}. ${item.judul} (${item.durasi})`, margin, yPos);
                    yPos += 7;
                    
                    doc.setFont("helvetica", "italic");
                    const tujuanLines = doc.splitTextToSize(`Tujuan: ${item.tujuan}`, textWidth);
                    doc.text(tujuanLines, margin, yPos);
                    yPos += (tujuanLines.length * 6) + 3;

                    doc.setFont("helvetica", "normal");
                    item.langkah.forEach(step => {
                         const stepLines = doc.splitTextToSize(`- ${step}`, textWidth - 5);
                         if (yPos + (stepLines.length * 6) > pageHeight - margin) { 
                             doc.addPage(); 
                             yPos = addHeader(); 
                         }
                         doc.text(stepLines, margin + 5, yPos);
                         yPos += (stepLines.length * 6);
                    });
                    yPos += 10;
                });
            }
            
            doc.save(`Dokumen-${formData.tipe}-${formData.mapel}.pdf`);
        } catch (err) {
            console.error(err);
            alert("Terjadi kesalahan saat membuat PDF: " + err.message);
        }
    };

    // --- LOGIKA EXPORT (WORD - Versi CDN) ---
    const exportWord = () => {
        if (!generatedData || !window.docx) return;
        
        const { Document, Packer, Paragraph, TextRun, Table, TableRow, TableCell, WidthType, AlignmentType, BorderStyle } = window.docx;

        const children = [
            // Header (Tanpa Topik)
            new Paragraph({
                children: [new TextRun({ text: formData.tipe === 'ice_breaking' ? "PANDUAN ICE BREAKING" : "BANK SOAL / LATIHAN", bold: true, size: 28 })],
                alignment: AlignmentType.CENTER, spacing: { after: 100 }
            }),
            new Paragraph({
                children: [new TextRun({ text: `Mapel: ${formData.mapel} | Kelas: ${formData.kelas}`, size: 24 })],
                alignment: AlignmentType.CENTER, spacing: { after: 400 }
            })
        ];

        if (formData.tipe === 'pg') {
            const labels = ['A', 'B', 'C', 'D', 'E'];
            generatedData.forEach(item => {
                children.push(new Paragraph({ 
                    children: [new TextRun({ text: `${item.no}. ${item.soal}`, bold: true })],
                    spacing: { after: 100 }
                }));

                item.pilihan.forEach((opt, idx) => {
                    let cleanOpt = opt.replace(/^[A-Ea-e][.)]\s*/, '');
                    children.push(new Paragraph({ 
                        children: [new TextRun(`${labels[idx]}. ${cleanOpt}`)], 
                        indent: { left: 720, hanging: 360 },
                        spacing: { after: 50 }
                    }));
                });
                children.push(new Paragraph({ text: "" }));
            });

            children.push(new Paragraph({ 
                children: [new TextRun({ text: "KUNCI JAWABAN & KISI-KISI", bold: true, size: 24 })], 
                pageBreakBefore: true, spacing: { after: 200 } 
            }));

            const tableRows = [
                new TableRow({
                    children: ["No", "Level", "Indikator", "Kunci"].map(t => new TableCell({
                        children: [new Paragraph({ text: t, bold: true })],
                        shading: { fill: "E0E7FF" },
                        width: { size: 25, type: WidthType.PERCENTAGE }
                    }))
                })
            ];

            generatedData.forEach(i => {
                tableRows.push(new TableRow({
                    children: [
                        new TableCell({ children: [new Paragraph(i.no.toString())] }),
                        new TableCell({ children: [new Paragraph(i.level_kognitif)] }),
                        new TableCell({ children: [new Paragraph(i.indikator)] }),
                        new TableCell({ children: [new Paragraph(`${i.kunci} (${i.kunci_deskripsi})`)] }),
                    ]
                }));
            });

            children.push(new Table({ rows: tableRows, width: { size: 100, type: WidthType.PERCENTAGE } }));

        } else if (formData.tipe === 'essay') {
            generatedData.forEach(item => {
                children.push(new Paragraph({ children: [new TextRun({ text: `${item.no}. ${item.soal}`, bold: true })] }));
                children.push(new Paragraph({ text: `(Skor Maks: ${item.skor_maksimal})`, italics: true }));
                children.push(new Paragraph({ text: "\n\n" })); 
            });

            children.push(new Paragraph({ text: "RUBRIK PENILAIAN", heading: "Heading2", pageBreakBefore: true }));
            const rows = generatedData.map(i => new TableRow({ children: [
                new TableCell({ children: [new Paragraph(i.no.toString())] }),
                new TableCell({ children: [new Paragraph(i.kunci_jawaban)] }),
                new TableCell({ children: [new Paragraph(i.rubrik)] }),
                new TableCell({ children: [new Paragraph(i.skor_maksimal.toString())] })
            ]}));
            rows.unshift(new TableRow({ children: ["No", "Jawaban Model", "Rubrik", "Skor"].map(t => new TableCell({ children: [new Paragraph({text:t, bold:true})], shading: {fill: "FFCCCB"} })) }));
            
            children.push(new Table({ rows: rows, width: { size: 100, type: WidthType.PERCENTAGE } }));
        } else if (formData.tipe === 'ice_breaking') {
             generatedData.forEach(item => {
                children.push(new Paragraph({ children: [new TextRun({ text: `${item.no}. ${item.judul}`, bold: true, size: 24 })] }));
                children.push(new Paragraph({ text: `Durasi: ${item.durasi}`, italics: true }));
                children.push(new Paragraph({ text: `Manfaat: ${item.tujuan}` }));
                item.langkah.forEach(step => children.push(new Paragraph({ text: `- ${step}`, indent: { left: 720 } })));
                children.push(new Paragraph({ text: "", spacing: { after: 200 } }));
            });
        }

        const doc = new Document({ sections: [{ properties: {}, children }] });
        Packer.toBlob(doc).then(blob => window.saveAs(blob, `Dokumen-${formData.tipe}.docx`));
    };

    return (
        <div className="min-h-screen pb-20 bg-gray-50 text-gray-800 font-sans">
            <header className="bg-gradient-to-r from-indigo-600 to-blue-500 text-white py-6 px-4 shadow-lg sticky top-0 z-50">
                <div className="max-w-5xl mx-auto flex justify-between items-center">
                    <div className="flex items-center gap-2">
                        <Icons.BrainCircuit size={28} />
                        <h1 className="text-xl md:text-2xl font-bold">GuruGenius</h1>
                    </div>
                    <div className="text-xs md:text-sm bg-white/20 px-3 py-1 rounded-full">Versi Tandingan APAL</div>
                </div>
            </header>

            <main className="max-w-5xl mx-auto px-4 mt-8">
                {/* INPUT API KEY DIHAPUS
                   Karena sudah pakai Environment Variable Vercel.
                   Tampilan jadi lebih bersih untuk User.
                */}

                <div className="grid md:grid-cols-3 gap-6">
                    {/* Panel Kiri */}
                    <div className="md:col-span-1 space-y-4">
                        <div className="bg-white p-6 rounded-xl shadow-md border border-gray-100">
                            <h2 className="text-lg font-bold mb-4 flex items-center gap-2 text-indigo-700">
                                <Icons.Wand2 size={20} /> Konfigurasi
                            </h2>
                            <div className="space-y-3">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Tipe Konten ✨</label>
                                    <select className="w-full p-2 border rounded bg-indigo-50 border-indigo-200 text-indigo-900 font-medium" value={formData.tipe} onChange={(e) => setFormData({...formData, tipe: e.target.value})}>
                                        <option value="pg">📝 Soal Pilihan Ganda</option>
                                        <option value="essay">✍️ Soal Essay + Rubrik</option>
                                        <option value="ice_breaking">🧊 Ide Ice Breaking (Game)</option>
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Mata Pelajaran</label>
                                    <input type="text" className="w-full p-2 border rounded" placeholder="Contoh: Sejarah" value={formData.mapel} onChange={(e) => setFormData({...formData, mapel: e.target.value})} />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Jenjang / Kelas</label>
                                    <input type="text" className="w-full p-2 border rounded" placeholder="Contoh: Kelas 11 SMA" value={formData.kelas} onChange={(e) => setFormData({...formData, kelas: e.target.value})} />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Topik / Materi</label>
                                    <textarea className="w-full p-2 border rounded" placeholder="Contoh: Perang Dunia II" rows="2" value={formData.topik} onChange={(e) => setFormData({...formData, topik: e.target.value})}></textarea>
                                </div>
                                {formData.tipe !== 'ice_breaking' && (
                                    <div className="grid grid-cols-2 gap-2">
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">Jumlah</label>
                                            <input type="number" className="w-full p-2 border rounded" value={formData.jumlah} min="1" max="10" onChange={(e) => setFormData({...formData, jumlah: e.target.value})} />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">Level</label>
                                            <select className="w-full p-2 border rounded" value={formData.tingkat} onChange={(e) => setFormData({...formData, tingkat: e.target.value})}>
                                                <option>Mudah</option>
                                                <option>HOTS (Sukar)</option>
                                                <option>Campuran</option>
                                            </select>
                                        </div>
                                    </div>
                                )}
                                <button onClick={handleGenerate} disabled={loading} className={`w-full py-3 px-4 rounded-lg text-white font-bold shadow-lg transition-all transform hover:scale-[1.02] ${loading ? 'bg-gray-400' : 'bg-indigo-600 hover:bg-indigo-700'}`}>
                                    {loading ? 'Sedang Meracik...' : 'Buat Sekarang 🚀'}
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Panel Kanan */}
                    <div className="md:col-span-2">
                        {!loading && !generatedData && (
                            <div className="h-64 flex flex-col items-center justify-center bg-white rounded-xl shadow-sm border border-dashed border-gray-300 p-8 text-center text-gray-400">
                                <Icons.Sparkles size={48} className="mb-2 opacity-50 text-indigo-400" />
                                <p>Pilih Tipe Konten dan klik Buat!</p>
                                <p className="text-sm">Bisa buat Soal PG, Essay, atau Ide Games.</p>
                            </div>
                        )}

                        {loading && (
                            <div className="h-64 flex flex-col items-center justify-center bg-white rounded-xl shadow p-8 text-center">
                                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mb-4"></div>
                                <h3 className="text-lg font-semibold text-gray-700">AI sedang berpikir...</h3>
                                <p className="text-gray-500 text-sm">Menyesuaikan konteks {formData.mapel}...</p>
                            </div>
                        )}

                        {!loading && generatedData && (
                            <div className="bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden">
                                {/* Tab Navigation */}
                                <div className="flex border-b">
                                    <button onClick={() => setActiveTab('utama')} className={`flex-1 py-3 font-medium text-sm flex items-center justify-center gap-2 ${activeTab === 'utama' ? 'text-indigo-600 border-b-2 border-indigo-600 bg-indigo-50' : 'text-gray-500 hover:bg-gray-50'}`}>
                                        <Icons.FileText size={16} /> {formData.tipe === 'ice_breaking' ? 'Daftar Games' : 'Naskah Soal'}
                                    </button>
                                    <button onClick={() => setActiveTab('kisi')} className={`flex-1 py-3 font-medium text-sm flex items-center justify-center gap-2 ${activeTab === 'kisi' ? 'text-indigo-600 border-b-2 border-indigo-600 bg-indigo-50' : 'text-gray-500 hover:bg-gray-50'}`}>
                                        <Icons.Table size={16} /> {formData.tipe === 'ice_breaking' ? 'Detail & Manfaat' : 'Kunci & Rubrik'}
                                    </button>
                                </div>

                                <div className="p-6 max-h-[600px] overflow-y-auto custom-scrollbar">
                                    {/* CONTENT: PG */}
                                    {formData.tipe === 'pg' && activeTab === 'utama' && (
                                        <div className="space-y-6">
                                            {generatedData.map((item, idx) => (
                                                <div key={idx} className="pb-4 border-b border-gray-100 last:border-0">
                                                    <div className="flex gap-1 mb-2">
                                                        <span className="font-bold">{item.no}.</span>
                                                        <p className="font-medium text-gray-900">{item.soal}</p>
                                                    </div>
                                                    <div className="pl-5 space-y-1">
                                                        {item.pilihan.map((opsi, oIdx) => {
                                                            const labels = ['A', 'B', 'C', 'D', 'E'];
                                                            const cleanOpt = opsi.replace(/^[A-Ea-e][.)]\s*/, '');
                                                            return (
                                                                <div key={oIdx} className="text-sm text-gray-700 p-1 flex gap-2">
                                                                    <span className="font-semibold text-gray-500">{labels[oIdx]}.</span>
                                                                    <span>{cleanOpt}</span>
                                                                </div>
                                                            )
                                                        })}
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    )}

                                    {/* CONTENT: ESSAY */}
                                    {formData.tipe === 'essay' && activeTab === 'utama' && (
                                        <div className="space-y-6">
                                            {generatedData.map((item, idx) => (
                                                <div key={idx} className="pb-4 border-b border-gray-100 last:border-0">
                                                    <div className="flex gap-1 mb-2">
                                                        <span className="font-bold">{item.no}.</span>
                                                        <p className="font-medium text-gray-900">{item.soal}</p>
                                                    </div>
                                                    <div className="pl-5 text-sm text-gray-500 italic">Skor Maksimal: {item.skor_maksimal}</div>
                                                </div>
                                            ))}
                                        </div>
                                    )}

                                    {/* CONTENT: ICE BREAKING */}
                                    {formData.tipe === 'ice_breaking' && activeTab === 'utama' && (
                                        <div className="space-y-6">
                                            {generatedData.map((item, idx) => (
                                                <div key={idx} className="bg-indigo-50 p-4 rounded-lg border border-indigo-100">
                                                    <h3 className="font-bold text-lg text-indigo-700 mb-1">{item.no}. {item.judul}</h3>
                                                    <p className="text-sm text-indigo-600 mb-3 font-medium">⏱️ Durasi: {item.durasi}</p>
                                                    <ul className="list-disc pl-5 space-y-1 text-gray-700 text-sm">
                                                        {item.langkah.map((step, sIdx) => <li key={sIdx}>{step}</li>)}
                                                    </ul>
                                                </div>
                                            ))}
                                        </div>
                                    )}

                                    {/* KISI-KISI / RUBRIK */}
                                    {activeTab === 'kisi' && (
                                        <div className="overflow-x-auto">
                                            {formData.tipe === 'ice_breaking' ? (
                                                <table className="w-full text-sm text-left border-collapse">
                                                    <thead className="bg-gray-100"><tr><th className="p-2 border">Judul</th><th className="p-2 border">Tujuan / Manfaat</th></tr></thead>
                                                    <tbody>
                                                        {generatedData.map((item, idx) => (
                                                            <tr key={idx}><td className="p-2 border font-bold">{item.judul}</td><td className="p-2 border">{item.tujuan}</td></tr>
                                                        ))}
                                                    </tbody>
                                                </table>
                                            ) : (
                                                <table className="w-full text-sm text-left border-collapse">
                                                    <thead className="bg-gray-100 text-gray-700">
                                                        <tr>
                                                            <th className="p-3 border">No</th>
                                                            <th className="p-3 border">Jawaban / Kunci</th>
                                                            <th className="p-3 border">{formData.tipe === 'pg' ? 'Indikator & Level' : 'Rubrik Penilaian'}</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        {generatedData.map((item, idx) => (
                                                            <tr key={idx} className="hover:bg-gray-50">
                                                                <td className="p-3 border text-center font-bold">{item.no}</td>
                                                                <td className="p-3 border">
                                                                    {formData.tipe === 'pg' ? <span className="font-bold text-blue-600">{item.kunci}</span> : item.kunci_jawaban}
                                                                </td>
                                                                <td className="p-3 border text-xs">
                                                                    {formData.tipe === 'pg' ? (
                                                                        <div>
                                                                            <span className="font-bold">{item.level_kognitif}</span><br/>{item.indikator}
                                                                        </div>
                                                                    ) : item.rubrik}
                                                                </td>
                                                            </tr>
                                                        ))}
                                                    </tbody>
                                                </table>
                                            )}
                                        </div>
                                    )}
                                </div>
                                <div className="bg-gray-50 p-4 border-t flex gap-3 justify-end">
                                    <button onClick={exportWord} className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition text-sm"><Icons.FileType size={16} /> Word</button>
                                    <button onClick={exportPDF} className="flex items-center gap-2 bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition text-sm"><Icons.FileType size={16} /> PDF</button>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </main>
        </div>
    );
}
