
import React, { useState, FormEvent, useEffect } from 'react';
import { CalculationResults, HeatmapDataPoint } from '../types';
import InfoIcon from './icons/InfoIcon';

interface CalculatorFormProps {
  onCalculate: (results: CalculationResults, heatmapData: HeatmapDataPoint[], sellingPrice: number, costOfGoods: number) => void;
}

const CalculatorForm: React.FC<CalculatorFormProps> = ({ onCalculate }) => {
  const [sellingPrice, setSellingPrice] = useState('50');
  const [costOfGoods, setCostOfGoods] = useState('15');
  const [confirmationRate, setConfirmationRate] = useState('70');
  const [pickupRate, setPickupRate] = useState('80');

  const calculate = React.useCallback(() => {
    const numSellingPrice = parseFloat(sellingPrice);
    const numCostOfGoods = parseFloat(costOfGoods);
    const numConfirmationRate = parseFloat(confirmationRate) / 100;
    const numPickupRate = parseFloat(pickupRate) / 100;

    if (isNaN(numSellingPrice) || isNaN(numCostOfGoods) || isNaN(numConfirmationRate) || isNaN(numPickupRate) || numSellingPrice <= 0) {
      return;
    }

    const marginValue = numSellingPrice - numCostOfGoods;
    const marginPercentage = (marginValue / numSellingPrice) * 100;
    const cogsPercentage = (numCostOfGoods / numSellingPrice) * 100;

    const maxCpa = marginValue * numConfirmationRate * numPickupRate;
    const testBudget = 50 * maxCpa;
    const dailyBudget = Math.ceil(testBudget / 7);

    const results: CalculationResults = {
      cogsPercentage: cogsPercentage > 0 ? cogsPercentage : 0,
      marginPercentage: marginPercentage > 0 ? marginPercentage : 0,
      marginValue: marginValue > 0 ? marginValue : 0,
      maxCpa: maxCpa > 0 ? maxCpa : 0,
      testBudget: testBudget > 0 ? testBudget : 0,
      dailyBudget: dailyBudget > 0 ? dailyBudget : 0,
    };

    const heatmapData: HeatmapDataPoint[] = [];
    const crSteps = [60, 65, 70, 75];
    const prSteps = [75, 80, 85];
    
    prSteps.forEach(pr => {
        crSteps.forEach(cr => {
            const currentCr = cr / 100;
            const currentPr = pr / 100;
            const cpa = marginValue * currentCr * currentPr;
            heatmapData.push({
                confirmationRate: cr,
                pickupRate: pr,
                maxCpa: cpa > 0 ? cpa : 0,
            });
        });
    });
    
    onCalculate(results, heatmapData, numSellingPrice, numCostOfGoods);
  }, [sellingPrice, costOfGoods, confirmationRate, pickupRate, onCalculate]);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    calculate();
  };
    
  const setAverageValues = () => {
    setSellingPrice('50');
    setCostOfGoods('15');
    setConfirmationRate('70');
    setPickupRate('80');
  };

  useEffect(() => {
    calculate();
  }, [calculate]);


  return (
    <form onSubmit={handleSubmit} className="glass-panel p-6">
      <div className="space-y-6">
        <h2 className="text-2xl font-bold text-center text-white">Исходные данные</h2>
        <InputField 
          label="Цена продажи товара" 
          value={sellingPrice} 
          onChange={setSellingPrice} 
          tooltip="Конечная цена, по которой клиент покупает ваш товар." 
          unit="$"
        />
        <InputField 
          label="Себестоимость товара" 
          value={costOfGoods} 
          onChange={setCostOfGoods} 
          tooltip="Полная стоимость производства/закупки одной единицы товара." 
          unit="$"
        />
        <InputField 
          label="Процент подтвержденных заказов" 
          value={confirmationRate} 
          onChange={setConfirmationRate} 
          tooltip="Какой процент от всех оставленных заявок подтверждается оператором." 
          unit="%"
        />
        <InputField 
          label="Процент выкупа на почте" 
          value={pickupRate} 
          onChange={setPickupRate} 
          tooltip="Какой процент из подтвержденных заказов клиенты забирают и оплачивают." 
          unit="%"
        />
      </div>
       <div className="mt-6 text-center">
        <button type="button" onClick={setAverageValues} className="text-accent hover:text-white transition-colors duration-200 text-sm">
          Поставить средние значения
        </button>
      </div>
      <button type="submit" className="mt-6 w-full bg-accent hover:bg-opacity-80 text-white font-bold py-3 px-4 rounded-lg transition-all duration-200 ease-in-out transform hover:scale-105 active:scale-95 shadow-lg">
        Рассчитать
      </button>
    </form>
  );
};

const InputField: React.FC<{ label: string; value: string; onChange: (val: string) => void; tooltip: string; unit: string; }> = ({ label, value, onChange, tooltip, unit }) => (
  <div>
    <label className="block text-sm font-medium text-gray-300 mb-2">
      <div className="flex items-center">
        {label}
        <div className="relative flex items-center group ml-2">
            <InfoIcon className="h-4 w-4 text-gray-400" />
            <div className="absolute left-1/2 -translate-x-1/2 bottom-full mb-2 w-64 p-3 bg-neutral text-white text-xs rounded-lg shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-50 border border-gray-700">
                {tooltip}
            </div>
        </div>
      </div>
    </label>
    <div className="relative">
        <input
          type="number"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="w-full pl-4 pr-8 py-2 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-accent transition"
        />
        <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400">{unit}</span>
    </div>
  </div>
);

export default CalculatorForm;