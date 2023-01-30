'use client'
import React from "react";

const Downloads = ({getBook}:any) => {
  const inputRef = React.useRef<HTMLInputElement | any>(null);
  const chapters: any = []

  const handleClick = () => {
    inputRef.current.click()
  };

  const allowedTypes = ['application/epub+zip', 'application/epub']

  const handleParseBook = async (event: any) => {

    const fileObj = event.target.files && event.target.files[0];


    if (!allowedTypes.some((e) => e === fileObj?.type)) {
      throw new Error('type of file is unsupported')
    }
    if (!fileObj) {
      return;
    }




   let data:any  = await fetch('/api/book/parse', { method: 'POST', body: fileObj,headers:{
    'Content-Type':'application/epub+zip'
   }}).then((res) => res.json())
    
    await getBook( JSON.parse(data))
 
  };
  return (
    <li onClick={() => handleClick()}>
      <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 0 24 24" width="24"><g><rect fill="none" height="24" width="24" /></g><g><path fill="currentColor" d="M5,20h14v-2H5V20z M19,9h-4V3H9v6H5l7,7L19,9z" /></g></svg>
      <span>
        Downloads
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




export default Downloads