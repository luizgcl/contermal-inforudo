import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { Post } from 'src/app/constants/posts';
import { PostService } from 'src/app/services/post.service';

@Component({
  selector: 'PostCard',
  templateUrl: './post-card.component.html',
  styleUrls: ['./post-card.component.css']
})
export class PostCardComponent {

  @Input() post!: Post;

  constructor(
    private postsService: PostService,
    private router: Router,
  ) {}

  get description() {
    return `${this.post.content.slice(1, 35)}...`;
  }

  viewPost() {
    this.postsService.viewPost(this.post.id);
    this.router.navigate(['/posts/', this.post.id]);
  }
}
