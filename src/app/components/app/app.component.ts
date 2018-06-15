import { Component, OnInit } from '@angular/core';
import { PdfExportService } from '../../../pdf-export';

const SAMPLE_DATA = {"Products":[{"ProductData":{"Name":"AWS 75 BS.SI+","Supplier":{"Name":"Schüco International KG"},"PropertySets":[{"Properties":[{"ifdguid":"9f75567ce6fc11e7bd47f48c50787210","DisplayName":"Available in Country","NominalValue":"Alle"},{"ifdguid":"9f7713cce6fc11e7bd47f48c50787210","DisplayName":"Corrosion protection class","NominalValue":"5"},{"ifdguid":"9f7198cae6fc11e7bd47f48c50787210","DisplayName":"Depth panel frame","NominalValue":"75.0"},{"DisplayName":"prop1","NominalValue":""},{"DisplayName":"prop2","NominalValue":""},{"DisplayName":"prop3","NominalValue":""},{"DisplayName":"prop4","NominalValue":""},{"DisplayName":"prop5","NominalValue":""},{"DisplayName":"prop6","NominalValue":""},{"DisplayName":"prop7","NominalValue":""},{"DisplayName":"prop8","NominalValue":""},{"DisplayName":"prop9","NominalValue":""},{"DisplayName":"prop10","NominalValue":""},{"DisplayName":"prop11","NominalValue":""},{"DisplayName":"prop12","NominalValue":""},{"DisplayName":"prop13","NominalValue":""},{"DisplayName":"prop14","NominalValue":""},{"DisplayName":"prop15","NominalValue":""},{"DisplayName":"prop16","NominalValue":""},{"DisplayName":"prop17","NominalValue":""}]}]},"Score":{"parameter_components":{"9f75567ce6fc11e7bd47f48c50787210":"Alle","9f7713cce6fc11e7bd47f48c50787210":"5","9f7198cae6fc11e7bd47f48c50787210":"75.0"}}},{"ProductData":{"Name":"AWS 90.SI+","Supplier":{"Name":"Schüco International KG"},"PropertySets":[{"Properties":[{"ifdguid":"9f75567ce6fc11e7bd47f48c50787210","DisplayName":"Available in Country","NominalValue":"Alle"},{"ifdguid":"9f7713cce6fc11e7bd47f48c50787210","DisplayName":"Corrosion protection class","NominalValue":"5"},{"ifdguid":"9f7198cae6fc11e7bd47f48c50787210","DisplayName":"Depth panel frame","NominalValue":"90.0"},{"DisplayName":"prop1","NominalValue":""},{"DisplayName":"prop2","NominalValue":""},{"DisplayName":"prop3","NominalValue":""},{"DisplayName":"prop4","NominalValue":""},{"DisplayName":"prop5","NominalValue":""},{"DisplayName":"prop6","NominalValue":""},{"DisplayName":"prop7","NominalValue":""},{"DisplayName":"prop8","NominalValue":""},{"DisplayName":"prop9","NominalValue":""},{"DisplayName":"prop10","NominalValue":""},{"DisplayName":"prop11","NominalValue":""},{"DisplayName":"prop12","NominalValue":""},{"DisplayName":"prop13","NominalValue":""},{"DisplayName":"prop14","NominalValue":""},{"DisplayName":"prop15","NominalValue":""},{"DisplayName":"prop16","NominalValue":""},{"DisplayName":"prop17","NominalValue":""}]}]},"Score":{"parameter_components":{"9f75567ce6fc11e7bd47f48c50787210":"Alle","9f7713cce6fc11e7bd47f48c50787210":"5","9f7198cae6fc11e7bd47f48c50787210":"75.0"}}},{"ProductData":{"Name":"AWS 90.SI+ Green","Supplier":{"Name":"Schüco International KG"},"PropertySets":[{"Properties":[{"ifdguid":"9f75567ce6fc11e7bd47f48c50787210","DisplayName":"Available in Country","NominalValue":"Alle"},{"ifdguid":"9f7713cce6fc11e7bd47f48c50787210","DisplayName":"Corrosion protection class","NominalValue":"5"},{"ifdguid":"9f7198cae6fc11e7bd47f48c50787210","DisplayName":"Depth panel frame","NominalValue":"90.0"},{"DisplayName":"prop1","NominalValue":""},{"DisplayName":"prop2","NominalValue":""},{"DisplayName":"prop3","NominalValue":""},{"DisplayName":"prop4","NominalValue":""},{"DisplayName":"prop5","NominalValue":""},{"DisplayName":"prop6","NominalValue":""},{"DisplayName":"prop7","NominalValue":""},{"DisplayName":"prop8","NominalValue":""},{"DisplayName":"prop9","NominalValue":""},{"DisplayName":"prop10","NominalValue":""},{"DisplayName":"prop11","NominalValue":""},{"DisplayName":"prop12","NominalValue":""},{"DisplayName":"prop13","NominalValue":""},{"DisplayName":"prop14","NominalValue":""},{"DisplayName":"prop15","NominalValue":""},{"DisplayName":"prop16","NominalValue":""},{"DisplayName":"prop17","NominalValue":""}]}]},"Score":{"parameter_components":{"9f75567ce6fc11e7bd47f48c50787210":"Alle","9f7713cce6fc11e7bd47f48c50787210":"5","9f7198cae6fc11e7bd47f48c50787210":"75.0"}}}]};

@Component({
    selector: 'app',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

    constructor(private readonly _pdfExportService: PdfExportService
    ) { }

    public ngOnInit(): void {

        
    }


    public onGeneratePdf(): void {
        this._pdfExportService.generatePdf(SAMPLE_DATA);
    }
}
