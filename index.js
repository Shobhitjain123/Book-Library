let booksData;
let books;

let searchBar = document.querySelector('.search-bar')
let titleSort = document.getElementById("titleSort");
let dateSort = document.getElementById("dateSort");
let library = document.querySelector("#library");
function createBookCard({
  titleTxt,
  authorTxt,
  publisherTxt,
  pubDateTxt,
  img,
  infoLink,
}) {

    console.log('Control createBookCrad Func pe aaya');
    

  // Creating Book Card Element
  const bookCard = document.createElement("div");
  bookCard.classList.add("book-card");

  // Creating Thumbnail element
  const thumbnail = document.createElement("div");
  thumbnail.classList.add("thumbnail");

  // Creating Thumbnail Image Element
  const thumbnailImg = document.createElement("img");
  thumbnailImg.classList.add("thumbnailImg");
  thumbnailImg.setAttribute("src", img);

  // Appending Thumbnail Image to Thumbnail Div
  thumbnail.appendChild(thumbnailImg);

  // Creating Book Details Element
  const bookDetails = document.createElement("div");
  bookDetails.classList.add("book-details");

  // Creating Title Element
  const title = document.createElement("p");
  title.classList.add("title", "details");
  title.textContent = `Title: ${titleTxt}`;

  // Creating Author Element
  const author = document.createElement("p");
  author.classList.add("author", "details");
  author.textContent = `Authors: ${authorTxt}`;

  // Creating Publisher eleement
  const publisher = document.createElement("p");
  publisher.classList.add("publisher", "details");
  publisher.textContent = `Published By: ${publisherTxt}`;

  // Creating Publish Date Elemebt
  const pubDate = document.createElement("p");
  pubDate.classList.add("pubDate", "details");
  pubDate.textContent = `Published On: ${pubDateTxt}`;

  // Creating Show More Text Element
  const showMore = document.createElement("a");
  showMore.classList.add("txtShowMore", "details");
  showMore.setAttribute("href", infoLink);
  showMore.textContent = "Show More...";

  // Appending All Elements to Book Details Div
  bookDetails.appendChild(title);
  bookDetails.appendChild(author);
  bookDetails.appendChild(publisher);
  bookDetails.appendChild(pubDate);
  bookDetails.appendChild(showMore);

  // Appending Thumbnail and BookDetails to Book Card
  bookCard.appendChild(thumbnail);
  bookCard.appendChild(bookDetails);

  // Finally Appending Book Card to Library
  library.appendChild(bookCard);
}

async function fetchBooks() {
    console.log('control fetch books func pe aaya');
    
  booksData = await fetch(
    "https://api.freeapi.app/api/v1/public/books?page=1&limit=20"
  );
  books = await booksData.json();
  console.log("Fetched Books", books);

  createLibrary(books.data.data);
  titleSort.addEventListener("click", sortByTitle);
  dateSort.addEventListener("click", sortByDate);
  searchBar.addEventListener('input', filterSearch)
}

function createLibrary(books) {
    console.log('control createLibrary func pe aaya');
    
  books.forEach((book) => {
    createBookCard({
      titleTxt: book.volumeInfo.title,
      authorTxt: book.volumeInfo.authors,
      publisherTxt: book.volumeInfo.publisher,
      pubDateTxt: book.volumeInfo.publishedDate,
      img: book.volumeInfo.imageLinks.thumbnail,
      infoLink: book.volumeInfo.infoLink,
    });
  });
}

function switchView(view) {
    console.log('Control Switch func pe aaya');
    
  const listLibrary = document.querySelector("#library");
  if (view == "list") {
    listLibrary.classList.replace("library", "libraryListView");
    const bookCard = document.querySelectorAll(".book-card");
    bookCard.forEach((bookCard) => {
      bookCard.classList.replace("book-card", "bookCardListView");
    });
    const thumbnail = document.querySelectorAll(".thumbnail");
    thumbnail.forEach((thumbnail) => {
      thumbnail.classList.replace("thumbnail", "thumbnailListView");
    });
  } else {
    listLibrary.classList.replace("libraryListView", "library");
    const bookCard = document.querySelectorAll(".bookCardListView");
    bookCard.forEach((bookCard) => {
      bookCard.classList.replace("bookCardListView", "book-card");
    });
    const thumbnail = document.querySelectorAll(".thumbnailListView");
    thumbnail.forEach((thumbnail) => {
      thumbnail.classList.replace("thumbnailListView", "thumbnail");
    });
  }

  console.log(library);
  
}

function sortByTitle() {
    console.log('control sortTitle func pe aaya');
  let sortedBookArray = [];
  const booksTitle = books.data.data.map((book) => book.volumeInfo.title);
  const sortedBooksTitle = booksTitle.toSorted();
  console.log(sortedBooksTitle);
  sortedBooksTitle.forEach((sortedBook) => {
    tSorted = books.data.data.find(
      (book) => book.volumeInfo.title == sortedBook
    );
    sortedBookArray.push(tSorted);
  });
  while (library.firstChild) {
    library.firstChild.remove();
  }
  createLibrary(sortedBookArray);
}

function sortByDate() {

    console.log('control sortDate func pe aaya');
    
  console.log(books.data.data);

  let sortedBookArray = [];
  const booksDate = books.data.data.map(
    (book) => book.volumeInfo.publishedDate
  );
    booksDate.sort((a, b) => {
      const dateA = new Date(a.length === 4 ? `${a}-01-01` : a);
      const dateB = new Date(b.length === 4 ? `${b}-01-01` : b);

      return dateA - dateB;
    }).forEach(sortedBook => {
      tSorted =  books.data.data.find(book => book.volumeInfo.publishedDate == sortedBook)
      sortedBookArray.push(tSorted)
  })
  console.log(library);
  
  while(library.firstChild){
      library.firstChild.remove()
  }
  createLibrary(sortedBookArray)
}

function filterSearch(e){
    const filterBooks = books.data.data.filter(book => book.volumeInfo.title.toLowerCase().includes(e.target.value.toLowerCase()))
    while(library.firstChild){
        library.firstChild.remove()
    }
    createLibrary(filterBooks)
}

fetchBooks();
