# React Filter Bar

[live demo](https://ruichen0101.github.io/react-filter-bar/)

## Install

```
npm i @ruichen0101/react-filter-bar
```

## Stylesheets

Make sure you import the global style in index.js/tsx.

```javascript
import '@ruichen0101/react-filter-bar/dist/css/ReactFilterBar.min.css';
```

## Usage

```javascript
import ReactFilterBar, { FilterItem, FilterType } from "@ruichen0101/react-filter-bar";

<ReactFilterBar
    filterSetting={[{
        key: "user.id",
        text: "Id",
        type: FilterType.inputEq,
    }, {
        key: "user.name",
        text: "name",
    }, {
        key: "user.email",
        text: "email",
    }, {
        key: "user.status",
        text: "status",
        type: FilterType.dropdown,
        options: [
            { text: 'normal', value: 1 },
            { text: 'blocked', value: -1 },
            { text: 'deleted', value: -99 }
        ]
    }]}
    onFilterUpdate={(result) => {
        console.log(result);
    }}
/>
```