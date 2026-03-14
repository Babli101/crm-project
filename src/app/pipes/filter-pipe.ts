import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter',
  standalone: true
})
export class FilterPipe implements PipeTransform {

  transform(items: any[], search: string): any[] {

    if (!items || !search) return items;

    search = search.toLowerCase();

    return items.filter(item =>
      item.name?.toLowerCase().includes(search) ||
      item.email?.toLowerCase().includes(search)
    );

  }

}