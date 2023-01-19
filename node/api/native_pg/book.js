import url from 'url'
import v8 from 'v8';
import { BookReader } from "../../reader/index.js";
import { __delay__ } from "../../utils/async.js";
import { PrismaClient } from "@prisma/client";
import { pool } from '../../postgres/pg_client.js';

const __dirname = url.fileURLToPath(new URL('.', import.meta.url));

export default ({


  async parseBook(client,file) {
    const fileType = client.req.headers['content-type']
    if(fileType === 'application/json') file = file.toString()
    let unzippedBook = await BookReader.unzip(fileType,file)
    const logged = client.session
    BookReader.formattingHtml(logged)
    return unzippedBook
  },
  async loadBook( chapterHref ) {
      while (!BookReader.map.has(chapterHref))
          await __delay__(10);
  
      return {href:chapterHref,text:BookReader.map.get(chapterHref)}
    
    //let href = chapterHref.split('/').pop()
  },

  async save(client,book) {
    const id = client;
    const data = v8.serialize(book);
    await pool.query(`
    WITH create_book AS (
      INSERT INTO tbl_book VALUES(DEFAULT, '$2')
      RETURNING *)
      INSERT INTO tbl_user_books VALUES(DEFAULT,$1,(SELECT id from create_book), DEFAULT, DEFAULT, DEFAULT, DEFAULT);
  `, [id,data])
  },              

  async getAll(client) {
    const id = client.session;

    const result = await pool.query(`
    SELECT * FROM tbl_book WHERE id = $1;
    `, [id]);

    return result.rows[0];
  },

  async getCategory(client,category){
    const id = client.session;

    const result = await pool.query(`
    SELECT $1 FROM tbl_user_books WHERE id = $2;
    `, [category,id]);

    return result.rows[0];
  },

  async setCategory(client,category){
    const id = client.session;

    await pool.query(`
    UPDATE tbl_user_books SET $1 = true WHERE id = $2 ;
    `, [category, id]);
  }

})
