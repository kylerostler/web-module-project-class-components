
import React from 'react';
import TodoList from './TodoList'
import Form from './Form'
import axios from 'axios';


class App extends React.Component {
  constructor() {
    super();
    this.state = {
      todos: []
    }
  }


  getTodos = () => {
    axios.get(`http://localhost:9000/api/todos`)
    .then(res => {
      const todos = res.data.data;
      this.setState({todos});
    }).catch(err => {
      console.log(err)
    })
  }

  componentDidMount() {
    this.getTodos();
  }


  handleAdd = (task) => {
    axios.post(`http://localhost:9000/api/todos`, {name: task})
    .then(res => {
      this.setState({
        ...this.state, 
        todos: [...this.state.todos, res.data]
      });
      console.log(this.state);
    }).catch(err => {
      console.log(err)
    })
    }
  


  handleClear = () => {
    this.setState({
      ...this.state,
      todos: this.state.todos.filter(todo => {
        return (todo.completed === false);
      })
    });
  }



  handleToggle = (clickedId) => {
    this.setState({
      ...this.state,
      todos: this.state.todos.map(todo=> {
        if (todo.id === clickedId) {
          return {
            ...todo,
            completed: !todo.completed
          }
        }
          return todo
        
      })
    })
  }

  render() {
    const { todos } = this.state;
    return (
      <div>
        <h1>Todos</h1>

        <TodoList  handleToggle={this.handleToggle} todos={todos} />

        <Form handleAdd={this.handleAdd} />

        <button onClick={this.handleClear}>Clear</button>
      </div>
    );
  }
}

export default App;