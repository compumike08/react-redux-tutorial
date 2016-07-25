import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {browserHistory} from 'react-router';
import AuthorsList from './AuthorsList';

class AuthorsPage extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.redirectToAddAuthorPage = this.redirectToAddAuthorPage.bind(this);
    this.editAuthor = this.editAuthor.bind(this);
  }

  redirectToAddAuthorPage(){
    browserHistory.push("/author");
  }

  editAuthor(event){
    event.preventDefault();
    const editAuthorId = event.currentTarget.value;
    browserHistory.push("/author/" + editAuthorId);
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
        <AuthorsList authors={authors} onEdit={this.editAuthor}/>
      </div>
    );
  }
}

AuthorsPage.propTypes = {
  authors: PropTypes.array.isRequired
};

function mapStateToProps(state, ownProps) {
  return {
    authors: state.authors
  };
}

function mapDispatchToProps(dispatch) {
  return {
    //actions: bindActionCreators(actions, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(AuthorsPage);
