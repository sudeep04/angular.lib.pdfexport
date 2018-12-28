import { IDocRenderer } from '../doc-renderer.interface';
import { DocConfig } from '../doc-config';
import { JsonParser } from '../json-parser';
import { SupplierDetails } from './supplier-details';
import { logoImg } from '../imagesBase64/logo-img';
import * as jsPDF from 'jspdf';
import { DownloadElement } from '../download/download-element.interface';
import { elementAttribute } from '@angular/core/src/render3/instructions';
import { DownloadValue } from '../download/download-value.interface';

export class DocRendererSupplier extends IDocRenderer {

    private _supplierDetails: SupplierDetails;

    private _topIndex: number;

    constructor() {
        super();
    }

    public draw(jsonData: any, docConfig: DocConfig): void {

        this._supplierDetails = JsonParser.parseSupplier(jsonData);
        this._docConfig = docConfig;
        this._drawTitle();
        this._drawDataTable();
        this._drawInfo();
        this._drawLinks();
        this._drawLayout();
    }

    // save document
    private _save(): void {
        this._doc.save(this._supplierDetails.settings.fileName);
    }

    // title
    private _drawTitle(): void {
        const pageWidth = this._doc.internal.pageSize.getWidth();
        const maxLineWidth = pageWidth / 2 - this._docConfig.padding * 2;

        this._topIndex = 36;
        this._drawText(this._supplierDetails.supplier.data.name, maxLineWidth, 20, 10, this._topIndex, [15, 15, 15], ['GothamMedium', 'normal']);
    }

    // Address, website urls and emails
    private _drawDataTable(): void {
        this._topIndex += 5;

        const addressTitle = this._supplierDetails.settings.translations.location.address;
        const emailTitle = this._supplierDetails.settings.translations.location.email;
        const websiteTitle =
        this._supplierDetails.settings.translations.location.website;

        const columns: any [] = [
            {dataKey: 'col1', title: addressTitle},
            {dataKey: 'col2', title: websiteTitle},
            {dataKey: 'col3', title: emailTitle},
        ];

        let urls = '';
        this._supplierDetails.supplier.data.websiteUrls.map((url: string) => {
            urls += url + '\n';
        });
        let emails = '';
        this._supplierDetails.supplier.data.emailAddresses.map((email: string) => {
            emails += email + '\n';
        });

        const rows: any[] = [
            {
                col1: this._supplierDetails.supplier.data.postalAddress.address,
                col2: urls,
                col3: emails
            }
        ];

        const styles = {
            fillColor: [255, 255, 255],
            lineWidth: 0,
            fontStyle: 'normal',
            cellPadding: [0, 7, 0, 0],
            fontSize: 9,
            textColor: 0,
            overflow: 'linebreak',
            valign: 'top'
        };

        const config: any = {
            styles,
            margin: {
                top: this._topIndex,
                right: this._docConfig.padding + this._docConfig.lineWidth / 2,
                bottom: this._docConfig.padding + 3 * this._docConfig.lineWidth / 2 + 10,
                left: 10
            },
            columnStyles: {
                col1: {
                    columnWidth: this._doc.internal.pageSize.getWidth() / 6
                },
                col2: {
                    columnWidth: this._doc.internal.pageSize.getWidth() / 6 + 5
                },
                col3: {
                    columnWidth: this._doc.internal.pageSize.getWidth() / 6 + 5
                }
            },
            alternateRowStyles: styles,
            tableWidth: this._doc.internal.pageSize.getWidth() / 2 - this._docConfig.padding * 2,
            drawCell: (cell: any, opts: any) => {
                if (opts.column.dataKey === 'col1' ) {
                    this._doc.setFont('GothamMedium', 'normal');
                } else {
                    this._doc.setFont('GothamLight', 'normal');
                }
            },
            drawHeaderCell: (cell: any, opts: any) => {
                this._doc.setFont('GothamLight', 'normal');
            },
        };

        this._doc.autoTable(columns, rows, config);
    }

