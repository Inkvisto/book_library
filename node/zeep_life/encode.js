import fsp from 'fs/promises';
import {join} from 'path';
import { spawn } from 'child_process';
import { __dirname } from '../utils/path.js';
const password = 'XTJVfioN'


const zipPath = '7037389036_1676654692974.zip';

const unzip = () => {
  spawn('7z',['x',`-p${password}`,zipPath,'-odata/'])
};

//unzip()

const dirPath = join(__dirname(import.meta),'data/');

const getFileNames = async (dirPath) => await Promise.all(
  (await fsp.readdir(dirPath, {withFileTypes: true})).map(async (dirent) => {
    const path = join(dirPath, dirent.name)
    return dirent.isDirectory() ? await getFileNames(path) : path
  }),
)
const fileNames = (await getFileNames(dirPath)).flat();

/*fileNames.forEach((e,i) => {

})*/
export const categories = await fileNames.flatMap((e) =>e.split('/').slice(-2,-1));
//fileNames.filter((e) => e.includes(categories[2]))

export const getFitData = async({category,range}) => {
  const csv = await fsp.readFile(...fileNames.filter((e) => e.toLowerCase().includes('/'+category+'/')),'utf-8');
 
    const lines = csv.split('\n').filter(e => e)
    const result = []
    const headers = lines[0].split(',')

    lines.slice(0,range).map(l => {
        const obj = {}
        const line = l.split(',')

        headers.map((h, i) => {
            obj[h] = line[i]
        })

        result.push(obj)
    })
    return JSON.stringify(result)
}

