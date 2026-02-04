'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Flame, Zap, DollarSign, TrendingDown } from 'lucide-react';

interface InterestBurnerProps {
  currentPrincipal: number;
  interestRate: number;
  monthlyPrincipal: number;
}

export default function InterestBurner({
  currentPrincipal,
  interestRate,
  monthlyPrincipal,
}: InterestBurnerProps) {
  const [prepayment, setPrepayment] = useState(30000);

  // 金额格式化
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('zh-CN', {
      style: 'currency',
      currency: 'CNY',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(value);
  };

  // 计算等额本金下的月供减少
  const monthlyRate = interestRate / 100 / 12;

  // 当前月供（利息部分）
  const currentMonthlyInterest = currentPrincipal * monthlyRate;
  const currentMonthlyPayment = monthlyPrincipal + currentMonthlyInterest;

  // 提前还款后的新本金
  const newPrincipal = Math.max(0, currentPrincipal - prepayment);
  const newMonthlyInterest = newPrincipal * monthlyRate;
  const newMonthlyPayment = monthlyPrincipal + newMonthlyInterest;

  // 月供减少额
  const monthlyReduction = currentMonthlyPayment - newMonthlyPayment;

  // 估算节省的总利息
  const remainingMonths = Math.ceil(currentPrincipal / monthlyPrincipal);
  const totalInterestSaved = prepayment * monthlyRate * (remainingMonths / 2);

  // 计算月供减少的百分比
  const reductionPercentage = (monthlyReduction / currentMonthlyPayment) * 100;

  return (
    <div className="bg-zinc-900/50 backdrop-blur-md rounded-lg p-6 border border-[#222] overflow-y-auto max-h-[calc(100vh-12rem)]">
      <h2 className="text-xl font-bold mb-6 flex items-center gap-2" style={{ color: '#ff3366' }}>
        <Flame className="w-6 h-6" />
        利息焚烧炉模拟器
      </h2>

      <div className="mb-6">
        <label className="block text-sm text-gray-400 mb-2">
          输入提前还款金额 (元)
        </label>
        <div className="flex items-center gap-4">
          <input
            type="number"
            value={prepayment}
            onChange={(e) => setPrepayment(Number(e.target.value))}
            className="flex-1 bg-[#1a1a1a]/80 backdrop-blur-sm border border-red-900/50 rounded px-4 py-3 text-2xl font-mono font-bold text-red-400 focus:outline-none focus:border-red-500 transition-all"
            min="0"
            max={currentPrincipal}
            step="1000"
          />
          <div className="text-sm text-gray-500">
            当前本金<br />{formatCurrency(currentPrincipal)}
          </div>
        </div>

        {/* 快速选择按钮 */}
        <div className="flex gap-2 mt-3">
          {[
            { label: '1万', value: 10000 },
            { label: '3万', value: 30000 },
            { label: '5万', value: 50000 },
            { label: '10万', value: 100000 },
          ].map((option) => (
            <button
              key={option.label}
              onClick={() => setPrepayment(option.value)}
              className={`px-3 py-1 rounded text-sm transition-all ${
                prepayment === option.value
                  ? 'bg-red-500 text-white'
                  : 'bg-[#1a1a1a]/80 backdrop-blur-sm text-gray-400 hover:bg-red-900/30'
              }`}
            >
              {option.label}
            </button>
          ))}
        </div>
      </div>

      {/* 燃烧效果 */}
      <div className="relative mb-6 p-6 rounded-lg bg-gradient-to-b from-orange-900/20 to-red-900/20 backdrop-blur-sm border border-red-500/30">
        <motion.div
          animate={{ scale: [1, 1.05, 1] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="absolute inset-0 flex items-center justify-center pointer-events-none"
        >
          <Flame className="w-32 h-32 opacity-10 text-red-500" />
        </motion.div>

        <div className="relative grid grid-cols-3 gap-4">
          <div className="text-center">
            <div className="text-xs text-gray-400 mb-1">月供立减</div>
            <motion.div
              key={monthlyReduction}
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className="text-2xl font-mono font-bold text-red-400"
            >
              {formatCurrency(monthlyReduction)}
            </motion.div>
            <div className="text-xs text-red-500 mt-1">
              {reductionPercentage.toFixed(1)}%
            </div>
          </div>

          <div className="text-center">
            <div className="text-xs text-gray-400 mb-1">节省总利息</div>
            <motion.div
              key={totalInterestSaved}
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.1 }}
              className="text-2xl font-mono font-bold text-orange-400"
            >
              {formatCurrency(totalInterestSaved)}
            </motion.div>
            <div className="text-xs text-orange-500 mt-1">估算值</div>
          </div>

          <div className="text-center">
            <div className="text-xs text-gray-400 mb-1">剩余本金</div>
            <motion.div
              key={newPrincipal}
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2 }}
              className="text-2xl font-mono font-bold text-red-400"
            >
              {formatCurrency(newPrincipal)}
            </motion.div>
            <div className="text-xs text-red-500 mt-1">
              -{formatCurrency(prepayment)}
            </div>
          </div>
        </div>
      </div>

      {/* 对比图 */}
      <div className="space-y-3">
        <div className="flex items-center justify-between text-sm">
          <span className="text-gray-400">当前月供</span>
          <span className="font-mono text-red-400">
            {formatCurrency(currentMonthlyPayment)}
          </span>
        </div>

        <div className="flex items-center justify-between text-sm">
          <span className="text-gray-400">还款后月供</span>
          <span className="font-mono text-green-400">
            {formatCurrency(newMonthlyPayment)}
          </span>
        </div>

        <div className="h-px bg-gradient-to-r from-red-500/50 via-yellow-500/50 to-green-500/50 my-3" />

        <div className="flex items-center justify-between">
          <span className="text-sm text-gray-400 flex items-center gap-1">
            <Zap className="w-4 h-4 text-yellow-400" />
            月供减少
          </span>
          <span className="font-mono text-xl font-bold text-yellow-400">
            {formatCurrency(monthlyReduction)}
          </span>
        </div>
      </div>

      {/* 提示信息 */}
      <div className="mt-4 p-3 rounded bg-[#1a1a1a]/80 backdrop-blur-sm border border-yellow-900/50">
        <div className="flex items-start gap-2">
          <TrendingDown className="w-4 h-4 text-yellow-400 mt-0.5 flex-shrink-0" />
          <div className="text-xs text-gray-400">
            提前还款 {formatCurrency(prepayment)}，
            下个月起月供减少 <span className="text-yellow-400 font-bold">{formatCurrency(monthlyReduction)}</span>，
            累计可节省利息约 <span className="text-orange-400 font-bold">{formatCurrency(totalInterestSaved)}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
