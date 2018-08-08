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
    settings: {
        logo: {
            show: boolean;
            type: 'text' | 'url';
            data: string;  /* text or url data */
        };
        applyFilters: boolean;
        sorting: 'asc' | 'dsc';
        captions: {
            architectureOffice: string;
            project: string;
            bearbeiter : string;
            id: string;
        };
        showProductsImage: boolean;
	productsImageApiPath: string;
	showHighlights: boolean;
	placeholderUrl: string;
	fileName: string;
        unitsBeforeValue: string [];
    },
    products: [{
        productData: {
            name: string;
            propertySets: [{
                properties: [{
                    ifdguid: string;
                    displayName: string;
                    type: '0' | '1' | '2';
                    nominalValue: any; /* only for IfcPropertySingleValue (Type 0) type */
                    listValues: string []; /* only for IfcPropertyListValue type (Type 1) */
                    upperBoundValue: number; /* only for IfcPropertyBoundedValue type (Type 2) */
                    lowerBoundValue: number; /* only for IfcPropertyBoundedValue type (Type 2) */
                    unit: string;
                }]
            }];
            supplier: {
                name: string;
            };
        };
        productScore: {
            filterScores: [
          [ [id: string], number ]
        ],
	    
        };   
    }];
    property_filters: [{
        value: any;
        id: string;
    }]
}
```