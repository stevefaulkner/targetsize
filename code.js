javascript: (function() {
    const style = document.createElement("style");
    style.innerHTML = `
        .circle-overlay {
            position: absolute;
            width: 24px;
            height: 24px;
            pointer-events: none;
            z-index: 9999;
        }
    `;
    document.head.appendChild(style);

    function getCenter(element) {
        const rect = element.getBoundingClientRect();
        return {
            top: rect.top + window.scrollY + rect.height / 2,
            left: rect.left + window.scrollX + rect.width / 2
        };
    }

    function isVisible(element) {
        return element.offsetWidth > 0 && element.offsetHeight > 0 && getComputedStyle(element).visibility !== "hidden";
    }

    const centers = [];

    document.querySelectorAll('a, button, input:not([type=hidden]), select, textarea, [tabindex], [role=button], [role=checkbox], [role=link], [role=menuitem], [role=option], [role=radio], [role=switch], [role=tab]').forEach(element => {
        if (isVisible(element)) {
            let center;
            if (element.tagName.toLowerCase() == 'input' && element.labels && element.labels.length > 0) {
                const label = element.labels[0];
                const labelCenter = getCenter(label);
                const inputCenter = getCenter(element);
                center = {
                    top: (labelCenter.top + inputCenter.top) / 2,
                    left: (labelCenter.left + inputCenter.left) / 2
                };
            } else {
                center = getCenter(element);
            }
            
            const wrapperDiv = document.createElement("div");
            wrapperDiv.setAttribute("aria-hidden", "true");
            wrapperDiv.style.position = "absolute";
            wrapperDiv.style.top = `${center.top - 12}px`;
            wrapperDiv.style.left = `${center.left - 12}px`;
            
            const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
            svg.setAttribute("width", 24);
            svg.setAttribute("height", 24);
            svg.setAttribute("class", "circle-overlay");
            
            const circle = document.createElementNS("http://www.w3.org/2000/svg", "circle");
            circle.setAttribute("cx", 12);
            circle.setAttribute("cy", 12);
            circle.setAttribute("r", 12);
            circle.setAttribute("fill", "rgba(255,0,0,0.3)");
            
            svg.appendChild(circle);
            wrapperDiv.appendChild(svg);
            document.body.appendChild(wrapperDiv);
            
            centers.push({
                element: element,
                center: center,
                svg: svg
            });
        }
    });

    let overlapCount = 0;
    centers.forEach((itemA, index) => {
        centers.slice(index + 1).forEach(itemB => {
            if (Math.sqrt(Math.pow(itemB.center.left - itemA.center.left, 2) + Math.pow(itemB.center.top - itemA.center.top, 2)) < 24) {
                overlapCount++;
                itemA.element.setAttribute("aria-description", "overlap");
                itemB.element.setAttribute("aria-description", "overlap");
            }
        });
    });

    if (overlapCount > 0) {
        alert(`There are ${overlapCount} overlapping target elements.`);
    }
})();
