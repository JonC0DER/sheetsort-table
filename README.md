# SheetSort-Table

## DataTable

- It's a React Component <DataTable /> that take 3 type of parameters

#### Parameters Description:

| Name      | Type   | Description                                |
| --------- | ------ | ------------------------------------------ |
| thData    | Object | the titles needed for the table "thead"    |
| tdData    | Array  | all the datas needed for the table "tbody" |
| dataTitle | String | the table "h1" -> section > h1 + table     |

### Datas Example:

```javascript
thData = {
 key: string,
 ...
}
tdData = [
 {key: string}
 ...
]
dataTitle = "App title"
```

### How to use it

```react
import DataTable from "sheetsort-table/dist/datatable/DataTable"

const MyComponent = () => {
    const headTable = {
        firstName: "Kaseng",
        key: ""
    }

    const bodyTable = [
        {
            firstName: "Kaseng",
            key: ""
        },
        {...}
    ]

    const h1Title = "My title"

    return (
        <DataTable thData={headTable} tdData={bodyTable} dataTitle={h1Title} />
    )
}
```
