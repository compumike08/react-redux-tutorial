/* The code in this file is based on code written by Cory House and posted on his
GitHub page here: https://github.com/coryhouse/pluralsight-redux-starter/blob/master/src/api/mockCourseApi.js

I have refactored this code to behave a little bit more like a real server.
I refactored this code very quickly, and did not concern myself with best
practices or performance. If you wish to use my refactored code yourself
you are welcome to do so, however you do so at your own risk.
 */

import delay from './delay';

// This file mocks a web API by working with the hard-coded data below.
// It uses setTimeout to simulate the delay of an AJAX call.
// All calls return promises.
let coursesServerStore = (function(){
  let courses = [
    {
      id: "react-flux-building-applications",
      title: "Building Applications in React and Flux",
      watchHref: "http://www.pluralsight.com/courses/react-flux-building-applications",
      authorId: "cory-house",
      length: "5:08",
      category: "JavaScript"
    },
    {
      id: "clean-code",
      title: "Clean Code: Writing Code for Humans",
      watchHref: "http://www.pluralsight.com/courses/writing-clean-code-humans",
      authorId: "cory-house",
      length: "3:10",
      category: "Software Practices"
    },
    {
      id: "architecture",
      title: "Architecting Applications for the Real World",
      watchHref: "http://www.pluralsight.com/courses/architecting-applications-dotnet",
      authorId: "cory-house",
      length: "2:52",
      category: "Software Architecture"
    },
    {
      id: "career-reboot-for-developer-mind",
      title: "Becoming an Outlier: Reprogramming the Developer Mind",
      watchHref: "http://www.pluralsight.com/courses/career-reboot-for-developer-mind",
      authorId: "cory-house",
      length: "2:30",
      category: "Career"
    },
    {
      id: "web-components-shadow-dom",
      title: "Web Component Fundamentals",
      watchHref: "http://www.pluralsight.com/courses/web-components-shadow-dom",
      authorId: "cory-house",
      length: "5:10",
      category: "HTML5"
    }
  ];

  return {
    getAllData: function(){
      return courses;
    },
    saveNewData: function(course){
      try {
        courses.push(course);
      }catch(err){
        throw new Error("Error saving new course on server");
      }
    },
    updateDataByIndex: function(index, course){
      try{
        courses[index] = course;
      }catch(err){
        throw new Error("Error updating course on server");
      }
    },
    deleteDataByIndex: function(index){
      try{
        courses.splice(index, 1);
      }catch(err){
        throw new Error("Error deleting course on server");
      }
    },
    deleteDataById: function(in_id){
      let coursesAryLen = courses.length;
      let isFound = null;

      for(let i = 0; i < coursesAryLen; i++){
        if(courses[i].id == in_id){
          isFound = i;
          break;
        }
      }

      if(isFound === null){
        throw new Error("Unable to find course to delete on server");
      }else{
        try{
          courses.splice(isFound, 1);
        }catch(err){
          throw new Error("Error deleting course on server");
        }
      }
    }
  };

})();

function replaceAll(str, find, replace) {
  return str.replace(new RegExp(find, 'g'), replace);
}

//This would be performed on the server in a real app. Just stubbing in.
const generateId = (course) => {
  return replaceAll(course.title, ' ', '-');
};

class CourseApi {
  static getAllCourses() {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve(Object.assign([], coursesServerStore.getAllData()));
      }, delay);
    });
  }

  static saveCourse(course) {
    course = Object.assign({}, course); // to avoid manipulating object passed in.
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        // Simulate server-side validation
        const minCourseTitleLength = 1;
        if (course.title.length < minCourseTitleLength) {
          reject(`Title must be at least ${minCourseTitleLength} characters.`);
        }

        if (course.id) {
          let currentData = coursesServerStore.getAllData();
          const existingCourseIndex = currentData.findIndex(a => a.id == course.id);
          try{
            coursesServerStore.updateDataByIndex(existingCourseIndex, course);
          }catch(err){
            reject(err.message);
          }
        } else {
          //Just simulating creation here.
          //The server would generate ids and watchHref's for new courses in a real app.
          //Cloning so copy returned is passed by value rather than by reference.
          course.id = generateId(course);
          course.watchHref = `http://www.pluralsight.com/courses/${course.id}`;
          try {
            coursesServerStore.saveNewData(course);
          }catch(err){
            reject(err.message);
          }
        }

        resolve(course);
      }, delay);
    });
  }

  static deleteCourse(courseId) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        try {
          coursesServerStore.deleteDataById(courseId);
        }catch(err){
          reject(err.message);
        }
        resolve();
      }, delay);
    });
  }
}

export default CourseApi;
