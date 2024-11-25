document.addEventListener("DOMContentLoaded", function() {
    fetchMedicines();
    addMedicine();
    updateMedicine();
    deleteMedicine();
    filterMedicine();
    fetchAvg();
});

const fetchMedicines = async () => {
    try{
    const response = await fetch('http://localhost:8000/medicines');
    if(!response.ok){
        throw new Error('Unable to fetch medicines');
    }
    const data = await response.json(); 
    const list = document.getElementById('medicine-list');
    list.innerHTML = '';
    
    if (data.medicines && data.medicines.length > 0) {
    const validate = data.medicines.filter(med => med.name);
    validate.forEach(med => {
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
    } 
} catch (error) {
    console.error('An error has occurred when fetching medicines:', error);
    document.getElementById('error-message').innerText = 'Error loading medicines.';
}
};


const addMedicine = async () => {
    const addform = document.getElementById('medform');
    addform.addEventListener('submit', async (event) => {
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
    if(!response.ok){
        throw new Error('Unable to create medicine');
    }
    const data = await response.json();
    document.getElementById('message').innerText = data.message;
    setTimeout(function(){
        document.getElementById('message').innerText = '';}, 3000);
    fetchMedicines();

    const medicineformid = document.getElementById('medicine-form');
    medicineformid.reset();
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
            document.getElementById('message-update').innerText = 'Please enter valid details.';
            return;
        }
        try {
            const response = await fetch ('http://localhost:8000/update', {
            method: 'POST',
            body: new URLSearchParams({ name: name, price: price })
    });
    if(!response.ok){
        throw new Error('Unable to update medicine');
    }
    const data = await response.json();
    document.getElementById('message-update').innerText = data.message;
    setTimeout(function(){
        document.getElementById('message-update').innerText = '';}, 3000);
    fetchMedicines();

    const updateformid = document.getElementById('update-form');
    updateformid.reset();
} catch(error) {
    console.error('Error updating medicine:', error);
    document.getElementById('message-update').innerText = 'Error updating medicine.';
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