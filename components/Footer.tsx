'use client';

import { motion } from 'framer-motion';
import { Droplet } from 'lucide-react';

interface FooterProps {
  darkMode: boolean;
}

export default function Footer({ darkMode }: FooterProps) {
  // 获取今日日期和当前时间
  const today = new Date();
  const dateStr = `${today.getFullYear()}年${today.getMonth() + 1}月${today.getDate()}日`;
  const hour = today.getHours();

  // 根据时间和模式显示不同的提示
  const getWaterProgress = () => {
    if (hour < 12) return { current: 1, total: 4, emoji: '💧' };
    if (hour < 15) return { current: 2, total: 4, emoji: '💧💧' };
    if (hour < 18) return { current: 3, total: 4, emoji: '💧💧💧' };
    return { current: 4, total: 4, emoji: '💧💧💧💧' };
  };

  const { current, total, emoji } = getWaterProgress();
  const percentage = (current / total) * 100;

  return (
    <footer className={`fixed bottom-0 left-0 right-0 z-30 transition-all ${
      darkMode ? 'bg-[#0a0a0a]/95 border-t border-blue-900/30' : 'bg-[#0a0a0a]/95 border-t border-[#222]'
    }`}>
      <div className="max-w-7xl mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          {/* 左侧：日期 */}
          <div className="text-xs text-gray-600 font-mono">
            {dateStr}
          </div>

          {/* 中间：水杯提醒 */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center gap-3"
          >
            <Droplet className="w-4 h-4 text-blue-400" />
            <span className="text-sm">
              漂亮水杯提醒：今日补水进度 <span className="font-mono font-bold text-blue-400">{current}/{total}</span>
            </span>
            <span className="text-lg">{emoji}</span>

            {/* 进度条 */}
            <div className="w-24 h-2 bg-[#1a1a1a] rounded-full overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${percentage}%` }}
                transition={{ duration: 0.5 }}
                className="h-full bg-gradient-to-r from-blue-600 to-blue-400"
              />
            </div>
          </motion.div>

          {/* 右侧：模式指示 */}
          <div className="text-xs">
            {darkMode ? (
              <span className="text-blue-400">🌙 深夜模式</span>
            ) : (
              <span className="text-green-400">⚡ 极客模式</span>
            )}
          </div>
        </div>
      </div>
    </footer>
  );
}
