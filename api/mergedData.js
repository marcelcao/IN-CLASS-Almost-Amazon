import { getAuthorBooks, getSingleAuthor } from './authorData';
import { getSingleBook } from './bookData';

// for merged promises - getting book details
const getBookDetails = (firebaseKey) => new Promise((resolve, reject) => {
  getSingleBook(firebaseKey).then((bookObject) => {
    getSingleAuthor(bookObject.author_id)
      .then((authorObject) => resolve({ ...bookObject, authorObject }));
  }).catch(reject);
});

export default getBookDetails;

// line 6 returns single book per its firebase key but also takes that book and then its calling for a promise object which is the bookObject
// line 7 - singleAuthor is nested in singlebook in order for us to be able to use the book object and dot notate the author id. the author id is the key value pair we can use in order to fitler through the book details
// line 8 = once line 7 is fulfilled, another promise takes place which is calling for another promise object, this time the author object. the resolution of that promise is to create a new object that has the author object, but also the different objects within the book objects (which makes up the details of the book) by using a spread syntax (...)

// another way to refactor:

// const getBookDetails = async (firebaseKey) => { // the async keyword let's JS know this is asynchronous function (promise)
//   const bookObject = await getSingleBook(firebaseKey); // await stops the code in this function and waits for the response. This is like using .then
//   const authorObject = await getSingleAuthor(bookObject.author_id); // this function uses the data response from the bookObject

//   return { ...bookObject, authorObject };
// };

// for merged promises - getting author details
const getAuthorDetails = (firebaseKey) => new Promise((resolve, reject) => {
  getSingleAuthor(firebaseKey).then((authorObject) => {
    getAuthorBooks(firebaseKey).then((booksArray) => resolve({ ...authorObject, booksArray }));
  }).catch(reject);
});

export {
  getBookDetails, getAuthorDetails
};

// translating the getAuthorDetails function:
// to get the authordetails, we need to call out our getsingle author function to get the specific author. the firebase key is the arguement that is passed because this is the key value that makes the author a specific author. then a promise object is passed called the author object which will contain all the key value pairs of the specific author called out.
// then a function is nested in that calling out the get author books function. the get author books function has a filter that takes the author id of the book and matching it with the same firebase key because the author id in books is the firebase key in authors.
// then authorbooks becomes a promise object which contains all the key value pairs from authorObject (spread operator) and all of the authors books per the object.values data call out on the getAuthorBooks function.
