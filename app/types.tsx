export interface Pin {
  id: string;
  user_id: string;
  post_id: string;
}
export interface User {
  image: string; 
 
}
export interface PostWithProfile {
    id: string;
    video_url: string;
    text: string;
    created_at: Date;
    locale: string;
    latitude: number;
    longitude: number;
    profile: {
      user_id: string;
      name: string;
      image: string;
    };
  };

  export interface Message {
    id: string;
    senderId: string;
    receiverId: string;
    content: string;
    createdAt: Date;
  }


export interface Comments {
  id: string;
  user_id: string;
  post_id: string;
  text: string;
  created_at: string;
}
export interface Comment {
  id: string;
  content: string;
  createdAt: Date; 
  user: {
    id: string;
    name: string; 
    image?: string; 
  };
}
export interface UploadError {
  type: string;
  message: string;
}

export interface CropperDimensions {
  width?: number | null;
  height?: number | null;
  left?: number | null;
  top?: number | null;
}