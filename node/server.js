import http2 from 'http2'
import http from 'http';
import fs from 'fs';

import { routing } from "./routing.js";
import Client from './auth/client.js'
import { jsonParse, receiveBody } from "metautil";
import { __dirname } from "./utils/path.js";


const types = {
  object: JSON.stringify,
  string: s => s,
  number: n => n.toString(),
  undefined: () => 'not found',
  function: (fn, req, res) => JSON.stringify(fn(req, res)),
};

const corsHeaders = {
  'Access-Control-Allow-Origin': 'http://localhost:3000',
  'Access-Control-Allow-Methods': 'OPTIONS, POST, GET',
  'Access-Control-Max-Age': 2592000, // 30 days,
  'Access-Control-Allow-Credentials': true,
  'Access-Control-Allow-Headers': ['Content-Type', 'Set-Cookie']

};


const server = http2.createSecureServer({
  key: fs.readFileSync('localhost-privkey.pem'),
  cert: fs.readFileSync('localhost-cert.pem'),
}, async (req, res) => {

  const { method, url, headers } = req;

  const handler = routing[url];

  //if(url !== '/parser') body = jsonParse(body);
  console.log(`${method} ${url} ${headers.cookie}`);

  const client = await Client.getInstance(req, res);
  const stream = req.stream;
  
  const buffers = [];

  stream.on('data', (chunk) => {
    buffers.push(chunk);
  })

  stream.on('end', async () => {
    const body = Buffer.concat(buffers)
    if (!handler) {
      res.statusCode = 404;
      res.end('Not found 404');
      return;
    }

    if (req.method === 'OPTIONS') {
      res.writeHead(204, corsHeaders);
      res.end();
      return;
    }

    if (['GET', 'POST'].indexOf(req.method) > -1) {
      handler(client, jsonParse(body)).then((data) => {
        const type = typeof data;
        const serializer = types[type];
        const result = serializer(data);
        client.sendCookie();
        res.writeHead(200, corsHeaders);
        res.end(result);
      }, (err) => {
        res.writeHead(500, corsHeaders);
        res.end(err.message);
      });
      return;
    }

    res.writeHead(405, corsHeaders);
    res.end(`${req.method} is not allowed for the request.`);

  })
});

const logError = (type) => (err) => {
  const msg = err?.stack || err?.message || 'exit';
  console.error(`${type}: ${msg}`);
};


server.on('error', logError('err'))
server.on('connect', logError('connect'))
server.on('socketError', logError('socketError'))
server.on('frameError',logError('frameError'))
server.on('remoteSettings', logError('remote settings'))
process.on('uncaughtException', logError('Uncaught exception'));
process.on('warning', logError('Warning'));
process.on('unhandledRejection', logError('Unhandled rejection'));


server.on('checkContinue',(req,res) => {
  console.log('continue')
})
server.listen(8000)





/*stream.respond({
      ':status': 200, 
      'set-cookie':preparedCookie,
      [http2.sensitiveHeaders]: ['cookie'],
      ...corsHeaders }); */