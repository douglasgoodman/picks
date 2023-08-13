import { context, ServeOnRequestArgs } from 'esbuild';
import process from 'node:process';
import { baseBuildOptions, copyPublicAssets } from './shared';
import http from 'node:http';
import path from 'node:path';
import * as dotenv from 'dotenv';

dotenv.config({ path: path.join(__dirname, '..', '..', '.env') });

const ignorePaths = ['/fonts/', '/images/', '/js/', '/assets/'];
const ignoreExtensions = [
    '.png',
    '.jpg',
    '.jpeg',
    '.js',
    '.js.map',
    '.css',
    '.css.map',
    '.ico',
    '.woff',
    '.woff2',
];

const logRequest = ({
    method,
    path,
    remoteAddress,
    status,
}: ServeOnRequestArgs) =>
    console.log(`${method} ${remoteAddress} ${path} ${status}`);

context({
    ...baseBuildOptions,
    outfile: 'dist/bundle.js',
})
    .then((c) => {
        c.watch();
        return c.serve({
            host: 'localhost',
            onRequest: logRequest,
            servedir: 'dist',
        });
    })
    .then(({ host, port }) => {
        console.log(`Running at https://www.${process.env.DOMAIN}`);

        copyPublicAssets();

        http.createServer((req, res) => {
            let rewrite = true;
            ignorePaths.forEach((path) => {
                if (req.url?.startsWith(path)) {
                    rewrite = false;
                }
            });

            ignoreExtensions.forEach((extension) => {
                if (req.url?.endsWith(extension)) {
                    const newUrl = req.url.substring(req.url.lastIndexOf('/'));
                    console.log(`Rewrite asset: ${req.url} => ${newUrl}`);
                    req.url = newUrl;
                    rewrite = false;
                }
            });

            if (rewrite) {
                console.log(`REWRITE ${req.url} -----> /`);
                req.url = '';
            }

            const options: http.RequestOptions = {
                hostname: host,
                port,
                path: req.url,
                method: req.method,
                headers: req.headers,
            };

            const proxyReq = http.request(options, (proxyRes) => {
                res.writeHead(proxyRes.statusCode!, proxyRes.headers);
                proxyRes.pipe(res, { end: true });
            });

            req.pipe(proxyReq, { end: true });
        }).listen(3000);
    })
    .catch((e) => {
        console.log(e);
        process.exit(1);
    });
