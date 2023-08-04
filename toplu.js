const { uploadByBuffer } = require('telegraph-uploader');
const fs = require('fs');
const path = require('path');

const imageFolder = 'resimler'; // Resimler klasörü adı
const jsonFilePath = 'yedeklenen_resimler.json'; // JSON dosyasının yolu

// Verilen dizindeki tüm dosya adlarını al
function getFilesInDirectory(dir) {
  return fs.readdirSync(dir);
}

// Resmi (buffer) verisi olarak yükle ve URL'ini döndür
function uploadImageAndGetUrl(imagePath) {
  const imageBuffer = fs.readFileSync(imagePath);
  return uploadByBuffer(imageBuffer, 'image/png')
    .then((result) => result.link);
}

// Ana işlev
async function backupImages() {
    try {
      // Resimler klasöründeki dosya adlarını al
      const fileNames = getFilesInDirectory(imageFolder);
  
      // Her bir resmi yedekle ve URL'leri topla
      const imageUrls = await Promise.all(
        fileNames.map((fileName) => {
          const imagePath = path.join(imageFolder, fileName);
          return uploadImageAndGetUrl(imagePath);
        })
      );
  
      // JSON dosyasına URL'leri kaydet
      fs.writeFileSync(jsonFilePath, JSON.stringify(imageUrls, null, 2));
  
      console.log(`Toplam ${imageUrls.length} resim yedeklendi ve URL'ler JSON dosyasına kaydedildi.`);
    } catch (error) {
      console.error('Hata:', error);
    }
  }
  
// Ana işlevi çağır
backupImages();
