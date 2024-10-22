"use strict";(self.webpackChunkmq_navigator3_0client=self.webpackChunkmq_navigator3_0client||[]).push([[314],{9065:(e,a,t)=>{t.d(a,{A:()=>r});var n=t(6540);const r=e=>{const[a,t]=(0,n.useState)(e);return[a,(0,n.useCallback)((e=>{t(e.target.value)}),[]),t]}},2314:(e,a,t)=>{t.r(a),t.d(a,{default:()=>m});var n=t(9065),r=t(6942),o=t(6540),l=t(7767),i=t(4976),s=t(5476),c=t(8588),p=t(1468),d=t(3561);const m=()=>{const e=(0,l.Zp)(),a=(0,p.wA)(),{memberState:t}=(0,s.A)(),m=(0,l.zy)(),{from:g}=m.state||{from:{pathname:"/workspace/mqnavigator"}},{updateSlicesAfterLogin:u}=(0,s.A)(),[h,b]=(0,n.A)(""),[x,f]=(0,n.A)(""),[v,,w]=(0,n.A)(""),[k,,E]=(0,n.A)(""),[A,_]=(0,o.useState)(!1),[y,C]=(0,o.useState)(!1),[S,z]=(0,o.useState)(!1),$=(0,o.useCallback)((e=>{w(e.target.value),z(k!==e.target.value)}),[k,w]),U=(0,o.useCallback)((e=>{E(e.target.value),z(v!==e.target.value)}),[v,E]),D=(0,o.useCallback)((e=>{if(e.preventDefault(),x&&x.trim()&&!S){_(!1),C(!1);const e={email:h,nickname:x,password:v};(0,c.$5)(e).then((e=>{console.log("signup memberState : ",e);const t=e;a((0,d.VA)(t)).then((e=>{console.log("Login succeeded",e),u()})).catch((e=>{console.log("Login failed",e)}))})).catch((e=>{console.log(e.response?.data),_(403===e.response?.data?.code)}))}}),[a,h,S,x,v,u]);return(0,o.useEffect)((()=>{t.email&&e(g.pathname,{replace:!0})}),[t.email,g.pathname,e]),o.createElement(o.Fragment,null,o.createElement(r.Y9,null,"MQ-Navigator"),o.createElement(r.lV,{onSubmit:D},o.createElement(r.JU,{id:"email-label"},o.createElement("span",null,"이메일 주소"),o.createElement("div",null,o.createElement(r.pd,{type:"email",id:"email",name:"email",value:h,onChange:b}))),o.createElement(r.JU,{id:"nickname-label"},o.createElement("span",null,"닉네임"),o.createElement("div",null,o.createElement(r.pd,{type:"text",id:"nickname",name:"nickname",value:x,onChange:f}))),o.createElement(r.JU,{id:"password-label"},o.createElement("span",null,"비밀번호"),o.createElement("div",null,o.createElement(r.pd,{type:"password",id:"password",name:"password",value:v,onChange:$}))),o.createElement(r.JU,{id:"password-check-label"},o.createElement("span",null,"비밀번호 확인"),o.createElement("div",null,o.createElement(r.pd,{type:"password",id:"password-check",name:"password-check",value:k,onChange:U})),S&&o.createElement(r.$D,null,"비밀번호가 일치하지 않습니다."),!x&&o.createElement(r.$D,null,"닉네임을 입력해주세요."),A&&o.createElement(r.$D,null,"이미 가입된 이메일입니다."),y&&o.createElement(r.wV,null,"회원가입되었습니다! 로그인해주세요.")),o.createElement(r.$n,{type:"submit"},"회원가입")),o.createElement(r.mu,null,"이미 회원이신가요? ",o.createElement(i.N_,{to:"/member/login"},"로그인 하러가기")))}},6942:(e,a,t)=>{t.d(a,{$D:()=>c,$n:()=>s,JU:()=>l,Y9:()=>r,lV:()=>o,mu:()=>d,pd:()=>i,wV:()=>p});var n=t(3530);const r=n.A.header`
  text-align: center;
  font-family: Slack-Larsseit, Helvetica Neue, Helvetica, Segoe UI, Tahoma, Arial, sans-serif;
  font-weight: 700;
  font-size: 48px;
  line-height: 46px;
  letter-spacing: -0.75px;
  margin-top: 50px;
  margin-bottom: 50px;
`,o=n.A.form`
  margin: 0 auto;
  width: 400px;
  max-width: 400px;
`,l=n.A.label`
  margin-bottom: 16px;

  & > span {
    display: block;
    text-align: left;
    padding-bottom: 8px;
    font-size: 15px;
    cursor: pointer;
    line-height: 1.46666667;
    font-weight: 700;
  }
`,i=n.A.input`
  border-radius: 4px;
  --saf-0: rgba(var(--sk_foreground_high_solid, 134, 134, 134), 1);
  border: 1px solid var(--saf-0);
  transition: border 80ms ease-out, box-shadow 80ms ease-out;
  box-sizing: border-box;
  margin: 0 0 20px;
  width: 100%;
  color: rgba(var(--sk_primary_foreground, 29, 28, 29), 1);
  background-color: rgba(var(--sk_primary_background, 255, 255, 255), 1);
  padding: 12px;
  height: 44px;
  padding-top: 11px;
  padding-bottom: 13px;
  font-size: 18px;
  line-height: 1.33333333;

  &:focus {
    --saf-0: rgba(var(--sk_highlight, 18, 100, 163), 1);
    box-shadow: 0 0 0 1px var(--saf-0), 0 0 0 5px rgba(29, 155, 209, 0.3);
  }
`,s=n.A.button`
  margin-bottom: 12px;
  width: 100%;
  max-width: 100%;
  color: #fff;
  background: rgba(20, 10, 110);
  border: none;
  font-size: 18px;
  font-weight: 900;
  height: 44px;
  min-width: 96px;
  padding: 0 16px 3px;
  transition: all 80ms linear;
  user-select: none;
  outline: none;
  cursor: pointer;
  border-radius: 4px;
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.3);

  &:hover {
    background-color: rgba(50, 20, 160);
    border: none;
  }
  &:focus {
    --saf-0: rgba(var(--sk_highlight, 18, 100, 163), 1);
    box-shadow: 0 0 0 1px var(--saf-0), 0 0 0 5px rgba(29, 155, 209, 0.3);
  }
`,c=n.A.div`
  color: #e01e5a;
  margin: 8px 0 16px;
  font-weight: bold;
`,p=n.A.div`
  color: #2eb67d;
  font-weight: bold;
`,d=n.A.p`
  font-size: 13px;
  color: #616061;
  margin: 0 auto 8px;
  width: 400px;
  max-width: 400px;

  & a {
    color: #1264a3;
    text-decoration: none;
    font-weight: 700;

    &:hover {
      text-decoration: underline;
    }
  }
`}}]);