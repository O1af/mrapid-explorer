import{G as _e,a as p,b as V,o as D,j as re,H as Ie,c as r,I as Q,i as c,d as $,k as Ne,s as S,S as L,F as Se,e as Fe,f as ye,t as m,A as Te,B as Le,J}from"./index.a0fbee3f.js";async function je(n){let e="";return n.zip_code.forEach(s=>e+="zip_code="+s.id+"&"),n.type.forEach(s=>e+="type="+s.id+"&"),n.pollutant.forEach(s=>e+="pollutant="+s.id+"&"),(await(await fetch(`https://mrapid-api3-r2oaltsiuq-uc.a.run.app/sensor?${e}`)).json()).SensorList}async function Me(n){let e="";return n.sensor.forEach(s=>e+="sensor="+s.id+"&"),n.pollutant.forEach(s=>e+="pollutant="+s.id+"&"),n.pollutant.forEach(s=>e+="unit="+s.name.split(" ").pop()+"&"),e+="start="+n.start+"&",e+="end="+n.end+"&",e+="step="+n.step+"&",console.log(e),await(await fetch(`https://mrapid-api3-r2oaltsiuq-uc.a.run.app/history?${e}`)).json()}const Be=function(n){let e=[];const l=Object.keys(n[0]);e.push(l.join(","));for(const u of n){const d=l.map(y=>u[y]);e.push(d.join(","))}e=e.join(`
`),console.log(e);const t=new Blob([e],{type:"text/csv"}),s=window.URL.createObjectURL(t),a=document.createElement("a");a.setAttribute("href",s),a.setAttribute("download","download.csv"),a.click()},Re=n=>{const e=_e({multiple:!1,disabled:!1,optionToValue:o=>o,isOptionDisabled:o=>!1},n),l=o=>{if(e.multiple&&Array.isArray(o))return o;if(!e.multiple&&!Array.isArray(o))return o!==null?[o]:[];throw new Error(`Incompatible value type for ${e.multiple?"multple":"single"} select.`)},[t,s]=p(e.initialValue!==void 0?l(e.initialValue):[]),a=()=>e.multiple?t():t()[0]||null,u=o=>s(l(o)),d=()=>s([]),y=()=>!!(e.multiple?a().length:a());V(D(t,()=>e.onChange?.(a()),{defer:!0}));const[f,w]=p(""),B=()=>w(""),R=()=>!!f().length;V(D(f,o=>e.onInput?.(o),{defer:!0})),V(D(f,o=>{o&&!h()&&g(!0)},{defer:!0}));const k=typeof e.options=="function"?re(()=>e.options(f()),e.options(f())):()=>e.options,Z=()=>k().length,O=o=>{if(e.isOptionDisabled(o))return;const C=e.optionToValue(o);e.multiple?u([...t(),C]):(u(C),E(!1)),g(!1)},[Y,E]=p(!1),[h,g]=p(!1),z=()=>g(!h()),[P,A]=p(-1),x=()=>k()[P()],I=o=>o===x(),G=o=>{Z()||A(-1);const C=Z()-1,te=o==="next"?1:-1;let _=P()+te;_>C&&(_=0),_<0&&(_=C),A(_)},U=()=>G("previous"),H=()=>G("next");V(D(k,o=>{h()&&A(Math.min(0,o.length-1))},{defer:!0})),V(D(()=>e.disabled,o=>{o&&h()&&g(!1)})),V(D(h,o=>{o?(P()===-1&&H(),E(!0)):(P()>-1&&A(-1),w(""))},{defer:!0})),V(D(P,o=>{o>-1&&!h()&&g(!0)},{defer:!0}));const N=()=>E(!0),q=()=>{E(!1),g(!1)},F=o=>o.preventDefault(),T=o=>{!e.disabled&&!R()&&z()},X=o=>{w(o.target.value)},ee=o=>{switch(o.key){case"ArrowDown":H();break;case"ArrowUp":U();break;case"Enter":if(h()&&x()){O(x());break}return;case"Escape":if(h()){g(!1);break}return;case"Delete":case"Backspace":if(f())return;if(e.multiple){const C=a();u([...C.slice(0,-1)])}else d();break;case" ":if(f())return;h()?x()&&O(x()):g(!0);break;case"Tab":if(x()&&h()){O(x());break}return;default:return}o.preventDefault(),o.stopPropagation()};return{options:k,value:a,setValue:u,hasValue:y,clearValue:d,inputValue:f,setInputValue:w,hasInputValue:R,clearInputValue:B,isOpen:h,setIsOpen:g,toggleOpen:z,isActive:Y,setIsActive:E,get multiple(){return e.multiple},get disabled(){return e.disabled},pickOption:O,isOptionFocused:I,isOptionDisabled:e.isOptionDisabled,onFocusIn:N,onFocusOut:q,onMouseDown:F,onClick:T,onInput:X,onKeyDown:ee}},Ze=m("<div></div>",2),Ge=m('<div class="solid-select-control"></div>',2),Ue=m('<div class="solid-select-placeholder"></div>',2),He=m('<div class="solid-select-single-value"></div>',2),Je=m('<div class="solid-select-multi-value"><button type="button" class="solid-select-multi-value-remove">\u2A2F</button></div>',4),Ke=m('<input class="solid-select-input" type="text" tabindex="0" autocomplete="off" autocapitalize="none" size="1">',1),Qe=m('<div class="solid-select-list"></div>',2),$e=m('<div class="solid-select-list-placeholder"></div>',2),We=m('<div class="solid-select-option"></div>',2),we=Te(),j=()=>{const n=Le(we);if(!n)throw new Error("No SelectContext found in ancestry.");return n},K=n=>{const[e,l]=Ie(_e({format:(s,a)=>s,placeholder:"Select...",readonly:typeof n.options!="function",loading:!1,loadingPlaceholder:"Loading...",emptyPlaceholder:"No options"},n),["options","optionToValue","isOptionDisabled","multiple","disabled","onInput","onChange"]),t=Re(e);return V(D(()=>l.initialValue,s=>s!==void 0&&t.setValue(s))),r(we.Provider,{value:t,get children(){return r(Ye,{get class(){return l.class},get children(){return[r(qe,{get id(){return l.id},get name(){return l.name},get format(){return l.format},get placeholder(){return l.placeholder},get autofocus(){return l.autofocus},get readonly(){return l.readonly}}),r(lt,{get loading(){return l.loading},get loadingPlaceholder(){return l.loadingPlaceholder},get emptyPlaceholder(){return l.emptyPlaceholder},get format(){return l.format}})]}})}})},Ye=n=>{const e=j();return(()=>{const l=Ze.cloneNode(!0);return l.$$mousedown=t=>{e.onMouseDown(t),t.currentTarget.getElementsByTagName("input")[0].focus()},Q(l,"focusout",e.onFocusOut,!0),Q(l,"focusin",e.onFocusIn,!0),c(l,()=>n.children),$(t=>{const s=`solid-select-container ${n.class!==void 0?n.class:""}`,a=e.disabled;return s!==t._v$&&Ne(l,t._v$=s),a!==t._v$2&&S(l,"data-disabled",t._v$2=a),t},{_v$:void 0,_v$2:void 0}),l})()},qe=n=>{const e=j(),l=t=>{const s=e.value();e.setValue([...s.slice(0,t),...s.slice(t+1)])};return(()=>{const t=Ge.cloneNode(!0);return Q(t,"click",e.onClick,!0),c(t,r(L,{get when(){return re(()=>!e.hasValue())()&&!e.hasInputValue()},get children(){return r(Xe,{get children(){return n.placeholder}})}}),null),c(t,r(L,{get when(){return re(()=>!!(e.hasValue()&&!e.multiple))()&&!e.hasInputValue()},get children(){return r(et,{get children(){return n.format(e.value(),"value")}})}}),null),c(t,r(L,{get when(){return e.hasValue()&&e.multiple},get children(){return r(Se,{get each(){return e.value()},children:(s,a)=>r(tt,{onRemove:()=>l(a()),get children(){return n.format(s,"value")}})})}}),null),c(t,r(nt,{get id(){return n.id},get name(){return n.name},get autofocus(){return n.autofocus},get readonly(){return n.readonly}}),null),$(s=>{const a=e.multiple,u=e.hasValue(),d=e.disabled;return a!==s._v$3&&S(t,"data-multiple",s._v$3=a),u!==s._v$4&&S(t,"data-has-value",s._v$4=u),d!==s._v$5&&S(t,"data-disabled",s._v$5=d),s},{_v$3:void 0,_v$4:void 0,_v$5:void 0}),t})()},Xe=n=>(()=>{const e=Ue.cloneNode(!0);return c(e,()=>n.children),e})(),et=n=>(()=>{const e=He.cloneNode(!0);return c(e,()=>n.children),e})(),tt=n=>(j(),(()=>{const e=Je.cloneNode(!0),l=e.firstChild;return c(e,()=>n.children,l),l.$$click=t=>{t.stopPropagation(),n.onRemove()},e})()),nt=n=>{const e=j();return(()=>{const l=Ke.cloneNode(!0);return l.$$mousedown=t=>{t.stopPropagation()},l.$$keydown=t=>{e.onKeyDown(t),t.defaultPrevented||t.key==="Escape"&&(t.preventDefault(),t.stopPropagation(),t.target.blur())},Q(l,"input",e.onInput,!0),$(t=>{const s=n.id,a=n.name,u=e.multiple,d=e.isActive(),y=n.autofocus,f=n.readonly,w=e.disabled;return s!==t._v$6&&S(l,"id",t._v$6=s),a!==t._v$7&&S(l,"name",t._v$7=a),u!==t._v$8&&S(l,"data-multiple",t._v$8=u),d!==t._v$9&&S(l,"data-is-active",t._v$9=d),y!==t._v$10&&(l.autofocus=t._v$10=y),f!==t._v$11&&(l.readOnly=t._v$11=f),w!==t._v$12&&(l.disabled=t._v$12=w),t},{_v$6:void 0,_v$7:void 0,_v$8:void 0,_v$9:void 0,_v$10:void 0,_v$11:void 0,_v$12:void 0}),$(()=>l.value=e.inputValue()),l})()},lt=n=>{const e=j();return r(L,{get when(){return e.isOpen()},get children(){const l=Qe.cloneNode(!0);return c(l,r(L,{get when(){return!n.loading},get fallback(){return(()=>{const t=$e.cloneNode(!0);return c(t,()=>n.loadingPlaceholder),t})()},get children(){return r(Se,{get each(){return e.options()},get fallback(){return(()=>{const t=$e.cloneNode(!0);return c(t,()=>n.emptyPlaceholder),t})()},children:t=>r(st,{option:t,get children(){return n.format(t,"option")}})})}})),l}})},st=n=>{const e=j(),l=t=>{V(()=>{e.isOptionFocused(n.option)&&t.scrollIntoView({block:"nearest"})})};return(()=>{const t=We.cloneNode(!0);return t.$$click=()=>e.pickOption(n.option),Fe(l,t),c(t,()=>n.children),$(s=>{const a=e.isOptionDisabled(n.option),u=e.isOptionFocused(n.option);return a!==s._v$13&&S(t,"data-disabled",s._v$13=a),u!==s._v$14&&S(t,"data-focused",s._v$14=u),s},{_v$13:void 0,_v$14:void 0}),t})()};ye(["focusin","focusout","mousedown","click","input","keydown"]);const ot=m('<div class="flex flex-1 flex-col max-w-100 gap-3"><label for="sensor">Select sensors</label></div>',4),at=m('<div class="data-container"><form><h3>Filter Sensors</h3><div class="data-form-item"><label><input type="checkbox"></label><div class="flex flex-1 flex-col max-w-100 gap-3"><label for="zip_code">Filter sensors by zip code</label></div><label><input type="checkbox"></label><div class="flex flex-1 flex-col max-w-100 gap-3"><label for="type">Filter sensors by monitor type</label></div><label><input type="checkbox"></label><div class="flex flex-1 flex-col max-w-100 gap-3"><label for="pollutant">Filter sensors by pollutant</label></div></div><h3>Select Sensors</h3><div class="data-form-item"></div><h3>Filter Sensor Data </h3><label class="data-form-item">Start time/date<input type="date" name="start-time" class="text-input"></label><label class="data-form-item">End time/date<input type="date" name="end-time" class="text-input"></label><label class="data-form-item">Time step<select class="select"><option value="h">Hourly</option><option value="d">Daily</option><option value="m">Monthly</option><option value="y">Yearly</option></select></label></form></div>',53),it=m('<label class="data-form-item" for="graphSubmit"><button id="graphSubmit" type="submit" name="submit" class="icon-btn btn-secondary">Show A Graph of the data</button></label>',4),rt=m('<label class="data-form-item" for="downloadSubmit"><button id="downloadSubmit" type="submit" name="submit" class="icon-btn btn-secondary">Download A CSV</button></label>',4),W=(n,e)=>({id:n,name:e});async function ct(){const e=await(await fetch("https://mrapid-api3-r2oaltsiuq-uc.a.run.app/zipcodes")).json();let l=[];for(let t=0;t<e.zipcode_list.length;t++)l.push(W(e.zipcode_list[t].zip_code,e.zipcode_list[t].zip_code));return l}async function ut(){const e=await(await fetch("https://mrapid-api3-r2oaltsiuq-uc.a.run.app/parameterList")).json();let l=[];for(let t=0;t<e.results.length;t++)l.push(W(e.results[t].name,e.results[t].displayName+" "+e.results[t].units));return l}function dt(){const n=[],e=[],l=[],[t,s]=p(n),[a,u]=p(e),[d,y]=p(l),[f,w]=p([]),[B,R]=p(""),[k,Z]=p(""),[O,Y]=p(""),E=i=>{Y(i.currentTarget.value)},h=i=>{console.log("got to csv download part");let b={results:[{sensor:111111,value:1},{sensor:222222,value:2},{sensor:333333,value:3}]};b=b.results;const ne=b.map(M=>({sensor:M.sensor,value:M.value}));Be(ne),console.log("got to csv download part"),i.preventDefault(),x()},g=()=>({zip_code:t(),type:a(),pollutant:d()}),[z]=J(g,je),P=i=>{w(i),z()},A=()=>({pollutant:d(),sensor:f(),start:B(),end:k(),step:O()}),[x]=J(A,Me),[I]=J(ct),G=i=>{s(i),I()},U=[W("DST","dst full name"),W("OAQ","open air quality")],H=i=>{u(i)},[N]=J(ut),q=i=>{y(i),N()},F=(i,b)=>i.name,[T,X]=p({text:"Select all zip codes",complete:!1}),ee=()=>{X({...T,complete:!T.complete}),s(I),I()},[o,C]=p({text:"Select all monitor types",complete:!1}),te=()=>{C({...o,complete:!o.complete}),u(U)},[_,xe]=p({text:"Select all pollutant types",complete:!1}),Ce=()=>{xe({..._,complete:!_.complete}),y(N),N()},Ve=i=>{console.log(A()),console.log("got here"),i.preventDefault()};return[(()=>{const i=at.cloneNode(!0),b=i.firstChild,ne=b.firstChild,M=ne.nextSibling,le=M.firstChild,ce=le.firstChild,se=le.nextSibling;se.firstChild;const oe=se.nextSibling,ue=oe.firstChild,ae=oe.nextSibling;ae.firstChild;const ie=ae.nextSibling,de=ie.firstChild,pe=ie.nextSibling;pe.firstChild;const De=M.nextSibling,fe=De.nextSibling,ke=fe.nextSibling,me=ke.nextSibling,Oe=me.firstChild,he=Oe.nextSibling,ve=me.nextSibling,Ee=ve.firstChild,ge=Ee.nextSibling,Pe=ve.nextSibling,Ae=Pe.firstChild,be=Ae.nextSibling;return ce.addEventListener("change",ee),c(le,()=>T().text,null),c(se,r(K,{class:"search",id:"zip_code",multiple:!0,get initialValue(){return t()},label:"Select sensors",placeholder:"Search by zip code",onChange:G,format:F,options:I,isOptionDisabled:v=>t().length!=0?t().includes(v):!1}),null),ue.addEventListener("change",te),c(oe,()=>o().text,null),c(ae,r(K,{class:"search",id:"type",multiple:!0,label:"Select sensors",placeholder:"Search by monitor type",get initialValue(){return a()},onChange:H,format:F,options:U,isOptionDisabled:v=>a().length!=0?a().includes(v):!1}),null),de.addEventListener("change",Ce),c(ie,()=>_().text,null),c(pe,r(K,{class:"search",id:"pollutant",multiple:!0,get initialValue(){return d()},label:"Select sensors",placeholder:"Search by pollutant",onChange:q,format:F,options:N,isOptionDisabled:v=>d().length!=0?d().includes(v):!1}),null),c(fe,r(L,{get when(){return!z.loading},get fallback(){return"Searching..."},get children(){const v=ot.cloneNode(!0);return v.firstChild,c(v,r(K,{class:"search",id:"sensor",multiple:!0,label:"sensor selector",placeholder:"Search for specific sensors",onChange:P,format:F,options:z,isOptionDisabled:ze=>f().length!=0?f().includes(ze):!1}),null),v}})),he.addEventListener("change",v=>R(v.currentTarget.value)),ge.addEventListener("change",v=>Z(v.currentTarget.value)),be.addEventListener("change",E),$(()=>ce.checked=T().complete),$(()=>ue.checked=o().complete),$(()=>de.checked=_().complete),$(()=>he.value=B()),$(()=>ge.value=k()),$(()=>be.value=O()),i})(),(()=>{const i=it.cloneNode(!0),b=i.firstChild;return b.$$click=Ve,i})(),(()=>{const i=rt.cloneNode(!0),b=i.firstChild;return b.$$click=h,i})()]}ye(["click"]);const pt=m("<div></div>",2),ft=m('<section class="page-data"><div class="data-form"><form><h1>Download sensor data</h1></form><div class="data-image-container"><h3>Map of Detroit Zip Codes</h3><div class="data-image"><img src="/src/assets/detroitmap.jpg" alt="map of detroit zipcodes"></div>For a complete list of MI zip codes, refer to this <a href="https://www.michigan.gov/dtmb/-/media/Project/Websites/dtmb/Services/GIS/Static-Maps/Boundaries/ZIPCodeMap_LP102209.pdf?rev=ef32903cd06c47688b6f3978263a40f4&amp;hash=FB40296EEACD32BC792E28F054C0E47D" target="_blank" rel="noopener noreferrer">document</a>.</div></div></section>',17),mt=[];function ht(){const[n]=p(mt);return(()=>{const e=pt.cloneNode(!0);return c(e,r(dt,{setSensors:n})),e})()}const gt=()=>(()=>{const n=ft.cloneNode(!0),e=n.firstChild,l=e.firstChild;return l.firstChild,c(l,r(ht,{name:"Solid"}),null),n})();export{gt as default};