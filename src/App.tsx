import React, { useState } from 'react';
import { Layout } from './components/Layout';
import { ComparisonChart } from './components/ComparisonChart';
import { BarChart3D } from './components/BarChart3D';
import { EmojiChart } from './components/EmojiChart';
import { useSheetData } from './hooks/useSheetData';
import { COMPANIES, METRICS } from './config/constants';

function App() {
  const [companies, setCompanies] = useState(COMPANIES);
  const [metrics, setMetrics] = useState(METRICS);
  const { data, loading, error } = useSheetData();

  const handleCompanyChange = (index: number) => {
    const newCompanies = [...companies];
    newCompanies[index].selected = !newCompanies[index].selected;
    setCompanies(newCompanies);
  };

  const handleMetricChange = (index: number) => {
    const newMetrics = [...metrics];
    newMetrics[index].selected = !newMetrics[index].selected;
    setMetrics(newMetrics);
  };

  const handleSelectAll = () => {
    setCompanies(companies.map(c => ({ ...c, selected: true })));
    setMetrics(metrics.map(m => ({ ...m, selected: true })));
  };

  const handleClearAll = () => {
    setCompanies(companies.map(c => ({ ...c, selected: false })));
    setMetrics(metrics.map(m => ({ ...m, selected: false })));
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
          <p className="text-gray-400">Cargando datos...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="bg-gray-800 p-6 rounded-lg shadow-lg max-w-md w-full">
          <div className="text-center">
            <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-red-900 mb-4">
              <svg className="w-6 h-6 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </div>
            <h2 className="text-xl font-semibold text-gray-200 mb-2">Error al cargar datos</h2>
            <p className="text-gray-400">{error}</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <Layout
      companies={companies}
      metrics={metrics}
      onCompanyChange={handleCompanyChange}
      onMetricChange={handleMetricChange}
      onSelectAll={handleSelectAll}
      onClearAll={handleClearAll}
    >
      <div className="space-y-8 bg-gray-900 min-h-screen">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <ComparisonChart
            companies={companies}
            metrics={metrics}
            data={data}
          />
          <BarChart3D
            companies={companies}
            metrics={metrics}
            data={data}
          />
        </div>
        <EmojiChart
          companies={companies}
          metrics={metrics}
          data={data}
        />
      </div>
    </Layout>
  );
}

export default App;