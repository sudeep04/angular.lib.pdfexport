# Pdf Export Component

An angular 5 component to renders pdf documents.

## Getting started

```bash
npm install --save pdf-export@git+ssh://git@github.com/sudeep04/angular.lib.pdfexport.git#1.0.0

```
## Usage

### Import Pdf Export module

Import Pdf Export NgModule.

```typescript
import {PdfExportModule} from 'pdf-export';

@NgModule({
  ...
  imports: [PdfExportModule],
  ...
})
export class AppModule { }
```

### Using PdfExportService

PdfExportService is used to generate the pdf document.

```typescript
import { Component, OnInit } from '@angular/core';
import { PdfExportService } from 'pdf-export';

@Component({
  selector: 'app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  
  constructor(
      private readonly _pdfExportService: PdfExportService
  ) { }

  public ngOnInit(): void {

    // generate a pdf document from a json object 
    this._pdfExportService.generatePdf(this.jsonData);
  }
}
```

## Json Object Definition

```typescript
{
    Settings: {
        Logo: {
            Show: boolean;
            Type: 'text' | 'url';
            Data: string;  /* text or url data */
        };
        ApplyFilters: boolean;
        Sorting: 'assc' | 'desc';
        Captions: {
            ArchitectureOffice: string;
            Project: string;
        };
        ShowProductsImage: boolean;
        UnitsBeforeValue: string [];
    },
    Products: [{
        ProductData: {
            Name: string;
            PropertySets: [{
                Properties: [{
                    ifdguid: string;
                    DisplayName: string;
                    Type: 'IfcPropertySingleValue' | 'IfcPropertyListValue' | 'IfcPropertyBoundedValue';
                    NominalValue: any; /* only for IfcPropertySingleValue type */
                    ListValues: string []; /* only for IfcPropertyListValue type */
                    UpperBoundValue: number; /* only for IfcPropertyBoundedValue type */
                    LowerBoundValue: number; /* only for IfcPropertyBoundedValue type */
                    Unit: {
                        Name: string;
                    }
                }]
            }];
            Supplier: {
                Name: string;
            };
        };
        Score: {
            parameters_components: { [id: string] : number; };
        };   
    }];
    property_filters: [{
        value: any;
        id: string;
    }]
}
```