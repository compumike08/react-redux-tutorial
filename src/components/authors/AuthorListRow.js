import React, {PropTypes} from 'react';
import FontAwesome from 'react-fontawesome';

const AuthorListRow = ({author}) => {
  return (
    <tr>
      <td>
        <button className="btn btn-danger" value={author.id}>
          <FontAwesome name="close"/>
        </button>
      </td>
      <td>{author.firstName}</td>
      <td>{author.lastName}</td>
    </tr>
  );
};

AuthorListRow.propTypes = {
  author: PropTypes.object.isRequired
};

export default AuthorListRow;
