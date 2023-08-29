# target size Bookmarklet

Get the [Target Size](https://cdpn.io/pen/debug/YzdwWZw) Bookmarklet 

## un-minified
[code.js](https://github.com/stevefaulkner/targetsize/blob/main/code.js)
## minified
````
javascript:(function(){function t(e){const t=e.getBoundingClientRect();return{top:t.top+window.scrollY+t.height/2,left:t.left+window.scrollX+t.width/2}}function e(e){let t=e;while(t){const e=getComputedStyle(t);if('none'===e.display||'hidden'===e.visibility)return!1;t=t.parentElement}return!0}const n='http://www.w3.org/2000/svg',o=[...document.querySelectorAll('a, label, button, input:not([type=hidden]), select, textarea, [tabindex], [role=button], [role=checkbox], [role=link], [role=menuitem], [role=option], [role=radio], [role=switch], [role=tab]')].filter(e),s=[];o.forEach(function(e){if(!e.matches('label')&&e.closest('label'))return;const o=t(e);s.push({element:e,center:o});const r=document.createElementNS(n,'svg');r.style.position='absolute',r.style.top=`${o.top-12}px`,r.style.left=`${o.left-12}px`,r.style.width='24px',r.style.height='24px',r.style.zIndex='9999',r.style.margin='0',r.style.pointerEvents='none',r.setAttribute('aria-hidden','true');const l=document.createElementNS(n,'circle');l.setAttribute('cx','12'),l.setAttribute('cy','12'),l.setAttribute('r','12');const a=document.createElementNS(n,'clipPath');a.setAttribute('id','clip'),a.appendChild(l.cloneNode()),r.appendChild(a),l.setAttribute('clip-path','url(#clip)'),e.getBoundingClientRect().width<24||e.getBoundingClientRect().height<24?l.setAttribute('fill','rgba(0, 0, 255, 0.3)'):(l.setAttribute('fill','rgba(0, 200, 0, 0.3)'),l.setAttribute('stroke','rgba(0, 200, 0, 0.8)'),l.setAttribute('stroke-width','4')),r.appendChild(l),document.body.appendChild(r)});const r=[];s.forEach(function(e,t){s.slice(t+1).forEach(function(n){Math.sqrt(Math.pow(n.center.left-e.center.left,2)+Math.pow(n.center.top-e.center.top,2))<24&&(r.push(e.element),r.push(n.element))})});const l=[...new Set(r)];l.forEach(function(e){e.setAttribute('aria-description','overlap')}),alert(`There are ${l.length} overlapping controls.`)})();

````
