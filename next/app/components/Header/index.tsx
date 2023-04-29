'use client'
import Link from "next/link"
import React from "react"
import styles from './Header.module.scss'


export interface userData {
    username: string
}

interface ContentElements {
    defaultLogin: JSX.Element;
    loginPopup: JSX.Element;
    registerPopup: JSX.Element;
    userLogin: (username: string) => JSX.Element;
    userRegister: (user: any) => JSX.Element;
    serverError:JSX.Element;
}


const Header = () => {
    const [contentHandler, setContentHandler] = React.useState<string | [string, any]>('defaultLogin')


    const togglePopups = (type: string) => {
        if (type === 'login') {
            setContentHandler('loginPopup')
        } else {
            setContentHandler('registerPopup')
        }
    }

    const handleUnsign = async () => {
        await fetch('/api/user/unsign').then((res) => res.json());
        setContentHandler('defaultLogin')
    }

    React.useEffect(() => {
        const fetchUser = async () => {
            const username = await fetch('/api/user').then((res) => res.json());
            
            if(!username) {
                setContentHandler('defaultLogin')
            } else if(username.message){
                setContentHandler('serverError')
            } else {
                setContentHandler(['userLogin', username.name])
            }
            
        }
        fetchUser()
    }, [])


    const handleLoginSubmit = async (e: React.SyntheticEvent) => {
        e.preventDefault();
        const target = e.target as typeof e.target & {
            email: { value: string };
            password: { value: string };
        };
        const email = target.email.value;
        const password = target.password.value;

        const { username } = await fetch('/api/user/login', { method: 'POST', body: JSON.stringify({ email, password }) }).then((res) => res.json())

        setContentHandler(['userLogin', username])
    };


    const handleRegisterSubmit = async (e: React.SyntheticEvent) => {
        e.preventDefault();
        const target = e.target as typeof e.target & {
            username: { value: string };
            email: { value: string };
            password: { value: string };
        };
        const username = target.username.value;
        const email = target.email.value;
        const password = target.password.value;

        const user = await fetch('/api/user/register', { method: 'POST', body: JSON.stringify({ username, email, password }) }).then((res) => res.json())
        setContentHandler(['userRegister', user.username])
    };


    const jsx: ContentElements = {
        'defaultLogin': <span onClick={() => togglePopups('login')} className={styles.defaultLogin}>Login</span>,
        'loginPopup': <form onSubmit={handleLoginSubmit} className={styles.login}>
            <div className={styles.inputContainer}>
                <label>Email</label>
                <input type="email" name="email" required />
            </div>
            <div className={styles.inputContainer}>
                <label>Password </label>
                <input type="password" name="password" required />
            </div>
            <div className={styles.buttonContainer}>
                <input type="submit" value='Login' />
                <div onClick={() => togglePopups('register')}>Register</div>
            </div>
        </form>,
        'registerPopup': <form onSubmit={handleRegisterSubmit} className={styles.register}>
            <div className={styles.inputContainer}>
                <label>Username</label>
                <input type="username" name="username" required />
            </div>
            <div className={styles.inputContainer}>
                <label>Email</label>
                <input type="email" name="email" required />
            </div>
            <div className={styles.inputContainer}>
                <label>Password </label>
                <input type="password" name="password" required />
            </div>
            <div className={styles.buttonContainer}>
                <div onClick={() => togglePopups('login')}>Login</div>
                <input type="submit" value='Register' />
            </div>
        </form>,
        'userLogin': (username: string | { error: string }) => <>{username ? <div>{typeof username === 'object' ? <div>{jsx.loginPopup}<span className={styles.loginError}>{username.error}</span></div> : <div className={styles.userLogin}>{username}<div onClick={handleUnsign} className={styles.unsign}>unsign</div></div>}</div> : <div>There is no such user try to  <div onClick={() => togglePopups('register')} >Register</div></div>}</>,
        'userRegister': (user: any) => <div>{user ? <>{user}<div onClick={handleUnsign} className={styles.unsign}>unsign</div></> : <>There is already user with this email try another one <div onClick={() => togglePopups('register')} >Register</div></>}</div>,
        'serverError':<>Server is currently offline</>
    }



    
    return (
        <div>
            <nav className={styles.container}>
                <li >
                    <Link href="/">
                        My books
                    </Link>
                </li>
                <li>
                    <Link href="/">
                        Categories
                    </Link>
                </li>
                <li className={styles.search}>
                    search input
                </li>
                <div className={styles.loginContainer}>
                   {typeof contentHandler === 'string' ? jsx[`${contentHandler}` as keyof ContentElements] : jsx[`${contentHandler[0]}` as keyof ContentElements] instanceof Function ? (contentHandler[1]): null} 
                </div>
            </nav>
        </div>
    )
}


export default Header

