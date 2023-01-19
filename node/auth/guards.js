export const authGuard = fn => (client, body) => {
    if (client.session) {
      return fn(body)
    } else {
      return { data: 'access denied' };
    }
  }
  