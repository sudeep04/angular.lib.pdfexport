import { Component } from '@angular/core';
import { PdfExportService } from '../../../pdf-export';

const SAMPLE_DATA = { "Products": [{ "ProductData": { "Name": "AWS 75 BS.SI+", "Supplier": { "Name": "Schüco International KG" }, "PropertySets": [{ "Properties": [{ "ifdguid": "9f75567ce6fc11e7bd47f48c50787210", "DisplayName": "Available in Country", "NominalValue": "Alle" }, { "ifdguid": "9f7713cce6fc11e7bd47f48c50787210", "DisplayName": "Corrosion protection class", "NominalValue": "5" }, { "ifdguid": "9f7198cae6fc11e7bd47f48c50787210", "DisplayName": "Depth panel frame", "NominalValue": "75.0" }, { "DisplayName": "prop1", "NominalValue": "1" }, { "DisplayName": "prop3", "NominalValue": "3" }, { "DisplayName": "prop4", "NominalValue": "" }, { "DisplayName": "prop5", "NominalValue": "" }, { "DisplayName": "prop6", "NominalValue": "" }, { "DisplayName": "prop7", "NominalValue": "" }, { "DisplayName": "prop8", "NominalValue": "" }, { "DisplayName": "prop9", "NominalValue": "" }, { "DisplayName": "prop10", "NominalValue": "" }, { "DisplayName": "prop11", "NominalValue": "" }, { "DisplayName": "prop12", "NominalValue": "" }, { "DisplayName": "prop13", "NominalValue": "" }, { "DisplayName": "prop14", "NominalValue": "" }, { "DisplayName": "prop15", "NominalValue": "" }, { "DisplayName": "prop16", "NominalValue": "" }, { "DisplayName": "prop17", "NominalValue": "" }] }] }, "Score": { "parameter_components": { "9f75567ce6fc11e7bd47f48c50787210": "Alle", "9f7713cce6fc11e7bd47f48c50787210": "5", "9f7198cae6fc11e7bd47f48c50787210": "75.0" } } }, { "ProductData": { "Name": "AWS 90.SI+", "Supplier": { "Name": "Schüco International KG" }, "PropertySets": [{ "Properties": [{ "ifdguid": "9f75567ce6fc11e7bd47f48c50787210", "DisplayName": "Available in Country", "NominalValue": "Alle" }, { "ifdguid": "9f7713cce6fc11e7bd47f48c50787210", "DisplayName": "Corrosion protection class", "NominalValue": "5" }, { "ifdguid": "9f7198cae6fc11e7bd47f48c50787210", "DisplayName": "Depth panel frame", "NominalValue": "90.0" }, { "DisplayName": "prop1", "NominalValue": "1" }, { "DisplayName": "prop2", "NominalValue": "2" }, { "DisplayName": "prop3", "NominalValue": "3" }, { "DisplayName": "prop4", "NominalValue": "" }, { "DisplayName": "prop5", "NominalValue": "" }, { "DisplayName": "prop6", "NominalValue": "" }, { "DisplayName": "prop7", "NominalValue": "" }, { "DisplayName": "prop8", "NominalValue": "" }, { "DisplayName": "prop9", "NominalValue": "" }, { "DisplayName": "prop10", "NominalValue": "" }, { "DisplayName": "prop11", "NominalValue": "" }, { "DisplayName": "prop12", "NominalValue": "" }, { "DisplayName": "prop13", "NominalValue": "" }, { "DisplayName": "prop14", "NominalValue": "" }, { "DisplayName": "prop15", "NominalValue": "" }, { "DisplayName": "prop16", "NominalValue": "" }, { "DisplayName": "prop17", "NominalValue": "" }] }] }, "Score": { "parameter_components": { "9f75567ce6fc11e7bd47f48c50787210": "Alle", "9f7713cce6fc11e7bd47f48c50787210": "5", "9f7198cae6fc11e7bd47f48c50787210": "75.0" } } }, { "ProductData": { "Name": "AWS 90.SI+ Green", "Supplier": { "Name": "Schüco International KG" }, "PropertySets": [{ "Properties": [{ "ifdguid": "9f75567ce6fc11e7bd47f48c50787210", "DisplayName": "Available in Country", "NominalValue": "Alle" }, { "ifdguid": "9f7713cce6fc11e7bd47f48c50787210", "DisplayName": "Corrosion protection class", "NominalValue": "5" }, { "ifdguid": "9f7198cae6fc11e7bd47f48c50787210", "DisplayName": "Depth panel frame", "NominalValue": "90.0" }, { "DisplayName": "prop1", "NominalValue": "" }, { "DisplayName": "prop2", "NominalValue": "" }, { "DisplayName": "prop3", "NominalValue": "" }, { "DisplayName": "prop4", "NominalValue": "" }, { "DisplayName": "prop5", "NominalValue": "" }, { "DisplayName": "prop6", "NominalValue": "" }, { "DisplayName": "prop7", "NominalValue": "" }, { "DisplayName": "prop8", "NominalValue": "" }, { "DisplayName": "prop9", "NominalValue": "" }, { "DisplayName": "prop10", "NominalValue": "" }, { "DisplayName": "prop11", "NominalValue": "" }, { "DisplayName": "prop12", "NominalValue": "" }, { "DisplayName": "prop13", "NominalValue": "" }, { "DisplayName": "prop14", "NominalValue": "" }, { "DisplayName": "prop15", "NominalValue": "" }, { "DisplayName": "prop16", "NominalValue": "" }, { "DisplayName": "prop17", "NominalValue": "" }] }] }, "Score": { "parameter_components": { "9f75567ce6fc11e7bd47f48c50787210": "Alle", "9f7713cce6fc11e7bd47f48c50787210": "5", "9f7198cae6fc11e7bd47f48c50787210": "75.0" } } }, { "ProductData": { "Name": "AWS 75 BS.SI+", "Supplier": { "Name": "Schüco International KG" }, "PropertySets": [{ "Properties": [{ "ifdguid": "9f75567ce6fc11e7bd47f48c50787210", "DisplayName": "Available in Country", "NominalValue": "Alle" }, { "ifdguid": "9f7713cce6fc11e7bd47f48c50787210", "DisplayName": "Corrosion protection class", "NominalValue": "5" }, { "ifdguid": "9f7198cae6fc11e7bd47f48c50787210", "DisplayName": "Depth panel frame", "NominalValue": "75.0" }, { "DisplayName": "prop1", "NominalValue": "" }, { "DisplayName": "prop2", "NominalValue": "" }, { "DisplayName": "prop3", "NominalValue": "" }, { "DisplayName": "prop4", "NominalValue": "" }, { "DisplayName": "prop5", "NominalValue": "" }, { "DisplayName": "prop6", "NominalValue": "" }, { "DisplayName": "prop7", "NominalValue": "" }, { "DisplayName": "prop8", "NominalValue": "" }, { "DisplayName": "prop9", "NominalValue": "" }, { "DisplayName": "prop10", "NominalValue": "" }, { "DisplayName": "prop11", "NominalValue": "" }, { "DisplayName": "prop12", "NominalValue": "" }, { "DisplayName": "prop13", "NominalValue": "" }, { "DisplayName": "prop14", "NominalValue": "" }, { "DisplayName": "prop15", "NominalValue": "" }, { "DisplayName": "prop17", "NominalValue": "" }] }] }, "Score": { "parameter_components": { "9f75567ce6fc11e7bd47f48c50787210": "Alle", "9f7713cce6fc11e7bd47f48c50787210": "5", "9f7198cae6fc11e7bd47f48c50787210": "75.0" } } }] };

