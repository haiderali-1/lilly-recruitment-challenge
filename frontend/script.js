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

const fetchAvg = async () => {
    const buttonpress = document.getElementById('average-price');
    
    buttonpress.addEventListener('click', async (event) => {
        event.preventDefault();
        
        try {
            const response = await fetch('http://localhost:8000/average');
            if (!response.ok) {
                throw new Error('Unable to fetch average price');
            }
            const data = await response.json();
            document.getElementById('message-average').innerText = `Average Price: £${data.average}`;
        } catch (error) {
            console.error('Error fetching average price:', error);
            document.getElementById('message-average').innerText = 'Error fetching average price';
        }
    });
};

const deleteMedicine = async () => {
    const deleteform = document.getElementById('deleteform');
    const confirmcheck = document.getElementById('confirmcheck');
    const submitbutton = document.getElementById('submitbutton');

    confirmcheck.addEventListener('change', () =>{
        submitbutton.disabled = false;
    });

    deleteform.addEventListener('submit', async (event) => {
        event.preventDefault();

        const name = document.getElementById('delname').value;
        console.log('Deleting: ', name);

        if (!name) {
            document.getElementById('message-delete').innerText = 'Please enter a valid name.';
            return;
        }  try {
            const response = await fetch('http://localhost:8000/delete', {
            method: 'DELETE',
            body: new URLSearchParams({ name: name })
    });
    if(!response.ok){
        throw new Error('Unable to delete medicine');
    }
    const data = await response.json();
    document.getElementById('message-delete').innerText = data.message;
    setTimeout(function(){
        document.getElementById('message-delete').innerText = '';}, 3000);
    fetchMedicines();

    const deleteformid = document.getElementById('delete-form');
    deleteformid.reset();
    submitbutton.disabled = true;
} catch (error) {
    console.error('Error adding medicine:', error);
    document.getElementById('message-delete').innerText = 'Error adding medicine.'; 
        }
    });
};

const filterMedicine = async () => {
const filterform = document.getElementById('filterform');
filterform.addEventListener('submit', async(event) => {
    event.preventDefault();

    const minprice = parseFloat(document.getElementById('minprice').value);
    const maxprice = parseFloat(document.getElementById('maxprice').value);

    if(isNaN(minprice) && isNaN(maxprice)){
        document.getElementById('message-filter').innerText = 'Please enter valid numbers.';
        setTimeout(() => { document.getElementById('message-filter').innerText = ''; }, 3000);
        return;
    }

    try {
        const response = await fetch('http://localhost:8000/medicines');
        if(!response.ok){
            throw new Error('Unable to fetch medicines');
        }
        const data = await response.json();
        const list = document.getElementById('medicine-list');
        list.innerHTML = '';

        const filter = data.medicines.filter(medicine => {
            const price = parseFloat(medicine.price);
            if (!medicine.name) return false;
            if(!isNaN(minprice) && price < minprice) return false;
            if(!isNaN(maxprice) && price > maxprice) return false;
            return true;
        });

        if(filter.length > 0){
            filter.forEach(med => {
                const populate = document.createElement('div');
                populate.classList.add('medicine');
        
                const header = document.createElement('h3');
                header.textContent = med.name;

                const price = document.createElement('p');
                if (med.price == null){
                    price.textContent = `N/A`;
                } else {
                    price.textContent = `Price: £${med.price}`;
                }
                list.appendChild(populate);
                populate.appendChild(header);
                populate.appendChild(price);
            });
        } else {
            list.innerHTML = "No Medicines Found"
        }
    } catch(error){
        console.error('An error has occurred when filtering medicines:', error);
        document.getElementById('message-filter').innerText = 'Error filtering medicines.';
    }
});

filterform.addEventListener('reset', async(event) => {
    event.preventDefault();
    document.getElementById('minprice').value = '';
    document.getElementById('maxprice').value = '';

    fetchMedicines();
});
};