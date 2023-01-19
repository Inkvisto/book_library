'use strict';

import { generateToken } from 'metautil';
import config_token from '../config/token.js'
import { session_storage_type } from '../config/authorization.js';
import storage from './pg_storage.js';

// change config usage(використання)
/*
if(session_storage_type === 'pg'){
  import storage from './pg_storage.js';
} else {
  import storage from './pg_storage.js';
}*/

const { characters, secret, length } = config_token;

class Session extends Map {
    constructor(token) {
      super();
      this.token = token;
    }
  
    static start(client) {
      if (client.session) return client.session;
      const token = generateToken(secret, characters, length);
      client.token = token;
      const session = new Session(token);
      client.session = session;
      client.setCookie('token', token);
      storage.set(token, session);
      return session;
    }
  
    static restore(client) {
      const { cookie } = client;
      if (!cookie) return;
      const sessionToken = cookie.token;
      if (sessionToken) {
        return new Promise((resolve, reject) => {
          storage.get(sessionToken, (err, session) => {
            if (err) reject(new Error('No session'));
            Object.setPrototypeOf(session, Session.prototype);
            client.token = sessionToken;
            client.session = session;
            resolve(session);
          });
        });
      }
    }
  
    delete(client) {
      const { token } = client;
      if (token) {
        client.deleteCookie('token');
        client.token = undefined;
        client.session = null;
        storage.delete(token);
      }
    }
  
    save() {
      storage.save(this.token);
    }
  }
  

  export default Session