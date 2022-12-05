import { Component, OnInit } from '@angular/core';
import { Post } from '../constants/posts';
import { PostService } from '../services/post.service';
import { RouterService } from '../services/router.service';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.css']
})
export class PostsComponent implements OnInit {

  posts: Post[] = [];

  mostViewedPosts: Post[] = [];
  recentPosts: Post[] = [];

  constructor(
    private postsService: PostService,
    private routerService: RouterService
  ) { }

  ngOnInit(): void {
    this.postsService.getPosts().then((posts) => {
      this.posts = posts!;
    }).then(() => {
      this.recentPosts = this.posts.sort((postA, postB) => {
        return new Date(postB.postedAt).getTime() - new Date(postA.postedAt).getTime();
      }).slice(0, 3);

      this.mostViewedPosts = this.posts.sort((postA, postB) => {
        return postB.views - postA.views;
      }).slice(0, 3);
    })
  }

}
