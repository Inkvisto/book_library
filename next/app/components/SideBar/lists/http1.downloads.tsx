import React from "react";
import { bookApi } from "../../../../pages/api/book/http1.api";

const Http1Downloads = ({getBook}:any) => {
  const inputRef = React.useRef<HTMLInputElement | any>(null);
  const chapters: any = []

  const handleClick = () => {
    inputRef.current.click()
  };

  const allowedTypes = ['application/epub+zip', 'application/epub']

  const promisedQueue = async (firstChapter:any,navigation: any) => {
  
    const chaptersIds = navigation.map((e: any) => e.href);
    // number of concurrent requests in one batch
    const batchSize = 4;
    // request counter
    let curReq = 0;
    // as long as there are items in the list continue to form     batches
    while (curReq < chaptersIds.length) {
      // a batch is either limited by the batch size or it is smaller than the batch size when there are less items required
      const end = chaptersIds.length < curReq + batchSize ? chaptersIds.length : curReq + batchSize;

      // we know the number of concurrent request so reserve memory for this
      const concurrentReq = new Array(batchSize);

      // issue one request for each item in the batch
      for (let index = curReq; index < end; index++) {
        concurrentReq.push(bookApi.loadBook(JSON.stringify(chaptersIds[index])))
        //console.log(`sending request ${curReq}...`)
        curReq++;
        
      }
      // wait until all promises are done or one promise is rejected
      
     let allChapters =  await Promise.all(concurrentReq)
  
     
     allChapters.map((chapter)=>{if(typeof(chapter) !== 'undefined') {
        
      chapters.push({[chapter.href]:chapter.text})  
    }})


    getBook({html:[...firstChapter, ...chapters],navigation})
    //  console.log(`requests ${curReq - batchSize}-${curReq} done.`)      
    }
  }

  const handleParseBook = async (event: any) => {

    const fileObj = event.target.files && event.target.files[0];


    if (!allowedTypes.some((e) => e === fileObj?.type)) {
      throw new Error('type of file is unsupported')
    }
    if (!fileObj) {
      return;
    }
    let data:any = await bookApi.parseBook(fileObj)


    const {html:firstChapter,navigation} = data
    let mappedHtml = new Map(Object.entries(firstChapter[0]))
    
    await getBook(data)
    
  
    await promisedQueue(firstChapter,navigation)
   
  
    
   
   //useBookStore.setState((state) => state.chapters = chapters)
 
  };
  return (
    <li onClick={() => handleClick()}>
      <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 0 24 24" width="24"><g><rect fill="none" height="24" width="24" /></g><g><path fill="currentColor" d="M5,20h14v-2H5V20z M19,9h-4V3H9v6H5l7,7L19,9z" /></g></svg>
      <span>
        Http1Downloads
      </span>
      <input
        type='file'
        style={{ display: 'none' }}
        ref={inputRef}
        onChange={handleParseBook}
      />

    </li>
  )
}




export default Http1Downloads