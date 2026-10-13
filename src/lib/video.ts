import type { ProjectVideo } from "@/data/portfolio";
import { approvedVideoHosts } from "@/data/video";

export type VideoPlayback =
  | { provider: "youtube"; embedUrl: string }
  | { provider: "vimeo"; embedUrl: string }
  | { provider: "mp4"; src: string };

export function getVideoPlayback(video?: ProjectVideo): VideoPlayback | null {
  if (!video) return null;

  if (video.provider === "youtube" && /^[A-Za-z0-9_-]{11}$/.test(video.id)) {
    return {
      provider: "youtube",
      embedUrl: `https://www.youtube-nocookie.com/embed/${video.id}?autoplay=1&rel=0`,
    };
  }

  if (video.provider === "vimeo" && /^\d{6,12}$/.test(video.id)) {
    return {
      provider: "vimeo",
      embedUrl: `https://player.vimeo.com/video/${video.id}?autoplay=1&dnt=1&title=0&byline=0`,
    };
  }

  if (video.provider === "mp4") {
    const localPathIsSafe = /^\/videos\/(?!.*(?:\.\.|%2e))[A-Za-z0-9/_-]+\.mp4$/i.test(video.src);
    if (localPathIsSafe) return { provider: "mp4", src: video.src };

    try {
      const url = new URL(video.src);
      if (
        url.protocol === "https:"
        && approvedVideoHosts.includes(url.hostname)
        && url.pathname.toLowerCase().endsWith(".mp4")
        && !url.username
        && !url.password
      ) {
        return { provider: "mp4", src: url.toString() };
      }
    } catch {
      return null;
    }
  }

  return null;
}
