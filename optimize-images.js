import sharp from 'sharp';
import fs from 'fs';
import path from 'path';

const directory = './public/assets/laboratory';

// Asegurarse de que el directorio existe
if (!fs.existsSync(directory)) {
    console.error(`Directorio no encontrado: ${directory}`);
    process.exit(1);
}

console.log('🚀 Iniciando optimización de imágenes...');

const files = fs.readdirSync(directory);
const pngFiles = files.filter(file => file.toLowerCase().endsWith('.png'));

if (pngFiles.length === 0) {
    console.log('No se encontraron archivos PNG para optimizar.');
}

pngFiles.forEach(file => {
    const inputPath = path.join(directory, file);
    const outputPath = inputPath.replace(/\.png$/i, '.webp');
    
    sharp(inputPath)
        .resize(1440, null, { // Redimensionar a un ancho máximo razonable manteniendo el aspecto
            withoutEnlargement: true,
            fit: 'inside'
        })
        .webp({ quality: 80 })
        .toFile(outputPath)
        .then(info => {
            const oldSize = (fs.statSync(inputPath).size / 1024 / 1024).toFixed(2);
            const newSize = (info.size / 1024 / 1024).toFixed(2);
            console.log(`✅ ${file}: ${oldSize}MB -> ${newSize}MB`);
        })
        .catch(err => console.error(`❌ Error en ${file}:`, err));
});
