import { jsx } from 'react/jsx-runtime';

var TableHeader = function (props) {
    var columns = props.columns, tableId = props.tableId;
    return (jsx("thead", { id: "".concat(tableId, "-header"), children: jsx("tr", { children: columns.map(function (column, index) {
                return (jsx("th", { className: column.className, children: column.label }, index));
            }) }) }));
};

export { TableHeader };
//# sourceMappingURL=TableHeader.js.map
