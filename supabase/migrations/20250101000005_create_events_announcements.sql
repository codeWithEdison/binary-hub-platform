-- Create events and announcements tables

-- Events table
CREATE TABLE IF NOT EXISTS public.events (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT NOT NULL,
    content TEXT,
    date DATE NOT NULL,
    time VARCHAR(100),
    location VARCHAR(255),
    category VARCHAR(100),
    capacity INTEGER,
    image VARCHAR(500),
    published BOOLEAN DEFAULT false,
    max_attendees INTEGER,
    registration_deadline DATE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Announcements table
CREATE TABLE IF NOT EXISTS public.announcements (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    content TEXT NOT NULL,
    excerpt TEXT,
    category VARCHAR(100),
    importance VARCHAR(50) DEFAULT 'medium',
    image VARCHAR(500),
    published BOOLEAN DEFAULT false,
    publish_date DATE,
    author_id UUID REFERENCES public.innovators(id),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS on both tables
ALTER TABLE public.events ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.announcements ENABLE ROW LEVEL SECURITY;

-- Create policies for events
CREATE POLICY "events_policy" 
ON public.events 
FOR ALL 
USING (true) 
WITH CHECK (true);

-- Create policies for announcements
CREATE POLICY "announcements_policy" 
ON public.announcements 
FOR ALL 
USING (true) 
WITH CHECK (true);

-- Insert sample data for events
INSERT INTO public.events (title, description, content, date, time, location, category, capacity, image, published) VALUES
('Annual Innovation Hackathon', 'A 48-hour hackathon focusing on solutions for sustainable agriculture and food security in Rwanda.', 'Join us for an exciting 48-hour hackathon where teams will work on innovative solutions for sustainable agriculture and food security challenges in Rwanda. This event brings together students, professionals, and entrepreneurs to collaborate on real-world problems.', '2024-02-15', '09:00 AM - 06:00 PM', 'Binary Hub, University of Rwanda - Kigali Campus', 'Hackathon', 100, 'https://images.unsplash.com/photo-1540317580384-e5d43867caa6?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3', true),
('AI in Healthcare Workshop', 'Learn how artificial intelligence is transforming healthcare delivery in Africa.', 'This workshop will explore the latest developments in AI applications for healthcare in Africa. Topics include diagnostic tools, patient management systems, and predictive analytics.', '2024-02-22', '02:00 PM - 05:00 PM', 'Virtual Event (Zoom)', 'Workshop', 50, 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3', true),
('Startup Funding Masterclass', 'Comprehensive guide to securing funding for your tech startup in East Africa.', 'Learn from successful entrepreneurs and investors about the funding landscape in East Africa. Topics include pitch deck preparation, investor relations, and funding strategies.', '2024-03-05', '10:00 AM - 04:00 PM', 'Norrsken House Kigali', 'Masterclass', 30, 'https://images.unsplash.com/photo-1556761175-4b46a572b786?q=80&w=2074&auto=format&fit=crop&ixlib=rb-4.0.3', true),
('Women in Tech Networking Event', 'Networking event for women in technology across Rwanda.', 'Connect with fellow women in technology, share experiences, and build meaningful professional relationships. This event aims to support and empower women in the tech industry.', '2024-03-12', '05:30 PM - 08:30 PM', 'Kigali Innovation City', 'Networking', 75, 'https://images.unsplash.com/photo-1483389127117-b6a2102724ae?q=80&w=2074&auto=format&fit=crop&ixlib=rb-4.0.3', true),
('Blockchain for Social Impact', 'Exploring how blockchain technology can address social challenges in Africa.', 'Discover innovative blockchain applications that are making a positive social impact across Africa. Learn about transparency, traceability, and financial inclusion solutions.', '2024-03-18', '01:00 PM - 04:00 PM', 'Binary Hub, University of Rwanda - Kigali Campus', 'Workshop', 40, 'https://images.unsplash.com/photo-1639322537228-f710d846310a?q=80&w=2032&auto=format&fit=crop&ixlib=rb-4.0.3', true),
('End of Year Innovation Showcase', 'Celebrating the achievements of Binary Hub innovators in 2024.', 'Join us for our annual showcase where Binary Hub innovators present their projects to industry leaders, potential investors, and the wider community.', '2024-12-22', '03:00 PM - 08:00 PM', 'Kigali Convention Center', 'Showcase', 200, 'https://images.unsplash.com/photo-1475721027785-f74eccf877e2?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3', true);

-- Insert sample data for announcements
INSERT INTO public.announcements (title, content, excerpt, category, importance, image, published, publish_date) VALUES
('Applications Open for Innovation Hub Membership', 'We are excited to announce that applications for the Binary Hub membership are now open. Join our vibrant community of innovators and access resources, mentorship, and networking opportunities. Our membership program provides access to state-of-the-art facilities, expert mentorship, and a network of like-minded innovators.', 'We are excited to announce that applications for the Binary Hub membership are now open. Join our vibrant community of innovators and access resources, mentorship, and networking opportunities.', 'Membership', 'high', '/img/cordinator.jpg', true, '2024-01-10'),
('New Partnership with Rwanda Information Society Authority', 'Binary Hub is proud to announce a new strategic partnership with RISA to promote digital innovation across Rwanda. This partnership will create new opportunities for our members and strengthen the digital innovation ecosystem in Rwanda.', 'Binary Hub is proud to announce a new strategic partnership with RISA to promote digital innovation across Rwanda.', 'Partnership', 'high', '/img/deanict.jpg', true, '2024-01-05'),
('Equipment Donation from XYZ Technologies', 'We''ve received a generous donation of computer equipment from XYZ Technologies. The equipment includes 20 laptops, 5 3D printers, and various IoT devices that will be available for members to use in their projects.', 'We''ve received a generous donation of computer equipment from XYZ Technologies.', 'Donation', 'medium', '/img/userr.png', true, '2024-01-28'),
('Changes to Hub Operating Hours', 'Starting February 1st, Binary Hub will be open on Saturdays from 10 AM to 4 PM to accommodate member requests for weekend access. This is in addition to our regular weekday hours.', 'Starting February 1st, Binary Hub will be open on Saturdays from 10 AM to 4 PM.', 'Operations', 'medium', '/img/userr.png', true, '2024-01-20'),
('End of Year Innovation Showcase - Call for Projects', 'We are now accepting submissions for the End of Year Innovation Showcase. This is your opportunity to present your project to industry leaders, potential investors, and the wider community.', 'We are now accepting submissions for the End of Year Innovation Showcase.', 'Event', 'high', '/img/cordinator.jpg', true, '2024-01-15'),
('New Resources Added to Digital Library', 'We''ve added over a hundred new e-books, research papers, and tutorials to our digital library, covering topics from machine learning to product design. Access these resources through your member portal.', 'We''ve added over a hundred new e-books, research papers, and tutorials to our digital library.', 'Resources', 'low', '/img/userr.png', true, '2024-01-10'); 