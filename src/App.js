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
                            </li>
                        );
                    })}
                </ul>
            </main>
        );
    }
}

export default App;
