import { Component, OnInit, OnDestroy, EventEmitter } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { RepositoryInfo } from '../shared/models/repository-info';
import { RepositoriesService } from '../services/repositories.service';
import { Subject, of } from 'rxjs';
import { takeUntil, debounceTime, switchMap, tap } from 'rxjs/operators';
import { Repository } from '../shared/models/repository';
import { FormControl } from '@angular/forms';
import { error } from 'util';

@Component({
  selector: 'app-result',
  templateUrl: './result.component.html',
  styleUrls: ['./result.component.scss']
})
export class ResultComponent implements OnInit, OnDestroy {
  public search = new FormControl('');
  public displayedColumns: string[] = ['number', 'url', 'language', 'name_repository', 'name', 'created'];
  public dataSource: MatTableDataSource<Repository[]>;
  public onTextareaInputEvent$ = new EventEmitter<string>();
  public page = 1;
  public perPage = 10;
  public errorRepositories = false;
  public repositories = [];
  public value: string;
  public isLoading = true;
  public onChange = (fn: any): void => { };

  private destroyed$: Subject<void> = new Subject();

  constructor(
    private repositoriesService: RepositoriesService,
  ) {
    this.onTextareaInputEvent$
      .pipe(
        tap(() => this.onChange(null)),
        debounceTime(300),
        takeUntil(this.destroyed$)
      )
      .subscribe(
        (searchValue: string) => {
        this.value = searchValue
        this.loadRepositories(this.value);
        },
        error => {
          this.isLoading = false;
          console.log(error)
        }
      );
  }

  ngOnInit() {

  }

  ngOnDestroy(): void {
    this.destroyed$.next();
    this.destroyed$.complete();
  }

  /**
   * Получить репозитории по имени
   */
  loadRepositories(value: string) {
    if (value) {
      this.isLoading = false;
      this.repositoriesService.getRepositories(value, this.page, this.perPage)
        .pipe(
          takeUntil(this.destroyed$)
        )
        .subscribe(
          res => {
            if (res) {
              this.repositories = this.repositories.concat(res);
              this.dataSource = new MatTableDataSource(this.repositories);
              this.isLoading = true;
            }
          },
          error => {
            this.errorRepositories = true;
            this.dataSource = new MatTableDataSource([])
          }
        )
    } else {
      this.dataSource = new MatTableDataSource([])
    }
  }

  /**
   * Подгрузка репозиториев по скроллу
   */
  onScrollDown() {
    this.page += 1;
    this.loadRepositories(this.value);
  }

}
