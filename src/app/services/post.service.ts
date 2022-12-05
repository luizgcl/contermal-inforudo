import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Post } from '../constants/posts';

@Injectable({
  providedIn: 'root'
})
export class PostService {

  constructor(
    private client: HttpClient,
  ) { }

  getPosts() {
    return this.client.get<Post[]>('../../assets/data/posts.json').toPromise()
  }
}
