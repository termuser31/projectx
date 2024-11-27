import React from 'react';
import { motion } from 'framer-motion';
import { EmojiCard } from './EmojiCard';
import { Company, Metric, CompanyData } from '../../types';
import { calculateAverages } from './utils';

interface MobileViewProps {
  companies: Company[];
  metrics: Metric[];
  data: CompanyData[];
  shouldHighlight: (value: number) => boolean;
  onCardClick: (params: {
    value: number;
    metricName: string;
    companyName: string;
    metricAverage: number;
    companyAverage: number;
  }) => void;
}

export const MobileView: React.FC<MobileViewProps> = ({
  companies,
  metrics,
  data,
  onCardClick,
  shouldHighlight,
}) => {
  const selectedCompanies = companies.filter(c => c.selected);
  const selectedMetrics = metrics.filter(m => m.selected);
  
  const { columnAverages, rowAverages } = calculateAverages(
    data.filter(row => selectedCompanies.some(c => c.name === row.Empresa)),
    selectedMetrics.map(m => m.name)
  );

  return (
    <div className="space-y-8">
      {selectedCompanies.map((company, companyIndex) => {
        const companyData = data.find(d => d.Empresa === company.name);
        
        return (
          <motion.div
            key={company.name}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-gray-800 rounded-lg p-4"
          >
            <h3 className="text-lg font-semibold text-white mb-4">{company.name}</h3>
            <div className="grid grid-cols-2 gap-3">
              {selectedMetrics.map((metric, metricIndex) => {
                const value = parseInt(companyData?.[metric.name] || '0', 10);
                
                return (
                  <div key={metric.name} className="aspect-square">
                    <EmojiCard
                      value={value}
                      metricName={metric.name}
                      companyName={company.name}
                      metricAverage={columnAverages[metricIndex]}
                      companyAverage={rowAverages[companyIndex]}
                      highlighted={shouldHighlight(value)}
                      onClick={() => onCardClick({
                        value,
                        metricName: metric.name,
                        companyName: company.name,
                        metricAverage: columnAverages[metricIndex],
                        companyAverage: rowAverages[companyIndex],
                      })}
                    />
                  </div>
                );
              })}
            </div>
          </motion.div>
        );
      })}
    </div>
  );
};