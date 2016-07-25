import React, {PropTypes} from 'react';
import AuthorListRow from './AuthorListRow';

const AuthorsList = ({authors, onEdit}) => {
  return (
    <table className="table">
      <thead>
      <tr>
        <th>&nbsp;</th>
        <th>First Name</th>
        <th>Last Name</th>
      </tr>
      </thead>
      <tbody>
      {authors.map(author =>
        <AuthorListRow key={author.id} author={author} onEdit={onEdit}/>
      )}
      </tbody>
    </table>
  );
};

AuthorsList.propTypes = {
  authors: PropTypes.array.isRequired,
  onEdit: PropTypes.func.isRequired
};

export default AuthorsList;
