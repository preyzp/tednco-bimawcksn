import type { ProjectVideo } from "@/data/portfolio";

// Add only exact, trusted CDN hostnames when hosted MP4 footage is configured.
export const approvedVideoHosts: readonly string[] = [];

// No approved showreel is available yet. Add its real MP4 source and poster here.
export const heroShowreel: { video: ProjectVideo; poster: string } | undefined = undefined;
