import{G as $e,a as v,b as x,o as V,j as ie,H as Fe,c,I as q,i as d,d as k,k as Ae,s as S,S as L,F as _e,e as je,f as Se,t as m,A as Le,B as Me,J as W}from"./index.c35ff839.js";async function Be(n){let e="";return n.zip_code.forEach(o=>e+="zip_code="+o.id+"&"),n.type.forEach(o=>e+="type="+o.id+"&"),n.pollutant.forEach(o=>e+="pollutant="+o.id+"&"),(await(await fetch(`https://mrapid-api3-r2oaltsiuq-uc.a.run.app/sensor?${e}`)).json()).SensorList}async function Re(n){let e="sensor=";return n.sensor.forEach(o=>e+=o.id+","),e+="&",n.pollutant.forEach(o=>e+="pollutant="+o.id+"&"),n.pollutant.forEach(o=>e+="unit="+o.name.split(" ").pop()+"&"),e+="start="+n.start+"&",e+="end="+n.end+"&",e+="step="+n.step+"&",console.log(e),await(await fetch(`https://mrapid-api3-r2oaltsiuq-uc.a.run.app/history?${e}`)).json()}const Ze=function(n,e,l){let t=["date","time"];for(let g=0;g<l.length;g++)t.push("pollutant"),t.push("value");let o=new Date(n[0].time),a=[];a.push(t.join(","));let r=[o.toLocaleString().split(", ")];for(const g of n){console.log("pollution"),console.log(e[0].name);let O=new Date(g.time);O.getTime()!=o.getTime()&&(a.push(r.join(",")),o=O,r=[],r=[o.toLocaleString().split(", ")]),r.push(e[0].name),r.push(g.value)}a.push(r.join(",")),a=a.join(`
`),console.log(a);const f=new Blob([a],{type:"text/csv"}),_=window.URL.createObjectURL(f),u=document.createElement("a");u.setAttribute("href",_),u.setAttribute("download","download.csv"),u.click(),console.log("downloaded?")},Ge=n=>{const e=$e({multiple:!1,disabled:!1,optionToValue:s=>s,isOptionDisabled:s=>!1},n),l=s=>{if(e.multiple&&Array.isArray(s))return s;if(!e.multiple&&!Array.isArray(s))return s!==null?[s]:[];throw new Error(`Incompatible value type for ${e.multiple?"multple":"single"} select.`)},[t,o]=v(e.initialValue!==void 0?l(e.initialValue):[]),a=()=>e.multiple?t():t()[0]||null,r=s=>o(l(s)),f=()=>o([]),_=()=>!!(e.multiple?a().length:a());x(V(t,()=>e.onChange?.(a()),{defer:!0}));const[u,g]=v(""),O=()=>g(""),Z=()=>!!u().length;x(V(u,s=>e.onInput?.(s),{defer:!0})),x(V(u,s=>{s&&!b()&&h(!0)},{defer:!0}));const P=typeof e.options=="function"?ie(()=>e.options(u()),e.options(u())):()=>e.options,G=()=>P().length,z=s=>{if(e.isOptionDisabled(s))return;const w=e.optionToValue(s);e.multiple?r([...t(),w]):(r(w),E(!1)),h(!1)},[ee,E]=v(!1),[b,h]=v(!1),U=()=>h(!b()),[C,D]=v(-1),y=()=>P()[C()],H=s=>s===y(),B=s=>{G()||D(-1);const w=G()-1,oe=s==="next"?1:-1;let T=C()+oe;T>w&&(T=0),T<0&&(T=w),D(T)},I=()=>B("previous"),J=()=>B("next");x(V(P,s=>{b()&&D(Math.min(0,s.length-1))},{defer:!0})),x(V(()=>e.disabled,s=>{s&&b()&&h(!1)})),x(V(b,s=>{s?(C()===-1&&J(),E(!0)):(C()>-1&&D(-1),g(""))},{defer:!0})),x(V(C,s=>{s>-1&&!b()&&h(!0)},{defer:!0}));const K=()=>E(!0),te=()=>{E(!1),h(!1)},N=s=>s.preventDefault(),ne=s=>{!e.disabled&&!Z()&&U()},A=s=>{g(s.target.value)},le=s=>{switch(s.key){case"ArrowDown":J();break;case"ArrowUp":I();break;case"Enter":if(b()&&y()){z(y());break}return;case"Escape":if(b()){h(!1);break}return;case"Delete":case"Backspace":if(u())return;if(e.multiple){const w=a();r([...w.slice(0,-1)])}else f();break;case" ":if(u())return;b()?y()&&z(y()):h(!0);break;case"Tab":if(y()&&b()){z(y());break}return;default:return}s.preventDefault(),s.stopPropagation()};return{options:P,value:a,setValue:r,hasValue:_,clearValue:f,inputValue:u,setInputValue:g,hasInputValue:Z,clearInputValue:O,isOpen:b,setIsOpen:h,toggleOpen:U,isActive:ee,setIsActive:E,get multiple(){return e.multiple},get disabled(){return e.disabled},pickOption:z,isOptionFocused:H,isOptionDisabled:e.isOptionDisabled,onFocusIn:K,onFocusOut:te,onMouseDown:N,onClick:ne,onInput:A,onKeyDown:le}},Ue=m("<div></div>",2),He=m('<div class="solid-select-control"></div>',2),Je=m('<div class="solid-select-placeholder"></div>',2),Ke=m('<div class="solid-select-single-value"></div>',2),Qe=m('<div class="solid-select-multi-value"><button type="button" class="solid-select-multi-value-remove">\u2A2F</button></div>',4),We=m('<input class="solid-select-input" type="text" tabindex="0" autocomplete="off" autocapitalize="none" size="1">',1),Ye=m('<div class="solid-select-list"></div>',2),be=m('<div class="solid-select-list-placeholder"></div>',2),qe=m('<div class="solid-select-option"></div>',2),ye=Le(),M=()=>{const n=Me(ye);if(!n)throw new Error("No SelectContext found in ancestry.");return n},Y=n=>{const[e,l]=Fe($e({format:(o,a)=>o,placeholder:"Select...",readonly:typeof n.options!="function",loading:!1,loadingPlaceholder:"Loading...",emptyPlaceholder:"No options"},n),["options","optionToValue","isOptionDisabled","multiple","disabled","onInput","onChange"]),t=Ge(e);return x(V(()=>l.initialValue,o=>o!==void 0&&t.setValue(o))),c(ye.Provider,{value:t,get children(){return c(Xe,{get class(){return l.class},get children(){return[c(et,{get id(){return l.id},get name(){return l.name},get format(){return l.format},get placeholder(){return l.placeholder},get autofocus(){return l.autofocus},get readonly(){return l.readonly}}),c(st,{get loading(){return l.loading},get loadingPlaceholder(){return l.loadingPlaceholder},get emptyPlaceholder(){return l.emptyPlaceholder},get format(){return l.format}})]}})}})},Xe=n=>{const e=M();return(()=>{const l=Ue.cloneNode(!0);return l.$$mousedown=t=>{e.onMouseDown(t),t.currentTarget.getElementsByTagName("input")[0].focus()},q(l,"focusout",e.onFocusOut,!0),q(l,"focusin",e.onFocusIn,!0),d(l,()=>n.children),k(t=>{const o=`solid-select-container ${n.class!==void 0?n.class:""}`,a=e.disabled;return o!==t._v$&&Ae(l,t._v$=o),a!==t._v$2&&S(l,"data-disabled",t._v$2=a),t},{_v$:void 0,_v$2:void 0}),l})()},et=n=>{const e=M(),l=t=>{const o=e.value();e.setValue([...o.slice(0,t),...o.slice(t+1)])};return(()=>{const t=He.cloneNode(!0);return q(t,"click",e.onClick,!0),d(t,c(L,{get when(){return ie(()=>!e.hasValue())()&&!e.hasInputValue()},get children(){return c(tt,{get children(){return n.placeholder}})}}),null),d(t,c(L,{get when(){return ie(()=>!!(e.hasValue()&&!e.multiple))()&&!e.hasInputValue()},get children(){return c(nt,{get children(){return n.format(e.value(),"value")}})}}),null),d(t,c(L,{get when(){return e.hasValue()&&e.multiple},get children(){return c(_e,{get each(){return e.value()},children:(o,a)=>c(lt,{onRemove:()=>l(a()),get children(){return n.format(o,"value")}})})}}),null),d(t,c(ot,{get id(){return n.id},get name(){return n.name},get autofocus(){return n.autofocus},get readonly(){return n.readonly}}),null),k(o=>{const a=e.multiple,r=e.hasValue(),f=e.disabled;return a!==o._v$3&&S(t,"data-multiple",o._v$3=a),r!==o._v$4&&S(t,"data-has-value",o._v$4=r),f!==o._v$5&&S(t,"data-disabled",o._v$5=f),o},{_v$3:void 0,_v$4:void 0,_v$5:void 0}),t})()},tt=n=>(()=>{const e=Je.cloneNode(!0);return d(e,()=>n.children),e})(),nt=n=>(()=>{const e=Ke.cloneNode(!0);return d(e,()=>n.children),e})(),lt=n=>(M(),(()=>{const e=Qe.cloneNode(!0),l=e.firstChild;return d(e,()=>n.children,l),l.$$click=t=>{t.stopPropagation(),n.onRemove()},e})()),ot=n=>{const e=M();return(()=>{const l=We.cloneNode(!0);return l.$$mousedown=t=>{t.stopPropagation()},l.$$keydown=t=>{e.onKeyDown(t),t.defaultPrevented||t.key==="Escape"&&(t.preventDefault(),t.stopPropagation(),t.target.blur())},q(l,"input",e.onInput,!0),k(t=>{const o=n.id,a=n.name,r=e.multiple,f=e.isActive(),_=n.autofocus,u=n.readonly,g=e.disabled;return o!==t._v$6&&S(l,"id",t._v$6=o),a!==t._v$7&&S(l,"name",t._v$7=a),r!==t._v$8&&S(l,"data-multiple",t._v$8=r),f!==t._v$9&&S(l,"data-is-active",t._v$9=f),_!==t._v$10&&(l.autofocus=t._v$10=_),u!==t._v$11&&(l.readOnly=t._v$11=u),g!==t._v$12&&(l.disabled=t._v$12=g),t},{_v$6:void 0,_v$7:void 0,_v$8:void 0,_v$9:void 0,_v$10:void 0,_v$11:void 0,_v$12:void 0}),k(()=>l.value=e.inputValue()),l})()},st=n=>{const e=M();return c(L,{get when(){return e.isOpen()},get children(){const l=Ye.cloneNode(!0);return d(l,c(L,{get when(){return!n.loading},get fallback(){return(()=>{const t=be.cloneNode(!0);return d(t,()=>n.loadingPlaceholder),t})()},get children(){return c(_e,{get each(){return e.options()},get fallback(){return(()=>{const t=be.cloneNode(!0);return d(t,()=>n.emptyPlaceholder),t})()},children:t=>c(at,{option:t,get children(){return n.format(t,"option")}})})}})),l}})},at=n=>{const e=M(),l=t=>{x(()=>{e.isOptionFocused(n.option)&&t.scrollIntoView({block:"nearest"})})};return(()=>{const t=qe.cloneNode(!0);return t.$$click=()=>e.pickOption(n.option),je(l,t),d(t,()=>n.children),k(o=>{const a=e.isOptionDisabled(n.option),r=e.isOptionFocused(n.option);return a!==o._v$13&&S(t,"data-disabled",o._v$13=a),r!==o._v$14&&S(t,"data-focused",o._v$14=r),o},{_v$13:void 0,_v$14:void 0}),t})()};Se(["focusin","focusout","mousedown","click","input","keydown"]);const it=m('<div class="flex flex-1 flex-col max-w-100 gap-3"><label for="sensor">Select sensors</label></div>',4),rt=m('<div class="data-container"><form><h3>Filter Sensors</h3><div class="data-form-item"><div class="flex flex-1 flex-col max-w-100 gap-3"><label for="zip_code">Filter sensors by zip code</label></div><label for="zip_select_all"><button type="button">Select all zip codes</button><button type="button">Clear all selected zip codes</button></label><div class="flex flex-1 flex-col max-w-100 gap-3"><label for="type">Filter sensors by monitor type</label></div><label for="monitor_select_all"><button type="button">Select all monitor types</button><button type="button">Clear all selected monitor types</button></label><div class="flex flex-1 flex-col max-w-100 gap-3"><label for="pollutant">Filter sensors by pollutant</label></div><label for="pollutant_select_all"><button type="button">Select all pollutants</button><button type="button">Clear all selected pollutants</button></label></div><h3>Select Sensors</h3><div class="data-form-item"></div><h3>Filter Sensor Data </h3><label class="data-form-item">Start time/date<input type="date" name="start-time" class="text-input"></label><label class="data-form-item">End time/date<input type="date" name="end-time" class="text-input"></label><label class="data-form-item">Time step<select class="select"><option value="h">Hourly</option><option value="d">Daily</option><option value="m">Monthly</option><option value="y">Yearly</option></select></label></form></div>',62),ct=m("<h6></h6>",2),ut=m('<label class="data-form-item" for="graphSubmit"><button id="graphSubmit" type="submit" name="submit" class="icon-btn btn-secondary">Show A Graph of the data</button></label>',4),dt=m('<label class="data-form-item" for="downloadSubmit"><button id="downloadSubmit" type="submit" name="submit" class="icon-btn btn-secondary">Download A CSV</button></label>',4),X=(n,e)=>({id:n,name:e});async function pt(){const e=await(await fetch("https://mrapid-api3-r2oaltsiuq-uc.a.run.app/zipcodes")).json();let l=[];for(let t=0;t<e.zipcode_list.length;t++)l.push(X(e.zipcode_list[t].zip_code,e.zipcode_list[t].zip_code));return l}async function ft(){const e=await(await fetch("https://mrapid-api3-r2oaltsiuq-uc.a.run.app/parameterList")).json();let l=[];for(let t=0;t<e.results.length;t++)l.push(X(e.results[t].name,e.results[t].displayName+" "+e.results[t].units));return l}function ht(){const n=[],e=[],l=[],[t,o]=v(n),[a,r]=v(e),[f,_]=v(l),[u,g]=v([]),[O,Z]=v(""),[P,G]=v(""),[z,ee]=v(""),E=i=>{ee(i.currentTarget.value)},[b,h]=v(""),U=i=>{i.preventDefault(),console.log("got to csv download part");let p=B();console.log(p),p=p.results;const F=new Date(p[0].time);console.log(F.getDate()),console.log(F.getTime()),Ze(p,f(),u()),console.log("got to csv download part")},C=()=>({zip_code:t(),type:a(),pollutant:f()}),[D]=W(C,Be),y=i=>{g(i),D()},H=()=>({pollutant:f(),sensor:u(),start:O(),end:P(),step:z()}),[B]=W(H,Re),[I]=W(pt),J=i=>{o(i),I()},K=[X("DST","dst full name"),X("OAQ","open air quality")],te=i=>{r(i)},[N]=W(ft),ne=i=>{_(i),N()},A=(i,p)=>i.name,le=()=>{o(I),I()},s=()=>{o([]),I()},w=()=>{r(K)},oe=()=>{r([])},T=()=>{_(N),N()},we=()=>{_([]),N()},xe=i=>{let p=H(),F=C();if(i.preventDefault(),p.start.length===0){h("Please provide a start time for the graph");return}else if(p.end.length===0){h("Please provide an end time for the graph");return}else if(p.step.length===0){h("Please provide a time step for the graph");return}else if(F.zip_code.length===0){h("Please provide at least one zip code for the graph");return}else if(F.pollutant.length===0){h("Please provide at least one pollutant for the graph");return}let Q=new Date(p.start),R=new Date(p.end);if(Q>R){h("Please provide a start date that is before the end date, or the same as the end date");return}h("");let j=B();console.log(j),j=j.results};return[(()=>{const i=rt.cloneNode(!0),p=i.firstChild,F=p.firstChild,Q=F.nextSibling,R=Q.firstChild;R.firstChild;const j=R.nextSibling,re=j.firstChild,Ce=re.nextSibling,se=j.nextSibling;se.firstChild;const ce=se.nextSibling,ue=ce.firstChild,De=ue.nextSibling,ae=ce.nextSibling;ae.firstChild;const Ve=ae.nextSibling,de=Ve.firstChild,ke=de.nextSibling,Oe=Q.nextSibling,pe=Oe.nextSibling,Pe=pe.nextSibling,fe=Pe.nextSibling,ze=fe.firstChild,he=ze.nextSibling,me=fe.nextSibling,Ee=me.firstChild,ge=Ee.nextSibling,Ie=me.nextSibling,Ne=Ie.firstChild,ve=Ne.nextSibling;return d(R,c(Y,{class:"search",id:"zip_code",multiple:!0,get initialValue(){return t()},label:"Select sensors",placeholder:"Search by zip code",onChange:J,format:A,options:I,isOptionDisabled:$=>t().length!=0?t().includes($):!1}),null),re.$$click=le,Ce.$$click=s,d(se,c(Y,{class:"search",id:"type",multiple:!0,label:"Select sensors",placeholder:"Search by monitor type",get initialValue(){return a()},onChange:te,format:A,options:K,isOptionDisabled:$=>a().length!=0?a().includes($):!1}),null),ue.$$click=w,De.$$click=oe,d(ae,c(Y,{class:"search",id:"pollutant",multiple:!0,get initialValue(){return f()},label:"Select sensors",placeholder:"Search by pollutant",onChange:ne,format:A,options:N,isOptionDisabled:$=>f().length!=0?f().includes($):!1}),null),de.$$click=T,ke.$$click=we,d(pe,c(L,{get when(){return!D.loading},get fallback(){return"Searching..."},get children(){const $=it.cloneNode(!0);return $.firstChild,d($,c(Y,{class:"search",id:"sensor",multiple:!0,label:"sensor selector",placeholder:"Search for specific sensors",onChange:y,format:A,options:D,isOptionDisabled:Te=>u().length!=0?u().includes(Te):!1}),null),$}})),he.addEventListener("change",$=>Z($.currentTarget.value)),ge.addEventListener("change",$=>G($.currentTarget.value)),ve.addEventListener("change",E),k(()=>he.value=O()),k(()=>ge.value=P()),k(()=>ve.value=z()),i})(),(()=>{const i=ct.cloneNode(!0);return d(i,b),i})(),(()=>{const i=ut.cloneNode(!0),p=i.firstChild;return p.$$click=xe,i})(),(()=>{const i=dt.cloneNode(!0),p=i.firstChild;return p.$$click=U,i})()]}Se(["click"]);const mt=m("<div></div>",2),gt=m('<section class="page-data"><div class="data-form"><form><h1>Download sensor data</h1></form><div class="data-image-container"><h3>Map of Detroit Zip Codes</h3><div class="data-image"><img src="/src/assets/detroitmap.jpg" alt="map of detroit zipcodes"></div>For a complete list of MI zip codes, refer to this <a href="https://www.michigan.gov/dtmb/-/media/Project/Websites/dtmb/Services/GIS/Static-Maps/Boundaries/ZIPCodeMap_LP102209.pdf?rev=ef32903cd06c47688b6f3978263a40f4&amp;hash=FB40296EEACD32BC792E28F054C0E47D" target="_blank" rel="noopener noreferrer">document</a>.</div></div></section>',17),vt=[];function bt(){const[n]=v(vt);return(()=>{const e=mt.cloneNode(!0);return d(e,c(ht,{setSensors:n})),e})()}const _t=()=>(()=>{const n=gt.cloneNode(!0),e=n.firstChild,l=e.firstChild;return l.firstChild,d(l,c(bt,{name:"Solid"}),null),n})();export{_t as default};
