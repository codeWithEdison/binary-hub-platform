
import React, { useState } from "react";
import {
  Plus, Search, Filter, Edit, Trash2, MoreHorizontal, Eye, Download,
  CalendarPlus, ArrowUpDown, ChevronDown, Calendar, MapPin, Clock, Users
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Link } from "react-router-dom";
import { Badge } from "@/components/ui/badge";

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
    image: "https://images.unsplash.com/photo-1540317580384-e5d43867caa6?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3"
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
    image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3"
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
    image: "https://images.unsplash.com/photo-1475721027785-f74eccf877e2?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3"
  }
];

// Event categories for filtering
const categories = ["All", "Hackathon", "Workshop", "Masterclass", "Networking", "Showcase"];

const EventManagement = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("All");

  // Filter events based on search query and category
  const filteredEvents = events.filter(event => {
    const matchesSearch =
      event.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      event.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      event.location.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesCategory = categoryFilter === "All" || event.category === categoryFilter;

    return matchesSearch && matchesCategory;
  });

  return (
    <div className="p-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
          <div>
            <h1 className="text-2xl font-semibold mb-1">Event Management</h1>
            <p className="text-muted-foreground">
              Manage upcoming and past events
            </p>
          </div>
          <div className="mt-4 md:mt-0 flex items-center gap-3">
            <Button variant="outline">
              <Download className="h-4 w-4 mr-2" />
              Export
            </Button>
            <Button asChild>
              <Link to="/admin/events/new" className="flex items-center gap-2">
                <CalendarPlus className="h-4 w-4" />
                Add Event
              </Link>
            </Button>
          </div>
        </div>

        {/* Filters */}
        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search events..."
              className="pl-9"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="flex items-center gap-2">
                <Filter className="h-4 w-4" />
                Category
                <ChevronDown className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              {categories.map(category => (
                <DropdownMenuItem key={category} onClick={() => setCategoryFilter(category)}>
                  {category}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        {/* Events Table */}
        <div className="border rounded-lg overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[60px]"></TableHead>
                <TableHead>Event</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Date & Time</TableHead>
                <TableHead>Location</TableHead>
                <TableHead>Capacity</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredEvents.map((event) => (
                <TableRow key={event.id}>
                  <TableCell>
                    <div className="w-10 h-10 rounded-lg overflow-hidden">
                      <img
                        src={event.image}
                        alt={event.title}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </TableCell>
                  <TableCell>
                    <div>
                      <div className="font-medium">{event.title}</div>
                      <div className="text-sm text-muted-foreground line-clamp-1">
                        {event.description}
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge
                      variant={
                        event.category === "Hackathon" ? "destructive" :
                          event.category === "Workshop" ? "secondary" :
                            "default"
                      }
                    >
                      {event.category}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="space-y-1">
                      <div className="flex items-center">
                        <Calendar className="h-4 w-4 mr-2 text-muted-foreground" />
                        <span className="text-sm">
                          {new Date(event.date).toLocaleDateString('en-US', {
                            year: 'numeric',
                            month: 'short',
                            day: 'numeric'
                          })}
                        </span>
                      </div>
                      <div className="flex items-center">
                        <Clock className="h-4 w-4 mr-2 text-muted-foreground" />
                        <span className="text-sm">{event.time}</span>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center">
                      <MapPin className="h-4 w-4 mr-2 text-muted-foreground" />
                      <span className="text-sm truncate max-w-[180px]" title={event.location}>
                        {event.location}
                      </span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center">
                      <Users className="h-4 w-4 mr-2 text-muted-foreground" />
                      <span className="text-sm">{event.capacity}</span>
                    </div>
                  </TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem asChild>
                          <Link to={`/events/${event.id}`} className="flex items-center">
                            <Eye className="h-4 w-4 mr-2" />
                            View
                          </Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem asChild>
                          <Link to={`/admin/events/edit/${event.id}`} className="flex items-center">
                            <Edit className="h-4 w-4 mr-2" />
                            Edit
                          </Link>
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem className="text-destructive">
                          <Trash2 className="h-4 w-4 mr-2" />
                          Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
              {filteredEvents.length === 0 && (
                <TableRow>
                  <TableCell colSpan={7} className="text-center py-8">
                    <div className="text-muted-foreground">
                      No events found matching your criteria
                    </div>
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
};

export default EventManagement;
