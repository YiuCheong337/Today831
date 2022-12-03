

console.log("index.js")

document.querySelector('#firstName')
        .addEventListener('change',(e)=>{
            console.log("change",e.target.value)
        })

document.querySelector('#firstName')
        .addEventListener('input',(e)=>{
            console.log("input",e.target.value)
        })