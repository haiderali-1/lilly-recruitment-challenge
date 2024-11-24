document.addEventListener("DOMContentLoaded", function() {
    fetchMedicines();
    addMedicine();
    updateMedicine();
});

const fetchMedicines = async () => {
    try{
    const response = await fetch('http://localhost:8000/medicines');
    const data = await response.json();
    
    const list = document.getElementById('medicine-list');
    list.innerHTML = '';
    
    if (data.medicines && data.medicines.length > 0) {
    const validate = data.medicines.filter(med => med.name && med.price !== null);
    validate.forEach(med => {
        const populate = document.createElement('div');
        populate.classList.add('medicine');
        
        const header = document.createElement('h3');
        header.textContent = med.name;

        const price = document.createElement('p');
        price.textContent = `Price: £${med.price}`;
        
        list.appendChild(populate);
        populate.appendChild(header);
        populate.appendChild(price);
     });
    } 
} catch (error) {
    console.error('An error has occurred when fetching medicines:', error);
    document.getElementById('error-message').innerText = 'Error loading medicines.';
}
};


const addMedicine = async () => {
    const form = document.getElementById('medform');
    form.addEventListener('submit', async (event) => {
        event.preventDefault();

        const name = document.getElementById('medname').value;
        const price = parseFloat(document.getElementById('medprice').value);
        console.log('Submitting: ', name, price);

        if (!name || isNaN(price)) {
            document.getElementById('message').innerText = 'Please enter valid details.';
            return;
        }
        try {
            const response = await fetch('http://localhost:8000/create', {
            method: 'POST',
            body: new URLSearchParams({ name: name, price: price })
    });

    const data = await response.json();
    document.getElementById('message').innerText = data.message;
    fetchMedicines();
} catch (error) {
    console.error('Error adding medicine:', error);
    document.getElementById('message').innerText = 'Error adding medicine.'; 
        }
    });
};



const updateMedicine = async () => {
    const updateform = document.getElementById('updateform');
    updateform.addEventListener('submit', async (event) => {
        event.preventDefault();

        const name = document.getElementById('updatename').value;
        const price = parseFloat(document.getElementById('updateprice').value);
        console.log('Updating: ', name, price);

        if (!name || isNaN(price)) {
            document.getElementById('message').innerText = 'Please enter valid details.';
            return;
        }
        try {
            const response = await fetch ('http://localhost:8000/update', {
            method: 'POST',
            body: new URLSearchParams({ name: name, price: price })
    });

    const data = await response.json();
    document.getElementById('message-update').innerText = data.message;
    fetchMedicines();
} catch(error) {
    console.error('Error updating medicine:', error);
    document.getElementById('message-update').innerText = 'Error updating medicine.';
        }
    });
};