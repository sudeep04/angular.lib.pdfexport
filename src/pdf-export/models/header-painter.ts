import * as moment from 'moment';
import { PageConfig } from './page-config';
import { TableConfig } from './table-config';

export class HeaderPainter {

    public drow(doc: any, pageConfig: PageConfig, tableConfig: TableConfig) {

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

        const config: any = {
            styles,
            alternateRowStyles: styles,
            columnStyles,
            margin: { top: pageConfig.padding, left: pageConfig.padding },
            showHeader: 'never',
            tableWidth: pageWidth - (2 * pageConfig.padding + tableConfig.columnWidth),
            drawCell: (cell: any, opts: any) => {

                doc.setFont('GothamMedium', 'normal');
            }
        };

        doc.autoTable(columns, rows, config);

        doc.addImage('assets/images/logo.png',
            pageWidth - tableConfig.columnWidth - pageConfig.padding + tableConfig.lineWidth / 2,
            pageConfig.padding + tableConfig.lineWidth / 2,
            tableConfig.columnWidth - tableConfig.lineWidth,
            doc.autoTable.previous.finalY - doc.autoTable.previous.pageStartY - tableConfig.lineWidth);
    }
}
