'use client';

import { Settings, Moon, Sun } from 'lucide-react';
import { useState, useEffect } from 'react';

interface SidebarProps {
  darkMode: boolean;
  onDarkModeToggle: () => void;
}

export default function Sidebar({ darkMode, onDarkModeToggle }: SidebarProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed top-4 left-4 z-50 p-3 rounded-lg bg-[#111] neon-box transition-all hover:scale-105"
        title="设置"
      >
        <Settings className="w-5 h-5" style={{ color: '#00ff88' }} />
      </button>

      {/* Sidebar Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div
        className={`fixed top-0 left-0 h-full w-80 bg-[#0a0a0a] border-r border-[#222] z-50 transition-transform duration-300 ease-in-out ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="p-6">
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-lg font-bold neon-text">配置参数</h2>
            <button
              onClick={() => setIsOpen(false)}
              className="p-2 rounded hover:bg-[#1a1a1a] transition-colors"
            >
              ✕
            </button>
          </div>

          {/* 深夜模式开关 */}
          <div className="mb-8 p-4 rounded-lg bg-[#111] neon-box">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                {darkMode ? <Moon className="w-5 h-5 text-blue-400" /> : <Sun className="w-5 h-5 text-yellow-400" />}
                <span className="text-sm font-medium">深夜模式</span>
              </div>
              <button
                onClick={onDarkModeToggle}
                className={`w-14 h-7 rounded-full p-1 transition-all ${
                  darkMode ? 'bg-blue-900/50' : 'bg-yellow-900/50'
                }`}
              >
                <div
                  className={`w-5 h-5 rounded-full transition-all ${
                    darkMode
                      ? 'bg-blue-400 translate-x-7'
                      : 'bg-yellow-400 translate-x-0'
                  }`}
                />
              </button>
            </div>
            <p className="text-xs text-gray-500 mt-2">
              {darkMode ? '已开启深夜护眼模式' : '标准极客模式'}
            </p>
          </div>

          {/* 商贷配置 */}
          <div className="mb-6">
            <h3 className="text-sm font-medium mb-3 flex items-center gap-2" style={{ color: '#ff3366' }}>
              商贷配置 (进攻)
            </h3>
            <div className="space-y-3 text-xs">
              <div className="p-3 rounded bg-[#111] border border-red-900/30">
                <div className="text-gray-500 mb-1">原始总额</div>
                <div className="font-mono text-red-400">¥1,450,000</div>
              </div>
              <div className="p-3 rounded bg-[#111] border border-red-900/30">
                <div className="text-gray-500 mb-1">剩余本金</div>
                <div className="font-mono text-red-400">¥749,776.79</div>
              </div>
              <div className="p-3 rounded bg-[#111] border border-red-900/30">
                <div className="text-gray-500 mb-1">利率</div>
                <div className="font-mono text-red-400">3.2%</div>
              </div>
              <div className="p-3 rounded bg-[#111] border border-red-900/30">
                <div className="text-gray-500 mb-1">还款方式</div>
                <div className="font-mono text-red-400">等额本金</div>
              </div>
              <div className="p-3 rounded bg-[#111] border border-red-900/30">
                <div className="text-gray-500 mb-1">每月固定本金</div>
                <div className="font-mono text-red-400">¥2,387.82</div>
              </div>
            </div>
          </div>

          {/* 公积金配置 */}
          <div className="mb-6">
            <h3 className="text-sm font-medium mb-3 flex items-center gap-2" style={{ color: '#00ccff' }}>
              公积金配置 (防御)
            </h3>
            <div className="space-y-3 text-xs">
              <div className="p-3 rounded bg-[#111] border border-blue-900/30">
                <div className="text-gray-500 mb-1">原始总额</div>
                <div className="font-mono text-blue-400">¥1,000,000</div>
              </div>
              <div className="p-3 rounded bg-[#111] border border-blue-900/30">
                <div className="text-gray-500 mb-1">剩余本金</div>
                <div className="font-mono text-blue-400">¥917,086.83</div>
              </div>
              <div className="p-3 rounded bg-[#111] border border-blue-900/30">
                <div className="text-gray-500 mb-1">利率</div>
                <div className="font-mono text-blue-400">2.85%</div>
              </div>
              <div className="p-3 rounded bg-[#111] border border-blue-900/30">
                <div className="text-gray-500 mb-1">还款方式</div>
                <div className="font-mono text-blue-400">等额本息</div>
              </div>
              <div className="p-3 rounded bg-[#111] border border-blue-900/30">
                <div className="text-gray-500 mb-1">月供</div>
                <div className="font-mono text-blue-400">¥4,099.22</div>
              </div>
              <div className="p-3 rounded bg-[#111] border border-blue-900/30">
                <div className="text-gray-500 mb-1">公积金月入账</div>
                <div className="font-mono text-green-400">-¥3,320</div>
              </div>
              <div className="p-3 rounded bg-[#111] border border-blue-900/30">
                <div className="text-gray-500 mb-1">实际支出</div>
                <div className="font-mono text-blue-400">¥779.22</div>
              </div>
            </div>
          </div>

          {/* 现金流配置 */}
          <div className="mb-6">
            <h3 className="text-sm font-medium mb-3 flex items-center gap-2" style={{ color: '#ffcc00' }}>
              现金流配置
            </h3>
            <div className="space-y-3 text-xs">
              <div className="p-3 rounded bg-[#111] border border-yellow-900/30">
                <div className="text-gray-500 mb-1">月薪</div>
                <div className="font-mono" style={{ color: '#ffcc00' }}>¥19,000</div>
              </div>
              <div className="p-3 rounded bg-[#111] border border-yellow-900/30">
                <div className="text-gray-500 mb-1">生活费</div>
                <div className="font-mono text-gray-400">¥6,000</div>
              </div>
              <div className="p-3 rounded bg-[#111] border border-yellow-900/30">
                <div className="text-gray-500 mb-1">当前现金</div>
                <div className="font-mono text-green-400">¥20,000</div>
              </div>
              <div className="p-3 rounded bg-[#111] border border-yellow-900/30">
                <div className="text-gray-500 mb-1">备用金目标</div>
                <div className="font-mono" style={{ color: '#ffcc00' }}>¥50,000</div>
              </div>
            </div>
          </div>

          {/* 黄金配置 */}
          <div>
            <h3 className="text-sm font-medium mb-3 flex items-center gap-2" style={{ color: '#ffcc00' }}>
              黄金储蓄
            </h3>
            <div className="space-y-3 text-xs">
              <div className="p-3 rounded bg-[#111] border border-yellow-900/30">
                <div className="text-gray-500 mb-1">每月定投</div>
                <div className="font-mono" style={{ color: '#ffcc00' }}>1.5 克</div>
              </div>
              <div className="p-3 rounded bg-[#111] border border-yellow-900/30">
                <div className="text-gray-500 mb-1">初始持有</div>
                <div className="font-mono text-gray-400">0 克</div>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="mt-8 pt-4 border-t border-[#222]">
            <div className="text-xs text-gray-600 text-center">
              LOAN_CLEAR_PLAN.exe v1.0
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
