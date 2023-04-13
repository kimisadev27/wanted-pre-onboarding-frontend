function modifyTodo(props) {
    const _data = props.data;

    return (
        <li key={_data.id} value={_data.id} type='modify'>
            <label>
                <input type="checkbox" id='isCompleted' defaultChecked={_data.isCompleted} onChange={props.updateTodo}/>
                <input type='text' data-testid="modify-input" defaultValue={_data.todo} id='todo'/>
                <input type='hidden' value={_data.todo} id='ori_todo'/>
            </label>
            <button data-testid="submit-button" onClick={props.updateTodo}>제출</button>
            <button data-testid="cancel-button" onClick={props.chgOrigin}>취소</button>
        </li>
    );
}

export default modifyTodo;