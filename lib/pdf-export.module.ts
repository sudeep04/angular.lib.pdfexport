import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PdfExportService } from './services/pdf-export.service';

@NgModule({
    declarations: [
    ],
    imports: [
        CommonModule
    ],
    exports: [
    ],
    providers: [
        PdfExportService
    ],
    entryComponents: []
})
export class PdfExportModule { }
