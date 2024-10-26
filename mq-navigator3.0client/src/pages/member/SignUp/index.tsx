import useInput from '@hooks/useInput';
import { Button, Error, Form, Header, Input, Label, LinkContainer, Success } from '@pages/member/SignUp/styles';
import React, { useCallback, useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import useCustomMember from '@hooks/useCustomMember';
import { signup } from '@api/memberApi';
import { useDispatch } from 'react-redux';
import { loginStateAsync } from '@slices/memberSlice';
import { memberSliceState } from '@typings/db';

const SignUp = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { memberState } = useCustomMember();
  const location = useLocation();
  const { from } = location.state || { from: { pathname: '/workspace/mqnavigator' } };
  const { updateUrlAfterLogin } = useCustomMember();

  const [email, onChangeEmail] = useInput('');
  const [nickname, onChangeNickname] = useInput('');
  const [password, , setPassword] = useInput('');
  const [passwordCheck, , setPasswordCheck] = useInput('');

  const [signUpError, setSignUpError] = useState(false);
  const [signUpSuccess, setSignUpSuccess] = useState(false);
  const [mismatchError, setMismatchError] = useState(false);

  const onChangePassword = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setPassword(e.target.value);
      setMismatchError(passwordCheck !== e.target.value);
    },
    [passwordCheck, setPassword],
  );

  const onChangePasswordCheck = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setPasswordCheck(e.target.value);
      setMismatchError(password !== e.target.value);
    },
    [password, setPasswordCheck],
  );

  const onSubmit = useCallback(
    (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      if (!nickname || !nickname.trim()) {
        return;
      }
      if (!mismatchError) {
        setSignUpError(false);
        setSignUpSuccess(false);
        const singupParam = { email: email, nickname: nickname, password: password };
        signup(singupParam)
          .then((memberState) => {
            console.log('signup memberState : ', memberState);
            // login이 성공한 후에 updateSlicesAfterLogin 실행
            const member = memberState as memberSliceState;
            // @ts-ignore
            dispatch(loginStateAsync(member))
              .then((result: memberSliceState) => {
                console.log('Login succeeded', result);
                updateUrlAfterLogin().then();
              })
              .catch((error: any) => {
                console.log('Login failed', error);
              });
          })
          .catch((error) => {
            console.log(error.response?.data);
            setSignUpError(error.response?.data?.code === 403);
          });
      }
    },
    [dispatch, email, mismatchError, nickname, password, updateUrlAfterLogin],
  );

  useEffect(() => {
    if (memberState.email) {
      navigate(from.pathname, { replace: true });
    }
  }, [memberState.email, from.pathname, navigate]);

  return (
    <>
      <Header>MQ-Navigator</Header>
      <Form onSubmit={onSubmit}>
        <Label id="email-label">
          <span>이메일 주소</span>
          <div>
            <Input type="email" id="email" name="email" value={email} onChange={onChangeEmail} />
          </div>
        </Label>
        <Label id="nickname-label">
          <span>닉네임</span>
          <div>
            <Input type="text" id="nickname" name="nickname" value={nickname} onChange={onChangeNickname} />
          </div>
        </Label>
        <Label id="password-label">
          <span>비밀번호</span>
          <div>
            <Input type="password" id="password" name="password" value={password} onChange={onChangePassword} />
          </div>
        </Label>
        <Label id="password-check-label">
          <span>비밀번호 확인</span>
          <div>
            <Input
              type="password"
              id="password-check"
              name="password-check"
              value={passwordCheck}
              onChange={onChangePasswordCheck}
            />
          </div>
          {mismatchError && <Error>비밀번호가 일치하지 않습니다.</Error>}
          {!nickname && <Error>닉네임을 입력해주세요.</Error>}
          {signUpError && <Error>이미 가입된 이메일입니다.</Error>}
          {signUpSuccess && <Success>회원가입되었습니다! 로그인해주세요.</Success>}
        </Label>
        <Button type="submit">회원가입</Button>
      </Form>
      <LinkContainer>
        이미 회원이신가요?&nbsp;
        <Link to="/member/login">로그인 하러가기</Link>
      </LinkContainer>
    </>
  );
};

export default SignUp;
