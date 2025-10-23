
import React from 'react';
import { CalculationResults } from '../types';
import AnimatedNumber from './AnimatedNumber';
import InfoIcon from './icons/InfoIcon';

interface ResultsDashboardProps {
  results: CalculationResults;
  costOfGoods: number;
  sellingPrice: number;
}

const ResultsDashboard: React.FC<ResultsDashboardProps> = ({ results, costOfGoods, sellingPrice }) => {
  const isDataValid = results.marginValue > 0 && costOfGoods > 0 && sellingPrice > 0;
  
  return (
    <div className="glass-panel p-6">
      <h2 className="text-2xl font-bold mb-6 text-white text-center">Результаты</h2>
      
      {isDataValid ? (
        <div className="space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <ResultCard
              title="Маржа, %"
              value={results.marginPercentage}
              unit="%"
              tooltip="Процент от цены продажи, который является вашей прибылью. (Цена - Себестоимость) / Цена."
            />
            <ResultCard
              title="Предельный CPA"
              value={results.maxCpa}
              unit="$"
              isPrimary
              tooltip="Максимальная стоимость привлечения клиента (Cost Per Acquisition), при которой вы не уходите в минус."
            />
            <ResultCard
              title="COGS, %"
              value={results.cogsPercentage}
              unit="%"
              tooltip="Процент от цены продажи, который уходит на себестоимость товара. Себестоимость / Цена."
            />
          </div>

          <div className="px-4">
            <h3 className="text-lg font-semibold text-center text-gray-300 mb-3">Структура цены продажи</h3>
            <div className="w-full bg-neutral rounded-full h-8 flex overflow-hidden border border-white/20">
              <div 
                className="bg-accent h-full flex items-center justify-center text-xs font-bold text-white transition-all duration-1000 ease-out"
                style={{ width: `${results.marginPercentage}%`}}
                title={`Маржа: ${results.marginPercentage.toFixed(1)}%`}
              >
                ${results.marginValue.toFixed(2)}
              </div>
              <div 
                className="bg-yellow-500 h-full flex items-center justify-center text-xs font-bold text-black transition-all duration-1000 ease-out"
                style={{ width: `${results.cogsPercentage}%`}}
                title={`Себестоимость: ${results.cogsPercentage.toFixed(1)}%`}
              >
                ${costOfGoods.toFixed(2)}
              </div>
            </div>
             <div className="flex justify-between mt-2 text-xs text-gray-400 px-1">
                <div><span className="w-2 h-2 rounded-full bg-accent inline-block mr-2"></span>Маржа</div>
                <div><span className="w-2 h-2 rounded-full bg-yellow-500 inline-block mr-2"></span>Себестоимость</div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <ResultCard
              title="Бюджет на тест"
              value={results.testBudget}
              unit="$"
              tooltip="Бюджет, необходимый для получения 50 целевых действий при вашей предельной CPA."
            />
            <ResultCard
              title="Бюджет в день"
              value={results.dailyBudget}
              unit="$/день"
              tooltip="Рекомендуемый дневной бюджет на 7-дневный тестовый период."
            />
          </div>
        </div>
      ) : (
        <div className="text-center py-10 text-gray-400">
          <p>Введите корректные данные в форме слева, чтобы увидеть расчеты.</p>
        </div>
      )}
    </div>
  );
};

interface ResultCardProps {
    title: string;
    value: number;
    unit: string;
    tooltip: string;
    isPrimary?: boolean;
}

const ResultCard: React.FC<ResultCardProps> = ({ title, value, unit, tooltip, isPrimary = false }) => (
    <div className={`bg-white/10 p-4 rounded-2xl text-center border border-white/20 transition-all duration-300 ease-in-out transform hover:scale-103 hover:shadow-xl hover:border-white/30 ${isPrimary ? 'md:scale-110 md:shadow-2xl' : ''}`}>
        <div className="flex items-center justify-center text-sm font-medium text-gray-300 mb-2">
            {title}
            <div className="relative flex items-center group ml-1.5">
                <InfoIcon className="h-4 w-4" />
                <div className="absolute left-1/2 -translate-x-1/2 bottom-full mb-2 w-64 p-3 bg-neutral text-white text-xs rounded-lg shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-50 border border-gray-700">
                    {tooltip}
                </div>
            </div>
        </div>
        <p className={`text-3xl font-bold ${isPrimary ? 'text-transparent bg-clip-text bg-gradient-to-r from-accent to-yellow-500' : 'text-white'}`}>
            <AnimatedNumber value={value} />
            <span className={`text-lg ml-1 ${isPrimary ? 'text-accent/80' : 'text-gray-400'}`}>{unit}</span>
        </p>
    </div>
);


export default ResultsDashboard;