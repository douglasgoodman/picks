import { build } from 'esbuild';
import process from 'node:process';
import { baseBuildOptions } from './shared';

build({
    ...baseBuildOptions,
    minify: true,
    outfile: 'dist/bundle.js',
}).catch(() => process.exit(1));
