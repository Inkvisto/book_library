const host = 'https://localhost:8000/api/user'



export const register = (data: { username: string, email: string, password: string }) =>
    fetch(
        `${host}/register`,
        { method: 'POST', mode: 'cors', credentials: 'include', body: JSON.stringify(data) })
        .then((response) => {

            return response.json();
        })
        .then((data) => {
            return data.username

        })
        .catch((e) => {
            console.log(e);
            return null
        })


export const login = (data: { email: string, password: string }) => fetch(
    `${host}/login`,
    { method: 'POST', mode: 'cors', credentials: 'include', body: JSON.stringify(data) })
    .then(async (res) => {
        if (res.status === 500) throw { error: await res.text(), status: res.status };
        return res.json();
    })
    .then((user) => {
        return user.username

    })
    .catch((e) => {
        console.log(e);

    })

export const unsign = () => fetch(
    `${host}/unsign`,
    { method: 'GET', mode: 'cors', credentials: 'include' })
    .then((response) => {
        return response.text();
    })
    .then((data) => {
        return data

    })
    .catch((e) => {
        console.log(e)
    })

