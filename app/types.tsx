export interface Pin {
  id: string;
  user_id: string;
  post_id: string;
}

export interface Comments {
  id: string;
  user_id: string;
  post_id: string;
  text: string;
  created_at: string;
}
export interface UploadError {
  type: string;
  message: string;
}