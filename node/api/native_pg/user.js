import { pool } from '../../postgres/pg_client.js'
import { hashPassword, validatePassword } from 'metautil';
import Session from '../../auth/session.js'
const tbl_name = 'tbl_user'


export default ({
    async register(client, payload) {
        const hash = await hashPassword(payload.password);
        const { email, username } = payload;
        try {
            await pool.query(`
            WITH create_user AS (
                INSERT INTO tbl_user VALUES(DEFAULT, $1, DEFAULT, DEFAULT,$2, $3)
                RETURNING *)
                INSERT INTO tbl_user_settings VALUES((SELECT id from create_user),'day','chapters')
                RETURNING (SELECT name from create_user);
            `, [email, username, hash])

            await Session.start(client)
            client.session.set('email', email)
            return { username }
        } catch (e) {
            throw new Error(e);
        }
    },


    async login(client, { email, password }) {
        const result = await pool.query('SELECT * FROM tbl_user WHERE email = $1', [email]);
        const user = result.rows[0];
        if (!user) throw new Error('Incorrect login or password');
        const { password: hash } = user;
        const valid = await validatePassword(password, hash);
        if (!valid) throw new Error('Incorrect login or password');
        await Session.start(client)
        return { username: user.name }
    },

    async unsign(client) {
        console.log(client);
       // client.session.delete();
       // client.deleteCookie('')
    },

    async getUsername(client) {
        if (client.session) {
            const email = Object.fromEntries(client.session).email;
            const result = await pool.query('SELECT name FROM tbl_user WHERE email = $1', [email]);
            return result.rows[0];
        }
    }
})
