//this function loops through accounts and returns first one that matches id argument.
function findAccountById(accounts, id) {
  return accounts.find((account) => account.id === id);
}


//this function uses sort method to sort accounts argument by last name from lowest to highest letter value
function sortAccountsByLastName(accounts) {
  const sortedAccounts = accounts.sort((first, second) =>
    first.name.last > second.name.last ? 1 : -1
  );
  return sortedAccounts;
}


/*this function loops through books array (specifically the borrows array inside each book object) 
and during each loop (for each book) uses filter method to search through the borrow array and return 
only the borrow that matches the id for the account argument. It then adds the length of that filtered array to 
a 'total' variable and after all the for loops finish it returns that total at the end. */
function getTotalNumberOfBorrows(account, books) {
  let total = 0;
  for (let i = 0; i < books.length; i++) {
    const borrows = books[i].borrows;
    const borrowCaseMatchesIdArray = borrows.filter(
      (borrow) => borrow.id === account.id
    );
    total += borrowCaseMatchesIdArray.length;
  }
  return total;
}


function getBooksPossessedByAccount(account, books, authors) {
  for (let i = 0; i < books.length; i++) {
    const authorMeetConditionalArray = authors.find(
      (author) => books[i].authorId === author.id
    );
    books[i].author = authorMeetConditionalArray;
  }
  /*the above part uses for loop to loop through 'books' array and within
  that applies find method to 'authors' array to return author object with id matching 
  author id from current book in for loop iteration. As it does this for each iteration of for loop it assigns a new
  key to each book with value being the 'author' object returned from find. 
  */
  const newArray = [];
  for (let i = 0; i < books.length; i++) {
    const book = books[i];
    for (let j = 0; j < book.borrows.length; j++) {
      const borrow = book.borrows[j];
      if (
        borrow.returned === false &&
        borrow.id === account.id &&
        !newArray.includes(book)
      ) {
        newArray.push(book);
      }
    }
  }
  return newArray;
  /*
  the above part has for loop through 'books' array and inner loop through the 'borrows' array (book 'borrow' key's value)
  and if the specific borrow instance is not returned and borrow id matches account id (from function parameter) 
  and 'newArray' doesnt already include the current book in for loop iteration then it adds the book to 'newArray'. 
  After loops are finished it returns 'newArray' containing books borrowed and not returned by account. 
  */
}



module.exports = {
  findAccountById,
  sortAccountsByLastName,
  getTotalNumberOfBorrows,
  getBooksPossessedByAccount,
};
