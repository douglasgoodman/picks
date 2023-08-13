import {
    createReadStream,
    createWriteStream,
    existsSync,
    readdirSync,
    unlinkSync,
} from 'fs';
import { join } from 'path';
import archiver from 'archiver';

console.log('Packaging function...');

const distFolderPath = join(__dirname, '..', 'dist');
const outputFilePath = join(distFolderPath, 'index.zip');

if (existsSync(outputFilePath)) {
    unlinkSync(outputFilePath);
}

const outputStream = createWriteStream(outputFilePath);
const archive = archiver('zip');

archive.on('error', (error: any) => console.error('Error', error));

archive.on('finish', () => console.log(`Finished writing: ${outputFilePath}`));

archive.pipe(outputStream);

const files = readdirSync(distFolderPath);
files.forEach((f) => {
    const filePath = join(distFolderPath, f);
    archive.append(createReadStream(filePath), { name: f });
    console.log(f);
});

archive.finalize();
