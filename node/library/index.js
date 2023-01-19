'use strict'
if (!String.prototype.splice) {
    /**
     * {JSDoc}
     *
     * The splice() method changes the content of a string by removing a range of
     * characters and/or adding new characters.
     *
     * @this {String}
     * @param {number} start Index at which to start changing the string.
     * @param {number} delCount An integer indicating the number of old chars to remove.
     * @param {string} newSubStr The String that is spliced in.
     * @return {string} A new string with the spliced substring.
     */
    String.prototype.splice = function(start, delCount, newSubStr) {
        return this.slice(0, start) + newSubStr + this.slice(start + Math.abs(delCount));
    };
}

let str = `
The art of music, Volume 3 of 14, by Daniel Gregory Mason                68990
 [Subtitle: Modern Music]

Catalogue of a collection of early drawings and pictures of London,      68989
 by the Burlington Fine Arts Club
 [Subtitle: With some contemporary furniture]

`
let string;


let iterateBookIndex = function* (start = 0, end = Infinity, step = 1) {
    let iterationCount = 0;
    let result = str;
    for (let i = start; i < end; i += step) {
        result = result.replace(/\n(?!\s)/, ` book[${iterationCount++}]\n  name = `).replace(/(?<=,\s|\d\s+)by/, '\n  author =')
      //  console.log('Add name and author:',result);
        let id = result.match(/(?<!id =)(\s\d+)(?=\n)/)
        let add_start = result.match(/(?<!name = .+\s+)\s(?=author =)/)
        if(add_start){
        result = result.splice(add_start.index,0,` id =${id[0]}\n `)
     //   console.log('Add id many:',result);
       
        let redundant = result.match(/(?<=\d\n)(.+\s+)(?=  id = )/)
       
        if(!redundant) {
            redundant = result.match(/(?<=\d\n)(.+\s+)+(?=  id = )/)
        result = result.replace(/(?<=\d)(\s+.+)+(?= \s+id =)/,'')
    }


        result = result.replace(/(?<=\d)(\s+.+)(?= \s+id =)/,'')
      //  console.log('delete redundant:',result);
        result = result.splice(id.index-7,id[0].length+7,',')
       // console.log('delete id:',result);
        let add_id = result.match(/,(?=\s+id =)/)
      //  console.log('redunant:',redundant[0].replace(/[\n\r,]/,'').slice(0,-3));

        if(add_id) result = result.splice(add_id.index,0,`${redundant[0].slice(0,-3).replace(/[\n\r]/,'')}`)
        
        // console.log('add redunant',result)

        } else {
     if(result.match(/(?<=\d+\s+)\n(?=\s+author = )/)){

     }
        result = result.replace(/(?<=\s+)\s(?=\d)/,'\n  id = ')
        }
        
        let description = result.match(/\[\D+.+\]/)
        if(description){
         
        let description_name = description[0].match(/(?<=\[).+(?=:)/gm)
        let description_value = description[0].match(/(?<=:)([\S\s]*?)(?=\])/gm)
        let descriptionResult = []
    if(description_name){
        description_name.forEach((e,i)=>{
           descriptionResult.push(`\n    ${e} =${description_value[i]}`)
        })
    } else {
    
        let descriptionWithoutName = description[0].slice(1,-1)
        descriptionResult.push('\n   co_author = ',descriptionWithoutName)

    }

        descriptionResult.unshift(' description')

        result = result.replace(description[0],descriptionResult.join(''))
      
    } else{}
   // console.log('main result:',result);
        yield result
    }
}

let matchesCount = str.match(/\n(?!\s)/gm).length
let gen = iterateBookIndex()
for (let i = 0; i < matchesCount; i++) {
    gen.next().value     
}



/*
let delCount = redundant_book_name[0].length
let start = id.indexOf(...redundant_book_name)
let remove_redundant = id.splice(start,delCount,'').replace(/^\s*\n/gm, "") 
let add_redundant = id

/*
let description = '(\[.+\n\s+.+\])|(\[.+\])'
let description_name = id.replace(/\[/gm, `decription
    name=`)
let description_value = description_name.replace(/(?<=name=.+)\:/gm, `
    value=`).replace(/\]/gm, '')


 //console.log(description_value);*/