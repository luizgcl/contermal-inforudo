import { Injectable } from '@angular/core';
import { NavigationStart, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { title } from '../constants/constants'

@Injectable({
  providedIn: 'root'
})
export class RouterService {

  subscription!: Subscription;
  navigationList: Array<String> = [];

  constructor(public router: Router) {
    if (this.subscription == undefined) {
      this.subscription = router.events.subscribe((event) => {
        if (event instanceof NavigationStart) {
          const urlIndex = this.navigationList.findIndex((element) =>  element == event.url);
          if (urlIndex != -1)
            this.navigationList.slice(urlIndex, 1);
          this.navigationList.push(event.url);
          document.title = title;
        }
      });
    }
  }

  backPage() {
    this.navigationList.pop();
    const url = this.navigationList[this.navigationList.length-1]
    this.router.navigateByUrl(<string>url);
  }
}
