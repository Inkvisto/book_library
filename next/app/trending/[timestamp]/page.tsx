import Trending from "./Trending";
import http2 from 'http2';

export default async function Page() {

   // const bookInfo =  await fetch('https://openlibrary.org/trending/daily.json').then((res) => res.body?.pipeThrough(new TextDecoderStream()).getReader());
   /*console.time("client_connection");
  const client = http2.connect(('https://covers.openlibrary.org'));

  client.on('connect', () => {
    console.timeEnd("client_connection");
  })

  const getRequestData = async (stream:any) => {
    const chunks = [];
    for await (const chunk of stream) {
      chunks.push(Buffer.from(chunk));
    }
    return Buffer.concat(chunks);

  }

 
    const req = client.request({ ':path': '/b/id/240727-S.jpg' })
  
    req.on('error', (err) => console.error(err));
    req.setEncoding('utf-8');
    req.end();


 console.log(await getRequestData(req));*/
 
    return <>
    some
   <Trending  />
    </>
  }