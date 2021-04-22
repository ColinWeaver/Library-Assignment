/*this function uses find method to search through authors array of objects and
return first author whose id key matches the id argument inputted. */
function findAuthorById(authors, id) {
  return authors.find((author) => author.id === id);
}

/*
this function uses find method to return first book object from books array inputted that matches 
the id argument. 
*/
function findBookById(books, id) {
  return books.find((book) => book.id === id);
}

/* this function takes in array of books and creates an array called 'combinedArray'.
It uses filter method to return array of book objects whose returned key = true. It then does the same 
but for the non returned books. It then pushes the two arrays created through filter into a new array and returns
that array. 
*/
function partitionBooksByBorrowedStatus(books) {
  const combinedArray = [];
  const returnedArray = books.filter(
    (book) => book.borrows[0].returned === true
  );
  const borrowedArray = books.filter(
    (book) => book.borrows[0].returned === false
  );
  combinedArray.push(borrowedArray);
  combinedArray.push(returnedArray);
  return combinedArray;
}

/*
this function creates new empty array variable. Then loops through a specific book argument's borrows
key which is an array of objects and then in inner loop loops through accounts array and then if a specific
borrows arrays index (which is an object) has id value that matches specific account id it pushes new 
object into array created at start with returned key equalling specific borrow array's object's returned value 
and uses spread to have the rest of keys be the keys in specific account whose id matched the borrow 
object's id. Then helper function is used to trim that array down to 10 objects at most and that array is returned. 
*/
function getBorrowersForBook(book, accounts) {
  const newArray = [];
  for (let i = 0; i < book.borrows.length; i++) {
    for (let j = 0; j < accounts.length; j++) {
      if (book.borrows[i].id === accounts[j].id) {
        newArray.push({ returned: book.borrows[i].returned, ...accounts[j] });
      }
    }
  }
  const trimmedArray = trimArray(newArray, 10);
  return trimmedArray;
}



/* the below function is a helper function that loops through an array and for each loop
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
  findAuthorById,
  findBookById,
  partitionBooksByBorrowedStatus,
  getBorrowersForBook,
};
