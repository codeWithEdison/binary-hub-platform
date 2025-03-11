
import React from "react";
import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Calendar, Clock, MapPin, Users, ArrowLeft, Share, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Footer from "@/components/Footer";

// Sample events data (from Events.tsx)
const events = [
  {
    id: "1",
    title: "Annual Innovation Hackathon",
    description: "A 48-hour hackathon focusing on solutions for sustainable agriculture and food security in Rwanda.",
    date: "2023-11-15",
    time: "09:00 AM - 06:00 PM",
    location: "Binary Hub, University of Rwanda - Kigali Campus",
    category: "Hackathon",
    capacity: 100,
    image: "https://images.unsplash.com/photo-1540317580384-e5d43867caa6?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3",
    organizer: "Binary Hub Rwanda",
    fullDescription: "Join us for our Annual Innovation Hackathon, a 48-hour event where teams of innovators work together to develop solutions for sustainable agriculture and food security challenges in Rwanda. Participants will have access to mentors, resources, and a collaborative workspace to bring their ideas to life. This event is open to students, professionals, and anyone interested in using technology to address agricultural challenges. Cash prizes and incubation opportunities will be awarded to the top three teams.",
    agenda: [
      {
        day: "Day 1",
        items: [
          { time: "09:00 AM - 10:00 AM", activity: "Registration & Welcome" },
          { time: "10:00 AM - 11:00 AM", activity: "Opening Ceremony" },
          { time: "11:00 AM - 12:00 PM", activity: "Problem Statement Presentations" },
          { time: "12:00 PM - 01:00 PM", activity: "Lunch Break" },
          { time: "01:00 PM - 06:00 PM", activity: "Hacking Begins" }
        ]
      },
      {
        day: "Day 2",
        items: [
          { time: "09:00 AM - 12:00 PM", activity: "Continued Hacking" },
          { time: "12:00 PM - 01:00 PM", activity: "Lunch Break" },
          { time: "01:00 PM - 04:00 PM", activity: "Final Hacking Session" },
          { time: "04:00 PM - 06:00 PM", activity: "Project Presentations" }
        ]
      }
    ],
    speakers: [
      {
        name: "Dr. Marie Umubyeyi",
        role: "Director, Binary Hub",
        image: "/img/deanict.jpg",
        bio: "Dr. Marie is the founding director of Binary Hub Rwanda and has over 15 years of experience in technology innovation."
      },
      {
        name: "Jean Paul Habineza",
        role: "Program Coordinator",
        image: "/img/cordinator.jpg",
        bio: "Jean Paul manages innovation programs and mentorship initiatives at Binary Hub."
      }
    ],
    sponsors: [
      { name: "Rwanda ICT Chamber", logo: "/img/ICT CHAMBER.png" },
      { name: "Rwanda Development Board", logo: "/img/RDB_logo.png" },
      { name: "RISA", logo: "/img/RISALogo.jpg" }
    ],
    gallery: [
      "https://images.unsplash.com/photo-1540317580384-e5d43867caa6?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3",
      "https://images.unsplash.com/photo-1531482615713-2afd69097998?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3",
      "https://images.unsplash.com/photo-1505373877841-8d25f7d46678?q=80&w=2012&auto=format&fit=crop&ixlib=rb-4.0.3"
    ]
  },
  {
    id: "2",
    title: "AI in Healthcare Workshop",
    description: "Learn how artificial intelligence is transforming healthcare delivery in Africa.",
    date: "2023-11-22",
    time: "02:00 PM - 05:00 PM",
    location: "Virtual Event (Zoom)",
    category: "Workshop",
    capacity: 50,
    image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3",
    organizer: "Binary Hub Rwanda in partnership with Ministry of Health",
    fullDescription: "This workshop explores the current and future applications of artificial intelligence in healthcare delivery across Africa. With a focus on Rwanda's healthcare system, experts will discuss how AI technologies can address challenges in diagnosis, treatment, and healthcare access in resource-constrained settings. The session will include presentations, case studies, and a Q&A session with industry leaders and healthcare professionals.",
    agenda: [
      {
        day: "Session",
        items: [
          { time: "02:00 PM - 02:15 PM", activity: "Welcome and Introduction" },
          { time: "02:15 PM - 03:00 PM", activity: "Keynote: AI Applications in African Healthcare" },
          { time: "03:00 PM - 03:45 PM", activity: "Case Studies: AI Implementation in Rwanda" },
          { time: "03:45 PM - 04:00 PM", activity: "Break" },
          { time: "04:00 PM - 04:45 PM", activity: "Panel Discussion" },
          { time: "04:45 PM - 05:00 PM", activity: "Q&A and Closing Remarks" }
        ]
      }
    ],
    speakers: [
      {
        name: "Dr. Patrick Ndayizigamiye",
        role: "AI Healthcare Researcher",
        image: "/img/userr.png",
        bio: "Dr. Patrick specializes in AI applications for healthcare in resource-limited settings."
      },
      {
        name: "Claire Muhoza",
        role: "Healthcare Policy Advisor",
        image: "/img/userr.png",
        bio: "Claire works at the intersection of health policy and technology adoption."
      }
    ],
    sponsors: [
      { name: "Ministry of Health", logo: "/img/mineduc.jpg" },
      { name: "RISA", logo: "/img/RISALogo.jpg" }
    ],
    gallery: [
      "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3",
      "https://images.unsplash.com/photo-1587691592099-24045742c181?q=80&w=2073&auto=format&fit=crop&ixlib=rb-4.0.3"
    ]
  },
  {
    id: "3",
    title: "Startup Funding Masterclass",
    description: "Comprehensive guide to securing funding for your tech startup in East Africa.",
    date: "2023-12-05",
    time: "10:00 AM - 04:00 PM",
    location: "Norrsken House Kigali",
    category: "Masterclass",
    capacity: 30,
    image: "https://images.unsplash.com/photo-1556761175-4b46a572b786?q=80&w=2074&auto=format&fit=crop&ixlib=rb-4.0.3"
  },
  {
    id: "4",
    title: "Women in Tech Networking Event",
    description: "Networking event for women in technology across Rwanda.",
    date: "2023-12-12",
    time: "05:30 PM - 08:30 PM",
    location: "Kigali Innovation City",
    category: "Networking",
    capacity: 75,
    image: "https://images.unsplash.com/photo-1483389127117-b6a2102724ae?q=80&w=2074&auto=format&fit=crop&ixlib=rb-4.0.3"
  },
  {
    id: "5",
    title: "Blockchain for Social Impact",
    description: "Exploring how blockchain technology can address social challenges in Africa.",
    date: "2023-12-18",
    time: "01:00 PM - 04:00 PM",
    location: "Binary Hub, University of Rwanda - Kigali Campus",
    category: "Workshop",
    capacity: 40,
    image: "https://images.unsplash.com/photo-1639322537228-f710d846310a?q=80&w=2032&auto=format&fit=crop&ixlib=rb-4.0.3"
  },
  {
    id: "6",
    title: "End of Year Innovation Showcase",
    description: "Celebrating the achievements of Binary Hub innovators in 2023.",
    date: "2023-12-22",
    time: "03:00 PM - 08:00 PM",
    location: "Kigali Convention Center",
    category: "Showcase",
    capacity: 200,
    image: "https://images.unsplash.com/photo-1475721027785-f74eccf877e2?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3",
    organizer: "Binary Hub Rwanda",
    fullDescription: "Join us for our End of Year Innovation Showcase, where Binary Hub innovators will present their groundbreaking projects developed throughout 2023. This event celebrates the creativity, persistence, and technical excellence of our community members who have worked tirelessly to create solutions addressing local and regional challenges. The showcase will feature live demonstrations, interactive exhibits, and networking opportunities with innovators, industry leaders, and potential investors.",
    agenda: [
      {
        day: "Event Schedule",
        items: [
          { time: "03:00 PM - 03:30 PM", activity: "Registration & Welcome Reception" },
          { time: "03:30 PM - 04:00 PM", activity: "Opening Ceremony" },
          { time: "04:00 PM - 06:00 PM", activity: "Project Exhibitions & Demonstrations" },
          { time: "06:00 PM - 07:00 PM", activity: "Innovator Awards Ceremony" },
          { time: "07:00 PM - 08:00 PM", activity: "Networking Reception" }
        ]
      }
    ],
    speakers: [
      {
        name: "Prof. Emmanuel Masabo",
        role: "Director of Research, University of Rwanda",
        image: "/img/emmanuel.jpg",
        bio: "Prof. Emmanuel leads research initiatives at the University of Rwanda and has been instrumental in establishing the Binary Hub."
      }
    ],
    sponsors: [
      { name: "Ministry of ICT", logo: "/img/minict.png" },
      { name: "Rwanda ICT Chamber", logo: "/img/ICT CHAMBER.png" },
      { name: "NCST", logo: "/img/NCST.png" }
    ],
    gallery: [
      "https://images.unsplash.com/photo-1475721027785-f74eccf877e2?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3",
      "https://images.unsplash.com/photo-1591115765373-5207764f72e4?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3",
      "https://images.unsplash.com/photo-1560523159-4a9692d222f9?q=80&w=2036&auto=format&fit=crop&ixlib=rb-4.0.3",
      "https://images.unsplash.com/photo-1540317580384-e5d43867caa6?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3"
    ]
  }
];

