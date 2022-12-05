import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Post, posts, updatePost } from '../constants/posts';

const URL_PATH = '../../assets/data/posts.json'

@Injectable({
  providedIn: 'root'
})
export class PostService {

  constructor(
    private client: HttpClient,
  ) { }

  getPosts() {
    return this.client.get<Post[]>(URL_PATH).toPromise()
  }

  async getPost(id: number) {
    const posts = await this.getPosts()

    return posts!.find(element => element.id == id)
  }

  async viewPost(id: number) {
    const posts = await this.getPosts();

    posts!.map((post) => {
      if (post.id == id) {
        post.views += 1;
      }
    })

    updatePost(posts!);
  }

  private async nextId(): Promise<number> {
    const posts = await this.getPosts()

    const post = posts!.sort((postA, postB) => {
      return postB.id - postA.id
    })[0]

    return post.id
  }

}
