"use strict";(self.webpackChunkmq_navigator3_0client=self.webpackChunkmq_navigator3_0client||[]).push([[934],{7280:(e,t,o)=>{o.d(t,{A:()=>r});var n=o(3530);const i=n.A.div`
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
`,a=n.A.button`
  position: absolute;
  right: 10px;
  top: 6px;
  background: transparent;
  border: none;
  font-size: 30px;
  cursor: pointer;
`;var s=o(6540);const r=({show:e,children:t,onCloseModal:o})=>{const n=(0,s.useCallback)((e=>{e.stopPropagation()}),[]);return e?s.createElement(i,{onClick:o},s.createElement("div",{onClick:n},s.createElement(a,{onClick:o},"×"),t)):null}},8046:(e,t,o)=>{o.d(t,{By:()=>m,JA:()=>r,JH:()=>f,Mi:()=>l,OQ:()=>h,U9:()=>u,UC:()=>a,Us:()=>s,hj:()=>g,lP:()=>p,lV:()=>d,qT:()=>y,r0:()=>i,wV:()=>c,z2:()=>v,zb:()=>b});var n=o(3530);const i=n.A.div`
  width: 100%;
  height: 120px;
`,a=n.A.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`,s=n.A.div`
  display: flex;
  flex-direction: row;
`,r=n.A.div`
  display: flex;
  flex-direction: column;
  width: 170px;
  justify-content: center;
  align-items: center;
`,l=n.A.div`
  flex: 1;
  display: flex;
  flex-direction: column;
`,c=n.A.div`
  display: flex;
  flex-direction: row;
  flex-shrink: 0;
`,d=n.A.p`
  margin: 10px;
  height: 40px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  font-weight: 500;
`,p=n.A.div`
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
`,u=n.A.input`
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
`,h=n.A.select`
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
`,f=n.A.button`
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
`,m=n.A.button`
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
`,g=n.A.i`
  flex: 1;
  margin: auto;
  padding: 5px;
  font-size: 24px;
  cursor: pointer;
  transition: color 0.3s ease, transform 0.3s ease;

  &:active {
    color: #000;
  }
`,b=n.A.div`
  bottom: 30px;
  position: relative;
  display: flex;
  align-items: center;
  width: 100%;
  margin: 20px;
  height: 40px;
`,v=n.A.input`
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
`,y=n.A.div`
  display: flex;
  justify-content: space-between;
  width: 120px;
  padding: 20px;
  font-size: 14px;
  font-weight: 500;
`},9065:(e,t,o)=>{o.d(t,{A:()=>i});var n=o(6540);const i=e=>{const[t,o]=(0,n.useState)(e);return[t,(0,n.useCallback)((e=>{o(e.target.value)}),[]),o]}},6942:(e,t,o)=>{o.d(t,{$D:()=>c,$n:()=>l,JU:()=>s,Y9:()=>i,lV:()=>a,mu:()=>p,pd:()=>r,wV:()=>d});var n=o(3530);const i=n.A.header`
  text-align: center;
  font-family: Slack-Larsseit, Helvetica Neue, Helvetica, Segoe UI, Tahoma, Arial, sans-serif;
  font-weight: 700;
  font-size: 48px;
  line-height: 46px;
  letter-spacing: -0.75px;
  margin-top: 50px;
  margin-bottom: 50px;
`,a=n.A.form`
  margin: 0 auto;
  width: 400px;
  max-width: 400px;
`,s=n.A.label`
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
`,r=n.A.input`
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
`,l=n.A.button`
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
`,d=n.A.div`
  color: #2eb67d;
  font-weight: bold;
`,p=n.A.p`
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
`},8934:(e,t,o)=>{o.r(t),o.d(t,{default:()=>k});var n=o(6540);function i(){return i=Object.assign?Object.assign.bind():function(e){for(var t=1;t<arguments.length;t++){var o=arguments[t];for(var n in o)Object.prototype.hasOwnProperty.call(o,n)&&(e[n]=o[n])}return e},i.apply(this,arguments)}var a=n.createElement("svg",{viewBox:"-2 -5 14 20",height:"100%",width:"100%",style:{position:"absolute",top:0}},n.createElement("path",{d:"M9.9 2.12L7.78 0 4.95 2.828 2.12 0 0 2.12l2.83 2.83L0 7.776 2.123 9.9 4.95 7.07 7.78 9.9 9.9 7.776 7.072 4.95 9.9 2.12",fill:"#fff",fillRule:"evenodd"})),s=n.createElement("svg",{height:"100%",width:"100%",viewBox:"-2 -5 17 21",style:{position:"absolute",top:0}},n.createElement("path",{d:"M11.264 0L5.26 6.004 2.103 2.847 0 4.95l5.26 5.26 8.108-8.107L11.264 0",fill:"#fff",fillRule:"evenodd"}));function r(e){if(7===e.length)return e;for(var t="#",o=1;o<4;o+=1)t+=e[o]+e[o];return t}function l(e,t,o,n,i){return function(e,t,o,n,i){var a=(e-o)/(t-o);if(0===a)return n;if(1===a)return i;for(var s="#",r=1;r<6;r+=2){var l=parseInt(n.substr(r,2),16),c=parseInt(i.substr(r,2),16),d=Math.round((1-a)*l+a*c).toString(16);1===d.length&&(d="0"+d),s+=d}return s}(e,t,o,r(n),r(i))}var c=function(e){function t(t){e.call(this,t);var o=t.height,n=t.width,i=t.checked;this.t=t.handleDiameter||o-2,this.i=Math.max(n-o,n-(o+this.t)/2),this.o=Math.max(0,(o-this.t)/2),this.state={h:i?this.i:this.o},this.l=0,this.u=0,this.p=this.p.bind(this),this.v=this.v.bind(this),this.g=this.g.bind(this),this.k=this.k.bind(this),this.m=this.m.bind(this),this.M=this.M.bind(this),this.T=this.T.bind(this),this.$=this.$.bind(this),this.C=this.C.bind(this),this.D=this.D.bind(this),this.O=this.O.bind(this),this.S=this.S.bind(this)}return e&&(t.__proto__=e),(t.prototype=Object.create(e&&e.prototype)).constructor=t,t.prototype.componentDidMount=function(){this.W=!0},t.prototype.componentDidUpdate=function(e){e.checked!==this.props.checked&&this.setState({h:this.props.checked?this.i:this.o})},t.prototype.componentWillUnmount=function(){this.W=!1},t.prototype.I=function(e){this.H.focus(),this.setState({R:e,j:!0,B:Date.now()})},t.prototype.L=function(e){var t=this.state,o=t.R,n=t.h,i=(this.props.checked?this.i:this.o)+e-o;t.N||e===o||this.setState({N:!0});var a=Math.min(this.i,Math.max(this.o,i));a!==n&&this.setState({h:a})},t.prototype.U=function(e){var t=this.state,o=t.h,n=t.N,i=t.B,a=this.props.checked,s=(this.i+this.o)/2;this.setState({h:this.props.checked?this.i:this.o});var r=Date.now()-i;(!n||r<250||a&&o<=s||!a&&o>=s)&&this.A(e),this.W&&this.setState({N:!1,j:!1}),this.l=Date.now()},t.prototype.p=function(e){e.preventDefault(),"number"==typeof e.button&&0!==e.button||(this.I(e.clientX),window.addEventListener("mousemove",this.v),window.addEventListener("mouseup",this.g))},t.prototype.v=function(e){e.preventDefault(),this.L(e.clientX)},t.prototype.g=function(e){this.U(e),window.removeEventListener("mousemove",this.v),window.removeEventListener("mouseup",this.g)},t.prototype.k=function(e){this.X=null,this.I(e.touches[0].clientX)},t.prototype.m=function(e){this.L(e.touches[0].clientX)},t.prototype.M=function(e){e.preventDefault(),this.U(e)},t.prototype.$=function(e){Date.now()-this.l>50&&(this.A(e),Date.now()-this.u>50&&this.W&&this.setState({j:!1}))},t.prototype.C=function(){this.u=Date.now()},t.prototype.D=function(){this.setState({j:!0})},t.prototype.O=function(){this.setState({j:!1})},t.prototype.S=function(e){this.H=e},t.prototype.T=function(e){e.preventDefault(),this.H.focus(),this.A(e),this.W&&this.setState({j:!1})},t.prototype.A=function(e){var t=this.props;(0,t.onChange)(!t.checked,e,t.id)},t.prototype.render=function(){var e=this.props,t=e.checked,o=e.disabled,a=e.className,s=e.offColor,r=e.onColor,c=e.offHandleColor,d=e.onHandleColor,p=e.checkedIcon,u=e.uncheckedIcon,h=e.checkedHandleIcon,f=e.uncheckedHandleIcon,m=e.boxShadow,g=e.activeBoxShadow,b=e.height,v=e.width,y=e.borderRadius,x=function(e,t){var o={};for(var n in e)Object.prototype.hasOwnProperty.call(e,n)&&-1===t.indexOf(n)&&(o[n]=e[n]);return o}(e,["checked","disabled","className","offColor","onColor","offHandleColor","onHandleColor","checkedIcon","uncheckedIcon","checkedHandleIcon","uncheckedHandleIcon","boxShadow","activeBoxShadow","height","width","borderRadius","handleDiameter"]),w=this.state,k=w.h,E=w.N,T=w.j,C={position:"relative",display:"inline-block",textAlign:"left",opacity:o?.5:1,direction:"ltr",borderRadius:b/2,WebkitTransition:"opacity 0.25s",MozTransition:"opacity 0.25s",transition:"opacity 0.25s",touchAction:"none",WebkitTapHighlightColor:"rgba(0, 0, 0, 0)",WebkitUserSelect:"none",MozUserSelect:"none",msUserSelect:"none",userSelect:"none"},_={height:b,width:v,margin:Math.max(0,(this.t-b)/2),position:"relative",background:l(k,this.i,this.o,s,r),borderRadius:"number"==typeof y?y:b/2,cursor:o?"default":"pointer",WebkitTransition:E?null:"background 0.25s",MozTransition:E?null:"background 0.25s",transition:E?null:"background 0.25s"},I={height:b,width:Math.min(1.5*b,v-(this.t+b)/2+1),position:"relative",opacity:(k-this.o)/(this.i-this.o),pointerEvents:"none",WebkitTransition:E?null:"opacity 0.25s",MozTransition:E?null:"opacity 0.25s",transition:E?null:"opacity 0.25s"},A={height:b,width:Math.min(1.5*b,v-(this.t+b)/2+1),position:"absolute",opacity:1-(k-this.o)/(this.i-this.o),right:0,top:0,pointerEvents:"none",WebkitTransition:E?null:"opacity 0.25s",MozTransition:E?null:"opacity 0.25s",transition:E?null:"opacity 0.25s"},S={height:this.t,width:this.t,background:l(k,this.i,this.o,c,d),display:"inline-block",cursor:o?"default":"pointer",borderRadius:"number"==typeof y?y-1:"50%",position:"absolute",transform:"translateX("+k+"px)",top:Math.max(0,(b-this.t)/2),outline:0,boxShadow:T?g:m,border:0,WebkitTransition:E?null:"background-color 0.25s, transform 0.25s, box-shadow 0.15s",MozTransition:E?null:"background-color 0.25s, transform 0.25s, box-shadow 0.15s",transition:E?null:"background-color 0.25s, transform 0.25s, box-shadow 0.15s"},M={height:this.t,width:this.t,opacity:Math.max(2*(1-(k-this.o)/(this.i-this.o)-.5),0),position:"absolute",left:0,top:0,pointerEvents:"none",WebkitTransition:E?null:"opacity 0.25s",MozTransition:E?null:"opacity 0.25s",transition:E?null:"opacity 0.25s"},L={height:this.t,width:this.t,opacity:Math.max(2*((k-this.o)/(this.i-this.o)-.5),0),position:"absolute",left:0,top:0,pointerEvents:"none",WebkitTransition:E?null:"opacity 0.25s",MozTransition:E?null:"opacity 0.25s",transition:E?null:"opacity 0.25s"};return n.createElement("div",{className:a,style:C},n.createElement("div",{className:"react-switch-bg",style:_,onClick:o?null:this.T,onMouseDown:function(e){return e.preventDefault()}},p&&n.createElement("div",{style:I},p),u&&n.createElement("div",{style:A},u)),n.createElement("div",{className:"react-switch-handle",style:S,onClick:function(e){return e.preventDefault()},onMouseDown:o?null:this.p,onTouchStart:o?null:this.k,onTouchMove:o?null:this.m,onTouchEnd:o?null:this.M,onTouchCancel:o?null:this.O},f&&n.createElement("div",{style:M},f),h&&n.createElement("div",{style:L},h)),n.createElement("input",i({},{type:"checkbox",role:"switch","aria-checked":t,checked:t,disabled:o,style:{border:0,clip:"rect(0 0 0 0)",height:1,margin:-1,overflow:"hidden",padding:0,position:"absolute",width:1}},x,{ref:this.S,onFocus:this.D,onBlur:this.O,onKeyUp:this.C,onChange:this.$})))},t}(n.Component);c.defaultProps={disabled:!1,offColor:"#888",onColor:"#080",offHandleColor:"#fff",onHandleColor:"#fff",uncheckedIcon:a,checkedIcon:s,boxShadow:null,activeBoxShadow:"0 0 2px 3px #3bf",height:28,width:56};var d=o(7767),p=o(7224),u=o(9360),h=o(1468);var f=o(7280),m=o(9065),g=o(6942),b=o(2845),v=o(6159);const y=({show:e,onCloseModal:t,setShowInviteWorkspaceModal:o})=>{const{workspaceUrl:i}=(0,d.g)(),[a,s,r]=(0,m.A)(""),l=(0,n.useCallback)((e=>{e.preventDefault(),a&&a.trim()&&i&&(0,v.XJ)(i,a).then((()=>{o(!1),r("")})).catch((e=>{console.dir(e),b.oR.error(e.response?.data,{position:"bottom-center"})}))}),[a,i,o,r]);return n.createElement(f.A,{show:e,onCloseModal:t},n.createElement("form",{onSubmit:l},n.createElement(g.JU,{id:"member-label"},n.createElement("span",null,"이메일"),n.createElement(g.pd,{id:"member",type:"email",value:a,onChange:s})),n.createElement(g.$n,{type:"submit"},"초대하기")))};var x=o(8046);var w=o(5074);const k=()=>{const{workspaceState:e}=(()=>{const e=(0,h.d4)((e=>e.workspaceSlice)),t=(0,h.wA)(),{url:o}=(0,d.g)(),i=(0,h.d4)((e=>e.memberSlice)),a=(0,h.d4)((e=>e.workspaceSlice));return(0,n.useEffect)((()=>{if(i?.workspaces){const e=i.workspaces.find((e=>e.url===o));e&&t((0,u.ws)(e))}}),[o,i?.workspaces,t]),{workspaceState:a,workspaces:e,getWorkspace:e=>{t((0,u.Cg)(e))},postCreateWorkspace:e=>{t((0,u.Ij)(e))},postAddWorkspaceMember:(e,o)=>{t((0,u.zS)({workspaceUrl:e,memberAddParam:o}))}}})(),{moveToAnalyze:t,moveToSetting:o}=function(){const e=(0,d.Zp)(),{url:t}=(0,d.g)();return{moveToAnalyze:()=>{e({pathname:`/workspace/${t}/analyze`})},moveToAnalyzeWithParam:t=>{e({pathname:`/workspace/${t}/analyze`})},moveToSetting:()=>{e({pathname:`/workspace/${t}/setting`})},moveToSettingWithParam:t=>{e({pathname:`/workspace/${t}/setting`})}}}(),[i,a]=(0,n.useState)(!1),{isLive:s,handleLiveToggle:r}=(()=>{const e=(0,h.wA)();return{isLive:(0,h.d4)((e=>e.playbarSlice.isLive)),handleLiveToggle:()=>{e((0,w.pD)())}}})(),l=(0,n.useCallback)((()=>{a(!0)}),[]),f=(0,n.useCallback)((()=>{a(!1)}),[]),m=(0,n.useCallback)((()=>t()),[t]),g=(0,n.useCallback)((()=>o()),[o]);return n.createElement(p.mc,null,n.createElement(p.Y9,null,n.createElement("div",{style:{display:"flex",flex:1,justifyContent:"flex-start",alignItems:"center",gap:"15px"}},n.createElement("span",null,e?.name),n.createElement(c,{onChange:r,checked:s,offColor:"#888",onColor:"#ff4d4d",offHandleColor:"#fff",onHandleColor:"#fff",handleDiameter:21,height:30,width:70,className:"react-switch",uncheckedIcon:!1,checkedIcon:!1,boxShadow:"0px 1px 5px rgba(0, 0, 0, 0.6)",activeBoxShadow:"0px 0px 10px rgba(255, 77, 77, 0.5)"}),n.createElement("span",null,s?"Live Data Mode":"Data Standby Mode")),n.createElement("div",{style:{display:"flex",flex:1,justifyContent:"flex-end",alignItems:"center"}},n.createElement("span",null,e?.members.length),n.createElement(x.JH,{onClick:l},n.createElement("i",{className:"fa-lg fa-solid fa-user-plus"})),n.createElement(x.JH,{onClick:m},n.createElement("i",{className:"fa-regular fa-map fa-lg"})),n.createElement(x.JH,{onClick:g},n.createElement("i",{className:"fa-lg fa-solid fa-sliders"})))),n.createElement(d.sv,null),n.createElement(y,{show:i,onCloseModal:f,setShowInviteWorkspaceModal:a}))}},7224:(e,t,o)=>{o.d(t,{Y9:()=>a,mc:()=>i});var n=o(3530);const i=n.A.div`
  display: flex;
  flex-wrap: wrap;
  height: calc(100vh - 38px);
  flex-flow: column;
  position: relative;
`,a=n.A.header`
  height: 64px;
  display: flex;
  width: 100%;
  --saf-0: rgba(var(--sk_foreground_low, 29, 28, 29), 0.13);
  box-shadow: 0 1px 0 var(--saf-0);
  padding: 20px 16px 20px 20px;
  font-weight: bold;
  align-items: center;
`;n.A.div`
  position: absolute;
  top: 64px;
  left: 0;
  width: 100%;
  height: calc(100% - 64px);
  background: white;
  opacity: 0.7;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 40px;
`},2845:(e,t,o)=>{o.d(t,{N9:()=>H,oR:()=>M});var n=o(6540);function i(e){var t,o,n="";if("string"==typeof e||"number"==typeof e)n+=e;else if("object"==typeof e)if(Array.isArray(e)){var a=e.length;for(t=0;t<a;t++)e[t]&&(o=i(e[t]))&&(n&&(n+=" "),n+=o)}else for(o in e)e[o]&&(n&&(n+=" "),n+=o);return n}const a=function(){for(var e,t,o=0,n="",a=arguments.length;o<a;o++)(e=arguments[o])&&(t=i(e))&&(n&&(n+=" "),n+=t);return n},s=e=>"number"==typeof e&&!isNaN(e),r=e=>"string"==typeof e,l=e=>"function"==typeof e,c=e=>r(e)||l(e)?e:null,d=e=>(0,n.isValidElement)(e)||r(e)||l(e)||s(e);function p(e){let{enter:t,exit:o,appendPosition:i=!1,collapse:a=!0,collapseDuration:s=300}=e;return function(e){let{children:r,position:l,preventExitTransition:c,done:d,nodeRef:p,isIn:u,playToast:h}=e;const f=i?`${t}--${l}`:t,m=i?`${o}--${l}`:o,g=(0,n.useRef)(0);return(0,n.useLayoutEffect)((()=>{const e=p.current,t=f.split(" "),o=n=>{n.target===p.current&&(h(),e.removeEventListener("animationend",o),e.removeEventListener("animationcancel",o),0===g.current&&"animationcancel"!==n.type&&e.classList.remove(...t))};e.classList.add(...t),e.addEventListener("animationend",o),e.addEventListener("animationcancel",o)}),[]),(0,n.useEffect)((()=>{const e=p.current,t=()=>{e.removeEventListener("animationend",t),a?function(e,t,o){void 0===o&&(o=300);const{scrollHeight:n,style:i}=e;requestAnimationFrame((()=>{i.minHeight="initial",i.height=n+"px",i.transition=`all ${o}ms`,requestAnimationFrame((()=>{i.height="0",i.padding="0",i.margin="0",setTimeout(t,o)}))}))}(e,d,s):d()};u||(c?t():(g.current=1,e.className+=` ${m}`,e.addEventListener("animationend",t)))}),[u]),n.createElement(n.Fragment,null,r)}}function u(e,t){return null!=e?{content:e.content,containerId:e.props.containerId,id:e.props.toastId,theme:e.props.theme,type:e.props.type,data:e.props.data||{},isLoading:e.props.isLoading,icon:e.props.icon,status:t}:{}}const h=new Map;let f=[];const m=new Set,g=e=>m.forEach((t=>t(e))),b=()=>h.size>0;function v(e,t){var o;if(t)return!(null==(o=h.get(t))||!o.isToastActive(e));let n=!1;return h.forEach((t=>{t.isToastActive(e)&&(n=!0)})),n}function y(e,t){d(e)&&(b()||f.push({content:e,options:t}),h.forEach((o=>{o.buildToast(e,t)})))}function x(e,t){h.forEach((o=>{null!=t&&null!=t&&t.containerId?(null==t?void 0:t.containerId)===o.id&&o.toggle(e,null==t?void 0:t.id):o.toggle(e,null==t?void 0:t.id)}))}function w(e){const{subscribe:t,getSnapshot:o,setProps:i}=(0,n.useRef)(function(e){const t=e.containerId||1;return{subscribe(o){const i=function(e,t,o){let i=1,a=0,p=[],h=[],f=[],m=t;const g=new Map,b=new Set,v=()=>{f=Array.from(g.values()),b.forEach((e=>e()))},y=e=>{h=null==e?[]:h.filter((t=>t!==e)),v()},x=e=>{const{toastId:t,onOpen:i,updateId:a,children:s}=e.props,r=null==a;e.staleId&&g.delete(e.staleId),g.set(t,e),h=[...h,e.props.toastId].filter((t=>t!==e.staleId)),v(),o(u(e,r?"added":"updated")),r&&l(i)&&i((0,n.isValidElement)(s)&&s.props)};return{id:e,props:m,observe:e=>(b.add(e),()=>b.delete(e)),toggle:(e,t)=>{g.forEach((o=>{null!=t&&t!==o.props.toastId||l(o.toggle)&&o.toggle(e)}))},removeToast:y,toasts:g,clearQueue:()=>{a-=p.length,p=[]},buildToast:(t,h)=>{if((t=>{let{containerId:o,toastId:n,updateId:i}=t;const a=o?o!==e:1!==e,s=g.has(n)&&null==i;return a||s})(h))return;const{toastId:f,updateId:b,data:w,staleId:k,delay:E}=h,T=()=>{y(f)},C=null==b;C&&a++;const _={...m,style:m.toastStyle,key:i++,...Object.fromEntries(Object.entries(h).filter((e=>{let[t,o]=e;return null!=o}))),toastId:f,updateId:b,data:w,closeToast:T,isIn:!1,className:c(h.className||m.toastClassName),bodyClassName:c(h.bodyClassName||m.bodyClassName),progressClassName:c(h.progressClassName||m.progressClassName),autoClose:!h.isLoading&&(I=h.autoClose,A=m.autoClose,!1===I||s(I)&&I>0?I:A),deleteToast(){const e=g.get(f),{onClose:t,children:i}=e.props;l(t)&&t((0,n.isValidElement)(i)&&i.props),o(u(e,"removed")),g.delete(f),a--,a<0&&(a=0),p.length>0?x(p.shift()):v()}};var I,A;_.closeButton=m.closeButton,!1===h.closeButton||d(h.closeButton)?_.closeButton=h.closeButton:!0===h.closeButton&&(_.closeButton=!d(m.closeButton)||m.closeButton);let S=t;(0,n.isValidElement)(t)&&!r(t.type)?S=(0,n.cloneElement)(t,{closeToast:T,toastProps:_,data:w}):l(t)&&(S=t({closeToast:T,toastProps:_,data:w}));const M={content:S,props:_,staleId:k};m.limit&&m.limit>0&&a>m.limit&&C?p.push(M):s(E)?setTimeout((()=>{x(M)}),E):x(M)},setProps(e){m=e},setToggle:(e,t)=>{g.get(e).toggle=t},isToastActive:e=>h.some((t=>t===e)),getSnapshot:()=>m.newestOnTop?f.reverse():f}}(t,e,g);h.set(t,i);const a=i.observe(o);return f.forEach((e=>y(e.content,e.options))),f=[],()=>{a(),h.delete(t)}},setProps(e){var o;null==(o=h.get(t))||o.setProps(e)},getSnapshot(){var e;return null==(e=h.get(t))?void 0:e.getSnapshot()}}}(e)).current;i(e);const a=(0,n.useSyncExternalStore)(t,o,o);return{getToastToRender:function(e){if(!a)return[];const t=new Map;return a.forEach((e=>{const{position:o}=e.props;t.has(o)||t.set(o,[]),t.get(o).push(e)})),Array.from(t,(t=>e(t[0],t[1])))},isToastActive:v,count:null==a?void 0:a.length}}function k(e){const[t,o]=(0,n.useState)(!1),[i,a]=(0,n.useState)(!1),s=(0,n.useRef)(null),r=(0,n.useRef)({start:0,delta:0,removalDistance:0,canCloseOnClick:!0,canDrag:!1,didMove:!1}).current,{autoClose:l,pauseOnHover:c,closeToast:d,onClick:p,closeOnClick:u}=e;var f,m;function g(){o(!0)}function b(){o(!1)}function v(o){const n=s.current;r.canDrag&&n&&(r.didMove=!0,t&&b(),r.delta="x"===e.draggableDirection?o.clientX-r.start:o.clientY-r.start,r.start!==o.clientX&&(r.canCloseOnClick=!1),n.style.transform=`translate3d(${"x"===e.draggableDirection?`${r.delta}px, var(--y)`:`0, calc(${r.delta}px + var(--y))`},0)`,n.style.opacity=""+(1-Math.abs(r.delta/r.removalDistance)))}function y(){document.removeEventListener("pointermove",v),document.removeEventListener("pointerup",y);const t=s.current;if(r.canDrag&&r.didMove&&t){if(r.canDrag=!1,Math.abs(r.delta)>r.removalDistance)return a(!0),e.closeToast(),void e.collapseAll();t.style.transition="transform 0.2s, opacity 0.2s",t.style.removeProperty("transform"),t.style.removeProperty("opacity")}}null==(m=h.get((f={id:e.toastId,containerId:e.containerId,fn:o}).containerId||1))||m.setToggle(f.id,f.fn),(0,n.useEffect)((()=>{if(e.pauseOnFocusLoss)return document.hasFocus()||b(),window.addEventListener("focus",g),window.addEventListener("blur",b),()=>{window.removeEventListener("focus",g),window.removeEventListener("blur",b)}}),[e.pauseOnFocusLoss]);const x={onPointerDown:function(t){if(!0===e.draggable||e.draggable===t.pointerType){r.didMove=!1,document.addEventListener("pointermove",v),document.addEventListener("pointerup",y);const o=s.current;r.canCloseOnClick=!0,r.canDrag=!0,o.style.transition="none","x"===e.draggableDirection?(r.start=t.clientX,r.removalDistance=o.offsetWidth*(e.draggablePercent/100)):(r.start=t.clientY,r.removalDistance=o.offsetHeight*(80===e.draggablePercent?1.5*e.draggablePercent:e.draggablePercent)/100)}},onPointerUp:function(t){const{top:o,bottom:n,left:i,right:a}=s.current.getBoundingClientRect();"touchend"!==t.nativeEvent.type&&e.pauseOnHover&&t.clientX>=i&&t.clientX<=a&&t.clientY>=o&&t.clientY<=n?b():g()}};return l&&c&&(x.onMouseEnter=b,e.stacked||(x.onMouseLeave=g)),u&&(x.onClick=e=>{p&&p(e),r.canCloseOnClick&&d()}),{playToast:g,pauseToast:b,isRunning:t,preventExitTransition:i,toastRef:s,eventHandlers:x}}function E(e){let{delay:t,isRunning:o,closeToast:i,type:s="default",hide:r,className:c,style:d,controlledProgress:p,progress:u,rtl:h,isIn:f,theme:m}=e;const g=r||p&&0===u,b={...d,animationDuration:`${t}ms`,animationPlayState:o?"running":"paused"};p&&(b.transform=`scaleX(${u})`);const v=a("Toastify__progress-bar",p?"Toastify__progress-bar--controlled":"Toastify__progress-bar--animated",`Toastify__progress-bar-theme--${m}`,`Toastify__progress-bar--${s}`,{"Toastify__progress-bar--rtl":h}),y=l(c)?c({rtl:h,type:s,defaultClassName:v}):a(v,c),x={[p&&u>=1?"onTransitionEnd":"onAnimationEnd"]:p&&u<1?null:()=>{f&&i()}};return n.createElement("div",{className:"Toastify__progress-bar--wrp","data-hidden":g},n.createElement("div",{className:`Toastify__progress-bar--bg Toastify__progress-bar-theme--${m} Toastify__progress-bar--${s}`}),n.createElement("div",{role:"progressbar","aria-hidden":g?"true":"false","aria-label":"notification timer",className:y,style:b,...x}))}let T=1;const C=()=>""+T++;function _(e){return e&&(r(e.toastId)||s(e.toastId))?e.toastId:C()}function I(e,t){return y(e,t),t.toastId}function A(e,t){return{...t,type:t&&t.type||e,toastId:_(t)}}function S(e){return(t,o)=>I(t,A(e,o))}function M(e,t){return I(e,A("default",t))}M.loading=(e,t)=>I(e,A("default",{isLoading:!0,autoClose:!1,closeOnClick:!1,closeButton:!1,draggable:!1,...t})),M.promise=function(e,t,o){let n,{pending:i,error:a,success:s}=t;i&&(n=r(i)?M.loading(i,o):M.loading(i.render,{...o,...i}));const c={isLoading:null,autoClose:null,closeOnClick:null,closeButton:null,draggable:null},d=(e,t,i)=>{if(null==t)return void M.dismiss(n);const a={type:e,...c,...o,data:i},s=r(t)?{render:t}:t;return n?M.update(n,{...a,...s}):M(s.render,{...a,...s}),i},p=l(e)?e():e;return p.then((e=>d("success",s,e))).catch((e=>d("error",a,e))),p},M.success=S("success"),M.info=S("info"),M.error=S("error"),M.warning=S("warning"),M.warn=M.warning,M.dark=(e,t)=>I(e,A("default",{theme:"dark",...t})),M.dismiss=function(e){!function(e){var t;if(b()){if(null==e||r(t=e)||s(t))h.forEach((t=>{t.removeToast(e)}));else if(e&&("containerId"in e||"id"in e)){const t=h.get(e.containerId);t?t.removeToast(e.id):h.forEach((t=>{t.removeToast(e.id)}))}}else f=f.filter((t=>null!=e&&t.options.toastId!==e))}(e)},M.clearWaitingQueue=function(e){void 0===e&&(e={}),h.forEach((t=>{!t.props.limit||e.containerId&&t.id!==e.containerId||t.clearQueue()}))},M.isActive=v,M.update=function(e,t){void 0===t&&(t={});const o=((e,t)=>{var o;let{containerId:n}=t;return null==(o=h.get(n||1))?void 0:o.toasts.get(e)})(e,t);if(o){const{props:n,content:i}=o,a={delay:100,...n,...t,toastId:t.toastId||e,updateId:C()};a.toastId!==e&&(a.staleId=e);const s=a.render||i;delete a.render,I(s,a)}},M.done=e=>{M.update(e,{progress:1})},M.onChange=function(e){return m.add(e),()=>{m.delete(e)}},M.play=e=>x(!0,e),M.pause=e=>x(!1,e);const L="undefined"!=typeof window?n.useLayoutEffect:n.useEffect,z=e=>{let{theme:t,type:o,isLoading:i,...a}=e;return n.createElement("svg",{viewBox:"0 0 24 24",width:"100%",height:"100%",fill:"colored"===t?"currentColor":`var(--toastify-icon-color-${o})`,...a})},N={info:function(e){return n.createElement(z,{...e},n.createElement("path",{d:"M12 0a12 12 0 1012 12A12.013 12.013 0 0012 0zm.25 5a1.5 1.5 0 11-1.5 1.5 1.5 1.5 0 011.5-1.5zm2.25 13.5h-4a1 1 0 010-2h.75a.25.25 0 00.25-.25v-4.5a.25.25 0 00-.25-.25h-.75a1 1 0 010-2h1a2 2 0 012 2v4.75a.25.25 0 00.25.25h.75a1 1 0 110 2z"}))},warning:function(e){return n.createElement(z,{...e},n.createElement("path",{d:"M23.32 17.191L15.438 2.184C14.728.833 13.416 0 11.996 0c-1.42 0-2.733.833-3.443 2.184L.533 17.448a4.744 4.744 0 000 4.368C1.243 23.167 2.555 24 3.975 24h16.05C22.22 24 24 22.044 24 19.632c0-.904-.251-1.746-.68-2.44zm-9.622 1.46c0 1.033-.724 1.823-1.698 1.823s-1.698-.79-1.698-1.822v-.043c0-1.028.724-1.822 1.698-1.822s1.698.79 1.698 1.822v.043zm.039-12.285l-.84 8.06c-.057.581-.408.943-.897.943-.49 0-.84-.367-.896-.942l-.84-8.065c-.057-.624.25-1.095.779-1.095h1.91c.528.005.84.476.784 1.1z"}))},success:function(e){return n.createElement(z,{...e},n.createElement("path",{d:"M12 0a12 12 0 1012 12A12.014 12.014 0 0012 0zm6.927 8.2l-6.845 9.289a1.011 1.011 0 01-1.43.188l-4.888-3.908a1 1 0 111.25-1.562l4.076 3.261 6.227-8.451a1 1 0 111.61 1.183z"}))},error:function(e){return n.createElement(z,{...e},n.createElement("path",{d:"M11.983 0a12.206 12.206 0 00-8.51 3.653A11.8 11.8 0 000 12.207 11.779 11.779 0 0011.8 24h.214A12.111 12.111 0 0024 11.791 11.766 11.766 0 0011.983 0zM10.5 16.542a1.476 1.476 0 011.449-1.53h.027a1.527 1.527 0 011.523 1.47 1.475 1.475 0 01-1.449 1.53h-.027a1.529 1.529 0 01-1.523-1.47zM11 12.5v-6a1 1 0 012 0v6a1 1 0 11-2 0z"}))},spinner:function(){return n.createElement("div",{className:"Toastify__spinner"})}},D=e=>{const{isRunning:t,preventExitTransition:o,toastRef:i,eventHandlers:s,playToast:r}=k(e),{closeButton:c,children:d,autoClose:p,onClick:u,type:h,hideProgressBar:f,closeToast:m,transition:g,position:b,className:v,style:y,bodyClassName:x,bodyStyle:w,progressClassName:T,progressStyle:C,updateId:_,role:I,progress:A,rtl:S,toastId:M,deleteToast:L,isIn:z,isLoading:D,closeOnClick:$,theme:P}=e,O=a("Toastify__toast",`Toastify__toast-theme--${P}`,`Toastify__toast--${h}`,{"Toastify__toast--rtl":S},{"Toastify__toast--close-on-click":$}),H=l(v)?v({rtl:S,position:b,type:h,defaultClassName:O}):a(O,v),B=function(e){let{theme:t,type:o,isLoading:i,icon:a}=e,s=null;const r={theme:t,type:o};return!1===a||(l(a)?s=a({...r,isLoading:i}):(0,n.isValidElement)(a)?s=(0,n.cloneElement)(a,r):i?s=N.spinner():(e=>e in N)(o)&&(s=N[o](r))),s}(e),R=!!A||!p,j={closeToast:m,type:h,theme:P};let W=null;return!1===c||(W=l(c)?c(j):(0,n.isValidElement)(c)?(0,n.cloneElement)(c,j):function(e){let{closeToast:t,theme:o,ariaLabel:i="close"}=e;return n.createElement("button",{className:`Toastify__close-button Toastify__close-button--${o}`,type:"button",onClick:e=>{e.stopPropagation(),t(e)},"aria-label":i},n.createElement("svg",{"aria-hidden":"true",viewBox:"0 0 14 16"},n.createElement("path",{fillRule:"evenodd",d:"M7.71 8.23l3.75 3.75-1.48 1.48-3.75-3.75-3.75 3.75L1 11.98l3.75-3.75L1 4.48 2.48 3l3.75 3.75L9.98 3l1.48 1.48-3.75 3.75z"})))}(j)),n.createElement(g,{isIn:z,done:L,position:b,preventExitTransition:o,nodeRef:i,playToast:r},n.createElement("div",{id:M,onClick:u,"data-in":z,className:H,...s,style:y,ref:i},n.createElement("div",{...z&&{role:I},className:l(x)?x({type:h}):a("Toastify__toast-body",x),style:w},null!=B&&n.createElement("div",{className:a("Toastify__toast-icon",{"Toastify--animate-icon Toastify__zoom-enter":!D})},B),n.createElement("div",null,d)),W,n.createElement(E,{..._&&!R?{key:`pb-${_}`}:{},rtl:S,theme:P,delay:p,isRunning:t,isIn:z,closeToast:m,hide:f,type:h,style:C,className:T,controlledProgress:R,progress:A||0})))},$=function(e,t){return void 0===t&&(t=!1),{enter:`Toastify--animate Toastify__${e}-enter`,exit:`Toastify--animate Toastify__${e}-exit`,appendPosition:t}},P=p($("bounce",!0)),O=(p($("slide",!0)),p($("zoom")),p($("flip")),{position:"top-right",transition:P,autoClose:5e3,closeButton:!0,pauseOnHover:!0,pauseOnFocusLoss:!0,draggable:"touch",draggablePercent:80,draggableDirection:"x",role:"alert",theme:"light"});function H(e){let t={...O,...e};const o=e.stacked,[i,s]=(0,n.useState)(!0),r=(0,n.useRef)(null),{getToastToRender:d,isToastActive:p,count:u}=w(t),{className:h,style:f,rtl:m,containerId:g}=t;function b(e){const t=a("Toastify__toast-container",`Toastify__toast-container--${e}`,{"Toastify__toast-container--rtl":m});return l(h)?h({position:e,rtl:m,defaultClassName:t}):a(t,c(h))}function v(){o&&(s(!0),M.play())}return L((()=>{if(o){var e;const o=r.current.querySelectorAll('[data-in="true"]'),n=12,a=null==(e=t.position)?void 0:e.includes("top");let s=0,l=0;Array.from(o).reverse().forEach(((e,t)=>{const o=e;o.classList.add("Toastify__toast--stacked"),t>0&&(o.dataset.collapsed=`${i}`),o.dataset.pos||(o.dataset.pos=a?"top":"bot");const r=s*(i?.2:1)+(i?0:n*t);o.style.setProperty("--y",`${a?r:-1*r}px`),o.style.setProperty("--g",`${n}`),o.style.setProperty("--s",""+(1-(i?l:0))),s+=o.offsetHeight,l+=.025}))}}),[i,u,o]),n.createElement("div",{ref:r,className:"Toastify",id:g,onMouseEnter:()=>{o&&(s(!1),M.pause())},onMouseLeave:v},d(((e,t)=>{const i=t.length?{...f}:{...f,pointerEvents:"none"};return n.createElement("div",{className:b(e),style:i,key:`container-${e}`},t.map((e=>{let{content:t,props:i}=e;return n.createElement(D,{...i,stacked:o,collapseAll:v,isIn:p(i.toastId,i.containerId),style:i.style,key:`toast-${i.key}`},t)})))})))}}}]);