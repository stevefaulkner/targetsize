// Self-invoking function to prevent polluting the global namespace
export default function targetSizeBookmarkletSource () {
(function () {
  /* Function to get the center of an element */
  function getCenter(el) {
    const rect = el.getBoundingClientRect();
    return {
      top: rect.top + window.scrollY + rect.height / 2,
      left: rect.left + window.scrollX + rect.width / 2
    };
  }

  /* Function to check if an element or its ancestors are hidden */
  function isVisible(el) {
    let current = el;
    while (current) {
      const style = getComputedStyle(current);
      if (style.display === 'none' || style.visibility === 'hidden') {
        return false;
      }
      current = current.parentElement;
    }
    return true;
  }

  const SVG_NS = 'http://www.w3.org/2000/svg';

  /* Get all interactive elements that are visible */
  const elements = [...document.querySelectorAll('a, label, button, input:not([type=hidden]), select, textarea, [tabindex], [role=button], [role=checkbox], [role=link], [role=menuitem], [role=option], [role=radio], [role=switch], [role=tab]')].filter(isVisible);

  const centers = [];

  /* Iterate through all interactive elements to find their centers and create SVG circles around them */
  elements.forEach(el => {
    if(!el.matches('label') && el.closest('label')) { return; }

    const center = getCenter(el);
    centers.push({ element: el, center: center });

    const svg = document.createElementNS(SVG_NS, 'svg');
    svg.style.position = 'absolute';
    svg.style.top = `${center.top - 12}px`;
    svg.style.left = `${center.left - 12}px`;
    svg.style.width = '24px';
    svg.style.height = '24px';
    svg.style.zIndex = '9999';
    svg.style.margin = '0';
    svg.style.pointerEvents = 'none';
    svg.setAttribute('aria-hidden', 'true');

    const circle = document.createElementNS(SVG_NS, 'circle');
    circle.setAttribute('cx', '12');
    circle.setAttribute('cy', '12');
    circle.setAttribute('r', '12');

    const clip = document.createElementNS(SVG_NS, 'clipPath');
    clip.setAttribute('id', 'clip');
    clip.appendChild(circle.cloneNode());
    svg.appendChild(clip);
    circle.setAttribute('clip-path', 'url(#clip)');

    if (el.getBoundingClientRect().width < 24 || el.getBoundingClientRect().height < 24) {
      circle.setAttribute('fill', 'rgba(0, 0, 255, 0.3)');
    } else {
      circle.setAttribute('fill', 'rgba(0, 200, 0, 0.3)');
      circle.setAttribute('stroke', 'rgba(0, 200, 0, 0.8)');
      circle.setAttribute('stroke-width', '4');
    }

    svg.appendChild(circle);
    document.body.appendChild(svg);
  });

  const overlaps = [];

  /* Check for overlapping elements */
  centers.forEach((item1, index) => {
    centers.slice(index + 1).forEach(item2 => {
      if (Math.sqrt(Math.pow(item2.center.left - item1.center.left, 2) + Math.pow(item2.center.top - item1.center.top, 2)) < 24) {
        overlaps.push(item1.element);
        overlaps.push(item2.element);
      }
    });
  });

  /* Remove duplicates and set aria-description to 'overlap' */
  const uniqueOverlaps = [...new Set(overlaps)];
  uniqueOverlaps.forEach(el => el.setAttribute('aria-description', 'overlap'));

  /* Alert the user about the number of overlapping elements */
  alert(`There are ${uniqueOverlaps.length} overlapping controls.`);
})();
}
