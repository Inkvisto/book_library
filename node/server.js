import http2 from 'http2'
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
  'Access-Control-Allow-Credentials':true,
  'Access-Control-Allow-Headers': 'Content-Type'
 
};


http2.createSecureServer({
  key: fs.readFileSync('localhost-privkey.pem'),
  cert: fs.readFileSync('localhost-cert.pem'),
}, async (req, res) => {

  const client = await Client.getInstance(req, res);
  let body = await receiveBody(req); 
  const { method, url, headers } = req;
  
  if(url !== '/parser') body = jsonParse(body);

  console.log(`${method} ${url} ${headers.cookie}`);


  res.on('finish', () => {
    if (client.session) {
      if(url.split('/').pop() === 'register'){
        client.session.save();
      }
      
    }
  });
  
  const handler = routing[url];
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
  handler(client,body).then((data) => {
    const type = typeof data;
    const serializer = types[type];
    const result = serializer(data);
    client.sendCookie();
    res.writeHead(200, corsHeaders);
    res.end(result);
  }, (err) => {
    res.writeHead(500, corsHeaders);
    res.end(err.message);
    console.log(err);
  });
  return;
}

  res.writeHead(405, corsHeaders);
  res.end(`${req.method} is not allowed for the request.`);
}).listen(8000)
