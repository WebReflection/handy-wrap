/*! (c) Andrea Giammarchi - ISC */
const{iterator:e}=Symbol,t=new Map,r=(e,t)=>e?t.at(0):t,n={get({_:n,$:l},o,u){if(t.has(o))return t.get(o)(r(n,l),o,u);switch(o){case e:return l[e].bind(l);case"emit":return(e,...t)=>{for(let r=0;r<l.length;r++)l[r].dispatchEvent(new Event(e,...t));return u};case"length":return r(n,l)?.length;case"valueOf":return()=>r(n,l);case"on":o="addEventListener";default:{let e;for(let t=0;t<l.length;t++)if(t)e[t]=l[t][o];else{if(e=l[t][o],"function"==typeof e)return(...e)=>{for(let t=0;t<l.length;t++)l[t][o](...e);return u};if(n)return e;e=[e]}return e}}},set({$:e},t,r){for(let n=0;n<e.length;n++)e[n][t]=r;return!0}},l=(e,t,r=globalThis.document)=>"string"==typeof e?r[t](e):e.valueOf(),o=(e,t)=>new Proxy({_:1,$:[l(e,"querySelector",t)]},n),u=(e,t)=>new Proxy({_:0,$:l(e,"querySelectorAll",t)},n);export{o as $,u as $$,t as plugins};
