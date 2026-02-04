'use client';

import { motion } from 'framer-motion';
import { Droplet } from 'lucide-react';

export default function Footer() {
  // 获取今日日期
  const today = new Date();
  const dateStr = `${today.getFullYear()}年${today.getMonth() + 1}月${today.getDate()}日`;

  return (
    <footer className="fixed bottom-0 left-0 right-0 z-30 bg-zinc-900/80 backdrop-blur-md border-t border-[#222]">
      <div className="max-w-7xl mx-auto px-4 py-3">
        <div className="flex items-center justify-center gap-4">
          <Droplet className="w-4 h-4 text-blue-400" />
          <span className="text-sm">
            漂亮水杯提醒：今日补水进度 <span className="font-mono font-bold text-blue-400">4/4</span>
            <span className="mx-2 text-gray-600">|</span>
            策略：<span className="font-bold text-green-400">死磕商贷</span>，<span className="font-bold text-blue-400">保护公积金</span>
          </span>
        </div>

        {/* 日期 */}
        <div className="text-xs text-gray-600 text-center mt-1 font-mono">
          {dateStr}
        </div>
      </div>
    </footer>
  );
}
