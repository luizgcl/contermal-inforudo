import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Post } from 'src/app/constants/posts';

@Component({
  selector: 'FindPost',
  templateUrl: './find-post.component.html',
  styleUrls: ['./find-post.component.css']
})
export class FindPostComponent {

  @Input() posts!: Post[];
  @Output() onfilter = new EventEmitter();

  onFilter() {
    // const filteredPosts = this.posts.find(ports => );
    // return filteredPosts;
  }
}
