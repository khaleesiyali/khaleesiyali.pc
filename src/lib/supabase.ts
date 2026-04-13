import { createClient } from '@supabase/supabase-js';

// Setup Mock/Fallback behavior if ENV keys are missing.
export const SUPABASE_CONFIGURED = !!(
  process.env.NEXT_PUBLIC_SUPABASE_URL &&
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

export const supabase = SUPABASE_CONFIGURED
  ? createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  )
  : null;

// ==========================================
// FALLBACK DATA (Run when Supabase is missing)
// ==========================================

export interface BlogPost {
  id: string;
  slug?: string;
  title: string;
  tags: string[];
  thumbnail: string;
  date: string;
  content: string; // Markdown or HTML
}

export const FALLBACK_POSTS: BlogPost[] = [
  {
    id: 'post-1',
    slug: 'post-1',
    title: 'Spring Break ‘26 is Over!',
    tags: ['#UniLife', '#Hackathon', '#Research', '#TokyoTech'],
    thumbnail: '/assets/blog/cover.png', // Mapped image_0 to existing Ghibli
    date: 'Apr 14, 2026',
    content: `
<p>They say university breaks are supposed to be long and slow, but this one vanished in a heartbeat. Looking back, this was easily the most productive stretch of my three years at uni. It was tiring, honestly, but it provided the kind of adrenaline rush that only comes when you’re truly out of your comfort zone.</p>

<p>Here’s a look at what kept me busy during Spring Break ‘26.</p>

<h2 id="volunteering" class="text-2xl font-black mt-8 text-[var(--color-win-text)]">Volunteering</h2>

<p>Stepping out of my bubble was the best decision I made this year. It served as a total kickstart, opening doors to incredible people and big ideas.</p>

<ul class="list-disc ml-6 space-y-4">
<li><strong>Impact Tokyo 2026 Hackathon (by CognisorAI)</strong>: I served as staff for this event, and it was mind-blowing to watch teams build "tech for good" solutions in under three hours. The speed of innovation was inspiring!
<div class="my-8 grid grid-cols-2 gap-4">
  <img src="/assets/blog/IMG_0410.JPG" class="w-full h-auto max-h-64 object-cover border-[3px] border-[var(--color-win-border)] shadow-[4px_4px_0_0_var(--shadow-color)]" alt="Staff 1" />
  <img src="/assets/blog/IMG_2704.JPG" class="w-full h-auto max-h-64 object-cover border-[3px] border-[var(--color-win-border)] shadow-[4px_4px_0_0_var(--shadow-color)]" alt="Staff 2" />
</div>
</li>
<li><strong>TEDx Innovation U</strong>: Working as staff here was a masterclass in fast-paced thinking. It taught me how to move quickly when needed, but also how to slow down and truly appreciate a moment shared with brilliant minds.</li>
</ul>

<h2 id="hacking" class="text-2xl font-black mt-12 text-[var(--color-win-text)]">Hacking</h2>

<img src="/assets/blog/Screenshot%202026-04-14%20at%200.28.02.png" class="my-8 w-full h-auto border-[3px] border-[var(--color-win-border)] shadow-[4px_4px_0_0_var(--shadow-color)]" alt="GDGoC Grand Prize" />

<p>I dove headfirst into the Japanese tech scene this break, and the results were unexpected.</p>

<ul class="list-disc ml-6 space-y-4">
<li><strong>GDGoC Japan Hackathon 2026</strong>: This was my first-ever "All Japanese" hackathon. I went in with zero expectations and walked away with the Tokyo Venue Grand Prize. I was so inspired by how other students perceived the "New Hello World"—it shifted my own perspective on what we can build.</li>

<li><strong>VoiceOS @ Mercari Office</strong>: My second hackathon of the year was a wild 1.5-hour sprint! My team and I focused on keeping things light and just enjoying the experience. It was a high-speed lesson in collaboration under pressure.</li>
</ul>

<img src="/assets/blog/PXL_20260329_074107951.JPG" class="my-8 w-full h-auto border-[3px] border-[var(--color-win-border)] shadow-[4px_4px_0_0_var(--shadow-color)]" alt="Mercari Sprint" />

<h2 id="academics" class="text-2xl font-black mt-12 text-[var(--color-win-text)]">Academics & Research</h2>

<p>Between the events, I made sure to keep the momentum going on the research side.</p>

<ul class="list-disc ml-6 space-y-2">
<li><strong>Research Assistant in Data Science</strong>: I officially joined the team at SILS as a Research Assistant. It’s been a deep dive into the data-driven side of things that I’m incredibly passionate about.</li>
<li><strong>Publications</strong>: I managed to finish three papers that are now on their way to being published! 😗</li>
</ul>

<h2 id="extras" class="text-2xl font-black mt-12 text-[var(--color-win-text)]">Extras</h2>

<ul class="list-disc ml-6 space-y-2">
<li>I got out of my reading slump! I finished 10 books! I’m aiming for a big goal this year, so stay tuned for some upcoming book reviews.</li>
<li>I finally got my hands on a very cute <a href="https://www.kotopia.world/">Kootopia</a> Plushie.</li>
</ul>

<div class="my-8 grid grid-cols-2 gap-4">
  <img src="/assets/blog/%E3%82%B9%E3%82%AF%E3%83%AA%E3%83%BC%E3%83%B3%E3%82%B7%E3%83%A7%E3%83%83%E3%83%88%202026-04-13%2023.04.02.png" class="w-full h-64 object-cover border-[3px] border-[var(--color-win-border)] shadow-[4px_4px_0_0_var(--shadow-color)]" alt="10 Books Collage" />
  <img src="/assets/blog/IMG_9904.JPG" class="w-full h-64 object-cover border-[3px] border-[var(--color-win-border)] shadow-[4px_4px_0_0_var(--shadow-color)]" alt="Kootopia Plushie" />
</div>

<p>If there is one thing I learned this break, it’s that putting yourself out there is never as scary as it seems. Try different things. Test the water. If it feels good, dive in.</p>

<p>As I head into my 6th semester, I’m feeling grateful for the stories heard and the ideas exchanged. I’m not sure if I’ll be documenting every step of this semester here, but for now, I'm just enjoying the ride.</p>

<br> 

<p>Stay curious,<br/>
<strong>Khaleesiyali</strong></p>
    `
  },

  /* {
     id: 'post-2',
     slug: 'post-2',
     title: 'The Tokyo Data Dive: Uncovering UX in Shinjuku & Akihabara',
     tags: ['#Travel', '#Tokyo', '#UXResearch', '#NLP'],
     thumbnail: '/assets/IMG_1058.PNG', // Mapped image_1
     date: 'Mar 28, 2026',
     content: `
 <h1 id="the-tokyo" class="text-3xl font-black">The Tokyo Data Dive: Uncovering UX in Shinjuku & Akihabara</h1>
 
 <p>Navigating Tokyo is an involuntary masterclass in human-computer interaction. From the chaotic sonic branding of Don Quijote to the hyper-efficient, split-second ticketing gates at Shinjuku station, every corner of this city runs on massive datasets and refined UX.</p>
 
 <h3 id="scale" class="text-xl font-bold mt-8">The Scale of Shinjuku</h3>
 
 <p>Observing the flow of foot traffic here feels like watching a living algorithm. Last week, I spent time mapping the wayfinding signage for my latest UX Research piece contrasting Japanese and Western design paradigms. The density of information here is staggering.</p>
 
 <img src="/assets/IMG_1055.PNG" alt="Tokyo Tech" class="my-8" />
 
 <p><em>Akihabara: The intersection of raw hardware and glowing aesthetics.</em></p>
 
 <p>As an NLP developer, seeing how multilingual contextual models struggle to translate the nuance of Japanese spatial awareness gives me so much foundational inspiration for my next project.</p>
     `
   }
 
   */
];

export interface GuestbookEntry {
  id: string;
  post_id: string;
  nickname: string;
  content: string;
  created_at: string;
}

// LocalStorage helpers for the Mock environment
export const getLocalComments = (postId: string): GuestbookEntry[] => {
  if (typeof window === 'undefined') return [];
  const stored = localStorage.getItem(`comments_${postId}`);
  return stored ? JSON.parse(stored) : [];
};

export const addLocalComment = (postId: string, nickname: string, content: string) => {
  if (typeof window === 'undefined') return;
  const current = getLocalComments(postId);
  const newComment: GuestbookEntry = {
    id: crypto.randomUUID(),
    post_id: postId,
    nickname,
    content,
    created_at: new Date().toISOString()
  };
  localStorage.setItem(`comments_${postId}`, JSON.stringify([...current, newComment]));
  return newComment;
};

export const getLocalLikes = (postId: string): number => {
  if (typeof window === 'undefined') return 0;
  return parseInt(localStorage.getItem(`likes_${postId}`) || '0', 10);
};

export const addLocalLike = (postId: string) => {
  if (typeof window === 'undefined') return;
  const likes = getLocalLikes(postId) + 1;
  localStorage.setItem(`likes_${postId}`, likes.toString());
  return likes;
};
