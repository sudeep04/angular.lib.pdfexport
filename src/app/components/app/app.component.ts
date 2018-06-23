import { Component } from '@angular/core';
import { PdfExportService } from '../../../pdf-export';
import * as example1 from '../../examples/example1.json';

@Component({
    selector: 'app',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent {

    constructor(private readonly _pdfExportService: PdfExportService
    ) { }

    public onGeneratePdf(): void {
        this._pdfExportService.generatePdf(example1);
    }
}
