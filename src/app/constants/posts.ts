export interface Post {
  id: number;
  title: string;
  content: string;
  postedAt: Date;
  author: string;
  authorImage: string;
  imagePath?: string;
  views: number;
  likes: number;
}

export let posts: Array<Post> = [];

export function updatePost(newPosts: Array<Post>) {
  posts = newPosts
  return posts
}
