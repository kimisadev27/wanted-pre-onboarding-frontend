import React, {useState, useEffect} from 'react';
import {Link, useNavigate} from 'react-router-dom';
import axios from 'axios';
import '../css/main.css';

function SignIn() {
    const api_url = 'https://www.pre-onboarding-selection-task.shop';
    // 회원가입 폼
    const [userEmail, setUserEmail] = useState('');
    const [userPwd, setUserPwd] = useState('');
    // 비밀번호 확인은 조건에 없으므로 따로 하지 않음

    // 유효성검사 에러메세지
    const [emailMsg, setEmailMsg] = useState('');
    const [pwdMsg, setPwdMsg] = useState('');

    // 버튼 disabled 속성
    const [btn_disabled, setButtonState] = useState('');

    const navigate = useNavigate();

    // 페이지 로딩시 일단 회원가입 버튼 비활성화
    useEffect(() => {
        if(localStorage.getItem('userKey') != null) {
            navigate('/todo');
        }
        setButtonState(false);
    }, []);
    
    // 이메일 유효성 체크
    const validEmail = (value) => {
        const regex = /@/;
        if(!regex.test(value))
            return "이메일 형식이 아닙니다. ex) test@test.com";
        return "";
    };

    // 비밀번호 유효성 체크
    const validPwd = (value) => {
        const regex = /.{8}/;
        if(!regex.test(value))
            return "비밀번호는 8자리 이상이어야 합니다.";
        return "";
    };

    // input 데이터 세팅 & 유효성 체크
    const typeEmail = (event) => {
        const _value = event.target.value;
        setUserEmail(_value);
        const validData = validEmail(_value);
        setEmailMsg(validData);
        setButtonState(validData === "" && pwdMsg === "" && userPwd.length > 0);
    }

    // pwd 유효성 체크
    const typePwd = (event) => {
        const _value = event.target.value;
        setUserPwd(_value);
        const validData = validPwd(_value);
        setPwdMsg(validData);
        setButtonState(emailMsg === "" && userEmail.length > 0 && validData === "");
    }

    
    const signinClick = (event) => {
        const api_result = axios.post(api_url + '/auth/signin', {
            email: userEmail,
            password: userPwd,
        }, {
            headers: {
                'Content-Type': 'application/json',
            }
        }).then((response)=> {
            if(response.status === 200) {
                localStorage.setItem('userKey', response.data.access_token);
                navigate('/todo', {replace: true});
            }
        }).catch((error) => {
            alert('로그인에 실패했습니다.');
        });
    }

    // 로그인 api 연동
    
    
    return (
        <div>
            <div className="signin_div">
                <h1>로그인</h1>
            </div>
            <div className="signin_div">
                <label>이메일</label>
                <input data-testid="email-input" className="input_row" name="user_email" onChange={typeEmail} />
                {emailMsg && <><br/><label>{emailMsg}</label></>}
            </div>
            <div className="signin_div">
                <label>비밀번호</label>
                <input type='password' data-testid="password-input" className="input_row" name="user_pwd" onChange={typePwd} />
                {pwdMsg && <><br/><label>{pwdMsg}</label></>}
            </div>
            <div className="signin_div">
                <button data-testid="signin-button" onClick={signinClick} disabled={!btn_disabled}>로그인</button>
                <Link to="/signup">
                    <button >회원가입</button>
                </Link>
            </div>
        </div>
    );

}

export default SignIn;