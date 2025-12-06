// ============================================
// OrbitalSavings - Gamified Savings Rings
// Project Obsidian - Goals as Orbital Rings
// PRD Section 2.4 - The Savings & Goals Interface
// ============================================

import React, { useState, useEffect, useRef } from 'react';
import { Target, Trophy, Sparkles, ChevronRight, Plus } from 'lucide-react';

// Obsidian Theme Colors
const COLORS = {
  obsidian100: '#060606',
  obsidian200: '#121212',
  neonPrimary: '#39FF14',
  neonDim: '#1B7A0F',
  whiteHigh: '#FFFFFF',
  whiteMedium: 'rgba(255,255,255,0.87)',
  whiteLow: 'rgba(255,255,255,0.60)',
};

interface SavingsGoal {
  id: string;
  name: string;
  icon: string;
  target: number;
  current: number;
  streak: number;
  color: string;
  isCompleted?: boolean;
}

interface OrbitalSavingsProps {
  goals?: SavingsGoal[];
  onGoalClick?: (goalId: string) => void;
  onAddGoal?: () => void;
  userName?: string;
}

export function OrbitalSavings({
  goals: initialGoals,
  onGoalClick,
  onAddGoal,
  userName = 'You',
}: OrbitalSavingsProps) {
  const [goals, setGoals] = useState<SavingsGoal[]>(initialGoals || [
    { id: '1', name: 'Emergency Fund', icon: '🛡️', target: 1000, current: 750, streak: 47, color: COLORS.neonPrimary },
    { id: '2', name: 'New Phone', icon: '📱', target: 2500, current: 1200, streak: 23, color: '#00BFFF' },
    { id: '3', name: 'Vacation', icon: '✈️', target: 5000, current: 850, streak: 12, color: '#FF6B6B' },
  ]);
  
  const [selectedGoal, setSelectedGoal] = useState<string | null>(null);
  const [showSupernova, setShowSupernova] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number>();

  // Calculate total stats
  const totalSaved = goals.reduce((sum, g) => sum + g.current, 0);
  const totalTarget = goals.reduce((sum, g) => sum + g.target, 0);

  // Orbital animation
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;
    let angle = 0;

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      angle += 0.005;

      // Draw orbital rings for each goal
      goals.forEach((goal, i) => {
        const radius = 60 + i * 35;
        const progress = goal.current / goal.target;
        
        // Background ring
        ctx.beginPath();
        ctx.arc(centerX, centerY, radius, 0, Math.PI * 2);
        ctx.strokeStyle = `${goal.color}20`;
        ctx.lineWidth = 8;
        ctx.stroke();

        // Progress ring
        ctx.beginPath();
        ctx.arc(centerX, centerY, radius, -Math.PI / 2, -Math.PI / 2 + (Math.PI * 2 * progress));
        ctx.strokeStyle = goal.color;
        ctx.lineWidth = 8;
        ctx.lineCap = 'round';
        ctx.stroke();

        // Add glow
        ctx.shadowColor = goal.color;
        ctx.shadowBlur = 10;
        ctx.stroke();
        ctx.shadowBlur = 0;

        // Orbiting indicator
        const indicatorAngle = angle + i * 0.5;
        const indicatorX = centerX + Math.cos(indicatorAngle) * radius;
        const indicatorY = centerY + Math.sin(indicatorAngle) * radius;

        ctx.beginPath();
        ctx.arc(indicatorX, indicatorY, 6, 0, Math.PI * 2);
        ctx.fillStyle = goal.color;
        ctx.fill();
        ctx.shadowColor = goal.color;
        ctx.shadowBlur = 15;
        ctx.fill();
        ctx.shadowBlur = 0;
      });

      // Draw center avatar
      ctx.beginPath();
      ctx.arc(centerX, centerY, 35, 0, Math.PI * 2);
      ctx.fillStyle = COLORS.obsidian200;
      ctx.fill();
      ctx.strokeStyle = COLORS.neonPrimary;
      ctx.lineWidth = 2;
      ctx.stroke();

      animationRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      if (animationRef.current) cancelAnimationFrame(animationRef.current);
    };
  }, [goals]);

  // Handle goal completion (supernova effect)
  const completeGoal = (goalId: string) => {
    setShowSupernova(true);
    
    setTimeout(() => {
      setGoals(prev => prev.map(g => 
        g.id === goalId ? { ...g, isCompleted: true } : g
      ));
      setShowSupernova(false);
    }, 1500);
  };

  return (
    <div 
      className="rounded-3xl overflow-hidden"
      style={{ 
        backgroundColor: COLORS.obsidian200,
        border: `1px solid ${COLORS.neonDim}`,
      }}
    >
      {/* Header */}
      <div className="p-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div 
            className="w-10 h-10 rounded-xl flex items-center justify-center"
            style={{ backgroundColor: `${COLORS.neonPrimary}20` }}
          >
            <Target className="w-5 h-5" style={{ color: COLORS.neonPrimary }} />
          </div>
          <div>
            <h3 className="font-semibold" style={{ color: COLORS.whiteHigh }}>
              Savings Goals
            </h3>
            <p className="text-xs" style={{ color: COLORS.whiteLow }}>
              RM {totalSaved.toLocaleString()} of RM {totalTarget.toLocaleString()}
            </p>
          </div>
        </div>
        <button
          onClick={onAddGoal}
          className="w-8 h-8 rounded-full flex items-center justify-center"
          style={{ backgroundColor: COLORS.obsidian100 }}
        >
          <Plus className="w-4 h-4" style={{ color: COLORS.neonPrimary }} />
        </button>
      </div>

      {/* Orbital Visualization */}
      <div className="relative h-72 flex items-center justify-center">
        <canvas
          ref={canvasRef}
          width={300}
          height={280}
          className="absolute"
        />

        {/* Center Avatar */}
        <div 
          className="relative z-10 w-16 h-16 rounded-full flex items-center justify-center text-2xl"
          style={{ backgroundColor: COLORS.obsidian100 }}
        >
          👤
        </div>

        {/* Supernova Effect */}
        {showSupernova && (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="animate-supernova">
              {[...Array(12)].map((_, i) => (
                <Sparkles
                  key={i}
                  className="absolute w-6 h-6"
                  style={{
                    color: COLORS.neonPrimary,
                    transform: `rotate(${i * 30}deg) translateY(-80px)`,
                    animation: `confetti 1.5s ease-out forwards`,
                    animationDelay: `${i * 0.05}s`,
                  }}
                />
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Legend */}
      <div className="px-4 pb-2 flex justify-center gap-4">
        {goals.map((goal) => (
          <div key={goal.id} className="flex items-center gap-1">
            <div 
              className="w-3 h-3 rounded-full"
              style={{ backgroundColor: goal.color }}
            />
            <span className="text-xs" style={{ color: COLORS.whiteLow }}>
              {goal.icon}
            </span>
          </div>
        ))}
      </div>

      {/* Goals List */}
      <div className="p-4 space-y-3">
        {goals.map((goal) => {
          const progress = (goal.current / goal.target) * 100;
          
          return (
            <button
              key={goal.id}
              onClick={() => {
                setSelectedGoal(goal.id);
                onGoalClick?.(goal.id);
              }}
              className={`w-full p-4 rounded-2xl transition-all ${
                selectedGoal === goal.id ? 'scale-[1.02]' : ''
              }`}
              style={{ 
                backgroundColor: COLORS.obsidian100,
                border: selectedGoal === goal.id 
                  ? `1px solid ${goal.color}` 
                  : '1px solid transparent',
              }}
            >
              <div className="flex items-center gap-3">
                {/* Icon */}
                <div 
                  className="w-12 h-12 rounded-xl flex items-center justify-center text-xl"
                  style={{ backgroundColor: `${goal.color}20` }}
                >
                  {goal.icon}
                </div>

                {/* Info */}
                <div className="flex-1 text-left">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-medium" style={{ color: COLORS.whiteHigh }}>
                      {goal.name}
                    </span>
                    {goal.isCompleted && (
                      <Trophy className="w-4 h-4" style={{ color: '#FFD700' }} />
                    )}
                  </div>
                  
                  {/* Progress bar */}
                  <div 
                    className="h-1.5 rounded-full overflow-hidden mb-1"
                    style={{ backgroundColor: COLORS.obsidian200 }}
                  >
                    <div 
                      className="h-full rounded-full transition-all duration-500"
                      style={{ 
                        width: `${Math.min(progress, 100)}%`,
                        backgroundColor: goal.color,
                      }}
                    />
                  </div>
                  
                  <div className="flex justify-between text-xs">
                    <span style={{ color: COLORS.whiteLow }}>
                      RM {goal.current.toLocaleString()} / RM {goal.target.toLocaleString()}
                    </span>
                    <span style={{ color: goal.color }}>
                      {progress.toFixed(0)}%
                    </span>
                  </div>
                </div>

                {/* Streak */}
                <div className="text-center">
                  <div 
                    className="text-lg font-bold"
                    style={{ color: COLORS.neonPrimary }}
                  >
                    {goal.streak}
                  </div>
                  <div className="text-xs" style={{ color: COLORS.whiteLow }}>
                    day streak
                  </div>
                </div>

                <ChevronRight className="w-5 h-5" style={{ color: COLORS.whiteLow }} />
              </div>
            </button>
          );
        })}
      </div>

      {/* Quick Add Button */}
      <div className="p-4 pt-0">
        <button
          onClick={onAddGoal}
          className="w-full py-3 rounded-xl font-medium flex items-center justify-center gap-2"
          style={{ 
            backgroundColor: `${COLORS.neonPrimary}15`,
            color: COLORS.neonPrimary,
            border: `1px dashed ${COLORS.neonDim}`,
          }}
        >
          <Plus className="w-4 h-4" />
          Add New Goal
        </button>
      </div>

      {/* Animation Styles */}
      <style>{`
        @keyframes supernova {
          0% { transform: scale(1); opacity: 1; }
          50% { transform: scale(0.2); opacity: 1; }
          100% { transform: scale(3); opacity: 0; }
        }
        .animate-supernova {
          animation: supernova 1.5s ease-out forwards;
        }
        @keyframes confetti {
          0% { transform: rotate(var(--rotation)) translateY(-80px) scale(1); opacity: 1; }
          100% { transform: rotate(var(--rotation)) translateY(-150px) scale(0); opacity: 0; }
        }
      `}</style>
    </div>
  );
}

// Compact streak display
export function SavingsStreak({ streak, goal }: { streak: number; goal: string }) {
  return (
    <div 
      className="flex items-center gap-3 p-3 rounded-2xl"
      style={{ backgroundColor: COLORS.obsidian200 }}
    >
      <div 
        className="w-10 h-10 rounded-xl flex items-center justify-center"
        style={{ backgroundColor: `${COLORS.neonPrimary}20` }}
      >
        🔥
      </div>
      <div className="flex-1">
        <p className="text-sm" style={{ color: COLORS.whiteLow }}>{goal}</p>
        <p className="font-bold" style={{ color: COLORS.neonPrimary }}>
          {streak} day streak!
        </p>
      </div>
      <Sparkles className="w-5 h-5" style={{ color: COLORS.neonPrimary }} />
    </div>
  );
}

export default OrbitalSavings;

