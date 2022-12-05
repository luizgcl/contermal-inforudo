import { Component, Input } from '@angular/core';
import { Post } from 'src/app/constants/posts';

@Component({
  selector: 'PostCard',
  templateUrl: './post-card.component.html',
  styleUrls: ['./post-card.component.css']
})
export class PostCardComponent {

  @Input() post!: Post;

  get description() {
    return `${this.post.content.slice(1, 35)}...`;
  }
}
