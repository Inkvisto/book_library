'use strict'

import { pool } from '../postgres/pg_client.js';
import v8 from 'v8';

const get_db_session = (token, ...args) => {
  const callback = args[args.length - 1];
  if (typeof token !== 'string') {
    callback(new Error('Invalid session token'));
    return;
  }
  pool.query(`
    SELECT * FROM tbl_sessions WHERE token = $1;
    `, [token])
};

const save_db_session = (token, ...args) => {
  const callback = args[args.length - 1];
  if (typeof token !== 'string') {
    callback(new Error('Invalid session token'));
    return;
  }
  pool.query(`
    INSERT INTO tbl_sessions VALUES(DEFAULT,$1);
    `, [token])
};

const delete_db_session = (token, ...args) => {
  const callback = args[args.length - 1];
  if (typeof token !== 'string') {
    callback(new Error('Invalid session token'));
    return;
  }
  pool.query(`
    DELETE FROM tbl_sessions * WHERE token = $1`, [token]
  );
};


class PG_Storage extends Map {
  get(key, callback) {
  const value = super.get(key);
  if (value) {
    callback(null, value);
    return;
  }
  get_db_session(key, (err, data) => {
    if (err) {
      callback(err);
      return;
    }
    console.log(`Session loaded: ${key}`);
    const session = v8.deserialize(data);
    super.set(key, session);
    callback(null, session);
  });
}

save(key) {
  const value = super.get(key);
  if (value) {
    const data = v8.serialize(value);
    save_db_session(key, data, () => {
      console.log(`Session saved: ${key}`);
    });
  }
}

delete(key) {
  console.log('Delete: ', key);
  delete_db_session(key, () => {
    console.log(`Session deleted: ${key}`);
  });
}
}

export default new PG_Storage();
