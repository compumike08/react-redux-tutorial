import React, {PropTypes} from 'react';
import TextInput from '../common/TextInput';

const AuthorForm = ({author, onChange, errors}) => {
  return (
    <form>
      <h1>Manage Author</h1>
      <TextInput
        name="firstName"
        label="First Name"
        value={author.firstName}
        onChange={onChange}
      />
      <TextInput
        name="lastName"
        label="Last Name"
        value={author.lastName}
        onChange={onChange}
      />
      <input
        type="submit"
        value="Save"
        className="btn btn-primary"
      />
    </form>
  );
};

AuthorForm.propTypes = {
  author: React.PropTypes.object.isRequired,
  onChange: React.PropTypes.func,
  errors: React.PropTypes.object
};

export default AuthorForm;
