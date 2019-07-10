var todoItems = [];
todoItems.push({index: 1, value: "do smth", done: false});
todoItems.push({index: 2, value: "do smth else", done: false});
var doneItems =[];

class TodoHeader extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      input: '',
      submit: ''
    };
  }

  handleChange = (event) => {
    this.setState({
      input: event.target.value
    });
  }

  handleSubmit = (event) => {
    event.preventDefault();
    this.setState({
      input: '',
      submit: this.state.input
    });  }

  render() {
    let greeting = `Hi, ${this.state.submit}!`;
    if (!this.state.submit) {greeting = 'Hello!'}
    let yourTasksGreeting1 = `Number of tasks: ${todoItems.length}`;
    let yourTasksGreeting2 = `Completed: ${doneItems.length}`;
    if (todoItems.length === 0) {yourTasksGreeting1 = "You have no tasks!"; yourTasksGreeting2 = ""}
        return (
      <React.Fragment>
      <form onSubmit={this.handleSubmit} className="name-form">
        <label>
          <input value = {this.state.input} onChange = {this.handleChange.bind(this)} className="form-control" className="name-input" placeholder="your name.."/>
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
    this.state = {
      taskInput: '',
      taskSubmit: ''
    };
  }

  handleChange = (event) => {
    this.setState({
      taskInput: event.target.value
    });
  }

  onSubmit = (event) => {
    event.preventDefault();
    this.setState((state, props) => ({
      taskInput: '',
      taskSubmit: state.taskInput
    }), () => {
  var newItemValue = this.state.taskSubmit;
if (newItemValue) {
    this.props.addItem({newItemValue})
  }
  });
}
  render () {
    return (
      <form  onSubmit={this.onSubmit} className="form-inline">
        <input value = {this.state.taskInput} onChange = {this.handleChange} type="text"  className="form-control" placeholder="add a new todo..."/>
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
          <Clock />
        <TodoHeader />
        <TodoList items={this.props.initItems} removeItem={this.removeItem} markTodoDone={this.markTodoDone}/>
        <TodoForm addItem={this.addItem} />
      </div>
    );
  }
}


class Clock extends React.Component {
  constructor(props) {
    super(props);
    this.state = {date: new Date()};
  }

  componentDidMount() {
    this.timerID = setInterval(
      () => this.tick(),
      1000
    );
  }

  componentWillUnmount() {
    clearInterval(this.timerID);
  }

  tick() {
    this.setState({
      date: new Date()
    });
  }

  render() {
    return (
      <div>
        <h2 className="clock">It is {this.state.date.toLocaleTimeString()}.</h2>
      </div>
    );
  }
}

ReactDOM.render(<TodoApp initItems={todoItems}/>, document.getElementById('root'));