import { defineCollection, defineConfig } from "@content-collections/core";

const artists = defineCollection({
  name: "artists",
  directory: "content/artists",
  include: "*.md",
  schema: (z) => ({
    title: z.string(),
    genre: z.string(),
    description: z.string().optional(),
    image: z.string(),
    order: z.number().optional(),
  }),
});

const music = defineCollection({
  name: "music",
  directory: "content/music",
  include: "*.md",
  schema: (z) => ({
    title: z.string(),
    artist: z.string(),
    album: z.string().optional(),
    year: z.number().optional(),
    description: z.string().optional(),
    image: z.string(),
    order: z.number().optional(),
    url: z.string().optional(),
  }),
});

const videos = defineCollection({
  name: "videos",
  directory: "content/videos",
  include: "*.md",
  schema: (z) => ({
    title: z.string(),
    artist: z.string(),
    description: z.string().optional(),
    thumbnail: z.string(),
    url: z.string(),
    order: z.number().optional(),
  }),
});

export default defineConfig({
  collections: [artists, music, videos],
});