import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import { getEmoji, getBackgroundColor } from './utils';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  value: number;
  metricName: string;
  companyName: string;
  metricAverage: number;
  companyAverage: number;
}

export const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  value,
  metricName,
  companyName,
  metricAverage,
  companyAverage,
}) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4"
            onClick={onClose}
          >
            {/* Modal */}
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-gray-900 rounded-xl shadow-2xl max-w-md w-full p-6"
              onClick={e => e.stopPropagation()}
            >
              {/* Header */}
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-xl font-semibold text-white">{companyName}</h3>
                <button
                  onClick={onClose}
                  className="p-2 hover:bg-gray-800 rounded-full transition-colors"
                >
                  <X className="w-5 h-5 text-gray-400" />
                </button>
              </div>

              {/* Content */}
              <div className="space-y-6">
                <div className={`${getBackgroundColor(value)} p-8 rounded-lg flex flex-col items-center`}>
                  <span className="text-6xl mb-4">{getEmoji(value)}</span>
                  <span className="text-3xl font-bold">{value}%</span>
                </div>

                <div className="space-y-4">
                  <div className="space-y-2">
                    <h4 className="text-gray-400">Métrica</h4>
                    <p className="text-white text-lg">{metricName}</p>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <h4 className="text-gray-400">Media de la métrica</h4>
                      <p className="text-white text-lg">{metricAverage}%</p>
                    </div>
                    <div className="space-y-2">
                      <h4 className="text-gray-400">Media de la empresa</h4>
                      <p className="text-white text-lg">{companyAverage}%</p>
                    </div>
                  </div>

                  <div className="pt-4 border-t border-gray-700">
                    <div className="flex justify-between items-center">
                      <span className="text-gray-400">Comparación con la media</span>
                      <span className={`text-lg ${
                        value > metricAverage ? 'text-green-400' : 'text-red-400'
                      }`}>
                        {value > metricAverage ? '+' : ''}{(value - metricAverage).toFixed(1)}%
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};