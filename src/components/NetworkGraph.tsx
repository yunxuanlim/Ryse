// ============================================
// NetworkGraph - Community Visualization
// Project Obsidian - Mutual Aid Network
// PRD Section 2.3 - The Community Ecosystem
// ============================================

import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Heart, Users, ChevronRight } from 'lucide-react';

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

interface Node {
  id: string;
  name: string;
  avatar: string;
  x: number;
  y: number;
  isUser?: boolean;
  status?: 'requesting' | 'supporting' | 'neutral';
}

interface Connection {
  from: string;
  to: string;
  active: boolean;
}

interface NetworkGraphProps {
  currentUserId?: string;
  onNodeClick?: (nodeId: string) => void;
  onSupportClick?: (nodeId: string) => void;
  showParticles?: boolean;
}

export function NetworkGraph({
  currentUserId = 'user',
  onNodeClick,
  onSupportClick,
  showParticles = true,
}: NetworkGraphProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [hoveredNode, setHoveredNode] = useState<string | null>(null);
  const [activeSupport, setActiveSupport] = useState<string | null>(null);
  const animationRef = useRef<number>();

  // Sample network data
  const [nodes] = useState<Node[]>([
    { id: 'user', name: 'You', avatar: '👤', x: 200, y: 200, isUser: true },
    { id: 'ahmad', name: 'Ahmad', avatar: '🚗', x: 120, y: 100, status: 'requesting' },
    { id: 'sarah', name: 'Sarah', avatar: '🐼', x: 280, y: 80, status: 'neutral' },
    { id: 'raj', name: 'Raj', avatar: '🛵', x: 320, y: 180, status: 'supporting' },
    { id: 'mei', name: 'Mei', avatar: '🚚', x: 280, y: 300, status: 'neutral' },
    { id: 'ali', name: 'Ali', avatar: '📦', x: 120, y: 280, status: 'neutral' },
    { id: 'lina', name: 'Lina', avatar: '🛒', x: 80, y: 180, status: 'supporting' },
  ]);

  const [connections] = useState<Connection[]>([
    { from: 'user', to: 'ahmad', active: true },
    { from: 'user', to: 'sarah', active: false },
    { from: 'user', to: 'raj', active: true },
    { from: 'user', to: 'mei', active: false },
    { from: 'user', to: 'ali', active: false },
    { from: 'user', to: 'lina', active: true },
    { from: 'ahmad', to: 'sarah', active: false },
    { from: 'raj', to: 'mei', active: false },
  ]);

  // Particle animation for active connections
  useEffect(() => {
    if (!showParticles || !canvasRef.current) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    interface Particle {
      x: number;
      y: number;
      progress: number;
      connection: Connection;
      speed: number;
    }

    const particles: Particle[] = [];
    const activeConnections = connections.filter(c => c.active);

    // Initialize particles
    activeConnections.forEach(conn => {
      particles.push({
        x: 0,
        y: 0,
        progress: Math.random(),
        connection: conn,
        speed: 0.005 + Math.random() * 0.005,
      });
    });

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Draw connections
      connections.forEach(conn => {
        const fromNode = nodes.find(n => n.id === conn.from);
        const toNode = nodes.find(n => n.id === conn.to);
        if (!fromNode || !toNode) return;

        ctx.beginPath();
        ctx.moveTo(fromNode.x, fromNode.y);
        ctx.lineTo(toNode.x, toNode.y);
        ctx.strokeStyle = conn.active 
          ? `${COLORS.neonPrimary}60` 
          : `${COLORS.whiteHigh}20`;
        ctx.lineWidth = conn.active ? 2 : 1;
        ctx.stroke();
      });

      // Animate particles
      particles.forEach(p => {
        const fromNode = nodes.find(n => n.id === p.connection.from);
        const toNode = nodes.find(n => n.id === p.connection.to);
        if (!fromNode || !toNode) return;

        p.progress += p.speed;
        if (p.progress > 1) p.progress = 0;

        p.x = fromNode.x + (toNode.x - fromNode.x) * p.progress;
        p.y = fromNode.y + (toNode.y - fromNode.y) * p.progress;

        // Draw particle
        ctx.beginPath();
        ctx.arc(p.x, p.y, 3, 0, Math.PI * 2);
        ctx.fillStyle = COLORS.neonPrimary;
        ctx.fill();

        // Glow effect
        const gradient = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, 10);
        gradient.addColorStop(0, `${COLORS.neonPrimary}60`);
        gradient.addColorStop(1, 'transparent');
        ctx.fillStyle = gradient;
        ctx.fillRect(p.x - 10, p.y - 10, 20, 20);
      });

      animationRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      if (animationRef.current) cancelAnimationFrame(animationRef.current);
    };
  }, [showParticles, connections, nodes]);

  const handleSupportNode = useCallback((nodeId: string) => {
    setActiveSupport(nodeId);
    onSupportClick?.(nodeId);
    
    // Simulate particle flow animation
    setTimeout(() => setActiveSupport(null), 2000);
  }, [onSupportClick]);

  return (
    <div 
      className="relative rounded-3xl overflow-hidden"
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
            <Users className="w-5 h-5" style={{ color: COLORS.neonPrimary }} />
          </div>
          <div>
            <h3 className="font-semibold" style={{ color: COLORS.whiteHigh }}>
              Community Network
            </h3>
            <p className="text-xs" style={{ color: COLORS.whiteLow }}>
              12.5k members connected
            </p>
          </div>
        </div>
        <button 
          className="text-sm flex items-center gap-1"
          style={{ color: COLORS.neonPrimary }}
        >
          View All <ChevronRight className="w-4 h-4" />
        </button>
      </div>

      {/* Network Visualization */}
      <div className="relative h-80">
        <canvas
          ref={canvasRef}
          width={400}
          height={320}
          className="absolute inset-0"
        />

        {/* Node Elements */}
        {nodes.map((node) => (
          <button
            key={node.id}
            className={`absolute w-12 h-12 rounded-full flex items-center justify-center transition-all duration-200 ${
              hoveredNode === node.id ? 'scale-125 z-20' : 'z-10'
            }`}
            style={{
              left: node.x - 24,
              top: node.y - 24,
              backgroundColor: node.isUser 
                ? COLORS.neonPrimary 
                : node.status === 'requesting' 
                  ? `${COLORS.whiteHigh}20`
                  : COLORS.obsidian100,
              border: `2px solid ${
                node.status === 'requesting' 
                  ? COLORS.whiteHigh 
                  : node.status === 'supporting' 
                    ? COLORS.neonPrimary 
                    : COLORS.neonDim
              }`,
              boxShadow: node.isUser || hoveredNode === node.id
                ? `0 0 20px ${COLORS.neonPrimary}60`
                : 'none',
            }}
            onMouseEnter={() => setHoveredNode(node.id)}
            onMouseLeave={() => setHoveredNode(null)}
            onClick={() => onNodeClick?.(node.id)}
          >
            <span className="text-xl">{node.avatar}</span>
            
            {/* Name tooltip */}
            {hoveredNode === node.id && (
              <div 
                className="absolute -bottom-8 px-2 py-1 rounded-lg text-xs whitespace-nowrap"
                style={{ 
                  backgroundColor: COLORS.obsidian100,
                  color: COLORS.whiteHigh,
                }}
              >
                {node.name}
              </div>
            )}

            {/* Requesting indicator */}
            {node.status === 'requesting' && (
              <div 
                className="absolute -top-1 -right-1 w-4 h-4 rounded-full animate-pulse"
                style={{ backgroundColor: '#FF4444' }}
              />
            )}
          </button>
        ))}
      </div>

      {/* Active Request Card */}
      {nodes.find(n => n.status === 'requesting') && (
        <div 
          className="mx-4 mb-4 p-4 rounded-2xl"
          style={{ 
            backgroundColor: COLORS.obsidian100,
            border: `1px solid ${COLORS.whiteHigh}30`,
          }}
        >
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 rounded-full flex items-center justify-center text-xl"
              style={{ backgroundColor: `${COLORS.whiteHigh}10` }}
            >
              🚗
            </div>
            <div className="flex-1">
              <p className="font-medium" style={{ color: COLORS.whiteHigh }}>
                Ahmad needs help
              </p>
              <p className="text-xs" style={{ color: COLORS.whiteLow }}>
                Bike broke down - RM 150 needed
              </p>
            </div>
          </div>

          {/* Progress bar */}
          <div className="mb-3">
            <div className="flex justify-between text-xs mb-1">
              <span style={{ color: COLORS.whiteLow }}>RM 120 raised</span>
              <span style={{ color: COLORS.whiteHigh }}>RM 150 goal</span>
            </div>
            <div 
              className="h-2 rounded-full overflow-hidden"
              style={{ backgroundColor: COLORS.obsidian200 }}
            >
              <div 
                className="h-full rounded-full transition-all duration-500"
                style={{ 
                  width: '80%',
                  backgroundColor: COLORS.neonPrimary,
                  boxShadow: `0 0 10px ${COLORS.neonPrimary}`,
                }}
              />
            </div>
          </div>

          <button
            onClick={() => handleSupportNode('ahmad')}
            className={`w-full py-3 rounded-xl font-medium flex items-center justify-center gap-2 transition-all ${
              activeSupport === 'ahmad' ? 'animate-pulse' : ''
            }`}
            style={{ 
              backgroundColor: COLORS.neonPrimary,
              color: COLORS.obsidian100,
            }}
          >
            <Heart className="w-4 h-4" />
            {activeSupport === 'ahmad' ? 'Sending support...' : 'Support Ahmad'}
          </button>

          <p className="text-center text-xs mt-2" style={{ color: COLORS.whiteLow }}>
            12 supporters • 2 hours left
          </p>
        </div>
      )}
    </div>
  );
}

export default NetworkGraph;

