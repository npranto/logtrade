(this.webpackJsonplogtrade=this.webpackJsonplogtrade||[]).push([[0],{42:function(e,t,s){},44:function(e,t,s){},46:function(e,t,s){"use strict";s.r(t);var a=s(11),n=s(35),r=s.n(n),c=(s(42),s(12)),i=s(1),o=s.n(i),l=s(5),d=s(2),b=s(4),h=s(7),u=s(8),m=(s(44),s(14)),x=s(36),j=s.n(x),p=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:[];if(null===e||!e.length)return"0.00";var t=e.map((function(e){return{tradeType:e.tradeType,openingPrice:parseFloat(e.openingPrice).toFixed(2),closingPrice:parseFloat(e.closingPrice).toFixed(2),numberOfShares:parseInt(e.numberOfShares)}})).map((function(e){return console.log({trade:e}),"short"===e.tradeType?(e.openingPrice-e.closingPrice)*e.numberOfShares:(e.closingPrice-e.openingPrice)*e.numberOfShares})).reduce((function(e,t){return console.log({eachTradeProfit:t}),e+t}),0);return console.log({totalProfit:t}),parseFloat(t).toFixed(2)},g=function(){var e=localStorage.getItem("logtrade:::user");return null===e?null:JSON.parse(e)},f=function(e){if(!e)throw new Error("Please pass in a date to get month name");var t=e.getMonth();if(t<0||t>11)throw new Error("Invalid month detected, check to ensure valid date is passed");return["January","February","March","April","May","June","July","August","September","October","November","December"][t]},O=function(e){if(!e)throw new Error("Please pass in a date to get month name");return e.getDate()},y=function(e){if(!e)throw new Error("Please pass in a date to get month name");return e.getFullYear()},v=function(e){if(!e||!(e instanceof Date))throw new Error("Please pass in a `Date` object to generate previous month");var t=new Date(e);return t.setDate(1),t.setMonth(t.getMonth()-1),t},w=function(e){if(!e||!(e instanceof Date))throw new Error("Please pass in a `Date` object to generate next month");var t=new Date(e);return t.setDate(1),t.setMonth(t.getMonth()+1),t},N=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:[],t=arguments.length>1?arguments[1]:void 0,s=arguments.length>2?arguments[2]:void 0,a=arguments.length>3?arguments[3]:void 0;if(e.length&&Array.isArray(e))return e.filter((function(e){return e.month===t&&e.date===s&&e.year===a}))},k=function(){return j()("logtrade-")},T=s(19),S=s(37),D=(Object(S.a)({apiKey:"AIzaSyArgNoY7luYCUYJlVAxapXEjw2nuDu5Ny8",authDomain:"log-trade-dev.firebaseapp.com",projectId:"log-trade-dev",storageBucket:"log-trade-dev.appspot.com",messagingSenderId:"427284527632",appId:"1:427284527632:web:9232621b47da1f73dca895"}),s(17)),C=Object(D.c)(),P=function(e){if(!("object"===typeof e&&null!==e))throw new Error("Please pass in a valid JSON object to stringify");return JSON.stringify(e)},M=function(e){if(!e||!e.length||"string"!==typeof e)throw new Error("Please pass in a valid stringified JSON to parse");try{return JSON.parse(e)}catch(t){throw new Error(t)}},L=function(){var e=Object(l.a)(o.a.mark((function e(t,s){var a,n,r,i,l,d,b,h,u,m,x,j,p,g,f,O;return o.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(s&&"string"===typeof s){e.next=2;break}throw new Error("Please pass in a valid user id to create a new trade log");case 2:if(a=function(e){if(!e||"object"!==typeof e)return{isValid:!1,error:"Please pass in a valid new trade object"};var t=["tradeId","openingPrice","closingPrice","stopLoss","takeProfit","date","month","year","notes","numberOfShares","ticker","vwap"].find((function(t){return!e.hasOwnProperty(t)}));return t?{isValid:!1,error:"[".concat(t,"] property is required to create a new trade")}:{isValid:!0,error:null}},n=a(t),r=n.isValid,i=n.error,r){e.next=6;break}return e.abrupt("return",{error:i});case 6:return l=Object(D.a)(C,"tradelogs-stringified",s),e.next=9,Object(D.b)(l);case 9:if(!(d=e.sent).exists()){e.next=27;break}return b=d.data()||{},h=b.content,u=M(h),m=u.userId,x=u.trades,j=void 0===x?[]:x,p={trades:[].concat(Object(T.a)(j),[Object(c.a)({},t)]),userId:m},g=P(p),e.prev=16,e.next=19,Object(D.e)(l,{content:g});case 19:case 32:return e.abrupt("return",{isNewTradeLogCreated:!0});case 22:return e.prev=22,e.t0=e.catch(16),e.abrupt("return",{error:e.t0&&e.t0.message||"Unable to create new trade at the moment. Try again later."});case 25:e.next=38;break;case 27:return f={trades:[Object(c.a)({},t)],userId:s},O=P(f),e.prev=29,e.next=32,Object(D.d)(Object(D.a)(C,"tradelogs-stringified",s),{content:O});case 35:return e.prev=35,e.t1=e.catch(29),e.abrupt("return",{error:e.t1&&e.t1.message||"Unable to create new trade at the moment. Try again later."});case 38:case"end":return e.stop()}}),e,null,[[16,22],[29,35]])})));return function(t,s){return e.apply(this,arguments)}}(),A=s(3),F=function(e){var t=e.onClick;return Object(A.jsx)("div",{class:"AddTradeBtn fixed bottom-1 right-1 mr-2 mb-2",children:Object(A.jsxs)("button",{class:"text-white px-4 w-auto h-12 bg-red-600 rounded-full hover:bg-red-700 active:shadow-lg mouse shadow transition ease-in duration-200 focus:outline-none",onClick:t,children:[Object(A.jsx)("svg",{viewBox:"0 0 20 20","enable-background":"new 0 0 20 20",class:"w-4 h-4 inline-block mr-1",children:Object(A.jsx)("path",{fill:"#FFFFFF",d:"M17.561,2.439c-1.442-1.443-2.525-1.227-2.525-1.227L8.984,7.264L2.21,14.037L1.2,18.799l4.763-1.01 l6.774-6.771l6.052-6.052C18.788,4.966,19.005,3.883,17.561,2.439z M5.68,17.217l-1.624,0.35c-0.156-0.293-0.345-0.586-0.69-0.932 c-0.346-0.346-0.639-0.533-0.932-0.691l0.35-1.623l0.47-0.469c0,0,0.883,0.018,1.881,1.016c0.997,0.996,1.016,1.881,1.016,1.881 L5.68,17.217z"})}),Object(A.jsx)("span",{children:"Add Trade"})]})})},I=s(9),E=function(e){Object(h.a)(s,e);var t=Object(u.a)(s);function s(e){var a;return Object(d.a)(this,s),(a=t.call(this,e)).state={ticker:"",numberOfShares:1,openingPrice:"0.00",closingPrice:"0.00",stopLoss:"0.00",takeProfit:"0.00",notes:"",tradeType:"long",vwap:"under"},a.onFormSubmit=a.onFormSubmit.bind(Object(m.a)(a)),a.onInputChange=a.onInputChange.bind(Object(m.a)(a)),a}return Object(b.a)(s,[{key:"onInputChange",value:function(e){e.preventDefault();var t=(null===e||void 0===e?void 0:e.target)||{},s=t.name,a=t.value;"ticker"===s?this.setState(Object(I.a)({},s,a.trim().toUpperCase())):"tradeType"===s?this.setState(Object(I.a)({},s,a.trim().toLowerCase())):"numberOfShares"===s?this.setState(Object(I.a)({},s,parseInt(a))):this.setState(Object(I.a)({},s,a))}},{key:"onFormSubmit",value:function(e){e.preventDefault();var t={ticker:this.state.ticker,numberOfShares:this.state.numberOfShares,openingPrice:this.state.openingPrice,closingPrice:this.state.closingPrice,stopLoss:this.state.stopLoss,takeProfit:this.state.takeProfit,notes:this.state.notes,tradeType:this.state.tradeType,vwap:this.state.vwap,date:this.props.activeDateDate,month:this.props.activeMonth,year:this.props.activeYear,tradeId:k()};console.log({newTradeLog:t}),this.props.onCreateNewTradeLog(t)}},{key:"render",value:function(){var e=this.props,t=e.activeDateDate,s=e.activeMonth,a=e.activeYear,n=e.onClose,r=e.newTradeLogError;return Object(A.jsx)("div",{className:"AddNewTradeFormModal fixed z-10 inset-0 overflow-y-auto","aria-labelledby":"modal-title",role:"dialog","aria-modal":"true",children:Object(A.jsxs)("div",{className:"flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0",children:[Object(A.jsx)("div",{className:"fixed inset-0 bg-gray-500 bg-opacity-75","aria-hidden":"true"}),Object(A.jsx)("span",{className:"hidden sm:inline-block sm:align-middle sm:h-screen","aria-hidden":"true",children:"\u200b"}),Object(A.jsxs)("form",{onSubmit:this.onFormSubmit,className:"inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform sm:my-8 sm:align-middle sm:max-w-lg sm:w-full",children:[Object(A.jsx)("div",{className:"px-4 pt-5 pb-4 sm:p-6 sm:pb-4",children:Object(A.jsx)("div",{className:"w-full",children:Object(A.jsxs)("div",{className:"mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left",children:[Object(A.jsx)("h3",{className:"text-2xl leading-6 font-medium text-gray-900 mb-2",id:"modal-title",children:"Add Trade"}),Object(A.jsxs)("p",{className:"text-sm text-gray-400",children:[s," ",t,", ",a]}),Object(A.jsx)("div",{className:"mt-2",children:Object(A.jsxs)("div",{className:"w-full my-5",children:[null!==r&&Object(A.jsxs)("div",{class:"bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative",role:"alert",children:[Object(A.jsx)("strong",{class:"font-bold",children:"Oops! "}),Object(A.jsx)("span",{class:"block sm:inline",children:r})]}),Object(A.jsxs)("div",{class:"flex flex-wrap justify-between items-center my-3",children:[Object(A.jsx)("label",{class:"block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2 mr-2",for:"Ticker",children:"Ticker"}),Object(A.jsx)("div",{class:"mt-1 flex rounded-md shadow-sm",children:Object(A.jsx)("input",{class:"appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500",value:this.state.ticker,onChange:this.onInputChange,name:"ticker",id:"ticker",type:"text",placeholder:"AAPL",required:!0})})]}),Object(A.jsxs)("div",{class:"flex flex-wrap justify-between items-center my-3",children:[Object(A.jsx)("label",{class:"block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2 mr-2",for:"number-of-shares",children:"Number of Shares"}),Object(A.jsx)("div",{class:"mt-1 flex rounded-md shadow-sm",children:Object(A.jsx)("input",{class:"appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500",value:this.state.numberOfShares,onChange:this.onInputChange,name:"numberOfShares",id:"number-of-shares",type:"number",min:"1",step:"1",placeholder:"2",required:!0})})]}),Object(A.jsxs)("div",{class:"flex flex-wrap justify-between items-center my-3",children:[Object(A.jsx)("label",{class:"block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2 mr-2",for:"closing-price",children:"Trade Type"}),Object(A.jsxs)("div",{class:"mt-1 flex rounded-md",children:[Object(A.jsx)("div",{className:"px-2",children:Object(A.jsxs)("label",{class:"inline-flex items-center",children:[Object(A.jsx)("input",{type:"radio",value:"long",onChange:this.onInputChange,class:"form-radio",name:"tradeType",checked:"long"===this.state.tradeType}),Object(A.jsx)("span",{class:"ml-2",children:"Long"})]})}),Object(A.jsx)("div",{className:"px-2",children:Object(A.jsxs)("label",{class:"inline-flex items-center",children:[Object(A.jsx)("input",{type:"radio",value:"short",onChange:this.onInputChange,class:"form-radio",name:"tradeType",checked:"short"===this.state.tradeType}),Object(A.jsx)("span",{class:"ml-2",children:"Short"})]})})]})]}),Object(A.jsxs)("div",{class:"flex flex-wrap justify-between items-center my-3",children:[Object(A.jsx)("label",{class:"block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2 mr-2",for:"opening-price",children:"Opening Price"}),Object(A.jsxs)("div",{class:"mt-1 flex rounded-md shadow-sm",children:[Object(A.jsx)("span",{class:"inline-flex items-center px-3 rounded-l-md bg-gray-100 text-gray-500 text-sm",children:"$"}),Object(A.jsx)("input",{class:"appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500",value:this.state.openingPrice,onChange:this.onInputChange,name:"openingPrice",id:"opening-price",type:"number",placeholder:"10.95",min:"0.01",step:"0.01",required:!0})]})]}),Object(A.jsxs)("div",{class:"flex flex-wrap justify-between items-center my-3",children:[Object(A.jsx)("label",{class:"block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2 mr-2",for:"closing-price",children:"Closing Price"}),Object(A.jsxs)("div",{class:"mt-1 flex rounded-md shadow-sm",children:[Object(A.jsx)("span",{class:"inline-flex items-center px-3 rounded-l-md bg-gray-100 text-gray-500 text-sm",children:"$"}),Object(A.jsx)("input",{class:"appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500",value:this.state.closingPrice,onChange:this.onInputChange,name:"closingPrice",id:"closing-price",type:"number",placeholder:"10.95",min:"0.01",step:"0.01",required:!0})]})]}),Object(A.jsxs)("div",{class:"flex flex-wrap justify-between items-center my-3",children:[Object(A.jsx)("label",{class:"block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2 mr-2",for:"stop-loss",children:"Stop Loss"}),Object(A.jsxs)("div",{class:"mt-1 flex rounded-md shadow-sm",children:[Object(A.jsx)("span",{class:"inline-flex items-center px-3 rounded-l-md bg-gray-100 text-gray-500 text-sm",children:"$"}),Object(A.jsx)("input",{class:"appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500",value:this.state.stopLoss,onChange:this.onInputChange,name:"stopLoss",id:"stop-loss",type:"number",placeholder:"9.95",min:"0.01",step:"0.01",required:!0})]})]}),Object(A.jsxs)("div",{class:"flex flex-wrap justify-between items-center my-3",children:[Object(A.jsx)("label",{class:"block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2 mr-2",for:"take-profit",children:"Take Profit"}),Object(A.jsxs)("div",{class:"mt-1 flex rounded-md shadow-sm",children:[Object(A.jsx)("span",{class:"inline-flex items-center px-3 rounded-l-md bg-gray-100 text-gray-500 text-sm",children:"$"}),Object(A.jsx)("input",{class:"appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500",value:this.state.takeProfit,onChange:this.onInputChange,name:"takeProfit",id:"take-profit",type:"number",placeholder:"15.95",min:"0.01",step:"0.01",required:!0})]})]}),Object(A.jsxs)("div",{class:"flex flex-wrap justify-between items-center my-3",children:[Object(A.jsx)("label",{class:"block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2 mr-2",for:"closing-price",children:"VWAP"}),Object(A.jsxs)("div",{class:"mt-1 flex rounded-md",children:[Object(A.jsx)("div",{className:"px-2",children:Object(A.jsxs)("label",{class:"inline-flex items-center",children:[Object(A.jsx)("input",{type:"radio",value:"under",onChange:this.onInputChange,class:"form-radio",name:"vwap",checked:"under"===this.state.vwap}),Object(A.jsx)("span",{class:"ml-2",children:"Under"})]})}),Object(A.jsx)("div",{className:"px-2",children:Object(A.jsxs)("label",{class:"inline-flex items-center",children:[Object(A.jsx)("input",{type:"radio",value:"over",onChange:this.onInputChange,class:"form-radio",name:"vwap",checked:"over"===this.state.vwap}),Object(A.jsx)("span",{class:"ml-2",children:"Over"})]})})]})]}),Object(A.jsxs)("div",{class:"flex flex-col mt-5 mb-3",children:[Object(A.jsx)("label",{for:"notes",class:"block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2 mr-2",children:"Notes"}),Object(A.jsx)("textarea",{id:"notes",value:this.state.notes,onChange:this.onInputChange,name:"notes",class:"appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500",rows:"4"})]})]})})]})})}),Object(A.jsxs)("div",{className:"bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse",children:[Object(A.jsx)("button",{type:"submit",className:"w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-green-600 text-base font-medium text-white hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 sm:ml-3 sm:w-auto sm:text-sm",children:"Create Trade"}),Object(A.jsx)("button",{type:"button",className:"mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm",onClick:n,children:"Cancel"})]})]})]})})}}]),s}(a.Component),Y=function(e){Object(h.a)(s,e);var t=Object(u.a)(s);function s(e){var a;return Object(d.a)(this,s),(a=t.call(this,e)).state={isOpen:!0},a}return Object(b.a)(s,[{key:"componentDidMount",value:function(){var e=this;setTimeout((function(){e.setState({isOpen:!1})}),this.props.alertDurationInSeconds||5e3)}},{key:"render",value:function(){return this.state.isOpen?Object(A.jsx)("div",{class:"w-1/4 mx-auto fixed bottom-0 mb-3 mr-3",children:Object(A.jsxs)("div",{class:"flex p-5 rounded-lg shadow-lg bg-white",children:[Object(A.jsx)("div",{children:Object(A.jsxs)("svg",{class:"w-6 h-6 fill-current text-green-500",xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 24 24",children:[Object(A.jsx)("path",{d:"M0 0h24v24H0V0z",fill:"none"}),Object(A.jsx)("path",{d:"M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm4.59-12.42L10 14.17l-2.59-2.58L6 13l4 4 8-8z"})]})}),Object(A.jsxs)("div",{class:"ml-3",children:[Object(A.jsx)("h2",{class:"font-semibold text-gray-800",children:"Success!"}),Object(A.jsx)("p",{class:"mt-2 text-sm text-gray-600 leading-relaxed",children:"New trade log has been created"})]})]})}):null}}]),s}(a.Component),J=s(28),z=function(e){var t=e.activeDateDate,s=e.activeMonth,a=e.activeYear,n=e.activeTradeLogs,r=void 0===n?[]:n,i=e.onClose,o=e.onOpenAddNewTradeForm,l=N(r,s,t,a);return console.log({activeDateDate:t,activeMonth:s,activeYear:a,activeTradeLogs:r,activeDateTradeLogs:l}),Object(A.jsx)("div",{className:"fixed z-10 inset-0 overflow-y-auto","aria-labelledby":"modal-title",role:"dialog","aria-modal":"true",children:Object(A.jsxs)("div",{className:"flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0",children:[Object(A.jsx)("div",{className:"fixed inset-0 bg-gray-500 bg-opacity-75","aria-hidden":"true"}),Object(A.jsx)("span",{className:"hidden sm:inline-block sm:align-middle sm:h-screen","aria-hidden":"true",children:"\u200b"}),Object(A.jsxs)("div",{className:"inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform sm:my-8 sm:align-middle sm:max-w-lg sm:w-full",children:[Object(A.jsx)("div",{className:"px-4 pt-5 pb-4 sm:p-6 sm:pb-4",children:Object(A.jsx)("div",{className:"w-full",children:Object(A.jsxs)("div",{className:"mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left",children:[Object(A.jsx)("h3",{className:"text-2xl leading-6 font-medium text-gray-900 mb-2",id:"modal-title",children:"Trade Log"}),Object(A.jsxs)("p",{className:"text-sm text-gray-400",children:[s," ",t,", ",a]}),Object(A.jsx)("div",{className:"mt-2",children:Object(A.jsxs)("div",{className:"w-full flex flex-wrap",children:[!(null===l||void 0===l?void 0:l.length)&&Object(A.jsx)("div",{class:"w-full flex justify-center item-center p-3",children:Object(A.jsx)("p",{className:"text-gray-400 italic",children:"No trade transaction"})}),!!(null===l||void 0===l?void 0:l.length)&&l.map((function(e){var t=p([Object(c.a)({},e)]),s=t.includes("-");return Object(A.jsx)("div",{className:"w-full bg-gray-100 bg-opacity-75 my-3",children:Object(A.jsxs)("div",{className:"h-full p-6 rounded-lg border-2 border-gray-300 flex flex-col",children:[Object(A.jsxs)("div",{className:"flex flex-wrap justify-between",children:[Object(A.jsxs)("div",{className:"flex flex-col",children:[Object(A.jsx)("h2",{className:"text-sm tracking-widest title-font mb-1 font-medium",children:e.ticker}),Object(A.jsx)("h1",{className:"text-2xl title-font mb-1 font-medium",children:e.organization||"Anonymous"})]}),Object(A.jsx)("div",{className:"profit",children:Object(A.jsxs)("p",{className:"text-4xl font-bold ".concat(s?"text-red-500":"text-green-500"," flex"),children:[Object(A.jsx)("span",{className:"trend mr-2",children:s?Object(A.jsx)(J.a,{}):Object(A.jsx)(J.b,{})}),Object(A.jsxs)("span",{className:"value",children:["$",t]})]})})]}),Object(A.jsxs)("div",{className:"flex flex-wrap content-start text-center rounded bg-white border border-gray-200 mt-3 mb-3 py-2",children:[Object(A.jsxs)("div",{className:"p-1 sm:w-1/2 lg:w-1/5 w-1/3",children:[Object(A.jsx)("h2",{className:"title-font text-sm text-gray-900",children:e.openingPrice}),Object(A.jsx)("p",{className:"leading-relaxed text-xs text-gray-400 font-light",children:"Open"})]}),Object(A.jsxs)("div",{className:"p-1 sm:w-1/2 lg:w-1/5 w-1/3",children:[Object(A.jsx)("h2",{className:"title-font text-sm text-gray-900",children:e.closingPrice}),Object(A.jsx)("p",{className:"leading-relaxed text-xs text-gray-400 font-light",children:"Close"})]}),Object(A.jsxs)("div",{className:"p-1 sm:w-1/2 lg:w-1/5 w-1/3",children:[Object(A.jsx)("h2",{className:"title-font text-sm text-gray-900",children:e.numberOfShares}),Object(A.jsx)("p",{className:"leading-relaxed text-xs text-gray-400 font-light",children:"Shares"})]}),Object(A.jsxs)("div",{className:"p-1 sm:w-1/2 lg:w-1/5 w-1/3",children:[Object(A.jsx)("h2",{className:"title-font text-sm text-gray-900",children:e.stopLoss}),Object(A.jsx)("p",{className:"leading-relaxed text-xs text-gray-400 font-light",children:"Stop Loss"})]}),Object(A.jsxs)("div",{className:"p-1 sm:w-1/2 lg:w-1/5 w-1/3",children:[Object(A.jsx)("h2",{className:"title-font text-sm text-gray-900",children:e.takeProfit}),Object(A.jsx)("p",{className:"leading-relaxed text-xs text-gray-400 font-light",children:"Take Profit"})]})]}),Object(A.jsxs)("div",{className:"log-actions flex justify-center sm:justify-end",children:[Object(A.jsx)("button",{className:"lg:mt-2 xl:mt-0 btn-small text-white inline bg-yellow-500 border-0 text-xs py-2 px-4 focus:outline-none hover:bg-yellow-600 rounded",children:"Edit"}),Object(A.jsx)("button",{className:"lg:mt-2 xl:mt-0 ml-1 text-white bg-red-500 border-0 text-xs py-2 px-4 focus:outline-none hover:bg-red-600 rounded",children:"Delete"})]})]})})}))]})})]})})}),Object(A.jsxs)("div",{className:"bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse",children:[Object(A.jsx)("button",{type:"button",className:"w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-green-600 text-base font-medium text-white hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 sm:ml-3 sm:w-auto sm:text-sm",onClick:o,children:"New Trade?"}),Object(A.jsx)("button",{type:"button",className:"mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm",onClick:i,children:"Close"})]})]})]})})},V=function(e){return Object(A.jsxs)("div",{className:"DayLabels day-labels",children:[Object(A.jsx)("p",{className:"day",children:"Sunday"}),Object(A.jsx)("p",{className:"day",children:"Monday"}),Object(A.jsx)("p",{className:"day",children:"Tuesday"}),Object(A.jsx)("p",{className:"day",children:"Wednesday"}),Object(A.jsx)("p",{className:"day",children:"Thursday"}),Object(A.jsx)("p",{className:"day",children:"Friday"}),Object(A.jsx)("p",{className:"day",children:"Saturday"})]})},G=function(e){var t=e.isVoidDay,s=e.month,a=e.date,n=e.year,r=e.trades,c=e.isActiveDay,i=e.onSelectDay,o=p(r),l=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:[];return null!==e&&e.length?e.map((function(e){return e.ticker})).join(", "):""}(r),d=(r||[]).length,b=o.includes("-");return t?Object(A.jsx)("div",{className:"Day ".concat(t?"void":"")}):Object(A.jsxs)("div",{className:"\n        Day p-1 \n        ".concat(t?"":"date"," \n        ").concat(d<0?"bg-white text-black":""," \n        ").concat(d&&b?"bg-red-800 text-white":""," \n        ").concat(d&&!b?"bg-green-700 text-white":""," \n        ").concat(c?"border-4 border-yellow-500":"","\n      "),id:"".concat(s,"-").concat(a,"-").concat(n),onClick:function(){return i({month:s,date:a,year:n,trades:r})},children:[Object(A.jsx)("span",{class:"date-label",children:a}),d>0?Object(A.jsxs)("div",{class:"daily-stat py-1",children:[o?Object(A.jsxs)("p",{class:"profit items-center mb-1",children:[Object(A.jsx)("span",{class:"label text-gray-300 font-light",children:"P/L"}),Object(A.jsxs)("span",{class:"text-xs font-bold",children:["$",o]})]}):"",d?Object(A.jsxs)("p",{class:"number-of-trades pb-1",children:[Object(A.jsx)("span",{class:"label text-gray-300 font-light",children:"Trades"}),Object(A.jsx)("span",{class:"ml-2 font-bold",children:d})]}):"",l?Object(A.jsx)("p",{class:"tickers border-t border-gray-300 text-gray justify-center pt-1",children:Object(A.jsx)("span",{class:"text-gray-300 font-light",children:l})}):""]}):""]})},$=function(e){var t,s=e.activeDate,a=(e.activeDateDate,e.activeMonth),n=e.activeYear,r=e.activeTradeLogs,i=(e.todayDate,e.onSelectDay),o=(t=s.getMonth(),new Date(n,t+1,0).getDate()),l=new Date("".concat(a," 1, ").concat(n)),d=l.getDay(),b=o+d,h=Object(T.a)(Array(b).keys()).map((function(e,t){var s=t<d;return{isVoidDay:s,month:s?null:"".concat(a),date:s?null:"".concat(t-d+1),year:s?null:"".concat(n)}})).map((function(e){var t=e.month,s=e.date,a=e.year,n=N(r,t,s,a);return Object(c.a)(Object(c.a)({},e),{},{trades:n||[]})}));return console.log({numberOfDaysInMonth:o,firstOfMonth:l,indexOfFirstDayInMonth:d,numberOfDaysInGrid:b,daysInGrid:h}),Object(A.jsx)("div",{className:"DaysGrid month-grid",id:"month-grid",children:h.map((function(e){var t=e.month,a=e.date,n=e.year,r=e.isVoidDay,o="".concat(O(s))===a&&"".concat(f(s))===t&&"".concat(y(s))===n;return Object(A.jsx)(G,Object(c.a)(Object(c.a)({},e),{},{isActiveDay:o,onSelectDay:i}),r?"".concat(k()):"".concat(t,"-").concat(a,"-").concat(n))}))})},q=function(e){return Object(A.jsxs)("section",{className:"MonthlyCalendarGrid my-2",children:[Object(A.jsx)(V,{}),Object(A.jsx)($,Object(c.a)({},e))]})},B=function(e){var t=e.gains,s=e.losses,a=e.profit,n=a.includes("-");return t&&s&&a?Object(A.jsxs)("div",{className:"MonthlyStats monthly-stats flex",children:[Object(A.jsxs)("p",{className:"gains my-1",children:[Object(A.jsx)("sub",{className:"text-gray-400",children:"Gains: "}),Object(A.jsxs)("span",{className:"text-green-900 title-font sm:text-3xl text-2xl font-medium",children:[" $",t," "]})]}),Object(A.jsxs)("p",{className:"losses text-red-900 my-1 ml-2",children:[Object(A.jsx)("sub",{className:"text-gray-400",children:"Losses: "}),Object(A.jsxs)("span",{className:"text-red-900 title-font sm:text-3xl text-2xl font-medium",children:[" $",s," "]})]}),Object(A.jsxs)("p",{className:"p-l text-gray-900 my-1 ml-2",children:[Object(A.jsx)("sub",{className:"text-gray-400",children:"P/L: "}),Object(A.jsxs)("span",{className:"".concat(n?"text-red-900":"text-green-900"," text-gray-500 title-font sm:text-3xl text-2xl font-medium"),children:[" $",a," "]})]})]}):null},U=s(29),W=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},t=e.prevMonth,s=e.nextMonth,a=e.onClickOnPrevMonth,n=e.onClickOnNextMonth;return t&&s?Object(A.jsxs)("div",{className:"MonthNavigator flex items-center",children:[Object(A.jsxs)("button",{type:"button",className:"inline-flex items-center justify-center px-2 py-1 border border-transparent text-base font-small text-white bg-indigo-600 hover:bg-indigo-700",onClick:a,children:[Object(A.jsx)(U.a,{className:"mr-1"})," ",t]}),Object(A.jsxs)("button",{type:"button",className:"inline-flex items-center justify-center px-2 py-1 ml-1 border border-transparent text-base font-small text-white bg-indigo-600 hover:bg-indigo-700",onClick:n,children:[s," ",Object(A.jsx)(U.b,{className:"ml-1"})]})]}):null},H=function(e){Object(h.a)(s,e);var t=Object(u.a)(s);function s(e){var a;return Object(d.a)(this,s),(a=t.call(this,e)).onClickOnPrevMonth=function(){var e=a.state.activeDate;console.log("click on prev month detected...");var t=v(e);a.setState({activeDate:t})},a.onClickOnNextMonth=function(){var e=a.state.activeDate;console.log("click on next month detected...");var t=w(e);a.setState({activeDate:t})},a.state={todayDate:new Date,activeDate:new Date,showDailyTradesModal:!1,showAddNewTradeFormModal:!1,showAddNewTradeSuccessAlert:!1,newTradeLogError:null},a.onClickOnPrevMonth=a.onClickOnPrevMonth.bind(Object(m.a)(a)),a.onClickOnNextMonth=a.onClickOnNextMonth.bind(Object(m.a)(a)),a.onSelectDay=a.onSelectDay.bind(Object(m.a)(a)),a.setShowDailyTradesModal=a.setShowDailyTradesModal.bind(Object(m.a)(a)),a.setShowAddNewTradeFormModal=a.setShowAddNewTradeFormModal.bind(Object(m.a)(a)),a.onCreateNewTradeLog=a.onCreateNewTradeLog.bind(Object(m.a)(a)),a.onOpenAddNewTradeForm=a.onOpenAddNewTradeForm.bind(Object(m.a)(a)),a.setShowAddNewTradeSuccessAlert=a.setShowAddNewTradeSuccessAlert.bind(Object(m.a)(a)),a}return Object(b.a)(s,[{key:"componentDidMount",value:function(){}},{key:"setShowDailyTradesModal",value:function(){var e=arguments.length>0&&void 0!==arguments[0]&&arguments[0];this.setState({showDailyTradesModal:e})}},{key:"setShowAddNewTradeFormModal",value:function(){var e=arguments.length>0&&void 0!==arguments[0]&&arguments[0];this.setState({showAddNewTradeFormModal:e})}},{key:"setShowAddNewTradeSuccessAlert",value:function(){var e=arguments.length>0&&void 0!==arguments[0]&&arguments[0];this.setState({showAddNewTradeSuccessAlert:e})}},{key:"onSelectDay",value:function(e){var t=e.month,s=e.date,a=e.year;this.setState({activeDate:new Date("".concat(t," ").concat(s,", ").concat(a))}),this.setShowDailyTradesModal(!0)}},{key:"onCreateNewTradeLog",value:function(){var e=Object(l.a)(o.a.mark((function e(t){var s,a,n,r,c;return o.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return s=this.props.user||{},a=s.uid,e.next=3,L(t,a);case 3:n=e.sent,r=n.error,c=n.isNewTradeCreated,r?this.setState({newTradeLogError:r}):(console.info("New Trade created... ".concat(c)),this.setShowAddNewTradeFormModal(!1),this.setShowAddNewTradeSuccessAlert(!0));case 7:case"end":return e.stop()}}),e,this)})));return function(t){return e.apply(this,arguments)}}()},{key:"onOpenAddNewTradeForm",value:function(){this.setShowDailyTradesModal(!1),this.setShowAddNewTradeFormModal(!0)}},{key:"render",value:function(){var e=this,t=this.props.allTradeLogs,s=this.state,a=s.activeDate,n=s.showDailyTradesModal,r=s.showAddNewTradeFormModal,i=s.newTradeLogError,o=s.showAddNewTradeSuccessAlert,l=O(a).toString(),d=f(a),b=y(a).toString(),h=function(){var e=arguments.length>1?arguments[1]:void 0,t=arguments.length>2?arguments[2]:void 0;return(arguments.length>0&&void 0!==arguments[0]?arguments[0]:[]).filter((function(s){return s.month===e&&s.year===t}))}(t,d,b),u=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:[];if(null===e||!e.length)return{gains:"0.00",losses:"0.00",profit:"0.00"};var t=e.map((function(e){return{tradeType:e.tradeType,openingPrice:parseFloat(e.openingPrice).toFixed(2),closingPrice:parseFloat(e.closingPrice).toFixed(2),numberOfShares:parseInt(e.numberOfShares)}})).map((function(e){return"short"===e.tradeType?(e.openingPrice-e.closingPrice)*e.numberOfShares:(e.closingPrice-e.openingPrice)*e.numberOfShares})).reduce((function(e,t){return t>0&&(e.gains=e.gains+t),t<0&&(e.losses=e.losses+t),e.profit=e.profit+t,e}),{gains:0,losses:0,profit:0});return{gains:parseFloat(t.gains).toFixed(2),losses:parseFloat(t.losses).toFixed(2),profit:parseFloat(t.profit).toFixed(2)}}(h),m=u.gains,x=u.losses,j=u.profit;return console.log({activeTradeLogs:h,gains:m,losses:x,profit:j}),Object(A.jsxs)("article",{className:"MonthlyCalendar",children:[Object(A.jsxs)("header",{className:"flex py-2 px-2 justify-between items-center flex-wrap",children:[Object(A.jsx)(W,{prevMonth:f(v(a)),nextMonth:f(w(a)),onClickOnPrevMonth:this.onClickOnPrevMonth,onClickOnNextMonth:this.onClickOnNextMonth}),Object(A.jsxs)("h1",{className:"active-date sm:text-3xl text-2xl font-medium title-font text-gray-900 text-center",children:[" ",d," ",l,", ",b," "]}),Object(A.jsx)(B,{gains:m,losses:x,profit:j})]}),Object(A.jsx)("section",{children:Object(A.jsx)(q,Object(c.a)(Object(c.a)({},this.state),{},{activeDateDate:l,activeMonth:d,activeYear:b,activeTradeLogs:h,onSelectDay:this.onSelectDay}))}),Object(A.jsx)(F,{onClick:function(){return e.setShowAddNewTradeFormModal(!0)}}),o&&Object(A.jsx)(Y,{}),n&&Object(A.jsx)(z,{activeDateDate:l,activeMonth:d,activeYear:b,activeTradeLogs:h,onClose:function(){return e.setShowDailyTradesModal(!1)},onOpenAddNewTradeForm:this.onOpenAddNewTradeForm}),r&&Object(A.jsx)(E,{activeDateDate:l,activeMonth:d,activeYear:b,newTradeLogError:i,onCreateNewTradeLog:function(t){return e.onCreateNewTradeLog(t)},onClose:function(){return e.setShowAddNewTradeFormModal(!1)}})]})}}]),s}(a.Component),K=H,X=function(e){Object(h.a)(s,e);var t=Object(u.a)(s);function s(e){var a;return Object(d.a)(this,s),(a=t.call(this,e)).state={user:g(),allTradeLogs:[]},a}return Object(b.a)(s,[{key:"componentDidMount",value:function(){var e=Object(l.a)(o.a.mark((function e(){var t;return o.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if((t=this.state.user)&&null!==t){e.next=3;break}return e.abrupt("return");case 3:(t||{}).uid,this.setState({allTradeLogs:[{closingPrice:"8.00",date:"12",month:"October",notes:"",numberOfShares:2,openingPrice:"10.00",stopLoss:"9.00",takeProfit:"15.00",ticker:"LOL",tradeId:"sd7f7f8d57fd",year:"2021",tradeType:"long"},{closingPrice:"12.00",date:"14",month:"October",notes:"",numberOfShares:2,openingPrice:"10.00",stopLoss:"9.00",takeProfit:"15.00",ticker:"GOOGL",tradeId:"g76df7dg76fg6",year:"2021",tradeType:"long"},{closingPrice:"8.00",date:"14",month:"October",notes:"",numberOfShares:2,openingPrice:"10.00",stopLoss:"9.00",takeProfit:"15.00",ticker:"GOOGL",tradeId:"df678d867fg",year:"2021",tradeType:"long"}]});case 5:case"end":return e.stop()}}),e,this)})));return function(){return e.apply(this,arguments)}}()},{key:"render",value:function(){return console.log({props:this.props,state:this.state}),Object(A.jsx)("div",{className:"App Dashboard",children:Object(A.jsx)(K,Object(c.a)(Object(c.a)({},this.props),this.state))})}}]),s}(a.Component),Q=X;r.a.render(Object(A.jsx)(Q,{}),document.getElementById("root"))}},[[46,1,2]]]);
//# sourceMappingURL=main.71967585.chunk.js.map