const EventDetail = () => {
  const { eventId } = useParams<{ eventId: string }>();
  const event = events.find(e => e.id === eventId);

  if (!event) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-semibold mb-4">Event Not Found</h2>
          <p className="text-muted-foreground mb-6">The event you're looking for doesn't exist or has been removed.</p>
          <Button asChild>
            <Link to="/events">Back to Events</Link>
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-[50vh] flex items-center">
        <div className="absolute inset-0 bg-black/50 z-10"></div>
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${event.image})` }}
        ></div>
        <div className="container relative z-20 px-6 md:px-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Link to="/events" className="inline-flex items-center gap-2 text-white mb-4 hover:text-primary transition-colors">
              <ArrowLeft size={16} />
              <span>Back to Events</span>
            </Link>
            
            <div className="flex flex-wrap items-center gap-2 mb-4">
              <Badge variant="secondary" className="bg-white/10 hover:bg-white/20">
                {event.category}
              </Badge>
              <Badge variant="outline" className="text-white border-white/20">
                {new Date(event.date).toLocaleDateString('en-US', { 
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })}
              </Badge>
            </div>
            
            <h1 className="text-3xl md:text-5xl font-bold text-white mb-6">
              {event.title}
            </h1>
          </motion.div>
        </div>
      </section>

      {/* Event Details */}
      <section className="py-12 px-6 md:px-12">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2">
              <div className="prose prose-lg dark:prose-invert max-w-none mb-8">
                <h2 className="text-2xl font-semibold mb-4">About This Event</h2>
                <p>{event.fullDescription || event.description}</p>
              </div>

              {/* Agenda */}
              {event.agenda && (
                <div className="mb-12">
                  <h2 className="text-2xl font-semibold mb-6">Event Agenda</h2>
                  <div className="space-y-6">
                    {event.agenda.map((day, i) => (
                      <div key={i} className="glass p-6 rounded-xl">
                        <h3 className="text-xl font-medium mb-4">{day.day}</h3>
                        <div className="space-y-3">
                          {day.items.map((item, j) => (
                            <div key={j} className="grid grid-cols-1 md:grid-cols-5 gap-2 md:gap-4 py-2 border-b border-border last:border-0">
                              <div className="md:col-span-1 text-sm font-medium">
                                {item.time}
                              </div>
                              <div className="md:col-span-4">
                                {item.activity}
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Speakers */}
              {event.speakers && event.speakers.length > 0 && (
                <div className="mb-12">
                  <h2 className="text-2xl font-semibold mb-6">Speakers</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {event.speakers.map((speaker, i) => (
                      <Card key={i} className="overflow-hidden">
                        <div className="grid grid-cols-12 h-full">
                          <div className="col-span-4 h-full">
                            <img 
                              src={speaker.image} 
                              alt={speaker.name}
                              className="w-full h-full object-cover"
                            />
                          </div>
                          <CardContent className="col-span-8 p-4 flex flex-col">
                            <h3 className="text-lg font-semibold">{speaker.name}</h3>
                            <p className="text-sm text-muted-foreground mb-2">{speaker.role}</p>
                            <p className="text-sm mt-2">{speaker.bio}</p>
                          </CardContent>
                        </div>
                      </Card>
                    ))}
                  </div>
                </div>
              )}

              {/* Gallery */}
              {event.gallery && event.gallery.length > 0 && (
                <div className="mb-12">
                  <h2 className="text-2xl font-semibold mb-6">Event Gallery</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {event.gallery.map((image, i) => (
                      <div key={i} className="aspect-video rounded-lg overflow-hidden">
                        <img 
                          src={image} 
                          alt={`Event gallery ${i+1}`}
                          className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                        />
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Sponsors */}
              {event.sponsors && event.sponsors.length > 0 && (
                <div className="mb-12">
                  <h2 className="text-2xl font-semibold mb-6">Sponsors</h2>
                  <div className="flex flex-wrap items-center gap-8 justify-center">
                    {event.sponsors.map((sponsor, i) => (
                      <div key={i} className="w-32 h-32 p-4 glass rounded-xl flex items-center justify-center">
                        <img 
                          src={sponsor.logo} 
                          alt={sponsor.name}
                          className="max-w-full max-h-full object-contain"
                        />
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1">
              <div className="sticky top-20">
                <Card className="mb-6">
                  <CardContent className="p-6">
                    <h3 className="text-xl font-semibold mb-4">Event Details</h3>
                    <div className="space-y-4">
                      <div className="flex items-start gap-3">
                        <Calendar className="h-5 w-5 text-primary mt-0.5" />
                        <div>
                          <p className="font-medium">Date</p>
                          <p className="text-muted-foreground">
                            {new Date(event.date).toLocaleDateString('en-US', { 
                              weekday: 'long',
                              year: 'numeric',
                              month: 'long',
                              day: 'numeric'
                            })}
                          </p>
                        </div>
                      </div>
                      
                      <div className="flex items-start gap-3">
                        <Clock className="h-5 w-5 text-primary mt-0.5" />
                        <div>
                          <p className="font-medium">Time</p>
                          <p className="text-muted-foreground">{event.time}</p>
                        </div>
                      </div>
                      
                      <div className="flex items-start gap-3">
                        <MapPin className="h-5 w-5 text-primary mt-0.5" />
                        <div>
                          <p className="font-medium">Location</p>
                          <p className="text-muted-foreground">{event.location}</p>
                        </div>
                      </div>
                      
                      <div className="flex items-start gap-3">
                        <Users className="h-5 w-5 text-primary mt-0.5" />
                        <div>
                          <p className="font-medium">Capacity</p>
                          <p className="text-muted-foreground">{event.capacity} attendees</p>
                        </div>
                      </div>

                      {event.organizer && (
                        <div className="flex items-start gap-3">
                          <ExternalLink className="h-5 w-5 text-primary mt-0.5" />
                          <div>
                            <p className="font-medium">Organizer</p>
                            <p className="text-muted-foreground">{event.organizer}</p>
                          </div>
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
                
                <div className="flex flex-col gap-4">
                  <Button size="lg" className="w-full">
                    Register for Event
                  </Button>
                  
                  <Button variant="outline" size="lg" className="w-full flex items-center justify-center gap-2">
                    <Share className="h-4 w-4" />
                    Share Event
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default EventDetail;
