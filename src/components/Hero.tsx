import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, Sparkles, Play, ChevronDown, X } from "lucide-react";
import { Link } from "react-router-dom";

const Hero = () => {
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);

  const playVideo = () => setIsVideoPlaying(true);
  const stopVideo = () => setIsVideoPlaying(false);

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
      {/* Background Image with Gray Overlay */}
      <div className="absolute inset-0 z-0">
        <img
          src="/img/presentation-img/team.jpg"
          alt="UR Binary Hub Innovators"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gray-100/60"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-gray-100/80 via-gray-100/40 to-transparent"></div>
      </div>

      <div className="max-w-7xl mx-auto w-full z-10 px-6 md:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center min-h-screen py-20">
          {/* Text Content - Left Side */}
          <motion.div
            className="order-2 lg:order-1"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          >
            <motion.div
              className="inline-flex items-center px-4 py-2 mt-8  bg-[#00628b]/20 text-[#00628b] rounded-full text-sm font-semibold mb-6"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3, duration: 0.5 }}
            >
              <Sparkles className="w-4 h-4 mr-2" />
              UR Binary Hub
            </motion.div>

            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold leading-tight mb-6 text-gray-900">
              <motion.span
                className="block"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4, duration: 0.5 }}
              >
                Unlock Innovation
              </motion.span>
              <motion.span
                className="block text-[#00628b]"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6, duration: 0.5 }}
              >
                Build Solutions
              </motion.span>
            </h1>

            <motion.p
              className="text-xl md:text-2xl text-gray-700 mb-8 max-w-xl leading-relaxed"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1, duration: 0.5 }}
            >
              Student-led innovation for Rwanda's digital transformation.
            </motion.p>

            <motion.div
              className="flex flex-wrap gap-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.2, duration: 0.5 }}
            >
              <Link
                to="/about"
                className="inline-flex items-center px-8 py-4 bg-[#00628b] text-white rounded-full font-semibold hover:bg-blue-600 hover:shadow-lg hover:shadow-[#00628b]/25 transition-all duration-300 group"
              >
                <span>GET STARTED</span>
                <ArrowRight
                  size={18}
                  className="ml-2 group-hover:translate-x-1 transition-transform"
                />
              </Link>
              <button
                onClick={playVideo}
                className="inline-flex items-center px-8 py-4 border-2 border-[#00628b] text-[#00628b] rounded-full font-semibold hover:bg-[#00628b] hover:text-white transition-all duration-300 group"
              >
                <Play className="w-5 h-5 mr-2" />
                <span>Watch Video</span>
              </button>
            </motion.div>
          </motion.div>

          {/* Video/Image Section - Right Side */}
          <motion.div
            className="order-1 lg:order-2 relative"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="relative">
              {/* Main Video/Image Container */}
              <div className="relative z-10 rounded-3xl overflow-hidden shadow-2xl">
                <AnimatePresence mode="wait">
                  {!isVideoPlaying ? (
                    // Image with Play Button Overlay
                    <motion.div
                      key="image"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="relative"
                    >
                      <img
                        src="/img/presentation-img/presentation.jpg"
                        alt="UR Binary Hub Innovation Event"
                        className="w-full h-auto object-cover"
                      />
                      <div className="absolute inset-0 bg-black/30"></div>

                      {/* Play Button Overlay */}
                      <motion.div
                        className="absolute inset-0 flex items-center justify-center"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <button
                          onClick={playVideo}
                          className="w-20 h-20 bg-[#00628b] rounded-full flex items-center justify-center shadow-lg cursor-pointer group hover:bg-blue-600 transition-colors"
                        >
                          <Play className="w-8 h-8 text-white ml-1" />
                        </button>
                      </motion.div>
                    </motion.div>
                  ) : (
                    // Video Player
                    <motion.div
                      key="video"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="relative"
                    >
                      {/* Close Button */}
                      <button
                        onClick={stopVideo}
                        className="absolute top-4 right-4 z-20 w-10 h-10 bg-black/50 hover:bg-black/70 text-white rounded-full flex items-center justify-center transition-colors backdrop-blur-sm"
                      >
                        <X className="w-5 h-5" />
                      </button>

                      {/* YouTube Video Embed */}
                      <iframe
                          src="https://www.youtube.com/embed/HUiE23JFj0I" 
                       title="UR Tekinova Hub: Where Innovation Meets Student Passion"
                        className="w-full h-auto aspect-video"
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                      />
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20"
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <div className="flex flex-col items-center text-gray-700">
          <span className="text-sm font-medium mb-2">Scroll to explore</span>
          <ChevronDown className="w-6 h-6" />
        </div>
      </motion.div>
    </section>
  );
};

export default Hero;
