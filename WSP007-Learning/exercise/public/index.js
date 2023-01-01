/* for Json string content format
Change the selector to select your memo input form */
// document.querySelector('#memo-form')
// 		.addEventListener('submit', async (event)=>{
// 			event.preventDefault(); // To prevent the form from submitting synchronously
// 			const form = event.target;
			
//             //... create your form object with the form inputs
//             let formObject = {
//                 text: form.text.value
//             };
            
// 			const res = await fetch('/memos',{
// 				method:"POST",
// 				headers: {
// 						"Content-Type":"application/json",
//                 },
//                 body: JSON.stringify(formObject),
// 			});
//             // res.jon();

// 				// Clear the form here
//                 form.reset();
//         });


/* now this is include both content and && formData format */
document.querySelector('#memo-form')
		.addEventListener('submit', async (event)=>{
			event.preventDefault(); // To prevent the form from submitting synchronously
			const form = event.target;
            const formData = new FormData();

            formData.append('text', form.text.value);
            formData.append('image', form.image.files[0]);
			
    		const res = await fetch('/memos',{
				method:"POST",
				body: formData,
			});
            // res.json(res);

				// Clear the form here
                form.reset();
        });


/* Change the selector to select your memo input form */
        document.querySelector('#login-form')
        		.addEventListener('submit', async (event)=>{
        			event.preventDefault(); // To prevent the form from submitting synchronously
        			const form = event.target;
                    
                    //... create your form object with the form inputs
                    let formObject = {
                        username: form.username.value,
                        password: form.password.value,
                    };
                    
        			const res = await fetch('/login',{
        				method:"POST",
        				headers: {
        						"Content-Type":"application/json",
                        },
                        body: JSON.stringify(formObject),
        			});
                    // res.jon();
        
        				// Clear the form here
                        form.reset();
                });

async function loadMemos(){
    const res = await fetch('/memos') ; // Fetch from the correct url
    const memos = await res.json();

    console.log("memos", memos)

    // const memosContainer = document.querySelector('#memos');
    // for(let memo of memos){
    //     memosContainer.innerHTML += ` <div class="memo">
    //         ....
    //         </div>
    //         `
    // }
}

loadMemos()