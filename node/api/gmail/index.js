import { google } from 'googleapis';

export default ({
    async getMessages(auth) {
    const gmail = google.gmail({version: 'v1', auth});
  
    const res = await gmail.users.messages.list({
      userId:'me'
    })
   
 return (await gmail.users.messages.get({id:'18643dcee431d5f9',userId:'me'})).data
  // return await Promise.all(res.data.messages.slice(0,1).map((e) =>  gmail.users.messages.get({id:e.id,userId:'me'})))[0].data;
  }
})
  


