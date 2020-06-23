import { Component, OnInit, OnDestroy, EventEmitter, ViewChild } from '@angular/core';
import { MatTableDataSource, MatSort, MatDialog } from '@angular/material';
import { RepositoriesService } from '../services/repositories.service';
import { Subject } from 'rxjs';
import { takeUntil, debounceTime, tap } from 'rxjs/operators';
import { Repository } from '../shared/models/repository';
import { FormControl } from '@angular/forms';
import { InfoAboutRepoComponent } from '../modals/info-about-repo/info-about-repo.component';

@Component({
  selector: 'app-result',
  templateUrl: './result.component.html',
  styleUrls: ['./result.component.scss']
})
export class ResultComponent implements OnInit, OnDestroy {

  @ViewChild(MatSort, { static : false }) sort: MatSort;

  public search = new FormControl('');
  public displayedColumns: string[] = ['number', 'url', 'language', 'name_repository', 'name', 'created'];
  public dataSource: MatTableDataSource<Repository[]>;
  public onTextareaInputEvent$ = new EventEmitter<string>();
  public page = 1; // траница
  public perPage = 10; // количество репозиториев на странице
  public errorRepositories = false;
  public repositories = [];
  public value: string;
  public isLoading = true;
  public onChange = (fn: any): void => {};

  private destroyed$: Subject<void> = new Subject();

  constructor(
    public dialog: MatDialog,

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
              this.dataSource.sort = this.sort;
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

  openInfoModal(row) {
    const dialogref = this.dialog.open(InfoAboutRepoComponent, {data: row});
  }
}
