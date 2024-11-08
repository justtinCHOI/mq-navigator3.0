import useInput from '@hooks/useInput';
import { Button, Error, Form, Header, Input, Label, LinkContainer } from '@pages/member/SignUp/styles';
import React, { useCallback, useEffect, useState } from 'react';
import useCustomMember from '@hooks/useCustomMember';
import { Link } from 'react-router-dom';

const LogIn = () => {
  const { isLogin, doLogin, updateUrlAfterLogin } = useCustomMember();
  // const from = location.state?.from || { pathname: `/workspace/${workspaceState.url}/analyze` };

  const [logInError, setLogInError] = useState(false);
  const [email, onChangeEmail] = useInput('');
  const [password, onChangePassword] = useInput('');
  const onSubmit = useCallback(
    (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      setLogInError(false);
      const loginParam = { email: email, password: password };
      doLogin(loginParam)
        .then(() => {
          updateUrlAfterLogin().then();
        })
        .catch((error) => {
          console.dir(error);
          setLogInError(error.response?.status === 401);
        });
    },
    [doLogin, email, password, updateUrlAfterLogin],
  );

  useEffect(() => {
    if (isLogin) {
      updateUrlAfterLogin().then();
    }
  }, [isLogin, updateUrlAfterLogin]);

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
        <Link to="/member/signup">회원가입 하러가기</Link>
      </LinkContainer>
    </div>
  );
};

export default LogIn;
