import { Screen } from '../App';
import { ArrowLeft, MessageSquare, Heart, Users, TrendingUp, AlertCircle } from 'lucide-react';

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
      category: 'Tips'
    },
    {
      id: 2,
      user: 'Ahmad Razak',
      avatar: 'AR',
      time: '5h ago',
      content: 'Warning: Avoid accepting orders from Restaurant XYZ at Damansara. They always delay 30+ mins. Save your time!',
      likes: 89,
      comments: 23,
      category: 'Warning'
    },
    {
      id: 3,
      user: 'Lisa Tan',
      avatar: 'LT',
      time: '1d ago',
      content: 'Just reached Gold tier on RyScore! 🎉 The improved loan limit really helps during slow weeks. Keep grinding everyone!',
      likes: 134,
      comments: 31,
      category: 'Achievement'
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
    <div className="h-full flex flex-col bg-gradient-to-br from-purple-50 via-white to-blue-50 overflow-y-auto">
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-600 to-blue-600 px-6 py-6 rounded-b-3xl shadow-xl">
        <div className="flex items-center gap-4 mb-6">
          <button
            onClick={() => navigateTo('dashboard')}
            className="w-10 h-10 bg-white/20 backdrop-blur-xl rounded-full flex items-center justify-center"
          >
            <ArrowLeft className="w-5 h-5 text-white" />
          </button>
          <div>
            <h2 className="text-white">Community</h2>
            <p className="text-purple-200 text-sm">Gig Workers Support Hub</p>
          </div>
        </div>

        {/* Community Stats */}
        <div className="grid grid-cols-3 gap-3">
          <div className="bg-white/10 backdrop-blur-xl rounded-2xl p-3 border border-white/20 text-center">
            <div className="text-white text-2xl mb-1">12.5k</div>
            <p className="text-purple-200 text-xs">Members</p>
          </div>
          <div className="bg-white/10 backdrop-blur-xl rounded-2xl p-3 border border-white/20 text-center">
            <div className="text-white text-2xl mb-1">847</div>
            <p className="text-purple-200 text-xs">Posts Today</p>
          </div>
          <div className="bg-white/10 backdrop-blur-xl rounded-2xl p-3 border border-white/20 text-center">
            <div className="text-white text-2xl mb-1">RM 45k</div>
            <p className="text-purple-200 text-xs">Mutual Aid</p>
          </div>
        </div>
      </div>

      {/* Category Tabs */}
      <div className="px-6 py-4">
        <div className="flex gap-2 overflow-x-auto pb-2">
          {['All', 'Tips', 'Warnings', 'Achievements', 'Questions'].map((category) => (
            <button
              key={category}
              className={`px-4 py-2 rounded-full text-sm whitespace-nowrap ${
                category === 'All'
                  ? 'bg-purple-500 text-white'
                  : 'bg-white border border-gray-200 text-gray-700'
              }`}
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      {/* Posts Feed */}
      <div className="px-6 pb-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-gray-900">Community Feed</h3>
          <button className="text-purple-600 text-sm">+ New Post</button>
        </div>

        <div className="space-y-4">
          {posts.map((post) => (
            <div key={post.id} className="bg-white rounded-2xl p-5 shadow-lg border border-gray-100">
              {/* Post Header */}
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-blue-500 rounded-full flex items-center justify-center text-white">
                  {post.avatar}
                </div>
                <div className="flex-1">
                  <h4 className="text-gray-900">{post.user}</h4>
                  <p className="text-gray-500 text-xs">{post.time}</p>
                </div>
                <div className={`px-3 py-1 rounded-full text-xs ${
                  post.category === 'Tips' ? 'bg-blue-100 text-blue-700' :
                  post.category === 'Warning' ? 'bg-red-100 text-red-700' :
                  'bg-green-100 text-green-700'
                }`}>
                  {post.category}
                </div>
              </div>

              {/* Post Content */}
              <p className="text-gray-700 text-sm mb-4">{post.content}</p>

              {/* Post Actions */}
              <div className="flex items-center gap-6">
                <button className="flex items-center gap-2 text-gray-600">
                  <Heart className="w-5 h-5" />
                  <span className="text-sm">{post.likes}</span>
                </button>
                <button className="flex items-center gap-2 text-gray-600">
                  <MessageSquare className="w-5 h-5" />
                  <span className="text-sm">{post.comments}</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Mutual Aid Section */}
      <div className="px-6 pb-32">
        <div className="flex items-center gap-2 mb-4">
          <Users className="w-5 h-5 text-purple-600" />
          <h3 className="text-gray-900">Emergency Mutual Aid</h3>
        </div>

        <div className="space-y-4">
          {mutualAid.map((aid) => {
            const progress = (aid.raised / aid.amount) * 100;
            const isFunded = aid.raised >= aid.amount;

            return (
              <div key={aid.id} className={`rounded-2xl p-5 shadow-lg border ${
                isFunded 
                  ? 'bg-gradient-to-r from-green-100 to-emerald-100 border-green-200' 
                  : 'bg-white border-gray-100'
              }`}>
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 bg-gradient-to-br from-orange-500 to-red-500 rounded-full flex items-center justify-center text-white">
                    {aid.avatar}
                  </div>
                  <div className="flex-1">
                    <h4 className="text-gray-900">{aid.user}</h4>
                    {isFunded ? (
                      <p className="text-green-600 text-sm">✓ Fully funded!</p>
                    ) : (
                      <p className="text-gray-500 text-sm">{aid.timeLeft} left</p>
                    )}
                  </div>
                </div>

                <p className="text-gray-700 text-sm mb-4">{aid.need}</p>

                <div className="mb-3">
                  <div className="flex items-center justify-between mb-2 text-sm">
                    <span className="text-gray-600">RM {aid.raised} raised</span>
                    <span className="text-gray-600">of RM {aid.amount}</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className={`h-2 rounded-full ${
                        isFunded 
                          ? 'bg-gradient-to-r from-green-500 to-emerald-500' 
                          : 'bg-gradient-to-r from-orange-500 to-red-500'
                      }`}
                      style={{ width: `${Math.min(progress, 100)}%` }}
                    ></div>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-gray-600 text-sm">{aid.supporters} supporters</span>
                  {!isFunded && (
                    <button className="px-4 py-2 bg-gradient-to-r from-purple-500 to-blue-500 text-white rounded-full text-sm">
                      Support
                    </button>
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
