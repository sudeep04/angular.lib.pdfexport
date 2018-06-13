import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PdfExportService } from './services/pdf-export.service';
export class PdfExportModule {
}
PdfExportModule.decorators = [
    { type: NgModule, args: [{
                declarations: [],
                imports: [
                    CommonModule
                ],
                exports: [],
                providers: [
                    PdfExportService
                ],
                entryComponents: []
            },] },
];
//# sourceMappingURL=pdf-export.module.js.map