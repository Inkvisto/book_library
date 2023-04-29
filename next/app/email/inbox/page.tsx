import { get_request } from "../../../client"
import { Inbox } from "./Inbox";


export default async function Page() {
  
    const messages = JSON.parse(await get_request('/api/gmail/getMessages'));

   
return(
         <Inbox messages={messages} />
)
}