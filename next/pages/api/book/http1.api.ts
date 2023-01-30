const host = 'http://localhost:8000'


export const bookApi = ({
  async parseBook(book: File) {
    return fetch(
      `${host}/api/book/parse`,
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
