import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { Repository } from '../shared/models/repository';
import { pluck } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class RepositoriesService {

  public repositories: BehaviorSubject<Repository[]> = new BehaviorSubject(null);

  public url = 'https://api.github.com/search/repositories';

  constructor(
    protected http: HttpClient
  ) { }

  /**
   * Получение репозиториев по имени
   */
  getRepositories(name: string, page: number, perPage: number): Observable<Repository[]> {
    return this.http.get<Repository[]>(`${this.url}?q=${name}&page=${page}&per_page=${perPage}`).pipe(pluck('items'))
  }
}
