import * as moment from 'moment';
export class HeaderPainter {
    drow(doc, pageConfig, tableConfig) {
        const pageWidth = doc.internal.pageSize.getWidth();
        const columns = [
            { dataKey: 'col1' },
            { dataKey: 'col2' }
        ];
        const rows = [
            { col1: 'Architekturbüro', col2: 'Datum: ' + moment(Date.now()).format('DD.MM.YY') },
            { col1: 'Projekt', col2: 'Seite: ' + ('0' + pageConfig.pageNo).slice(-2) + '/' + ('0' + pageConfig.pageCount).slice(-2) }
        ];
        const styles = {
            fillColor: [246, 246, 246],
            lineWidth: tableConfig.lineWidth,
            lineColor: 255,
            cellPadding: [4.4, 4.3, 3.28, 4.3],
            fontSize: 12,
            textColor: 0
        };
        const columnStyles = {
            col2: { columnWidth: tableConfig.columnWidth }
        };
        const config = {
            styles,
            alternateRowStyles: styles,
            columnStyles,
            margin: { top: pageConfig.padding, left: pageConfig.padding },
            showHeader: 'never',
            tableWidth: pageWidth - (2 * pageConfig.padding + tableConfig.columnWidth),
            drawCell: (cell, opts) => {
                doc.setFont('GothamMedium', 'normal');
            }
        };
        doc.autoTable(columns, rows, config);
        doc.addImage('assets/images/logo.png', pageWidth - tableConfig.columnWidth - pageConfig.padding + tableConfig.lineWidth / 2, pageConfig.padding + tableConfig.lineWidth / 2, tableConfig.columnWidth - tableConfig.lineWidth, doc.autoTable.previous.finalY - doc.autoTable.previous.pageStartY - tableConfig.lineWidth);
    }
}
//# sourceMappingURL=header-painter.js.map