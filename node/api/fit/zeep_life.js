import { pool } from '../../postgres/pg_client.js'
import { hashPassword, validatePassword } from 'metautil';
import Session from '../../auth/session.js'
import { getFitData } from '../../zeep_life/encode.js';
const tbl_name = 'tbl_user'


export default ({

    async getData(payload){
        const { category } = payload;
        const fitData = getFitData(category);

        try {
            await pool.query(`
            WITH create_user AS (
                INSERT INTO tbl_user_fit_data VALUES()
                RETURNING *)
                INSERT INTO tbl_user_settings VALUES((SELECT id from create_user),'day','chapters')
                RETURNING (SELECT name from create_user);
            `, [email, username, hash])
                return {}
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
        client.session.set('id', user.id )
        client.session.save();
        return { username: user.name }
    },

    async unsign(client) {
        client.session.delete(client);
    },

    async getUsername(client) {
        if (client.session) {
            const id = Object.fromEntries(client.session).id;
            const result = await pool.query('SELECT name FROM tbl_user WHERE id = $1', [id]);
            return result.rows[0];
        } else {
             throw new Error('No token for user');
        }
    }
})
