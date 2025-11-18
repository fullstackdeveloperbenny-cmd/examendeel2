// Import our custom CSS
import '../scss/styles.scss'

// Import all of Bootstrap’s JS
import * as bootstrap from 'bootstrap'


// js/main.js

import User from './model/userModel.js';
import { createUserCard } from './Card/userCard.js';

// DOM-elementen ophalen
const nameInput = document.querySelector('#ex4_name');
const ageInput  = document.querySelector('#ex4_age');
const btn       = document.querySelector('#ex4_btn');
const statusBox = document.querySelector('#ex4_status');
const list      = document.querySelector('#ex4_list');

// Array om users te bewaren
const users = [];

btn.addEventListener('click', () => {
    const name = nameInput.value.trim();
    const age = Number(ageInput.value);

    // Validatie
    if (name === '') {
        alert('Naam mag niet leeg zijn.');
        return;
    }
    if (isNaN(age) || age <= 0) {
        alert('Leeftijd moet een positief getal zijn.');
        return;
    }

    // Nieuwe user aanmaken en opslaan
    const user = new User(name, age);
    users.push(user);

    // UI bijwerken
    updateList();
    updateStatus();

    // Velden leegmaken
    nameInput.value = '';
    ageInput.value = '';
});

function updateList() {
    list.innerHTML = users.map(u => createUserCard(u)).join('');
}

function updateStatus() {
    if (users.length === 0) {
        statusBox.className = 'alert alert-secondary';
        statusBox.textContent = 'Nog geen gebruikers toegevoegd.';
    } else {
        statusBox.className = 'alert alert-success';
        statusBox.textContent = `${users.length} gebruiker(s) toegevoegd.`;
    }
}
