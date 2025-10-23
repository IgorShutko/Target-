import React, { useState } from 'react';
import CalculatorForm from './components/CalculatorForm';
import ResultsDashboard from './components/ResultsDashboard';
import Heatmap from './components/Heatmap';
import Explanation from './components/Explanation';
import { CalculationResults, HeatmapDataPoint } from './types';

const App: React.FC = () => {
  const [results, setResults] = useState<CalculationResults | null>(null);
  const [heatmapData, setHeatmapData] = useState<HeatmapDataPoint[]>([]);
  const [formInputs, setFormInputs] = useState<{ sellingPrice: number; costOfGoods: number } | null>(null);

  const handleCalculate = (
    newResults: CalculationResults,
    newHeatmapData: HeatmapDataPoint[],
    sellingPrice: number,
    costOfGoods: number
  ) => {
    setResults(newResults);
    setHeatmapData(newHeatmapData);
    setFormInputs({ sellingPrice, costOfGoods });
  };

  return (
    <div className="min-h-screen font-sans text-white relative z-10">
      <header className="py-10">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-400">Калькулятор маркетингового бюджета</h1>
          <p className="text-gray-300 mt-2 text-lg">
            Определите вашу максимальную CPA и тестовый бюджет на основе ваших бизнес-метрик.
          </p>
        </div>
      </header>
      <main className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
          <div className="lg:col-span-1">
            <CalculatorForm onCalculate={handleCalculate} />
          </div>
          <div className="lg:col-span-2 space-y-8">
            {results && formInputs && (
              <ResultsDashboard
                results={results}
                costOfGoods={formInputs.costOfGoods}
                sellingPrice={formInputs.sellingPrice}
              />
            )}
            {heatmapData.length > 0 && <Heatmap data={heatmapData} />}
            <Explanation />
          </div>
        </div>
      </main>
      <footer className="mt-8 py-6">
          <div className="container mx-auto px-4 text-center text-gray-500 text-sm">
              <p>&copy; {new Date().getFullYear()} Калькулятор маркетингового бюджета. Все права защищены.</p>
          </div>
      </footer>
    </div>
  );
};

export default App;