    // Summary
    private _drawInfo(): void {
        this._topIndex += this._doc.autoTable.previous.finalY - this._doc.autoTable.previous.pageStartY + 10;

        const maxLineWidth = this._doc.internal.pageSize.getWidth() / 2 - this._docConfig.padding * 3.5;
        this._drawText(this._supplierDetails.supplier.data.summary, maxLineWidth, 9, 10, this._topIndex, [15, 15, 15], ['GothamLight', 'normal']);

        const dimesions = this._doc.getTextDimensions(this._supplierDetails.supplier.data.summary);
        this._topIndex += dimesions.h / 2 - 5;
    }

    // Links
    private _drawLinks(): void {

        const columns: any [] = [
            {dataKey: 'col1', title: ''},
            {dataKey: 'col2', title: ''},
        ];

        const rows: any[] = [ ];
        let spanLines = 0;

        this._supplierDetails.supplier.links.forEach((link: DownloadElement, index: number) => {
            rows.push({ col1: link.label.concat(':'), first: true, index });
            if (link.type === 'single' && link.singleValue) {
                rows[spanLines]['col2'] = '';
                rows[spanLines]['last'] = true;
                rows[spanLines]['single'] = true;
                rows[spanLines]['name'] = link.singleValue.name;
                rows[spanLines]['link'] = link.singleValue.link;
                spanLines++;
            } else {
                if (link.type === 'list' && link.listValues) {
                    link.listValues.forEach((elemList: DownloadValue, idx: number ) => {
                        if (idx !== 0) { rows.push({ col1: ''}); }
                        rows[spanLines]['col2'] = '';
                        rows[spanLines]['name'] = elemList.name;
                        rows[spanLines]['link'] = elemList.link;
                        if (idx === link.listValues.length - 1) {
                            rows[spanLines]['last'] = true;
                        }
                        spanLines++;
                    });
                }
            }
        });

        const styles = {
            fillColor: [255, 255, 255],
            lineWidth: 0,
            fontStyle: 'normal',
            cellPadding: [0, 7, 0, 0],
            fontSize: 9,
            textColor: 0,
            overflow: 'linebreak',
            valign: 'middle'
        };

        let lastPos: number = 0;
        let links: any[] = [];

        const config: any = {
            styles,
            margin: {
                top: this._topIndex,
                right: this._docConfig.padding + this._docConfig.lineWidth / 2,
                bottom: this._docConfig.padding + 3 * this._docConfig.lineWidth / 2 + 10,
                left: 10
            },
            columnStyles: {
                col1: {
                    columnWidth: this._doc.internal.pageSize.getWidth() / 6
                },
                col2: {
                    columnWidth: this._doc.internal.pageSize.getWidth() * 5 / 6 - 50
                }
            },
            alternateRowStyles: styles,
            showHeader: 'never',
            tableWidth: this._doc.internal.pageSize.getWidth() - this._docConfig.padding,
            drawCell: (cell: any, opts: any) => {
                this._doc.setFont(opts.column.dataKey === 'col1' ?
                        'GothamMedium' : 'GothamLight', 'normal');
            },
            drawRow: (row: any, opts: any) => {
                if (row.raw.single) {
                    const split = this._splitLines(this._supplierDetails.supplier.links[row.raw.index].singleValue.name, this._doc.internal.pageSize.getWidth() * 5 / 6 - 50, 11);
                    row.height += split.length * 3.1;
                }

                links.push(row.cells['col2'].textPos);
            },
            addPageContent: (data: any) => {
                links.forEach((pos: any, iter: number) => {
                    const elem = data.table.rows[iter + lastPos];
                    if (elem.raw.single) {
                        const elemSplit = this._splitLines(elem.raw.name, this._doc.internal.pageSize.getWidth() * 5 / 6 - 50, 9);

                        let val = '';
                        elemSplit.forEach((part: string, index: number) => {
                            val += (index !== 0) ? '\n' + part : part;
                        });

                        this._doc.textWithLink(val, pos.x, pos.y, {
                            url: elem.raw.link
                        });
                    } else {
                        this._doc.setFontSize(9);
                        this._doc.textWithLink(elem.raw.name, pos.x, pos.y, {
                            url: elem.raw.link
                        });
                    }
                });
                lastPos += links.length;
                links = [];
            }
        };

        this._doc.autoTable(columns, rows, config);
    }

