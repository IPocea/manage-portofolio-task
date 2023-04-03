import { Injectable } from '@angular/core';
import { MatPaginatorIntl } from '@angular/material/paginator';

@Injectable()
export class MatPaginatorIntlCro extends MatPaginatorIntl {
  override itemsPerPageLabel: string = 'Articole per pagina';
  override nextPageLabel: string = 'Pagina urmatoare';
  override previousPageLabel: string = 'Pagina anterioara';
  override firstPageLabel: string = 'Prima pagina';
  override lastPageLabel: string = 'Ultima pagina';

  override getRangeLabel = function (page, pageSize, length) {
    if (length === 0 || pageSize === 0) {
      return '0 din ' + length;
    }
    length = Math.max(length, 0);
    const startIndex = page * pageSize;
    const endIndex =
      startIndex < length
        ? Math.min(startIndex + pageSize, length)
        : startIndex + pageSize;
    return startIndex + 1 + ' - ' + endIndex + ' din ' + length;
  };
}