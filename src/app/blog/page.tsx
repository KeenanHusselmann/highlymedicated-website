'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { Search, Calendar, Clock, ArrowRight, Tag } from 'lucide-react';
import { blogPosts } from '@/lib/data';
import GlassCard from '@/components/ui/GlassCard';
import Badge from '@/components/ui/Badge';
import Newsletter from '@/components/home/Newsletter';

export default function BlogPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  // Extract unique tags from all blog posts
  const categories = Array.from(new Set(blogPosts.flatMap(p => p.tags || [])));

  const filtered = blogPosts.filter(post => {
    const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = !selectedCategory || post.tags?.includes(selectedCategory);
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen pt-24 pb-0">
      {/* Hero */}
      <div className="gradient-hero py-20 relative overflow-hidden">
        <div className="absolute inset-0 leaf-pattern opacity-20" />
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.span
            className="text-primary-light text-sm font-medium uppercase tracking-wider"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            Learn &amp; Discover
          </motion.span>
          <motion.h1
            className="text-4xl sm:text-5xl font-bold text-cream mt-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            The HM Journal
          </motion.h1>
          <motion.p
            className="text-cream/60 mt-6 max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            Explore the world of cannabis wellness. Education, insights, and stories from the Highly Medicated community.
          </motion.p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Filters */}
        <div className="flex flex-col sm:flex-row gap-4 mb-10">
          <div className="relative flex-1 max-w-md">
            <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-dark/30" />
            <input
              type="text"
              placeholder="Search articles..."
              className="w-full pl-12 pr-4 py-3 rounded-xl border border-dark/10 bg-white/50 backdrop-blur-sm text-dark placeholder:text-dark/30 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="flex gap-2 flex-wrap">
            <button
              onClick={() => setSelectedCategory(null)}
              className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${
                !selectedCategory ? 'bg-primary text-white' : 'glass text-dark/60 hover:text-dark'
              }`}
            >
              All
            </button>
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${
                  selectedCategory === cat ? 'bg-primary text-white' : 'glass text-dark/60 hover:text-dark'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Featured Post */}
        {filtered.length > 0 && (
          <motion.div
            className="mb-12"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <Link href={`/blog/${filtered[0].slug}`}>
              <GlassCard className="overflow-hidden group" hover>
                <div className="grid md:grid-cols-2">
                  <div className="aspect-[16/10] md:aspect-auto bg-gradient-to-br from-primary/20 via-secondary/10 to-accent/10 flex items-center justify-center">
                    <div className="glass-card rounded-2xl p-6 text-center">
                      <span className="text-4xl font-bold text-primary">HM</span>
                      <p className="text-dark/40 text-xs mt-1">Journal</p>
                    </div>
                  </div>
                  <div className="p-8 flex flex-col justify-center">
                    <div className="flex items-center gap-3 mb-3">
                      {filtered[0].tags?.[0] && <Badge variant="success">{filtered[0].tags[0]}</Badge>}
                    </div>
                    <h2 className="text-2xl font-bold text-dark mb-3 group-hover:text-primary transition-colors">
                      {filtered[0].title}
                    </h2>
                    <p className="text-dark/50 mb-4 line-clamp-3">{filtered[0].excerpt}</p>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2 text-sm text-dark/40">
                        By {filtered[0].author}
                      </div>
                      <span className="text-primary font-medium text-sm flex items-center gap-1 group-hover:gap-2 transition-all">
                        Read More <ArrowRight size={14} />
                      </span>
                    </div>
                  </div>
                </div>
              </GlassCard>
            </Link>
          </motion.div>
        )}

        {/* Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {filtered.slice(1).map((post, index) => (
            <motion.div
              key={post.slug}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Link href={`/blog/${post.slug}`}>
                <GlassCard className="overflow-hidden group h-full flex flex-col" hover>
                  <div className="aspect-video bg-gradient-to-br from-primary/10 via-secondary/5 to-accent/10 flex items-center justify-center">
                    <div className="glass-card rounded-xl p-4 text-center">
                      <span className="text-2xl font-bold text-primary">HM</span>
                    </div>
                  </div>
                  <div className="p-6 flex-1 flex flex-col">
                    <div className="flex items-center gap-2 mb-3">
                      {post.tags?.[0] && <Badge variant="success" className="text-xs">{post.tags[0]}</Badge>}
                    </div>
                    <h3 className="font-bold text-dark mb-2 group-hover:text-primary transition-colors line-clamp-2">
                      {post.title}
                    </h3>
                    <p className="text-dark/50 text-sm line-clamp-3 flex-1">{post.excerpt}</p>
                    <div className="flex items-center justify-between mt-4 pt-4 border-t border-dark/5">
                      <span className="text-dark/40 text-xs">
                        By {post.author}
                      </span>
                      <span className="text-primary font-medium text-xs flex items-center gap-1">
                        Read <ArrowRight size={12} />
                      </span>
                    </div>
                  </div>
                </GlassCard>
              </Link>
            </motion.div>
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="text-center py-20">
            <Tag size={40} className="mx-auto text-dark/20 mb-4" />
            <h3 className="text-lg font-semibold text-dark/60">No articles found</h3>
            <p className="text-dark/40 text-sm mt-1">Try adjusting your search or filter</p>
          </div>
        )}
      </div>

      <Newsletter />
    </div>
  );
}
