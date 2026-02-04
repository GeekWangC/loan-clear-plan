'use client';

import { motion } from 'framer-motion';
import { TrendingDown, Wallet, PiggyBank, Coins } from 'lucide-react';

interface CashFlowFunnelProps {
  salary: number;
  expenses: number;
  commercialLoanPayment: number;
  housingFundGap: number;
}

export default function CashFlowFunnel({
  salary,
  expenses,
  commercialLoanPayment,
  housingFundGap,
}: CashFlowFunnelProps) {
  const netBalance = salary - expenses - commercialLoanPayment - housingFundGap;

  const stages = [
    {
      label: '月薪入账',
      value: salary,
      icon: Wallet,
      color: '#00ff88',
      width: '100%',
    },
    {
      label: '扣除生活费',
      value: expenses,
      icon: TrendingDown,
      color: '#ffcc00',
      width: '75%',
    },
    {
      label: '商贷月供',
      value: commercialLoanPayment,
      icon: PiggyBank,
      color: '#ff3366',
      width: '60%',
    },
    {
      label: '公积金差额',
      value: housingFundGap,
      icon: Coins,
      color: '#00ccff',
      width: '50%',
    },
    {
      label: '每月净结余',
      value: netBalance,
      icon: Wallet,
      color: '#aa00ff',
      width: '40%',
      highlight: true,
    },
  ];

  return (
    <div className="bg-[#111] neon-box rounded-lg p-6">
      <h2 className="text-xl font-bold mb-6 neon-text flex items-center gap-2">
        <TrendingDown className="w-6 h-6" />
        现金流漏斗
      </h2>

      <div className="space-y-4">
        {stages.map((stage, index) => {
          const Icon = stage.icon;
          return (
            <motion.div
              key={stage.label}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className="flex items-center gap-4"
            >
              <div className="w-32 text-sm text-gray-400 text-right">{stage.label}</div>

              <div className="flex-1">
                <div
                  className="h-12 rounded flex items-center justify-between px-4 transition-all"
                  style={{
                    width: stage.width,
                    background: stage.highlight
                      ? `linear-gradient(90deg, ${stage.color}33, ${stage.color}66)`
                      : `rgba(${parseInt(stage.color.slice(1, 3), 16)}, ${parseInt(stage.color.slice(3, 5), 16)}, ${parseInt(stage.color.slice(5, 7), 16)}, 0.1)`,
                    border: `1px solid ${stage.color}`,
                    boxShadow: stage.highlight
                      ? `0 0 20px ${stage.color}66`
                      : 'none',
                  }}
                >
                  <div className="flex items-center gap-2">
                    <Icon className="w-4 h-4" style={{ color: stage.color }} />
                    <span className="font-mono font-bold" style={{ color: stage.color }}>
                      ¥{stage.value.toLocaleString('zh-CN', { minimumFractionDigits: 2 })}
                    </span>
                  </div>

                  {stage.label === '每月净结余' && (
                    <span className="text-xs px-2 py-1 rounded bg-[#00ff88] text-black font-bold">
                      可投资
                    </span>
                  )}
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* 净结余特别展示 */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.5 }}
        className="mt-6 p-4 rounded-lg bg-gradient-to-r from-purple-900/30 to-pink-900/30 border border-purple-500/50"
      >
        <div className="text-center">
          <div className="text-sm text-gray-400 mb-1">每月可投资金额</div>
          <div className="text-3xl font-bold text-purple-400 neon-text">
            ¥{netBalance.toLocaleString('zh-CN', { minimumFractionDigits: 2 })}
          </div>
          <div className="text-xs text-gray-500 mt-2">
            如果全部用于商贷提前还款，年可节省约 ¥
            {(netBalance * 12 * 0.032).toLocaleString('zh-CN', { maximumFractionDigits: 0 })} 利息
          </div>
        </div>
      </motion.div>
    </div>
  );
}
