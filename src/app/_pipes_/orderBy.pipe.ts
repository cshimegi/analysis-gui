import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
    name: 'orderBy'
})

export class OrderBy implements PipeTransform {
    transform(array: any, column: string, order: string): any[] {
        if (!Array.isArray(array)) {
            return;
        }

        array.sort((a: any, b: any) => {
            if (a[column] < b[column]) {
                return -1;
            } else if (a[column] > b[column]) {
                return 1;
            } else {
                return 0;
            }
        });
        
        if (order === 'desc') {
            array.reverse();
        }

        return array;
    }
}