const SAMPLE_DATA2 = {
    "Products": [{
        "ProductData": {
            "Category": {
                "Name": "Windows",
                "Type": "IfcWindow"
            },
            "Details": [{
                "ContentType": "text/html",
                "LastUpdated": 1513869678,
                "Name": "Description",
                "Uuid": "0020f58da7254130b797125a7a12501a",
                "Content": "<p><strong>Flexible standard window series with maximum thermal insulation and Sch\u00fcco SimplySmart technology, which has been optimised for fabrication</strong></p>\n<p>In the basic depth of 75\u2009mm, the Sch\u00fcco Window AWS modular system offers SI designs (Super Insulation) which combine maximum thermal insulation with impressive properties in terms of function, design and fabrication. The standard series \u2013 Sch\u00fcco Window AWS 75.SI+ \u2013 features outstanding thermal insulation with a face width of 117\u2009mm. With a continuous centre gasket and new glazing rebate insulation, the Sch\u00fcco SimplySmart technology ensures more efficient fabrication. In combination with the new Sch\u00fcco AvanTec SimplySmart mechanical generation of fittings, installation can be completed considerably more quickly.</p>\n<p>As a block window with a concealed vent frame, Sch\u00fcco Window AWS 75 BS.SI+ fulfils the highest requirements in terms of architecture thanks to its slim design and maximum transparency.</p>\n<p>Sch\u00fcco AWS 75 WF.SI+ is based on the Sch\u00fcco block window and is designed specifically for the economical construction of ribbon windows with storey-height glazing with a homogeneous mullion/transom appearance.</p>"
            }, {
                "ContentType": "text/html",
                "LastUpdated": 1513869678,
                "Name": "Product Benefits",
                "Uuid": "5037849494384d1c97bdbe40292f6dd9",
                "Content": "<p><strong>Energy</strong></p>\n<ul>\n\t<li>Uf values from 0.92\u2009W/(m\u00b2K) for aluminium windows with maximum thermal insulation</li>\n\t<li>Uf value = 1.2\u2009W/(m\u00b2K) with 117\u2009mm face width, Uw value = 0.90\u2009W/(m\u00b2K) and Ug value = 0.6\u2009W/(m\u00b2K)</li>\n\t<li>Centre gasket with fin in microcellular rubber design</li>\n\t<li>Block window system variant with outstanding thermal insulation</li>\n</ul>\n<p><strong>Design</strong></p>\n<ul>\n\t<li>Attractive design options: Sch\u00fcco AWS 75 BS.SI+ with concealed vent as block window and Sch\u00fcco AWS 75 WF.SI+ with mullion/transom appearance</li>\n\t<li>Optional vent in standard and RL (Residential Line) style</li>\n</ul>\n<p><strong>Automation</strong></p>\n<ul>\n\t<li>Motorised fittings solutions possible with Sch\u00fcco TipTronic</li>\n</ul>\n<p><strong>Security</strong></p>\n<ul>\n\t<li>Burglar resistance to RC 3</li>\n</ul>"
            }, {
                "ContentType": "text/html",
                "LastUpdated": 1513869678,
                "Name": "Fabrication Benefits",
                "Uuid": "7236625f78aa4470861f518bd8a3fc5f",
                "Content": "<ul>\n\t<li>New continuous Sch\u00fcco SimplySmart centre gasket with optimised self-positioning \u2013 new: also available for BS and WF systems</li>\n\t<li>EPDM gasket corners not required</li>\n\t<li>Corner seals for the outer frame integrated</li>\n\t<li>Simplified assembly processes reduce fabrication time</li>\n\t<li>Glazing rebate insulation as a moulded piece: more efficient fabrication without time-consuming manual working steps, reduction in assembly time</li>\n\t<li>System variant Sch\u00fcco AWS 75 BS.HI+ enables narrow face widths without bonding the rebate base</li>\n</ul>"
            }
            ],
            "Downloads": {
                "BIMModelCategories": {
                    "Revit": [{
                        "ContentType": "application",
                        "LastUpdated": 1513869678,
                        "FileSize": "800 kB",
                        "Name": "Schueco_AWS-75-BS-SI+_Family-01.rfa",
                        "Uuid": "a763a40fb83f4aceaac510605c6b835f",
                        "Content": "9096018a26dea8e1b4dda6beb89fcae6"
                    }
                    ]
                },
                "CADData": [{
                    "ContentType": "text/uri-list",
                    "LastUpdated": 1513869680,
                    "Name": "Ausf\u00fchrungsvorschl\u00e4ge",
                    "OriginalSource": "https://www.schueco.com/web2/generic/ssoRedirect/de/23519546",
                    "Uuid": "b4f5ea37fd4e44569ad607939c0518fc",
                    "Content": "https://www.schueco.com/web2/generic/ssoRedirect/de/23519546"
                }, {
                    "ContentType": "text/uri-list",
                    "LastUpdated": 1513869679,
                    "Name": "Planungsgrundlagen",
                    "OriginalSource": "https://www.schueco.com/web2/generic/ssoRedirect/de/23519540",
                    "Uuid": "d0427ea7ff7e48fcb2e5ae80e10ee698",
                    "Content": "https://www.schueco.com/web2/generic/ssoRedirect/de/23519540"
                }, {
                    "ContentType": "text/uri-list",
                    "LastUpdated": 1513869680,
                    "Name": "Regeldetails",
                    "OriginalSource": "https://www.schueco.com/web2/generic/ssoRedirect/de/23519544",
                    "Uuid": "470580816d6448a391e114ea358f8084",
                    "Content": "https://www.schueco.com/web2/generic/ssoRedirect/de/23519544"
                }, {
                    "ContentType": "text/uri-list",
                    "LastUpdated": 1513869679,
                    "Name": "Systemzeichnungen",
                    "OriginalSource": "https://www.schueco.com/web2/generic/ssoRedirect/de/23519542",
                    "Uuid": "25a55109936849daa09bf0add1678b17",
                    "Content": "https://www.schueco.com/web2/generic/ssoRedirect/de/23519542"
                }
                ],
                "BIMModels": [{
                    "ContentType": "application",
                    "LastUpdated": 1513869678,
                    "FileSize": "800 kB",
                    "Name": "Schueco_AWS-75-BS-SI+_Family-01.rfa",
                    "Uuid": "a763a40fb83f4aceaac510605c6b835f",
                    "Content": "9096018a26dea8e1b4dda6beb89fcae6"
                }
                ],
                "Brochures": [{
                    "ContentType": "application/pdf",
                    "LastUpdated": 1513869679,
                    "FileSize": "596 kB",
                    "Name": "Sch\u00fcco AWS 75",
                    "OriginalSource": "https://www.schueco.com/web2/asset/de/architekten/produkte/fenster/aluminium/schueco_aws_75_bs_si_plus/19491180/schueco_fenster_aws_75.pdf",
                    "Uuid": "e35da69b5df84d9f94abd8cf824485ce",
                    "Content": "93b382dbc427de943761c5e48a04f432"
                }
                ]
            },
            "Image": {
                "ContentType": "image/png",
                "LastUpdated": 1513869677,
                "FileSize": "3.1 MB",
                "Name": "Bild",
                "Uuid": "b4f46a67f28d4daf9893f519057776ef",
                "Content": "c191bf96be4014cb3493a07d6c973cd3"
            },
            "ImageGallery": [{
                "ContentType": "image/png",
                "LastUpdated": 1513869679,
                "FileSize": "13.2 kB",
                "Name": "Sch\u00fcco Fenster AWS 75 BS.SI+_1.png",
                "OriginalSource": "https://www.schueco.com/web2/image/cachedcrop/data/w1100/h1100/q30/id15275182/aws_75_bs_si_2_schnitt.jpg",
                "Uuid": "7895e66042934cd0ad4d4ad6d8c7d08a",
                "Content": "f1519b64e451a9c2517284ee790a80cb"
            }, {
                "ContentType": "image/png",
                "LastUpdated": 1513869679,
                "FileSize": "7.81 kB",
                "Name": "preview_image.png",
                "OriginalSource": "https://www.schueco.com/web2/image/cachedcrop/data/w740/h740/q30/id20290426/previewImage.jpg",
                "Uuid": "dfe1197188594a76a5460c03d9323d06",
                "Content": "52b3dc7ebf3e4b04990dcb51b6b97e52"
            }
            ],
            "Name": "AWS 75 BS.SI+",
            "ProductCategory": {
                "Name": "Windows",
                "Type": "IfcWindow"
            },
            "PropertySets": [{
                "Name": "Window_Pset_P1",
                "Description": "Window_Pset_P1",
                "Properties": [{
                    "ifdguid": "9f75567ce6fc11e7bd47f48c50787210",
                    "DisplayName": "Available in Country",
                    "Type": "IfcPropertySingleValue",
                    "Description": "no Content",
                    "RawType": "STRING",
                    "NominalValue": "Alle",
                    "Name": "Available in Country"
                }, {
                    "ifdguid": "9f7713cce6fc11e7bd47f48c50787210",
                    "DisplayName": "Corrosion protection class",
                    "Type": "IfcPropertySingleValue",
                    "Description": "no Content",
                    "RawType": "STRING",
                    "NominalValue": "5",
                    "Name": "Corrosion protection class",
                    "Unit": {
                        "Name": "Klasse"
                    }
                }, {
                    "ifdguid": "9f7198cae6fc11e7bd47f48c50787210",
                    "DisplayName": "Depth panel frame",
                    "Type": "IfcPropertySingleValue",
                    "Description": "no Content",
                    "RawType": "STRING",
                    "NominalValue": 75.0,
                    "Name": "Depth panel frame",
                    "Unit": {
                        "Name": "mm"
                    }
                }, {
                    "ifdguid": "9f74f420e6fc11e7bd47f48c50787210",
                    "DisplayName": "Handicap accessible",
                    "Type": "IfcPropertySingleValue",
                    "Description": "no Content",
                    "RawType": "STRING",
                    "NominalValue": false,
                    "Name": "Handicap accessible"
                }, {
                    "ifdguid": "9f774612e6fc11e7bd47f48c50787210",
                    "DisplayName": "Integral sunshading",
                    "Type": "IfcPropertySingleValue",
                    "Description": "no Content",
                    "RawType": "STRING",
                    "NominalValue": false,
                    "Name": "Integral sunshading"
                }, {
                    "ifdguid": "9f73ab2ee6fc11e7bd47f48c50787210",
                    "DisplayName": "Load bearing capacity of safety equipment",
                    "Type": "IfcPropertySingleValue",
                    "Description": "no Content",
                    "RawType": "STRING",
                    "NominalValue": true,
                    "Name": "Load bearing capacity of safety equipment",
                    "Unit": {
                        "Name": ""
                    }
                }, {
                    "ifdguid": "9f764dfce6fc11e7bd47f48c50787210",
                    "DisplayName": "Material",
                    "Type": "IfcPropertySingleValue",
                    "Description": "no Content",
                    "RawType": "STRING",
                    "NominalValue": "Aluminium",
                    "Name": "Material",
                    "Unit": {
                        "Name": ""
                    }
                }, {
                    "ifdguid": "9f764dfce6fc11e7bd47f48c50787210",
                    "DisplayName": "Material",
                    "Type": "IfcPropertySingleValue",
                    "Description": "no Content",
                    "RawType": "STRING",
                    "NominalValue": "Aluminium",
                    "Name": "Material"
                }, {
                    "ifdguid": "9f72b836e6fc11e7bd47f48c50787210",
                    "DisplayName": "Max. opening angle",
                    "Type": "IfcPropertySingleValue",
                    "Description": "no Content",
                    "RawType": "STRING",
                    "NominalValue": 180.0,
                    "Name": "Max. opening angle",
                    "Unit": {
                        "Name": "\u00b0"
                    }
                }, {
                    "ifdguid": "9f72daf0e6fc11e7bd47f48c50787210",
                    "DisplayName": "Max. panel weight, overlying suspension",
                    "Type": "IfcPropertySingleValue",
                    "Description": "no Content",
                    "RawType": "STRING",
                    "NominalValue": 160.0,
                    "Name": "Max. panel weight, overlying suspension",
                    "Unit": {
                        "Name": "kg"
                    }
                }, {
                    "ifdguid": "9f75bfd6e6fc11e7bd47f48c50787210",
                    "DisplayName": "Opening Type",
                    "Type": "IfcPropertyListValue",
                    "Description": "no Content",
                    "RawType": "STRING",
                    "ListValues": ["Dreh-Links", "Dreh-Rechts", "Drehkipp-Links", "Drehkipp-Rechts", "Fix", "Kipp"],
                    "Name": "Opening Type"
                }, {
                    "ifdguid": "9f6f6f1ee6fc11e7bd47f48c50787210",
                    "DisplayName": "Operating forces",
                    "Type": "IfcPropertySingleValue",
                    "Description": "no Content",
                    "RawType": "STRING",
                    "NominalValue": "Gering",
                    "Name": "Operating forces"
                }, {
                    "ifdguid": "9f7577d8e6fc11e7bd47f48c50787210",
                    "DisplayName": "Security glazing",
                    "Type": "IfcPropertySingleValue",
                    "Description": "no Content",
                    "RawType": "STRING",
                    "NominalValue": "None",
                    "Name": "Security glazing"
                }, {
                    "ifdguid": "9f783b80e6fc11e7bd47f48c50787210",
                    "DisplayName": "Suitable for passive houses",
                    "Type": "IfcPropertySingleValue",
                    "Description": "no Content",
                    "RawType": "STRING",
                    "NominalValue": false,
                    "Name": "Suitable for passive houses"
                }, {
                    "ifdguid": "9f75e70ee6fc11e7bd47f48c50787210",
                    "DisplayName": "Surface finishing",
                    "Type": "IfcPropertyListValue",
                    "Description": "no Content",
                    "RawType": "STRING",
                    "ListValues": ["Duraflon", "Eloxal", "Lack", "Pulver"],
                    "Name": "Surface finishing"
                }, {
                    "ifdguid": "9f71ddbce6fc11e7bd47f48c50787210",
                    "DisplayName": "Total face height",
                    "Type": "IfcPropertyBoundedValue",
                    "Description": "no Content",
                    "RawType": "STRING",
                    "Name": "Total face height",
                    "UpperBoundValue": 2500.0,
                    "LowerBoundValue": 540.0,
                    "Unit": {
                        "Name": "mm"
                    }
                }, {
                    "ifdguid": "9f720008e6fc11e7bd47f48c50787210",
                    "DisplayName": "Total face width",
                    "Type": "IfcPropertyBoundedValue",
                    "Description": "no Content",
                    "RawType": "STRING",
                    "Name": "Total face width",
                    "UpperBoundValue": 2800.0,
                    "LowerBoundValue": 470.0,
                    "Unit": {
                        "Name": "mm"
                    }
                }, {
                    "ifdguid": "9f71bbf2e6fc11e7bd47f48c50787210",
                    "DisplayName": "Total panel thickness",
                    "Type": "IfcPropertySingleValue",
                    "Description": "no Content",
                    "RawType": "STRING",
                    "NominalValue": 54.0,
                    "Name": "Total panel thickness",
                    "Unit": {
                        "Name": "mm"
                    }
                }, {
                    "ifdguid": "9f6fd580e6fc11e7bd47f48c50787210",
                    "DisplayName": "UF -Frame",
                    "Type": "IfcPropertySingleValue",
                    "Description": "no Content",
                    "RawType": "STRING",
                    "NominalValue": 1.3,
                    "Name": "UF -Frame",
                    "Unit": {
                        "Name": "W/(m\u00b2K)"
                    }
                }, {
                    "ifdguid": "9f714d66e6fc11e7bd47f48c50787210",
                    "DisplayName": "Width panel frame",
                    "Type": "IfcPropertySingleValue",
                    "Description": "no Content",
                    "RawType": "STRING",
                    "NominalValue": 66.5,
                    "Name": "Width panel frame"
                }
                ]
            }, {
                "Name": "Pset_WindowCommon",
                "Description": "Properties common to the definition of all occurrences of Window.",
                "Properties": [{
                    "ifdguid": "bffe7d00d21811e1800000215ad4efdf",
                    "DisplayName": "Fire Rating",
                    "Type": "IfcPropertySingleValue",
                    "Description": "Fire rating for this object.\nIt is given according to the national fire safety classification.",
                    "RawType": "STRING",
                    "NominalValue": "None",
                    "Name": "Fire Rating"
                }, {
                    "ifdguid": "d3114d00d21811e1800000215ad4efdf",
                    "DisplayName": "Infiltration",
                    "Type": "IfcPropertySingleValue",
                    "Description": "Infiltration flowrate of outside air for the filler object based on the area of the filler object at a pressure level of 50 Pascals. It shall be used, if the length of all joints is unknown.",
                    "RawType": "STRING",
                    "NominalValue": 4.0,
                    "Name": "Infiltration",
                    "Unit": {
                        "Name": "Klasse"
                    }
                }, {
                    "ifdguid": "c68cf480d21811e1800000215ad4efdf",
                    "DisplayName": "Security Rating",
                    "Type": "IfcPropertySingleValue",
                    "Description": "Index based rating system indicating security level.\nIt is giving according to the national building code.",
                    "RawType": "STRING",
                    "NominalValue": "RC2",
                    "Name": "Security Rating",
                    "Unit": {
                        "Name": "Klasse"
                    }
                }, {
                    "ifdguid": "f9cf8380d21811e1800000215ad4efdf",
                    "DisplayName": "Smoke Stop",
                    "Type": "IfcPropertySingleValue",
                    "Description": "Indication whether the object is designed to provide a smoke stop (TRUE) or not (FALSE).",
                    "RawType": "STRING",
                    "NominalValue": false,
                    "Name": "Smoke Stop"
                }, {
                    "ifdguid": "e92533f3a7e4416196ad923faee29e96",
                    "DisplayName": "WaterTightnessRating",
                    "Type": "IfcPropertySingleValue",
                    "Description": "Water tightness rating for this object.\nIt is provided according to the national building code.",
                    "RawType": "STRING",
                    "NominalValue": "9A",
                    "Name": "WaterTightnessRating",
                    "Unit": {
                        "Name": "Klasse"
                    }
                }, {
                    "ifdguid": "664882a15b8a420087f6f80670cbe20b",
                    "DisplayName": "WindLoadRating",
                    "Type": "IfcPropertyListValue",
                    "Description": "Wind load resistance rating for this object.\nIt is provided according to the national building code.",
                    "RawType": "STRING",
                    "ListValues": ["B5", "C5"],
                    "Name": "WindLoadRating",
                    "Unit": {
                        "Name": "Klasse"
                    }
                }
                ]
            }
            ],
            "Supplier": {
                "Name": "Sch\u00fcco International KG",
                "Uuid": "3ec5b6a91f734a2ebb8442937e2f727f",
                "Logo": {
                    "ContentType": "image/png",
                    "LastUpdated": 1513868814,
                    "FileSize": "1.59 kB",
                    "Name": "logo",
                    "Uuid": "baaa1b57643e45e4adfb560ed424572b",
                    "Content": "d58222a04e37ca34c1fd4707de5617ec"
                }
            },
            "Type": "PO_Product",
            "Uuid": "4f0a2c94364d44c6a46e40373714fa4a"
        },
        "Score": {
            "parameter_components": {
                "1": 1.3,
                "2": 66
            }
        }
    }, {
        "ProductData": {
            "Category": {
                "Name": "Windows",
                "Type": "IfcWindow"
            },
            "Details": [{
                "ContentType": "text/html",
                "LastUpdated": 1513869653,
                "Name": "Description",
                "Uuid": "7b5a8d755f774553a16a65e90ea22433",
                "Content": "<p><strong>The Sch\u00fcco window systems with a basic depth of 90\u2009mm combine the benefits of aluminium with maximum thermal insulation for design-orientated, sustainable architecture</strong></p>\n<p>In the basic depth of 90\u2009mm, Sch\u00fcco offers a comprehensive modular window system, including new passive house certification. Its series Sch\u00fcco AWS 90.SI+, Sch\u00fcco AWS 90.SI+ Green and Sch\u00fcco 90 BS.SI+, which feature maximum thermal insulation, represent a perfect combination of structural requirements with the greatest possible degree of architectural design freedom.</p>\n<p>With the Sch\u00fcco AWS 90 BS.SI+ series, the narrow face widths and concealed vents allow the realisation of harmonious aluminium block window solutions in single and now double-vent designs. With a basic depth of 95\u2009mm, passive house standard can even be achieved.</p>\n<p>Innovative, sustainable and future-proof \u2013 significant proportions of renewable raw materials are also being used for the first time in insulating bars, foam and gaskets for the Sch\u00fcco AWS 90.SI+ Green generation of windows, which is production-ready. For example, the use of castor oil, an ecological substitute for fossil fuels, in polyamide insulating bars.</p>"
            }, {
                "ContentType": "text/html",
                "LastUpdated": 1513869653,
                "Name": "Product Benefits",
                "Uuid": "0a31d5c76ead49c5aee05bf107a0b919",
                "Content": "<p><strong>Energy</strong></p>\n<ul>\n\t<li>Sch\u00fcco Window AWS 90.SI+ Passive house certification due to improved thermal insulation of Uf \u2264 0,8\u2009W/(m\u00b2K)</li>\n\t<li>Insulation zone with foam-filled insulating bars optimised</li>\n\t<li>Large glass thicknesses can be used</li>\n</ul>\n<p><strong>Design</strong></p>\n<ul>\n\t<li>Sch\u00fcco AWS 90 BS.SI+ with concealed vents and opaque look: slender face widths from 77\u2009mm</li>\n\t<li>Block windows now also in double-vent design</li>\n</ul>\n<p><strong>Automation</strong></p>\n<ul>\n\t<li>Can be combined with Sch\u00fcco TipTronic</li>\n</ul>\n<p><strong>Security</strong></p>\n<ul>\n\t<li>Sch\u00fcco AvanTec SimplySmart concealed fittings system</li>\n\t<li>Burglar resistance available to RC 1 N, RC 2 and RC 3</li>\n</ul>\n<p><strong>Enhanced function</strong></p>\n<ul>\n\t<li>Series variants with maximum thermal insulation to passive house standard available:</li>\n\t<li>Block windows without visible vents</li>\n\t<li>Aluminium window system with \u201cgreen\u201d components: insulating bars, foam and glazing gasket with significant proportions of renewable raw materials; tested profile and insulating bar system as a series product \u2013 certification for bio-based products through T\u00dcV quality seal DIN CERTCO</li>\n\t<li>Easy-access opening and double-vent units</li>\n</ul>"
            }, {
                "ContentType": "text/html",
                "LastUpdated": 1513869652,
                "Name": "Fabrication Benefits",
                "Uuid": "648c532542604facbdca3458ad9b8b2e",
                "Content": "<ul>\n\t<li>Block series without pane bonding available to passive house standard</li>\n</ul>"
            }
            ],
            "Downloads": {
                "BIMModelCategories": {
                    "Archicad": [{
                        "ContentType": "application",
                        "LastUpdated": 1513869653,
                        "FileSize": "688 kB",
                        "Name": "Schueco_AWS_90_si_plus_inward_opening.lcf",
                        "Uuid": "fbe448aa3d934742a331c6506fdf7f5a",
                        "Content": "45d955954de62a865c5c305fd753a9d2"
                    }
                    ],
                    "Revit": [{
                        "ContentType": "application",
                        "LastUpdated": 1513869653,
                        "FileSize": "768 kB",
                        "Name": "Schueco_AWS-90-SI+_Family-01.rfa",
                        "Uuid": "0f6a4f4321604ba59353236ca77d03ad",
                        "Content": "abff33677ccfb3b35860afdc0a1d085c"
                    }
                    ]
                },
                "CADData": [{
                    "ContentType": "text/uri-list",
                    "LastUpdated": 1513869654,
                    "Name": "Planungsgrundlagen",
                    "OriginalSource": "http://docucenter.schueco.com/web/main/OuterCatLink.php?LLNK=3286;890370;14",
                    "Uuid": "4a3a5042cc264d1d8f844ebc6f6e3617",
                    "Content": "http://docucenter.schueco.com/web/main/OuterCatLink.php?LLNK=3286;890370;14"
                }, {
                    "ContentType": "text/uri-list",
                    "LastUpdated": 1513869654,
                    "Name": "Regeldetails",
                    "OriginalSource": "http://docucenter.schueco.com/web/main/OuterCatLink.php?LLNK=3286;890370;14",
                    "Uuid": "d4e7dd7d662a44ad8fa6e9eaefddd3ff",
                    "Content": "http://docucenter.schueco.com/web/main/OuterCatLink.php?LLNK=3286;890370;14"
                }, {
                    "ContentType": "text/uri-list",
                    "LastUpdated": 1513869654,
                    "Name": "Systemzeichnungen",
                    "OriginalSource": "http://docucenter.schueco.com/web/main/OuterCatLink.php?LLNK=3286;890370;14",
                    "Uuid": "5b83fa0cfcd04e75aae0dedef23a2cc5",
                    "Content": "http://docucenter.schueco.com/web/main/OuterCatLink.php?LLNK=3286;890370;14"
                }
                ],
                "BIMModels": [{
                    "ContentType": "application",
                    "LastUpdated": 1513869653,
                    "FileSize": "768 kB",
                    "Name": "Schueco_AWS-90-SI+_Family-01.rfa",
                    "Uuid": "0f6a4f4321604ba59353236ca77d03ad",
                    "Content": "abff33677ccfb3b35860afdc0a1d085c"
                }, {
                    "ContentType": "application",
                    "LastUpdated": 1513869653,
                    "FileSize": "688 kB",
                    "Name": "Schueco_AWS_90_si_plus_inward_opening.lcf",
                    "Uuid": "fbe448aa3d934742a331c6506fdf7f5a",
                    "Content": "45d955954de62a865c5c305fd753a9d2"
                }
                ],
                "Brochures": [{
                    "ContentType": "application/pdf",
                    "LastUpdated": 1513869654,
                    "FileSize": "516 kB",
                    "Name": "Sch\u00fcco AWS 90",
                    "OriginalSource": "https://www.schueco.com/web2/asset/de/architekten/produkte/fenster/aluminium/schueco_aws_90_si_plus/19543120/schueco_fenster_aws_90.pdf",
                    "Uuid": "f97a8c2aec9e441f96b8e943caa061cc",
                    "Content": "eaea38e067e0c40f07758d7aaab86e43"
                }, {
                    "ContentType": "application/pdf",
                    "LastUpdated": 1513869654,
                    "FileSize": "1.02 MB",
                    "Name": "Sch\u00fcco LightSkin",
                    "OriginalSource": "https://www.schueco.com/web2/asset/de/architekten/produkte/fenster/aluminium/schueco_aws_90_si_plus/19568574/schueco_light_skin.pdf",
                    "Uuid": "89a0e6bd739742f79157fae7c26741ef",
                    "Content": "adf3836932545f7dc3d035c2d89f114b"
                }
                ]
            },
            "Image": {
                "ContentType": "image/png",
                "LastUpdated": 1513869652,
                "FileSize": "3.55 MB",
                "Name": "Bild",
                "Uuid": "3ee20031575941af864e7c249691f59c",
                "Content": "b443424e558cbb8ea217b4ee99242623"
            },
            "ImageGallery": [{
                "ContentType": "image/png",
                "LastUpdated": 1513869654,
                "FileSize": "36.9 kB",
                "Name": "Sch\u00fcco Fenster AWS 90.SI+_1.png",
                "OriginalSource": "https://www.schueco.com/web2/image/cachedcrop/data/w1100/h1100/q30/id15278354/aws_90_si_plus_2_schnitt.jpg",
                "Uuid": "f5c1c41f6bf44cbebcaee0f803caef85",
                "Content": "653edf5dc8858b9142c74defd24b3827"
            }, {
                "ContentType": "image/png",
                "LastUpdated": 1513869654,
                "FileSize": "10.2 kB",
                "Name": "preview_image.png",
                "OriginalSource": "https://www.schueco.com/web2/image/cachedcrop/data/w740/h740/q30/id20340740/previewImage.jpg",
                "Uuid": "e9314b11f8014c028938bb9441aff8ef",
                "Content": "9f1d5b67afcc43e8a3660cd7b1b07a25"
            }
            ],
            "Name": "AWS 90.SI+",
            "ProductCategory": {
                "Name": "Windows",
                "Type": "IfcWindow"
            },
            "PropertySets": [{
                "Name": "Pset_WindowCommon",
                "Description": "Properties common to the definition of all occurrences of Window.",
                "Properties": [{
                    "ifdguid": "bffe7d00d21811e1800000215ad4efdf",
                    "DisplayName": "Fire Rating",
                    "Type": "IfcPropertySingleValue",
                    "Description": "Fire rating for this object.\nIt is given according to the national fire safety classification.",
                    "RawType": "STRING",
                    "NominalValue": "None",
                    "Name": "Fire Rating"
                }, {
                    "ifdguid": "d3114d00d21811e1800000215ad4efdf",
                    "DisplayName": "Infiltration",
                    "Type": "IfcPropertySingleValue",
                    "Description": "Infiltration flowrate of outside air for the filler object based on the area of the filler object at a pressure level of 50 Pascals. It shall be used, if the length of all joints is unknown.",
                    "RawType": "STRING",
                    "NominalValue": 4.0,
                    "Name": "Infiltration",
                    "Unit": {
                        "Name": "Klasse"
                    }
                }, {
                    "ifdguid": "c68cf480d21811e1800000215ad4efdf",
                    "DisplayName": "Security Rating",
                    "Type": "IfcPropertySingleValue",
                    "Description": "Index based rating system indicating security level.\nIt is giving according to the national building code.",
                    "RawType": "STRING",
                    "NominalValue": "RC3",
                    "Name": "Security Rating",
                    "Unit": {
                        "Name": "Klasse"
                    }
                }, {
                    "ifdguid": "f9cf8380d21811e1800000215ad4efdf",
                    "DisplayName": "Smoke Stop",
                    "Type": "IfcPropertySingleValue",
                    "Description": "Indication whether the object is designed to provide a smoke stop (TRUE) or not (FALSE).",
                    "RawType": "STRING",
                    "NominalValue": false,
                    "Name": "Smoke Stop"
                }, {
                    "ifdguid": "e92533f3a7e4416196ad923faee29e96",
                    "DisplayName": "WaterTightnessRating",
                    "Type": "IfcPropertySingleValue",
                    "Description": "Water tightness rating for this object.\nIt is provided according to the national building code.",
                    "RawType": "STRING",
                    "NominalValue": "9A",
                    "Name": "WaterTightnessRating",
                    "Unit": {
                        "Name": "Klasse"
                    }
                }, {
                    "ifdguid": "664882a15b8a420087f6f80670cbe20b",
                    "DisplayName": "WindLoadRating",
                    "Type": "IfcPropertyListValue",
                    "Description": "Wind load resistance rating for this object.\nIt is provided according to the national building code.",
                    "RawType": "STRING",
                    "ListValues": ["B4", "B5", "C4", "C5"],
                    "Name": "WindLoadRating",
                    "Unit": {
                        "Name": "Klasse"
                    }
                }
                ]
            }, {
                "Name": "Window_Pset_P1",
                "Description": "Window_Pset_P1",
                "Properties": [{
                    "ifdguid": "9f75567ce6fc11e7bd47f48c50787210",
                    "DisplayName": "Available in Country",
                    "Type": "IfcPropertySingleValue",
                    "Description": "no Content",
                    "RawType": "STRING",
                    "NominalValue": "Alle",
                    "Name": "Available in Country"
                }, {
                    "ifdguid": "9f7713cce6fc11e7bd47f48c50787210",
                    "DisplayName": "Corrosion protection class",
                    "Type": "IfcPropertySingleValue",
                    "Description": "no Content",
                    "RawType": "STRING",
                    "NominalValue": "5",
                    "Name": "Corrosion protection class",
                    "Unit": {
                        "Name": "Klasse"
                    }
                }, {
                    "ifdguid": "9f7198cae6fc11e7bd47f48c50787210",
                    "DisplayName": "Depth panel frame",
                    "Type": "IfcPropertySingleValue",
                    "Description": "no Content",
                    "RawType": "STRING",
                    "NominalValue": 90.0,
                    "Name": "Depth panel frame",
                    "Unit": {
                        "Name": "mm"
                    }
                }, {
                    "ifdguid": "9f74f420e6fc11e7bd47f48c50787210",
                    "DisplayName": "Handicap accessible",
                    "Type": "IfcPropertySingleValue",
                    "Description": "no Content",
                    "RawType": "STRING",
                    "NominalValue": true,
                    "Name": "Handicap accessible"
                }, {
                    "ifdguid": "9f774612e6fc11e7bd47f48c50787210",
                    "DisplayName": "Integral sunshading",
                    "Type": "IfcPropertySingleValue",
                    "Description": "no Content",
                    "RawType": "STRING",
                    "NominalValue": false,
                    "Name": "Integral sunshading"
                }, {
                    "ifdguid": "9f73ab2ee6fc11e7bd47f48c50787210",
                    "DisplayName": "Load bearing capacity of safety equipment",
                    "Type": "IfcPropertySingleValue",
                    "Description": "no Content",
                    "RawType": "STRING",
                    "NominalValue": true,
                    "Name": "Load bearing capacity of safety equipment",
                    "Unit": {
                        "Name": ""
                    }
                }, {
                    "ifdguid": "9f764dfce6fc11e7bd47f48c50787210",
                    "DisplayName": "Material",
                    "Type": "IfcPropertySingleValue",
                    "Description": "no Content",
                    "RawType": "STRING",
                    "NominalValue": "Aluminium",
                    "Name": "Material",
                    "Unit": {
                        "Name": ""
                    }
                }, {
                    "ifdguid": "9f764dfce6fc11e7bd47f48c50787210",
                    "DisplayName": "Material",
                    "Type": "IfcPropertySingleValue",
                    "Description": "no Content",
                    "RawType": "STRING",
                    "NominalValue": "Aluminium",
                    "Name": "Material"
                }, {
                    "ifdguid": "9f72b836e6fc11e7bd47f48c50787210",
                    "DisplayName": "Max. opening angle",
                    "Type": "IfcPropertySingleValue",
                    "Description": "no Content",
                    "RawType": "STRING",
                    "NominalValue": 180.0,
                    "Name": "Max. opening angle",
                    "Unit": {
                        "Name": "\u00b0"
                    }
                }, {
                    "ifdguid": "9f72daf0e6fc11e7bd47f48c50787210",
                    "DisplayName": "Max. panel weight, overlying suspension",
                    "Type": "IfcPropertySingleValue",
                    "Description": "no Content",
                    "RawType": "STRING",
                    "NominalValue": 250.0,
                    "Name": "Max. panel weight, overlying suspension",
                    "Unit": {
                        "Name": "kg"
                    }
                }, {
                    "ifdguid": "9f75bfd6e6fc11e7bd47f48c50787210",
                    "DisplayName": "Opening Type",
                    "Type": "IfcPropertyListValue",
                    "Description": "no Content",
                    "RawType": "STRING",
                    "ListValues": ["Dreh-Links", "Dreh-Rechts", "Drehkipp-Links", "Drehkipp-Rechts", "Fix", "Kipp"],
                    "Name": "Opening Type"
                }, {
                    "ifdguid": "9f6f6f1ee6fc11e7bd47f48c50787210",
                    "DisplayName": "Operating forces",
                    "Type": "IfcPropertySingleValue",
                    "Description": "no Content",
                    "RawType": "STRING",
                    "NominalValue": "Gering",
                    "Name": "Operating forces"
                }, {
                    "ifdguid": "9f7577d8e6fc11e7bd47f48c50787210",
                    "DisplayName": "Security glazing",
                    "Type": "IfcPropertySingleValue",
                    "Description": "no Content",
                    "RawType": "STRING",
                    "NominalValue": "None",
                    "Name": "Security glazing"
                }, {
                    "ifdguid": "9f783b80e6fc11e7bd47f48c50787210",
                    "DisplayName": "Suitable for passive houses",
                    "Type": "IfcPropertySingleValue",
                    "Description": "no Content",
                    "RawType": "STRING",
                    "NominalValue": true,
                    "Name": "Suitable for passive houses"
                }, {
                    "ifdguid": "9f75e70ee6fc11e7bd47f48c50787210",
                    "DisplayName": "Surface finishing",
                    "Type": "IfcPropertyListValue",
                    "Description": "no Content",
                    "RawType": "STRING",
                    "ListValues": ["Duraflon", "Eloxal", "Lack", "Pulver"],
                    "Name": "Surface finishing"
                }, {
                    "ifdguid": "9f71ddbce6fc11e7bd47f48c50787210",
                    "DisplayName": "Total face height",
                    "Type": "IfcPropertyBoundedValue",
                    "Description": "no Content",
                    "RawType": "STRING",
                    "Name": "Total face height",
                    "UpperBoundValue": 2500.0,
                    "LowerBoundValue": 540.0,
                    "Unit": {
                        "Name": "mm"
                    }
                }, {
                    "ifdguid": "9f720008e6fc11e7bd47f48c50787210",
                    "DisplayName": "Total face width",
                    "Type": "IfcPropertyBoundedValue",
                    "Description": "no Content",
                    "RawType": "STRING",
                    "Name": "Total face width",
                    "UpperBoundValue": 2800.0,
                    "LowerBoundValue": 470.0,
                    "Unit": {
                        "Name": "mm"
                    }
                }, {
                    "ifdguid": "9f71bbf2e6fc11e7bd47f48c50787210",
                    "DisplayName": "Total panel thickness",
                    "Type": "IfcPropertySingleValue",
                    "Description": "no Content",
                    "RawType": "STRING",
                    "NominalValue": 68.0,
                    "Name": "Total panel thickness",
                    "Unit": {
                        "Name": "mm"
                    }
                }, {
                    "ifdguid": "9f6fd580e6fc11e7bd47f48c50787210",
                    "DisplayName": "UF -Frame",
                    "Type": "IfcPropertySingleValue",
                    "Description": "no Content",
                    "RawType": "STRING",
                    "NominalValue": 0.71,
                    "Name": "UF -Frame",
                    "Unit": {
                        "Name": "W/(m\u00b2K)"
                    }
                }, {
                    "ifdguid": "9f700c1ce6fc11e7bd47f48c50787210",
                    "DisplayName": "UG-Glazing",
                    "Type": "IfcPropertySingleValue",
                    "Description": "no Content",
                    "RawType": "STRING",
                    "NominalValue": 0.7,
                    "Name": "UG-Glazing",
                    "Unit": {
                        "Name": "W/(m\u00b2K)"
                    }
                }, {
                    "ifdguid": "9f703f34e6fc11e7bd47f48c50787210",
                    "DisplayName": "UW-Window",
                    "Type": "IfcPropertySingleValue",
                    "Description": "no Content",
                    "RawType": "STRING",
                    "NominalValue": 0.92,
                    "Name": "UW-Window",
                    "Unit": {
                        "Name": "W/(m\u00b2K)"
                    }
                }, {
                    "ifdguid": "9f714d66e6fc11e7bd47f48c50787210",
                    "DisplayName": "Width panel frame",
                    "Type": "IfcPropertySingleValue",
                    "Description": "no Content",
                    "RawType": "STRING",
                    "NominalValue": 99.0,
                    "Name": "Width panel frame",
                    "Unit": {
                        "Name": "mm"
                    }
                }
                ]
            }
            ],
            "RefProjects": [{
                "Name": "Wohnhaus",
                "BuildingType": ["Wohnen und Leben"],
                "Uuid": "b58d61a7f3194f8a842703cde3eef219",
                "Image": {
                    "ContentType": "image/jpg",
                    "LastUpdated": 1516131141,
                    "FileSize": "52 kB",
                    "Name": "3135a28_499031.jpg",
                    "OriginalSource": "https://www.schueco.com/web2/image/cachedcrop/data/w1524/h650/q30/id18717624/3135a28_499031.jpg",
                    "Uuid": "42b03b6a55664c308fe1a1e5084ff4a7",
                    "Content": "e8960acf934b02781fa606729fe61727"
                }
            }
            ],
            "Supplier": {
                "Name": "Sch\u00fcco International KG",
                "Uuid": "3ec5b6a91f734a2ebb8442937e2f727f",
                "Logo": {
                    "ContentType": "image/png",
                    "LastUpdated": 1513868814,
                    "FileSize": "1.59 kB",
                    "Name": "logo",
                    "Uuid": "baaa1b57643e45e4adfb560ed424572b",
                    "Content": "d58222a04e37ca34c1fd4707de5617ec"
                }
            },
            "Type": "PO_Product",
            "Uuid": "fd9480c4f43d4584abb07ab37e611dcd"
        },
        "Score": {
            "parameter_components": {
                "1": 1.3,
                "2": 66
            }
        }
    }, {
        "ProductData": {
            "Category": {
                "Name": "Windows",
                "Type": "IfcWindow"
            },
            "Details": [{
                "ContentType": "text/html",
                "LastUpdated": 1513869662,
                "Name": "Description",
                "Uuid": "cfbfc680fb504a0293376a623e42a038",
                "Content": "<p><strong>The Sch\u00fcco window systems with a basic depth of 90\u2009mm combine the benefits of aluminium with maximum thermal insulation for design-orientated, sustainable architecture</strong></p>\n<p>In the basic depth of 90\u2009mm, Sch\u00fcco offers a comprehensive modular window system, including new passive house certification. Its series Sch\u00fcco AWS 90.SI+, Sch\u00fcco AWS 90.SI+ Green and Sch\u00fcco 90 BS.SI+, which feature maximum thermal insulation, represent a perfect combination of structural requirements with the greatest possible degree of architectural design freedom.</p>\n<p>With the Sch\u00fcco AWS 90 BS.SI+ series, the narrow face widths and concealed vents allow the realisation of harmonious aluminium block window solutions in single and now double-vent designs. With a basic depth of 95\u2009mm, passive house standard can even be achieved.</p>\n<p>Innovative, sustainable and future-proof \u2013 significant proportions of renewable raw materials are also being used for the first time in insulating bars, foam and gaskets for the Sch\u00fcco AWS 90.SI+ Green generation of windows, which is production-ready. For example, the use of castor oil, an ecological substitute for fossil fuels, in polyamide insulating bars.</p>"
            }, {
                "ContentType": "text/html",
                "LastUpdated": 1513869662,
                "Name": "Product Benefits",
                "Uuid": "d1ff69fc0de4410d97eb984440813546",
                "Content": "<p><strong>Energy</strong></p>\n<ul>\n\t<li>Sch\u00fcco Window AWS 90.SI+ Passive house certification due to improved thermal insulation of Uf \u2264 0,8\u2009W/(m\u00b2K)</li>\n\t<li>Insulation zone with foam-filled insulating bars optimised</li>\n\t<li>Large glass thicknesses can be used</li>\n</ul>\n<p><strong>Design</strong></p>\n<ul>\n\t<li>Sch\u00fcco AWS 90 BS.SI+ with concealed vents and opaque look: slender face widths from 77\u2009mm</li>\n\t<li>Block windows now also in double-vent design</li>\n</ul>\n<p><strong>Automation</strong></p>\n<ul>\n\t<li>Can be combined with Sch\u00fcco TipTronic</li>\n</ul>\n<p><strong>Security</strong></p>\n<ul>\n\t<li>Sch\u00fcco AvanTec SimplySmart concealed fittings system</li>\n\t<li>Burglar resistance available to RC 1 N, RC 2 and RC 3</li>\n</ul>\n<p><strong>Enhanced function</strong></p>\n<ul>\n\t<li>Series variants with maximum thermal insulation to passive house standard available:</li>\n\t<li>Block windows without visible vents</li>\n\t<li>Aluminium window system with \u201cgreen\u201d components: insulating bars, foam and glazing gasket with significant proportions of renewable raw materials; tested profile and insulating bar system as a series product \u2013 certification for bio-based products through T\u00dcV quality seal DIN CERTCO</li>\n\t<li>Easy-access opening and double-vent units</li>\n</ul>"
            }, {
                "ContentType": "text/html",
                "LastUpdated": 1513869662,
                "Name": "Fabrication Benefits",
                "Uuid": "066f8c1d18904d0ca7662447419f6772",
                "Content": "<ul>\n\t<li>Block series without pane bonding available to passive house standard</li>\n</ul>"
            }
            ],
            "Downloads": {
                "CADData": [{
                    "ContentType": "text/uri-list",
                    "LastUpdated": 1513869663,
                    "Name": "Planungsgrundlagen",
                    "OriginalSource": "https://www.schueco.com/web2/generic/ssoRedirect/de/23519580",
                    "Uuid": "24b5eb1d1531410ca2f14abc5aa3a712",
                    "Content": "https://www.schueco.com/web2/generic/ssoRedirect/de/23519580"
                }, {
                    "ContentType": "text/uri-list",
                    "LastUpdated": 1513869663,
                    "Name": "Regeldetails",
                    "OriginalSource": "https://www.schueco.com/web2/generic/ssoRedirect/de/23519584",
                    "Uuid": "9495a4591dbc4e3991102b70d76d5be2",
                    "Content": "https://www.schueco.com/web2/generic/ssoRedirect/de/23519584"
                }, {
                    "ContentType": "text/uri-list",
                    "LastUpdated": 1513869663,
                    "Name": "Systemzeichnungen",
                    "OriginalSource": "https://www.schueco.com/web2/generic/ssoRedirect/de/23519582",
                    "Uuid": "9c997a7e571f42f9bc51f645e5ae4edd",
                    "Content": "https://www.schueco.com/web2/generic/ssoRedirect/de/23519582"
                }
                ],
                "Brochures": [{
                    "ContentType": "application/pdf",
                    "LastUpdated": 1513869663,
                    "FileSize": "516 kB",
                    "Name": "Sch\u00fcco AWS 90",
                    "OriginalSource": "https://www.schueco.com/web2/asset/de/architekten/produkte/fenster/aluminium/schueco_aws_90_si_plus_green/19543120/schueco_fenster_aws_90.pdf",
                    "Uuid": "3ca36cd914fb4d26a467456e4ac32e51",
                    "Content": "eaea38e067e0c40f07758d7aaab86e43"
                }, {
                    "ContentType": "application/pdf",
                    "LastUpdated": 1513869663,
                    "FileSize": "1.33 MB",
                    "Name": "Sch\u00fcco Fenstersysteme AWS",
                    "OriginalSource": "https://www.schueco.com/web2/asset/de/architekten/produkte/fenster/aluminium/schueco_aws_90_si_plus_green/19491166/schueco_fenster_aws.pdf",
                    "Uuid": "9a28c744fcf8485183bbf618fef3728a",
                    "Content": "11aad8808bb4367d854ce0b0f0d3364a"
                }, {
                    "ContentType": "application/pdf",
                    "LastUpdated": 1513869663,
                    "FileSize": "1.02 MB",
                    "Name": "Sch\u00fcco LightSkin",
                    "OriginalSource": "https://www.schueco.com/web2/asset/de/architekten/produkte/fenster/aluminium/schueco_aws_90_si_plus_green/19568574/schueco_light_skin.pdf",
                    "Uuid": "451bcbc10ffa4409a92c551ef9a9efd4",
                    "Content": "adf3836932545f7dc3d035c2d89f114b"
                }
                ]
            },
            "Image": {
                "ContentType": "image/png",
                "LastUpdated": 1513869661,
                "FileSize": "3.63 MB",
                "Name": "Bild",
                "Uuid": "b912adae3fa04cd8bc3a7a3b6726e285",
                "Content": "8f27bc6fb465a7a9992c43f356551315"
            },
            "ImageGallery": [{
                "ContentType": "image/png",
                "LastUpdated": 1513869663,
                "FileSize": "8.01 kB",
                "Name": "Sch\u00fcco Fenster AWS 90. SI+ Green_1.png",
                "OriginalSource": "https://www.schueco.com/web2/image/cachedcrop/data/w1100/h1100/q30/id15278454/aws_90plus_si_greenline_schnitt.jpg",
                "Uuid": "6aea752af3ff41a5a7607ef86cb3ee90",
                "Content": "3ca28d733e2360aedf18b970cab8bd4e"
            }, {
                "ContentType": "image/png",
                "LastUpdated": 1513869663,
                "FileSize": "9.62 kB",
                "Name": "preview_image.png",
                "OriginalSource": "https://www.schueco.com/web2/image/cachedcrop/data/w740/h740/q30/id20340738/previewImage.jpg",
                "Uuid": "3b4fd08e545d434aaef5b6da5f151acf",
                "Content": "fa6ee4413698c954b0ed56d9237a71d1"
            }
            ],
            "Name": "AWS 90.SI+ Green",
            "ProductCategory": {
                "Name": "Windows",
                "Type": "IfcWindow"
            },
            "PropertySets": [{
                "Name": "Window_Pset_P1",
                "Description": "Window_Pset_P1",
                "Properties": [{
                    "ifdguid": "9f75567ce6fc11e7bd47f48c50787210",
                    "DisplayName": "Available in Country",
                    "Type": "IfcPropertySingleValue",
                    "Description": "no Content",
                    "RawType": "STRING",
                    "NominalValue": "Alle",
                    "Name": "Available in Country"
                }, {
                    "ifdguid": "9f7713cce6fc11e7bd47f48c50787210",
                    "DisplayName": "Corrosion protection class",
                    "Type": "IfcPropertySingleValue",
                    "Description": "no Content",
                    "RawType": "STRING",
                    "NominalValue": "5",
                    "Name": "Corrosion protection class",
                    "Unit": {
                        "Name": "Klasse"
                    }
                }, {
                    "ifdguid": "9f7198cae6fc11e7bd47f48c50787210",
                    "DisplayName": "Depth panel frame",
                    "Type": "IfcPropertySingleValue",
                    "Description": "no Content",
                    "RawType": "STRING",
                    "NominalValue": 90.0,
                    "Name": "Depth panel frame",
                    "Unit": {
                        "Name": "mm"
                    }
                }, {
                    "ifdguid": "9f74f420e6fc11e7bd47f48c50787210",
                    "DisplayName": "Handicap accessible",
                    "Type": "IfcPropertySingleValue",
                    "Description": "no Content",
                    "RawType": "STRING",
                    "NominalValue": true,
                    "Name": "Handicap accessible"
                }, {
                    "ifdguid": "9f774612e6fc11e7bd47f48c50787210",
                    "DisplayName": "Integral sunshading",
                    "Type": "IfcPropertySingleValue",
                    "Description": "no Content",
                    "RawType": "STRING",
                    "NominalValue": false,
                    "Name": "Integral sunshading"
                }, {
                    "ifdguid": "9f73ab2ee6fc11e7bd47f48c50787210",
                    "DisplayName": "Load bearing capacity of safety equipment",
                    "Type": "IfcPropertySingleValue",
                    "Description": "no Content",
                    "RawType": "STRING",
                    "NominalValue": true,
                    "Name": "Load bearing capacity of safety equipment",
                    "Unit": {
                        "Name": ""
                    }
                }, {
                    "ifdguid": "9f764dfce6fc11e7bd47f48c50787210",
                    "DisplayName": "Material",
                    "Type": "IfcPropertySingleValue",
                    "Description": "no Content",
                    "RawType": "STRING",
                    "NominalValue": "Aluminium",
                    "Name": "Material"
                }, {
                    "ifdguid": "9f764dfce6fc11e7bd47f48c50787210",
                    "DisplayName": "Material",
                    "Type": "IfcPropertySingleValue",
                    "Description": "no Content",
                    "RawType": "STRING",
                    "NominalValue": "Aluminium",
                    "Name": "Material",
                    "Unit": {
                        "Name": ""
                    }
                }, {
                    "ifdguid": "9f72b836e6fc11e7bd47f48c50787210",
                    "DisplayName": "Max. opening angle",
                    "Type": "IfcPropertySingleValue",
                    "Description": "no Content",
                    "RawType": "STRING",
                    "NominalValue": 180.0,
                    "Name": "Max. opening angle",
                    "Unit": {
                        "Name": "\u00b0"
                    }
                }, {
                    "ifdguid": "9f72daf0e6fc11e7bd47f48c50787210",
                    "DisplayName": "Max. panel weight, overlying suspension",
                    "Type": "IfcPropertySingleValue",
                    "Description": "no Content",
                    "RawType": "STRING",
                    "NominalValue": 250.0,
                    "Name": "Max. panel weight, overlying suspension",
                    "Unit": {
                        "Name": "kg"
                    }
                }, {
                    "ifdguid": "9f75bfd6e6fc11e7bd47f48c50787210",
                    "DisplayName": "Opening Type",
                    "Type": "IfcPropertyListValue",
                    "Description": "no Content",
                    "RawType": "STRING",
                    "ListValues": ["Dreh-Links", "Dreh-Rechts", "Drehkipp-Links", "Drehkipp-Rechts", "Fix", "Kipp"],
                    "Name": "Opening Type"
                }, {
                    "ifdguid": "9f6f6f1ee6fc11e7bd47f48c50787210",
                    "DisplayName": "Operating forces",
                    "Type": "IfcPropertySingleValue",
                    "Description": "no Content",
                    "RawType": "STRING",
                    "NominalValue": "Gering",
                    "Name": "Operating forces"
                }, {
                    "ifdguid": "9f7577d8e6fc11e7bd47f48c50787210",
                    "DisplayName": "Security glazing",
                    "Type": "IfcPropertySingleValue",
                    "Description": "no Content",
                    "RawType": "STRING",
                    "NominalValue": "None",
                    "Name": "Security glazing"
                }, {
                    "ifdguid": "9f783b80e6fc11e7bd47f48c50787210",
                    "DisplayName": "Suitable for passive houses",
                    "Type": "IfcPropertySingleValue",
                    "Description": "no Content",
                    "RawType": "STRING",
                    "NominalValue": true,
                    "Name": "Suitable for passive houses"
                }, {
                    "ifdguid": "9f75e70ee6fc11e7bd47f48c50787210",
                    "DisplayName": "Surface finishing",
                    "Type": "IfcPropertyListValue",
                    "Description": "no Content",
                    "RawType": "STRING",
                    "ListValues": ["Duraflon", "Eloxal", "Lack", "Pulver"],
                    "Name": "Surface finishing"
                }, {
                    "ifdguid": "9f71ddbce6fc11e7bd47f48c50787210",
                    "DisplayName": "Total face height",
                    "Type": "IfcPropertyBoundedValue",
                    "Description": "no Content",
                    "RawType": "STRING",
                    "Name": "Total face height",
                    "UpperBoundValue": 2500.0,
                    "LowerBoundValue": 540.0,
                    "Unit": {
                        "Name": "mm"
                    }
                }, {
                    "ifdguid": "9f720008e6fc11e7bd47f48c50787210",
                    "DisplayName": "Total face width",
                    "Type": "IfcPropertyBoundedValue",
                    "Description": "no Content",
                    "RawType": "STRING",
                    "Name": "Total face width",
                    "UpperBoundValue": 2800.0,
                    "LowerBoundValue": 470.0,
                    "Unit": {
                        "Name": "mm"
                    }
                }, {
                    "ifdguid": "9f71bbf2e6fc11e7bd47f48c50787210",
                    "DisplayName": "Total panel thickness",
                    "Type": "IfcPropertySingleValue",
                    "Description": "no Content",
                    "RawType": "STRING",
                    "NominalValue": 68.0,
                    "Name": "Total panel thickness",
                    "Unit": {
                        "Name": "mm"
                    }
                }, {
                    "ifdguid": "9f6fd580e6fc11e7bd47f48c50787210",
                    "DisplayName": "UF -Frame",
                    "Type": "IfcPropertySingleValue",
                    "Description": "no Content",
                    "RawType": "STRING",
                    "NominalValue": 0.79,
                    "Name": "UF -Frame",
                    "Unit": {
                        "Name": "W/(m\u00b2K)"
                    }
                }, {
                    "ifdguid": "9f714d66e6fc11e7bd47f48c50787210",
                    "DisplayName": "Width panel frame",
                    "Type": "IfcPropertySingleValue",
                    "Description": "no Content",
                    "RawType": "STRING",
                    "NominalValue": 99.0,
                    "Name": "Width panel frame",
                    "Unit": {
                        "Name": "mm"
                    }
                }
                ]
            }, {
                "Name": "Pset_WindowCommon",
                "Description": "Properties common to the definition of all occurrences of Window.",
                "Properties": [{
                    "ifdguid": "bffe7d00d21811e1800000215ad4efdf",
                    "DisplayName": "Fire Rating",
                    "Type": "IfcPropertySingleValue",
                    "Description": "Fire rating for this object.\nIt is given according to the national fire safety classification.",
                    "RawType": "STRING",
                    "NominalValue": "None",
                    "Name": "Fire Rating"
                }, {
                    "ifdguid": "d3114d00d21811e1800000215ad4efdf",
                    "DisplayName": "Infiltration",
                    "Type": "IfcPropertySingleValue",
                    "Description": "Infiltration flowrate of outside air for the filler object based on the area of the filler object at a pressure level of 50 Pascals. It shall be used, if the length of all joints is unknown.",
                    "RawType": "STRING",
                    "NominalValue": 4.0,
                    "Name": "Infiltration",
                    "Unit": {
                        "Name": "Klasse"
                    }
                }, {
                    "ifdguid": "c68cf480d21811e1800000215ad4efdf",
                    "DisplayName": "Security Rating",
                    "Type": "IfcPropertySingleValue",
                    "Description": "Index based rating system indicating security level.\nIt is giving according to the national building code.",
                    "RawType": "STRING",
                    "NominalValue": "RC3",
                    "Name": "Security Rating",
                    "Unit": {
                        "Name": "Klasse"
                    }
                }, {
                    "ifdguid": "f9cf8380d21811e1800000215ad4efdf",
                    "DisplayName": "Smoke Stop",
                    "Type": "IfcPropertySingleValue",
                    "Description": "Indication whether the object is designed to provide a smoke stop (TRUE) or not (FALSE).",
                    "RawType": "STRING",
                    "NominalValue": false,
                    "Name": "Smoke Stop"
                }, {
                    "ifdguid": "e92533f3a7e4416196ad923faee29e96",
                    "DisplayName": "WaterTightnessRating",
                    "Type": "IfcPropertySingleValue",
                    "Description": "Water tightness rating for this object.\nIt is provided according to the national building code.",
                    "RawType": "STRING",
                    "NominalValue": "9A",
                    "Name": "WaterTightnessRating",
                    "Unit": {
                        "Name": "Klasse"
                    }
                }, {
                    "ifdguid": "664882a15b8a420087f6f80670cbe20b",
                    "DisplayName": "WindLoadRating",
                    "Type": "IfcPropertyListValue",
                    "Description": "Wind load resistance rating for this object.\nIt is provided according to the national building code.",
                    "RawType": "STRING",
                    "ListValues": ["B5", "C5"],
                    "Name": "WindLoadRating",
                    "Unit": {
                        "Name": "Klasse"
                    }
                }
                ]
            }
            ],
            "Supplier": {
                "Name": "Sch\u00fcco International KG",
                "Uuid": "3ec5b6a91f734a2ebb8442937e2f727f",
                "Logo": {
                    "ContentType": "image/png",
                    "LastUpdated": 1513868814,
                    "FileSize": "1.59 kB",
                    "Name": "logo",
                    "Uuid": "baaa1b57643e45e4adfb560ed424572b",
                    "Content": "d58222a04e37ca34c1fd4707de5617ec"
                }
            },
            "Type": "PO_Product",
            "Uuid": "37bd421085fd413b81ba334b60f6e5cd"
        }
        ,
        "Score": {
            "parameter_components": {
                "1": 1.3,
                "2": 66
            }
        }
    }, {
        "ProductData": {
            "Name": "Product 4",
            "Supplier": {
                "Name": "Product Supplier 4"
            },
            "PropertySets": [{
                "Properties": [{
                    "ifdguid": "1",
                    "DisplayName": "Property 1",
                    "NominalValue": 1.1
                }]
            }, {
                "Properties": [{
                    "ifdguid": "2",
                    "DisplayName": "Property 2",
                    "NominalValue": 56.3
                }]
            }]
        },
        "Score": {
            "parameter_components": {
                "1": 1.3,
                "2": 66
            }
        }
    }],
    "Filters": [

    ]
}

@Component({
    selector: 'app',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent {

    constructor(private readonly _pdfExportService: PdfExportService
    ) { }

    public onGeneratePdf(): void {
        this._pdfExportService.generatePdf(SAMPLE_DATA2);
    }
}
