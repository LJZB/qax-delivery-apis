export interface PostRequest {
  title: string;
  body: string;
  userId: number;
}

export interface PostResponse extends PostRequest {
  id: number;
}