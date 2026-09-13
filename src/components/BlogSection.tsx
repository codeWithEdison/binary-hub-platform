import { ArrowLeft, ArrowRight, ArrowUpRight, Clock } from "lucide-react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { useBlogPosts } from "@/hooks/useBlogPosts";

type BlogStory = {
  title: string;
  excerpt: string;
  category: string;
  readTime: string;
  date?: string;
  image: string;
};

const stories: BlogStory[] = [
  {
    title: "Binary Hub at the Global AI Summit on Africa",
    excerpt: "From 3-4th April, Binary Hub showed up and stood tall at the Global AI Summit on Africa, joining bold minds and visionary ideas shaping the future of AI, innovation, and impact on our continent.",
    category: "AI & Africa",
    readTime: "3 min read",
    date: "3-4 April 2025",
    image: "/img/blog/From 3-4th April, Binary Hub showed up and stood tall at the Global AI Summit on Africa. an even (2).jpg",
  },
  {
    title: "Empowering innovation together with HitamoSpace",
    excerpt: "Binary Hub proudly supports HitamoSpace, a next-generation event and venue management platform transforming how the University of Rwanda manages events and spaces.",
    category: "Product Spotlight",
    readTime: "2 min read",
    date: "47 weeks ago",
    image: "/img/blog/🚀 Empowering innovation together!Binary Hub proudly supporting the HitamoSpace system, a next-.webp",
  },
  {
    title: "Building with purpose: what makes a strong prototype",
    excerpt: "A practical look at the choices that help promising ideas move from a sketch to something people can use.",
    category: "Resources",
    readTime: "4 min read",
    date: "Innovation in practice",
    image: "/img/blog/From 3-4th April, Binary Hub showed up and stood tall at the Global AI Summit on Africa. an even.jpg",
  },
  {
    title: "The people behind the projects changing campus life",
    excerpt: "Meet the students and staff turning everyday observations into useful, ambitious digital solutions.",
    category: "Community",
    readTime: "5 min read",
    date: "The Binary Hub community",
    image: "/img/blog/From 3-4th April, Binary Hub showed up and stood tall at the Global AI Summit on Africa. an even (1).jpg",
  },
  {
    title: "From first conversation to lasting collaboration",
    excerpt: "Why the best innovation partnerships begin by listening carefully and building trust early.",
    category: "Partnerships",
    readTime: "3 min read",
    date: "Working together",
    image: "/img/presentation-img/IMG-20231019-WA0013.jpg",
  },
  {
    title: "Designing digital tools for the context they serve",
    excerpt: "Local insight is more than a constraint. It is the advantage that helps solutions stay relevant after launch.",
    category: "Perspective",
    readTime: "4 min read",
    date: "Designing for impact",
    image: "/img/presentation-img/IMG-20231019-WA0016.jpg",
  },
];

const summitImages = [
  "/img/blog/From 3-4th April, Binary Hub showed up and stood tall at the Global AI Summit on Africa. an even (2).jpg",
  "/img/blog/From 3-4th April, Binary Hub showed up and stood tall at the Global AI Summit on Africa. an even.jpg",
  "/img/blog/From 3-4th April, Binary Hub showed up and stood tall at the Global AI Summit on Africa. an even (1).jpg",
];

type BlogSectionProps = {
  compact?: boolean;
};

const BlogSection = ({ compact = false }: BlogSectionProps) => {
  const { posts } = useBlogPosts(false, true);
  const managedStories: BlogStory[] = posts.map((post) => ({
    title: post.title,
    excerpt: post.excerpt,
    category: post.category,
    readTime: `${post.read_time_minutes} min read`,
    date: post.story_date || undefined,
    image: post.image || "/img/placeholder.svg",
  }));
  const mainManagedStory = managedStories.find((story) => posts.find((post) => post.title === story.title)?.is_main);
  const availableStories = compact
    ? mainManagedStory
      ? [mainManagedStory, ...stories.slice(1)]
      : stories
    : managedStories.length > 0
      ? managedStories
      : stories;
  const visibleStories = compact ? availableStories.slice(0, 5) : availableStories;
  const [featuredStory, ...gridStories] = visibleStories;
  const activeImages = managedStories.length > 0 ? [featuredStory?.image].filter((image): image is string => Boolean(image)) : summitImages;
  const [activeImage, setActiveImage] = useState(0);

  useEffect(() => {
    setActiveImage(0);
    if (activeImages.length <= 1) return;
    const interval = window.setInterval(() => {
      setActiveImage((current) => (current + 1) % activeImages.length);
    }, 4500);

    return () => window.clearInterval(interval);
  }, [activeImages.length, featuredStory?.image]);

  const showPreviousImage = () => {
    setActiveImage((current) => (current - 1 + activeImages.length) % activeImages.length);
  };

  const showNextImage = () => {
    setActiveImage((current) => (current + 1) % activeImages.length);
  };

  return (
    <section className={`relative overflow-hidden bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 px-6 md:px-12 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 ${compact ? "py-20" : "min-h-screen pb-24 pt-36"}`}>
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
            <h2 className="font-display text-4xl leading-[0.95] text-[#15394d] md:text-6xl">Latest news</h2>
            <p className="mt-4 max-w-md text-sm leading-relaxed text-[#416175] md:text-base">
              Stories, insights, and ideas from the people building Rwanda's next digital chapter.
            </p>
          </div>
          <Link
            to="/blog"
            className="inline-flex w-fit items-center gap-2 rounded-full border border-[#2d5d75]/30 bg-white/40 px-4 py-2 text-xs font-semibold text-[#1d526d] backdrop-blur-sm transition hover:bg-white/75"
          >
            Explore all stories
            <ArrowUpRight className="h-4 w-4" />
          </Link>
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
              <h3 className="max-w-lg font-display text-2xl leading-tight text-white md:text-4xl">{featuredStory.title}</h3>
              <p className="mt-3 max-w-lg text-sm leading-relaxed text-white/75">{featuredStory.excerpt}</p>
              <Link to="/blog" className="mt-6 inline-flex w-fit items-center gap-2 text-sm font-semibold text-white">
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
                      key={image}
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
          ))}
        </div>
      </div>
    </section>
  );
};

export default BlogSection;