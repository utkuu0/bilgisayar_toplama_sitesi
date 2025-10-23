# PC Toplama Sihirbazı (Next.js & TypeScript)

Bu proje, kullanıcıların sanal olarak bilgisayar bileşenleri seçerek kendi PC'lerini oluşturmalarına olanak tanıyan bir web uygulamasıdır. ITopya'nın "Kendin Topla" özelliğinden ilham alınarak geliştirilmiştir. Uygulama, seçilen parçaların birbiriyle uyumluluğunu kontrol ederek kullanıcıyı yönlendirir ve olası hataları en aza indirir.

## ✨ Temel Özellikler

* **Bileşen Seçimi:** İşlemci, anakart, RAM, ekran kartı gibi farklı kategorilerdeki bilgisayar parçalarını seçme imkanı.
* **Dinamik Uyumluluk Kontrolü:** Bir parça seçildiğinde (örneğin işlemci), sonraki adımlarda (örneğin anakart) sadece seçilen parçayla uyumlu olan bileşenler listelenir.
* **Gerçek Zamanlı Fiyat Takibi:** Seçilen parçaların toplam maliyeti anlık olarak hesaplanır ve gösterilir.
* **Detaylı Veri Tabanı:** Bilgisayar parçaları (CPU, GPU, Anakart, RAM, Kasa, PSU vb.) detaylı özelliklerini içeren JSON dosyaları üzerinden yönetilir.
* **Modern Arayüz:** Next.js App Router ve Tailwind CSS kullanılarak oluşturulmuş, kullanıcı dostu ve responsive bir tasarım hedeflenmiştir.

## 🛠️ Kullanılan Teknolojiler

* **Framework:** Next.js (App Router)
* **Dil:** TypeScript
* **Styling:** Tailwind CSS
* **İkonlar:** lucide-react
* **Veri Yönetimi:** Statik JSON Dosyaları

## 🚀 Başlarken

Projeyi kendi bilgisayarınızda çalıştırmak için aşağıdaki adımları izleyin:

1.  **Repoyu Klonlayın:**
    ```bash
    git clone [https://github.com/utkuu0/bilgisayar_toplama_sitesi.git](https://github.com/utkuu0/bilgisayar_toplama_sitesi.git)
    cd bilgisayar_toplama_sitesi
    ```

2.  **Bağımlılıkları Yükleyin:**
    ```bash
    npm install
    # veya
    yarn install
    # veya
    pnpm install
    ```

3.  **Geliştirme Sunucusunu Başlatın:**
    ```bash
    npm run dev
    # veya
    yarn dev
    # veya
    pnpm dev
    ```

4.  Tarayıcınızda `http://localhost:3000` adresini açın.

## 📁 Proje Yapısı

Proje, Next.js App Router yapısını takip etmektedir:
├── app/                  # Ana uygulama yönlendirmesi ve sayfalar
│   ├── globals.css       # Global Tailwind stilleri
│   ├── layout.tsx        # Ana sayfa layout'u
│   └── page.tsx          # PC Toplama Sihirbazı'nın ana mantığı
├── components/           # Yeniden kullanılabilir React bileşenleri
│   ├── BottomNavBar.tsx  # Alt kategori navigasyon menüsü
│   ├── PartList.tsx      # Parça seçim listesi
│   └── Summary.tsx       # Seçilen parçaların özeti
├── data/                 # Tüm parça bilgilerini içeren JSON dosyaları
│   ├── index.ts          # JSON verilerini import edip tipleme yapan dosya
│   └── ... (islemci.json, anakart.json vb.)
├── public/               # Statik dosyalar (resimler, ikonlar vb.)
├── types/                # TypeScript tip tanımlamaları
│   └── parts.ts          # Parça arayüzleri (interface)
├── tailwind.config.ts    # Tailwind CSS yapılandırma dosyası
├── tsconfig.json         # TypeScript yapılandırma dosyası
└── package.json          # Proje bağımlılıkları ve script'ler

## 📊 Veri Kaynağı

Uygulamadaki tüm bilgisayar parçası verileri, `data/` klasörü altında bulunan JSON dosyalarından statik olarak çekilmektedir. Her bir JSON dosyası, ilgili parça türünün (CPU, GPU vb.) özelliklerini, fiyatını, stok durumunu ve uyumluluk bilgilerini içerir.

## 💡 Gelecek İyileştirmeler (Fikirler)

* Kullanıcıların topladıkları sistemleri kaydetme/paylaşma özelliği.
* Daha detaylı filtreleme seçenekleri (marka, fiyat aralığı vb.).
* Görselleştirmeler (örneğin seçilen kasanın içinin gösterilmesi).
* Veritabanı entegrasyonu (daha dinamik veri yönetimi için).
