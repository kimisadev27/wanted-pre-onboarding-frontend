function originTodo(props) {
    const _data = props.data;

    return (
        <li key={_data.id} value={_data.id} type='origin'>
            <label>
                <input type="checkbox" id='isCompleted' defaultChecked={_data.isCompleted} onChange={props.updateTodo}/>
                <span id='todo'>{_data.todo}</span>
            </label>
            <button data-testid="modify-button" onClick={props.chgModify}>수정</button>
            <button data-testid="delete-button" onClick={props.deleteTodo}>삭제</button>
        </li>
    );
}

export default originTodo;