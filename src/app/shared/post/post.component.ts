import { Component, OnDestroy, OnInit, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { title } from 'src/app/constants/constants';
import { Post } from 'src/app/constants/posts';
import { PostService } from 'src/app/services/post.service';
import { RouterService } from 'src/app/services/router.service';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent implements OnInit, OnDestroy, AfterViewInit {

  post!: Post;
  subscription!: Subscription;

  @ViewChild('content') content!: ElementRef<HTMLElement>;

  constructor(
    private route: ActivatedRoute,
    private postsService: PostService,
    private routerService: RouterService
  ) {}

  ngOnInit(): void {
      this.subscription = this.route.params.subscribe((param) => {
        this.postsService.getPost(param['id']).then((post) => this.post = post!)
        .then(() => document.title = title + ' | ' + this.post.title);
      });
  }

  ngAfterViewInit(): void {
      this.post.content = this.post.content
      .replace('\n', '<br/>')
      .replace(':title:', '<h1>')
      .replace(':/title:', '</h1>');

      this.content.nativeElement.innerHTML = `
        ${this.post.content}
      `
  }

  backPage() {
    this.routerService.backPage();
  }


  ngOnDestroy(): void {
      this.subscription.unsubscribe();
  }

}
