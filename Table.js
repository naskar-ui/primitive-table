import { jsx, jsxs } from 'react/jsx-runtime';
import { TableBody } from './TableBody.js';
import { TableHeader } from './TableHeader.js';

var Table = function (props) {
    var _a = props.columns, columns = _a === undefined ? [] : _a, _b = props.dataSource, dataSource = _b === undefined ? [] : _b, tableId = props.tableId, _c = props.isFetching, isFetching = _c === undefined ? false : _c;
    return (jsx("div", { children: jsxs("table", { border: 1, children: [jsx(TableHeader, { columns: columns, tableId: tableId }), jsx(TableBody, { columns: columns, dataSource: dataSource, tableId: tableId, isFetching: isFetching })] }) }));
};

export { Table };
//# sourceMappingURL=Table.js.map
