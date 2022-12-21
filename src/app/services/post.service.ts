import { Inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Post, updatePost } from '../constants/posts';
import { AngularFirestore, AngularFirestoreCollection, DocumentData } from '@angular/fire/compat/firestore';

const URL_PATH = '../../assets/data/posts.json'
const COLLECTION = 'post_infos'

@Injectable({
  providedIn: 'root'
})
export class PostService {

  constructor(
    private client: HttpClient,
    private readonly posts: PostFirebaseService,
    private readonly localPost: PostLocalStorage
  ) { }

  async getPosts() {
    const posts = await this.client.get<Post[]>(URL_PATH).toPromise();
    this.posts.loadPostInfos(posts!);
    return posts;
  }

  async getPost(id: number) {
    const jsonPost = (await this.getPosts())!.find(element => element.id == id)
    const post = await this.posts.getPost(id);
    return {
      ...jsonPost,
      ...post!
    }
  }

  async viewPost(id: number) {
    const post = await this.getPost(id);

    if (!this.localPost.hasPostViewed(post!.id)) {
      this.posts.updatePost(post!.id, {
        likes: post!.likes,
        views: post!.views+1
      })
      this.posts.loadPostInfos((await this.getPosts())!)
      this.localPost.setViewedPost(id);
    }
  }

  private async nextId(): Promise<number> {
    const posts = await this.getPosts()

    const post = posts!.sort((postA, postB) => {
      return postB.id - postA.id
    })[0]

    return post.id + 1
  }

}

@Injectable()
export class PostFirebaseService {
  private collection: AngularFirestoreCollection;

  constructor(
    private readonly firestore: AngularFirestore,
  ) {
    this.collection = this.firestore.collection(COLLECTION);
  }

  loadPostInfos(posts: Post[]) {
    posts.forEach((post) => {
      this.collection.valueChanges().forEach((infos) => {
        infos.forEach((doc) => {
          if (doc['id'] == post.id) {
            post.likes = doc['likes'];
            post.views = doc['views'];
          }
        });
      });
    });
  }

  async getPost(id: number) {
    let post: Post | undefined;
    await this.collection.doc(`${id}`).get().toPromise().then((data) => {
      if (data!.exists) {
        post = data!.data() as Post;
      }
    })
    return post;
  }

  updatePost(id: number, data: {
    likes: number,
    views: number
  }) {
    this.collection.doc(`${id}`).set({
      ...data,
      id: id
    });
  }

}

@Injectable()
export class PostLocalStorage {

  setLikedPost(id: number, liked: boolean) {
    localStorage.setItem(`likedPost@${id}`, liked ? 'true' : 'false');
  }

  setViewedPost(id: number) {
    localStorage.setItem(`viewedPost@${id}`,'true');
  }

  hasPostViewed(id: number) {
    const result = localStorage.getItem(`viewedPost@${id}`)
    return result ? true : false
  }

  hasLikedPost(id: number) {
    const result = localStorage.getItem(`likedPost@${id}`)
    return result == 'true' ? true : false;
  }

}
