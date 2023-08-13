import { build } from 'esbuild';
import process from 'node:process';
import { baseBuildOptions, copyPublicAssets } from './shared';

build({
    ...baseBuildOptions,
    minify: true,
    outfile: 'dist/bundle.js',
})
    .then(copyPublicAssets)
    .catch((e) => {
        console.log(e);
        process.exit(1);
    });
