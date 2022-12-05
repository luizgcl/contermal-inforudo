export interface Post {
  id: string,
  title: string;
  content: string;
  postedAt: Date;
  author: string;
  authorImage: string;
  imagePath?: string;
  views: number;
  likes: number;
}
