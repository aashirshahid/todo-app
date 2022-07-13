import React, { useState, useRef, useEffect } from "react";
import "./App.css";

function TodoList() {
	const [inputValue, setInputValue] = useState("");
	const [todoList, setTodoList] = useState([]);
	const addBtnRef = useRef();

	useEffect(() => {
		const Arr = JSON.parse(localStorage.getItem("todoList")) || [];
		setTodoList(Arr);
	}, []);

	const fieldChangeHandler = (e) => {
		if (e.keyCode && e.keyCode === 13) {
			addBtnRef.current.click();
			return;
		}
		setInputValue(e.target.value);
	};

	const setLocalStorage = (value) => {
		localStorage.setItem("todoList", JSON.stringify(value));
	};

	const addHandler = () => {
		setTodoList((previous) => {
			setLocalStorage([...previous, inputValue]);
			return [...previous, inputValue];
		});
		setInputValue("");
	};

	const deleteItem = (index) => {
		const updatedTodoList = [...todoList];
		updatedTodoList.splice(index, 1);
		setLocalStorage(updatedTodoList);
		setTodoList(updatedTodoList);
	};

	const todoListHandler = (e) => {
		if (e.target.classList.contains("icon")) {
			deleteItem(e.target.id);
		}
	};

	const deleteAllITem = () => {
		setInputValue([]);
		setLocalStorage([]);
	};

	return (
		<div className="wrapper">
			<header>Todo App</header>
			<div className="inputField">
				<input
					type="text"
					placeholder="Add your new todo item..."
					value={inputValue}
					onChange={fieldChangeHandler}
					onKeyDown={fieldChangeHandler}
				/>
				<button onClick={addHandler} ref={addBtnRef}>
					Add
				</button>
			</div>
			<ul className="todoList" onClick={todoListHandler}>
				{React.Children.toArray(
					todoList.map((todo, index) => (
						<li className="bordered">
							{todo}
							<span className="icon" id={index}>
								X
							</span>
						</li>
					))
				)}
			</ul>
			<div className="footer">
				<span>
					You have{" "}
					<span className="pendingTask">{todoList.length}</span>{" "}
					pending tasks
				</span>
				<button onClick={deleteAllITem}>Clear All</button>
			</div>
		</div>
	);
}

export default TodoList;
