import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import AuthorForm from './AuthorForm';

class ManageAuthorPage extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      author: Object.assign({}, props.author)
    };
  }

  render() {
    return (
      <AuthorForm
        author={this.state.author}
      />
    );
  }
}

ManageAuthorPage.propTypes = {
  author: PropTypes.object.isRequired
};

function getAuthorById(authors, id) {
  const author = authors.filter(author => author.id == id);

  if (author.length) {
    return author[0];
  } else {
    return null;
  }
}

function mapStateToProps(state, ownProps) {
  const authorId = ownProps.params.id;  //from the path '/author/:id'

  let author = {id: '', firstName: '', lastName: ''};

  if (authorId && state.authors.length > 0) {
    author = getAuthorById(state.authors, authorId);
  }

  return {
    author: author
  };
}

function mapDispatchToProps(dispatch) {
  return {
    //actions: bindActionCreators(actions, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(ManageAuthorPage);
