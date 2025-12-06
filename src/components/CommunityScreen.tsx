// ============================================
// Community Screen - OBSIDIAN Neon-Noir Design
// Network visualization with neon accents
// ============================================

import { Screen } from '../App';
import { ArrowLeft, MessageSquare, Heart, Users, Plus, CheckCircle } from 'lucide-react';
import { PillButton } from './ui/pill-button';

interface CommunityScreenProps {
  navigateTo: (screen: Screen) => void;
}

export function CommunityScreen({ navigateTo }: CommunityScreenProps) {
  const posts = [
    {
      id: 1,
      user: 'Sarah Khan',
      avatar: 'SK',
      time: '2h ago',
      content: 'Pro tip: Friday nights 7-10pm are the golden hours for Grab! Easily make RM 80-100/hour. Anyone else noticed this?',
      likes: 47,
      comments: 12,
      category: 'Tips',
      emoji: '💡'
    },
    {
      id: 2,
      user: 'Ahmad Razak',
      avatar: 'AR',
      time: '5h ago',
      content: 'Warning: Avoid accepting orders from Restaurant XYZ at Damansara. They always delay 30+ mins. Save your time!',
      likes: 89,
      comments: 23,
      category: 'Warning',
      emoji: '⚠️'
    },
    {
      id: 3,
      user: 'Lisa Tan',
      avatar: 'LT',
      time: '1d ago',
      content: 'Just reached Gold tier on RyScore! 🎉 The improved loan limit really helps during slow weeks. Keep grinding everyone!',
      likes: 134,
      comments: 31,
      category: 'Achievement',
      emoji: '🏆'
    }
  ];

  const mutualAid = [
    {
      id: 1,
      user: 'David Wong',
      avatar: 'DW',
      need: 'My bike broke down, need RM 200 urgently for repairs',
      amount: 200,
      raised: 150,
      supporters: 12,
      timeLeft: '2 days'
    },
    {
      id: 2,
      user: 'Nurul Aina',
      avatar: 'NA',
      need: 'Phone screen cracked, need RM 150 to continue working',
      amount: 150,
      raised: 150,
      supporters: 8,
      timeLeft: 'Funded!'
    }
  ];

  return (
    <div className="h-full flex flex-col bg-obsidian-100 overflow-y-auto scrollbar-obsidian">
      {/* Header */}
      <div className="bg-obsidian-200 px-6 py-4 border-b" style={{ borderColor: 'var(--white-divider)' }}>
        <div className="flex items-center gap-4">
          <button
            onClick={() => navigateTo('dashboard')}
            className="w-10 h-10 rounded-full flex items-center justify-center hover:bg-obsidian-300 transition-colors"
          >
            <ArrowLeft className="w-6 h-6 text-white-high" />
          </button>
          <div className="flex-1">
            <h2 className="text-xl font-bold text-white-high">Gig Squad</h2>
            <p className="text-white-low text-sm">12.5k Members</p>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-full flex items-center justify-center bg-obsidian-300">
              <Users className="w-5 h-5 text-neon" />
            </div>
          </div>
        </div>
      </div>

      {/* Network Stats */}
      <div className="px-4 pt-4">
        <div className="card-neon-border flex items-center justify-around py-3">
          <div className="text-center">
            <p className="text-neon text-2xl font-bold font-mono-nums">12.5k</p>
            <p className="text-white-low text-xs">Members</p>
          </div>
          <div className="w-px h-10 bg-white-divider" />
          <div className="text-center">
            <p className="text-neon text-2xl font-bold font-mono-nums">RM 45k</p>
            <p className="text-white-low text-xs">Pooled Aid</p>
          </div>
          <div className="w-px h-10 bg-white-divider" />
          <div className="text-center">
            <p className="text-neon text-2xl font-bold font-mono-nums">89</p>
            <p className="text-white-low text-xs">Helped</p>
          </div>
        </div>
      </div>

      {/* Mutual Aid Section */}
      <div className="px-4 pt-4">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-white-high font-semibold">Mutual Aid</h3>
          <button className="text-neon text-sm font-medium">See all</button>
        </div>

        <div className="space-y-3">
          {mutualAid.map((aid) => {
            const progress = (aid.raised / aid.amount) * 100;
            const isFunded = aid.raised >= aid.amount;

            return (
              <div key={aid.id} className="card-obsidian">
                <div className="flex items-start gap-3 mb-3">
                  <div className="w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold bg-obsidian-300 text-white-high border" style={{ borderColor: 'var(--neon-dim)' }}>
                    {aid.avatar}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <span className="text-white-high font-medium">{aid.user}</span>
                      {isFunded && <CheckCircle className="w-4 h-4 text-neon" />}
                    </div>
                    <p className="text-white-low text-sm mt-1">{aid.need}</p>
                  </div>
                </div>

                <div className="mb-3">
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-white-low">RM {aid.raised} of RM {aid.amount}</span>
                    <span className={isFunded ? 'text-neon' : 'text-white-muted'}>{aid.timeLeft}</span>
                  </div>
                  <div className="w-full bg-obsidian-300 rounded-full h-2">
                    <div 
                      className={`h-2 rounded-full transition-all duration-500 ${isFunded ? 'glow-neon-sm' : ''}`}
                      style={{ width: `${progress}%`, backgroundColor: 'var(--neon-primary)' }}
                    />
                  </div>
                </div>

                {!isFunded && (
                  <PillButton variant="outline" size="sm" className="w-full">
                    <Plus className="w-4 h-4 mr-1" />
                    Contribute
                  </PillButton>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Community Posts */}
      <div className="px-4 pt-4 pb-24">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-white-high font-semibold">Community Feed</h3>
          <button className="text-neon text-sm font-medium">New Post</button>
        </div>

        <div className="space-y-3">
          {posts.map((post) => (
            <div key={post.id} className="card-obsidian">
              <div className="flex items-start gap-3 mb-3">
                <div className="w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold bg-neon text-obsidian-100">
                  {post.avatar}
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <span className="text-white-high font-medium">{post.user}</span>
                    <span className="text-white-muted text-xs">{post.time}</span>
                  </div>
                  <div className="flex items-center gap-1 mt-0.5">
                    <span className="text-sm">{post.emoji}</span>
                    <span className="text-neon text-xs font-medium">{post.category}</span>
                  </div>
                </div>
              </div>

              <p className="text-white-med text-sm mb-4">{post.content}</p>

              <div className="flex items-center gap-4">
                <button className="flex items-center gap-2 text-white-low hover:text-neon transition-colors">
                  <Heart className="w-4 h-4" />
                  <span className="text-sm">{post.likes}</span>
                </button>
                <button className="flex items-center gap-2 text-white-low hover:text-neon transition-colors">
                  <MessageSquare className="w-4 h-4" />
                  <span className="text-sm">{post.comments}</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
