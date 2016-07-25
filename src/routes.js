import React from 'react';
import { Route, IndexRoute } from 'react-router';
import App from './components/App';
import HomePage from './components/home/HomePage';
import AboutPage from './components/about/AboutPage';
import CoursesPage from './components/courses/CoursesPage';
import ManageCoursePage from './components/courses/ManageCoursePage';
import AuthorsPage from './components/authors/AuthorsPage';
import ManageAuthorPage from './components/authors/ManageAuthorPage';

export default (
  <Route path="/" component={App}>
    <IndexRoute component={HomePage} />
    <Route path="courses" component={CoursesPage} />
    <Route path="course" component={ManageCoursePage} />
    <Route path="course/:id" component={ManageCoursePage} />
    <Route path="authors" component={AuthorsPage} />
    <Route path="author" component={ManageAuthorPage} />
    <Route path="author/:id" component={ManageAuthorPage} />
    <Route path="about" component={AboutPage} />
  </Route>
);
