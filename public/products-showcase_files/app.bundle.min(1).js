!function(n){var t={};function e(o){if(t[o])return t[o].exports;var i=t[o]={i:o,l:!1,exports:{}};return n[o].call(i.exports,i,i.exports,e),i.l=!0,i.exports}e.m=n,e.c=t,e.d=function(n,t,o){e.o(n,t)||Object.defineProperty(n,t,{enumerable:!0,get:o})},e.r=function(n){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(n,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(n,"__esModule",{value:!0})},e.t=function(n,t){if(1&t&&(n=e(n)),8&t)return n;if(4&t&&"object"==typeof n&&n&&n.__esModule)return n;var o=Object.create(null);if(e.r(o),Object.defineProperty(o,"default",{enumerable:!0,value:n}),2&t&&"string"!=typeof n)for(var i in n)e.d(o,i,function(t){return n[t]}.bind(null,i));return o},e.n=function(n){var t=n&&n.__esModule?function(){return n.default}:function(){return n};return e.d(t,"a",t),t},e.o=function(n,t){return Object.prototype.hasOwnProperty.call(n,t)},e.p="https://static.parastorage.com/services/cookie-consent-policy-client/1.717.0/",e(e.s=0)}([function(n,t,e){"use strict";e.r(t),e.d(t,"ConsentPolicyManager",(function(){return O}));var o=["wix.com","editorx.com"];function i(n,t){return void 0===n&&(n=""),void 0===t&&(t=""),t===n||t.indexOf(".".concat(n))===t.replace(".".concat(n),"").length}function c(n){return t=o,e=n||location.hostname,t.some((function(n){return i(n,e)}));var t,e}function r(n){var t,e="[;\\s ]?".concat(n,"=([\\S]+(?:;?))"),o=document.cookie.match(e);return(null===(t=null==o?void 0:o.pop())||void 0===t?void 0:t.replace(";",""))||void 0}function a(n,t){try{"function"==typeof n&&n(t)}catch(n){console&&console.error(n)}}var s={essential:!0,functional:!0,analytics:!0,advertising:!0,dataToThirdParty:!0},l={essential:!0,functional:!0,analytics:!0,advertising:!1,dataToThirdParty:!1},u={func:"functional",anl:"analytics",adv:"advertising",dt3:"dataToThirdParty",ess:"essential"};function f(n){var t=y();if(t&&!t.defaultPolicy){var e=function(n){var t="",e="";if(o.forEach((function(n){i(n,location.hostname)&&(t=".".concat(n),e="/")})),!t&&!e){t=location.hostname;var c=n.split(location.hostname);if("/"===(e=c[1]?"".concat(c[1]):"/")){var r=t.split(".");r.shift(),t=".".concat(r.join("."))}}return{host:t,path:e}}(n),c=e.path,r=e.host;return document.cookie="".concat("consent-policy","=; expires=Thu, 01 Jan 1970 00:00:00 GMT; domain=").concat(r,"; path=").concat(c,";"),!0}return!1}function y(){var n,t=r("consent-policy");if(!t||"string"!=typeof t)return!1;var e={};try{var o=JSON.parse(decodeURIComponent(t));return Object.keys(u).forEach((function(n){"number"==typeof o[n]&&(e[u[n]]=1===o[n])})),n=function(n){var t;"number"==typeof n&&(t=new Date(1e3*n*60));return t}(o.ts),{defaultPolicy:!!o.temp,policy:e,createdDate:n}}catch(n){return!1}}function d(n,t){var e=y();return e||{defaultPolicy:!0,policy:function(n,t){return p(t||(c(n)?l:s))}(n,t)}}function p(n){return JSON.parse(JSON.stringify(n))}function v(n,t,e){var o;!!document.documentMode?(o=document.createEvent("CustomEvent")).initCustomEvent(n,!0,!1,e):o=new CustomEvent(n,{detail:e,bubbles:!0}),t&&t.dispatchEvent&&t.dispatchEvent(o)}var g="consentPolicyChanged",h="consentPolicyManagerReady";function P(n){return void 0===n&&(n=""),"".concat((t=n,void 0===t&&(t=""),c()||!t?"":0===t.indexOf("http")?t:"\\\\".concat(t))).concat("/_api/cookie-consent-policy/v1/consent-policies");var t}var b=function(){return(b=Object.assign||function(n){for(var t,e=1,o=arguments.length;e<o;e++)for(var i in t=arguments[e])Object.prototype.hasOwnProperty.call(t,i)&&(n[i]=t[i]);return n}).apply(this,arguments)},m=function(n){v(g,document,n)},O=function(){function n(){var n=this;this.config={baseUrl:""},this.hostname=window.location.hostname,this.initRan=!1,this.getValidPolicy=function(t){var e={},o=n.getCurrentConsentPolicy().policy;return"object"==typeof t&&Object.keys(s).forEach((function(n){"boolean"==typeof t[n]&&(e[n]=t[n])})),b(b({},o),e)},this.shouldTriggerConsentPolicyChanged=function(t){return t.consentPolicy&&n.initRan&&n.getCurrentConsentPolicy().defaultPolicy&&JSON.stringify(t.consentPolicy)!==JSON.stringify(n.getCurrentConsentPolicy().policy)},this.init=function(t){var e,o="string"==typeof t?{baseUrl:t}:{baseUrl:t.baseUrl,consentPolicy:t.consentPolicy}||{};o.consentPolicy&&(o.consentPolicy=n.getValidPolicy(o.consentPolicy)),n.shouldTriggerConsentPolicyChanged(o)&&m({defaultPolicy:!0,policy:o.consentPolicy}),n.initRan=!0,n.config=b(b({},n.config),o),n.config.baseUrl=(e=n.config.baseUrl||"").endsWith("/")?e.slice(0,-1):e},this.setConsentPolicy=function(t,e,o){if(void 0===t){var i="setConsentPolicy: no policy sent as parameter";o&&o(i),console.error(i)}var s=function(n){o&&o("Failed setting policy. details: ".concat(n))},l=JSON.stringify(b({policy:b(b({},n.getValidPolicy(t)),{essential:!0}),location:location.href},n.config.baseUrl?{baseUrl:n.config.baseUrl}:{})),u=window.wixEmbedsAPI,f=!c()&&u&&u.getAppToken&&u.getAppToken("22bef345-3c5b-4c18-b782-74d4085112ff");!function(n,t,e,o,i){var c=new XMLHttpRequest;c.open("POST",n,!0),c.onreadystatechange=function(){if(4===c.readyState){var n=c.status;n<200||n>=300?a(e,n):a(t,c.responseText)}},c.setRequestHeader("content-type","application/json"),i&&c.setRequestHeader("authorization",i);var s=r("XSRF-TOKEN");s&&c.setRequestHeader("x-xsrf-token",s),c.send(o||null)}(P(n.config.baseUrl),(function(n){try{var t=JSON.parse(n),o={defaultPolicy:!1,policy:t.consent.policy},i=t.consent.timestamp;i&&(o.createdDate=new Date(i)),m(o),e&&e(o)}catch(n){s(n)}}),s,l,f)},this.getCurrentConsentPolicy=function(){return d(n.hostname,n.config.consentPolicy)},this._getConsentPolicyHeader=function(){return t=n.hostname,e=n.config.consentPolicy,i=d(t,e).policy,c=!1,r=Object.keys(u).reduce((function(n,t){var e=i[u[t]];return n[t]=e?1:0,e||(c=!0),n}),{}),c?((o={})["consent-policy"]=encodeURIComponent(JSON.stringify(r)),o):{};var t,e,o,i,c,r}}return n.prototype.resetPolicy=function(){var n=this,t=f(this.config.baseUrl||"");return t&&setTimeout((function(){m(n.getCurrentConsentPolicy())}),5),t},n}();"undefined"!=typeof window&&(window.consentPolicyManager=new O,v(h,window,window.consentPolicyManager))}]);
//# sourceMappingURL=app.bundle.min.js.map