'use client';

import { useEffect, useState } from 'react';
import './globals.css';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogClose,
} from '@/components/ui/dialog';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
} from '@/components/ui/carousel';
import { Button } from '@/components/ui/button';
import { getArtists, getMusic, getVideos } from '@/lib/content-utils';
import type { Artist, Music, Video } from '@/lib/content';

interface WindowState {
  id: string;
  title: string;
  type: 'ARTIST' | 'MUSIC' | 'VIDEO';
  currentView: number;
  totalViews: number;
}

export default function Home() {
  const [windows, setWindows] = useState<WindowState[]>([]);
  const [artists, setArtists] = useState<Artist[]>([]);
  const [music, setMusic] = useState<Music[]>([]);
  const [videos, setVideos] = useState<Video[]>([]);

  // 加载内容数据
  useEffect(() => {
    const loadContent = async () => {
      try {
        const [artistsData, musicData, videosData] = await Promise.all([
          getArtists(),
          getMusic(),
          getVideos()
        ]);
        
        setArtists(artistsData);
        setMusic(musicData);
        setVideos(videosData);
      } catch (error) {
        console.error('Failed to load content:', error);
      }
    };

    loadContent();
  }, []);

  

  // 桌面图标双击事件
  const handleIconDoubleClick = (appName: 'ARTIST' | 'MUSIC' | 'VIDEO') => {
    openAppWindow(appName); 
  };

  // 打开应用窗口
  const openAppWindow = (appName: 'ARTIST' | 'MUSIC' | 'VIDEO') => {
    const existing = windows.find(w => w.type === appName);
    if (existing) return;

    // 根据内容数据计算总视图数
    let totalViews = 1;
    switch (appName) {
      case 'ARTIST':
        totalViews = artists.length || 1;
        break;
      case 'MUSIC':
        totalViews = music.length || 1;
        break;
      case 'VIDEO':
        totalViews = videos.length || 1;
        break;
    }

    const newWindow: WindowState = {
      id: appName.toLowerCase() + '-window',
      title: appName,
      type: appName,
      currentView: 0,
      totalViews
    };
    
    // 当打开新窗口时，如果已有其他窗口，自动关闭第一个窗口
    setWindows(prev => {
      if (prev.length > 0) {
        // 关闭与第一个窗口同类型的窗口，保留其他窗口，并添加新窗口。
        const firstWindow = prev[0];
        return [...prev.filter(w => w.type !== firstWindow.type), newWindow];
      }
      return [...prev, newWindow];
    });
  };

  // 关闭应用窗口
  const closeAppWindow = (appName: string) => {
    setWindows(prev => prev.filter(w => w.type !== appName));
  };

  // 切换视图
  const switchView = (appName: string, viewIndex: number) => {
    setWindows(prev => prev.map(w =>
      w.type === appName ? { ...w, currentView: viewIndex } : w
    ));
  };

  // 切换视图（上一个/下一个）
  const changeView = (appName: string, direction: 'prev' | 'next') => {
    const win = windows.find(w => w.type === appName);
    if (win) {
      const newView = direction === 'prev' 
        ? (win.currentView - 1 + win.totalViews) % win.totalViews
        : (win.currentView + 1) % win.totalViews;
      switchView(appName, newView);
    }
  };

  // 监听桌面图标点击/双击
  useEffect(() => {
    const clickTimes = new Map<string, number>();

    const handleClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const icon = target.closest('.desktop-icon') as HTMLElement;
      if (!icon) return;

      const iconName = icon.querySelector('.icon-text')?.textContent as 'ARTIST' | 'MUSIC' | 'VIDEO' | undefined;
      if (!iconName) return;

      const now = Date.now();
      const lastClick = clickTimes.get(iconName) || 0;
      clickTimes.set(iconName, now);

      if (now - lastClick < 250) {
        handleIconDoubleClick(iconName);
      }
    };

    document.addEventListener('click', handleClick);
    return () => document.removeEventListener('click', handleClick);
  }, [windows]);

  return (
    <>
      {/* 桌面图标容器 - 使用CSS Grid布局 */}
      <div className="desktop-icons-container">
        <div className="desktop-icon artist-icon">
          <div className="icon-image">🎨</div>
          <div className="icon-text">ARTIST</div>
        </div>
        
        <div className="desktop-icon music-icon">
          <div className="icon-image">🎵</div>
          <div className="icon-text">MUSIC</div>
        </div>
        
        <div className="desktop-icon video-icon">
          <div className="icon-image">🎬</div>
          <div className="icon-text">VIDEO</div>
        </div>
      </div>

      {/* 渲染所有打开的窗口 */}
      {windows.map((window) => (
        <Dialog key={window.id} open={true} onOpenChange={(open) => !open && closeAppWindow(window.type)}>
          <DialogContent 
            className="sm:max-w-6xl w-[90vw] h-[85vh] p-0 border-0 shadow-2xl bg-[#800020]" 
            showCloseButton={true}
          >
            <DialogHeader className="sr-only">
              <DialogTitle>{window.title}</DialogTitle>
              <DialogDescription>
                {window.type === 'ARTIST' && '艺术家信息展示窗口'}
                {window.type === 'MUSIC' && '音乐作品展示窗口'}
                {window.type === 'VIDEO' && '视频内容展示窗口'}
              </DialogDescription>
            </DialogHeader>

            
            {window.type === 'ARTIST' && (
              <div className="artist-window h-full">
                <div className="window-content h-full">
                  <Carousel className="w-full h-full">
                    <CarouselContent className="h-full">
                      {artists.map((artist, index) => (
                        <CarouselItem key={index} className="h-full">
                          <div className="artist-content h-full flex flex-col justify-center items-center">
                            <div className="flex justify-center items-center flex-1">
                              <div className="artist-info">
                                <h2>{artist.title}</h2>
                                <p>GENRE: {artist.genre}</p>
                                {artist.description && <p>{artist.description}</p>}
                              </div>
                              <div className="artist-image">
                                <img src={artist.image} alt={artist.title} />
                              </div>
                            </div>
                            <div className="mb-8 invisible">
                              <Button variant="default" size="lg" disabled>
                                占位符
                              </Button>
                            </div>
                          </div>
                        </CarouselItem>
                      ))}
                    </CarouselContent>
                    <CarouselPrevious className="left-4 bg-black/50 hover:bg-black/70 text-white" />
                  <CarouselNext className="right-4 bg-black/50 hover:bg-black/70 text-white" />
                  </Carousel>
                </div>
              </div>
            )}

          {window.type === 'MUSIC' && (
            <div className="artist-window h-full">
              <div className="window-content h-full">
                <Carousel className="w-full h-full">
                  <CarouselContent className="h-full">
                    {music.map((track, index) => (
                      <CarouselItem key={index} className="h-full">
                        <div className="artist-content h-full flex flex-col justify-center items-center">
                          <div className="flex justify-center items-center flex-1">
                            <div className="artist-info">
                              <h2>{track.title}</h2>
                              <p>ARTIST: {track.artist}</p>
                              {track.description && <p>{track.description}</p>}
                            </div>
                            <div className="artist-image">
                              <img src={track.image} alt={track.title} />
                            </div>
                          </div>
                          {/* 为"不孝子"页面单独隐藏试听按钮，添加占位符保持布局一致 */}
                          {track.title !== "不孝子(UNREALSE)" ? (
                            <div className="mb-8">
                              <Button variant="default" size="lg" asChild>
                                <a href={track.url || "#"} target="_blank">点击试听</a>
                              </Button>
                            </div>
                          ) : (
                            <div className="mb-8 invisible">
                              <Button variant="default" size="lg" disabled>
                                占位符
                              </Button>
                            </div>
                          )}
                        </div>
                      </CarouselItem>
                    ))}
                  </CarouselContent>
                  <CarouselPrevious className="left-4 bg-black/50 hover:bg-black/70" />
                  <CarouselNext className="right-4 bg-black/50 hover:bg-black/70" />
                </Carousel>
              </div>
            </div>
          )}

          {window.type === 'VIDEO' && (
            <div className="artist-window h-full">
              <div className="window-content h-full">
                <Carousel className="w-full h-full">
                  <CarouselContent className="h-full">
                    {videos.map((video, index) => (
                      <CarouselItem key={index} className="h-full">
                        <div className="artist-content h-full flex flex-col justify-center items-center">
                          <div className="flex justify-center items-center flex-1">
                            <div className="artist-info">
                              <h2>{video.title}</h2>
                              <p>ARTIST: {video.artist}</p>
                              {video.description && <p>{video.description}</p>}
                            </div>
                            <div className="artist-image">
                              <img src={video.thumbnail} alt={video.title} />
                            </div>
                          </div>
                          <div className="mb-8">
                            <Button variant="default" size="lg" asChild>
                              <a href={video.url} target="_blank">观看视频</a>
                            </Button>
                          </div>
                        </div>
                      </CarouselItem>
                    ))}
                  </CarouselContent>
                  <CarouselPrevious className="left-4 bg-black/50 hover:bg-black/70" />
                  <CarouselNext className="right-4 bg-black/50 hover:bg-black/70" />
                </Carousel>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
      ))}
    </>
  );
}