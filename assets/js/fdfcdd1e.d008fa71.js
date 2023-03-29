"use strict";(self.webpackChunkdev_docs=self.webpackChunkdev_docs||[]).push([[474],{3905:(e,t,n)=>{n.d(t,{Zo:()=>c,kt:()=>f});var r=n(67294);function a(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function i(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function o(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?i(Object(n),!0).forEach((function(t){a(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):i(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function l(e,t){if(null==e)return{};var n,r,a=function(e,t){if(null==e)return{};var n,r,a={},i=Object.keys(e);for(r=0;r<i.length;r++)n=i[r],t.indexOf(n)>=0||(a[n]=e[n]);return a}(e,t);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(e);for(r=0;r<i.length;r++)n=i[r],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(a[n]=e[n])}return a}var s=r.createContext({}),p=function(e){var t=r.useContext(s),n=t;return e&&(n="function"==typeof e?e(t):o(o({},t),e)),n},c=function(e){var t=p(e.components);return r.createElement(s.Provider,{value:t},e.children)},u="mdxType",d={inlineCode:"code",wrapper:function(e){var t=e.children;return r.createElement(r.Fragment,{},t)}},m=r.forwardRef((function(e,t){var n=e.components,a=e.mdxType,i=e.originalType,s=e.parentName,c=l(e,["components","mdxType","originalType","parentName"]),u=p(n),m=a,f=u["".concat(s,".").concat(m)]||u[m]||d[m]||i;return n?r.createElement(f,o(o({ref:t},c),{},{components:n})):r.createElement(f,o({ref:t},c))}));function f(e,t){var n=arguments,a=t&&t.mdxType;if("string"==typeof e||a){var i=n.length,o=new Array(i);o[0]=m;var l={};for(var s in t)hasOwnProperty.call(t,s)&&(l[s]=t[s]);l.originalType=e,l[u]="string"==typeof e?e:a,o[1]=l;for(var p=2;p<i;p++)o[p]=n[p];return r.createElement.apply(null,o)}return r.createElement.apply(null,n)}m.displayName="MDXCreateElement"},9164:(e,t,n)=>{n.r(t),n.d(t,{assets:()=>s,contentTitle:()=>o,default:()=>u,frontMatter:()=>i,metadata:()=>l,toc:()=>p});var r=n(87462),a=(n(67294),n(3905));const i={},o=void 0,l={unversionedId:"api-design/Database/Events",id:"api-design/Database/Events",title:"Events",description:"Event Model:",source:"@site/docs/api-design/Database/Events.md",sourceDirName:"api-design/Database",slug:"/api-design/Database/Events",permalink:"/api-design/Database/Events",draft:!1,editUrl:"https://github.com/facebook/docusaurus/tree/main/packages/create-docusaurus/templates/shared/docs/api-design/Database/Events.md",tags:[],version:"current",frontMatter:{},sidebar:"tutorialSidebar",previous:{title:"Campaign",permalink:"/api-design/Database/Campaign"},next:{title:"Menu",permalink:"/api-design/Database/Menu"}},s={},p=[{value:"Event Model:",id:"event-model",level:2},{value:"Relationships:",id:"relationships",level:3}],c={toc:p};function u(e){let{components:t,...n}=e;return(0,a.kt)("wrapper",(0,r.Z)({},c,n,{components:t,mdxType:"MDXLayout"}),(0,a.kt)("h2",{id:"event-model"},"Event Model:"),(0,a.kt)("ul",null,(0,a.kt)("li",{parentName:"ul"},"id (primary key)"),(0,a.kt)("li",{parentName:"ul"},"name (string)"),(0,a.kt)("li",{parentName:"ul"},"description (text)"),(0,a.kt)("li",{parentName:"ul"},"start_time (datetime)"),(0,a.kt)("li",{parentName:"ul"},"end_time (datetime)"),(0,a.kt)("li",{parentName:"ul"},"place_id (foreign key to Place model)"),(0,a.kt)("li",{parentName:"ul"},"created_at (datetime)"),(0,a.kt)("li",{parentName:"ul"},"updated_at (datetime)")),(0,a.kt)("h3",{id:"relationships"},"Relationships:"),(0,a.kt)("ul",null,(0,a.kt)("li",{parentName:"ul"},"Belongs to Place model (One-to-Many)"),(0,a.kt)("li",{parentName:"ul"},"Many-to-Many with User model (as interested in)")))}u.isMDXComponent=!0}}]);