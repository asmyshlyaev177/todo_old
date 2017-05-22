import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';

class NavMenu extends React.Component {
    render() {
        return (
        <nav className="navbar navbar-default">
            <div>
                <a className="navbar-brand nav-justified text-center" href="/">Simple SPA ToDo App</a>
            </div>
        </nav>
        );
    }
}
class Buttons extends React.Component {
    render() {
        return (
            <div className="container">
            <div className="row">
                <div className="col-md-12 text-center main-buttons">
                    <button type="button" className="btn btn-primary add-todo">Add ToDo</button>
                    <button type="button" className="btn btn-info pending-todo">Pending ToDo</button>
                    <button type="button" className="btn btn-default all-todo">All ToDo</button>
                    <button type="button" className="btn btn-success completed-todo">Completed Todo</button>
                </div>
            </div>
            </div>
        )
    }
}

class Task extends React.Component {
    constructor(props) {
        super(props);
        this.props = {title: '', complete: false};
        this.state = {edit: false};
    }

    render() {
        let okStyle = {display: (this.state.edit ? 'inline-block' : 'none') };
        let editDelStyle = {display: (this.state.edit ? 'none' : 'inline-block' ) };
        return (
            <div className="task-group">
                <div className={"task "+ (this.props.complete ? 'completed' : '' )}>{this.props.title}</div>
                <div className="buttons pull-right">
                        <span className="task-edit btn-default btn-xs glyphicon glyphicon-pencil" style={editDelStyle}></span>
                        <span className="task-rm btn-default btn-xs glyphicon glyphicon-remove" style={editDelStyle}></span>
                        <span className="task-ok btn-default btn-xs glyphicon glyphicon-ok" style={okStyle}></span>
                </div>
            </div>
        )
    }
}

class Todo extends React.Component {
    constructor(props) {
        super(props);
        this.props = {id: 0, title: '', complete: false, tasks: []};
        this.state = {edit: false};
    }
    
    render() {
        let taskList = this.props.tasks.map((task)=> 
            <Task title={task.title} key={task.id} complete={task.complete} />);
        let okStyle = {display: (this.state.edit ? 'inline-block' : 'none') };
        let editDelStyle = {display: (this.state.edit ? 'none' : 'inline-block' ) };
        return (
            <div className="col-md-5 todo">
                <div className="list-group">
                    <h3 className={"todo-header "+ (this.props.complete ? 'completed' : '' )}>{this.props.title}</h3>
                    <span className="todo-edit btn-default btn-xs glyphicon glyphicon-pencil" aria-hidden="true" style={editDelStyle}></span>
                    <span className="todo-ok btn-default btn-xs glyphicon glyphicon-ok" 
                        style={okStyle}></span>
                    <div className="btn btn-danger pull-right rm-todo-btn" style={editDelStyle}>Remove Todo</div>
                    <div className="btn btn-default pull-right add-task-btn">Add Task</div>
                {taskList}
                </div>
            </div>
        )
    }
}


function getAjax(url) {
    return axios.get(url);
}

class TodoList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {todolist: []};
    }
    
     componentWillMount() {
        getAjax('/todolist/')
            .then(function(resp) {
                this.setState({
                    todolist: resp.data
                })
            }.bind(this));
    } 
    
        
    render() {
        let todoList = this.state.todolist.map((todo)=> 
                <Todo title={todo.title} key={todo.id} complete={todo.complete} tasks={todo.task} />);
        return (
            <div>{todoList}</div>
        )
    }
}


class MainComponent extends React.Component {
    render() {
        return(
            <div>
                <NavMenu />
                <Buttons />
                <TodoList />
            </div> 
        );
        
    }
}

ReactDOM.render(<MainComponent />, document.getElementById('root') );