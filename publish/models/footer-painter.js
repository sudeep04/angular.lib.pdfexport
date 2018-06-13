import { logoImg } from './imagesBase64/logo-img';
export class FooterPainter {
    drow(doc, pageConfig, tableConfig) {
        const pageWidth = doc.internal.pageSize.getWidth();
        const pageHeight = doc.internal.pageSize.getHeight();
        doc.setFont('GothamMedium', 'normal');
        doc.setFillColor(246, 246, 246);
        doc.rect(pageConfig.padding + tableConfig.lineWidth / 2, pageHeight - (pageConfig.padding + tableConfig.lineWidth / 2 + 10), pageWidth - (2 * pageConfig.padding + tableConfig.lineWidth), 10, 'F');
        doc.setFontSize(9);
        doc.text('Copyright © 2018 Plan.One', 12.9, 283.2);
        doc.addImage(logoImg, 175.5, 280, 21.6, 4.1);
    }
}
//# sourceMappingURL=footer-painter.js.map