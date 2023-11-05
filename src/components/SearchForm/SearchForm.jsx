import { Component } from 'react';

import { FiSearch } from 'react-icons/fi';
import { FormBtn, InputSearch, SearchFormStyled } from './SearchForm.styled';

export class SearchForm extends Component {
  state = {
    query: '',
  };

  saveQuery = e => {
    const { value } = e.target;
    this.setState({ query: value });
  };

  submitQuery = e => {
    e.preventDefault();
    this.props.submitQuery(this.state.query);
  };

  render() {
    return (
      <>
        <h2>SearchForm</h2>
        <SearchFormStyled onSubmit={this.submitQuery}>
          <InputSearch onChange={this.saveQuery} />
          <FormBtn>
            <FiSearch />
          </FormBtn>
        </SearchFormStyled>
      </>
    );
  }
}
