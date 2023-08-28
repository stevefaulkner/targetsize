# target size Bookmarklet

Get the [Target Size](https://cdpn.io/pen/debug/YzdwWZw) Bookmarklet 

## un-minified
[code.js](https://github.com/stevefaulkner/targetsize/blob/main/code.js)
## minified
````
javascript:(function(){function t(e){const t=e.getBoundingClientRect();return{top:t.top+window.scrollY+t.height/2,left:t.left+window.scrollX+t.width/2}}function e(e){let t=e;for(;t;){const e=getComputedStyle(t);if('none'===e.display||'hidden'===e.visibility)return!1;t=t.parentElement}return!0}const n='http://www.w3.org/2000/svg',o=[...document.querySelectorAll('a, button, input:not([type=hidden]), select, textarea, [tabindex], [role=button], [role=checkbox], [role=link], [role=menuitem], [role=option], [role=radio], [role=switch], [role=tab]')].filter(e),r=[];o.forEach(e=>{const o=t(e);r.push({element:e,center:o});const c=document.createElementNS(n,'svg');c.style.position='absolute',c.style.top=`${o.top-12}px`,c.style.left=`${o.left-12}px`,c.style.width='24px',c.style.height='24px',c.style.zIndex='9999',c.style.margin='0',c.style.pointerEvents='none',c.setAttribute('aria-hidden','true');const i=document.createElementNS(n,'circle');i.setAttribute('cx','12'),i.setAttribute('cy','12'),i.setAttribute('r','12'),e.getBoundingClientRect().width<24||e.getBoundingClientRect().height<24?(i.setAttribute(%27fill%27,%27rgba(255, 0, 0, 0.3)%27),i.setAttribute(%27stroke%27,%27rgba(255, 0, 0, 0.8)%27),i.setAttribute(%27stroke-width%27,%271%27),i.setAttribute(%27stroke-dasharray%27,%272,2%27)):i.setAttribute(%27fill%27,%27rgba(0, 0, 255, 0.3)%27),c.appendChild(i),document.body.appendChild(c)});const c=[];r.forEach((e,t)=>{r.slice(t+1).forEach(n=>{Math.sqrt(Math.pow(n.center.left-e.center.left,2)+Math.pow(n.center.top-e.center.top,2))<24&&(c.push(e.element),c.push(n.element))})});const l=[...new Set(c)];l.forEach(e=>e.setAttribute(%27aria-description%27,%27overlap%27)),alert(`There are ${l.length} overlapping controls.`)})()

````
