import React from 'react'
import Todo from './Todo'

class TodoList extends React.Component {
 
  // componentDidUpdate(prevProps, prevState) {
  //   if (prevState !== this.state) {
  //     getTodos();
  //   }
  // }

    render() {
      return(<ul>
        {
          this.props.todos.map(todo=> {
            return (<Todo handleToggle={this.props.handleToggle} todo={todo}/>)
          })
        }
      </ul>);
    }
  }

  export default TodoList;