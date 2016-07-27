import React, {PropTypes} from 'react';
import AuthorListRow from './AuthorListRow';

const AuthorsList = ({authors, onEdit, onDelete}) => {
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
        <AuthorListRow key={author.id} author={author} onEdit={onEdit} onDelete={onDelete}/>
      )}
      </tbody>
    </table>
  );
};

AuthorsList.propTypes = {
  authors: PropTypes.array.isRequired,
  onEdit: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired
};

export default AuthorsList;
