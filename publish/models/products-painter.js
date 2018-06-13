import { boxShadowImg } from './imagesBase64/box-shadow-img';
import { checkImg } from './imagesBase64/check-img';
import { unckeckImg } from './imagesBase64/uncheck-img';
export class ProductsPainter {
    drow(group, doc, pageConfig, tableConfig) {
        const pageWidth = doc.internal.pageSize.getWidth();
        group.forEach((product, index) => {
            switch (index) {
                case 0:
                    doc.addImage(boxShadowImg, pageWidth - (tableConfig.columnWidth * 3 + pageConfig.padding), doc.autoTable.previous.finalY + tableConfig.marginTop, tableConfig.columnWidth, tableConfig.columnWidth);
                    doc.addImage('assets/images/product2.png', pageWidth - (tableConfig.columnWidth * 3 + pageConfig.padding) + 3.2, doc.autoTable.previous.finalY + tableConfig.marginTop + 3.2, tableConfig.columnWidth - 6.4, tableConfig.columnWidth - 6.4);
                    break;
                case 1:
                    doc.addImage(boxShadowImg, pageWidth - (tableConfig.columnWidth * 2 + pageConfig.padding), doc.autoTable.previous.finalY + tableConfig.marginTop, tableConfig.columnWidth, tableConfig.columnWidth);
                    doc.addImage('assets/images/product1.png', pageWidth - (tableConfig.columnWidth * 2 + pageConfig.padding) + 3.2, doc.autoTable.previous.finalY + tableConfig.marginTop + 3.2, tableConfig.columnWidth - 6.4, tableConfig.columnWidth - 6.4);
                    break;
                case 2:
                    doc.addImage(boxShadowImg, pageWidth - (tableConfig.columnWidth + pageConfig.padding), doc.autoTable.previous.finalY + tableConfig.marginTop, tableConfig.columnWidth, tableConfig.columnWidth);
                    doc.addImage('assets/images/product3.png', pageWidth - (tableConfig.columnWidth + pageConfig.padding) + 3.2, doc.autoTable.previous.finalY + tableConfig.marginTop + 3.2, tableConfig.columnWidth - 6.4, tableConfig.columnWidth - 6.4);
                    break;
            }
        });
        this._drowHeader(group, doc, pageConfig, tableConfig);
        this._drowBody(group, doc, pageConfig, tableConfig);
    }
    _drowHeader(group, doc, pageConfig, tableConfig) {
        const pageWidth = doc.internal.pageSize.getWidth();
        const columns = [{ dataKey: 'col1', title: '' }];
        const rows = [
            { col1: 'Hersteller' }
        ];
        const styles = {
            fillColor: [246, 246, 246],
            lineWidth: 0,
            fontStyle: 'normal',
            cellPadding: [2.8, tableConfig.lineWidth + 0.5, 2.8, tableConfig.lineWidth + 0.5],
            fontSize: 9,
            textColor: 0,
            overflow: 'linebreak',
            valign: 'middle'
        };
        const columnStyles = {
            col2: { columnWidth: tableConfig.columnWidth }
        };
        const borders = [];
        const config = {
            styles,
            margin: { top: doc.autoTable.previous.finalY + tableConfig.marginTop + tableConfig.columnWidth + tableConfig.lineWidth / 2, left: pageConfig.padding + tableConfig.lineWidth / 2 },
            columnStyles: {
                col1: {}
            },
            alternateRowStyles: styles,
            tableWidth: pageWidth - ((3 - group.length) * tableConfig.columnWidth) - 2 * pageConfig.padding - tableConfig.lineWidth,
            drawCell: (cell, opts) => {
                if (opts.column.dataKey === 'col1') {
                    doc.setFont('GothamMedium', 'normal');
                }
                else {
                    doc.setFont('GothamLight', 'normal');
                }
            },
            drawHeaderCell: (cell, opts) => {
                doc.setFont('GothamMedium', 'normal');
            },
            drawHeaderRow: (row, opts) => {
                borders.push({
                    left: pageConfig.padding + tableConfig.lineWidth / 2,
                    top: row.y + row.height - 0.1,
                    width: pageWidth - ((3 - group.length) * tableConfig.columnWidth) - 2 * pageConfig.padding - tableConfig.lineWidth,
                    height: 0.1
                });
            },
            drawRow: (row, opts) => {
                borders.push({
                    left: pageConfig.padding + tableConfig.lineWidth / 2,
                    top: row.y + row.height - 0.1,
                    width: pageWidth - ((3 - group.length) * tableConfig.columnWidth) - 2 * pageConfig.padding - tableConfig.lineWidth,
                    height: 0.1
                });
            }
        };
        group.forEach((product) => {
            columns.push({ dataKey: product.name, title: product.name });
            rows[0][product.name] = product.supplier;
            config.columnStyles[product.name] = { columnWidth: tableConfig.columnWidth };
        });
        doc.autoTable(columns, rows, config);
        doc.setFillColor(0, 0, 0);
        borders.forEach((border) => {
            doc.rect(border.left, border.top, border.width, border.height, 'F');
        });
    }
    _drowBody(group, doc, pageConfig, tableConfig) {
        const pageWidth = doc.internal.pageSize.getWidth();
        const columns = [{ dataKey: 'col1', title: '' }];
        const rows = [];
        const styles = {
            fillColor: [255, 255, 255],
            lineWidth: 0,
            fontStyle: 'normal',
            cellPadding: [2.8, tableConfig.lineWidth + 0.5, 2.8, tableConfig.lineWidth + 0.5],
            fontSize: 9,
            textColor: 0,
            overflow: 'linebreak',
            valign: 'middle'
        };
        const columnStyles = {
            col2: { columnWidth: tableConfig.columnWidth }
        };
        const borders = [];
        const checkImages = [];
        const config = {
            styles,
            margin: { top: doc.autoTable.previous.finalY, left: pageConfig.padding + tableConfig.lineWidth / 2 },
            columnStyles: {
                col1: {}
            },
            alternateRowStyles: styles,
            showHeader: 'never',
            tableWidth: pageWidth - ((3 - group.length) * tableConfig.columnWidth) - 2 * pageConfig.padding - tableConfig.lineWidth,
            drawCell: (cell, opts) => {
                if (opts.column.index !== 0) {
                    if (group[opts.column.index - 1].properties[opts.row.index].ckeck !== undefined) {
                        checkImages.push({
                            left: cell.x + 3,
                            top: cell.y + cell.height / 2 - 1.5,
                            width: 3,
                            height: 3,
                            check: group[opts.column.index - 1].properties[opts.row.index].ckeck
                        });
                    }
                }
                if (opts.column.dataKey === 'col1') {
                    doc.setFont('GothamMedium', 'normal');
                }
                else {
                    doc.setFont('GothamLight', 'normal');
                }
            },
            drawHeaderCell: (cell, opts) => {
                doc.setFont('GothamMedium', 'normal');
            },
            drawHeaderRow: (row, opts) => {
                borders.push({
                    left: pageConfig.padding + tableConfig.lineWidth / 2,
                    top: row.y + row.height - 0.1,
                    width: pageWidth - ((3 - group.length) * tableConfig.columnWidth) - 2 * pageConfig.padding - tableConfig.lineWidth,
                    height: 0.1
                });
            },
            drawRow: (row, opts) => {
                borders.push({
                    left: pageConfig.padding + tableConfig.lineWidth / 2,
                    top: row.y + row.height - 0.1,
                    width: pageWidth - ((3 - group.length) * tableConfig.columnWidth) - 2 * pageConfig.padding - tableConfig.lineWidth,
                    height: 0.1
                });
            }
        };
        group.forEach((product) => {
            columns.push({ dataKey: product.name, title: product.name });
            config.columnStyles[product.name] = { columnWidth: tableConfig.columnWidth, cellPadding: [2.8, tableConfig.lineWidth + 0.5, 2.8, tableConfig.lineWidth + 4.5] };
            if (rows.length === 0) {
                product.properties.forEach((property) => {
                    const row = { col1: property.name };
                    rows.push(row);
                });
            }
            product.properties.forEach((property, index) => {
                rows[index][product.name] = property.value.toString();
            });
        });
        doc.autoTable(columns, rows, config);
        doc.setFillColor(0, 0, 0);
        borders.forEach((border) => {
            doc.rect(border.left, border.top, border.width, border.height, 'F');
        });
        checkImages.forEach((img) => {
            if (img.check) {
                doc.addImage(checkImg, img.left, img.top, img.width, img.height);
            }
            else {
                doc.addImage(unckeckImg, img.left, img.top, img.width, img.height);
            }
        });
    }
}
//# sourceMappingURL=products-painter.js.map