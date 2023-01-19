
import AdmZip from 'adm-zip'
import { __dirname } from '../utils/path.js';
import { EpubReader } from './epub/index.js';
import { fb2Reader } from './fb2/index.js';

export const BookReader = ({
    zip: null,
    names: null,
    count: null,
    chunks: { html: [], navigation: [], images: [] },
    map: new Map(),

/*
Reader.uzip([file(Buffer) or filename(String)-path to epub file]) => undefined

unzip file with zip unpacker("adm-zip") 
check mime type and run [mimetype]Reader

*/

    async unzip(fileType,file) {
        this.chunks = { html: [], navigation: [] }
        if (fileType === 'application/epub+zip') {
            await EpubReader.open(file)
            const { spine } = EpubReader
            const firstChapter =  spine.contents[0]
           
                EpubReader.getChapter(firstChapter.id, (error, text) => {
                    this.chunks.html.push({[firstChapter.href]:text})
                })
            spine.contents.shift()
            this.chunks.navigation.push(...spine.contents)
            return this.chunks


        } else {
            let html = []

            fb2Reader.open(file).then(() => {
                fb2Reader.parseBody()
                html.push(...fb2Reader.body)
            })

            return html
        }


    },
    formattingHtml(logged) {
        const arrOfValues = [];
        const arrOfKeys = []
        EpubReader.spine.contents.forEach(chapter => {
            EpubReader.getChapter(chapter.id, (error, text) => {
                arrOfKeys.push(chapter.href)
                arrOfValues.push(text)
            })
        })

        const wordsRegexp = '^[^А-Яа-яA-Za-z0-9_]*(?:[А-Яа-яA-Za-z0-9_]+[^А-Яа-яA-Za-z0-9_]*)'


        class AsyncArray extends Array {
            [Symbol.asyncIterator]() {
                let i = 0;
                return {
                    next: () => new Promise(resolve => {
                        setImmediate(() => resolve({
                            value: this[i],
                            done: i++ === this.length
                        }));
                    })
                };
            };
        }

        let k = 0;
        const chapters = new AsyncArray(...arrOfValues)
        let pages = []


const timer = setInterval(() => k++, 10);
console.time();
(async () => {
        let i = 0;

        for await(const currentChapter of chapters) {
            const formattedChapter = currentChapter.replace(/(\r\n|\n|\r)/gm, '')
            const chapterText = formattedChapter.match(/(?<=<.+.>)(.*?)(?=<.*\/.+.?>)/g)?.join(' ')
            const formattedPages = []
            if (chapterText && chapterText.length > 4000) {
                const getChunkOfHtmlPage = (text, html) => {
                    let chunk;
                    if (text.length < 5000) {
                        chunk = text.match(new RegExp(`${wordsRegexp}{0,}`, 'g'))
                        text = text.replace(/.+/g, '')
                    } else {
                        chunk = text.match(new RegExp(`${wordsRegexp}{0,800}`, 'g'))
                    }

                    if (chunk) {

                        let borderWords = chunk[0].trim().split(' ').slice(-3).join(' ')

                        let page;
                        try {
                            page = html.match(
                                new RegExp(`^[^А-Яа-яA-Za-z0-9_]*.+${borderWords}`, 'g')
                            );
                            if (text.length < 5000) {
                                page = html.match(
                                    new RegExp(`^[^А-Яа-яA-Za-z0-9_]*.+`, 'g')
                                );
                            }
                        } catch (e) {
                            page = html.match(
                                new RegExp(`^[^А-Яа-яA-Za-z0-9_]*.+${borderWords.replace(/[)]/g, '')}`, 'g')
                            );
                        }
                        if (page && text.length > 4000) {
                            formattedPages.push(...page)

                            if (text.length < 5000) {
                                getChunkOfHtmlPage(
                                    text,
                                    html
                                )
                            }
                            getChunkOfHtmlPage(
                                text.replace(/^\W*(?:\w+\b\W*){0,800}/g, ''),
                                html.replace(page[0], '')
                            )

                        } else {
                            if(page) formattedPages.push(...page)
                           
                        }
                        return page
                    }
                };
                getChunkOfHtmlPage(chapterText, formattedChapter)
                pages.push(formattedPages)
            } else {
                pages.push(currentChapter)
            }
            this.map.set(arrOfKeys[i], pages[i])
            if (chapterText) i++;
        }
        clearInterval(timer);
console.dir({ i, k });
console.timeEnd()
//if(logged) bookService.saveBook(this.map,logged.get('email'))
})();
        return this.map
        /* class AsyncArray extends Array {
             [Symbol.asyncIterator]() {
                 let i = 0;
                 return {
                     next: () => new Promise(resolve => {
                         setImmediate(() => resolve({
                             value: this[i],
                             done: i++ === this.length
                         }));
                     })
                 };
             };
         }
 
 
         let pages = []
 
         let k = 0;
         const chapters = new AsyncArray(...arrOfValues)
 
 
         const timer = setInterval(() => k++, 10);
        // console.time();
         (async () => {
             let i = 0;
             for await (const currentChapter of chapters) {
                 const formattedChapter = currentChapter.replace(/(\r\n|\n|\r)/gm, '')
                 const chapterText = formattedChapter.match(/(?<=<.+.>)(.*?)(?=<.*\/.+.?>)/g)?.join(' ')
                 const formattedPages = []
                 if (chapterText && chapterText.length > 4000) {
                     const getChunkOfHtmlPage = (text, html) => {
                         const chunk = text.match(new RegExp(`${wordsRegexp}{0,800}`, 'g'))
                         if (chunk) {
                             let borderWords = chunk[0].trim().split(' ').slice(-3).join(' ')
 
                             let page;
 
                             try {
                                 page = html.match(
                                     new RegExp(`^[^А-Яа-яA-Za-z0-9_]*.+${borderWords}`, 'g')
                                 );
                             } catch (e) {
                                 page = html.match(
                                     new RegExp(`^[^А-Яа-яA-Za-z0-9_]*.+${borderWords.replace(/[)]/g, '')}`, 'g')
                                 );
                             }
                             if (page && text.length > 4000) {
                                 formattedPages.push(...page)
                                 getChunkOfHtmlPage(
                                     text.replace(/^\W*(?:\w+\b\W*){0,800}/g, ''),
                                     html.replace(page[0], '')
                                 )
                             } else {
                                 formattedPages.push(text)
                             }
                             return page
                         }
                     };
                     getChunkOfHtmlPage(chapterText, formattedChapter)
                     pages.push(formattedPages)
                 } else {
                     pages.push(currentChapter)
                 }
                 this.map.set(arrOfKeys[i], pages[i])
                 if (currentChapter) i++;
             }
             clearInterval(timer);
             console.dir({ i, k });
            // console.timeEnd()
         })();*/
    }
})