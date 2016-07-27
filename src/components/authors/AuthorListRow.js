import React, {PropTypes} from 'react';
import FontAwesome from 'react-fontawesome';

const AuthorListRow = ({author, onEdit, onDelete}) => {
  return (
    <tr>
      <td>
        <span>
          <button className="myapp-button-controls btn btn-danger btn-sm" value={author.id} onClick={onDelete}>
            <FontAwesome name="close"/>
          </button>
        </span>
        <span>
          <button className="myapp-button-controls btn btn-success btn-sm" value={author.id} onClick={onEdit}>
            <FontAwesome name="edit"/>
          </button>
        </span>
      </td>
      <td>{author.firstName}</td>
      <td>{author.lastName}</td>
    </tr>
  );
};

AuthorListRow.propTypes = {
  author: PropTypes.object.isRequired,
  onEdit: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired
};

export default AuthorListRow;
