import AdmZip from 'adm-zip'
import xml2js from 'xml2js'


//'./Gilbert Elizabeth. The Signature of All Things_ A Novel - royallib.com.fb2.zip'
//xml2js.defaults['0.1']
export const fb2Reader = ({
    zip: null,
    body:[],

    async open(file){
      this.zip = new AdmZip(file)
      this.names = this.zip.getEntries().map(function (zipEntry) {
        return zipEntry.entryName;
      });
    },
    parseBody(){
  let xml = this.zip.readAsText(this.names[0])
    
   this.body = xml.match(/<body>.+<\/body>/gm)
}
})


