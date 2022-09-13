// function fibonacci(num: number): number {
//     if(num === 1 || num === 0) {
//         return 1;
//     }
//     return num * fibonacci(num - 1);
// }
// let y:number = fibonacci(10);
// if (y>10) {
//     console.log(y);
// }

import fs from 'fs';

// note below the else-if block to make it recursive and hence goes into sub-directory
//
async function listAllJs(path: string) {
    const result = await fs.promises.readdir(path);
    
    for(const item of result) {
        // 1. .js
        // 2. file type
        // https://nodejs.org/api/fs.html#fspromisesstatpath-options
        const fullPath = `${path}/${item}`
        const stat = await fs.promises.stat(fullPath)

        if(item.slice(item.length - 3) === ".js" && stat.isFile()) {
            console.log(fullPath+'\n')
        } else if(stat.isDirectory()){
            // isDirectory 
            // NOTE: this else if portion used only we want to also continue to dive-in sub-directory
            //       and hence must use recursive function
            // with this else if block implemented, it completed Ex-2 as well
            listAllJs(fullPath);
        }
    }
}

listAllJs("./jsFolder")