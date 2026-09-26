import { Link, useParams } from "react-router-dom";
import { ArrowLeft, Calendar, Tag } from "lucide-react";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { useAnnouncements } from "@/hooks/useAnnouncements";

const importanceStyles: Record<string, string> = {
  high: "bg-red-100 text-red-800",
  medium: "bg-amber-100 text-amber-800",
  low: "bg-slate-100 text-slate-700",
};

const AnnouncementDetail = () => {
  const { announcementId } = useParams();
  const { announcements, loading } = useAnnouncements();
  const announcement = announcements.find((item) => item.id === announcementId);

  if (loading) {
    return (
      <div className="min-h-screen bg-[hsl(210_25%_96%)] pt-28">
        <div className="mx-auto max-w-3xl space-y-4 px-4">
          <Skeleton className="h-8 w-48" />
          <Skeleton className="h-12 w-full" />
          <Skeleton className="h-40 w-full" />
        </div>
      </div>
    );
  }

  if (!announcement) {
    return (
      <div className="flex min-h-screen flex-col bg-[hsl(210_25%_96%)] pt-28">
        <main className="mx-auto max-w-3xl flex-1 px-4 text-center">
          <h1 className="font-display text-2xl font-bold">Announcement not found</h1>
          <Button asChild className="mt-6 h-10 rounded-[7px] bg-[#00628b]">
            <Link to="/announcements">Back to announcements</Link>
          </Button>
        </main>
        <Footer />
      </div>
    );
  }

  const dateLabel = announcement.publish_date
    ? new Date(announcement.publish_date).toLocaleDateString(undefined, {
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    : null;

  return (
    <div className="flex min-h-screen flex-col bg-[hsl(210_25%_96%)] pt-24 md:pt-28">
      <main className="mx-auto w-full max-w-3xl flex-1 px-4 pb-16 sm:px-6 lg:px-8">
        <Link
          to="/announcements"
          className="mb-6 inline-flex items-center gap-1.5 text-sm font-medium text-[#00628b] hover:text-[#004f70]"
        >
          <ArrowLeft className="h-4 w-4" />
          All announcements
        </Link>

        <article className="rounded-lg border border-[#00628b]/10 bg-white p-5 shadow-sm sm:p-8">
          <div className="flex flex-wrap items-center gap-2">
            {announcement.category ? (
              <Badge variant="outline" className="rounded-[7px] border-[#00628b]/20 text-[#00628b]">
                <Tag className="mr-1 h-3 w-3" />
                {announcement.category}
              </Badge>
            ) : null}
            {announcement.importance ? (
              <Badge
                className={`rounded-[7px] ${
                  importanceStyles[announcement.importance] || importanceStyles.medium
                }`}
              >
                {announcement.importance}
              </Badge>
            ) : null}
          </div>

          <h1 className="mt-4 font-display text-3xl font-bold tracking-tight text-slate-950">
            {announcement.title}
          </h1>

          {dateLabel ? (
            <p className="mt-3 flex items-center gap-2 text-sm text-slate-500">
              <Calendar className="h-4 w-4" />
              {dateLabel}
            </p>
          ) : null}

          {announcement.image ? (
            <img
              src={announcement.image}
              alt=""
              className="mt-6 aspect-[16/9] w-full rounded-lg object-cover"
            />
          ) : null}

          {announcement.excerpt ? (
            <p className="mt-6 text-lg leading-relaxed text-slate-600">{announcement.excerpt}</p>
          ) : null}

          <div className="mt-6 whitespace-pre-wrap text-base leading-relaxed text-slate-700">
            {announcement.content}
          </div>
        </article>
      </main>
      <Footer />
    </div>
  );
};

export default AnnouncementDetail;
