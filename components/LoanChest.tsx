'use client';

import { motion } from 'framer-motion';
import { Gift, Calendar, Coins, Target } from 'lucide-react';

interface LoanChestProps {
  currentPrincipal: number;
  monthlyPrincipal: number;
  monthlyNetBalance: number;
  goldMonthlyInvestment: number; // 克
  initialGold: number; // 克
}

export default function LoanChest({
  currentPrincipal,
  monthlyPrincipal,
  monthlyNetBalance,
  goldMonthlyInvestment,
  initialGold,
}: LoanChestProps) {
  // 计算商贷清零日期（基于当前还款速度）
  const remainingMonthsAtCurrentRate = Math.ceil(currentPrincipal / monthlyPrincipal);
  const clearDateAtCurrentRate = new Date();
  clearDateAtCurrentRate.setMonth(clearDateAtCurrentRate.getMonth() + remainingMonthsAtCurrentRate);

  // 计算加速还款（每月净结余也用于还商贷）
  const acceleratedMonthlyPayment = monthlyPrincipal + monthlyNetBalance;
  const remainingMonthsAccelerated = Math.ceil(currentPrincipal / acceleratedMonthlyPayment);
  const clearDateAccelerated = new Date();
  clearDateAccelerated.setMonth(clearDateAccelerated.getMonth() + remainingMonthsAccelerated);

  // 计算黄金积累
  const goldAtCurrentRate = initialGold + remainingMonthsAtCurrentRate * goldMonthlyInvestment;
  const goldAtAccelerated = initialGold + remainingMonthsAccelerated * goldMonthlyInvestment;

  // 格式化日期
  const formatDate = (date: Date) => {
    return `${date.getFullYear()}年${date.getMonth() + 1}月`;
  };

  const daysDiff = Math.ceil(
    (clearDateAtCurrentRate.getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24)
  );

  const daysDiffAccelerated = Math.ceil(
    (clearDateAccelerated.getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24)
  );

  return (
    <div className="bg-[#111] neon-box rounded-lg p-6">
      <h2 className="text-xl font-bold mb-6 neon-text flex items-center gap-2">
        <Gift className="w-6 h-6" />
        房贷清空日宝箱
      </h2>

      {/* 当前还款速度 */}
      <div className="mb-6 p-4 rounded-lg bg-gradient-to-r from-gray-900/50 to-gray-800/50 border border-gray-700/50">
        <div className="flex items-center gap-2 mb-3">
          <Target className="w-5 h-5 text-gray-400" />
          <span className="text-sm font-medium text-gray-300">当前还款速度</span>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <div className="text-xs text-gray-500 mb-1">商贷归零日期</div>
            <motion.div
              key="current-rate-date"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-xl font-mono font-bold text-white"
            >
              {formatDate(clearDateAtCurrentRate)}
            </motion.div>
            <div className="text-xs text-gray-500 mt-1">
              还需 {remainingMonthsAtCurrentRate} 个月 ({daysDiff} 天)
            </div>
          </div>

          <div>
            <div className="text-xs text-gray-500 mb-1 flex items-center gap-1">
              <Coins className="w-3 h-3" />
              届时黄金持有
            </div>
            <motion.div
              key="current-rate-gold"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-xl font-mono font-bold" style={{ color: '#ffcc00' }}
            >
              {goldAtCurrentRate.toFixed(1)} 克
            </motion.div>
            <div className="text-xs text-gray-500 mt-1">
              每月 +{goldMonthlyInvestment}克
            </div>
          </div>
        </div>
      </div>

      {/* 加速还款方案 */}
      {monthlyNetBalance > 0 && (
        <div className="mb-6 p-4 rounded-lg bg-gradient-to-r from-green-900/30 to-emerald-900/30 border border-green-500/50 relative overflow-hidden">
          <motion.div
            className="absolute inset-0 pointer-events-none"
            animate={{
              background: [
                'radial-gradient(circle at 20% 50%, rgba(0, 255, 136, 0.1) 0%, transparent 50%)',
                'radial-gradient(circle at 80% 50%, rgba(0, 255, 136, 0.1) 0%, transparent 50%)',
                'radial-gradient(circle at 20% 50%, rgba(0, 255, 136, 0.1) 0%, transparent 50%)',
              ],
            }}
            transition={{ duration: 3, repeat: Infinity }}
          />

          <div className="relative">
            <div className="flex items-center gap-2 mb-3">
              <Calendar className="w-5 h-5 text-green-400" />
              <span className="text-sm font-medium text-green-400">
                加速还款方案 (每月净结余全部冲抵商贷)
              </span>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <div className="text-xs text-gray-400 mb-1">商贷归零日期</div>
                <div className="text-xl font-mono font-bold text-green-400">
                  {formatDate(clearDateAccelerated)}
                </div>
                <div className="text-xs text-green-500 mt-1">
                  还需 {remainingMonthsAccelerated} 个月 ({daysDiffAccelerated} 天)
                </div>
              </div>

              <div>
                <div className="text-xs text-gray-400 mb-1">届时黄金持有</div>
                <div className="text-xl font-mono font-bold" style={{ color: '#ffcc00' }}>
                  {goldAtAccelerated.toFixed(1)} 克
                </div>
                <div className="text-xs text-yellow-500 mt-1">
                  较当前少 {-(goldAtCurrentRate - goldAtAccelerated).toFixed(1)} 克
                </div>
              </div>
            </div>

            {/* 提前天数 */}
            <div className="mt-4 pt-4 border-t border-green-500/30">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-400">提前清零</span>
                <span className="text-lg font-mono font-bold text-green-400">
                  {daysDiff - daysDiffAccelerated} 天
                </span>
              </div>
              <div className="flex items-center justify-between mt-2">
                <span className="text-sm text-gray-400">节省利息(估算)</span>
                <span className="text-lg font-mono font-bold text-orange-400">
                  ¥{(currentPrincipal * 0.032 * ((daysDiff - daysDiffAccelerated) / 365)).toLocaleString('zh-CN', { maximumFractionDigits: 0 })}
                </span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 黄金积累预测图表 */}
      <div className="p-4 rounded-lg bg-[#1a1a1a] border border-yellow-900/50">
        <div className="text-sm font-medium mb-3 flex items-center gap-2" style={{ color: '#ffcc00' }}>
          <Coins className="w-4 h-4" />
          黄金积累预测
        </div>

        <div className="space-y-2">
          {/* 当前 */}
          <div className="flex items-center justify-between text-sm">
            <span className="text-gray-400">当前持有</span>
            <span className="font-mono" style={{ color: '#ffcc00' }}>
              {initialGold.toFixed(1)} 克
            </span>
          </div>

          {/* 1年后 */}
          <div className="flex items-center justify-between text-sm">
            <span className="text-gray-400">1年后</span>
            <span className="font-mono" style={{ color: '#ffcc00' }}>
              {(initialGold + 12 * goldMonthlyInvestment).toFixed(1)} 克
            </span>
          </div>

          {/* 清零日（当前速度） */}
          <div className="flex items-center justify-between text-sm">
            <span className="text-gray-400">商贷清零日(当前)</span>
            <span className="font-mono font-bold" style={{ color: '#ffcc00' }}>
              {goldAtCurrentRate.toFixed(1)} 克
            </span>
          </div>

          {/* 清零日（加速） */}
          {monthlyNetBalance > 0 && (
            <div className="flex items-center justify-between text-sm">
              <span className="text-gray-400">商贷清零日(加速)</span>
              <span className="font-mono font-bold" style={{ color: '#ffcc00' }}>
                {goldAtAccelerated.toFixed(1)} 克
              </span>
            </div>
          )}
        </div>

        {/* 黄金价值估算（按500元/克） */}
        <div className="mt-3 pt-3 border-t border-yellow-900/30">
          <div className="text-xs text-gray-500 mb-1">
            清零日黄金价值估算 (@ ¥500/克)
          </div>
          <div className="text-sm font-mono" style={{ color: '#ffcc00' }}>
            ¥{(goldAtCurrentRate * 500).toLocaleString('zh-CN', { maximumFractionDigits: 0 })}
          </div>
        </div>
      </div>

      {/* 目标提示 */}
      <div className="mt-4 p-3 rounded bg-[#0a0a0a] border border-dashed border-gray-700">
        <div className="text-xs text-gray-500 text-center">
          目标：商贷归零时，黄金持有达到 {(remainingMonthsAtCurrentRate * goldMonthlyInvestment).toFixed(0)}+ 克
        </div>
      </div>
    </div>
  );
}
