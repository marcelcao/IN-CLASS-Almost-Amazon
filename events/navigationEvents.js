import { signOut } from '../utils/auth';
import { booksOnSale, getBooks } from '../api/bookData';
import { showBooks } from '../pages/books';
import { faveAuthors, getAuthors } from '../api/authorData';
import { showAuthors, emptyAuthors } from '../pages/authors';

// navigation events
const navigationEvents = (user) => {
  // LOGOUT BUTTON
  document.querySelector('#logout-button')
    .addEventListener('click', signOut);

  // BOOKS ON SALE
  document.querySelector('#sale-books').addEventListener('click', () => {
    booksOnSale(user.uid).then((books) => showBooks(books));
    console.warn('CLICKED SALE BOOKS');
  });

  // ALL BOOKS
  document.querySelector('#all-books').addEventListener('click', () => {
    getBooks(user.uid).then((books) => showBooks(books));
    // learning notes on line 18: getBooks is the promise function for the books data. books is passed like 'taco'. it's an identity function //
    // identity functions just returns what it receives //
    console.warn('CLICKED ALL BOOKS');
  });

  // Create an event listener for the Authors
  // 1. When a user clicks the authors link, make a call to firebase to get all authors
  // 2. Convert the response to an array because that is what the makeAuthors function is expecting
  // 3. If the array is empty because there are no authors, make sure to use the emptyAuthor function
  document.querySelector('#authors').addEventListener('click', () => {
    getAuthors(user.uid).then((authors) => {
      if (authors) {
        showAuthors(authors);
      } else {
        emptyAuthors();
      }
    });
    console.warn('CLICKED AUTHORS');
  });

  // FILTER FAVORITE AUTHORS
  document.querySelector('#faveAuthors').addEventListener('click', () => {
    faveAuthors(user.uid).then((authors) => showAuthors(authors));
    console.warn('CLICKED FAVE AUTHORS');
  });

  // STRETCH: SEARCH
  document.querySelector('#search').addEventListener('keyup', (e) => {
    const searchValue = document.querySelector('#search').value.toLowerCase();
    console.warn(searchValue);

    // WHEN THE USER PRESSES ENTER, MAKE THE API CALL AND CLEAR THE INPUT
    if (e.keyCode === 13) {
      // MAKE A CALL TO THE API TO FILTER ON THE BOOKS
      // IF THE SEARCH DOESN'T RETURN ANYTHING, SHOW THE EMPTY STORE
      // OTHERWISE SHOW THE STORE

      document.querySelector('#search').value = '';
    }
  });
};

export default navigationEvents;
