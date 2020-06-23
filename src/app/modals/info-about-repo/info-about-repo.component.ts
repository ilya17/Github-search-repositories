import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Repository } from 'src/app/shared/models/repository';

@Component({
  selector: 'app-info-about-repo',
  templateUrl: './info-about-repo.component.html',
  styleUrls: ['./info-about-repo.component.scss']
})
export class InfoAboutRepoComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<InfoAboutRepoComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Repository
  ) { }

  ngOnInit() {
    console.log(this.data)
  }

}
