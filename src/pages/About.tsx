import React from "react";
import { motion } from "framer-motion";
import { ArrowRight, Code2, GraduationCap, Handshake, MapPin } from "lucide-react";
import { Link } from "react-router-dom";
import Footer from "@/components/Footer";
import CallToAction from "@/components/CallToAction";

const pillars = [
  {
    title: "Practical skills",
    description:
      "Students and staff learn by building real software — mentorship, collaboration, and shipping under institutional needs.",
  },
  {
    title: "Homegrown products",
    description:
      "Ideas from the University of Rwanda community become useful digital products for public and campus challenges.",
  },
  {
    title: "National impact",
    description:
      "Solutions strengthen service delivery, governance, education, and Rwanda’s broader digital transformation.",
  },
] as const;

const objectives = [
  {
    title: "Foster interdisciplinary collaboration",
    description:
      "Bring together students, staff, alumni, and industry experts to solve problems collectively.",
  },
  {
    title: "Focus on edu-tech and priority areas",
    description:
      "Align projects with University of Rwanda and national strategies for maximum institutional value.",
  },
  {
    title: "Provide mentorship and career pathways",
    description:
      "Pair emerging talent with mentors and real project experience that builds lasting careers.",
  },
  {
    title: "Strengthen UR’s digital position",
    description:
      "Position the University as a trusted source of practical digital solutions for Rwanda.",
  },
] as const;

const features = [
  {
    title: "Incubation support",
    description: "Mentorship, training, and a working space for tech innovators.",
  },
  {
    title: "University-backed",
    description: "Operates under the University of Rwanda, aligned with national development goals.",
  },
  {
    title: "Multidisciplinary teams",
    description: "Students, academic staff, alumni, and external experts building together.",
  },
  {
    title: "Software for institutions",
    description: "Primary focus on software development for public institutions and national systems.",
  },
  {
    title: "Co-ownership model",
    description: "Solutions are co-owned by the University and the developers who build them.",
  },
  {
    title: "Real-world delivery",
    description: "Projects target public service delivery, governance, and education.",
  },
] as const;

const structure = [
  "Coordinated by a dedicated team from the School of ICT",
  "Project managers, developers, testers, and documentation specialists on every engagement",
  "Mentors and industry partners guide delivery from idea to production",
] as const;

