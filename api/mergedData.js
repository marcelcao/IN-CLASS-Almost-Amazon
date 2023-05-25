import { getSingleAuthor } from './authorData';
import { getSingleBook } from './bookData';

// for merged promises
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
