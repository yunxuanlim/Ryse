// ============================================
// Community Screen - Cash App Inspired
// Clean white cards, black accents
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
    <div className="h-full flex flex-col bg-gray-50 overflow-y-auto">
      {/* Header */}
      <div className="bg-white px-6 py-4 border-b border-gray-100">
        <div className="flex items-center gap-4">
          <button
            onClick={() => navigateTo('dashboard')}
            className="w-10 h-10 rounded-full flex items-center justify-center hover:bg-gray-100 transition-colors"
          >
            <ArrowLeft className="w-6 h-6 text-black" />
          </button>
          <div className="flex-1">
            <h2 className="text-xl font-bold text-gray-900">Community</h2>
            <p className="text-gray-500 text-sm">Gig Workers Support Hub</p>
          </div>
          <div 
            className="w-10 h-10 rounded-full flex items-center justify-center"
            style={{ backgroundColor: 'var(--ryse-green, #B9FF00)' }}
          >
            <Users className="w-5 h-5 text-black" />
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="px-4 pt-4">
        <div className="bg-white rounded-3xl p-4 shadow-sm">
          <div className="grid grid-cols-3 gap-3">
            <div className="text-center">
              <div className="text-2xl font-bold text-gray-900">12.5k</div>
              <p className="text-gray-500 text-xs">Members</p>
            </div>
            <div className="text-center border-x border-gray-100">
              <div className="text-2xl font-bold text-gray-900">847</div>
              <p className="text-gray-500 text-xs">Posts Today</p>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-gray-900">RM 45k</div>
              <p className="text-gray-500 text-xs">Mutual Aid</p>
            </div>
          </div>
        </div>
      </div>

      {/* Category Tabs */}
      <div className="px-4 py-4">
        <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
          {['All', 'Tips', 'Warnings', 'Achievements', 'Questions'].map((category, i) => (
            <button
              key={category}
              className={`px-4 py-2 rounded-full text-sm whitespace-nowrap transition-colors ${
                i === 0
                  ? 'bg-black text-white'
                  : 'bg-white border border-gray-200 text-gray-700 hover:bg-gray-50'
              }`}
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      {/* Posts Feed */}
      <div className="px-4 pb-4">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-gray-900 font-semibold">Community Feed</h3>
          <button className="flex items-center gap-1 text-black text-sm font-medium">
            <Plus className="w-4 h-4" /> New Post
          </button>
        </div>

        <div className="space-y-3">
          {posts.map((post) => (
            <div key={post.id} className="bg-white rounded-2xl p-4 shadow-sm">
              {/* Post Header */}
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center text-gray-700 font-medium">
                  {post.avatar}
                </div>
                <div className="flex-1">
                  <h4 className="text-gray-900 font-medium">{post.user}</h4>
                  <p className="text-gray-400 text-xs">{post.time}</p>
                </div>
                <div className={`px-3 py-1 rounded-full text-xs font-medium flex items-center gap-1 ${
                  post.category === 'Tips' ? 'bg-blue-50 text-blue-700' :
                  post.category === 'Warning' ? 'bg-red-50 text-red-700' :
                  'bg-green-50 text-green-700'
                }`}>
                  <span>{post.emoji}</span>
                  {post.category}
                </div>
              </div>

              {/* Post Content */}
              <p className="text-gray-700 text-sm mb-4 leading-relaxed">{post.content}</p>

              {/* Post Actions */}
              <div className="flex items-center gap-6">
                <button className="flex items-center gap-2 text-gray-500 hover:text-red-500 transition-colors">
                  <Heart className="w-5 h-5" />
                  <span className="text-sm">{post.likes}</span>
                </button>
                <button className="flex items-center gap-2 text-gray-500 hover:text-blue-500 transition-colors">
                  <MessageSquare className="w-5 h-5" />
                  <span className="text-sm">{post.comments}</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Mutual Aid Section */}
      <div className="px-4 pb-24">
        <div className="flex items-center gap-2 mb-3">
          <span className="text-xl">🤝</span>
          <h3 className="text-gray-900 font-semibold">Emergency Mutual Aid</h3>
        </div>

        <div className="space-y-3">
          {mutualAid.map((aid) => {
            const progress = (aid.raised / aid.amount) * 100;
            const isFunded = aid.raised >= aid.amount;

            return (
              <div key={aid.id} className={`rounded-2xl p-4 shadow-sm ${
                isFunded ? 'bg-green-50 border border-green-100' : 'bg-white'
              }`}>
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center text-gray-700 font-medium">
                    {aid.avatar}
                  </div>
                  <div className="flex-1">
                    <h4 className="text-gray-900 font-medium">{aid.user}</h4>
                    {isFunded ? (
                      <p className="text-green-600 text-sm flex items-center gap-1">
                        <CheckCircle className="w-3 h-3" /> Fully funded!
                      </p>
                    ) : (
                      <p className="text-gray-500 text-sm">{aid.timeLeft} left</p>
                    )}
                  </div>
                </div>

                <p className="text-gray-700 text-sm mb-4">{aid.need}</p>

                <div className="mb-3">
                  <div className="flex items-center justify-between mb-2 text-sm">
                    <span className="text-gray-600 font-medium">RM {aid.raised} raised</span>
                    <span className="text-gray-400">of RM {aid.amount}</span>
                  </div>
                  <div className="w-full bg-gray-100 rounded-full h-2">
                    <div 
                      className={`h-2 rounded-full transition-all ${
                        isFunded ? 'bg-green-500' : 'bg-black'
                      }`}
                      style={{ width: `${Math.min(progress, 100)}%` }}
                    />
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-gray-500 text-sm">{aid.supporters} supporters</span>
                  {!isFunded && (
                    <PillButton variant="primary" size="sm">
                      Support
                    </PillButton>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
