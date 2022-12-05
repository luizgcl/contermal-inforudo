import { Component, OnInit } from '@angular/core';
import { Post } from '../constants/posts';
import { PostService } from '../services/post.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  posts: Post[] = [];

  mostViewedPosts: Post[] = [];
  recentPosts: Post[] = [];

  constructor(
    private postsService: PostService,
  ) {}

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
