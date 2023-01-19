const host = 'https://localhost:8000'


export const bookApi = ({
    async parseBook(book: File) {
        return fetch(
             `${host}/parser`,
             {
                 method: 'POST', mode: 'cors', credentials: 'include', body: book, headers: {
                     'Content-Type': 'application/epub+zip'
                 }
             })
             .then((response) => {
 
               return response.json()
             })
             .then((data) => {
                 
 
                return data
 
             })
             .catch((e) => {
                console.log(e);
                
                 throw new Error(e.message);
             })
    },
    async loadBook(chapterInfo: any) {        
        return fetch(
            `${host}/parser/load`,
            {
                method: 'POST', mode: 'cors', credentials: 'include', body: chapterInfo
            })
            .then((response) => {
                
                return response.json();
            })
            .then((data) => {
                return data;


            })
            .catch((e) => {
                console.log(e)
            })
    }
})
       /* export const loadChapter = () => fetch(
`${host}`,
{ method: 'POST', mode: 'cors', credentials: 'include', body: book,headers:{
  'Content-Type' : 'application/epub+zip'}
})
.then((response) => {
  return response.text();
})
.then((data) => {
  return data;
  
 
})
.catch((e) => {
  console.log(e)
})
*/


