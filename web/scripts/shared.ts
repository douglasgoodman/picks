import { BuildOptions } from 'esbuild';
import * as dotenv from 'dotenv';
import path from 'node:path';

dotenv.config({ path: path.join(__dirname, '..', '..', '.env') });

export const baseBuildOptions: BuildOptions = {
    entryPoints: ['src/index.tsx'],
    bundle: true,
    sourcemap: true,
    loader: {
        '.woff': 'file',
        '.woff2': 'file',
        '.png': 'file',
    },
    logLevel: 'info',
    define: {
        'process.env.DOMAIN': JSON.stringify(process.env.DOMAIN),
    },
};
