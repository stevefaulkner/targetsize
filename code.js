// Self-invoking function to prevent polluting the global namespace
(function() {

    // Function to compute the center of an element, taking into account the current scroll position.
    function getCenter(el) {
        const rect = el.getBoundingClientRect();
        return {
            top: rect.top + window.scrollY + rect.height / 2,
            left: rect.left + window.scrollX + rect.width / 2
        };
    }

    // Function to check if an element, or any of its parents, have `display: none` or `visibility: hidden`
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

    // Define SVG namespace
    const SVG_NS = "http://www.w3.org/2000/svg";

    // Get all interactive elements (like buttons, links, etc.) on the page and filter out the ones that are not visible.
    const elements = [...document.querySelectorAll("a, button, input:not([type=hidden]), select, textarea, [tabindex], [role=button], [role=checkbox], [role=link], [role=menuitem], [role=option], [role=radio], [role=switch], [role=tab]")].filter(isVisible);
    
    // Array to store center points of all elements
    const centers = [];

    // Iterate over all elements, compute their centers, and draw SVG circles around them
    elements.forEach(element => {
        const center = getCenter(element);
        centers.push({
            element: element,
            center: center
        });

        // Create an SVG element for the circle
        const svgElem = document.createElementNS(SVG_NS, "svg");
        svgElem.style.position = "absolute";
        svgElem.style.top = `${center.top - 12}px`;
        svgElem.style.left = `${center.left - 12}px`;
        svgElem.style.width = "24px";
        svgElem.style.height = "24px";
        svgElem.style.zIndex = "9999";
        svgElem.style.padding = "0";
        svgElem.style.margin = "0"; // found lobotomized owl CSS *-* messed with positioning, this resolves. Damn you Pickering!
        svgElem.style.pointerEvents = "none";  // This ensures that the SVG won't interfere with user interactions
        svgElem.setAttribute("aria-hidden", "true");  // Hide SVG from screen readers

        // Create a circle within the SVG
        const circleElem = document.createElementNS(SVG_NS, "circle");
        circleElem.setAttribute("cx", "12");
        circleElem.setAttribute("cy", "12");
        circleElem.setAttribute("r", "12");

        // If the element is smaller than 24x24 pixels, give the circle a red fill and a dashed border. Otherwise, fill it blue.
        if(element.getBoundingClientRect().width < 24 || element.getBoundingClientRect().height < 24) {
            circleElem.setAttribute("fill", "rgba(255, 0, 0, 0.3)");
            circleElem.setAttribute("stroke", "rgba(255, 0, 0, 0.8)");
            circleElem.setAttribute("stroke-width", "1");
            circleElem.setAttribute("stroke-dasharray", "2,2");
        } else {
            circleElem.setAttribute("fill", "rgba(0, 0, 255, 0.3)");
        }

        // Append the circle to the SVG, and the SVG to the document
        svgElem.appendChild(circleElem);
        document.body.appendChild(svgElem);
    });

    // List to store overlapping elements
    const overlaps = [];

    // Check for overlaps between all pairs of elements
    centers.forEach((a, i) => {
        centers.slice(i+1).forEach(b => {
            // If the distance between the centers of two elements is less than 24 pixels, they overlap.
            if(Math.sqrt(Math.pow(b.center.left - a.center.left, 2) + Math.pow(b.center.top - a.center.top, 2)) < 24) {
                overlaps.push(a.element);
                overlaps.push(b.element);
            }
        });
    });

    // Filter out duplicate overlapping elements
    const uniqueOverlaps = [...new Set(overlaps)];

    // Add the 'aria-description' attribute to all overlapping elements
    uniqueOverlaps.forEach(e => e.setAttribute("aria-description", "overlap"));

    // Alert the number of overlapping controls
    alert(`There are ${uniqueOverlaps.length} overlapping controls.`);
})();
