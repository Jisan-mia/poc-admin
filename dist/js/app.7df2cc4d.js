(function(e){function n(n){for(var c,a,o=n[0],i=n[1],s=n[2],d=0,f=[];d<o.length;d++)a=o[d],Object.prototype.hasOwnProperty.call(u,a)&&u[a]&&f.push(u[a][0]),u[a]=0;for(c in i)Object.prototype.hasOwnProperty.call(i,c)&&(e[c]=i[c]);m&&m(n);while(f.length)f.shift()();return r.push.apply(r,s||[]),t()}function t(){for(var e,n=0;n<r.length;n++){for(var t=r[n],c=!0,a=1;a<t.length;a++){var o=t[a];0!==u[o]&&(c=!1)}c&&(r.splice(n--,1),e=i(i.s=t[0]))}return e}var c={},a={app:0},u={app:0},r=[];function o(e){return i.p+"js/"+({}[e]||e)+"."+{"chunk-1fe15e11":"7d4b85fb","chunk-26aa2090":"f45966e2","chunk-26e3d655":"9861ef86","chunk-2d215fa4":"8af9bac3","chunk-2d231084":"82774cde","chunk-36de9f3a":"88bb1435","chunk-3e1d8fe7":"d2740ee9","chunk-4b92a85e":"0612284a","chunk-00e3c129":"547151b1","chunk-6c663a72":"7f0f3c71","chunk-74f2cec3":"560fc110","chunk-78d21a47":"be53a9cc","chunk-efe88904":"630397f8","chunk-6f5f2d00":"6dbac2b2","chunk-73426ce0":"12e10e57","chunk-ef475112":"0332de5e"}[e]+".js"}function i(n){if(c[n])return c[n].exports;var t=c[n]={i:n,l:!1,exports:{}};return e[n].call(t.exports,t,t.exports,i),t.l=!0,t.exports}i.e=function(e){var n=[],t={"chunk-1fe15e11":1,"chunk-26aa2090":1,"chunk-26e3d655":1,"chunk-36de9f3a":1,"chunk-3e1d8fe7":1,"chunk-4b92a85e":1,"chunk-00e3c129":1,"chunk-6c663a72":1,"chunk-74f2cec3":1,"chunk-78d21a47":1,"chunk-efe88904":1,"chunk-6f5f2d00":1,"chunk-73426ce0":1,"chunk-ef475112":1};a[e]?n.push(a[e]):0!==a[e]&&t[e]&&n.push(a[e]=new Promise((function(n,t){for(var c="css/"+({}[e]||e)+"."+{"chunk-1fe15e11":"14bb5ebe","chunk-26aa2090":"9f9c3635","chunk-26e3d655":"10127b47","chunk-2d215fa4":"31d6cfe0","chunk-2d231084":"31d6cfe0","chunk-36de9f3a":"a74b061e","chunk-3e1d8fe7":"f7331977","chunk-4b92a85e":"c66e02fa","chunk-00e3c129":"a9436fb6","chunk-6c663a72":"56da3aef","chunk-74f2cec3":"08c03d2c","chunk-78d21a47":"fab823af","chunk-efe88904":"04f029a9","chunk-6f5f2d00":"9a7a1792","chunk-73426ce0":"64cdbdb0","chunk-ef475112":"cceb7459"}[e]+".css",u=i.p+c,r=document.getElementsByTagName("link"),o=0;o<r.length;o++){var s=r[o],d=s.getAttribute("data-href")||s.getAttribute("href");if("stylesheet"===s.rel&&(d===c||d===u))return n()}var f=document.getElementsByTagName("style");for(o=0;o<f.length;o++){s=f[o],d=s.getAttribute("data-href");if(d===c||d===u)return n()}var m=document.createElement("link");m.rel="stylesheet",m.type="text/css",m.onload=n,m.onerror=function(n){var c=n&&n.target&&n.target.src||u,r=new Error("Loading CSS chunk "+e+" failed.\n("+c+")");r.code="CSS_CHUNK_LOAD_FAILED",r.request=c,delete a[e],m.parentNode.removeChild(m),t(r)},m.href=u;var b=document.getElementsByTagName("head")[0];b.appendChild(m)})).then((function(){a[e]=0})));var c=u[e];if(0!==c)if(c)n.push(c[2]);else{var r=new Promise((function(n,t){c=u[e]=[n,t]}));n.push(c[2]=r);var s,d=document.createElement("script");d.charset="utf-8",d.timeout=120,i.nc&&d.setAttribute("nonce",i.nc),d.src=o(e);var f=new Error;s=function(n){d.onerror=d.onload=null,clearTimeout(m);var t=u[e];if(0!==t){if(t){var c=n&&("load"===n.type?"missing":n.type),a=n&&n.target&&n.target.src;f.message="Loading chunk "+e+" failed.\n("+c+": "+a+")",f.name="ChunkLoadError",f.type=c,f.request=a,t[1](f)}u[e]=void 0}};var m=setTimeout((function(){s({type:"timeout",target:d})}),12e4);d.onerror=d.onload=s,document.head.appendChild(d)}return Promise.all(n)},i.m=e,i.c=c,i.d=function(e,n,t){i.o(e,n)||Object.defineProperty(e,n,{enumerable:!0,get:t})},i.r=function(e){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},i.t=function(e,n){if(1&n&&(e=i(e)),8&n)return e;if(4&n&&"object"===typeof e&&e&&e.__esModule)return e;var t=Object.create(null);if(i.r(t),Object.defineProperty(t,"default",{enumerable:!0,value:e}),2&n&&"string"!=typeof e)for(var c in e)i.d(t,c,function(n){return e[n]}.bind(null,c));return t},i.n=function(e){var n=e&&e.__esModule?function(){return e["default"]}:function(){return e};return i.d(n,"a",n),n},i.o=function(e,n){return Object.prototype.hasOwnProperty.call(e,n)},i.p="/",i.oe=function(e){throw console.error(e),e};var s=window["webpackJsonp"]=window["webpackJsonp"]||[],d=s.push.bind(s);s.push=n,s=s.slice();for(var f=0;f<s.length;f++)n(s[f]);var m=d;r.push([0,"chunk-vendors"]),t()})({0:function(e,n,t){e.exports=t("56d7")},"043a":function(e,n,t){"use strict";t("2fd1")},"08d7":function(e,n,t){"use strict";t("da05")},1384:function(e,n,t){},"189d":function(e,n,t){"use strict";t("528d")},"1a5d":function(e,n,t){var c={"./Admin/AdminAccountManagement.vue":["61b0","chunk-4b92a85e","chunk-74f2cec3"],"./Admin/AdminBatchSettings.vue":["9793","chunk-4b92a85e","chunk-00e3c129"],"./Admin/AdminDashboard.vue":["ef8e","chunk-2d231084"],"./Admin/AdminExamManagement.vue":["15ab","chunk-4b92a85e","chunk-6c663a72"],"./Admin/AdminExam_Pack.vue":["6cac","chunk-4b92a85e","chunk-efe88904"],"./Admin/AdminReporting.vue":["a62d","chunk-26e3d655"],"./Admin/AdminSpecificExamReport.vue":["b06d","chunk-1fe15e11"],"./Admin/AdminSpecificStudent.vue":["042c","chunk-36de9f3a"],"./Admin/AdminStudentManagement.vue":["bb02","chunk-26aa2090"],"./Admin/AdminUserManagement.vue":["ac0b","chunk-4b92a85e","chunk-78d21a47"],"./Home.vue":["bb51","chunk-ef475112"],"./Login.vue":["a55b","chunk-6f5f2d00"],"./LoginMain.vue":["9ddb","chunk-73426ce0"],"./Logout.vue":["c100","chunk-2d215fa4"]};function a(e){if(!t.o(c,e))return Promise.resolve().then((function(){var n=new Error("Cannot find module '"+e+"'");throw n.code="MODULE_NOT_FOUND",n}));var n=c[e],a=n[0];return Promise.all(n.slice(1).map(t.e)).then((function(){return t(a)}))}a.keys=function(){return Object.keys(c)},a.id="1a5d",e.exports=a},"1cb7":function(e,n,t){e.exports=t.p+"img/poc_logo_small.d7fde0e2.png"},"2fd1":function(e,n,t){},4123:function(e,n,t){var c={"./AdminAccountManagement.vue":["61b0","chunk-4b92a85e","chunk-74f2cec3"],"./AdminBatchSettings.vue":["9793","chunk-4b92a85e","chunk-00e3c129"],"./AdminDashboard.vue":["ef8e","chunk-2d231084"],"./AdminExamManagement.vue":["15ab","chunk-4b92a85e","chunk-6c663a72"],"./AdminExam_Pack.vue":["6cac","chunk-4b92a85e","chunk-efe88904"],"./AdminReporting.vue":["a62d","chunk-26e3d655"],"./AdminSpecificExamReport.vue":["b06d","chunk-1fe15e11"],"./AdminSpecificStudent.vue":["042c","chunk-36de9f3a"],"./AdminStudentManagement.vue":["bb02","chunk-26aa2090"],"./AdminUserManagement.vue":["ac0b","chunk-4b92a85e","chunk-78d21a47"]};function a(e){if(!t.o(c,e))return Promise.resolve().then((function(){var n=new Error("Cannot find module '"+e+"'");throw n.code="MODULE_NOT_FOUND",n}));var n=c[e],a=n[0];return Promise.all(n.slice(1).map(t.e)).then((function(){return t(a)}))}a.keys=function(){return Object.keys(c)},a.id="4123",e.exports=a},"528d":function(e,n,t){},"56d7":function(e,n,t){"use strict";t.r(n);t("e260"),t("e6cf"),t("cca6"),t("a79d");var c=t("7a23"),a={id:"app"};function u(e,n,t,u,r,o){var i=Object(c["G"])("router-view");return Object(c["y"])(),Object(c["g"])("div",a,[(Object(c["y"])(),Object(c["e"])(Object(c["H"])(this.$route.meta.layout||"div"),null,{default:Object(c["N"])((function(){return[Object(c["k"])(i)]})),_:1}))])}var r={},o=(t("043a"),t("6b0d")),i=t.n(o);const s=i()(r,[["render",u]]);var d=s,f=(t("d3b7"),t("3ca3"),t("ddb0"),t("6c02")),m={class:"app-container"},b={class:"main"};function l(e,n,t,a,u,r){var o=Object(c["G"])("Sidebar");return Object(c["y"])(),Object(c["g"])("div",m,[Object(c["k"])(o),Object(c["h"])("main",b,[Object(c["F"])(e.$slots,"default",{},void 0,!0)])])}var h=t("1cb7"),p=t.n(h),O=t("6601"),g=t.n(O),k=function(e){return Object(c["B"])("data-v-bfc23254"),e=e(),Object(c["z"])(),e},v=k((function(){return Object(c["h"])("div",{class:"bar"},null,-1)})),j=k((function(){return Object(c["h"])("div",{class:"bar"},null,-1)})),A=k((function(){return Object(c["h"])("div",{class:"bar"},null,-1)})),y=[v,j,A],_={key:0,class:"crossBar__parent"},E=k((function(){return Object(c["h"])("img",{alt:"Vue logo",class:"poc_logo2",src:p.a},null,-1)})),N=k((function(){return Object(c["h"])("div",{class:"bar1"},null,-1)})),x=k((function(){return Object(c["h"])("div",{class:"bar2"},null,-1)})),S=[N,x],R=k((function(){return Object(c["h"])("span",{class:"bigSpan"},[Object(c["h"])("img",{alt:"Vue logo",class:"poc_logo",src:g.a})],-1)})),M=Object(c["j"])("Dashboard"),w=Object(c["j"])("Exam Pack"),D=Object(c["j"])("Exam Management"),C=Object(c["j"])("Student Management"),T=Object(c["j"])("Reporting"),U=k((function(){return Object(c["h"])("span",null,"Settings",-1)})),P={class:"nested"},L=k((function(){return Object(c["h"])("span",{class:"text"}," User Management ",-1)})),B=k((function(){return Object(c["h"])("span",{class:"text"}," Account Management ",-1)})),V=k((function(){return Object(c["h"])("span",{class:"text"}," Batch Settings ",-1)})),I={class:"logout"},F=Object(c["j"])("Logout");function q(e,n,t,a,u,r){var o=Object(c["G"])("SidebarLink");return Object(c["y"])(),Object(c["g"])(c["a"],null,[Object(c["h"])("div",{class:"hamburger",onClick:n[0]||(n[0]=function(){return a.toggleActive&&a.toggleActive.apply(a,arguments)})},y),Object(c["h"])("div",{class:Object(c["s"])(["sidebar",a.isActive?"active":""])},[Object(c["h"])("span",null,[Object(c["h"])("h1",null,[a.isActive?(Object(c["y"])(),Object(c["g"])("span",_,[E,Object(c["h"])("div",{class:"crossBar",onClick:n[1]||(n[1]=function(){return a.toggleActive&&a.toggleActive.apply(a,arguments)})},S)])):Object(c["f"])("",!0),R]),Object(c["h"])("span",null,[Object(c["k"])(o,{to:"/dashboard",icon:"fas fa-home"},{default:Object(c["N"])((function(){return[M]})),_:1}),Object(c["k"])(o,{to:"/exam-pack",icon:"fas fa-columns"},{default:Object(c["N"])((function(){return[w]})),_:1}),Object(c["k"])(o,{to:"/exam-management",icon:"fas fa-user-circle"},{default:Object(c["N"])((function(){return[D]})),_:1}),Object(c["k"])(o,{to:"/student-management",icon:"fas fa-user-circle"},{default:Object(c["N"])((function(){return[C]})),_:1}),Object(c["k"])(o,{to:"/reporting",icon:"fas fa-chart-bar"},{default:Object(c["N"])((function(){return[T]})),_:1}),Object(c["k"])(o,{icon:"fas fa-cog"},{default:Object(c["N"])((function(){return[U,Object(c["h"])("div",P,[Object(c["k"])(o,{isNested:!0,to:"/user-management",icon:"fas fa-circle"},{default:Object(c["N"])((function(){return[L]})),_:1}),Object(c["k"])(o,{isNested:!0,to:"/account-management",icon:"fas fa-circle"},{default:Object(c["N"])((function(){return[B]})),_:1}),Object(c["k"])(o,{isNested:!0,to:"/batch-settings",icon:"fas fa-circle"},{default:Object(c["N"])((function(){return[V]})),_:1})])]})),_:1})])]),Object(c["h"])("span",I,[Object(c["k"])(o,{to:"/logout",icon:"fas fa-sign-out-alt"},{default:Object(c["N"])((function(){return[F]})),_:1})])],2)],64)}var G={key:0};function H(e,n,t,a,u,r){var o=Object(c["G"])("router-link");return Object(c["y"])(),Object(c["e"])(o,{to:t.to||"",class:Object(c["s"])(["link",{active:a.activeLink&&t.to}])},{default:Object(c["N"])((function(){return[!1===t.isNested?(Object(c["y"])(),Object(c["g"])("i",{key:0,class:Object(c["s"])(["icon",t.icon])},null,2)):(Object(c["y"])(),Object(c["g"])("i",{key:1,class:Object(c["s"])(["iconNested",[t.icon]])},null,2)),Object(c["k"])(c["b"],{name:"fade"},{default:Object(c["N"])((function(){return[a.collapsed?Object(c["f"])("",!0):(Object(c["y"])(),Object(c["g"])("span",G,[Object(c["F"])(e.$slots,"default",{},void 0,!0)]))]})),_:3})]})),_:3},8,["to","class"])}t("caad"),t("2532");var $=Object(c["D"])(!1),J=Object(c["D"])(!1),z=function(){return J.value=!J.value},K=200,Q=38,W=(Object(c["c"])((function(){return"".concat($.value?Q:K,"px")})),{props:{to:{type:String,required:!1},icon:{type:String,required:!0},isNested:{type:Boolean,default:function(){return!1}}},setup:function(e){var n=Object(f["c"])(),t=Object(c["c"])((function(){return n.path.includes(e.to)})),a=Object(c["D"])(["nest1, nest2"]);return{toggleActive:z,activeLink:t,collapsed:$,nested:a}}});t("08d7");const X=i()(W,[["render",H],["__scopeId","data-v-5383406b"]]);var Y=X,Z={props:{},components:{SidebarLink:Y},setup:function(){return{toggleActive:z,isActive:J}}};t("deff"),t("189d");const ee=i()(Z,[["render",q],["__scopeId","data-v-bfc23254"]]);var ne=ee,te={components:{Sidebar:ne},name:"AppLayout"};t("79fa");const ce=i()(te,[["render",l],["__scopeId","data-v-69479468"]]);var ae,ue,re=ce,oe=function(e){return function(){return t("1a5d")("./".concat(e,".vue"))}},ie=function(e){return function(){return t("4123")("./".concat(e,".vue"))}},se=[{path:"/",name:"Home",component:function(){return t.e("chunk-ef475112").then(t.bind(null,"bb51"))}},{path:"/:pathMatch(.*)*",name:"PageNotFound",component:function(){return t.e("chunk-3e1d8fe7").then(t.bind(null,"f211"))}},{path:"/login",name:"Login",component:oe("Login")},{path:"/logout",name:"Logout",component:function(){return t.e("chunk-2d215fa4").then(t.bind(null,"c100"))}},{path:"/reporting/:examId",name:"SpecificExamReport",component:ie("AdminSpecificExamReport"),meta:{layout:re}},{path:"/student-management/:studentId",name:"SpecificStudent",component:ie("AdminSpecificStudent"),meta:{layout:re}},{path:"/dashboard",name:"AdminDashboard",component:ie("AdminDashboard"),meta:{layout:re}},{path:"/exam-pack",name:"AdminExam_Pack",component:ie("AdminExam_Pack"),meta:{layout:re}},{path:"/exam-management",name:"AdminExamManagement",component:ie("AdminExamManagement"),meta:{layout:re}},{path:"/student-management",name:"AdminStudentManagement",component:ie("AdminStudentManagement"),meta:{layout:re}},{path:"/reporting",name:"AdminReporting",component:ie("AdminReporting"),meta:{layout:re}},{path:"/user-management",name:"AdminUserManagement",component:ie("AdminUserManagement"),meta:{layout:re}},{path:"/account-management",name:"AdminAccountManagement",component:ie("AdminAccountManagement"),meta:{layout:re}},{path:"/batch-settings",name:"AdminBatchSettings",component:ie("AdminBatchSettings"),meta:{layout:re}}],de=Object(f["a"])({history:Object(f["b"])("/"),routes:se}),fe=de,me=t("5502"),be=t("1da1"),le=t("ade3"),he=(t("159b"),t("96cf"),{ADD_COUNTER:"ADD_COUNTER",REMOVE_COUNTER:"REMOVE_COUNTER"}),pe=t("bc3a"),Oe=t.n(pe),ge={counter:1,history:[1]},ke=(ae={},Object(le["a"])(ae,he.ADD_COUNTER,(function(e,n){e.counter=e.counter+n,e.history.push(e.counter)})),Object(le["a"])(ae,he.REMOVE_COUNTER,(function(e,n){e.counter=e.counter-n,e.history.push(e.counter)})),ae),ve={addRandomNumber:function(e,n){return Object(be["a"])(regeneratorRuntime.mark((function t(){var c;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return t.next=2,Oe.a.get("https://www.random.org/integers/?num=1&min=-1000&max=1000&col=1&base=10&format=plain&rnd=new");case 2:c=t.sent,e.commit(he.ADD_COUNTER,c.data),console.log(n.amount);case 5:case"end":return t.stop()}}),t)})))()}},je={activeIndex:function(e){return function(n){var t=[];return e.history.forEach((function(e,c){e==n&&t.push(c)})),t}}},Ae={namespaced:!0,state:ge,mutations:ke,actions:ve,getters:je},ye={ADD_COUNTER:"ADD_COUNTER",REMOVE_COUNTER:"REMOVE_COUNTER"},_e={counter2:1},Ee=(ue={},Object(le["a"])(ue,ye.ADD_COUNTER,(function(e){e.counter2=e.counter2+1})),Object(le["a"])(ue,ye.REMOVE_COUNTER,(function(e){e.counter2=e.counter2-1})),ue),Ne={addCounter:function(e,n){return Object(be["a"])(regeneratorRuntime.mark((function n(){return regeneratorRuntime.wrap((function(n){while(1)switch(n.prev=n.next){case 0:setTimeout((function(){e.commit(ye.ADD_COUNTER)}),2e3);case 1:case"end":return n.stop()}}),n)})))()},removeCounter:function(e,n){return Object(be["a"])(regeneratorRuntime.mark((function n(){return regeneratorRuntime.wrap((function(n){while(1)switch(n.prev=n.next){case 0:setTimeout((function(){e.commit(ye.REMOVE_COUNTER)}),2e3);case 1:case"end":return n.stop()}}),n)})))()}},xe={namespaced:!0,state:_e,mutations:Ee,actions:Ne},Se={phone_number:"",password:"123456"},Re={},Me={},we={},De={namespaced:!0,state:Se,mutations:Re,actions:Me,getters:we},Ce=Object(me["a"])({modules:{counter1:Ae,counter2:xe,user:De}});t("7051");Object(c["d"])(d).use(Ce).use(fe).mount("#app")},"5c10":function(e,n,t){},6601:function(e,n,t){e.exports=t.p+"img/poc_logo.2db9a1b4.svg"},"79fa":function(e,n,t){"use strict";t("5c10")},da05:function(e,n,t){},deff:function(e,n,t){"use strict";t("1384")}});
//# sourceMappingURL=app.7df2cc4d.js.map