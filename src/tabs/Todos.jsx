import { Component } from 'react';
import { nanoid } from 'nanoid';
import { Grid, GridItem, SearchForm, EditForm, Text, Todo } from 'components';

export class Todos extends Component {
  state = {
    todos: [],
  };

  submitQuery = value => {
    const todo = { id: nanoid(), text: value };
    this.setState(prevState => ({ todos: [...prevState.todos, todo] }));
  };

  deleteQuery = id => {
    this.setState(prevState => ({
      todos: prevState.todos.filter(todo => todo.id !== id),
    }));
  };

  componentDidMount() {
    const inf = JSON.parse(localStorage.getItem('todos'));
    if (inf) {
      this.setState({ todos: inf });
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.todos !== this.state.todos) {
      localStorage.setItem('todos', JSON.stringify(this.state.todos));
    }
  }

  render() {
    return (
      <>
        <SearchForm submitQuery={this.submitQuery} />
        <Grid>
          {this.state.todos.map((todo, index) => {
            return (
              <GridItem key={todo.id}>
                {' '}
                <Todo
                  todo={todo.text}
                  counter={index + 1}
                  deleteQuery={this.deleteQuery}
                  id={todo.id}
                />
              </GridItem>
            );
          })}
        </Grid>
      </>
    );
  }
}
