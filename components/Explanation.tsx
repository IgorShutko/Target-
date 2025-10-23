import React from 'react';
import InfoIcon from './icons/InfoIcon';

const Explanation: React.FC = () => {
  return (
    <div className="glass-panel p-6">
      <h2 className="text-2xl font-bold mb-4 text-white flex items-center">
        <InfoIcon className="h-6 w-6 mr-3 text-accent" />
        Как это работает?
      </h2>
      <div className="space-y-4 text-gray-300">
        <p>
          Этот калькулятор помогает вам понять ключевые метрики для вашего бизнеса и определить, сколько вы можете тратить на привлечение одного клиента, чтобы оставаться в плюсе.
        </p>
        
        <ExplanationSection title="Предельный CPA (Cost Per Acquisition)">
          <p>
            Это максимальная сумма, которую вы можете заплатить за привлечение одного клиента (за одну покупку), не теряя при этом деньги. Она рассчитывается на основе вашей маржи с учетом реальных показателей бизнеса.
          </p>
          <p className="mt-2 text-sm text-gray-400 bg-neutral/50 p-3 rounded-lg border border-white/20">
            <strong>Формула:</strong> <br/>
            <code>(Цена продажи - Себестоимость) * % Подтвержденных * % Выкупа</code>
          </p>
        </ExplanationSection>

        <ExplanationSection title="Важные примечания">
            <ul className="list-disc list-inside space-y-2 text-sm">
                <li>Не учитывается LTV (повторные покупки клиента).</li>
                <li>Для обучения рекламных алгоритмов (например, Facebook) обычно требуется около 50 целевых действий.</li>
                <li>Тестовый период в 7 дней соответствует стандартному окну атрибуции Meta.</li>
                <li>Важно учитывать реальную себестоимость товара, включая все связанные расходы.</li>
                <li>Калькулятор не учитывает операционные расходы (зарплаты, аренда и т.д.).</li>
            </ul>
        </ExplanationSection>

        <ExplanationSection title="Тепловая карта">
          <p>
            Тепловая карта наглядно показывает, как сильно ваша предельная CPA зависит от показателей подтверждения и выкупа заказов. Работая над улучшением этих метрик, вы можете значительно увеличить сумму, которую можете тратить на рекламу, и, следовательно, расти быстрее.
          </p>
        </ExplanationSection>

      </div>
    </div>
  );
};

const ExplanationSection: React.FC<{ title: string; children: React.ReactNode }> = ({ title, children }) => (
    <div className="pt-4">
        <h3 className="text-lg font-semibold text-white mb-2">{title}</h3>
        <div className="border-l-2 border-accent pl-4">
            {children}
        </div>
    </div>
);

export default Explanation;