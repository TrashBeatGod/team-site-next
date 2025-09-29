// 内容集合类型定义
export interface Artist {
  title: string;
  genre: string;
  description?: string;
  image: string;
  order?: number;
  content?: string;
}

export interface Music {
  title: string;
  artist: string;
  album?: string;
  year?: number;
  description?: string;
  image: string;
  order?: number;
  content?: string;
  url?: string;
}

export interface Video {
  title: string;
  artist: string;
  description?: string;
  thumbnail: string;
  url: string;
  order?: number;
  content?: string;
}