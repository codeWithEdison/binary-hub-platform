
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Mail, Phone, MapPin, Clock, Send, Linkedin, Twitter, Github, Instagram, MessageCircle, Sparkles, ChevronDown } from "lucide-react";
import { Link } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import Footer from "@/components/Footer";

const ContactPage = () => {
  const [openFAQ, setOpenFAQ] = useState<number | null>(null);
  const toggleFAQ = (index: number) => {
    setOpenFAQ(openFAQ === index ? null : index);
  };

  return (
    <div className="flex min-h-screen flex-col  pt-24 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 md:pt-28">
      {/* Header Section - Enhanced */}
      

      <Footer />
    </div>
  );
};

export default ContactPage;
