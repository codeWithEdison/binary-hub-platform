
import React from "react";
import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Calendar, ArrowLeft, Bell, User, Share, Tag } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Footer from "@/components/Footer";

// Sample announcements data (from AnnouncementsPage.tsx)
const announcements = [
  {
    id: "1",
    title: "Applications Open for Innovation Hub Membership",
    content: "We are excited to announce that applications for the tekinova Hub membership are now open. Join our vibrant community of innovators and access resources, mentorship, and networking opportunities.",
    date: "2023-11-10",
    category: "Membership",
    importance: "high",
    author: {
      name: "Jean Paul Habineza",
      role: "Program Coordinator",
      image: "/img/cordinator.jpg"
    },
    fullContent: `
      <h2>tekinova Hub Rwanda Opens Applications for New Members</h2>
      
      <p>We are excited to announce that applications for the tekinova Hub membership are now open. As Rwanda's premier innovation hub at the University of Rwanda, we are looking for passionate innovators, entrepreneurs, and problem-solvers to join our community.</p>
      
      <p>tekinova Hub membership provides access to our state-of-the-art facilities, including:</p>
      <ul>
        <li>Coworking spaces</li>
        <li>Prototyping lab</li>
        <li>Digital fabrication equipment</li>
        <li>Meeting rooms</li>
        <li>High-speed internet</li>
      </ul>
      
      <p>Beyond physical resources, members receive:</p>
      <ul>
        <li>Mentorship from industry experts</li>
        <li>Networking opportunities with fellow innovators</li>
        <li>Access to funding opportunities</li>
        <li>Skill development workshops</li>
        <li>Visibility for their projects and startups</li>
      </ul>
      
      <h3>Application Process</h3>
      <p>The application process consists of:</p>
      <ol>
        <li>Online application submission</li>
        <li>Initial screening</li>
        <li>Interview with the selection committee</li>
        <li>Final selection and onboarding</li>
      </ol>
      
      <p>We are looking for individuals and teams working on innovative solutions that address local and regional challenges across various sectors, including but not limited to agriculture, healthcare, education, finance, and environmental sustainability.</p>
      
      <h3>Important Dates</h3>
      <p>Application Deadline: December 15, 2023<br>
      Interview Period: January 5-15, 2024<br>
      Final Selection: January 20, 2024<br>
      Onboarding: February 1, 2024</p>
      
      <p>For any questions regarding the application process, please contact us at <a href="mailto:membership@tekinovahub.rw">membership@tekinovahub.rw</a>.</p>
    `,
    attachments: [
      { name: "Membership Guidelines.pdf", size: "1.2 MB", type: "pdf" },
      { name: "Application Form Template.docx", size: "320 KB", type: "docx" }
    ],
    relatedLinks: [
      { title: "Previous Innovator Projects", url: "/innovations" },
      { title: "FAQs", url: "/about#faqs" }
    ]
  },
  {
    id: "2",
    title: "New Partnership with Rwanda Information Society Authority",
    content: "tekinova Hub is proud to announce a new strategic partnership with RISA to promote digital innovation across Rwanda. This partnership will create new opportunities for our members.",
    date: "2023-11-05",
    category: "Partnership",
    importance: "high",
    author: {
      name: "Dr. Marie Umubyeyi",
      role: "Director",
      image: "/img/deanict.jpg"
    },
    fullContent: `
      <h2>Strategic Partnership with Rwanda Information Society Authority</h2>
      
      <p>tekinova Hub is proud to announce a new strategic partnership with the Rwanda Information Society Authority (RISA) to promote digital innovation across Rwanda.</p>
      
      <p>This collaboration aims to accelerate digital transformation in key sectors of Rwanda's economy by leveraging the innovative capacity of tekinova Hub members and the strategic direction provided by RISA.</p>
      
      <h3>Key Aspects of the Partnership</h3>
      
      <p>The partnership will focus on several key areas:</p>
      
      <ol>
        <li><strong>Innovation Challenges:</strong> RISA will present real-world challenges faced by government agencies that tekinova Hub innovators can work to solve.</li>
        <li><strong>Capacity Building:</strong> Joint training programs to enhance digital skills among students and young professionals.</li>
        <li><strong>Research Collaboration:</strong> Collaborative research projects addressing national priorities in digital transformation.</li>
        <li><strong>Innovation Funding:</strong> Access to funding opportunities for promising digital solutions developed by tekinova Hub members.</li>
        <li><strong>Policy Input:</strong> Creating channels for innovators to provide input on digital policies and strategies.</li>
      </ol>
      
      <p>Through this partnership, tekinova Hub members will gain unparalleled access to government innovation needs, creating pathways for their solutions to achieve national scale and impact.</p>
      
      <h3>Upcoming Opportunities</h3>
      
      <p>As an immediate outcome of this partnership, we are pleased to announce:</p>
      
      <ul>
        <li>A Digital Innovation Challenge to be launched in January 2024</li>
        <li>Five internship positions for tekinova Hub members at RISA</li>
        <li>Technical workshops led by RISA experts at tekinova Hub</li>
      </ul>
      
      <p>We believe this partnership represents a significant step forward in creating a robust innovation ecosystem in Rwanda, connecting government needs with innovative solutions developed by Rwanda's brightest minds.</p>
      
      <p>For more information on how to engage with opportunities arising from this partnership, please contact our partnerships team at <a href="mailto:partnerships@tekinovahub.rw">partnerships@tekinovahub.rw</a>.</p>
    `,
    attachments: [
      { name: "RISA Partnership Press Release.pdf", size: "2.4 MB", type: "pdf" },
      { name: "Innovation Challenge Brief.pdf", size: "1.8 MB", type: "pdf" }
    ],
    relatedLinks: [
      { title: "RISA Official Website", url: "https://risa.gov.rw" },
      { title: "Digital Rwanda 2030", url: "https://minict.gov.rw/digital2030" }
    ]
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
    content: "Starting December 1st, tekinova Hub will be open on Saturdays from 10 AM to 4 PM to accommodate member requests for weekend access. This is in addition to our regular weekday hours.",
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
    },
    fullContent: `
      <h2>Call for Projects: End of Year Innovation Showcase</h2>
      
      <p>tekinova Hub Rwanda is pleased to announce the opening of submissions for our prestigious End of Year Innovation Showcase. This annual event celebrates the achievements of our innovative community and provides a platform for talented innovators to present their work to a wide audience of industry leaders, potential investors, and the wider innovation ecosystem.</p>
      
      <h3>About the Showcase</h3>
      
      <p>The End of Year Innovation Showcase will be held on December 22, 2023, at the Kigali Convention Center. The event will feature:</p>
      
      <ul>
        <li>Exhibition booths for selected projects</li>
        <li>Live demonstrations</li>
        <li>Pitch sessions for top projects</li>
        <li>Networking sessions with industry partners</li>
        <li>Innovation awards ceremony</li>
      </ul>
      
      <h3>Eligibility</h3>
      
      <p>The showcase is open to:</p>
      
      <ul>
        <li>Current tekinova Hub members</li>
        <li>University of Rwanda students and faculty</li>
        <li>Alumni of tekinova Hub programs</li>
        <li>Rwandan startups less than two years old (by special application)</li>
      </ul>
      
      <h3>Selection Criteria</h3>
      
      <p>Projects will be selected based on:</p>
      
      <ol>
        <li>Innovation and originality</li>
        <li>Technical implementation</li>
        <li>Market potential</li>
        <li>Social or economic impact</li>
        <li>Project maturity and readiness for presentation</li>
      </ol>
      
      <h3>How to Apply</h3>
      
      <p>To submit your project for consideration, please complete the online application form available on our website. The application requires:</p>
      
      <ul>
        <li>Project name and brief description (200 words max)</li>
        <li>Team members and their roles</li>
        <li>Development stage of the project</li>
        <li>Photos or videos of the product/prototype</li>
        <li>Technical requirements for your exhibition (if selected)</li>
      </ul>
      
      <h3>Important Dates</h3>
      
      <p>Submission Deadline: November 20, 2023<br>
      Selected Projects Announcement: November 30, 2023<br>
      Exhibitor Briefing: December 10, 2023<br>
      Showcase Event: December 22, 2023</p>
      
      <p>For questions and further information, please contact our events team at <a href="mailto:events@tekinovahub.rw">events@tekinovahub.rw</a>.</p>
      
      <p>We look forward to seeing the innovative solutions you've been working on!</p>
    `,
    attachments: [
      { name: "Showcase Application Guidelines.pdf", size: "980 KB", type: "pdf" },
      { name: "Previous Showcase Highlights.pptx", size: "4.2 MB", type: "pptx" }
    ],
    relatedLinks: [
      { title: "Online Application Form", url: "/events/showcase/apply" },
      { title: "Last Year's Showcase Gallery", url: "/events/showcase/2022" }
    ]
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

const AnnouncementDetail = () => {
  const { announcementId } = useParams<{ announcementId: string; }>();
  const announcement = announcements.find(a => a.id === announcementId);

  if (!announcement) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-semibold mb-4">Announcement Not Found</h2>
          <p className="text-muted-foreground mb-6">The announcement you're looking for doesn't exist or has been removed.</p>
          <Button asChild>
            <Link to="/announcements">Back to Announcements</Link>
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      {/* Header */}
      <section className="pt-20 pb-12 px-6 md:px-12 bg-secondary/50 dark:bg-secondary/20">
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Link to="/announcements" className="inline-flex items-center gap-2 mb-6 hover:text-primary transition-colors">
              <ArrowLeft size={16} />
              <span>Back to Announcements</span>
            </Link>

            <div className="flex flex-wrap items-center gap-2 mb-4">
              <Badge
                variant={announcement.importance === "high" ? "destructive" : "default"}
                className={announcement.importance === "medium" ? "bg-yellow-500" : ""}
              >
                {announcement.category}
              </Badge>
              <span className="text-sm text-muted-foreground">
                {new Date(announcement.date).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })}
              </span>
            </div>

            <h1 className="text-3xl md:text-5xl font-bold mb-6">
              {announcement.title}
            </h1>

            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full overflow-hidden">
                <img
                  src={announcement.author.image}
                  alt={announcement.author.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div>
                <p className="font-medium">{announcement.author.name}</p>
                <p className="text-sm text-muted-foreground">{announcement.author.role}</p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Content */}
      <section className="py-12 px-6 md:px-12">
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="md:col-span-2">
              {/* Main Content */}
              <div className="prose prose-lg dark:prose-invert max-w-none mb-12">
                {announcement.fullContent ? (
                  <div dangerouslySetInnerHTML={{ __html: announcement.fullContent }} />
                ) : (
                  <p className="text-lg">{announcement.content}</p>
                )}
              </div>

              {/* Attachments */}
              {announcement.attachments && announcement.attachments.length > 0 && (
                <div className="mb-12">
                  <h2 className="text-xl font-semibold mb-4">Attachments</h2>
                  <div className="space-y-3">
                    {announcement.attachments.map((attachment, i) => (
                      <div
                        key={i}
                        className="flex items-center justify-between p-4 border border-border rounded-lg hover:bg-secondary/10 transition-colors"
                      >
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
                            {attachment.type === 'pdf' &&
                              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-file-text"><path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" /><polyline points="14 2 14 8 20 8" /><line x1="16" x2="8" y1="13" y2="13" /><line x1="16" x2="8" y1="17" y2="17" /><line x1="10" x2="8" y1="9" y2="9" /></svg>
                            }
                            {attachment.type === 'docx' &&
                              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-file"><path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" /><polyline points="14 2 14 8 20 8" /></svg>
                            }
                            {attachment.type === 'pptx' &&
                              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-file-presentation"><path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" /><polyline points="14 2 14 8 20 8" /><path d="M12 12v6" /><path d="M9.5 15.5L12 12l2.5 3.5" /></svg>
                            }
                          </div>
                          <div>
                            <p className="font-medium">{attachment.name}</p>
                            <p className="text-xs text-muted-foreground">{attachment.size}</p>
                          </div>
                        </div>
                        <Button variant="ghost" size="sm">Download</Button>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Related Links */}
              {announcement.relatedLinks && announcement.relatedLinks.length > 0 && (
                <div className="mb-12">
                  <h2 className="text-xl font-semibold mb-4">Related Links</h2>
                  <div className="space-y-3">
                    {announcement.relatedLinks.map((link, i) => (
                      <div key={i} className="flex">
                        <Link
                          to={link.url}
                          className="inline-flex items-center gap-2 hover:text-primary transition-colors"
                        >
                          <span>{link.title}</span>
                          <ArrowLeft size={16} className="rotate-180" />
                        </Link>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Sidebar */}
            <div className="md:col-span-1">
              <div className="sticky top-20 space-y-6">
                <div className="glass p-6 rounded-xl">
                  <h3 className="text-lg font-semibold mb-4">Announcement Details</h3>
                  <div className="space-y-4">
                    <div className="flex items-start gap-3">
                      <Calendar className="h-5 w-5 text-primary mt-0.5" />
                      <div>
                        <p className="font-medium">Published</p>
                        <p className="text-muted-foreground">
                          {new Date(announcement.date).toLocaleDateString('en-US', {
                            weekday: 'long',
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric'
                          })}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <Tag className="h-5 w-5 text-primary mt-0.5" />
                      <div>
                        <p className="font-medium">Category</p>
                        <p className="text-muted-foreground">{announcement.category}</p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <Bell className="h-5 w-5 text-primary mt-0.5" />
                      <div>
                        <p className="font-medium">Importance</p>
                        <p className="text-muted-foreground capitalize">{announcement.importance}</p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <User className="h-5 w-5 text-primary mt-0.5" />
                      <div>
                        <p className="font-medium">Posted by</p>
                        <p className="text-muted-foreground">{announcement.author.name}</p>
                        <p className="text-xs text-muted-foreground">{announcement.author.role}</p>
                      </div>
                    </div>
                  </div>
                </div>

                <Button variant="outline" size="lg" className="w-full flex items-center justify-center gap-2">
                  <Share className="h-4 w-4" />
                  Share Announcement
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default AnnouncementDetail;
