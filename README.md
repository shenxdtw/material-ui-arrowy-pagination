# material-ui-arrowy-pagination
An easy to use and customizable pagination component for [Material-UI](https://material-ui-next.com).

![Demonstration](https://i.imgur.com/WpaZXWJ.gif)
### Notice
---
This component require `material-ui` version >= v1.0.0

FYI
[material-ui@next](https://material-ui-next.com/)

### Quick Start
---
```sh
npm install material-ui-arrowy-pagination
```
```js
import Pagination from 'material-ui-arrowy-pagination';
```

### Usage
---
material-ui-pagination exposes one module called, `Pagination`, which accepts a few props:

Option               | Description              
---------------------|-----------------------------------------------
`total`              | Total number of pages
`display`            | Number of pages you want to show in the panel
`current`            | Current page selected
`onChange`           | Handles the change event of selected page: `function(pageNumber: integer, previousPageNumber: integer) => void`
`styleRoot`          | Styles for root element
`styleFirstPageButton` | Styles for `FirstPageButton`. If not provided, a custom `IconButton` from `Material UI` will be rendered as default, otherwise `<div>` with styles will show up instead
`stylePreviousPageButton` | Styles for `PreviousPageButton`. If not provided, a custom `IconButton` from `Material UI` will be rendered as default, otherwise `<div>` with styles will show up instead
`styleNextPageButton` | Styles for `NextPageButton`. If not provided, a custom `IconButton` from `Material UI` will be rendered as default, otherwise `<div>` with styles will show up instead
`styleLastPageButton`  | Styles for `LastPageBottub`. If not provided, a custom `IconButton` from `Material UI` will be rendered as default, otherwise `<div>` with styles will show up instead
`styleButton`        | Styles for page number button. If not provided, a `IconButton` from `Material UI` will be rendered as default, otherwise `<div>` with styles will show up instead
`stylePrimary`       | Styles for active page element. Requires the `styleButton` 
`showFirstPageButton`       | control render `FirstPageButton`, default is `false`
`showPreviousPageButton`       | control render `PreviousPageButton`, default is `false`
`showPageNumberButton`       | control render `showPageNumberButton`, default is `true`
`showNextPageButton`       | control render `NextPageButton`, default is `false`
`showLastPageButton`       | control render `LastPageButton`, default is `false`

### Run Local Demo
---

```sh
git clone https://github.com/shenxdtw/material-ui-arrowy-pagination
npm install
npm run dev-server
# visit http://localhost:7890/
```

### Run Test
---

```sh
git clone https://github.com/shenxdtw/material-ui-arrowy-pagination
npm install
npm run test
```

### Code Example
---
```js
import Pagination from 'material-ui-arrowy-pagination';

<Pagination 
    total={10}
    current={1}
    display={5}
    onChange={(pageNumber, previousPageNumber) => {}}
    showFirstPageButton
    showPreviousPageButton
    showNextPageButton
    showLastPageButton
/>
```

### Thanks
---
This project is modified with reference to [material-ui-pagination](https://github.com/lo-tp/material-ui-pagination).

Thanks to the author of [material-ui-pagination](https://github.com/lo-tp/material-ui-pagination).

### License
---
MIT licensed.

