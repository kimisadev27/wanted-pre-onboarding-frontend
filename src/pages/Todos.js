import React, {useState, useEffect} from 'react';
import * as ReactDOMClient from 'react-dom/client';
import {useNavigate} from 'react-router-dom';
import axios from 'axios';
import '../css/main.css';

import ORIGIN from './todo/originTodo';
import MODIFY from './todo/modifyTodo';

function Todos() {

    const api_url = 'https://www.pre-onboarding-selection-task.shop';

    //변수 설정
    const [newTodo, setNewTodo] = useState('');
    const [todoList, setTodoList] = useState([]);
    const typeNewTodo = (event) => {
        const _value = event.target.value;
        setNewTodo(_value);
    };

    const navigate = useNavigate();
    // 페이지 로딩시 데이터 가져오기
    useEffect(() => {
        if(localStorage.getItem('userKey') == null) {
            navigate('/signin');
        }
        getTodos();
    }, []);

    // api연동
    // 1. createTodo
    const createTodo = (event) => {
        const apiResult = axios.post(api_url + '/todos', {
            todo: newTodo,
        }, {
            headers: {
                Authorization: 'Bearer ' + localStorage.getItem('userKey'),
                'Content-Type': 'application/json',
            }
        }).then((response) => {
            getTodos();
            event.target.closest('div').querySelector('input').value = '';
        }).catch((error) => {
            console.log("err: ", error);
            alert('오류가 발생했습니다.');
        });
    }; 

    // 2. getTodos
    const getTodos = (event) => {
        const apiResult = axios.get(api_url + '/todos', {
            headers: {
                Authorization: 'Bearer ' + localStorage.getItem('userKey'),
            }
        }).then((response) => {
            // showTodos(response.data);
            setTodoList(response.data);            
        }).catch((error) => {
            console.log("err: ", error);
        });
    }

    // 3. updateTodo
    // 3-1. 수정모드 진입
    const chgModify = async (event) => {
        const origin_li = event.target.closest('li');

        const _id = origin_li.value;
        // const _checked = origin_li.closest('input').checked;
        const _isCompleted = origin_li.querySelector('input').checked;
        const _todo = origin_li.querySelector('span').textContent;
        
        let todoData = {
            id: _id,
            todo: _todo,
            isCompleted: _isCompleted,
            userId: 0,
        };

        rerender('modify', event, todoData);
    };

    // 수정모드 -> 취소버튼
    const chgOrigin = (event) => {
        const origin_li = event.target.closest('li');

        const _id = origin_li.value;
        const _todo = origin_li.querySelector('#ori_todo').value;
        const _isCompleted = origin_li.querySelector('#isCompleted').checked;

        let todoData = {
            id: _id,
            todo: _todo,
            isCompleted: _isCompleted,
            userId: 0,
        };

        rerender('origin', event, todoData);
    };

    const rerender = (mode, event, todoData) => {
        const div_root = ReactDOMClient.createRoot(event.target.closest('div'));
        if(mode === 'modify') {
            div_root.render(<MODIFY data={todoData} updateTodo={updateTodo} chgOrigin={chgOrigin}/>);
            return null;
        } else {
            div_root.render(<ORIGIN data={todoData} updateTodo={updateTodo} chgModify={chgModify} deleteTodo={deleteTodo} />);
            return null;
        }
    }

    // 3-2. 수정 api연동
    // 수정모드 -> 제출버튼
    const updateTodo = (event) => {
        const _id = event.target.closest('li').value;
        let _todo, _isCompl;

        if(event.target.closest('li').type === 'origin') {
            _todo = event.target.nextSibling.textContent;
            _isCompl = event.target.checked;
        } else {
            _todo = event.target.closest('li').querySelector('#todo').value;
            _isCompl = event.target.closest('li').querySelector('#isCompleted').checked;
        }

        const apiResult = axios.put(api_url + '/todos/'+_id, {
            todo: _todo,
            isCompleted: _isCompl,
        }, {            
            headers: {
                Authorization: 'Bearer ' + localStorage.getItem('userKey'),
                'Content-Type': 'application/json',
            }
        }).then((response) => {
            // showTodos(response.data);
            getTodos();
            rerender('origin', event, response.data);
        }).catch((error) => {
            console.log("err: ", error);
        });
    };


    // 4. deleteTodo
    const deleteTodo = (event) => {
        const _id = event.target.closest('li').value;
        const apiResult = axios.delete(api_url + '/todos/'+_id, {
            headers: {
                Authorization: 'Bearer ' + localStorage.getItem('userKey'),
            }
        }).then((response) => {
            // showTodos(response.data);
            getTodos();
        }).catch((error) => {
            console.log("err: ", error);
        });
    }

    return(
        <div>
            <div className="signin_div">
                <h1>할일</h1>
            </div>
            <div className="signin_div">
                <input data-testid="new-todo-input" name='new_todo' onChange={typeNewTodo}/>
                <button data-testid="new-todo-add-button" name='addBtn' onClick={createTodo}>추가</button>
            </div>

            <div className="Todo_div">
                {
                    todoList.map((_data) => {
                        return(
                            <div className="todoList">
                                <ORIGIN 
                                    data={_data} 
                                    updateTodo={updateTodo} 
                                    chgModify={chgModify} 
                                    deleteTodo={deleteTodo} />
                            </div>
                        )
                    })
                }
            </div>
        </div>
    );
}

export default Todos;