import user_prisma from "./api/prisma/user/index.js";
import book_prisma from './api/prisma/books/index.js'
import user_pg from './api/native_pg/user.js'
import book_pg from './api/native_pg/book.js'
import { authGuard } from "./auth/guards.js";
import Session from "./auth/session.js";


const orm_type = 'pg'
let services = {...user_prisma,...book_prisma};
if(orm_type === 'pg') services = {...user_pg,...book_prisma}


export const routing = {
  '/': async (client) => 'hi',
  '/api/user/register': async (client, body) => services.register(client, body),
  '/api/user/login': async (client, body) => services.login(client, body),
  '/api/user/unsign': async (client) => services.unsign(client),
  '/api/user': async (client) => services.getUsername(client),
  '/parser': async (client, body) => services.parseBook(client, body),
  '/parser/load': async (client,body) => services.loadBook(body),
  '/book/save': async (client) => authGuard(services.save(client)),
  '/book/getToRead': async (client) => authGuard(services.getToRead(client)),
  '/book/setToRead': async (client) => authGuard(services.setToRead(client))
}; 