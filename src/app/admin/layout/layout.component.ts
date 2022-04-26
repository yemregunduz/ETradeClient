import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import{delay} from 'rxjs/operators'
import { BreakpointObserver } from '@angular/cdk/layout';
@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.css']
})
export class LayoutComponent implements OnInit {

  constructor(private observer:BreakpointObserver) { }
  @ViewChild(MatSidenav)
  sidenav!:MatSidenav
  
  ngOnInit(): void {
    
  }
  ngAfterViewInit(){
    this.observer
    .observe(['(max-width: 800px)'])
    .pipe(delay(1))
    .subscribe((res) => {
      if (res.matches) {
        this.sidenav.mode = 'over';
        this.sidenav.close();
      } else {
        this.sidenav.mode = 'side';
        this.sidenav.open();
      }
    });
  }

}
