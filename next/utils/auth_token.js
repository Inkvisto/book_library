export const get_auth_token = (nextCookies) => {
    const cookie = nextCookies.get('token') 
    
    return `${cookie?.name}=${cookie?.value}`;
}