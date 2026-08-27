import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Brand } from '../components/connection-card/connection.model';
import { Observable, map, shareReplay } from 'rxjs';
import { tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class BrandService {
  private http = inject(HttpClient);
  private brandsMap = new Map<number, Brand>();
  private brands$ = this.http.get<Brand[]>(`http://localhost:5000/api/brands`).pipe(
    tap((brands) => {
      brands.forEach((brand) => {
        this.brandsMap.set(Number(brand.id), brand);
      });
    }),
    shareReplay(1),
  );
  getBrands() {
    return this.brands$;
  }
  getBrand(brandId: number): Brand {
    return this.brandsMap.get(brandId) ?? { id: brandId, name: 'Unknown',color:"#e2dede" };
  }
}
