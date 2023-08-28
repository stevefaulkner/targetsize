# targetsize
Scripted aid to identifying overlapping targets. It is meant to help test WCAG 2.2 Success Criterion [2.5.8 Target Size (Minimum)](https://www.w3.org/TR/WCAG22/#target-size-minimum)
## What does it do?
1. identifies interactive elements.
2. works out the centre of the element.
3. draws a semi-transparent 24x24 pixel circle based on the centre of the element.
4. if the element has a height or width less than 24 pixels the circle is red with a dashed red border.
5. if the element has a height or width 24 pixels or greater the circle is blue with no border.
6. if an interactive element is identified as overlapping another interactive element a javascript alert is displayed with details of the number of overlapping elements.
7. each element that overlaps another is given an `aria-description="overlaps"`.
8. only visible elements will be included in the script output.

## How did it come to be?
A desire to make the process of checking [2.5.8 Target Size (Minimum)](https://www.w3.org/TR/WCAG22/#target-size-minimum) as painless and swift as is possible given my severe limitations in writing JavaScript .
A rather torturous and [elongated struggle with ChatGPT](https://chat.openai.com/share/44300874-351e-4c4e-a760-f6032ac1d8a0)

# notes
- this script is largely untested and probably unreliable. My hope is someone who can actually write/understand JavaScript will improve it.
