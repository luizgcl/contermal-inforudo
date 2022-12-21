import { RouterService } from './../../services/router.service';
import { PostLocalStorage, PostService } from './../../services/post.service';
import { DatePipe } from '@angular/common';
import { Component, OnDestroy, OnInit, ViewChild, ElementRef, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { Post } from '../../constants/posts';
import { title } from '../../constants/constants';
@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class PostComponent implements OnInit, OnDestroy {

  post!: Post;
  subscription!: Subscription;
  likedPost: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private postsService: PostService,
    private localPost: PostLocalStorage,
    private routerService: RouterService,
    private datePipe: DatePipe
  ) {}

  ngOnInit(): void {
      this.subscription = this.route.params.subscribe((param) => {
        this.postsService.getPost(param['id']).then((post) => this.post = post!)
        .then(() => document.title = title + ' | ' + this.post.title);

        this.likedPost = this.localPost.hasLikedPost(param['id']);
      });
  }

  handleClickLike() {
    if (this.likedPost)
      this.unlikePost()
    else
      this.likePost()
  }

  likePost() {
    this.postsService.likePost(this.post.id);
    this.likedPost = true;
  }

  unlikePost() {
    this.postsService.unlikePost(this.post.id);
    this.likedPost = false;
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
