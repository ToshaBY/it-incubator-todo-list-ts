import React from 'react';
import {FilterValuesType} from "./App";
import {EditableSpan} from "./components/EditableSpan";
import {Fullinput} from "./components/Fullinput";

export type TaskType = {
    id: string,
    title: string,
    isDone: boolean,
}
export type PropsType = {
    id: string
    title: string
    tasks: Array<TaskType>
    removeTask: (taskId: string, todolistId: string) => void
    changeFilter: (value: FilterValuesType, todolistId: string) => void
    addTask: (title: string, todolistId: string) => void
    changeTaskStatus: (id: string, isDone: boolean, todolistId: string) => void
    removeTodolist: (id: string) => void
    filter: FilterValuesType
    editTodolist: (todolistId: string, newTitle: string) => void
    editTask: (todolistId: string, taskID: string, newTitle: string) => void
}

export const ToDoList: React.FC<PropsType> = (props) => {

    const tasksList = props.tasks.map(t => {
        props.tasks.map(t => {
            const onClickHandler = () => props.removeTask(t.id, props.id)
            const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
                let newIsDoneValue = e.currentTarget.checked;
                props.changeTaskStatus(t.id, newIsDoneValue, props.id);
            }

            return <li key={t.id} className={t.isDone ? "is-done" : ""}>
                <input type="checkbox" onChange={onChangeHandler} checked={t.isDone}/>
                <EditableSpan title={t.title} callBack={ (newTitle) => editTaskHandler(t.id, newTitle) }/>
                <button onClick={onClickHandler}>x</button>
            </li>
        })
    });

    const removeTodolist = () => props.removeTodolist(props.id)
    // Functions to change the filter value
    const onAllClickHandler = () => props.changeFilter(props.id, 'all')
    const onActiveClickHandler = () => props.changeFilter(props.id, 'active')
    const onCompletedClickHandler = () => props.changeFilter(props.id, 'completed')
    // Callback FN to remove todolist
    const removeTodolistHandler = () => {
        props.removeTodolist(props.id)
    }

    const addTaskHandler = (newTitle: string) => {
        props.addTask(newTitle, props.id)
    }
    const editTodolistHandler = (newTitle: string) => {
        props.editTodolist(props.id, newTitle)
    }
    const editTaskHandler = (tID: string, newTitle: string) => {
        props.editTask(props.id, tID, newTitle);
    }

    return (
        <div>
            <h3>
                <EditableSpan title={props.title} callBack={editTodolistHandler}/>
                <button onClick={removeTodolist}>x</button>
            </h3>
            <Fullinput callBack={addTaskHandler}/>
            <div>
                <input value={newTaskTitle}
                       onChange={onNewTitleChangeHandler}
                       onKeyDown={onChangeHandler}
                       className={error ? 'error' : ''}
                />
                <button onClick={addTask}>+</button>
                {error && <div className={'error-message'}>{error}</div>}
            </div>
            <ul>
                {tasksList}
            </ul>
            <div>
                <button className={(props.filter === 'all') ? 'active-filter' : ''}
                        onClick={onAllClickHandler}>All
                </button>
                <button className={(props.filter === 'active') ? 'active-filter' : ''}
                        onClick={onActiveClickHandler}>Active
                </button>
                <button className={(props.filter === 'completed') ? 'active-filter' : ''}
                        onClick={onCompletedClickHandler}>Completed
                </button>
            </div>
        </div>
    );
};