var todoItems = [];
todoItems.push({index: 1, value: "learn smth", done: false});
var doneItems =[];

class TodoHeader extends React.Component {
  constructor(props) {
    super(props);
    this.state = {value: ''};
    this.formRef = null;
  }
  handleSubmit = (event) => {
    event.preventDefault();
    this.setState({ value: this.element.value });
    this.formRef.reset();
  }

  render() {
    let greeting = `Hi, ${this.state.value}!`;
    if (!this.state.value) {greeting = 'Hello!'}
    let yourTasksGreeting1 = `Number of tasks: ${todoItems.length}`;
    let yourTasksGreeting2 = `Completed: ${doneItems.length}`;
    if (todoItems.length === 0) {yourTasksGreeting1 = "You have no tasks!"; yourTasksGreeting2 = ""}
        return (
      <React.Fragment>
      <form onSubmit={this.handleSubmit} className="name-form" ref={(ref) => this.formRef = ref}>
        <label>
          <input type="text" ref={el => this.element = el} lassName="form-control" className="name-input" />
        </label>
        <input type="submit" value="Submit" className="btn btn-default" />
      </form>
      <h1> {greeting} </h1>
      <h2>{yourTasksGreeting1} <br/> {yourTasksGreeting2}</h2>
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
    doneItems.splice(itemIndex, 1);
    todoItems.splice(itemIndex, 1);
    this.setState({todoItems: todoItems});
  }
  markTodoDone = (itemIndex) => {
    var todo = todoItems[itemIndex];
    todoItems.splice(itemIndex, 1);
    todo.done = !todo.done;
    if (todo.done) {
      todoItems.push(todo);
      doneItems.push(todo);
    }else {
      todoItems.unshift(todo)
    doneItems.pop(todo);
    };
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