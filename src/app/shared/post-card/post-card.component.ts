import { PostLocalStorage, PostService } from './../../services/post.service';
import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Post } from '../../constants/posts';

@Component({
  selector: 'PostCard',
  templateUrl: './post-card.component.html',
  styleUrls: ['./post-card.component.css']
})
export class PostCardComponent implements OnInit {

  @Input() post!: Post;
  likedPost: boolean = false;

  constructor(
    private postsService: PostService,
    private localPost: PostLocalStorage,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.likedPost = this.localPost.hasLikedPost(this.post.id);
  }

  get description() {
    return `${this.post.content.replace(/<[^>]*>/g, '').slice(0, 34)}...`;
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

  viewPost() {
    this.postsService.viewPost(this.post.id);
    this.router.navigate(['/posts/', this.post.id]);
  }
}
