import Home from "./main";
import { post_request } from "../client";

export interface ColorAsset {
  'day': string,
  'sepia_contrast': string
}

async function getBooks() {
  const r = (min: number, max: number) => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }


  let booksIds = [];
  for (let i = 0; i < 10; i++) {
    booksIds.push(r(0, 60000))
  }

  const titles = await post_request('/api/ebooks/parseTitles', JSON.stringify(booksIds));



  return ({ titles: JSON.parse(titles), booksIds })

}

export default async function Page() {



  const booksTitleData = await getBooks()

  return <>
    <Home booksTitleData={booksTitleData} />
  </>
}