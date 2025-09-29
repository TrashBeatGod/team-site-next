// 内容工具函数 - Content Collections 集成
import { Artist, Music, Video } from './content';

// 回退数据
const fallbackArtists: Artist[] = [
  {
    title: "DRAGONHEART",
    genre: "CLOUD, SOUTH",
    description: "",
    image: "/image/DG.jpg",
    order: 1
  },
  {
    title: "CASHNEEDER", 
    genre: "夜晚我用呼吸 点亮星辰",
    description: "夜晚我用呼吸 点亮星辰",
    image: "/image/CS.jpg",
    order: 2
  },
  {
    title: "MOSHPIT",
    genre: "SUFFERINGTILLMORNING", 
    description: "",
    image: "/image/MP.jpg",
    order: 3
  }
];

const fallbackMusic: Music[] = [
  {
    title: "Sample Track 1",
    artist: "DRAGONHEART",
    image: "/image/DG.jpg",
    order: 1
  },
  {
    title: "Sample Track 2", 
    artist: "CASHNEEDER",
    image: "/image/CS.jpg",
    order: 2
  }
];

const fallbackVideos: Video[] = [
  {
    title: "Sample Video 1",
    artist: "MOSHPIT",
    thumbnail: "/image/MP.jpg",
    url: "#",
    order: 1
  }
];

// 异步获取内容数据
export async function getArtists(): Promise<Artist[]> {
  try {
    // 尝试使用 import 语法导入 Content Collections 生成的内容
    // @ts-ignore - 这些文件将在构建时生成
    const artistsModule = await import('../../.content-collections/generated/allArtists.js');
    const artistsData = artistsModule.default || [];
    console.log('Loaded artists from Content Collections:', artistsData.map(a => a.title));
    return artistsData.sort((a: Artist, b: Artist) => (a.order || 0) - (b.order || 0));
  } catch (error) {
    console.warn('Content Collections not yet generated, using fallback data for artists');
    return fallbackArtists;
  }
}

export async function getMusic(): Promise<Music[]> {
  try {
    // @ts-ignore
    const musicModule = await import('../../.content-collections/generated/allMusic.js');
    const musicData = musicModule.default || [];
    return musicData.sort((a: Music, b: Music) => (a.order || 0) - (b.order || 0));
  } catch (error) {
    console.warn('Failed to load music from content collections, using fallback data');
    return fallbackMusic;
  }
}

export async function getVideos(): Promise<Video[]> {
  try {
    // @ts-ignore
    const videosModule = await import('../../.content-collections/generated/allVideos.js');
    const videosData = videosModule.default || [];
    return videosData.sort((a: Video, b: Video) => (a.order || 0) - (b.order || 0));
  } catch (error) {
    console.warn('Failed to load videos from content collections, using fallback data');
    return fallbackVideos;
  }
}