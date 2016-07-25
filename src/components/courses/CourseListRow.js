import React, {PropTypes} from 'react';
import {Link} from 'react-router';
import FontAwesome from 'react-fontawesome';

const CourseListRow = ({course, onDelete}) => {
  return (
    <tr>
      <td><a href={course.watchHref} target="_blank">Watch</a></td>
      <td>
        <button className="myapp-button-controls btn btn-danger btn-sm" onClick={onDelete} value={course.id}>
          <FontAwesome name="close"/>
        </button>
      </td>
      <td><Link to={'/course/' + course.id}>{course.title}</Link></td>
      <td>{course.authorId}</td>
      <td>{course.category}</td>
      <td>{course.length}</td>
    </tr>
  );
};

CourseListRow.propTypes = {
  course: PropTypes.object.isRequired,
  onDelete: React.PropTypes.func.isRequired
};

export default CourseListRow;
