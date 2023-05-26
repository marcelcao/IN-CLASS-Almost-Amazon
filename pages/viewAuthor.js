import clearDom from '../utils/clearDom';
import renderToDOM from '../utils/renderToDom';

const viewAuthor = (obj) => {
  clearDom();
  let domString = `
  <div class="text-white ms-5 details">
     ${obj.first_name} ${obj.last_name} ${obj.favorite ? '<span class="badge bg-danger"><i class="fa fa-heart" aria-hidden="true"></i></span>' : ''}</h5>
     Author Email: <a href="mailto:${obj.email}">${obj.email}</a>     
  </div>`;
  obj.booksArray.forEach((book) => {
    domString += `<div class="text-white ms-5 details">
      <h5 class="text-white">${book.title}  ${book.favorite ? '<span class="badge bg-danger"><i class="fa fa-heart" aria-hidden="true"></i></span>' : ''}</h5>
      <p>${book.description || ''}</p>
      <hr>
      <p>${book.sale ? `<span class="badge bg-info sale-badge"><i class="fa fa-bell" aria-hidden="true"></i> Sale</span>
        $${book.price}` : `$${book.price}`}</p>
      </div>
      <div class="d-flex flex-column">
        <img src=${book.image} alt=${book.title} style="width: 100px;">
        <div class="mt-5">
          <i id="edit-book-btn--${book.firebaseKey}" class="fas fa-edit btn btn-info"></i>
          <i id="delete-book--${book.firebaseKey}" class="btn btn-danger fas fa-trash-alt"></i>
        </div>
      </div>
      </div>`;
  });
  renderToDOM('#view', domString);
};

export default viewAuthor;
