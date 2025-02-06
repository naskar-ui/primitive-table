import { jsxs, jsx } from 'react/jsx-runtime';

var TableBody = function (props) {
    var columns = props.columns, dataSource = props.dataSource, tableId = props.tableId, isFetching = props.isFetching;
    return (jsxs("tbody", { id: "".concat(tableId, "-body"), children: [isFetching && (jsx("tr", { children: jsx("td", { colSpan: columns.length, children: "loading..." }) })), !isFetching &&
                dataSource.map(function (record) {
                    return (jsx("tr", { children: columns.map(function (column, index) {
                            return (jsx("td", { className: column.className, children: column.fnDataIndex(record) }, index));
                        }) }, record.key));
                })] }));
};

export { TableBody };
//# sourceMappingURL=TableBody.js.map
