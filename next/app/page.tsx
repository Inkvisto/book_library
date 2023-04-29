import Home from "./main";
import { get_request, post_request, post_request_with_cookie } from "../client";
import { cookies } from "next/headers";
import { get_auth_token } from "../utils/auth_token";

export interface ColorAsset {
  'day': string,
  'sepia_contrast': string
}

async function getBooks() {
  const r = (min: number, max: number) => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }


  let booksIds:any = [];
  for (let i = 0; i < 10; i++) {
    booksIds.push(r(0, 60000))
  }


  const titles = await post_request('/api/ebooks/parseTitles', JSON.stringify(booksIds));

  
  return ({ titles:'titles', booksIds,source:'gutenberg' })
}



export default async function Page() {

  const auth_token = get_auth_token(cookies());
  const username = await get_request('/api/user', auth_token);
  const fitData = await post_request_with_cookie('/api/fit/zeep_life/getData',{category:'activity',range:7},auth_token);

  
  return <>
    <Home username={username?.name} fitData={typeof fitData === 'object' && fitData.body} />
  </>
}