import exportFromJSON from 'export-from-json';
import { Column } from '../../Models/GridModel';

export default class ExportData {
    constructor() {

    }

    ListTabledata(data: any): any {
        let columnData = data.columns;
        let rowData = data.item;

        let rowObjArr: any[] = [];
        rowData.forEach((item: any) => {
            let colObj: any = {};
            columnData.forEach((col: Column) => {
                if (col.columnPropertyKey != "Action") {
                    let key: string = col.columnPropertyKey;
                    let value: string = item[col.columnPropertyKey];
                    colObj[key] = value;
                }
            })
            rowObjArr.push(colObj);
        })
        return rowObjArr;
    }

    Export(rowdata: any, fileName: string, exportType: any) {
        let data: string = this.ListTabledata(rowdata);
        exportFromJSON({ data, fileName, exportType })
    }

}