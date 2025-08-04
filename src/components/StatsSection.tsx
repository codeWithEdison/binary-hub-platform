import React from "react";
import { motion } from "framer-motion";
import { Rocket, Users, Sparkles, Globe, TrendingUp, Award, Target, Zap } from "lucide-react";
import { useStats } from "@/hooks/useStats";

interface StatsSectionProps {
  className?: string;
  showDivider?: boolean;
}

const StatsSection: React.FC<StatsSectionProps> = ({
  className = "",
  showDivider = true
}) => {
  const { stats, loading } = useStats();

  // Default icons and colors for different stat types
  const getIconAndColor = (index: number, label: string) => {
    const iconMap = [
      Rocket, Users, Sparkles, Globe, TrendingUp, Award, Target, Zap
    ];

    const colorMap = [
      "from-blue-400 to-cyan-500",
      "from-green-400 to-emerald-500",
      "from-purple-400 to-indigo-500",
      "from-orange-400 to-red-500",
      "from-pink-400 to-rose-500",
      "from-yellow-400 to-orange-500",
      "from-teal-400 to-cyan-500",
      "from-indigo-400 to-purple-500"
    ];

    return {
      icon: iconMap[index % iconMap.length],
      color: colorMap[index % colorMap.length]
    };
  };

  const statsData = stats.map((stat, index) => {
    const { icon, color } = getIconAndColor(index, stat.label);
    return {
      icon,
      value: stat.value,
      label: stat.label,
      color
    };
  });

  return (
    <section className={`py-24 px-6 md:px-12 relative overflow-hidden ${className}`}>
      <div className="absolute inset-0 bg-gradient-to-r from-[#00628b]/5 via-blue-50/30 to-transparent"></div>
      <div className="max-w-7xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-[#00628b] mb-6">
            UR Binary Hub in Numbers
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto mb-8">
            Real impact through flagship solutions, dedicated team members, and strategic partnerships
          </p>
          {showDivider && (
            <div className="w-24 h-1 bg-gradient-to-r from-[#00628b] to-blue-400 mx-auto rounded-full"></div>
          )}
        </motion.div>

        {loading ? (
          // Loading skeleton
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
            {Array.from({ length: 4 }).map((_, index) => (
              <motion.div
                key={index}
                className="group relative"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.6 }}
              >
                <div className="bg-white/90 backdrop-blur-sm rounded-3xl p-8 shadow-xl border border-white/30">
                  <div className="flex justify-center mb-6">
                    <div className="w-16 h-16 rounded-2xl bg-gray-200 animate-pulse"></div>
                  </div>
                  <div className="text-center">
                    <div className="h-8 bg-gray-200 rounded animate-pulse mb-3"></div>
                    <div className="h-4 bg-gray-200 rounded animate-pulse"></div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        ) : statsData.length > 0 ? (
          <div className={`grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 md:gap-8`}>
            {statsData.map((stat, index) => (
              <motion.div
                key={stat.label}
                className="group relative"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.6 }}
                whileHover={{ y: -8 }}
              >
                <div className="bg-white/90 backdrop-blur-sm rounded-3xl p-8 shadow-xl border border-white/30 group-hover:shadow-2xl group-hover:scale-105 transition-all duration-500 relative overflow-hidden">
                  {/* Background gradient overlay */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${stat.color} opacity-5 group-hover:opacity-10 transition-opacity duration-500`}></div>

                  <div className="relative z-10">
                    {/* Icon with animated background */}
                    <div className="flex justify-center mb-6">
                      <motion.div
                        className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${stat.color} flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-500`}
                        whileHover={{ scale: 1.1, rotate: 5 }}
                        animate={{
                          boxShadow: [
                            `0 10px 25px -5px ${stat.color.split(' ')[1].replace('to-', '').replace('-500', '')}40`,
                            `0 20px 40px -10px ${stat.color.split(' ')[1].replace('to-', '').replace('-500', '')}60`,
                            `0 10px 25px -5px ${stat.color.split(' ')[1].replace('to-', '').replace('-500', '')}40`
                          ]
                        }}
                        transition={{ duration: 2, repeat: Infinity }}
                      >
                        <stat.icon className="w-8 h-8 text-white" />
                      </motion.div>
                    </div>

                    {/* Value with enhanced typography */}
                    <div className="text-center">
                      <motion.p
                        className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-3 group-hover:text-[#00628b] transition-colors duration-300"
                        initial={{ scale: 0.8 }}
                        whileInView={{ scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: index * 0.1 + 0.3, duration: 0.5, type: "spring", stiffness: 200 }}
                      >
                        {stat.value}
                      </motion.p>
                      <p className="text-sm md:text-base text-gray-600 dark:text-gray-400 font-medium leading-relaxed">
                        {stat.label}
                      </p>
                    </div>

                    {/* Decorative elements */}
                    <motion.div
                      className={`absolute -top-2 -right-2 w-4 h-4 bg-gradient-to-br ${stat.color} rounded-full opacity-30`}
                      animate={{
                        scale: [1, 1.3, 1],
                        opacity: [0.3, 0.6, 0.3]
                      }}
                      transition={{ duration: 2, repeat: Infinity, delay: index * 0.2 }}
                    />

                    <motion.div
                      className={`absolute -bottom-1 -left-1 w-3 h-3 bg-gradient-to-br ${stat.color} rounded-full opacity-20`}
                      animate={{
                        scale: [1, 1.5, 1],
                        opacity: [0.2, 0.4, 0.2]
                      }}
                      transition={{ duration: 3, repeat: Infinity, delay: index * 0.3 }}
                    />
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        ) : (
          // No stats available
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center py-12"
          >
            <div className="bg-white/90 backdrop-blur-sm rounded-3xl p-12 shadow-xl border border-white/30 max-w-md mx-auto">
              <div className="w-20 h-20 bg-[#00628b]/10 rounded-full flex items-center justify-center mx-auto mb-6">
                <TrendingUp size={40} className="text-[#00628b]" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">No stats available</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Statistics will appear here once they are added to the database.
              </p>
            </div>
          </motion.div>
        )}

        {/* Additional stats row for mobile */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.6, duration: 0.6 }}
          className="mt-12 text-center"
        >
          <div className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-[#00628b]/10 to-blue-400/10 rounded-full border border-[#00628b]/20">
            <div className="w-2 h-2 bg-[#00628b] rounded-full mr-3 animate-pulse"></div>
            <span className="text-sm font-medium text-[#00628b]">
              Growing innovation ecosystem with real-world impact
            </span>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default StatsSection; 