import { ArrowLeft, ArrowRight, ArrowUpRight, Clock } from "lucide-react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { useBlogPosts } from "@/hooks/useBlogPosts";

type BlogStory = {
  title: string;
  excerpt: string;
  category: string;
  slug: string;
  readTime: string;
  date?: string;
  image: string;
  images: string[];
};

type BlogSectionProps = {
  compact?: boolean;
};

const BlogSection = ({ compact = false }: BlogSectionProps) => {
  const { posts } = useBlogPosts(false, true);
  const managedStories: BlogStory[] = posts.map((post) => ({
    title: post.title,
    excerpt: post.excerpt,
    category: post.category,
    slug: post.slug,
    readTime: `${post.read_time_minutes} min read`,
    date: post.story_date || undefined,
    image: post.image || "/img/placeholder.svg",
    images: post.images || [],
  }));
  const mainManagedStory = managedStories.find((story) => posts.find((post) => post.title === story.title)?.is_main);
  const availableStories = compact
    ? mainManagedStory
      ? [mainManagedStory, ...managedStories.filter((story) => story.title !== mainManagedStory.title)]
      : managedStories
    : managedStories;
  const visibleStories = compact ? availableStories.slice(0, 5) : availableStories;
  const featuredStory = visibleStories[0];
  const gridStories = visibleStories.slice(1);
  const activeImages = featuredStory?.images.length ? featuredStory.images : [featuredStory?.image].filter((image): image is string => Boolean(image));
  const [activeImage, setActiveImage] = useState(0);

  useEffect(() => {
    if (!featuredStory) return;
    setActiveImage(0);
    if (activeImages.length <= 1) return;
    const interval = window.setInterval(() => {
      setActiveImage((current) => (current + 1) % activeImages.length);
    }, 4500);

    return () => window.clearInterval(interval);
  }, [activeImages.length, featuredStory?.image]);

  if (!featuredStory) {
    return null;
  }

  const showPreviousImage = () => {
    setActiveImage((current) => (current - 1 + activeImages.length) % activeImages.length);
  };

  const showNextImage = () => {
    setActiveImage((current) => (current + 1) % activeImages.length);
  };

  return (
    <section className={`relative overflow-hidden bg-white px-6 md:px-12 dark:bg-slate-900 ${compact ? "py-12 md:py-16" : "min-h-screen pb-24 pt-36"}`}>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_8%_12%,rgba(255,255,255,0.7),transparent_30%),linear-gradient(120deg,rgba(255,255,255,0.1),transparent_55%)] dark:opacity-20" />

      <div className="relative z-10 mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
          className="mb-9 flex flex-col gap-6 md:flex-row md:items-end md:justify-between"
        >
          <div className="max-w-xl">
            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.22em] text-[#1d526d]">The Binary Hub journal</p>
            <h2 className="font-display text-3xl leading-[1.05] text-[#15394d] md:text-4xl">
              Latest <span className="text-[#00628b]">[News]</span>
            </h2>
          </div>
        </motion.div>

        <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-4 lg:grid-rows-2">
          <motion.article
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="group relative min-h-[360px] overflow-hidden rounded-[3px] bg-[#173b50] lg:col-span-2 lg:row-span-2"
          >
            <motion.img
              key={activeImage}
              src={activeImages[activeImage] || featuredStory.image}
              alt={featuredStory.title}
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.75 }}
              transition={{ duration: 0.7 }}
              className="absolute inset-0 h-full w-full object-cover transition duration-700 group-hover:scale-105 group-hover:opacity-90"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#102f42] via-[#102f42]/25 to-transparent" />
            <div className="relative flex h-full flex-col justify-end p-6 md:p-8">
              <div className="mb-3 flex items-center gap-3 text-[10px] font-semibold uppercase tracking-[0.16em] text-[#dcecf3]">
                <span>{featuredStory.category}</span>
                <span className="h-1 w-1 rounded-full bg-[#dcecf3]/70" />
                <span>{featuredStory.date}</span>
                <span className="flex items-center gap-1"><Clock className="h-3 w-3" />{featuredStory.readTime}</span>
              </div>
              <Link to={`/blog/${featuredStory.slug}`} className="group/title max-w-lg">
                <h3 className="font-display text-2xl leading-tight text-white transition group-hover/title:text-[#b8e6f6] md:text-4xl">{featuredStory.title}</h3>
              </Link>
              <p className="mt-3 max-w-lg text-sm leading-relaxed text-white/75">{featuredStory.excerpt}</p>
              <Link to={`/blog/${featuredStory.slug}`} className="mt-6 inline-flex w-fit items-center gap-2 text-sm font-semibold text-white">
                Read story <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
              </Link>
              <div className="mt-6 flex items-center gap-2">
                <button
                  type="button"
                  onClick={showPreviousImage}
                  aria-label="Previous summit image"
                  className="rounded-full border border-white/40 p-2 text-white transition hover:bg-white/15"
                >
                  <ArrowLeft className="h-3.5 w-3.5" />
                </button>
                <div className="flex items-center gap-1.5" aria-label={`Featured image ${activeImage + 1} of ${activeImages.length}`}>
                    {activeImages.map((image, index) => (
                    <button
                      key={`${image}-${index}`}
                      type="button"
                      onClick={() => setActiveImage(index)}
                      aria-label={`Show featured image ${index + 1}`}
                      className={`h-1.5 rounded-full transition-all ${index === activeImage ? "w-6 bg-white" : "w-1.5 bg-white/50"}`}
                    />
                  ))}
                </div>
                <button
                  type="button"
                  onClick={showNextImage}
                  aria-label="Next summit image"
                  className="rounded-full border border-white/40 p-2 text-white transition hover:bg-white/15"
                >
                  <ArrowRight className="h-3.5 w-3.5" />
                </button>
              </div>
            </div>
          </motion.article>

          {gridStories.map((story, index) => (
            <Link to={`/blog/${story.slug}`} className="group block">
            <motion.article
              key={story.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.45, delay: index * 0.08 }}
              className="group grid min-h-[235px] grid-rows-[132px_1fr] overflow-hidden rounded-[3px] bg-[#eef4f7]/90 shadow-sm"
            >
              <div className="overflow-hidden">
                <img src={story.image} alt="" className="h-full w-full object-cover transition duration-500 group-hover:scale-105" />
              </div>
              <div className="flex flex-col justify-between p-4">
                <div>
                  <div className="mb-2 flex items-center justify-between gap-2 text-[9px] font-bold uppercase tracking-[0.12em] text-[#39718b]">
                    <span>{story.category}</span>
                    <span className="flex items-center gap-1 font-medium normal-case tracking-normal text-[#6b8794]"><Clock className="h-3 w-3" />{story.readTime}</span>
                  </div>
                  <h3 className="font-display text-lg leading-tight text-[#183c50]">{story.title}</h3>
                </div>
                <p className="mt-3 line-clamp-2 text-xs leading-relaxed text-[#587181]">{story.excerpt}</p>
              </div>
            </motion.article>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BlogSection;