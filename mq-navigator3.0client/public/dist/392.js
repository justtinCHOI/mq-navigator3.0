"use strict";(self.webpackChunkmq_navigator3_0client=self.webpackChunkmq_navigator3_0client||[]).push([[392],{8046:(e,t,l)=>{l.d(t,{By:()=>x,JA:()=>o,JH:()=>E,Mi:()=>i,OQ:()=>p,U9:()=>d,UC:()=>r,Us:()=>c,hj:()=>h,lP:()=>m,lV:()=>u,qT:()=>v,r0:()=>a,wV:()=>s,z2:()=>g,zb:()=>f});var n=l(3530);const a=n.A.div`
  width: 100%;
  height: 120px;
`,r=n.A.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`,c=n.A.div`
  display: flex;
  flex-direction: row;
`,o=n.A.div`
  display: flex;
  flex-direction: column;
  width: 170px;
  justify-content: center;
  align-items: center;
`,i=n.A.div`
  flex: 1;
  display: flex;
  flex-direction: column;
`,s=n.A.div`
  display: flex;
  flex-direction: row;
  flex-shrink: 0;
`,u=n.A.p`
  margin: 10px;
  height: 40px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  font-weight: 500;
`,m=n.A.div`
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
`,d=n.A.input`
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
`,p=n.A.select`
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
`,E=n.A.button`
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
`,x=n.A.button`
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
`,h=n.A.i`
  flex: 1;
  margin: auto;
  padding: 5px;
  font-size: 24px;
  cursor: pointer;
  transition: color 0.3s ease, transform 0.3s ease;

  &:active {
    color: #000;
  }
`,f=n.A.div`
  bottom: 30px;
  position: relative;
  display: flex;
  align-items: center;
  width: 100%;
  margin: 20px;
  height: 40px;
`,g=n.A.input`
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
`,v=n.A.div`
  display: flex;
  justify-content: space-between;
  width: 120px;
  padding: 20px;
  font-size: 14px;
  font-weight: 500;
`},8639:(e,t,l)=>{l.d(t,{a:()=>r,w:()=>a});var n=l(3530);const a=n.A.section`
  margin: 0 10px 10px 10px;
  border: 1px solid #eee;
  display: flex;
  flex-direction: column;
`,r=n.A.div`
  width: 100%;
  display: flex;
  flex: 1;
`},5392:(e,t,l)=>{l.r(t),l.d(t,{default:()=>v});var n=l(6540),a=l(2295),r=l(8639),c=l(246),o=l(8046);const i=()=>{const e=(0,n.useRef)(null);return(0,n.useEffect)((()=>{e.current&&c.Ay.create(e.current,{animation:150,ghostClass:"sortable-ghost"})}),[]),n.createElement(o.UC,null,n.createElement(o.Us,null,n.createElement(o.JA,null,n.createElement(o.UC,null,n.createElement(o.lV,null,"Routes"))),n.createElement(o.Mi,{ref:e},Array.from({length:4},((e,t)=>{const l="Route"+(t+1);return n.createElement(o.U9,{key:t+1,className:"width180px",defaultValue:l})})))))},s=({phase:e})=>n.createElement(o.wV,null,n.createElement(o.lV,{style:{width:"200px"}},e),n.createElement(o.OQ,{className:"width140px"},n.createElement("option",{value:"SKYBLUE",selected:!0},"Sky Blue"),n.createElement("option",{value:"PURPLE"},"Purple"),n.createElement("option",{value:"YELLOW"},"Yellow"),n.createElement("option",{value:"LIGHTGREEN"},"Light Green"))),u=()=>n.createElement(o.UC,null,n.createElement(o.Us,null,n.createElement(o.JA,null,n.createElement(o.UC,null,n.createElement(o.lV,null,"Colors"))),n.createElement(o.Mi,null,n.createElement(o.UC,null,n.createElement(s,{phase:"Initial Phase"}),n.createElement(s,{phase:"Deceleration Phase"}),n.createElement(s,{phase:"Acceleration Phase"}),n.createElement(s,{phase:"Constant Speed Phase"}))))),m=()=>n.createElement(o.UC,null,n.createElement(o.Us,null,n.createElement(o.JA,null,n.createElement(o.UC,null,n.createElement(o.lV,null,"Refresh Interval"))),n.createElement(o.Mi,null,n.createElement(o.wV,null,n.createElement(o.OQ,{className:"width50px"},n.createElement("option",{value:"1",selected:!0},"1"),n.createElement("option",{value:"3"},"3"),n.createElement("option",{value:"10"},"10"),n.createElement("option",{value:"60"},"60")),n.createElement(o.lV,null,"second"))))),d=()=>n.createElement(o.UC,null,n.createElement(o.Us,null,n.createElement(o.JA,null,n.createElement(o.UC,null,n.createElement(o.lV,null,"Tolerance Range"))),n.createElement(o.Mi,null,n.createElement(o.wV,null,n.createElement(o.OQ,{className:"width50px"},n.createElement("option",{value:"5",selected:!0},"5"),n.createElement("option",{value:"10"},"10"),n.createElement("option",{value:"20"},"20")),n.createElement(o.lV,null,"second"))))),p=()=>n.createElement(o.OQ,{className:"width300px"},n.createElement("option",{value:"firstGate",selected:!0},"first gate"),n.createElement("option",{value:"lastGate"},"last gate"),n.createElement("option",{value:"previousGateBasedOnSelected"},"previous gate based on selected"),n.createElement("option",{value:"latestGateBasedOnSelected"},"latest gate based on selected"),n.createElement("option",{value:"nextGateBasedOnSelected"},"next gate based on selected"),n.createElement("option",{value:"previousGateBasedOnCurrent"},"previous gate based on current"),n.createElement("option",{value:"latestGateBasedOnCurrent"},"latest gate based on current"),n.createElement("option",{value:"nextGateBasedOnCurrent"},"next gate based on current")),E=()=>n.createElement(o.wV,null,n.createElement(p,null),n.createElement(o.lV,{style:{width:"50px"}},"~"),n.createElement(p,null)),x=()=>n.createElement(o.UC,null,n.createElement(o.Us,null,n.createElement(o.JA,null,n.createElement(o.UC,null,n.createElement(o.lV,null,"Speed Prediction Interval"))),n.createElement(o.Mi,null,n.createElement(E,null)))),h=()=>{const e=(0,n.useRef)(null);return(0,n.useEffect)((()=>{e.current&&c.Ay.create(e.current,{animation:150,ghostClass:"sortable-ghost"})}),[]),n.createElement(o.UC,null,n.createElement(o.Us,null,n.createElement(o.JA,null,n.createElement(o.UC,null,n.createElement(o.lV,null,"Display Sections"))),n.createElement(o.Mi,{ref:e},Array.from({length:4},((e,t)=>n.createElement(o.wV,{key:t+1},n.createElement(E,null),n.createElement(o.JH,null,n.createElement("i",{className:"fa-solid fa-xmark"}))))))))},f=()=>n.createElement(o.OQ,{className:"width220px"},n.createElement("option",{value:"DISTANCE",selected:!0},"distance"),n.createElement("option",{value:"ELAPSED_TIME"},"elapsed time"),n.createElement("option",{value:"ESTIMATED_TIME"},"estimated time"),n.createElement("option",{value:"ELAPSED_SPEED"},"elapsed speed"),n.createElement("option",{value:"ESTIMATED_SPEED"},"estimated speed")),g=()=>{const e=(0,n.useRef)(null);return(0,n.useEffect)((()=>{e.current&&c.Ay.create(e.current,{animation:150,ghostClass:"sortable-ghost"})}),[]),n.createElement(o.UC,null,n.createElement(o.Us,null,n.createElement(o.JA,null,n.createElement(o.UC,null,n.createElement(o.lV,null,"Section Datas"))),n.createElement(o.Mi,{ref:e},Array.from({length:4},((e,t)=>n.createElement(o.wV,{key:t+1},n.createElement(f,null),n.createElement(o.JH,null,n.createElement("i",{className:"fa-solid fa-xmark"}))))))))},v=()=>n.createElement(r.a,{style:{height:"calc((100vh - 102px) / 2)"}},n.createElement(a.ur,null,n.createElement(r.w,null,n.createElement(u,null)),n.createElement(r.w,null,n.createElement(m,null)),n.createElement(r.w,null,n.createElement(d,null)),n.createElement(r.w,null,n.createElement(x,null)),n.createElement(r.w,null,n.createElement(i,null)),n.createElement(r.w,null,n.createElement(h,null)),n.createElement(r.w,null,n.createElement(g,null))))}}]);