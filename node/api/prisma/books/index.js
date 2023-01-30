import url from 'url'
import { __delay__ } from "../../../utils/async.js";
import { PrismaClient } from "@prisma/client";
import { BookReader } from '../../../reader/index.js';
import http2 from 'http2';

const __dirname = url.fileURLToPath(new URL('.', import.meta.url));
const { HTTP2_HEADER_PATH } = http2.constants
const PATH = `${__dirname}epub`
const prisma = new PrismaClient()
const corsHeaders = {
  'Access-Control-Allow-Origin': 'http://localhost:3000',
  'Access-Control-Allow-Methods': 'OPTIONS, POST, GET',
  'Access-Control-Max-Age': 2592000, // 30 days,
  'Access-Control-Allow-Credentials': true,
  'Access-Control-Allow-Headers': 'Content-Type'

};


export default ({
  async parseBook(client, file) {
    const fileType = client.req.headers['content-type']
    if(fileType === 'application/json') file = file.toString()
    let unzippedBook = await BookReader.unzip(fileType,file)
    const logged = client.session
    BookReader.formattingHtml(logged)
    return unzippedBook   
  },
  async loadBook(chapterHref) {

    while (!BookReader.map.has(chapterHref))
      await __delay__(10);

    return { href: chapterHref, text: BookReader.map.get(chapterHref) }
    
  },
  async saveBook(data, email, description = undefined) {
    const json = JSON.stringify(Object.fromEntries(data))
    /* return await prisma.book.create({
       data:{
         name:'Atomics_Habits',
         data:json,
         description,
         user: { connect: { email } }
       }
     }).then(async()=>{
       console.log(await prisma.book.findMany());
     })*/
  },


})