    // Layout
    private _drawLayout(): void {
        const img = new Image();
        img.onload = (() => {
            this._drawLayoutIter(img);
        });
        img.onerror = (() => {
            this._drawLayoutIter(null);
        });
        img.src = logoImg;
        img.crossOrigin = 'anonymous';
    }

    private _drawLayoutIter(img: HTMLImageElement): void {
        for (let i = 1; i < this._doc.internal.pages.length; i++) {
            this._doc.setPage(i);
            this._drawLayoutData(i, img);
        }
        this._loadImage();
    }

    // Image
    private _loadImage(): void {
        this._toDataURL(
            [this._supplierDetails.supplier.data.logo.url],
            this._loadImages.bind(this),
            this._drawImage.bind(this)
        );
    }

    private _drawImage(images: HTMLImageElement[]) {
        this._doc.setPage(1);

        // borders
        this._doc.setDrawColor(0);
        this._doc.rect(
            this._doc.internal.pageSize.getWidth() - (this._docConfig.padding * 5 + 5),
            25,
            this._doc.internal.pageSize.getWidth() / 6 + 1,
            this._doc.internal.pageSize.getWidth() / 6 + 1
        );

        // logo
        if (images.length > 0) {
            const img = images[0];
            try {
                this._doc.addImage(
                    img,
                    this._doc.internal.pageSize.getWidth() - this._docConfig.padding * 5 + 1,
                    30,
                    this._doc.internal.pageSize.getWidth() / 6 - 10,
                    this._doc.internal.pageSize.getWidth() / 6 - 10,
                );
            } catch (e) {
                console.log('The image is corrupted in some way that prevents it from being loaded by jsPDF.');
            }
        }

        this._save();
    }

    // draw Page Header and Footer
    private _drawLayoutData(index: number, logo: HTMLImageElement) {

        const pageWidth = this._doc.internal.pageSize.getWidth();
        const pageHeight = this._doc.internal.pageSize.getHeight();

        // draw header
        this._doc.setFont('GothamMedium', 'normal');
        this._doc.setFontSize(12);
        this._doc.setFillColor(240, 240, 240);
        this._doc.setTextColor(0, 0, 0);
        this._doc.rect(
            this._docConfig.padding + this._docConfig.lineWidth / 2,
            this._docConfig.padding + this._docConfig.lineWidth / 2,
            pageWidth - (2 * this._docConfig.padding + this._docConfig.lineWidth),
            10,
            'F'
        );
        const project = this._supplierDetails.settings.captions.project;
        this._doc.text(project, 12.9, this._docConfig.padding + this._docConfig.lineWidth * 3 + 0.5);

        const verticalOffset = this._verticalOffset(project, 12, 12.9);

        this._doc.setFont('GothamOffice', 'normal');
        this._doc.text(' – ' + this._supplierDetails.supplier.data.name, verticalOffset, this._docConfig.padding + this._docConfig.lineWidth * 3 + 0.5);

        this._doc.setFontStyle('bold')
                .setFont('GothamMedium', 'normal')
                .text(this._supplierDetails.settings.translations.layout.page + ': '
                 + index + '/' + (this._doc.internal.pages.length - 1), 177,  this._docConfig.padding + this._docConfig.lineWidth * 3 + 0.5);

        // draw footer
        this._doc.setFont('GothamMedium', 'normal');
        this._doc.setFontSize(9);
        this._doc.setFillColor(240, 240, 240);
        this._doc.rect(
            this._docConfig.padding + this._docConfig.lineWidth / 2,
            pageHeight - (this._docConfig.padding + this._docConfig.lineWidth / 2 + 10),
            pageWidth - (2 * this._docConfig.padding + this._docConfig.lineWidth),
            10,
            'F'
        );
        this._doc.text('Copyright © ' + (new Date()).getFullYear() + ' Plan.One', 12.9, 283.2);
        if (logo) {
            this._doc.addImage(logo, 'png', 175.5, 280, 21.6, 4.1);
        }
    }
}
