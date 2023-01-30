import http2 from 'http2'
import fs from 'fs'

const session = http2.connect('https://localhost:8000', {
  ca: fs.readFileSync('localhost-cert.pem'),
});
session.on('error', (err) => console.error(err));

const getRequestData = async (stream) => {
  const chunks = [];
  for await (const chunk of stream) {
    chunks.push(Buffer.from(chunk));
  }
  return Buffer.concat(chunks).toString("utf-8");
}


export const get_request = async (path, cookie, encoding = 'utf-8') => {

  const req = session.request({ ':path': path, 'cookie': cookie });

  req.on('error', (err) => console.error(err));
  req.end();
  req.setEncoding(encoding);

  return await getRequestData(req)

}

export const post_request_with_cookie = async (path, body = null, cookie = '', headers, encoding = 'utf-8') => {

  const req = session.request({ ':path': path, ':method': 'POST', 'cookie': cookie,'Content-Type': 'application/epub+zip' })

  req.on('error', (err) => console.error(err));
  if(body)req.write(body);

  req.end();


  const resolveRequest = async (stream) => {
    const chunks = [];
    const cookie = [];
    await stream.on('response', (headers) => {
      for (const name in headers) {
        if (name == 'set-cookie') {
          cookie.push(...headers[name])
        }
      }

    })
    for await (const chunk of stream) {
      chunks.push(Buffer.from(chunk));
    }
    return { body: Buffer.concat(chunks).toString("utf-8"), cookie };
  }

  return await resolveRequest(req)

}



export const post_request = async (path, body = null, encoding = 'utf-8') => {


  const req = session.request({ ':path': path, ':method': 'POST'})

  req.on('error', (err) => console.error(err));
  if (body) req.write(body);
  req.end();
  req.setEncoding(encoding);

  const parseBody = async (stream) => {
    const chunks = [];

    for await (const chunk of stream) {
      chunks.push(Buffer.from(chunk));
    }

    return Buffer.concat(chunks).toString("utf-8");
  }
  return await parseBody(req)

}

export default session;

