import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {browserHistory} from 'react-router';
import AuthorsList from './AuthorsList';
import * as authorActions from '../../actions/authorActions';
import toastr from 'toastr';

class AuthorsPage extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.redirectToAddAuthorPage = this.redirectToAddAuthorPage.bind(this);
    this.editAuthor = this.editAuthor.bind(this);
    this.deleteAuthor = this.deleteAuthor.bind(this);
  }

  redirectToAddAuthorPage(){
    browserHistory.push("/author");
  }

  editAuthor(event){
    event.preventDefault();
    const editAuthorId = event.currentTarget.value;
    browserHistory.push("/author/" + editAuthorId);
  }

  deleteAuthor(event){
    event.preventDefault();
    const deleteAuthorId = event.currentTarget.value;
    this.props.actions.deleteAuthor(deleteAuthorId)
      .then(() => {
        toastr.success("Author deleted");
      })
      .catch(error => {
        toastr.error(error);
      });
  }

  render() {
    const {authors} = this.props;

    return (
      <div>
        <h1>Authors</h1>
        <input type="submit"
               value="Add Author"
               className="btn btn-primary"
               onClick={this.redirectToAddAuthorPage}/>
        <AuthorsList authors={authors} onEdit={this.editAuthor} onDelete={this.deleteAuthor}/>
      </div>
    );
  }
}

AuthorsPage.propTypes = {
  authors: PropTypes.array.isRequired,
  actions: PropTypes.object.isRequired
};

function mapStateToProps(state, ownProps) {
  return {
    authors: state.authors
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(authorActions, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(AuthorsPage);
