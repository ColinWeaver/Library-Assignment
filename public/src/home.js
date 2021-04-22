//this function uses length property to return length of books array
const getTotalBooksCount = (books) => books.length;

//this function uses length property to return length of accounts array
const getTotalAccountsCount = (accounts) => accounts.length;


function getBooksBorrowedCount(books) {
  const newArray = books.filter((book) => book.borrows[0].returned === false);
  //the above line creates new array filtering for unreturned books 
  return newArray.length; //length of new unreturned books array
}

function getMostCommonGenres(books) {
  const newArray = [];
  for (let i = 0; i < books.length; i++) {
    for (let j = 0; j < newArray.length; j++) {
      if (newArray[j].name === books[i].genre) newArray[j].count += 1;
    }
    newArray.push({ name: books[i].genre, count: 1 });
  }
  /*above iteration loops through 'books' array and 'newArray' within that and adds object to 'newArray' each
  iteration of first for loop and inner loop is used so if newArray at any index has name matching book genre
  at current iteration it adds one to count key at that index of 'newArray'.
  */
  const newestArray = [];
  const genreKeyArray = [];
  for (let i = 0; i < newArray.length; i++) {
    if (!genreKeyArray.includes(newArray[i].name)) {
      newestArray.push(newArray[i]);
      genreKeyArray.push(newArray[i].name)
  }
}
/*above loops through 'newArray' and if 'genreKeyArray' doesn't already include the name value at 
current index of 'newArray' it adds the object from 'newArray' into 'newestArray' and the 'name' key's value from
'newArray' at same index into 'genreKeyArray'. This segment is to remove duplicates.
*/
  const sortedArray = newestArray.sort((first, second) =>
    first.count > second.count ? -1 : 1
  );
  //the above part sorts by 'count' value starting at highest
  const trimmedArray = trimArray(sortedArray, 5);
  return trimmedArray;
  //the above part trims the array to 5 or less items using helper function then returns
}


function getMostPopularBooks(books) {
  const newArray = books.map(
    (book) => (book = { name: book.title, count: book.borrows.length })
  );
  //above part uses map method to turn each book object into new object with 2 keys
  const sortedArray = newArray.sort((first, second) =>
    first.count > second.count ? -1 : 1 
  );
  //the above part sorts newArray from highest to lowest
  const trimmedArray = trimArray(sortedArray, 5);
  return trimmedArray;
  //above part trims array to 5 or less items using helper function then returns that array
}


function getMostPopularAuthors(books, authors) {
  const authorArray = [];
  const bookArrayCombo = [];
  for (let i = 0; i < authors.length; i++) {
    const book = books.find((book) => book.authorId === authors[i].id);
    if (book) {
      bookArrayCombo.push(book);
      authorArray.push(authors[i]);
    }
  }
  /*the above part uses a for loop through 'authors' array and find method within that applied
   to 'books' array to find book object from "books" array matching an author
   object at iteration. If one is returned from find method during each iteration then book object is added to 
   'bookArrayCombo' and author object is added to 'authorArray'.
  */
  const newArray = [];
  const resultObject = bookArrayCombo.reduce((acc, current, index) => {
    acc[current.title] = {
      name: `${authorArray[index].name.first} ${authorArray[index].name.last}`,
      count: current.borrows.length,
    };
    return acc;
  }, {});
  /*the above part applies reduce method to 'bookArrayCombo' to create a new object with keys being 
  the title of current book in iteration and value being an object with two keys: 'name' and 'count'. To
  get the values for 'name' it uses values from 'authorArray' created above and for 'count' it uses the length 
  of the value of borrows key from current book in iteration.
  */
  for (let item in resultObject) {
    newArray.push(resultObject[item]); 
  }
  //the above for/in loop creates array containing the values from 'resultObject' created above
  const sortedArray = newArray.sort((first, second) =>
    first.count > second.count ? -1 : 1
  );
  //the above part uses sort method to sorted array by 'count' keys from highest to lowest 
  const trimmedArray = trimArray(sortedArray, 5);
  return trimmedArray;
  //the above part trims the array to 5 or less items using 'trimArray' helper function then returns trimmed array
}


/* this function is a helper function that loops through an array and for each loop
if the arrays length exceeds the second argument which is a number it removes the index at the end. 
Then it returns the array after removing any excess values making array longer than number argument. 
*/
function trimArray(array, num) {
  for (let i = 0; i < array.length; i++) {
    if (array.length > num) array.pop();
  }
  return array;
}


module.exports = {
  getTotalBooksCount,
  getTotalAccountsCount,
  getBooksBorrowedCount,
  getMostCommonGenres,
  getMostPopularBooks,
  getMostPopularAuthors,
};
