import BlogSection from "@/components/BlogSection";
import Footer from "@/components/Footer";
import { ArrowUpRight } from "lucide-react";
import { useBlogPosts } from "@/hooks/useBlogPosts";

const Blog = () => {
  const { posts } = useBlogPosts(false, true);

  return (
    <div className="min-h-screen">
      <BlogSection />
      <>
      {posts.filter((post) => ![
        "binary-hub-global-ai-summit-africa",
        "empowering-innovation-together-hitamospace",
      ].includes(post.slug)).map((post) => (
        <article key={post.id} className="border-t border-slate-200 bg-white px-6 py-20 dark:border-slate-800 dark:bg-slate-950 md:px-12">
          <div className="mx-auto max-w-3xl">
            <p className="mb-4 text-xs font-semibold uppercase tracking-[0.22em] text-[#00628b]">{post.category}{post.story_date ? ` · ${post.story_date}` : ""} · {post.read_time_minutes} min read</p>
            <h1 className="font-display text-4xl leading-tight text-slate-900 dark:text-white md:text-6xl">{post.title}</h1>
            {post.image && <img src={post.image} alt={post.title} className="mt-10 aspect-[16/9] w-full object-cover" />}
            <div className="mt-8 whitespace-pre-line text-base leading-8 text-slate-600 dark:text-slate-300 md:text-lg">{post.content}</div>
          </div>
        </article>
      ))}
    <article className="bg-white px-6 py-20 dark:bg-slate-950 md:px-12">
      <div className="mx-auto max-w-3xl">
        <p className="mb-4 text-xs font-semibold uppercase tracking-[0.22em] text-[#00628b]">AI & Africa · 3-4 April 2025</p>
        <h1 className="font-display text-4xl leading-tight text-slate-900 dark:text-white md:text-6xl">
          Binary Hub showed up and stood tall at the Global AI Summit on Africa
        </h1>
        <img
          src="/img/blog/From 3-4th April, Binary Hub showed up and stood tall at the Global AI Summit on Africa. an even (2).jpg"
          alt="Global AI Summit on Africa stage"
          className="mt-10 aspect-[16/9] w-full object-cover"
        />
        <div className="mt-8 space-y-5 text-base leading-8 text-slate-600 dark:text-slate-300 md:text-lg">
          <p>
            From 3-4th April, Binary Hub showed up and stood tall at the Global AI Summit on Africa, an event that brought together bold minds and visionary ideas.
          </p>
          <p>
            We are proud to be part of a movement shaping the future of AI, innovation, and impact on our continent. The summit was a powerful reminder that Africa's most important ideas are already here, being developed by people who understand our communities and our possibilities.
          </p>
          <p>
            Big thanks to MINICT and @rwandaict for organizing such a transformative experience. Africa is rising and we are building the future, one idea at a time.
          </p>
        </div>
        <div className="mt-10 flex flex-wrap items-center gap-3 text-sm font-semibold text-[#00628b]">
          <span>#gais2025</span>
          <span>#BinaryHub</span>
          <span>#aiforafrica</span>
          <span>#innovationinmotion</span>
          <ArrowUpRight className="h-4 w-4" />
        </div>
      </div>
    </article>
    <article className="border-t border-slate-200 bg-slate-50 px-6 py-20 dark:border-slate-800 dark:bg-slate-900 md:px-12">
      <div className="mx-auto max-w-3xl">
        <p className="mb-4 text-xs font-semibold uppercase tracking-[0.22em] text-[#00628b]">Product Spotlight · 47 weeks ago</p>
        <h2 className="font-display text-4xl leading-tight text-slate-900 dark:text-white md:text-5xl">
          Empowering innovation together with HitamoSpace
        </h2>
        <img
          src="/img/blog/🚀 Empowering innovation together!Binary Hub proudly supporting the HitamoSpace system, a next-.webp"
          alt="HitamoSpace event and venue management platform"
          className="mt-10 aspect-[16/9] w-full object-cover"
        />
        <div className="mt-8 space-y-5 text-base leading-8 text-slate-600 dark:text-slate-300 md:text-lg">
          <p>
            Binary Hub proudly supports the HitamoSpace system, a next-generation event and venue management platform powered by Binary Hub.
          </p>
          <p>
            HitamoSpace is transforming how the University of Rwanda manages events and spaces, bringing smarter workflows and better experiences to the people who use them.
          </p>
        </div>
        <div className="mt-10 flex flex-wrap items-center gap-3 text-sm font-semibold text-[#00628b]">
          <span>#HitamoSpace</span>
          <span>#BinaryHub</span>
          <span>#ur</span>
          <span>#innovation</span>
          <span>#TechForImpact</span>
          <span>#eventtech</span>
          <span>#smartsolutions</span>
          <span>#urcst</span>
          <ArrowUpRight className="h-4 w-4" />
        </div>
      </div>
    </article>
      </>
      <Footer />
    </div>
  );
};

export default Blog;