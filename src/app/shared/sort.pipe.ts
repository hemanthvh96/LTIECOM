import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'sortBy'
})

export class SortPipe implements PipeTransform {

    transform(array: string[], value: string) {
        return array.sort((a, b) => a > b ? 1 : -1)
    }
}