import configuration from "../../content-collections.ts";
import { GetTypeByName } from "@content-collections/core";

export type Artist = GetTypeByName<typeof configuration, "artists">;
export declare const allArtists: Array<Artist>;

export type Music = GetTypeByName<typeof configuration, "music">;
export declare const allMusic: Array<Music>;

export type Video = GetTypeByName<typeof configuration, "videos">;
export declare const allVideos: Array<Video>;

export {};
