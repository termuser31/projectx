import React, { useState } from 'react';
import { Menu, X, Settings, HelpCircle, BarChart2, ChevronLeft, ChevronRight } from 'lucide-react';
import { Company, Metric } from '../types';
import { Controls } from './Controls';
import { motion, AnimatePresence } from 'framer-motion';

interface LayoutProps {
  children: React.ReactNode;
  companies: Company[];
  metrics: Metric[];
  onCompanyChange: (index: number) => void;
  onMetricChange: (index: number) => void;
  onSelectAll: () => void;
  onClearAll: () => void;
}

export const Layout: React.FC<LayoutProps> = ({
  children,
  companies,
  metrics,
  onCompanyChange,
  onMetricChange,
  onSelectAll,
  onClearAll,
}) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gray-900">
      {/* Mobile menu button */}
      <button
        onClick={() => setMobileMenuOpen(true)}
        className="fixed z-50 m-4 p-2 rounded-lg bg-gray-800 shadow-lg md:hidden"
      >
        <Menu className="w-6 h-6 text-gray-400" />
      </button>

      {/* Desktop toggle button */}
      <button
        onClick={() => setSidebarOpen(!sidebarOpen)}
        className="fixed z-50 left-0 top-1/2 -translate-y-1/2 hidden md:flex items-center justify-center w-6 h-24 bg-gray-800 shadow-lg rounded-r-lg hover:bg-gray-700 transition-colors"
      >
        {sidebarOpen ? (
          <ChevronLeft className="w-4 h-4 text-gray-400" />
        ) : (
          <ChevronRight className="w-4 h-4 text-gray-400" />
        )}
      </button>

      {/* Sidebar - Desktop */}
      <motion.div
        initial={{ x: -288 }}
        animate={{ x: sidebarOpen ? 0 : -288 }}
        transition={{ duration: 0.3, ease: 'easeInOut' }}
        className="fixed inset-y-0 left-0 z-40 w-72 bg-gray-800 shadow-xl hidden md:block"
      >
        <SidebarContent
          companies={companies}
          metrics={metrics}
          onCompanyChange={onCompanyChange}
          onMetricChange={onMetricChange}
          onSelectAll={onSelectAll}
          onClearAll={onClearAll}
          onClose={() => setSidebarOpen(false)}
        />
      </motion.div>

      {/* Sidebar - Mobile */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden"
              onClick={() => setMobileMenuOpen(false)}
            />
            <motion.div
              initial={{ x: -288 }}
              animate={{ x: 0 }}
              exit={{ x: -288 }}
              transition={{ duration: 0.3, ease: 'easeInOut' }}
              className="fixed inset-y-0 left-0 z-50 w-72 bg-gray-800 shadow-xl md:hidden"
            >
              <SidebarContent
                companies={companies}
                metrics={metrics}
                onCompanyChange={onCompanyChange}
                onMetricChange={onMetricChange}
                onSelectAll={onSelectAll}
                onClearAll={onClearAll}
                onClose={() => setMobileMenuOpen(false)}
                isMobile
              />
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Main content */}
      <motion.div
        initial={{ paddingLeft: 0 }}
        animate={{ paddingLeft: sidebarOpen ? '18rem' : 0 }}
        transition={{ duration: 0.3, ease: 'easeInOut' }}
        className="w-full"
      >
        <main className="p-6">{children}</main>
      </motion.div>
    </div>
  );
};

interface SidebarContentProps extends Omit<LayoutProps, 'children'> {
  onClose: () => void;
  isMobile?: boolean;
}

const SidebarContent: React.FC<SidebarContentProps> = ({
  companies,
  metrics,
  onCompanyChange,
  onMetricChange,
  onSelectAll,
  onClearAll,
  onClose,
  isMobile,
}) => (
  <div className="h-full flex flex-col">
    {/* Sidebar header */}
    <div className="p-4 border-b border-gray-700 flex items-center justify-between">
      <div className="flex items-center gap-2">
        <BarChart2 className="w-6 h-6 text-blue-500" />
        <h2 className="font-semibold text-gray-200">Análisis Empresarial</h2>
      </div>
      {isMobile && (
        <button
          onClick={onClose}
          className="p-2 rounded-lg hover:bg-gray-700 transition-colors"
        >
          <X className="w-5 h-5 text-gray-400" />
        </button>
      )}
    </div>

    {/* Sidebar content */}
    <div className="flex-1 overflow-y-auto p-4">
      <Controls
        companies={companies}
        metrics={metrics}
        onCompanyChange={onCompanyChange}
        onMetricChange={onMetricChange}
        onSelectAll={onSelectAll}
        onClearAll={onClearAll}
        onUpdateChart={() => {}}
        layout="vertical"
      />
    </div>

    {/* Sidebar footer */}
    <div className="p-4 border-t border-gray-700">
      <div className="flex justify-around">
        <button className="p-2 rounded-lg hover:bg-gray-700 transition-colors">
          <Settings className="w-5 h-5 text-gray-400" />
        </button>
        <button className="p-2 rounded-lg hover:bg-gray-700 transition-colors">
          <HelpCircle className="w-5 h-5 text-gray-400" />
        </button>
      </div>
    </div>
  </div>
);