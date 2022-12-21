import { DatePipe } from '@angular/common';
import { Component, OnDestroy, OnInit, ViewChild, ElementRef, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { title } from 'src/app/constants/constants';
import { Post } from 'src/app/constants/posts';
import { PostService } from 'src/app/services/post.service';
import { RouterService } from 'src/app/services/router.service';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class PostComponent implements OnInit, OnDestroy {

  post!: Post;
  subscription!: Subscription;

  @ViewChild('content') content!: ElementRef<HTMLElement>;

  constructor(
    private route: ActivatedRoute,
    private postsService: PostService,
    private routerService: RouterService,
    private datePipe: DatePipe
  ) {}

  ngOnInit(): void {
      this.subscription = this.route.params.subscribe((param) => {
        this.postsService.getPost(param['id']).then((post) => this.post = post!)
        .then(() => document.title = title + ' | ' + this.post.title);
      });
  }

  backPage() {
    this.routerService.backPage();
  }

  onKeypressEvent(event: any) {
    if (event.keyCode === 27) {
      this.backPage();
    }
  }

  get postDate() {
    return this.datePipe.transform(this.post.postedAt, "dd 'de' MMMM 'de' yyyy");
  }

  ngOnDestroy(): void {
      this.subscription.unsubscribe();
  }

}
