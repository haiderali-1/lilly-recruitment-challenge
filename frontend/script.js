document.addEventListener("DOMContentLoaded", function() {
    fetchMedicines();
    addMedicine();
    updateMedicine();
    deleteMedicine();
    filterMedicine();
    fetchAvg();
});

//Fetch and display all medicines
const fetchMedicines = async () => {
    try{
    const response = await fetch('http://localhost:8000/medicines'); //Fetch medicines from API
    if(!response.ok){
        throw new Error('Unable to fetch medicines'); //Error handler, typically executes when backend isnt running
    }
    const data = await response.json();  //Parse JSON response
    const list = document.getElementById('medicine-list'); //Access to medicine-list
    list.innerHTML = ''; //Clear any existing lists
    
    if (data.medicines && data.medicines.length > 0) { //Check for medicines
    const validate = data.medicines.filter(med => med.name); //Makes sure medicines have a name
    validate.forEach(med => {
        const populate = document.createElement('div'); //Create container for each medicine
        populate.classList.add('medicine'); //Styling
        
        const header = document.createElement('h3'); //Header for medicine name
        header.textContent = med.name; //Set name

        const price = document.createElement('p'); //Paragraph for price
        if (med.price == null){ //If unable to find a price
            price.textContent = `N/A`; //Set as null
        } else {
            price.textContent = `Price: £${med.price}`; //Else set it as the price
        }
        
        list.appendChild(populate); //Addition of container to list
        populate.appendChild(header); //Add name to container
        populate.appendChild(price); //Add price to container
     });
    } 
} catch (error) {
    console.error('An error has occurred when fetching medicines:', error); //Connsole log of errors
    document.getElementById('error-message').innerText = 'Error loading medicines.'; //Display error msg
}
};

//Adding a new medicine
const addMedicine = async () => {
    const addform = document.getElementById('addform'); //Access addform element
    addform.addEventListener('submit', async (event) => { //Event listener for submission
        event.preventDefault(); //Prevents default submission

        const name = document.getElementById('medname').value; //Get the medicine name (user input)
        const price = parseFloat(document.getElementById('medprice').value); //Get the price (user input)
        console.log('Submitting: ', name, price); //Console log for submission

        if (!name || isNaN(price)) { //Validate inputs
            document.getElementById('message').innerText = 'Please enter valid details.';s //Error msg for if inputs are invalid
            return;
        }
        try {
            const response = await fetch('http://localhost:8000/create', { //Sending a POST request in order to add the medicine
            method: 'POST',
            body: new URLSearchParams({ name: name, price: price }) //Using the name and price as form data
    });
    if(!response.ok){
        throw new Error('Unable to create medicine'); //Error handler
    }
    const data = await response.json(); //Parse the JSON response
    document.getElementById('message').innerText = data.message; //Display message
    setTimeout(function(){
        document.getElementById('message').innerText = '';}, 3000); //Display message dissappears after 3 seconds
    fetchMedicines(); //Refresh list

    const addformid = document.getElementById('add-form'); //Get add-form element
    addformid.reset(); //Reset the form fields
} catch (error) {
    console.error('Error adding medicine:', error); //Console log of errors
    document.getElementById('message').innerText = 'Error adding medicine.'; //Display error msg
        }
    });
};


//Updating existing medicine
const updateMedicine = async () => {
    const updateform = document.getElementById('updateform'); //Access updateform element
    updateform.addEventListener('submit', async (event) => { //Event listener for submission
        event.preventDefault(); //Prevents default submission

        const name = document.getElementById('updatename').value; //Get medicine name input
        const price = parseFloat(document.getElementById('updateprice').value); //Get medicine price input
        console.log('Updating: ', name, price); //Console log for update

        if (!name || isNaN(price)) { //Validating inputs
            document.getElementById('message-update').innerText = 'Please enter valid details.'; //Error msg
            return;
        }
        try {
            const response = await fetch ('http://localhost:8000/update', { //Sending a POST request to update the medicine
            method: 'POST',
            body: new URLSearchParams({ name: name, price: price }) //Using the name and price as form data
    });
    if(!response.ok){ //Error handler
        throw new Error('Unable to update medicine');
    }
    const data = await response.json(); //Parse the JSON response
    document.getElementById('message-update').innerText = data.message; //Display message
    setTimeout(function(){
        document.getElementById('message-update').innerText = '';}, 3000); //Display message dissappears after 3 seconds
    fetchMedicines(); //Refresh list

    const updateformid = document.getElementById('update-form'); //Get update-form element
    updateformid.reset(); //Reset form fields
} catch(error) {
    console.error('Error updating medicine:', error); //Console log of errors
    document.getElementById('message-update').innerText = 'Error updating medicine.'; //Display error msg
        }
    });
};

