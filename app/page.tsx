'use client';

import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Activity, Sparkles, Flame, Target, Shield, TrendingDown, Wallet, PiggyBank, Coins, Droplet, Settings, Moon, Sun } from 'lucide-react';

// 金额格式化
const formatCurrency = (value: number) => {
  return new Intl.NumberFormat('zh-CN', {
    style: 'currency',
    currency: 'CNY',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(value);
};

// 金条可视化组件
function GoldBarsVisualization({ grams }: { grams: number }) {
  const goldBarWeight = 100;
  const bars = Math.floor(grams / goldBarWeight);
  const remainder = grams % goldBarWeight;
  const displayBars = Math.min(bars, 5);
  const remainingBars = Math.max(bars - 5, 0);

  return (
    <div className="flex flex-col gap-2">
      <div className="flex flex-wrap gap-1">
        {Array.from({ length: displayBars }).map((_, i) => (
          <motion.div
            key={i}
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ delay: i * 0.05, type: 'spring' }}
            className="relative group"
          >
            <div
              className="w-10 h-5 rounded-sm flex items-center justify-center text-[10px] font-bold text-black"
              style={{
                background: 'linear-gradient(135deg, #ffd700dd, #ffd70099)',
                border: '1px solid #ffd700',
                boxShadow: '0 0 8px #ffd70066, inset 0 0 3px rgba(255,255,255,0.3)',
              }}
            >
              Au
            </div>
          </motion.div>
        ))}
        {remainder > 0 && (
          <div className="w-10 h-5 rounded-sm flex items-center justify-center text-[10px] font-bold text-gray-400 border border-gray-600 bg-[#1a1a1a]">
            {remainder.toFixed(0)}g
          </div>
        )}
        {remainingBars > 0 && (
          <div className="w-10 h-5 rounded-sm flex items-center justify-center text-[10px] font-bold text-yellow-400 border border-yellow-600 bg-yellow-900/30">
            +{remainingBars}
          </div>
        )}
      </div>
      <div className="text-xs text-gray-500">
        {bars > 0 ? `${bars} 根金条` : '无金条'}
        {remainder > 0 && ` + ${remainder.toFixed(1)}g`}
      </div>
    </div>
  );
}

