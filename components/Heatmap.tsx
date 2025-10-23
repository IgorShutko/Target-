import React from 'react';
import { HeatmapDataPoint } from '../types';
import AnimatedNumber from './AnimatedNumber';

interface HeatmapProps {
  data: HeatmapDataPoint[];
}

const Heatmap: React.FC<HeatmapProps> = ({ data }) => {
  if (!data || data.length === 0) {
    return null;
  }

  const confirmationRates = [...new Set(data.map(item => item.confirmationRate))].sort((a, b) => a - b);
  const pickupRates = [...new Set(data.map(item => item.pickupRate))].sort((a, b) => b - a);

  const getDataPoint = (pr: number, cr: number) => {
    return data.find(d => d.pickupRate === pr && d.confirmationRate === cr);
  };

  const maxCpaValues = data.map(d => d.maxCpa);
  const minCpa = maxCpaValues.length > 0 ? Math.min(...maxCpaValues) : 0;
  const maxCpa = maxCpaValues.length > 0 ? Math.max(...maxCpaValues) : 0;

  const getColorStyle = (value: number): React.CSSProperties => {
    if (maxCpa <= minCpa) {
      return { backgroundColor: 'hsla(120, 60%, 50%, 0.4)', borderColor: 'hsla(120, 60%, 50%, 0.6)' };
    }
    const percentage = (value - minCpa) / (maxCpa - minCpa);
    const hue = percentage * 120; // 0 for red, 120 for green
    return {
        backgroundColor: `hsla(${hue}, 60%, 50%, 0.4)`,
        borderColor: `hsla(${hue}, 60%, 50%, 0.6)`
    };
  };

  const formatter = (value: number) => `$${value.toFixed(2)}`;

  return (
    <div className="glass-panel p-6">
      <h2 className="text-2xl font-bold mb-4 text-white text-center">Тепловая карта предельного CPA</h2>
      <p className="text-center text-gray-400 mb-6 text-sm">
        Как меняется CPA в зависимости от процента подтвержденных заказов и выкупа.
      </p>
      <div className="overflow-x-auto">
        <table className="w-full text-center border-collapse">
          <thead>
            <tr className="border-b border-white/20">
              <th className="p-3 text-sm font-semibold text-gray-300">
                <div className="text-right pr-2">Выкуп %</div>
                <div className="text-left pl-2 -mt-1 font-normal text-xs text-gray-400">Подтвер. %</div>
              </th>
              {confirmationRates.map(cr => (
                <th key={cr} className="p-3 text-sm font-semibold text-gray-300">{cr}%</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {pickupRates.map(pr => (
              <tr key={pr} className="border-b border-white/10 last:border-b-0">
                <th className="p-3 font-semibold text-gray-300">{pr}%</th>
                {confirmationRates.map(cr => {
                  const dataPoint = getDataPoint(pr, cr);
                  if (!dataPoint) {
                    return <td key={cr} className="p-1"></td>;
                  }
                  return (
                    <td 
                      key={cr} 
                      className="p-1"
                    >
                      <div 
                        style={getColorStyle(dataPoint.maxCpa)}
                        className="rounded-lg p-2 text-white border transition-all duration-300 ease-in-out transform hover:scale-110 hover:shadow-xl"
                        title={`Подтверждение: ${cr}%, Выкуп: ${pr}%`}
                      >
                         <div className="text-lg font-bold">
                            <AnimatedNumber value={dataPoint.maxCpa} formatter={formatter} />
                         </div>
                      </div>
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Heatmap;
