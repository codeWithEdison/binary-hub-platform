import { ArrowLeft, ArrowRight, ArrowUpRight, Clock } from "lucide-react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { useBlogPosts } from "@/hooks/useBlogPosts";
import { cn } from "@/lib/utils";

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
  const mainManagedStory = managedStories.find((story) =>
    posts.find((post) => post.title === story.title)?.is_main
  );
  const availableStories = compact
    ? mainManagedStory
      ? [mainManagedStory, ...managedStories.filter((story) => story.title !== mainManagedStory.title)]
      : managedStories
    : managedStories;
  const visibleStories = compact ? availableStories.slice(0, 5) : availableStories;
  const featuredStory = visibleStories[0];
  const gridStories = visibleStories.slice(1);
  const activeImages = featuredStory?.images.length
    ? featuredStory.images
    : [featuredStory?.image].filter((image): image is string => Boolean(image));
  const [activeImage, setActiveImage] = useState(0);

  useEffect(() => {
    if (!featuredStory) return;
    setActiveImage(0);
    if (activeImages.length <= 1) return;
    const interval = window.setInterval(() => {
      setActiveImage((current) => (current + 1) % activeImages.length);
    }, 4500);

    return () => window.clearInterval(interval);
  }, [activeImages.length, featuredStory?.image, featuredStory]);

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
    <section
      id="journal"
      className={cn("bh-journal-section", !compact && "bh-journal-section-page")}
    >
      <div className="mx-auto w-full max-w-[1200px] px-5 md:px-8 lg:px-12">
        <motion.div
          className="bh-journal-heading"
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55 }}
        >
          <h2 className="bh-journal-title">
            <span className="bh-journal-brand">The Binary Hub </span>
            <span className="bh-journal-accent">journal</span>
          </h2>
          <p className="bh-journal-subtitle">
            Stories, updates, and moments from innovators building Rwanda&apos;s digital future.
          </p>
        </motion.div>

        <div className="bh-journal-layout">
          <motion.article
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="bh-journal-featured"
          >
            <div className="bh-journal-featured-media">
              <motion.img
                key={activeImage}
                src={activeImages[activeImage] || featuredStory.image}
                alt={featuredStory.title}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.55 }}
              />
              <div className="bh-journal-featured-shade" />

              {activeImages.length > 1 && (
                <div className="bh-journal-featured-controls">
                  <button type="button" onClick={showPreviousImage} aria-label="Previous image">
                    <ArrowLeft className="h-3.5 w-3.5" />
                  </button>
                  <div className="bh-journal-dots" aria-label={`Image ${activeImage + 1} of ${activeImages.length}`}>
                    {activeImages.map((image, index) => (
                      <button
                        key={`${image}-${index}`}
                        type="button"
                        onClick={() => setActiveImage(index)}
                        aria-label={`Show image ${index + 1}`}
                        className={cn(index === activeImage && "is-active")}
                      />
                    ))}
                  </div>
                  <button type="button" onClick={showNextImage} aria-label="Next image">
                    <ArrowRight className="h-3.5 w-3.5" />
                  </button>
                </div>
              )}
            </div>

            <div className="bh-journal-featured-body">
              <p className="bh-journal-meta">
                <strong>{featuredStory.category}</strong>
                {featuredStory.date && (
                  <>
                    <span aria-hidden="true"> · </span>
                    {featuredStory.date}
                  </>
                )}
                <span aria-hidden="true"> · </span>
                <span className="inline-flex items-center gap-1">
                  <Clock className="h-3 w-3" />
                  {featuredStory.readTime}
                </span>
              </p>
              <Link to={`/blog/${featuredStory.slug}`}>
                <h3>{featuredStory.title}</h3>
              </Link>
              <p className="bh-journal-excerpt">{featuredStory.excerpt}</p>
              <Link to={`/blog/${featuredStory.slug}`} className="bh-journal-read">
                Read story <ArrowUpRight size={14} aria-hidden="true" />
              </Link>
            </div>
          </motion.article>

          {gridStories.length > 0 && (
            <div className="bh-journal-grid">
              {gridStories.map((story, index) => (
                <motion.div
                  key={story.slug}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.45, delay: Math.min(index * 0.06, 0.3) }}
                >
                  <Link to={`/blog/${story.slug}`} className="bh-journal-card">
                    <div className="bh-journal-card-thumb">
                      <img src={story.image} alt="" loading="lazy" />
                    </div>
                    <div className="bh-journal-card-body">
                      <p className="bh-journal-meta">
                        <strong>{story.category}</strong>
                        <span aria-hidden="true"> · </span>
                        <span className="inline-flex items-center gap-1">
                          <Clock className="h-3 w-3" />
                          {story.readTime}
                        </span>
                      </p>
                      <h3>{story.title}</h3>
                      <p className="bh-journal-card-copy">{story.excerpt}</p>
                      <span className="bh-journal-read">
                        Read story <ArrowUpRight size={13} aria-hidden="true" />
                      </span>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          )}
        </div>

        {compact && (
          <div className="mt-12 text-center">
            <Link
              to="/blog"
              className="inline-flex items-center gap-2 text-sm font-semibold text-[#00628b] transition hover:text-[#004f70]"
            >
              View all stories
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        )}
      </div>
    </section>
  );
};

export default BlogSection;
