'use client';

import { motion } from 'framer-motion';
import { Target, Shield, TrendingUp } from 'lucide-react';

interface ProgressBarProps {
  label: string;
  current: number;
  target: number;
  color: string;
  icon: any;
  unit?: string;
  showPercentage?: boolean;
}

export default function ProgressBar({
  label,
  current,
  target,
  color,
  icon: Icon,
  unit = '',
  showPercentage = true,
}: ProgressBarProps) {
  const percentage = Math.min((current / target) * 100, 100);
  const remaining = target - current;

  return (
    <div className="mb-6">
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-2">
          <Icon className="w-4 h-4" style={{ color }} />
          <span className="text-sm font-medium">{label}</span>
        </div>
        <div className="text-sm font-mono" style={{ color }}>
          {showPercentage && `${percentage.toFixed(1)}%`}
        </div>
      </div>

      <div className="relative h-8 bg-[#1a1a1a] rounded overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${percentage}%` }}
          transition={{ duration: 1, ease: 'easeOut' }}
          className="absolute inset-y-0 left-0 rounded"
          style={{
            background: `linear-gradient(90deg, ${color}66, ${color})`,
            boxShadow: `0 0 20px ${color}66`,
          }}
        />
        <div className="absolute inset-0 flex items-center justify-between px-3">
          <span className="text-xs font-mono font-bold text-white z-10">
            {current.toLocaleString('zh-CN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}{unit}
          </span>
          <span className="text-xs text-gray-400 z-10">
            / {target.toLocaleString('zh-CN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}{unit}
          </span>
        </div>
      </div>

      {remaining > 0 && (
        <div className="mt-1 text-xs text-gray-500 text-right">
          剩余 {remaining.toLocaleString('zh-CN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}{unit}
        </div>
      )}
    </div>
  );
}

// 金额格式化
const formatCurrency = (value: number) => {
  return new Intl.NumberFormat('zh-CN', {
    style: 'currency',
    currency: 'CNY',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(value);
};

// 商贷进度条组件
export function CommercialLoanProgress({
  total,
  remaining,
}: {
  total: number;
  remaining: number;
}) {
  const paid = total - remaining;
  const percentage = (paid / total) * 100;

  return (
    <div className="bg-zinc-900/50 backdrop-blur-md rounded-lg p-6 border border-[#222] overflow-y-auto max-h-[calc(100vh-12rem)]">
      <h2 className="text-xl font-bold mb-4 flex items-center gap-2" style={{ color: '#ff3366' }}>
        <Target className="w-6 h-6" />
        商贷进度 (进攻目标)
      </h2>

      <ProgressBar
        label="已还款"
        current={paid}
        target={total}
        color="#ff3366"
        icon={TrendingUp}
        unit="元"
      />

      <div className="grid grid-cols-2 gap-4 mt-4">
        <div className="p-3 rounded bg-[#1a1a1a]/80 backdrop-blur-sm border border-red-900/50">
          <div className="text-xs text-gray-400">剩余本金</div>
          <div className="text-lg font-mono font-bold text-red-400">
            {formatCurrency(remaining)}
          </div>
        </div>
        <div className="p-3 rounded bg-[#1a1a1a]/80 backdrop-blur-sm border border-red-900/50">
          <div className="text-xs text-gray-400">原始总额</div>
          <div className="text-lg font-mono font-bold text-red-400">
            {formatCurrency(total)}
          </div>
        </div>
      </div>
    </div>
  );
}

// 备用金护盾进度条组件
export function ReserveFundProgress({
  current,
  target,
}: {
  current: number;
  target: number;
}) {
  return (
    <div className="bg-zinc-900/50 backdrop-blur-md rounded-lg p-6 border border-[#222] overflow-y-auto max-h-[calc(100vh-12rem)]">
      <h2 className="text-xl font-bold mb-4 flex items-center gap-2" style={{ color: '#00ccff' }}>
        <Shield className="w-6 h-6" />
        备用金护盾
      </h2>

      <ProgressBar
        label="当前储备"
        current={current}
        target={target}
        color="#00ccff"
        icon={Shield}
        unit="元"
      />

      <div className="mt-4 p-3 rounded bg-[#1a1a1a]/80 backdrop-blur-sm border border-blue-900/50">
        <div className="flex items-center justify-between">
          <div className="text-xs text-gray-400">护盾完整度</div>
          <div className="text-sm font-mono font-bold text-blue-400">
            {((current / target) * 100).toFixed(0)}%
          </div>
        </div>
        <div className="mt-2 h-2 bg-[#0a0a0a] rounded overflow-hidden">
          <div
            className="h-full transition-all duration-500"
            style={{
              width: `${Math.min((current / target) * 100, 100)}%`,
              background: 'linear-gradient(90deg, #00ccff66, #00ccff)',
              boxShadow: '0 0 10px #00ccff',
            }}
          />
        </div>
      </div>
    </div>
  );
}
