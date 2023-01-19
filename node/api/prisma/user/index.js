import { Prisma, PrismaClient } from '@prisma/client'
import { generateToken, hashPassword, validatePassword } from 'metautil';
import Session from '../../../auth/session.js'

const prisma = new PrismaClient()

export default ({
    async register(client, payload) {
        const hash = await hashPassword(payload.password);
        try {
            const user = await prisma.user.create({
                data: {
                    ...payload,
                    password: hash,
                    refreshToken: null
                }
            })
            await Session.start(client)
            client.session.set('email', email)
            client.session.save();
              
            return { user }
        } catch (e) {
            if (
                e instanceof Prisma.PrismaClientKnownRequestError &&
                e.code === 'P2002'
            ) {
                throw new Error(`Email ${payload.email} already used.`, { cause: e });
            } else {
                throw new Error(e);
            }
        }

    },

    async login(client, {email,password}) {
        const user = await prisma.user.findUnique({ where: { email: email } })
        if (!user) throw new Error('Incorrect login or password');
        const { password: hash } = user;
        const valid = await validatePassword(password, hash);
        if (!valid) throw new Error('Incorrect login or password');
        await Session.start(client)
        return {username:user.username}
    },

    async getUsername(client) {
        if (client.session) {
            return Object.fromEntries(client.session)
        } else {
            throw new Error('No token for user');
        }

    }
})
