/* The code in this file is based on code written by Cory House and posted on his
 GitHub page here: https://github.com/coryhouse/pluralsight-redux-starter/blob/master/src/api/mockAuthorApi.js

 I have refactored this code to behave a little bit more like a real server.
 I refactored this code very quickly, and did not concern myself with best
 practices or performance. If you wish to use my refactored code yourself
 you are welcome to do so, however you do so at your own risk.
 */

import delay from './delay';

// This file mocks a web API by working with the hard-coded data below.
// It uses setTimeout to simulate the delay of an AJAX call.
// All calls return promises.
let authorsServerStore = (function(){
  let authors = [
    {
      id: 'cory-house',
      firstName: 'Cory',
      lastName: 'House'
    },
    {
      id: 'scott-allen',
      firstName: 'Scott',
      lastName: 'Allen'
    },
    {
      id: 'dan-wahlin',
      firstName: 'Dan',
      lastName: 'Wahlin'
    }
  ];

  return {
    getAllData: function(){
      return authors;
    },
    saveNewData: function(author){
      try {
        authors.push(author);
      }catch(err){
        throw new Error("Error saving new author on server");
      }
    },
    updateDataByIndex: function(index, author){
      try{
        authors[index] = author;
      }catch(err){
        throw new Error("Error updating author on server");
      }
    },
    deleteDataByIndex: function(index){
      try{
        authors.splice(index, 1);
      }catch(err){
        throw new Error("Error deleting author on server");
      }
    },
    deleteDataById: function(in_id){
      let authorsAryLen = authors.length;
      let isFound = null;

      for(let i = 0; i < authorsAryLen; i++){
        if(authors[i].id == in_id){
          isFound = i;
          break;
        }
      }

      if(isFound === null){
        throw new Error("Unable to find author to delete on server");
      }else{
        try{
          authors.splice(isFound, 1);
        }catch(err){
          throw new Error("Error deleting author on server");
        }
      }
    }
  };
})();



//This would be performed on the server in a real app. Just stubbing in.
const generateId = (author) => {
  return author.firstName.toLowerCase() + '-' + author.lastName.toLowerCase();
};

class AuthorApi {
  static getAllAuthors() {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve(Object.assign([], authorsServerStore.getAllData()));
      }, delay);
    });
  }

  static saveAuthor(author) {
    author = Object.assign({}, author); // to avoid manipulating object passed in.
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        // Simulate server-side validation
        const minAuthorNameLength = 3;
        if (author.firstName.length < minAuthorNameLength) {
          reject(`First Name must be at least ${minAuthorNameLength} characters.`);
        }

        if (author.lastName.length < minAuthorNameLength) {
          reject(`Last Name must be at least ${minAuthorNameLength} characters.`);
        }

        if (author.id) {
          let currentData = authorsServerStore.getAllData();
          const existingAuthorIndex = currentData.findIndex(a => a.id == author.id);
          try {
            authorsServerStore.updateDataByIndex(existingAuthorIndex, author);
          }catch(err){
            reject(err.message);
          }
        } else {
          //Just simulating creation here.
          //The server would generate ids for new authors in a real app.
          //Cloning so copy returned is passed by value rather than by reference.
          author.id = generateId(author);
          try {
            authorsServerStore.saveNewData(author);
          }catch(err){
            reject(err.message);
          }
        }

        resolve(author);
      }, delay);
    });
  }

  static deleteAuthor(authorId) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        try{
          authorsServerStore.deleteDataById(authorId);
        }catch(err){
          reject(err.message);
        }
        resolve();
      }, delay);
    });
  }
}

export default AuthorApi;
