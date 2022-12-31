

console.log("index.js")

document.querySelector('#firstName')
        .addEventListener('change',(e)=>{
            console.log("change",e.target.value)
        })

document.querySelector('#firstName')
        .addEventListener('input',(e)=>{
            console.log("input",e.target.value)
        })

async function getStudents(){
    const res = await fetch('/students')
    const students = await res.json()// Text -> object

    if(res.status === 500){
        // handle error
    }else{
        const studentList = document.querySelector('#student-list')
        studentList.innerHTML = ""
        for(const student of students){
            studentList.innerHTML += `
                <ul>
                    <li>First Name: ${student.firstName}</li>
                    <li>Last Name: ${student.lastName}</li>
                    <li>Email: ${student.email}</li>
                    <li>Age: ${student.age}</li>
                    <li>Description: ${student.description}</li>
                </ul>
            `
        }
    }
}

getStudents()

async function switchImage() {
    const myImage = document.querySelector('.my-image')
    const res = await fetch(
      'https://upload.wikimedia.org/wikipedia/commons/7/77/Delete_key1.jpg',
    )
    const result = await res.blob()
    const objectURL = URL.createObjectURL(result)
    myImage.src = objectURL
}





// const req = new XMLHttpRequest()
// req.addEventListener('load', function () {
//     console.log(this.responseText)
// })
// req.open('GET', '/students')
// req.send()

document.querySelector('#contact-form').addEventListener('submit',async (e)=>{
    e.preventDefault() // 截停咗個Form Submission
    const form = e.target

    const formObject = {
        firstName: form.firstName.value,
        lastName: form.lastName.value,
        email: form.email.value,
        age: form.age.value,
        description: form.description.value
    }
    await fetch('/students',{
        method:"POST",
        headers:{
            "Content-Type":"application/json"
        },
        body: JSON.stringify(formObject) // Serialization
    })
    form.reset()
    await getStudents()
})



document.querySelector('#contact-upload-form').addEventListener('submit',async (e)=>{
    e.preventDefault() // 截停咗個Form Submission
    const form = e.target

    const formData = new FormData()
    formData.append('firstName',form.firstName.value)
    formData.append('lastName',form.lastName.value)
    formData.append('email',form.email.value)
    formData.append('password',form.password.value)
    formData.append('profile', form.profile.files[0])

    await fetch('/students/upload',{
        method:"POST",
        body: formData
    })
    form.reset()
    await getStudents()
})


