import { ArrowLeft, ArrowRight, ArrowUpRight, Clock } from "lucide-react";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useBlogPosts } from "@/hooks/useBlogPosts";
import Footer from "@/components/Footer";
import NotFound from "./NotFound";

const BlogDetail = () => {
  const { slug } = useParams();
  const { posts, loading } = useBlogPosts(false);
  const post = posts.find((item) => item.slug === slug);
  const [activeImage, setActiveImage] = useState(0);
  const images = post?.images?.length ? post.images : post?.image ? [post.image] : ["/img/placeholder.svg"];

  useEffect(() => {
    setActiveImage(0);
  }, [slug]);

  useEffect(() => {
    if (images.length < 2) return;
    const interval = window.setInterval(() => {
      setActiveImage((current) => (current + 1) % images.length);
    }, 5000);
    return () => window.clearInterval(interval);
  }, [images.length, slug]);

  if (loading) {
    return <main className="min-h-screen bg-[#f7fafb] px-6 pb-24 pt-40 md:px-12"><div className="mx-auto max-w-7xl animate-pulse space-y-6"><div className="h-4 w-32 bg-slate-200" /><div className="h-16 max-w-3xl bg-slate-200" /><div className="aspect-[16/8] bg-slate-200" /></div></main>;
  }

  if (!post) return <NotFound />;

  const paragraphs = post.content.split(/\n{2,}/).map((paragraph) => paragraph.trim()).filter(Boolean);
  const relatedPosts = posts.filter((item) => item.id !== post.id);
  const previousImage = () => setActiveImage((current) => (current - 1 + images.length) % images.length);
  const nextImage = () => setActiveImage((current) => (current + 1) % images.length);

  return (
    <main className="min-h-screen">
      <article className="mx-auto max-w-7xl px-6 pt-32 md:px-12 md:pt-36">
        <Link to="/blog" className="mb-10 inline-flex items-center gap-2 text-sm font-semibold text-[#00628b] transition hover:text-[#173b50]"><ArrowLeft className="h-4 w-4" /> Back to journal</Link>
        <header className="grid gap-10 lg:grid-cols-[1fr_0.9fr] lg:items-end">
          <div className="min-w-0">
            <p className="mb-5 text-xs font-bold uppercase tracking-[0.22em] text-[#e65b2e]">{post.category}</p>
            <h1 className="max-w-full break-words font-display text-3xl font-bold leading-[1.08] md:text-5xl">{post.title}</h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-[#587181]">{post.excerpt}</p>
            <div className="mt-7 flex items-center gap-4 text-sm text-[#587181]"><span>{post.story_date || new Date(post.publish_date || post.created_at).toLocaleDateString()}</span><span className="h-1 w-1 rounded-full bg-[#e65b2e]" /><span className="flex items-center gap-1"><Clock className="h-4 w-4" />{post.read_time_minutes} min read</span></div>
          </div>
          <div className="flex items-end justify-start gap-3 lg:justify-end"><span className="h-px w-16 bg-[#e65b2e]" /><span className="text-xs font-bold uppercase tracking-[0.18em] text-[#587181]">Binary Hub journal</span></div>
        </header>

        <div className="relative mt-12 overflow-hidden bg-[#173b50]">
          <img src={images[activeImage]} alt={post.title} className="aspect-[16/8] w-full object-cover" />
          {images.length > 1 && <><div className="absolute inset-x-0 bottom-0 flex items-center justify-between bg-gradient-to-t from-black/60 to-transparent px-5 pb-5 pt-12"><button type="button" onClick={previousImage} aria-label="Previous image" className="rounded-full border border-white/70 p-2 text-white transition hover:bg-white/20"><ArrowLeft className="h-4 w-4" /></button><div className="flex gap-2">{images.map((image, index) => <button key={`${image}-${index}`} type="button" onClick={() => setActiveImage(index)} aria-label={`Show image ${index + 1}`} className={`h-2 rounded-full transition-all ${index === activeImage ? "w-8 bg-white" : "w-2 bg-white/50"}`} />)}</div><button type="button" onClick={nextImage} aria-label="Next image" className="rounded-full border border-white/70 p-2 text-white transition hover:bg-white/20"><ArrowRight className="h-4 w-4" /></button></div></>}
        </div>

        <div className="mt-14 grid gap-12 lg:grid-cols-[1fr_280px]">
          <div className="max-w-3xl space-y-7 text-lg leading-8 text-[#355464]">{paragraphs.map((paragraph, index) => <p key={index}>{paragraph}</p>)}</div>
          <aside className="border-t border-[#cbdde4] pt-5 lg:border-l lg:border-t-0 lg:pl-7"><p className="text-xs font-bold uppercase tracking-[0.18em] text-[#e65b2e]">In this story</p><p className="mt-4 text-sm leading-6 text-[#587181]">A closer look at the ideas, people, and practical work shaping innovation at Binary Hub.</p><Link to="/contact" className="mt-7 inline-flex items-center gap-2 text-sm font-semibold text-[#00628b]">Start a conversation <ArrowUpRight className="h-4 w-4" /></Link></aside>
        </div>
      </article>

      {relatedPosts.length > 0 && <section className="mx-auto mt-24 max-w-7xl border-t border-[#cbdde4] px-6 pt-10 md:px-12"><p className="text-xs font-bold uppercase tracking-[0.22em] text-[#e65b2e]">Keep reading</p><div className="mt-7 grid gap-5 md:grid-cols-2 lg:grid-cols-4">{relatedPosts.map((related) => <Link key={related.id} to={`/blog/${related.slug}`} className="group block"><article className="grid min-h-[235px] grid-rows-[132px_1fr] overflow-hidden rounded-[3px] bg-[#eef4f7]/90 shadow-sm"><div className="overflow-hidden"><img src={related.images?.[0] || related.image || "/img/placeholder.svg"} alt="" className="h-full w-full object-cover transition duration-500 group-hover:scale-105" /></div><div className="flex flex-col justify-between p-4"><div><div className="mb-2 flex items-center justify-between gap-2 text-[9px] font-bold uppercase tracking-[0.12em] text-[#39718b]"><span>{related.category}</span><span className="flex items-center gap-1 font-medium normal-case tracking-normal text-[#6b8794]"><Clock className="h-3 w-3" />{related.read_time_minutes} min read</span></div><h2 className="font-display text-lg leading-tight text-[#183c50]">{related.title}</h2></div><p className="mt-3 line-clamp-2 text-xs leading-relaxed text-[#587181]">{related.excerpt}</p></div></article></Link>)}</div></section>}
      <Footer />
    </main>
  );
};

export default BlogDetail;
