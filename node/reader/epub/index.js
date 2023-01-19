import { __dirname } from '../../utils/path.js';
import AdmZip from 'adm-zip'
import xml2js from 'xml2js'
export const EpubReader = ({

  // initial data

  zip: null,
  names: null,
  count: null,
  imageroot: null,
  linkroot: null,

  mimeFile: false,
  containerFile: false,
  rootFile: false,

  spine: { toc: false, contents: [] },
  metadata: {},
  manifest: {},
  guide: [],
  flow: [],
  toc: [],

  xmlparser: new xml2js.Parser(xml2js.defaults['0.1']),
  /*
   EpubReader.open([file(Buffer) or filename(String)-path to epub file]) => undefined
 
   open epub file with zip unpacker("adm-zip") 
   run mime type check
   */

  async open(filename, imageroot, linkroot) {
    this.imageroot = (imageroot || "/images/").trim();
    this.linkroot = (linkroot || "/links/").trim();
    if (this.imageroot.substr(-1) != "/") {
      this.imageroot += "/";
    }
    if (this.linkroot.substr(-1) != "/") {
      this.linkroot += "/";
    }
    this.spine.contents = []

    try {
      if (Buffer.isBuffer(filename)) {
        this.zip = new AdmZip(filename)
      } else {

        this.zip = new AdmZip(__dirname(import.meta) + filename)
      }
      this.names = this.zip.getEntries().map(function (zipEntry) {
        return zipEntry.entryName;
      });
      this.count = this.names.length
    } catch (e) {
      throw new Error('Invalid/missing file')
    }
    if (!this.names || !this.count) throw new Error("No files in archive");
    this.checkMimeType()

  },
  /*
   EpubReader.checkMimeType() => undefined

   Checks if there's a file called "mimetype" and it's content "application/epub+zip". 
   On success runs root file check.
  */
  checkMimeType() {
    for (let i = 0; i < this.count; i++) {
      if (this.names[i].toLowerCase() == "mimetype") {
        this.mimeFile = this.names[i];
        break;
      }
    }
    if (!this.mimeFile) throw new Error("No mimetype file in archive");

    let txt = this.zip.readFile(this.mimeFile).toString("utf-8").toLowerCase().trim();
    if (txt != "application/epub+zip") throw new Error("Unsupported mime type");

    this.getRootFiles()
  },

  /*
  EpubReader.getRootFiles() => undefined
     
  Looks for a "meta-inf/container.xml" file and search for a
  rootfile element with mime type "application/oebps-package+xml".
  On success calls the rootfile parser
  */

  getRootFiles() {

    for (let i = 0; i < this.count; i++) {
      if (this.names[i].toLowerCase() == "meta-inf/container.xml") {
        this.containerFile = this.names[i];
        break;
      }
    }
    if (!this.containerFile) {
      throw new Error("No container file in archive");
    }

    let xml = this.zip.readFile(this.containerFile).toString("utf-8").toLowerCase().trim();
    this.xmlparser.parseString(xml, (err, data) => {
      if (err) throw new Error("Parsing container XML failed in getRootFiles: " + err.message)

      if (!data.rootfiles || !data.rootfiles.rootfile) throw new Error("No rootfiles found");

      let rootfile = data.rootfiles.rootfile,
        filename = false;

      if (Array.isArray(rootfile)) {
        for (let i = 0; i < data.rootfiles.rootfile.length; i++) {
          if (rootfile[i]["@"]["media-type"] &&
            rootfile[i]["@"]["media-type"] == "application/oebps-package+xml" &&
            rootfile[i]["@"]["full-path"]) {
            filename = rootfile[i]["@"]["full-path"].toLowerCase().trim();
            break;
          }
        }

      } else if (rootfile["@"]) {
        if (rootfile["@"]["media-type"] != "application/oebps-package+xml" || !rootfile["@"]["full-path"]) throw new Error("Rootfile in unknown format");
        filename = rootfile["@"]["full-path"].toLowerCase().trim();
      }

      if (!filename) throw new Error("Empty rootfile");


      for (let i = 0; i < this.names.length; i++) {
        if (this.names[i].toLowerCase() == filename) {
          this.rootFile = this.names[i];
          break;
        }
      }

      if (!this.rootFile) throw new Error("Rootfile not found from archive");
      this.handleRootFile()
    })
  },

  /*
      EpubReader.handleRootFile() => undefined
       
      Parses the rootfile XML and calls rootfile parser
   */
  handleRootFile() {
    let xml = this.zip.readFile(this.rootFile).toString("utf-8");
    this.xmlparser.parseString(xml, (err, data) => {
      if (err) throw new Error("Parsing container XML failed in handleRootFile: " + err.message);
      this.parseRootFile(data)
    })
  },

  /*
   EpubReader.parseRootFile() => undefined

    Parses elements "metadata," "manifest," "spine" and TOC
    return if no TOC
  
  */


  parseRootFile(rootfile) {
    this.version = rootfile['@'].version || '2.0';
    let keys = Object.keys(rootfile);
    for (let i = 0; i < keys.length; i++) {
      let keyparts = keys[i].split(":");
      let key = (keyparts.pop() || "").toLowerCase().trim();
      let route = {
        'metadata': this.parseMetadata(rootfile[keys[i]]),
        'manifest': this.parseManifest(rootfile[keys[i]]),
        'spine': this.parseSpine(rootfile[keys[i]]),
        'guide': this.parseGuide(rootfile[keys[i]])
      }
      route[key]
    }
    if (this.spine.toc) this.parseTOC();
    return;
  },

  /*
    EpubReader.parseMetadata(metadata) => undefined
  
    Parse "metadata" block (book metadata, title, author etc.)
  */
  parseMetadata(metadata) {
    const keys = Object.keys(metadata);
    for (let i = 0; i < keys.length; i++) {
      const keyparts = keys[i].split(":");
      const key = (keyparts.pop() || "").toLowerCase().trim();
      switch (key) {
        case "publisher":
          if (Array.isArray(metadata[keys[i]])) {
            this.metadata.publisher = String(metadata[keys[i]][0] && metadata[keys[i]][0]["#"] || metadata[keys[i]][0] || "").trim();
          } else {
            this.metadata.publisher = String(metadata[keys[i]]["#"] || metadata[keys[i]] || "").trim();
          }
          break;
        case "language":
          if (Array.isArray(metadata[keys[i]])) {
            this.metadata.language = String(metadata[keys[i]][0] && metadata[keys[i]][0]["#"] || metadata[keys[i]][0] || "").toLowerCase().trim();
          } else {
            this.metadata.language = String(metadata[keys[i]]["#"] || metadata[keys[i]] || "").toLowerCase().trim();
          }
          break;
        case "title":
          if (Array.isArray(metadata[keys[i]])) {
            this.metadata.title = String(metadata[keys[i]][0] && metadata[keys[i]][0]["#"] || metadata[keys[i]][0] || "").trim();
          } else {
            this.metadata.title = String(metadata[keys[i]]["#"] || metadata[keys[i]] || "").trim();
          }
          break;
        case "subject":
          if (Array.isArray(metadata[keys[i]])) {
            this.metadata.subject = String(metadata[keys[i]][0] && metadata[keys[i]][0]["#"] || metadata[keys[i]][0] || "").trim();
          } else {
            this.metadata.subject = String(metadata[keys[i]]["#"] || metadata[keys[i]] || "").trim();
          }
          break;
        case "description":
          if (Array.isArray(metadata[keys[i]])) {
            this.metadata.description = String(metadata[keys[i]][0] && metadata[keys[i]][0]["#"] || metadata[keys[i]][0] || "").trim();
          } else {
            this.metadata.description = String(metadata[keys[i]]["#"] || metadata[keys[i]] || "").trim();
          }
          break;
        case "creator":
          if (Array.isArray(metadata[keys[i]])) {
            this.metadata.creator = String(metadata[keys[i]][0] && metadata[keys[i]][0]["#"] || metadata[keys[i]][0] || "").trim();
            this.metadata.creatorFileAs = String(metadata[keys[i]][0] && metadata[keys[i]][0]['@'] && metadata[keys[i]][0]['@']["opf:file-as"] || this.metadata.creator).trim();
          } else {
            this.metadata.creator = String(metadata[keys[i]]["#"] || metadata[keys[i]] || "").trim();
            this.metadata.creatorFileAs = String(metadata[keys[i]]['@'] && metadata[keys[i]]['@']["opf:file-as"] || this.metadata.creator).trim();
          }
          break;
        case "date":
          if (Array.isArray(metadata[keys[i]])) {
            this.metadata.date = String(metadata[keys[i]][0] && metadata[keys[i]][0]["#"] || metadata[keys[i]][0] || "").trim();
          } else {
            this.metadata.date = String(metadata[keys[i]]["#"] || metadata[keys[i]] || "").trim();
          }
          break;
        case "identifier":
          if (metadata[keys[i]]["@"] && metadata[keys[i]]["@"]["opf:scheme"] == "ISBN") {
            this.metadata.ISBN = String(metadata[keys[i]]["#"] || "").trim();
          } else if (metadata[keys[i]]["@"] && metadata[keys[i]]["@"].id && metadata[keys[i]]["@"].id.match(/uuid/i)) {
            this.metadata.UUID = String(metadata[keys[i]]["#"] || "").replace('urn:uuid:', '').toUpperCase().trim();
          } else if (Array.isArray(metadata[keys[i]])) {
            for (let j = 0; j < metadata[keys[i]].length; j++) {
              if (metadata[keys[i]][j]["@"]) {
                if (metadata[keys[i]][j]["@"]["opf:scheme"] == "ISBN") {
                  this.metadata.ISBN = String(metadata[keys[i]][j]["#"] || "").trim();
                } else if (metadata[keys[i]][j]["@"].id && metadata[keys[i]][j]["@"].id.match(/uuid/i)) {
                  this.metadata.UUID = String(metadata[keys[i]][j]["#"] || "").replace('urn:uuid:', '').toUpperCase().trim();
                }
              }
            }
          }
          break;
      }
    }

    const metas = this.metadata['meta'] || {};
    Object.keys(metas).forEach(function (key) {
      const meta = metas[key];
      if (meta['@'] && meta['@'].name) {
        let name = meta['@'].name;
        this.metadata[name] = meta['@'].content;
      }
      if (meta['#'] && meta['@'].property) {
        this.metadata[meta['@'].property] = meta['#'];
      }
      if (meta.name && meta.name == "cover") {
        this.metadata[meta.name] = meta.content;
      }
    })
  },

  /*
    EpubReader.parseManifest(manifest) => undefined
  
    Parse "manifest" block (all items included, html files, images, styles)
  
  */


  parseManifest(manifest) {
    let path = this.rootFile.split("/");
    path.pop();
    const path_str = path.join("/");
    let element;
    if (manifest.item) {
      for (let i = 0; i < manifest.item.length; i++) {
        if (manifest.item[i]['@']) {
          element = manifest.item[i]['@'];

          if (element.href && element.href.substr(0, path_str.length) != path_str) {
            element.href = path.concat([element.href]).join("/");
          }

          this.manifest[manifest.item[i]['@'].id] = element;

        }
      }
    }
  },

  /*

  EpubReader.parseGuide(guide) => undefined

  Parse "guide" block (locations of the fundamental structural components of the publication)

  */


  parseGuide(guide) {
    let path = this.rootFile.split("/")
    path.pop();
    const path_str = path.join("/");

    if (guide.reference) {
      if (!Array.isArray(guide.reference)) {
        guide.reference = [guide.reference];
      }

      for (let i = 0; i < guide.reference.length; i++) {
        if (guide.reference[i]['@']) {

          let element = guide.reference[i]['@'];

          if (element.href && element.href.substr(0, path_str.length) != path_str) {
            element.href = path.concat([element.href]).join("/");
          }

          this.guide.push(element);


        }
      }
    }
  },

  /*

EpubReader.parseSpine(spine) => undefined

Parse "spine" block (all html elements that are shown to the reader)
 
*/

  parseSpine(spine) {
    let path = this.rootFile.split("/");
    let element;
    path.pop();

    if (spine['@'] && spine['@'].toc) {
      this.spine.toc = this.manifest[spine['@'].toc] || false;
    }

    if (spine.itemref) {
      if (!Array.isArray(spine.itemref)) {
        spine.itemref = [spine.itemref];
      }
      for (let i = 0; i < spine.itemref.length; i++) {
        if (spine.itemref[i]['@']) {
          if (element = this.manifest[spine.itemref[i]['@'].idref]) {
            this.spine.contents.push(element);
          }
        }
      }
    }
    this.flow = this.spine.contents;
  },
  /*

EpubReader.parseTOC() => undefined

 parse ncx file for table of contents (title, html file)

 run walkNavMap
 
*/

  parseTOC() {
    let path = this.spine.toc.href.split("/")
    path.pop()
    let id_list = {};
    let keys = Object.keys(this.manifest);
    for (let i = 0; i < keys.length; i++) {
      id_list[this.manifest[keys[i]].href] = keys[i];
    }

    let xml = this.zip.readFile(this.spine.toc.href).toString("utf-8")

    this.xmlparser.parseString(xml, (err, data) => {
      if (err) throw new Error("Parsing container XML failed in handleRootFile: " + err.message);


      if (data.navMap && data.navMap.navPoint) {
        this.toc = this.walkNavMap(data.navMap.navPoint, path, id_list);
      }
    })

  },

  /*

EpubReader.walkNavMap(branch, path, id_list,[, level]) => Array
- branch (Array | Object): NCX NavPoint object
- path (Array): Base path
- id_list (Object): map of file paths and id values
- level (Number): deepness
 
 Walks the NavMap object through all levels and finds elements
 for TOC
 
*/

  walkNavMap(branch, path, id_list, level) {
    level = level || 0;

    // don't go too far
    if (level > 7) {
      return [];
    }

    let output = [];

    if (!Array.isArray(branch)) {
      branch = [branch];
    }

    for (let i = 0; i < branch.length; i++) {
      if (branch[i].navLabel) {

        let title = '';
        if (branch[i].navLabel && typeof branch[i].navLabel.text == 'string') {
          title = branch[i].navLabel && branch[i].navLabel.text || branch[i].navLabel === branch[i].navLabel && branch[i].navLabel.text.length > 0 ?
            (branch[i].navLabel && branch[i].navLabel.text || branch[i].navLabel || "").trim() : '';
        }
        let order = Number(branch[i]["@"] && branch[i]["@"].playOrder || 0);
        if (isNaN(order)) {
          order = 0;
        }
        let href = '';
        if (branch[i].content && branch[i].content["@"] && typeof branch[i].content["@"].src == 'string') {
          href = branch[i].content["@"].src.trim();
        }

        let element = {
          level: level,
          order: order,
          title: title
        };

        if (href) {
          href = path.concat([href]).join("/");
          element.href = href;

          if (id_list[element.href]) {
            // link existing object
            element = this.manifest[id_list[element.href]];
            element.title = title;
            element.order = order;
            element.level = level;
          } else {
            // use new one
            element.href = href;
            element.id = (branch[i]["@"] && branch[i]["@"].id || "").trim();
          }

          output.push(element);
        }
      }
      if (branch[i].navPoint) {
        output = output.concat(this.walkNavMap(branch[i].navPoint, path, id_list, level + 1));
      }
    }
    return output;
  },


  /*

EpubReader.getChapter(id, callback) => undefined
  - id (String): Manifest id value for a chapter
  - callback (Function): callback function
 
  Finds a chapter text for an id. Replaces image and link URL's, removes
  <head> etc. elements. Return only chapters with mime type application/xhtml+xml
 
*/

  getChapter(id, callback) {
    this.getChapterRaw(id, (function (err, str) {
      if (err) {
        callback(err);
        return;
      }

      let path = this.rootFile.split("/")
      path.pop();
      let keys = Object.keys(this.manifest);
      // remove linebreaks (no multi line matches in JS regex!)
      str = str.replace(/\r?\n/g, "\u0000");

      // keep only <body> contents
      str.replace(/<body[^>]*?>(.*)<\/body[^>]*?>/i, function (o, d) {
        str = d.trim();
      });

      // remove <script> blocks if any
      str = str.replace(/<script[^>]*?>(.*?)<\/script[^>]*?>/ig, function (o, s) {
        return "";
      });

      // remove <style> blocks if any
      str = str.replace(/<style[^>]*?>(.*?)<\/style[^>]*?>/ig, function (o, s) {
        return "";
      });

      // remove onEvent handlers
      str = str.replace(/(\s)(on\w+)(\s*=\s*["']?[^"'\s>]*?["'\s>])/g, function (o, a, b, c) {
        return a + "skip-" + b + c;
      });

      str = str.replace(/<image.+?\/>/g, (o, a, b, c) => {
        console.log(o);
        let href;
        for (let i = 0; i < keys.length; i++) {
          EpubReader.getImage(this.manifest[keys[i]].id, (error, buffer) => {

            const imgFile = Buffer.from(buffer).toString('base64');

            href = `data:${this.manifest[keys[i]]['media-type']};base64,${imgFile}`
          })
          break;
        }
        // set images size
        return `<image width="120" height="200" href=${href}`
      })
      // replace images
      str = str.replace(/(\ssrc\s*=\s*["']?)([^"'\s>]*?)(["'\s>])/g, (function (o, a, b, c) {

        let img;
        for (let i = 0; i < keys.length; i++) {
          if (this.manifest[keys[i]].href.split('/').pop() === b.split('/').pop()) {
            EpubReader.getImage(this.manifest[keys[i]].id, (error, buffer) => {

              const imgFile = Buffer.from(buffer).toString('base64');

              img = `data:${this.manifest[keys[i]]['media-type']};base64,${imgFile}`
            })
            break;
          }
        }
        return a + img + c + " width='500'";




      }).bind(this));
      // replace links
      str = str.replace(/(\shref\s*=\s*["']?)([^"'\s>]*?)(["'\s>])/g, (function (o, a, b, c) {
        let linkparts = b && b.split("#");

        let link = linkparts.length ? path.concat([(linkparts.shift() || "")]).join("/").trim() : '',
          element;

        for (let i = 0; i < keys.length; i++) {
          if (this.manifest[keys[i]].href.split("#")[0] == link) {
            element = this.manifest[keys[i]];
            break;
          }
        }

        if (linkparts.length) {
          link += "#" + linkparts.join("#");
        }

        // include only images from manifest
        if (element) {
          return a + this.linkroot + element.id + "/" + link + c;
        } else {
          return a + '#' + b + c;
        }

      }).bind(this));

      // bring back linebreaks
      str = str.replace(/\u0000/g, "\n").trim();

      callback(null, str);
    }).bind(this));
  },

  /*

EpubReader.getChapterRaw(id, callback) => undefined
 - id (String): Manifest id value for a chapter
- callback (Function): callback function
 
 Returns the raw chapter text for an id.
 
*/

  getChapterRaw(id, callback) {
    if (this.manifest[id]) {
      if (!(this.manifest[id]['media-type'] == "application/xhtml+xml" || this.manifest[id]['media-type'] == "image/svg+xml")) {
        return callback(new Error("Invalid mime type for chapter"));
      }

      let data = this.zip.readFile(this.manifest[id].href)
      if (data) {

        callback(null, data.toString('utf-8'));

      }




    } else {
      callback(new Error("File not found"));
    }
  },

  /*
  EpubReader.getImage(id, callback) => undefined
    - id (String): Manifest id value for an image
    - callback (Function): callback function
  
    Finds an image for an id. Returns the image as Buffer. Callback gets
    an error object, image buffer and image content-type.
    Return only images with mime type image
   
    */

  getImage(id, callback) {
    if (this.manifest[id]) {

      if ((this.manifest[id]['media-type'] || "").toLowerCase().trim().substr(0, 6) != "image/") {
        return callback(new Error("Invalid mime type for image"));
      }

      this.getFile(id, callback);
    } else {
      callback(new Error("File not found"));
    }
  },

  /*
 EpubReader.getFile(id, callback) => undefined
   - id (String): Manifest id value for a file
   - callback (Function): callback function
 
   Finds a file for an id. Returns the file as Buffer. Callback gets
   an error object, file contents buffer and file content-type.
  
   */
  getFile(id, callback) {
    if (this.manifest[id]) {
      let data = this.zip.readFile(this.manifest[id].href)

      callback(null, data, this.manifest[id]['media-type']);

    } else {
      callback(new Error("File not found"));
    }
  },

  readFile(filename, options, callback_) {
    let callback = arguments[arguments.length - 1];

    if (typeof options === 'function' || !options) {
      this.zip.readFile(filename, callback);
    } else if (typeof options === 'string') {
      // options is an encoding
      this.zip.readFile(filename, function (err, data) {
        if (err) {
          callback(new Error('Reading archive failed'));
          return;
        }
        callback(null, data.toString(options));
      });
    } else {
      throw new TypeError('Bad arguments');
    }
  },


  /*
 EpubReader.hasDRM() => boolean
 
   Parses the tree to see if there's an ecnryption file, signifying the presence of DRM
   see: https://stackoverflow.com/questions/14442968/how-to-check-if-an-epub-file-is-drm-protected
   about epub-drm:https://wiki.mobileread.com/wiki/DRM#ePub_DRM
  
   */
  hasDRM() {
    const drmFile = 'META-INF/encryption.xml';
    return this.zip.names.includes(drmFile);
  }
})


