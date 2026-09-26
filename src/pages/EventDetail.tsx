import { Link, useParams } from "react-router-dom";
import {
  ArrowLeft,
  Calendar,
  Clock,
  MapPin,
  Users,
} from "lucide-react";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { useEvents } from "@/hooks/useEvents";

const EventDetail = () => {
  const { eventId } = useParams();
  const { events, loading } = useEvents();
  const event = events.find((item) => item.id === eventId);

  if (loading) {
    return (
      <div className="min-h-screen bg-[hsl(210_25%_96%)] pt-28">
        <div className="mx-auto max-w-5xl space-y-4 px-4">
          <Skeleton className="h-8 w-40" />
          <Skeleton className="aspect-[16/8] w-full" />
          <Skeleton className="h-10 w-2/3" />
        </div>
      </div>
    );
  }

  if (!event) {
    return (
      <div className="flex min-h-screen flex-col bg-[hsl(210_25%_96%)] pt-28">
        <main className="mx-auto max-w-3xl flex-1 px-4 text-center">
          <h1 className="font-display text-2xl font-bold text-slate-950">Event not found</h1>
          <p className="mt-2 text-slate-600">This event may be unpublished or removed.</p>
          <Button asChild className="mt-6 h-10 rounded-[7px] bg-[#00628b]">
            <Link to="/events">Back to events</Link>
          </Button>
        </main>
        <Footer />
      </div>
    );
  }

  const dateLabel = new Date(event.date).toLocaleDateString(undefined, {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <div className="flex min-h-screen flex-col bg-[hsl(210_25%_96%)] pt-24 md:pt-28">
      <main className="mx-auto w-full max-w-5xl flex-1 px-4 pb-16 sm:px-6 lg:px-8">
        <Link
          to="/events"
          className="mb-6 inline-flex items-center gap-1.5 text-sm font-medium text-[#00628b] hover:text-[#004f70]"
        >
          <ArrowLeft className="h-4 w-4" />
          All events
        </Link>

        {event.image ? (
          <img
            src={event.image}
            alt={event.title}
            className="mb-6 aspect-[16/8] w-full rounded-lg object-cover shadow-sm"
          />
        ) : null}

        <div className="rounded-lg border border-[#00628b]/10 bg-white p-5 shadow-sm sm:p-8">
          {event.category ? (
            <p className="text-[11px] font-bold uppercase tracking-[0.1em] text-[#00628b]">
              {event.category}
            </p>
          ) : null}
          <h1 className="mt-2 font-display text-3xl font-bold tracking-tight text-slate-950 sm:text-4xl">
            {event.title}
          </h1>
          <p className="mt-3 text-base leading-relaxed text-slate-600">{event.description}</p>

          <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            <div className="flex items-center gap-2 rounded-[7px] border border-[#00628b]/10 bg-[hsl(210_25%_96%)] px-3 py-2.5 text-sm">
              <Calendar className="h-4 w-4 text-[#00628b]" />
              {dateLabel}
            </div>
            {event.time ? (
              <div className="flex items-center gap-2 rounded-[7px] border border-[#00628b]/10 bg-[hsl(210_25%_96%)] px-3 py-2.5 text-sm">
                <Clock className="h-4 w-4 text-[#00628b]" />
                {event.time}
              </div>
            ) : null}
            {event.location ? (
              <div className="flex items-center gap-2 rounded-[7px] border border-[#00628b]/10 bg-[hsl(210_25%_96%)] px-3 py-2.5 text-sm">
                <MapPin className="h-4 w-4 text-[#00628b]" />
                {event.location}
              </div>
            ) : null}
            {event.capacity != null ? (
              <div className="flex items-center gap-2 rounded-[7px] border border-[#00628b]/10 bg-[hsl(210_25%_96%)] px-3 py-2.5 text-sm">
                <Users className="h-4 w-4 text-[#00628b]" />
                Capacity {event.capacity}
              </div>
            ) : null}
          </div>

          {event.content ? (
            <div className="mt-8 space-y-4 text-base leading-relaxed text-slate-700 whitespace-pre-wrap">
              {event.content}
            </div>
          ) : null}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default EventDetail;
