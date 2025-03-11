
import React, { useState } from "react";
import { 
  Plus, Search, Filter, Edit, Trash2, MoreHorizontal, Eye, Download, 
  Bell, ArrowUpDown, ChevronDown, Calendar, User
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

// Sample announcements data (from AnnouncementsPage.tsx)
const announcements = [
  {
    id: "1",
    title: "Applications Open for Innovation Hub Membership",
    content: "We are excited to announce that applications for the Binary Hub membership are now open. Join our vibrant community of innovators and access resources, mentorship, and networking opportunities.",
    date: "2023-11-10",
    category: "Membership",
    importance: "high",
    author: {
      name: "Jean Paul Habineza",
      role: "Program Coordinator",
      image: "/img/cordinator.jpg"
    }
  },
  {
    id: "2",
    title: "New Partnership with Rwanda Information Society Authority",
    content: "Binary Hub is proud to announce a new strategic partnership with RISA to promote digital innovation across Rwanda. This partnership will create new opportunities for our members.",
    date: "2023-11-05",
    category: "Partnership",
    importance: "high",
    author: {
      name: "Dr. Marie Umubyeyi",
      role: "Director",
      image: "/img/deanict.jpg"
    }
  },
  {
    id: "3",
    title: "Equipment Donation from XYZ Technologies",
    content: "We've received a generous donation of computer equipment from XYZ Technologies. The equipment includes 20 laptops, 5 3D printers, and various IoT devices that will be available for members to use.",
    date: "2023-10-28",
    category: "Donation",
    importance: "medium",
    author: {
      name: "Eric Ndayishimiye",
      role: "Resource Manager",
      image: "/img/userr.png"
    }
  },
  {
    id: "4",
    title: "Changes to Hub Operating Hours",
    content: "Starting December 1st, Binary Hub will be open on Saturdays from 10 AM to 4 PM to accommodate member requests for weekend access. This is in addition to our regular weekday hours.",
    date: "2023-10-20",
    category: "Operations",
    importance: "medium",
    author: {
      name: "Claire Uwase",
      role: "Administrative Officer",
      image: "/img/userr.png"
    }
  },
  {
    id: "5",
    title: "End of Year Innovation Showcase - Call for Projects",
    content: "We are now accepting submissions for the End of Year Innovation Showcase. This is your opportunity to present your project to industry leaders, potential investors, and the wider community.",
    date: "2023-10-15",
    category: "Event",
    importance: "high",
    author: {
      name: "Jean Paul Habineza",
      role: "Program Coordinator",
      image: "/img/cordinator.jpg"
    }
  },
  {
    id: "6",
    title: "New Resources Added to Digital Library",
    content: "We've added over a hundred new e-books, research papers, and tutorials to our digital library, covering topics from machine learning to product design. Access these resources through your member portal.",
    date: "2023-10-10",
    category: "Resources",
    importance: "low",
    author: {
      name: "Patrick Mutabazi",
      role: "Knowledge Manager",
      image: "/img/userr.png"
    }
  }
];

// Categories for filtering
const categories = ["All", "Membership", "Partnership", "Donation", "Operations", "Event", "Resources"];

const AnnouncementManagement = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("All");
  
  // Filter announcements based on search query and category
  const filteredAnnouncements = announcements.filter(announcement => {
    const matchesSearch = 
      announcement.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
      announcement.content.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesCategory = categoryFilter === "All" || announcement.category === categoryFilter;
    
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="p-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
          <div>
            <h1 className="text-2xl font-semibold mb-1">Announcement Management</h1>
            <p className="text-muted-foreground">
              Manage public announcements and notices
            </p>
          </div>
          <div className="mt-4 md:mt-0 flex items-center gap-3">
            <Button variant="outline">
              <Download className="h-4 w-4 mr-2" />
              Export
            </Button>
            <Button asChild>
              <Link to="/admin/announcements/new" className="flex items-center gap-2">
                <Bell className="h-4 w-4" />
                New Announcement
              </Link>
            </Button>
          </div>
        </div>
        
        {/* Filters */}
        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input 
              placeholder="Search announcements..." 
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
        
        {/* Announcements Table */}
        <div className="border rounded-lg overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Title</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Importance</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Author</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredAnnouncements.map((announcement) => (
                <TableRow key={announcement.id}>
                  <TableCell>
                    <div>
                      <div className="font-medium">{announcement.title}</div>
                      <div className="text-sm text-muted-foreground line-clamp-1">
                        {announcement.content}
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline">{announcement.category}</Badge>
                  </TableCell>
                  <TableCell>
                    <Badge 
                      variant={
                        announcement.importance === "high" ? "destructive" : 
                        announcement.importance === "medium" ? "secondary" : 
                        "outline"
                      }
                    >
                      {announcement.importance}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center">
                      <Calendar className="h-4 w-4 mr-2 text-muted-foreground" />
                      <span className="text-sm">
                        {new Date(announcement.date).toLocaleDateString('en-US', { 
                          year: 'numeric',
                          month: 'short',
                          day: 'numeric'
                        })}
                      </span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-full overflow-hidden">
                        <img 
                          src={announcement.author.image} 
                          alt={announcement.author.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div>
                        <div className="text-sm font-medium">{announcement.author.name}</div>
                        <div className="text-xs text-muted-foreground">{announcement.author.role}</div>
                      </div>
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
                          <Link to={`/admin/announcements/${announcement.id}`} className="flex items-center">
                            <Eye className="h-4 w-4 mr-2" />
                            View
                          </Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem asChild>
                          <Link to={`/admin/announcements/edit/${announcement.id}`} className="flex items-center">
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
              {filteredAnnouncements.length === 0 && (
                <TableRow>
                  <TableCell colSpan={6} className="text-center py-8">
                    <div className="text-muted-foreground">
                      No announcements found matching your criteria
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

export default AnnouncementManagement;
