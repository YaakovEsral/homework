(function () {
    'use strict';

    //utility function to get elements by ID
    function get(id) {
        return document.getElementById(id);
    }

    //save the table into a variable
    const contactsTable = get('contacts');

    //array to store the contacts
    let contacts = [];

    //upon clicking, cause the form to appear
    get('add').addEventListener('click', () => {
        get('contactForm').style.display = 'block';
    });

    //save the input fields into variables
    const firstInput = get('first');
    const lastInput = get('last');
    const emailInput = get('email');
    const phoneInput = get('phone');


    //used when form is submitted or canceled
    function clearAndHideForm() {
        get('contactForm').style.display = 'none';
        get('contactForm').reset();
    }

    //event listener for submission of the form
    get('contactForm').addEventListener('submit', e => {
        e.preventDefault();

        //if this is the first contact, remove the placeholder row
        if (!contacts.length) {
            contactsTable.deleteRow(1);
        }

        //create new contact object based on the user inputs
        const newContact = {
            first: firstInput.value,
            last: lastInput.value,
            email: emailInput.value,
            phone: phoneInput.value
        };

        //add to contacts array
        contacts.push(newContact);

        //create a new row and cells for the new contact
        const newRow = contactsTable.insertRow();
        const firstCell = newRow.insertCell();
        const lastCell = newRow.insertCell();
        const emailCell = newRow.insertCell();
        const phoneCell = newRow.insertCell();
        const deleteCell = newRow.insertCell();

        //put the data and delete button into the cells
        firstCell.innerHTML = newContact.first;
        lastCell.innerHTML = newContact.last;
        emailCell.innerHTML = newContact.email;
        phoneCell.innerHTML = newContact.phone;
        generateDeleteButton(newRow, deleteCell);

        //remove the contact form from display
        clearAndHideForm();
    });

    //creating the delete button for the new row
    function generateDeleteButton(row, containerCell) {
        //create new button and save into variable
        const deleteButton = document.createElement('button');
        deleteButton.innerHTML = 'Delete Contact';

        //button style
        deleteButton.style.fontSize = '20px';
        containerCell.style.textAlign = 'center';

        //event listener. we have been provided with the row already
        deleteButton.addEventListener('click', () => {
            contactsTable.deleteRow(row.rowIndex);
            console.log(row.rowIndex);
        });

        //add the delete button to the page
        containerCell.appendChild(deleteButton);
    }

    //event listener for cancellation of the form
    get('cancel').addEventListener('click', () =>{
        clearAndHideForm();
    });
}());