//Fetch average price of medicines
const fetchAvg = async () => {
    const buttonpress = document.getElementById('average-price'); //Button to fetch average price
    
    buttonpress.addEventListener('click', async (event) => { //Event listener for button press
        event.preventDefault(); //Prevents default behaviour
        
        try {
            const response = await fetch('http://localhost:8000/average'); //Fetch average price from API
            if (!response.ok) { //Error handler
                throw new Error('Unable to fetch average price');
            }
            const data = await response.json(); //Parse the JSON reponse
            document.getElementById('message-average').innerText = `Average Price: £${data.average}`; //Display average price
        } catch (error) {
            console.error('Error fetching average price:', error); //Console log of errors
            document.getElementById('message-average').innerText = 'Error fetching average price'; //Display error msg
        }
    });
};

//Delete a medicine
const deleteMedicine = async () => {
    const deleteform = document.getElementById('deleteform'); //Access deleteform element
    const confirmcheck = document.getElementById('confirmcheck'); //Access confirmation checkbox
    const submitbutton = document.getElementById('submitbutton'); //Access delete button

    confirmcheck.addEventListener('change', () =>{ //Change submit button from disabled to enabled when the checkbox is ticked
        submitbutton.disabled = false;
    });

    deleteform.addEventListener('submit', async (event) => { //Event listener for submission
        event.preventDefault(); //Prevents default submission

        const name = document.getElementById('delname').value; //Gets the medicine name input
        console.log('Deleting: ', name); //Console log for deleting

        if (!name) { //Validate the input
            document.getElementById('message-delete').innerText = 'Please enter a valid name.'; //Error msg
            return;
        }  try {
            const response = await fetch('http://localhost:8000/delete', { //Send DELETE request
            method: 'DELETE',
            body: new URLSearchParams({ name: name }) //Use the name as form data
    });
    if(!response.ok){ //Error handler
        throw new Error('Unable to delete medicine');
    }
    const data = await response.json(); //Parse JSON response
    document.getElementById('message-delete').innerText = data.message; //Display message
    setTimeout(function(){
        document.getElementById('message-delete').innerText = '';}, 3000); //Display message dissappears after 3 seconds
    fetchMedicines(); //Refresh list

    const deleteformid = document.getElementById('delete-form'); //Get delete-form element
    deleteformid.reset(); //Reset delete form
    submitbutton.disabled = true; //Disable the submission button again
} catch (error) {
    console.error('Error adding medicine:', error); //Console log of errors
    document.getElementById('message-delete').innerText = 'Error adding medicine.'; //Display error msg
        }
    });
};

//Filter medicines by price
const filterMedicine = async () => {
const filterform = document.getElementById('filterform'); //Access filterform element
filterform.addEventListener('submit', async(event) => { //Event listener for submission
    event.preventDefault(); //Prevents default submission

    const minprice = parseFloat(document.getElementById('minprice').value); //Gets the minimum price (user input)
    const maxprice = parseFloat(document.getElementById('maxprice').value); //Gets the maximum price (user input)

    if(isNaN(minprice) && isNaN(maxprice)){ //Check for invalid inputs
        document.getElementById('message-filter').innerText = 'Please enter valid numbers.'; //Display error message
        setTimeout(() => { document.getElementById('message-filter').innerText = ''; }, 3000); //Error message goes after 3 seconds
        return;
    }

    try {
        const response = await fetch('http://localhost:8000/medicines'); //Fetch medicines from API
        if(!response.ok){ //Error handler
            throw new Error('Unable to fetch medicines');
        }
        const data = await response.json(); //Parse JSON response
        const list = document.getElementById('medicine-list'); //Access medicine list
        list.innerHTML = ''; //Clear current list

        const filter = data.medicines.filter(medicine => { //Filter medicines based on user price range
            const price = parseFloat(medicine.price); //Parse price of each medicine
            if (!medicine.name) return false; //Skip medicine if no name
            if(!isNaN(minprice) && price < minprice) return false; //Exclude those below min price
            if(!isNaN(maxprice) && price > maxprice) return false; //Exclude those above max price
            return true;
        });

        if(filter.length > 0){
            filter.forEach(med => { //If the fit requirements, display them
                const populate = document.createElement('div'); //Container
                populate.classList.add('medicine'); //Styling
        
                const header = document.createElement('h3'); //Header
                header.textContent = med.name; //Set name

                const price = document.createElement('p'); //Paragraph
                if (med.price == null){
                    price.textContent = `N/A`; //If price null set it to N/A
                } else {
                    price.textContent = `Price: £${med.price}`; //Else set to its price
                }
                list.appendChild(populate); //Container to list
                populate.appendChild(header); //Add name
                populate.appendChild(price); //Add price
            });
        } else {
            list.innerHTML = "No Medicines Found" //If no medicines fit criteria return this
        }
    } catch(error){
        console.error('An error has occurred when filtering medicines:', error); //Console log of error
        document.getElementById('message-filter').innerText = 'Error filtering medicines.'; //Display error message
    }
});

filterform.addEventListener('reset', async(event) => { //Event listener for reset button
    event.preventDefault(); //Prevent default behaviour
    document.getElementById('minprice').value = ''; //Clear min input value
    document.getElementById('maxprice').value = ''; //Clear max input value

    fetchMedicines(); //Fetch and display full list
});
};