import { default as pg } from "pg";

const dbConfig  = {
    host:'localhost',
    post:5432,
    user:'postgres',
    password:'260253',
    database:'book_library'
}


export const pool = new pg.Pool({...dbConfig});
