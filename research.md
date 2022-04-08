# Requirements (prioritized):

1. Custom header components (without editing raw data).
2. Custom cell components (without editing raw data).
3. Clickable Icons in cells and headers.
4. Infinite scroller div for API data.
5. Virtuallization for big data sets.
6. Selectable rows.
7. Order data.
    - Mostly API data so no in memory ordering (but good to have).
8. Filter data.
    - Mostly API data so no in memory filtering (but good to have). 
9. Edit row data without re-redering the table.
10. Add data without re-redering the table.
11. Remove data without re-redering the table.
12. Multi header.
13. General good performance.
14. Support 'no data' state.
15. Sticky headers and columns.
16. As much flexibility as possible for future features.
17. Ease of use.

<br>

# Resources:

## react-table:
Notes:
- Flexible
- Customizable 
- Not very easy to use
- Can do everything
- Performant??
- Very difficult to pair virtualization with good styling 
    - Use virtualization only for big tables?
    - Column with must be fixed. Cloud we make a workaround to fix that?

Links:
- [Library](https://react-table.tanstack.com/)   
- [Control state (useful for passing new data?)](https://react-table.tanstack.com/docs/faq#how-can-i-manually-control-the-table-state)  
- [Example virtualized rows feature (native)](https://react-table.tanstack.com/docs/examples/virtualized-rows )
- [Example virtualized rows feature (native) and infinite loader with react-infinite-scroll](https://codesandbox.io/s/dazzling-field-48x39?file=/src/App.tsx)
- [Some examples for understanding the library](https://vncvish.medium.com/unleashing-the-power-of-react-table-part-2-1997cb7ac4da)ç
- [Table with divs](https://codesandbox.io/s/github/tannerlinsley/react-table/tree/v7/examples/full-width-resizable-table?file=/src/App.js)

## react-virtualized
Notes: 
- Performant
- We have to implement most of custom behavior
Links:
- [Library](https://github.com/bvaughn/react-virtualized)

## react-window
Notes: 
- Performant
- We have to implement almost all custom behavior
- Flexible
- Small
- Just for virtualization (Can be used with react-table)
Links:
- [Library](https://github.com/bvaughn/react-window)

## react-base-table
Notes: 
- Maybe all batteries included (ensure that)
- Supported by Autodesk
- Maybe overshoot for simple tables?
- Minimal docs but many examples
- Similar to 'react-data-grid' but maybe easier to use
Links:
- [Library](https://autodesk.github.io/react-base-table/examples/default)  
- [Docs](https://autodesk.github.io/react-base-table/docs/get-started)
- [Different column width](https://github.com/Autodesk/react-base-table/issues/37)
- [Different column width](https://github.com/Autodesk/react-base-table/issues/43)

## react-data-grid
Notes: 
- Strange default styling. Very difficult to re-style
- Minimal docs
- Could comply with all requirements but styling

Links:
- [Library](https://github.com/adazzle/react-data-grid)
- [Column width based on data?](https://github.com/adazzle/react-data-grid/discussions/2790)
- [Styling](https://stackoverflow.com/questions/60799524/how-to-override-react-data-grid-styles-with-material-ui-in-react)

## rsuite-table
Notes: 
- May be everything we want. We should check
- Width for each column has to be specified (flexGrow available??)
- Scroll buggy when virtualized
- No community content

Links:
- [Library](https://rsuitejs.com/components/table/#custom-cell)
- [More examples & how to update data in table](https://rsuite.github.io/rsuite-table/#8)

## Alternatives
Use virtualization but instead of use tables use lists with columns so we get the desired styling

## Final decision
Create an 'all batteries included table' using react-table library with custom virtualization provided by react-window and infinitescrolling with react-window-infinite-loader.

## Misc:

- https://reactjs.org/docs/optimizing-performance.html#virtualize-long-lists  
- https://dev.to/n8tb1t/tracking-scroll-position-with-react-hooks-3bbj  
- https://www.npmjs.com/package/react-infinite-scroll-component  
- https://codesandbox.io/s/nameless-river-3o211i?file=/src/index.js


