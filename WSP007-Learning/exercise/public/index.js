// Change the selector to select your memo input form
document
    .querySelector("#memo-form")
    .addEventListener("submit", async (event)=>{
		event.preventDefault(); // To prevent the form from submitting synchronously
			     
        const form = event.target;
		
        //... create your form object with the form inputs
        let formObject = {
            text: form.text.value,
        };
			     
		const res = await fetch('/memos', {
            method:"POST",
			headers:{
				"Content-Type":"application/json",
            },
            body: JSON.stringify(formObject),
		});

		// Clear the form here
        form.reset();
    });