// 左侧 Sidebar 参数配置
function ConfigSidebar({ darkMode, onDarkModeToggle, config, onConfigChange }: any) {
  return (
    <div className="bg-zinc-900/50 backdrop-blur-md rounded-lg p-4 border border-[#222] h-full overflow-y-auto">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-bold neon-text flex items-center gap-2">
          <Settings className="w-5 h-5" />
          参数配置
        </h2>
        <button
          onClick={onDarkModeToggle}
          className={`p-2 rounded-lg transition-all ${
            darkMode ? 'bg-blue-900/30 text-blue-400' : 'bg-[#1a1a1a] text-gray-400'
          }`}
        >
          {darkMode ? <Moon className="w-4 h-4" /> : <Sun className="w-4 h-4" />}
        </button>
      </div>

      <div className="space-y-4">
        {/* 收入 */}
        <div>
          <label className="text-xs text-gray-400 mb-1 block">月薪</label>
          <input
            type="number"
            value={config.salary}
            onChange={(e) => onConfigChange({ ...config, salary: Number(e.target.value) })}
            className="w-full bg-[#1a1a1a]/80 border border-[#333] rounded px-3 py-2 text-sm font-mono text-green-400 focus:outline-none focus:border-green-500"
          />
        </div>

        {/* 开销 */}
        <div>
          <label className="text-xs text-gray-400 mb-1 block">生活费</label>
          <input
            type="number"
            value={config.expenses}
            onChange={(e) => onConfigChange({ ...config, expenses: Number(e.target.value) })}
            className="w-full bg-[#1a1a1a]/80 border border-[#333] rounded px-3 py-2 text-sm font-mono text-yellow-400 focus:outline-none focus:border-yellow-500"
          />
        </div>

        {/* 黄金定投 */}
        <div>
          <label className="text-xs text-gray-400 mb-1 block">黄金月投（克）</label>
          <input
            type="number"
            value={config.goldMonthly}
            onChange={(e) => onConfigChange({ ...config, goldMonthly: Number(e.target.value) })}
            className="w-full bg-[#1a1a1a]/80 border border-[#333] rounded px-3 py-2 text-sm font-mono text-yellow-400 focus:outline-none focus:border-yellow-500"
            min="1"
            max="4"
            step="0.5"
          />
        </div>

        {/* 初始黄金 */}
        <div>
          <label className="text-xs text-gray-400 mb-1 block">初始黄金（克）</label>
          <input
            type="number"
            value={config.initialGold}
            onChange={(e) => onConfigChange({ ...config, initialGold: Number(e.target.value) })}
            className="w-full bg-[#1a1a1a]/80 border border-[#333] rounded px-3 py-2 text-sm font-mono text-yellow-400 focus:outline-none focus:border-yellow-500"
          />
        </div>

        {/* 分隔线 */}
        <div className="border-t border-[#222] pt-4">
          <h3 className="text-xs font-medium text-gray-400 mb-2">固定参数</h3>
          <div className="space-y-2 text-xs">
            <div className="flex justify-between">
              <span className="text-gray-500">商贷总额</span>
              <span className="font-mono text-red-400">145.00万</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500">商贷剩余</span>
              <span className="font-mono text-red-400">74.98万</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500">商贷利率</span>
              <span className="font-mono text-red-400">3.20%</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500">公积金剩余</span>
              <span className="font-mono text-blue-400">91.71万</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// 中间：商贷进度（大而亮眼）
function CommercialLoanProgress({ remaining, target }: { remaining: number; target: number }) {
  const paid = target - remaining;
  const percentage = (paid / target) * 100;

  // 计算清零日期
  const monthlyPrincipal = 2387.82;
  const remainingMonths = Math.ceil(remaining / monthlyPrincipal);
  const clearDate = new Date();
  clearDate.setMonth(clearDate.getMonth() + remainingMonths);

  return (
    <div className="bg-zinc-900/50 backdrop-blur-md rounded-lg p-6 border border-[#222]">
      <h2 className="text-2xl font-bold mb-6 neon-text flex items-center gap-3">
        <Target className="w-8 h-8" />
        商贷归零进度
      </h2>

      {/* 大进度条 */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-3">
          <span className="text-sm text-gray-400">已还款</span>
          <span className="text-2xl font-mono font-bold text-red-400">{percentage.toFixed(1)}%</span>
        </div>
        <div className="relative h-12 bg-[#1a1a1a] rounded-lg overflow-hidden">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${percentage}%` }}
            transition={{ duration: 1.5, ease: 'easeOut' }}
            className="absolute inset-y-0 left-0 rounded-lg"
            style={{
              background: 'linear-gradient(90deg, #ff3366aa, #ff3366)',
              boxShadow: '0 0 30px #ff3366aa',
            }}
          />
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-lg font-mono font-bold text-white z-10">
              {formatCurrency(paid)} / {formatCurrency(target)}
            </span>
          </div>
        </div>
        <div className="mt-2 text-xs text-gray-500 text-right">
          剩余 {formatCurrency(remaining)}
        </div>
      </div>

      {/* 清零日期卡片 */}
      <div className="bg-gradient-to-r from-red-900/20 to-orange-900/20 rounded-lg p-4 border border-red-500/30">
        <div className="flex items-center justify-between">
          <div>
            <div className="text-xs text-gray-400 mb-1">预计清零日期</div>
            <div className="text-3xl font-mono font-bold text-red-400" id="clearDate">
              {clearDate.getFullYear()}年{clearDate.getMonth() + 1}月
            </div>
            <div className="text-xs text-gray-500 mt-1">
              还需 {remainingMonths} 个月
            </div>
          </div>
          <div className="text-right">
            <div className="text-xs text-gray-400 mb-1">每日进度</div>
            <div className="text-lg font-mono font-bold text-orange-400">
              {formatCurrency(monthlyPrincipal / 30)}
            </div>
            <div className="text-xs text-gray-500 mt-1">/ 天</div>
          </div>
        </div>
      </div>
    </div>
  );
}

// 中间：利息焚烧实验室
function InterestBurnerLab({
  remaining,
  monthlyPrincipal,
  interestRate,
  onDateUpdate,
}: {
  remaining: number;
  monthlyPrincipal: number;
  interestRate: number;
  onDateUpdate: (months: number) => void;
}) {
  const [prepayment, setPrepayment] = useState(30000);

  const monthlyRate = interestRate / 100 / 12;
  const currentMonthlyInterest = remaining * monthlyRate;
  const currentMonthlyPayment = monthlyPrincipal + currentMonthlyInterest;

  const newPrincipal = Math.max(0, remaining - prepayment);
  const newMonthlyInterest = newPrincipal * monthlyRate;
  const newMonthlyPayment = monthlyPrincipal + newMonthlyInterest;

  const monthlyReduction = currentMonthlyPayment - newMonthlyPayment;
  const reductionPercentage = (monthlyReduction / currentMonthlyPayment) * 100;

  // 计算节省天数
  const remainingMonthsOriginal = Math.ceil(remaining / monthlyPrincipal);
  const remainingMonthsNew = Math.ceil(newPrincipal / monthlyPrincipal);
  const daysSaved = (remainingMonthsOriginal - remainingMonthsNew) * 30;

  // 触发日期更新动画
  useMemo(() => {
    if (prepayment > 0) {
      onDateUpdate(remainingMonthsNew);
    }
  }, [prepayment, remainingMonthsNew, onDateUpdate]);

  const totalInterestSaved = prepayment * monthlyRate * (remainingMonthsOriginal / 2);

  return (
    <div className="bg-zinc-900/50 backdrop-blur-md rounded-lg p-6 border border-[#222]">
      <h2 className="text-xl font-bold mb-6 flex items-center gap-2" style={{ color: '#ff3366' }}>
        <Flame className="w-6 h-6" />
        利息焚烧实验室
      </h2>

      {/* 输入框 */}
      <div className="mb-6">
        <label className="block text-sm text-gray-400 mb-2">
          输入提前还款金额
        </label>
        <div className="flex items-center gap-3">
          <input
            type="number"
            value={prepayment}
            onChange={(e) => setPrepayment(Number(e.target.value))}
            className="flex-1 bg-gradient-to-r from-red-900/20 to-orange-900/20 border-2 border-red-500/50 rounded-lg px-4 py-4 text-3xl font-mono font-bold text-red-400 focus:outline-none focus:border-red-500 transition-all"
            min="0"
            max={remaining}
            step="1000"
          />
          <div className="text-sm text-gray-500">
            当前本金<br />{formatCurrency(remaining)}
          </div>
        </div>

        {/* 快速选择 */}
        <div className="flex gap-2 mt-3">
          {[1, 3, 5, 10].map((amount) => (
            <button
              key={amount}
              onClick={() => setPrepayment(amount * 10000)}
              className={`px-4 py-2 rounded-lg text-sm font-bold transition-all ${
                prepayment === amount * 10000
                  ? 'bg-red-500 text-white shadow-lg shadow-red-500/50'
                  : 'bg-[#1a1a1a]/80 text-gray-400 hover:bg-red-900/30'
              }`}
            >
              {amount}万
            </button>
          ))}
        </div>
      </div>

      {/* 实时结果 */}
      <div className="grid grid-cols-3 gap-4">
        <div className="bg-red-900/20 rounded-lg p-4 border border-red-500/30 text-center">
          <div className="text-xs text-gray-400 mb-2">月供立减</div>
          <AnimatePresence mode="wait">
            <motion.div
              key={monthlyReduction}
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 1.2, opacity: 0 }}
              className="text-2xl font-mono font-bold text-red-400"
            >
              {formatCurrency(monthlyReduction)}
            </motion.div>
          </AnimatePresence>
          <div className="text-xs text-red-500 mt-1">{reductionPercentage.toFixed(1)}%</div>
        </div>

        <div className="bg-orange-900/20 rounded-lg p-4 border border-orange-500/30 text-center">
          <div className="text-xs text-gray-400 mb-2">节省总利息</div>
          <AnimatePresence mode="wait">
            <motion.div
              key={totalInterestSaved}
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 1.2, opacity: 0 }}
              className="text-2xl font-mono font-bold text-orange-400"
            >
              {formatCurrency(totalInterestSaved)}
            </motion.div>
          </AnimatePresence>
          <div className="text-xs text-orange-500 mt-1">估算值</div>
        </div>

        <div className="bg-green-900/20 rounded-lg p-4 border border-green-500/30 text-center">
          <div className="text-xs text-gray-400 mb-2">提前天数</div>
          <AnimatePresence mode="wait">
            <motion.div
              key={daysSaved}
              initial={{ scale: 0.8, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 1.2, opacity: 0, y: -20 }}
              className="text-2xl font-mono font-bold text-green-400"
            >
              {daysSaved}天
            </motion.div>
          </AnimatePresence>
          <div className="text-xs text-green-500 mt-1">
            {(remainingMonthsOriginal - remainingMonthsNew)}个月
          </div>
        </div>
      </div>
    </div>
  );
}

// 右侧：备用金护盾
function ReserveFundShield({ current, target }: { current: number; target: number }) {
  const percentage = Math.min((current / target) * 100, 100);
  const remaining = target - current;

  return (
    <div className="bg-zinc-900/50 backdrop-blur-md rounded-lg p-4 border border-[#222]">
      <h3 className="text-sm font-bold mb-3 flex items-center gap-2" style={{ color: '#00ccff' }}>
        <Shield className="w-4 h-4" />
        备用金护盾
      </h3>

      <div className="mb-3">
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs text-gray-400">储备进度</span>
          <span className="text-sm font-mono font-bold text-blue-400">{percentage.toFixed(0)}%</span>
        </div>
        <div className="relative h-6 bg-[#1a1a1a] rounded overflow-hidden">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${percentage}%` }}
            className="absolute inset-y-0 left-0 rounded"
            style={{
              background: 'linear-gradient(90deg, #00ccff66, #00ccff)',
              boxShadow: '0 0 15px #00ccff66',
            }}
          />
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-xs font-mono font-bold text-white z-10">
              {formatCurrency(current)}
            </span>
          </div>
        </div>
      </div>

      <div className="flex items-center justify-between text-xs">
        <span className="text-gray-500">目标</span>
        <span className="font-mono text-blue-400">{formatCurrency(target)}</span>
      </div>
      {remaining > 0 && (
        <div className="flex items-center justify-between text-xs mt-1">
          <span className="text-gray-500">缺口</span>
          <span className="font-mono text-yellow-400">{formatCurrency(remaining)}</span>
        </div>
      )}
    </div>
  );
}

// 右侧：黄金储蓄罐
function GoldSavings({ grams, monthly }: { grams: number; monthly: number }) {
  const goldBarWeight = 100;
  const bars = Math.floor(grams / goldBarWeight);

  return (
    <div className="bg-zinc-900/50 backdrop-blur-md rounded-lg p-4 border border-[#222]">
      <h3 className="text-sm font-bold mb-3 flex items-center gap-2" style={{ color: '#ffcc00' }}>
        <Coins className="w-4 h-4" />
        黄金储蓄罐
      </h3>

      <div className="flex items-center justify-between mb-3">
        <div>
          <div className="text-xs text-gray-400">当前持有</div>
          <div className="text-2xl font-mono font-bold" style={{ color: '#ffcc00' }}>
            {grams.toFixed(1)} 克
          </div>
        </div>
        <div className="text-right">
          <div className="text-xs text-gray-400">月增</div>
          <div className="text-sm font-mono text-green-400">+{monthly}g</div>
        </div>
      </div>

      <div className="border-t border-[#222] pt-3">
        <div className="text-xs text-gray-500 mb-2">金条积累 (100g/根)</div>
        <GoldBarsVisualization grams={grams} />
      </div>

      <div className="mt-3 pt-3 border-t border-[#222]">
        <div className="flex items-center justify-between text-xs">
          <span className="text-gray-500">价值估算</span>
          <span className="font-mono" style={{ color: '#ffcc00' }}>
            {formatCurrency(grams * 500)}
          </span>
        </div>
      </div>
    </div>
  );
}

// 右侧：现金流漏斗（简化版）
function CashFlowMini({ salary, expenses, loanPayment, fundPayment }: any) {
  const netBalance = salary - expenses - loanPayment - fundPayment;

  const stages = [
    { label: '月薪', value: salary, color: '#00ff88' },
    { label: '-生活费', value: expenses, color: '#ffcc00' },
    { label: '-商贷', value: loanPayment, color: '#ff3366' },
    { label: '-公积金', value: fundPayment, color: '#00ccff' },
  ];

  return (
    <div className="bg-zinc-900/50 backdrop-blur-md rounded-lg p-4 border border-[#222]">
      <h3 className="text-sm font-bold mb-3 flex items-center gap-2 text-purple-400">
        <Wallet className="w-4 h-4" />
        现金流
      </h3>

      <div className="space-y-2">
        {stages.map((stage, i) => (
          <div key={i} className="flex items-center justify-between text-xs">
            <span className="text-gray-400">{stage.label}</span>
            <span className="font-mono" style={{ color: stage.color }}>
              {formatCurrency(stage.value)}
            </span>
          </div>
        ))}

        <div className="border-t border-[#222] pt-2 mt-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-gray-300">净结余</span>
            <span className="text-lg font-mono font-bold text-purple-400">
              {formatCurrency(netBalance)}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

// 底部状态栏
function StatusBar() {
  const today = new Date();
  const dateStr = `${today.getFullYear()}年${today.getMonth() + 1}月${today.getDate()}日`;

  return (
    <footer className="fixed bottom-0 left-0 right-0 z-50 bg-zinc-900/90 backdrop-blur-md border-t border-[#222]">
      <div className="max-w-full mx-auto px-4 py-2">
        <div className="flex items-center justify-center gap-3 text-sm">
          <Droplet className="w-4 h-4 text-blue-400" />
          <span>
            漂亮水杯提醒：今日补水进度 <span className="font-mono font-bold text-blue-400">4/4</span>
            <span className="mx-2 text-gray-600">|</span>
            策略：<span className="font-bold text-green-400">死磕商贷</span>，<span className="font-bold text-blue-400">保护公积金</span>
          </span>
        </div>
        <div className="text-xs text-gray-600 text-center mt-1 font-mono">{dateStr}</div>
      </div>
    </footer>
  );
}

export default function Home() {
  const [darkMode, setDarkMode] = useState(false);
  const [config, setConfig] = useState({
    salary: 19000,
    expenses: 6000,
    goldMonthly: 1.5,
    initialGold: 22,
  });

  const commercialLoan = {
    total: 1450000,
    remaining: 749776.79,
    rate: 3.2,
    monthlyPrincipal: 2387.82,
  };

  const housingFund = {
    monthlyPayment: 4099.22,
    monthlyCredit: 3320,
    actualPayment: 4099.22 - 3320,
  };

  const cashFlow = {
    currentCash: 20000,
    reserveTarget: 50000,
  };

  // 计算当前商贷月供
  const monthlyRate = commercialLoan.rate / 100 / 12;
  const currentMonthlyInterest = commercialLoan.remaining * monthlyRate;
  const currentCommercialPayment = commercialLoan.monthlyPrincipal + currentMonthlyInterest;

  // 计算黄金积累
  const monthlyPrincipal = commercialLoan.monthlyPrincipal;
  const remainingMonths = Math.ceil(commercialLoan.remaining / monthlyPrincipal);
  const totalGold = config.initialGold + remainingMonths * config.goldMonthly;

  return (
    <div className={`h-screen overflow-hidden transition-all ${darkMode ? 'bg-[#050510]' : 'bg-[#0a0a0a]'}`}>
      {/* Header */}
      <header className="h-16 border-b border-[#222] bg-zinc-900/50 backdrop-blur-md">
        <div className="h-full flex items-center px-6">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center gap-3"
          >
            <Activity className="w-8 h-8 text-green-400" />
            <div>
              <h1 className="text-xl font-bold neon-text">LOAN_CLEAR_PLAN.exe</h1>
              <p className="text-xs text-gray-500">房贷清零计划</p>
            </div>
          </motion.div>
        </div>
      </header>

      {/* Main Grid */}
      <main className="h-[calc(100vh-8rem)] overflow-hidden">
        <div className="h-full overflow-y-auto p-4">
          <div className="max-w-[1920px] mx-auto grid grid-cols-12 gap-4">
            {/* 左侧 (2列) */}
            <div className="col-span-12 lg:col-span-2">
              <ConfigSidebar
                darkMode={darkMode}
                onDarkModeToggle={() => setDarkMode(!darkMode)}
                config={config}
                onConfigChange={setConfig}
              />
            </div>

            {/* 中间 (7列) */}
            <div className="col-span-12 lg:col-span-7 space-y-4">
              <CommercialLoanProgress
                remaining={commercialLoan.remaining}
                target={commercialLoan.total}
              />
              <InterestBurnerLab
                remaining={commercialLoan.remaining}
                monthlyPrincipal={commercialLoan.monthlyPrincipal}
                interestRate={commercialLoan.rate}
                onDateUpdate={(months) => {
                  // 可以在这里触发日期更新动画
                }}
              />
            </div>

            {/* 右侧 (3列) */}
            <div className="col-span-12 lg:col-span-3 space-y-4">
              <ReserveFundShield
                current={cashFlow.currentCash}
                target={cashFlow.reserveTarget}
              />
              <GoldSavings grams={totalGold} monthly={config.goldMonthly} />
              <CashFlowMini
                salary={config.salary}
                expenses={config.expenses}
                loanPayment={currentCommercialPayment}
                fundPayment={housingFund.actualPayment}
              />
            </div>
          </div>
        </div>
      </main>

      <StatusBar />
    </div>
  );
}
