import React from "react";
import { v4 as uuid } from "uuid";
import "./App.css";

class App extends React.Component {
    constructor() {
        super();
        this.state = {
            todos: [],
            inputVaLue: "",
            inputError: false,
            showEditModal: false,
            editingInputValue: "",
            editingTodoId: ""
        };
    }

    addTodo = (e) => {
        e.preventDefault();
        if (this.state.inputVaLue.length <= 2) {
            this.setState({
                inputError: true
            });
            return;
        }
        const newTodo = {
            id: uuid(),
            text: this.state.inputVaLue,
            isDone: false
        };

        this.setState((prevState) => {
            const copyTodos = [...prevState.todos, newTodo];
            return {
                todos: copyTodos,
                inputVaLue: ""
            };
        });
    };

    handleOnChange = (e) => {
        const { value } = e.target;
        this.setState({
            inputVaLue: value
        });
        if (value.length <= 2) {
            this.setState({
                inputError: true
            });
        } else {
            this.setState({
                inputError: false
            });
        }
    };

    isDone = (todoId, isDone) => {
        this.setState((prevState) => {
            const updatedTodos = prevState.todos.map((todo) => {
                if (todo.id === todoId) {
                    const copy = { ...todo, isDone: isDone };
                    return copy;
                }
                return todo;
            });
            return {
                todos: updatedTodos
            };
        });
    };

    deleteTodo = (todoId) => {
        this.setState((prevState) => {
            const leftTodos = prevState.todos.filter((todo) => {
                return todo.id !== todoId;
            });
            return {
                todos: leftTodos,
                showEditModal: false
            };
        });
    };

    editTodo = (todoId) => {
        this.setState({
            showEditModal: true
        });
        let todoText = "";
        for (const todo of this.state.todos) {
            if (todo.id === todoId) {
                todoText = todo.text;
                break;
            }
        }
        this.setState({
            editingInputValue: todoText,
            editingTodoId: todoId
        });
    };

    handleEditInput = (e) => {
        this.setState({
            editingInputValue: e.target.value
        });
    };

    submitEdit = () => {
        this.setState((prevState) => {
            const updatedTodos = prevState.todos.map((todo) => {
                if (todo.id === this.state.editingTodoId) {
                    const copy = {
                        ...todo,
                        text: this.state.editingInputValue
                    };
                    return copy;
                }
                return todo;
            });
            return {
                todos: updatedTodos,
                showEditModal: false
            };
        });
    };

    render() {
        return (
            <main>
                <form onSubmit={this.addTodo}>
                    <div className="form-control">
                        <input
                            className="input"
                            onChange={this.handleOnChange}
                            value={this.state.inputVaLue}
                            type="text"
                            placeholder="What is your todo?"
                        ></input>
                        {this.state.inputError && <span>Invalid Todo</span>}
                    </div>
                    <input type="submit" value="Add todo"></input>
                </form>
                <ul>
                    {this.state.todos.map((todo) => {
                        return (
                            <li
                                key={todo.id}
                                className={todo.isDone ? "todo-done" : ""}
                            >
                                <span className="todo-text">{todo.text}</span>

                                <input
                                    type="checkbox"
                                    defaultChecked={todo.isDone}
                                    onChange={(e) => {
                                        this.isDone(todo.id, e.target.checked);
                                    }}
                                ></input>

                                <button
                                    onClick={() => this.deleteTodo(todo.id)}
                                >
                                    X
                                </button>

                                <button onClick={() => this.editTodo(todo.id)}>
                                    Edit
                                </button>
                            </li>
                        );
                    })}
                </ul>
                {this.state.showEditModal && (
                    <div className="modal">
                        <input
                            value={this.state.editingInputValue}
                            onChange={this.handleEditInput}
                        />
                        <button onClick={this.submitEdit}>Update Todo</button>
                    </div>
                )}
            </main>
        );
    }
}

export default App;
