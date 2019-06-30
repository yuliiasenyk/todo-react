var todoItems = [];
todoItems.push({index: 1, value: "learn react", done: false});
todoItems.push({index: 1, value: "learn smth else", done: true});

class TodoHeader extends React.Component {
  constructor(props){
    super(props);
    this.state = { username : ''}
    this.updateInput = this.updateInput;
    this.handleSubmit = this.handleSubmit;
    }
    
    updateInput = (event) => { 
    this.setState({username : event.target.value})
    }; 
    
    handleSubmit = () => {
      event.preventDefault();
    }
   
    render(){
    return ( 
    <React.Fragment>
        <form className="name-form" onSubmit={this.handleSubmit}>
        <input type="text" onChange={this.updateInput} className="form-control" className="name-input"></input>
        <input type="submit" className="btn btn-default"></input>
        </form> 
        <h1 className="">Hello {this.state.username}! You have {todoItems.length} tasks to do!</h1>
</React.Fragment>
      );
    }


}

class TodoList extends React.Component {
  render () {
    var items = this.props.items.map((item, index) => {
      return (
        <TodoListItem key={index} item={item} index={index} removeItem={this.props.removeItem} markTodoDone={this.props.markTodoDone} />
      );
    });
    return (
      <ul> {items} </ul>
    );
  }
}
  
class TodoListItem extends React.Component {
  constructor(props) {
    super(props);
  }
  onClickDelete = () => {
    var index = parseInt(this.props.index);
    this.props.removeItem(index);
  }
  onClickDone = () => {
    var index = parseInt(this.props.index);
    this.props.markTodoDone(index);
  }
  render () {
    var todoClass = this.props.item.done ? 
        "done" : "undone";
    return(
      <li className="list-group-item" onClick={this.onClickDone} >
        <div className={todoClass}>
          <span className="symbol">&#10004; </span>
          <span>{this.props.item.value} </span>
          <button type="button" className="close" onClick={this.onClickDelete}>&times;</button>
        </div>
      </li>     
    );
  }
}

class TodoForm extends React.Component {
  constructor(props) {
    super(props);
  }
  componentDidMount() {
    this.refs.itemName.focus();
  }
  onSubmit = (event) => {
    event.preventDefault();
    var newItemValue = this.refs.itemName.value;
    
    if(newItemValue) {
      this.props.addItem({newItemValue});
      this.refs.form.reset();
    }
  }
  render () {
    return (
      <form ref="form" onSubmit={this.onSubmit} className="form-inline">
        <input type="text" ref="itemName" className="form-control" placeholder="add a new todo..."/>
        <button type="submit" className="btn btn-default">Add</button> 
      </form>
    );   
  }
}
  
class TodoApp extends React.Component {
  constructor (props) {
    super(props);
    this.state = {todoItems: todoItems};
  }
  addItem = (todoItem) => {
    todoItems.unshift({
      index: todoItems.length+1, 
      value: todoItem.newItemValue, 
      done: false
    });
    this.setState({todoItems: todoItems});
  }
  removeItem = (itemIndex) => {
    todoItems.splice(itemIndex, 1);
    this.setState({todoItems: todoItems});
  }
  markTodoDone = (itemIndex) => {
    var todo = todoItems[itemIndex];
    todoItems.splice(itemIndex, 1);
    todo.done = !todo.done;
    todo.done ? todoItems.push(todo) : todoItems.unshift(todo);
    this.setState({todoItems: todoItems});  
  }
  render() {
    return (
      <div id="main">
        <TodoHeader />
        <TodoList items={this.props.initItems} removeItem={this.removeItem} markTodoDone={this.markTodoDone}/>
        <TodoForm addItem={this.addItem} />
      </div>
    );
  }
}






ReactDOM.render(<TodoApp initItems={todoItems}/>, document.getElementById('root'));