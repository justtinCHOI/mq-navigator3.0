"use strict";(self.webpackChunkmq_navigator3_0client=self.webpackChunkmq_navigator3_0client||[]).push([[976],{7280:(e,t,o)=>{o.d(t,{A:()=>l});var n=o(3530);const r=n.A.div`
  position: fixed;
  text-align: center;
  left: 0;
  bottom: 0;
  top: 0;
  right: 0;
  z-index: 1022;

  & > div {
    margin-top: 200px;
    display: inline-block;
    width: 440px;
    background: white;
    --saf-0: rgba(var(--sk_foreground_low, 29, 28, 29), 0.13);
    box-shadow: 0 0 0 1px var(--saf-0), 0 4px 12px 0 rgba(0, 0, 0, 0.12);
    background-color: rgba(var(--sk_foreground_min_solid, 248, 248, 248), 1);
    border-radius: 6px;
    user-select: none;
    max-width: 440px;
    padding: 30px 40px;
    z-index: 1012;
    position: relative;
  }
`,i=n.A.button`
  position: absolute;
  right: 10px;
  top: 6px;
  background: transparent;
  border: none;
  font-size: 30px;
  cursor: pointer;
`;var a=o(6540);const l=({show:e,children:t,onCloseModal:o})=>{const n=(0,a.useCallback)((e=>{e.stopPropagation()}),[]);return e?a.createElement(r,{onClick:o},a.createElement("div",{onClick:n},a.createElement(i,{onClick:o},"×"),t)):null}},8046:(e,t,o)=>{o.d(t,{By:()=>h,JA:()=>l,JH:()=>u,Mi:()=>p,OQ:()=>g,U9:()=>x,UC:()=>i,Us:()=>a,hj:()=>b,lP:()=>s,lV:()=>c,qT:()=>w,r0:()=>r,wV:()=>d,z2:()=>f,zb:()=>m});var n=o(3530);const r=n.A.div`
  width: 100%;
  height: 120px;
`,i=n.A.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`,a=n.A.div`
  display: flex;
  flex-direction: row;
`,l=n.A.div`
  display: flex;
  flex-direction: column;
  width: 170px;
  justify-content: center;
  align-items: center;
`,p=n.A.div`
  flex: 1;
  display: flex;
  flex-direction: column;
`,d=n.A.div`
  display: flex;
  flex-direction: row;
  flex-shrink: 0;
`,c=n.A.p`
  margin: 10px;
  height: 40px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  font-weight: 500;
`,s=n.A.div`
  margin: 10px;
  height: 40px;
  border-radius: 4px;
  padding: 5px;
  font-size: 16px;
  font-weight: 500;
  box-sizing: border-box;

  &:focus {
    outline: none;
    border-color: #666;
    box-shadow: 0 0 5px #ccc;
  }
`,x=n.A.input`
  margin: 10px;
  height: 40px;
  border-radius: 4px;
  padding: 5px;
  font-size: 16px;
  font-weight: 500;
  box-sizing: border-box;

  &:focus {
    outline: none;
    border-color: #666;
    box-shadow: 0 0 5px #ccc;
  }
`,g=n.A.select`
  margin: 10px;
  height: 40px;
  border: none;
  box-sizing: border-box;
  border-radius: 4px;
  padding: 5px;
  font-size: 16px;
  font-weight: 500;

  &:focus {
    outline: none;
    box-shadow: none;
  }
`,u=n.A.button`
  display: flex;
  margin: 10px;
  width: 40px;
  height: 40px;
  border-radius: 4px;
  justify-content: space-around;
  align-items: center;
  font-size: 15px;
  cursor: pointer;
  transition: background-color 0.3s ease, transform 0.3s ease;

  &:hover {
    background-color: #ccc;
  }

  &:active {
    transform: scale(0.95);
  }
`,h=n.A.button`
  margin: 10px;
  padding: 5px 10px;
  color: #000;
  border: 1px solid #999;
  border-radius: 4px;
  font-size: 16px;
  font-weight: 500;
  cursor: pointer;
  transition: background-color 0.3s ease, transform 0.3s ease;

  &:hover {
    background-color: #ccc;
  }

  &:active {
    transform: scale(0.95);
  }

  &:focus {
    outline: none;
    box-shadow: 0 0 5px #ccc;
  }
`,b=n.A.i`
  flex: 1;
  margin: auto;
  padding: 5px;
  font-size: 24px;
  cursor: pointer;
  transition: color 0.3s ease, transform 0.3s ease;

  &:active {
    color: #000;
  }
`,m=n.A.div`
  bottom: 30px;
  position: relative;
  display: flex;
  align-items: center;
  width: 100%;
  margin: 20px;
  height: 40px;
`,f=n.A.input`
  width: 100%;
  height: 10px;
  appearance: none;
  background-color: #ccc;
  cursor: pointer;
  margin-right: 20px;

  &::-webkit-slider-thumb {
    appearance: none;
    width: 20px;
    height: 20px;
    background-color: #333;
    border-radius: 50%;
    cursor: pointer;
    transition: background-color 0.3s ease;
  }

  &:active::-webkit-slider-thumb {
    background-color: #333;
  }
`,w=n.A.div`
  display: flex;
  justify-content: space-between;
  width: 120px;
  padding: 20px;
  font-size: 14px;
  font-weight: 500;
`},9065:(e,t,o)=>{o.d(t,{A:()=>r});var n=o(6540);const r=e=>{const[t,o]=(0,n.useState)(e);return[t,(0,n.useCallback)((e=>{o(e.target.value)}),[]),o]}},5976:(e,t,o)=>{o.r(t),o.d(t,{default:()=>P});var n=o(6540),r=o(3530);const i=r.A.div`
  width: 100%;
  height: calc(100vh - 158px);
`,a=()=>{let e;const t={lat:37.5665,lng:126.978};return(0,n.useEffect)((()=>{const o=document.createElement("script");o.src="https://maps.googleapis.com/maps/api/js?key=AIzaSyDfXQ99l7TWfyfvujf8d52Ug1EDl5ok20M&v=weekly&libraries=marker",o.async=!0,o.defer=!0,document.head.appendChild(o),o.onload=()=>{e=new window.google.maps.Map(document.getElementById("viewMap"),{zoom:10,center:t,mapId:"DEMO_MAP_ID2"})}}),[]),n.createElement(i,{id:"viewMap"})},l=r.A.div`
  position: fixed;
  top: 0;
  right: 0;
  left: 0;
  bottom: 0;
  z-index: 1000;

  & > div {
    position: absolute;
    display: inline-block;
    --saf-0: rgba(var(--sk_foreground_low, 29, 28, 29), 0.13);
    box-shadow: 0 0 0 1px var(--saf-0), 0 4px 12px 0 rgba(0, 0, 0, 0.12);
    background-color: rgba(var(--sk_foreground_min_solid, 248, 248, 248), 1);
    border-radius: 6px;
    user-select: none;
    min-width: 360px;
    z-index: 512;
    max-height: calc(100vh - 20px);
    color: rgb(29, 28, 29);
  }
`,p=r.A.button`
  position: absolute;
  right: 10px;
  top: 6px;
  background: transparent;
  border: none;
  font-size: 30px;
  cursor: pointer;
`,d=({closeButton:e=!0,style:t,show:o,children:r,onCloseModal:i})=>{const a=(0,n.useCallback)((e=>{e.stopPropagation()}),[]);return o?n.createElement(l,{onClick:i},n.createElement("div",{onClick:a,style:t},e&&n.createElement(p,{onClick:i},"×"),r)):null};var c=o(7280),s=o(9065),x=o(6942),g=o(3365),u=o.n(g),h=o(7767),b=o(4976),m=o(2845);o(3967);const f=r.A.div`
  float: right;
`,w=r.A.header`
  height: 38px;
  background: rgba(10, 0, 90);
  color: #ffffff;
  box-shadow: 0 1px 0 0 rgba(255, 255, 255, 0.1);
  padding: 5px;
  text-align: center;
`,v=r.A.img`
  width: 28px;
  height: 28px;
  position: absolute;
  top: 5px;
  right: 16px;
`,k=r.A.div`
  display: flex;
  padding: 20px;

  & img {
    display: flex;
  }

  & > div {
    display: flex;
    flex-direction: column;
    margin-left: 10px;
  }

  & #profile-name {
    font-weight: bold;
    display: inline-flex;
  }

  & #profile-active {
    font-size: 13px;
    display: inline-flex;
  }
`,E=r.A.button`
  border: none;
  width: 100%;
  border-top: 1px solid rgb(29, 28, 29);
  background: transparent;
  display: block;
  height: 33px;
  padding: 5px 20px 5px;
  outline: none;
  cursor: pointer;
`,A=r.A.div`
  display: flex;
  flex: 1;
`,y=r.A.div`
  width: 65px;
  display: inline-flex;
  flex-direction: column;
  align-items: center;
  background: rgba(20, 10, 110);
  border-top: 1px solid rgb(50, 20, 170);
  border-right: 1px solid rgb(50, 20, 170);
  vertical-align: top;
  text-align: center;
  padding: 15px 0 0;
`,z=r.A.nav`
  flex: 1;
  display: inline-flex;
  flex-direction: column;
  background: rgba(20, 10, 110);
  color: rgb(188, 171, 188);
  vertical-align: top;

  & a {
    padding-left: 36px;
    color: inherit;
    text-decoration: none;
    height: 28px;
    line-height: 28px;
    display: flex;
    align-items: center;

    &.selected {
      color: white;
    }
  }

  & .bold {
    color: white;
    font-weight: bold;
  }

  & .count {
    margin-left: auto;
    background: #cd2553;
    border-radius: 16px;
    display: inline-block;
    font-size: 12px;
    font-weight: 700;
    height: 18px;
    line-height: 18px;
    padding: 0 9px;
    color: white;
    margin-right: 16px;
  }

  & h2 {
    height: 36px;
    line-height: 36px;
    margin: 0;
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
    font-size: 15px;
  }
`,C=(r.A.button`
  height: 64px;
  line-height: 64px;
  border: none;
  width: 100%;
  text-align: left;
  border-top: 1px solid rgb(82, 38, 83);
  border-bottom: 1px solid rgb(82, 38, 83);
  font-weight: 900;
  font-size: 24px;
  background: rgba(30, 10, 120);
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
  padding: 0;
  padding-left: 16px;
  margin: 0;
  color: white;
  cursor: pointer;
`,r.A.div`
  height: calc(100vh - 102px);
  overflow-y: auto;
`,r.A.div`
  padding: 10px 0 0;

  & h2 {
    padding-left: 20px;
  }

  & > button {
    width: 100%;
    height: 28px;
    padding: 4px;
    border: none;
    background: rgba(30, 10, 120);
    border-top: 1px solid rgb(28, 29, 28);
    cursor: pointer;

    &:last-of-type {
      border-bottom: 1px solid rgb(28, 29, 28);
    }
  }
`,r.A.div`
  flex: 1;
`),_=r.A.button`
  color: white;
  font-size: 24px;
  display: inline-block;
  width: 40px;
  height: 40px;
  background: rgba(30, 10, 120);
  border: none;
  cursor: pointer;
`,j=r.A.button`
  display: inline-block;
  width: 40px;
  height: 40px;
  border-radius: 10px;
  background: white;
  border: 3px solid #3f0e40;
  margin-bottom: 15px;
  font-size: 18px;
  font-weight: 700;
  color: black;
  cursor: pointer;
`;var M=o(5476),S=o(6159),U=o(8046);const N=()=>n.createElement(U.r0,null,n.createElement(U.wV,null,n.createElement(U.lP,null),n.createElement(U.hj,{className:"fa-solid fa-backward"}),n.createElement(U.hj,{className:"fa-solid fa-pause"}),n.createElement(U.hj,{className:"fa-solid fa-play"}),n.createElement(U.hj,{className:"fa-solid fa-forward"}),n.createElement(U.OQ,{id:"speedSelector"},n.createElement("option",{value:"1/4"},"X 0.25"),n.createElement("option",{value:"1/2"},"X 0.5"),n.createElement("option",{value:"1",selected:!0},"X 1.0"),n.createElement("option",{value:"2"},"X 2.0"),n.createElement("option",{value:"4"},"X 4.0"))),n.createElement(U.wV,null,n.createElement(U.lP,{className:"flex width100"},n.createElement(U.zb,null,n.createElement(U.z2,{type:"range",value:"0",max:"100"}),n.createElement(U.qT,null,n.createElement("span",{id:"currentTime"},"0:00")," / ",n.createElement("span",{id:"totalTime"},"5:00")))))),P=()=>{const{isLogin:e,memberState:t}=(0,M.A)(),{doLogout:o,moveToPath:r}=(0,M.A)(),[i,l,p]=(0,s.A)(""),[g,U,P]=(0,s.A)(""),[T,V]=(0,n.useState)(!1),[D,X]=(0,n.useState)(!1),I=(0,n.useCallback)((e=>{if(e.preventDefault(),!i||!i.trim())return;if(!g||!g.trim())return;const t={name:i,url:g};(0,S.cV)(t).then((()=>{X(!1),p(""),P("")})).catch((e=>{console.dir(e),m.oR.error(e.response?.data,{position:"bottom-center"})}))}),[i,g,p,P]),J=(0,n.useCallback)((()=>{X(!0)}),[]),q=(0,n.useCallback)((()=>{V((e=>!e))}),[]),$=(0,n.useCallback)((()=>{X(!1)}),[]);return e?n.createElement("div",null,n.createElement(w,null,e&&t&&n.createElement(f,null,n.createElement("span",{onClick:q},n.createElement(v,{src:u().url(t.email,{s:"28px",d:"retro"}),alt:t.nickname})),T&&n.createElement(d,{style:{right:0,top:38},show:T,onCloseModal:q},n.createElement(k,null,n.createElement("img",{src:u().url(t.email,{s:"36px",d:"retro"}),alt:t.nickname}),n.createElement("div",null,n.createElement("span",{id:"profile-name"},t.nickname),n.createElement("span",{id:"profile-active"},"Active"))),n.createElement(E,{onClick:()=>{o(),alert("로그아웃되었습니다."),r("/")}},"로그아웃")))),n.createElement(A,null,n.createElement(y,null,t?.workspaces?.map((e=>n.createElement(b.N_,{key:e.id,to:`/workspace/${e.url}/channel/일반`},n.createElement(j,null,e.name.slice(0,1).toUpperCase())))),n.createElement(_,{onClick:J},"+")),n.createElement(z,null,n.createElement(a,null),n.createElement(N,null)),n.createElement(C,null,n.createElement(h.sv,null))),n.createElement(c.A,{show:D,onCloseModal:$},n.createElement("form",{onSubmit:I},n.createElement(x.JU,{id:"workspace-label"},n.createElement("span",null,"워크스페이스 이름"),n.createElement(x.pd,{id:"workspace",value:i,onChange:l})),n.createElement(x.JU,{id:"workspace-url-label"},n.createElement("span",null,"워크스페이스 url"),n.createElement(x.pd,{id:"workspace-url",value:g,onChange:U})),n.createElement(x.$n,{type:"submit"},"생성하기"))),n.createElement(m.N9,{position:"bottom-center"})):n.createElement(h.C5,{to:"/member/login"})}},6942:(e,t,o)=>{o.d(t,{$D:()=>d,$n:()=>p,JU:()=>a,Y9:()=>r,lV:()=>i,mu:()=>s,pd:()=>l,wV:()=>c});var n=o(3530);const r=n.A.header`
  text-align: center;
  font-family: Slack-Larsseit, Helvetica Neue, Helvetica, Segoe UI, Tahoma, Arial, sans-serif;
  font-weight: 700;
  font-size: 48px;
  line-height: 46px;
  letter-spacing: -0.75px;
  margin-top: 50px;
  margin-bottom: 50px;
`,i=n.A.form`
  margin: 0 auto;
  width: 400px;
  max-width: 400px;
`,a=n.A.label`
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
`,l=n.A.input`
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
`,p=n.A.button`
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
`,d=n.A.div`
  color: #e01e5a;
  margin: 8px 0 16px;
  font-weight: bold;
`,c=n.A.div`
  color: #2eb67d;
  font-weight: bold;
`,s=n.A.p`
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