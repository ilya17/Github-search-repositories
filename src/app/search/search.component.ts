import { Component, OnInit, OnDestroy } from '@angular/core';
import { RepositoriesService } from '../services/repositories.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit, OnDestroy {
  public repositories = [];
  public value: string

  private destroyed$: Subject<void> = new Subject()

  constructor(
    private repositoriesService: RepositoriesService
  ) { }

  ngOnInit() {
  }

  ngOnDestroy(): void {
    this.destroyed$.next();
    this.destroyed$.complete()
  }

  /**
   * Получить репозитории по имени
   */
  getRepositories(name: string): void {
    this.repositoriesService.getRepositories(name)
    .pipe(takeUntil(this.destroyed$))
    .subscribe(res => {
      console.log(res)
    })
  }

  some(e) {
    console.log(e)
  }
}
