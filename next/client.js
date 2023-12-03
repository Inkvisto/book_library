import http2 from 'http2'
import fs from 'fs'
import { cache } from 'react'


const session = http2.connect('https://localhost:8000', {
  ca: fs.readFileSync('MYCSR.pem'),
})

session.on('error', (err) => { console.error(err) })
session.on('socketError', (err) => console.log({ socketErr: err }))


const getRequestData = async (stream) => {
  const chunks = [];
  for await (const chunk of stream) {
    chunks.push(Buffer.from(chunk));

  }
  const data = Buffer.concat(chunks).toString("utf-8");
  try {
    return JSON.parse(data);
  } catch (e) {
    return data;
  }

}

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


export const get_request = async (path, cookie, encoding = 'utf-8') => {
  try {
    const req = session.request({ ':path': path, 'cookie': cookie });

    req.on('error', (err) => console.error(err, 22));
    req.setEncoding(encoding);
    req.end();
    const res =  await getRequestData(req);

    if(res.data === 'access denied') throw Error(res.data)

    return res;

  } catch (e) {
    if(e.message === 'access denied') {
      return 'You need to login first to use this future'
    } else {
      return 'Server is currently offline'
    }
  }



};

export const post_request_with_cookie = async (path, body, cookie = '', headers, encoding = 'utf-8') => {
  try {
    
    const req = session.request({ ':path': path, ':method': 'POST', 'cookie': cookie })

    req.on('error', (err) => console.log(err));
    if (body) req.write(JSON.stringify(body));
    req.end();
    return await resolveRequest(req)
  } catch (e) {
    if(e.message === 'access denied') {
      return 'You need to login first to use this future'
    } else {
      return 'Server is currently offline'
    }
  }

}



export const post_request = async (path, body = '', encoding = 'utf-8') => {
  try {
    const req = session.request({ ':path': path, ':method': 'POST' })

    req.on('error', (err) => { console.log(err) });

    if (body.length !== 0) req.write(body);
    req.setEncoding(encoding);
    req.end();

    const parseBody = async (stream) => {
      const chunks = [];

      for await (const chunk of stream) {
        chunks.push(Buffer.from(chunk));
      }

      return Buffer.concat(chunks).toString("utf-8");
    }
    return await parseBody(req)

  } catch (e) {
    throw new Error(e)
  }

}

export default session;

