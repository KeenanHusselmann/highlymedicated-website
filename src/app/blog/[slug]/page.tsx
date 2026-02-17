'use client';

import { use } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { Calendar, Clock, ArrowLeft, ArrowRight, Share2, BookOpen } from 'lucide-react';
import { blogPosts } from '@/lib/data';
import GlassCard from '@/components/ui/GlassCard';
import Badge from '@/components/ui/Badge';
import Newsletter from '@/components/home/Newsletter';

export default function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = use(params);
  const post = blogPosts.find(p => p.slug === slug);

  if (!post) {
    return (
      <div className="min-h-screen pt-24 flex items-center justify-center">
        <div className="text-center">
          <BookOpen size={48} className="mx-auto text-dark/20 mb-4" />
          <h1 className="text-2xl font-bold text-dark mb-2">Article Not Found</h1>
          <p className="text-dark/50 mb-6">The article you&apos;re looking for doesn&apos;t exist.</p>
          <Link href="/blog" className="text-primary font-medium hover:underline flex items-center justify-center gap-2">
            <ArrowLeft size={16} /> Back to Blog
          </Link>
        </div>
      </div>
    );
  }

  const otherPosts = blogPosts.filter(p => p.slug !== slug).slice(0, 2);

  return (
    <div className="min-h-screen pt-24 pb-0">
      {/* Hero */}
      <div className="gradient-hero py-20 relative overflow-hidden">
        <div className="absolute inset-0 leaf-pattern opacity-20" />
        <div className="relative max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <Link href="/blog" className="text-cream/60 hover:text-cream text-sm flex items-center gap-2 mb-6 transition-colors">
              <ArrowLeft size={14} /> Back to Blog
            </Link>
            {post.tags?.[0] && <Badge variant="success">{post.tags[0]}</Badge>}
            <h1 className="text-3xl sm:text-4xl font-bold text-cream mt-4">{post.title}</h1>
            <div className="flex items-center gap-4 mt-6 text-cream/50 text-sm">
              <span>By {post.author}</span>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          {/* Featured image placeholder */}
          <div className="aspect-video rounded-2xl overflow-hidden mb-10 bg-gradient-to-br from-primary/10 via-secondary/5 to-accent/10 flex items-center justify-center">
            <div className="glass-card rounded-2xl p-8 text-center">
              <span className="text-4xl font-bold text-primary">HM</span>
              <p className="text-dark/40 text-sm mt-2">Journal</p>
            </div>
          </div>

          {/* Article */}
          <article className="prose prose-lg max-w-none">
            <div className="space-y-6 text-dark/70 leading-relaxed">
              {post.content.split('\n\n').map((paragraph, i) => (
                <p key={i}>{paragraph}</p>
              ))}
            </div>
          </article>

          {/* Tags */}
          <div className="flex items-center gap-2 mt-10 pt-8 border-t border-dark/10">
            <span className="text-dark/40 text-sm">Tags:</span>
            {post.tags.map(tag => (
              <Badge key={tag} variant="primary" className="text-xs">{tag}</Badge>
            ))}
          </div>

          {/* Share */}
          <div className="flex items-center justify-between mt-8 pt-8 border-t border-dark/10">
            <span className="text-dark/40 text-sm flex items-center gap-2">
              <Share2 size={14} /> Share this article
            </span>
            <div className="flex gap-3">
              <a
                href={`https://wa.me/?text=${encodeURIComponent(post.title)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-xl bg-green-100 flex items-center justify-center text-green-600 hover:bg-green-200 transition-colors"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
                </svg>
              </a>
            </div>
          </div>
        </motion.div>

        {/* Related */}
        {otherPosts.length > 0 && (
          <div className="mt-16">
            <h3 className="text-xl font-bold text-dark mb-6">Continue Reading</h3>
            <div className="grid sm:grid-cols-2 gap-6">
              {otherPosts.map(p => (
                <Link key={p.slug} href={`/blog/${p.slug}`}>
                  <GlassCard className="p-6 group h-full" hover>
                    {p.tags?.[0] && <Badge variant="success" className="text-xs mb-3">{p.tags[0]}</Badge>}
                    <h4 className="font-bold text-dark group-hover:text-primary transition-colors mb-2">{p.title}</h4>
                    <p className="text-dark/50 text-sm line-clamp-2">{p.excerpt}</p>
                    <span className="text-primary text-sm font-medium mt-3 inline-flex items-center gap-1 group-hover:gap-2 transition-all">
                      Read More <ArrowRight size={12} />
                    </span>
                  </GlassCard>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>

      <Newsletter />
    </div>
  );
}