const About = () => {
  return (
    <div className="bh-about-page">
      {/* Hero — one composition, brand first, full-bleed image */}
      <section className="bh-about-hero">
        <div className="bh-about-hero-media" aria-hidden="true">
          <img
            src="/img/presentation-img/presentation.jpg"
            alt=""
          />
          <div className="bh-about-hero-shade" />
        </div>

        <div className="bh-about-hero-inner">
          <motion.p
            className="bh-about-brand"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55 }}
          >
            UR Binary Hub
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.08, duration: 0.6 }}
          >
            The innovation and incubation hub of the University of Rwanda
          </motion.h1>

          <motion.p
            className="bh-about-hero-lead"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.16, duration: 0.55 }}
          >
            A space where students, staff, experts, and alumni build homegrown digital
            solutions for institutional and national challenges.
          </motion.p>

          <motion.div
            className="bh-about-hero-actions"
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.24, duration: 0.5 }}
          >
            <Link to="/applications/form?role=Innovator" className="bh-about-btn-primary">
              Apply to become innovator
              <ArrowRight size={15} />
            </Link>
            <a href="#who-we-are" className="bh-about-btn-ghost">
              Explore who we are
            </a>
          </motion.div>
        </div>
      </section>

      {/* Who we are */}
      <section id="who-we-are" className="bh-about-section">
        <div className="bh-about-container bh-about-split">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.55 }}
          >
            <p className="bh-about-eyebrow">Who we are</p>
            <h2>
              Building Rwanda&apos;s{" "}
              <span>digital future</span>
            </h2>
            <p className="bh-about-prose">
              UR Binary Hub is hosted within the School of ICT at the College of Science
              and Technology (CST). It is a conducive environment for nurturing
              student-, staff-, expert-, and alumni-led innovations focused on
              developing homegrown digital solutions that address national and
              institutional challenges.
            </p>

            <ul className="bh-about-meta-list">
              <li>
                <MapPin className="h-4 w-4" />
                School of ICT · College of Science and Technology
              </li>
              <li>
                <GraduationCap className="h-4 w-4" />
                University of Rwanda community
              </li>
              <li>
                <Code2 className="h-4 w-4" />
                Software development &amp; incubation
              </li>
              <li>
                <Handshake className="h-4 w-4" />
                Mentors, partners, and public institutions
              </li>
            </ul>
          </motion.div>

          <motion.div
            className="bh-about-photo"
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.65, delay: 0.08 }}
          >
            <img
              src="/img/presentation-img/team.jpg"
              alt="UR Binary Hub team collaborating"
            />
          </motion.div>
        </div>
      </section>

      {/* Vision */}
      <section className="bh-about-vision">
        <div className="bh-about-container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55 }}
          >
            <p className="bh-about-eyebrow bh-about-eyebrow-on-dark">Our vision</p>
            <h2>Homegrown digital innovation</h2>
            <p className="bh-about-vision-lead">
              Establish a sustainable, institutionally recognized software development
              center where young talent thrives, practical skills grow, and homegrown
              digital solutions create lasting institutional and national impact.
            </p>
          </motion.div>

          <div className="bh-about-pillars">
            {pillars.map((item, index) => (
              <motion.article
                key={item.title}
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.45, delay: index * 0.08 }}
              >
                <span className="bh-about-pillar-index">0{index + 1}</span>
                <h3>{item.title}</h3>
                <p>{item.description}</p>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      {/* Objectives */}
      <section className="bh-about-section bh-about-section-muted">
        <div className="bh-about-container">
          <motion.div
            className="bh-about-section-intro"
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <p className="bh-about-eyebrow">What we aim for</p>
            <h2>Specific objectives</h2>
            <p>
              Clear goals that keep the hub focused on talent, collaboration, and
              measurable digital impact.
            </p>
          </motion.div>

          <ol className="bh-about-objectives">
            {objectives.map((item, index) => (
              <motion.li
                key={item.title}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.45, delay: index * 0.06 }}
              >
                <span>{String(index + 1).padStart(2, "0")}</span>
                <div>
                  <h3>{item.title}</h3>
                  <p>{item.description}</p>
                </div>
              </motion.li>
            ))}
          </ol>
        </div>
      </section>

      {/* How we operate */}
      <section className="bh-about-section">
        <div className="bh-about-container">
          <motion.div
            className="bh-about-section-intro"
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <p className="bh-about-eyebrow">How we work</p>
            <h2>What makes Binary Hub different</h2>
            <p>
              An institutional model built for delivery — incubation, co-ownership, and
              real systems in production.
            </p>
          </motion.div>

          <div className="bh-about-features">
            {features.map((item, index) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 14 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
                className="bh-about-feature"
              >
                <h3>{item.title}</h3>
                <p>{item.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Structure */}
      <section className="bh-about-section bh-about-section-muted">
        <div className="bh-about-container bh-about-structure">
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <p className="bh-about-eyebrow">Operations</p>
            <h2>Current structure</h2>
            <p className="bh-about-prose">
              Binary Hub runs as a focused delivery unit — coordinating talent across
              roles so ideas move from prototype to production with clear ownership.
            </p>
          </motion.div>

          <ul className="bh-about-structure-list">
            {structure.map((item, index) => (
              <motion.li
                key={item}
                initial={{ opacity: 0, x: 12 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.07 }}
              >
                {item}
              </motion.li>
            ))}
          </ul>
        </div>
      </section>

      <CallToAction
        title="Ready to build with Binary Hub?"
        description="Join as an innovator, mentor, or partner — and help turn University of Rwanda ideas into lasting digital impact."
        primaryLabel="Apply to become innovator"
        primaryHref="/applications/form?role=Innovator"
        secondaryLabel="Contact us"
        secondaryHref="/#contact"
      />

      <Footer />
    </div>
  );
};

export default About;
