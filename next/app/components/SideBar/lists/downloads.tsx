'use client'
import React from "react";

export const downloads = ({component,getBook}:any) => {
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
    
    //await getBook( JSON.parse(data))
 
  };
  return (
    <li onClick={() => handleClick()}>
      <input
        type='file'
        style={{ display: 'none' }}
        ref={inputRef}
        onChange={handleParseBook}
      />
    {component}
    </li>
  )
}
