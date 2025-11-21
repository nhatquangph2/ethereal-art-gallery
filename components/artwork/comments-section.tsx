'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, Sparkles, Brain, Star, Send, ThumbsUp } from 'lucide-react';
import { toast } from 'sonner';
import type { Artwork, Comment, Reaction, ReactionType } from '@/types/artwork';
import { useAuth } from '@/lib/auth-context';

interface CommentsSectionProps {
  artwork: Artwork;
  onUpdate: (artwork: Artwork) => void;
}

const REACTIONS = [
  { type: 'love' as ReactionType, icon: Heart, label: 'Yêu thích', color: 'text-red-500' },
  { type: 'inspiring' as ReactionType, icon: Sparkles, label: 'Truyền cảm hứng', color: 'text-gold-leaf' },
  { type: 'thoughtful' as ReactionType, icon: Brain, label: 'Suy ngẫm', color: 'text-purple-500' },
  { type: 'beautiful' as ReactionType, icon: Star, label: 'Tuyệt đẹp', color: 'text-blue-500' },
];

export function CommentsSection({ artwork, onUpdate }: CommentsSectionProps) {
  const { user } = useAuth();
  const [commentText, setCommentText] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const comments = artwork.comments || [];
  const reactions = artwork.reactions || [];

  const handleReaction = (type: ReactionType) => {
    if (!user) {
      toast.error('Vui lòng đăng nhập để thả reaction!');
      return;
    }

    const existingReactionIndex = reactions.findIndex(r => r.type === type);
    let updatedReactions = [...reactions];

    if (existingReactionIndex >= 0) {
      const reaction = updatedReactions[existingReactionIndex];
      const userIndex = reaction.users?.indexOf(user.id) ?? -1;

      if (userIndex >= 0) {
        // Remove reaction
        if (reaction.users) {
          reaction.users.splice(userIndex, 1);
        }
        reaction.count = Math.max(0, reaction.count - 1);
        if (reaction.count === 0) {
          updatedReactions.splice(existingReactionIndex, 1);
        }
      } else {
        // Add reaction
        if (!reaction.users) {
          reaction.users = [];
        }
        reaction.users.push(user.id);
        reaction.count++;
      }
    } else {
      // Create new reaction
      updatedReactions.push({
        type,
        count: 1,
        users: [user.id],
      });
    }

    onUpdate({ ...artwork, reactions: updatedReactions });
  };

  const getUserReaction = (type: ReactionType): boolean => {
    if (!user) return false;
    const reaction = reactions.find(r => r.type === type);
    return reaction?.users?.includes(user.id) ?? false;
  };

  const getReactionCount = (type: ReactionType): number => {
    const reaction = reactions.find(r => r.type === type);
    return reaction ? reaction.count : 0;
  };

  const handleSubmitComment = async () => {
    if (!user) {
      toast.error('Vui lòng đăng nhập để bình luận!');
      return;
    }

    if (!commentText.trim()) {
      toast.error('Vui lòng nhập nội dung bình luận!');
      return;
    }

    setIsSubmitting(true);

    const newComment: Comment = {
      id: `comment_${Date.now()}`,
      userId: user.id,
      userName: user.name,
      userAvatar: user.avatar,
      text: commentText.trim(),
      createdAt: new Date().toISOString(),
      likes: 0,
      likedBy: [],
    };

    const updatedComments = [...comments, newComment];
    onUpdate({ ...artwork, comments: updatedComments });

    setCommentText('');
    setIsSubmitting(false);
    toast.success('Đã thêm bình luận!');
  };

  const handleLikeComment = (commentId: string) => {
    if (!user) {
      toast.error('Vui lòng đăng nhập để thích bình luận!');
      return;
    }

    const updatedComments = comments.map(comment => {
      if (comment.id === commentId) {
        const likedBy = [...comment.likedBy];
        const userIndex = likedBy.indexOf(user.id);

        if (userIndex >= 0) {
          // Unlike
          likedBy.splice(userIndex, 1);
          return { ...comment, likes: Math.max(0, comment.likes - 1), likedBy };
        } else {
          // Like
          likedBy.push(user.id);
          return { ...comment, likes: comment.likes + 1, likedBy };
        }
      }
      return comment;
    });

    onUpdate({ ...artwork, comments: updatedComments });
  };

  const isCommentLiked = (comment: Comment): boolean => {
    return user ? comment.likedBy.includes(user.id) : false;
  };

  return (
    <div className="space-y-6">
      {/* Reactions */}
      <div className="glass rounded-3xl p-6">
        <h3 className="font-display text-xl font-semibold text-stone-gray mb-4">
          Cảm nhận của bạn
        </h3>
        <div className="flex flex-wrap gap-3">
          {REACTIONS.map(({ type, icon: Icon, label, color }) => {
            const count = getReactionCount(type);
            const isActive = getUserReaction(type);

            return (
              <motion.button
                key={type}
                whileTap={{ scale: 0.95 }}
                onClick={() => handleReaction(type)}
                className={`flex items-center gap-2 rounded-xl px-4 py-3 transition-all ${
                  isActive
                    ? `bg-${color.replace('text-', '')}/20 ${color} border-2 border-current`
                    : 'glass hover:bg-white/40 text-stone-gray/60'
                }`}
              >
                <Icon className={`h-5 w-5 ${isActive ? color : ''}`} />
                <span className="text-sm font-semibold">{label}</span>
                {count > 0 && (
                  <span className="text-xs font-bold">{count}</span>
                )}
              </motion.button>
            );
          })}
        </div>
      </div>

      {/* Comments */}
      <div className="glass rounded-3xl p-6 space-y-6">
        <h3 className="font-display text-xl font-semibold text-stone-gray">
          Bình luận ({comments.length})
        </h3>

        {/* Add Comment Form */}
        {user ? (
          <div className="flex gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gold-leaf/20 text-sm font-semibold text-gold-leaf">
              {user.name.charAt(0).toUpperCase()}
            </div>
            <div className="flex-1 space-y-3">
              <textarea
                value={commentText}
                onChange={(e) => setCommentText(e.target.value)}
                placeholder="Chia sẻ cảm nhận của bạn..."
                rows={3}
                className="w-full rounded-2xl bg-white/30 px-4 py-3 text-sm text-stone-gray outline-none transition-all placeholder:text-stone-gray/50 focus:bg-white/40"
              />
              <motion.button
                whileTap={{ scale: 0.95 }}
                onClick={handleSubmitComment}
                disabled={isSubmitting || !commentText.trim()}
                className="flex items-center gap-2 rounded-xl bg-gold-leaf px-4 py-2 text-sm font-semibold text-white transition-all hover:bg-gold-leaf/90 disabled:opacity-50"
              >
                <Send className="h-4 w-4" />
                Gửi bình luận
              </motion.button>
            </div>
          </div>
        ) : (
          <div className="rounded-2xl bg-white/20 p-4 text-center text-sm text-stone-gray/60">
            Vui lòng <a href="/login" className="text-gold-leaf hover:underline">đăng nhập</a> để bình luận
          </div>
        )}

        {/* Comments List */}
        <AnimatePresence>
          {comments.length === 0 ? (
            <div className="py-8 text-center text-stone-gray/60">
              Chưa có bình luận nào. Hãy là người đầu tiên!
            </div>
          ) : (
            <div className="space-y-4">
              {comments.map((comment, index) => (
                <motion.div
                  key={comment.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className="flex gap-3 rounded-2xl bg-white/20 p-4"
                >
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-purple-500/20 text-sm font-semibold text-purple-500">
                    {comment.userName.charAt(0).toUpperCase()}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-semibold text-stone-gray">{comment.userName}</p>
                        <p className="text-xs text-stone-gray/50">
                          {new Date(comment.createdAt).toLocaleDateString('vi-VN', {
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric',
                            hour: '2-digit',
                            minute: '2-digit',
                          })}
                        </p>
                      </div>
                      <motion.button
                        whileTap={{ scale: 0.9 }}
                        onClick={() => handleLikeComment(comment.id)}
                        className={`flex items-center gap-1 rounded-lg px-3 py-1 transition-all ${
                          isCommentLiked(comment)
                            ? 'bg-red-500/20 text-red-500'
                            : 'bg-white/20 text-stone-gray/60 hover:bg-white/30'
                        }`}
                      >
                        <ThumbsUp className="h-4 w-4" />
                        {comment.likes > 0 && (
                          <span className="text-xs font-semibold">{comment.likes}</span>
                        )}
                      </motion.button>
                    </div>
                    <p className="mt-2 text-sm text-stone-gray">{comment.text}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
