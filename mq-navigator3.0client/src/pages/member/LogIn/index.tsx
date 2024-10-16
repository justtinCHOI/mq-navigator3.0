import useInput from '@hooks/useInput';
import { Button, Error, Form, Header, Input, Label, LinkContainer } from '@pages/member/SignUp/styles';
import React, { useCallback, useEffect, useState } from 'react';
import useCustomMember from '@hooks/useCustomMember';
import { useLocation, useNavigate } from 'react-router-dom';

const LogIn = () => {
  const { memberState, doLogin } = useCustomMember();
  const navigate = useNavigate();
  const location = useLocation();
  // const { from } = location.state || { from: { pathname: '/workspace/mqnavigator/analyze' } };
  const from = location.state?.from || { pathname: '/workspace/mqnavigator/analyze' };

  const [logInError, setLogInError] = useState(false);
  const [email, onChangeEmail] = useInput('');
  const [password, onChangePassword] = useInput('');
  const onSubmit = useCallback(
    (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      setLogInError(false);
      const loginParam = { email: email, password: password };
      doLogin(loginParam)
        .then(() => {})
        .catch((error) => {
          console.dir(error);
          setLogInError(error.response?.status === 401);
        });
    },
    [doLogin, email, password],
  );

  // if (memberState.email) {
  //   // console.log('memberState', memberState);
  //   navigate(from.pathname, { replace: true });
  // }
  // useEffect(() => {
  //   if (memberState.email) {
  //     console.log(memberState.email);
  //     navigate(from.pathname, { replace: true });
  //   }
  // }, [from.pathname, memberState.email, navigate]);

  // if (memberState.email) {
  //   console.log('Navigating to:', from.pathname);
  //   // navigate(from.pathname, { replace: true });
  //   navigate('/workspace/mqnavigator/analyze', { replace: true });
  // }

  useEffect(() => {
    console.log('Current memberState:', memberState);
    if (memberState.email) {
      console.log('Navigating to:', from.pathname);
      navigate(from.pathname, { replace: true });
    }
  }, [from.pathname, memberState, navigate]);

  return (
    <div id="container">
      <Header>MQ-Navigator</Header>
      <Form onSubmit={onSubmit}>
        <Label id="email-label">
          <span>이메일 주소</span>
          <div>
            <Input type="email" id="email" name="email" value={email} onChange={onChangeEmail} />
          </div>
        </Label>
        <Label id="password-label">
          <span>비밀번호</span>
          <div>
            <Input type="password" id="password" name="password" value={password} onChange={onChangePassword} />
          </div>
          {logInError && <Error>이메일과 비밀번호 조합이 일치하지 않습니다.</Error>}
        </Label>
        <Button type="submit">로그인</Button>
      </Form>
      <LinkContainer>
        아직 회원이 아니신가요?&nbsp;
        <a href="/member/signup">회원가입 하러가기</a>
      </LinkContainer>
    </div>
  );
};

export default LogIn;
