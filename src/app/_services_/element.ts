import { Injectable } from '@angular/core';
import * as d3 from 'd3';
import '@app/_extensions_';

@Injectable({ providedIn: 'root' })

export class ElementService {
    
    constructor(
        
    ) {}

    /**
     * 
     * @param parentElemId
     * @param data 
     * @param columns 
     */
    tabulate(parentElemId: string, data: object[], columns: Array<string>) {
        let table = d3.select('#' + parentElemId)
                      .append('table')
                      .attr('class', 'table table-striped');
        let thead = table.append('thead');
        let	tbody = table.append('tbody');
        
        // build table's head
        thead.append('tr')
             .selectAll('th')
             .data(columns)
             .enter()
             .append('th')
             .attr('scope', 'col')
             .text(function (column) {
                 return column === 'no' ? '#' : column.capitalizeFirstLetter();
             });
        // build table's body
        tbody.selectAll('tr')
             .data(data)
             .enter()
             .append('tr')
             .selectAll('td')
             .data(function (rowData) {
                return columns.map(function (column) {
                    return rowData[column];
                  });
             })
             .enter()
             .append('td')
             .text(function (value) {
                 return value;
             });
        
        return table;
    }


}