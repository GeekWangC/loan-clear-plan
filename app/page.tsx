'use client';

import { useState } from 'react';
import Sidebar from '@/components/Sidebar';
import Footer from '@/components/Footer';
import CashFlowFunnel from '@/components/CashFlowFunnel';
import { CommercialLoanProgress, ReserveFundProgress } from '@/components/ProgressBar';
import InterestBurner from '@/components/InterestBurner';
import LoanChest from '@/components/LoanChest';
import { motion } from 'framer-motion';
import { Activity, Sparkles } from 'lucide-react';

export default function Home() {
  const [darkMode, setDarkMode] = useState(false);

  // 硬编码数据
  const commercialLoan = {
    total: 1450000,
    remaining: 749776.79,
    rate: 3.2,
    type: '等额本金',
    monthlyPrincipal: 2387.82,
  };

  const housingFund = {
    total: 1000000,
    remaining: 917086.83,
    rate: 2.85,
    type: '等额本息',
    monthlyPayment: 4099.22,
    monthlyCredit: 3320,
    actualPayment: 4099.22 - 3320, // 779.22
  };

  const cashFlow = {
    salary: 19000,
    expenses: 6000,
    currentCash: 20000,
    reserveTarget: 50000,
  };

  const goldInvestment = {
    monthly: 1.5, // 克
    initial: 0, // 克
  };

  // 计算当前商贷月供（等额本金：每月固定本金 + 剩余本金 × 月利率）
  const monthlyRate = commercialLoan.rate / 100 / 12;
  const currentMonthlyInterest = commercialLoan.remaining * monthlyRate;
  const currentCommercialPayment = commercialLoan.monthlyPrincipal + currentMonthlyInterest;

  // 计算每月净结余
  const monthlyNetBalance = cashFlow.salary - cashFlow.expenses - currentCommercialPayment - housingFund.actualPayment;

  return (
    <div className={`min-h-screen transition-all ${darkMode ? 'bg-[#050510]' : 'bg-[#0a0a0a]'}`}>
      <Sidebar darkMode={darkMode} onDarkModeToggle={() => setDarkMode(!darkMode)} />

      {/* Main Content */}
      <main className="pl-0 pr-0 pb-20 pt-20">
        <div className="max-w-7xl mx-auto px-4">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8 text-center"
          >
            <h1 className="text-4xl font-bold mb-2 neon-text flex items-center justify-center gap-3">
              <Activity className="w-10 h-10" />
              LOAN_CLEAR_PLAN.exe
            </h1>
            <p className="text-sm text-gray-500">
              房贷可视化仪表板 - 清零计划进行中
              <Sparkles className="w-4 h-4 inline ml-2 text-yellow-400" />
            </p>
          </motion.div>

          {/* Dashboard Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Left Column */}
            <div className="space-y-6">
              {/* 现金流漏斗 */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 }}
              >
                <CashFlowFunnel
                  salary={cashFlow.salary}
                  expenses={cashFlow.expenses}
                  commercialLoanPayment={currentCommercialPayment}
                  housingFundGap={housingFund.actualPayment}
                />
              </motion.div>

              {/* 商贷进度 */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
              >
                <CommercialLoanProgress
                  total={commercialLoan.total}
                  remaining={commercialLoan.remaining}
                />
              </motion.div>
            </div>

            {/* Right Column */}
            <div className="space-y-6">
              {/* 备用金护盾 */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 }}
              >
                <ReserveFundProgress
                  current={cashFlow.currentCash}
                  target={cashFlow.reserveTarget}
                />
              </motion.div>

              {/* 房贷清空日宝箱 */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
              >
                <LoanChest
                  currentPrincipal={commercialLoan.remaining}
                  monthlyPrincipal={commercialLoan.monthlyPrincipal}
                  monthlyNetBalance={Math.max(0, monthlyNetBalance)}
                  goldMonthlyInvestment={goldInvestment.monthly}
                  initialGold={goldInvestment.initial}
                />
              </motion.div>
            </div>

            {/* Full Width */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="lg:col-span-2"
            >
              <InterestBurner
                currentPrincipal={commercialLoan.remaining}
                interestRate={commercialLoan.rate}
                monthlyPrincipal={commercialLoan.monthlyPrincipal}
              />
            </motion.div>
          </div>

          {/* Summary Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-4"
          >
            <div className="p-4 rounded-lg bg-[#111] neon-box text-center">
              <div className="text-xs text-gray-500 mb-1">商贷剩余</div>
              <div className="text-xl font-mono font-bold text-red-400">
                ¥{(commercialLoan.remaining / 10000).toFixed(1)}万
              </div>
            </div>

            <div className="p-4 rounded-lg bg-[#111] neon-box text-center">
              <div className="text-xs text-gray-500 mb-1">公积金剩余</div>
              <div className="text-xl font-mono font-bold text-blue-400">
                ¥{(housingFund.remaining / 10000).toFixed(1)}万
              </div>
            </div>

            <div className="p-4 rounded-lg bg-[#111] neon-box text-center">
              <div className="text-xs text-gray-500 mb-1">每月净结余</div>
              <div className="text-xl font-mono font-bold text-purple-400">
                ¥{monthlyNetBalance.toFixed(0)}
              </div>
            </div>

            <div className="p-4 rounded-lg bg-[#111] neon-box text-center">
              <div className="text-xs text-gray-500 mb-1">备用金缺口</div>
              <div className="text-xl font-mono font-bold text-yellow-400">
                ¥{(cashFlow.reserveTarget - cashFlow.currentCash).toLocaleString()}
              </div>
            </div>
          </motion.div>
        </div>
      </main>

      <Footer darkMode={darkMode} />
    </div>
  );
}
