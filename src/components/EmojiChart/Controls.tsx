import React from 'react';
import { motion } from 'framer-motion';
import { RotateCcw } from 'lucide-react';
import { Button } from '../ui/Button';
import { getEmoji } from './utils';

interface ControlsProps {
  onToggleCompact: () => void;
  isCompact: boolean;
  selectedEmoji: string | null;
  onEmojiSelect: (emoji: string | null) => void;
}

const EMOJI_RANGES = [
  { emoji: '😁', label: 'Excelente', range: [90, 100] },
  { emoji: '😊', label: 'Bueno', range: [70, 89] },
  { emoji: '😐', label: 'Regular', range: [50, 69] },
  { emoji: '😕', label: 'Bajo', range: [30, 49] },
  { emoji: '😢', label: 'Crítico', range: [0, 29] },
];

export const Controls: React.FC<ControlsProps> = ({
  onToggleCompact,
  isCompact,
  selectedEmoji,
  onEmojiSelect,
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex flex-wrap gap-4 mb-4 p-4 bg-gray-800 rounded-lg"
    >
      <Button
        onClick={onToggleCompact}
        variant="secondary"
        className="bg-gray-700 hover:bg-gray-600 text-gray-200"
      >
        {isCompact ? 'Vista Expandida' : 'Vista Compacta'}
      </Button>

      <div className="flex items-center gap-2">
        {EMOJI_RANGES.map(({ emoji, label }) => (
          <button
            key={emoji}
            onClick={() => onEmojiSelect(selectedEmoji === emoji ? null : emoji)}
            className={`flex flex-col items-center p-2 rounded-lg transition-all ${
              selectedEmoji === emoji
                ? 'bg-blue-500 scale-110'
                : 'bg-gray-700 hover:bg-gray-600'
            }`}
          >
            <span className="text-2xl">{emoji}</span>
            <span className="text-xs text-gray-300 mt-1">{label}</span>
          </button>
        ))}

        {selectedEmoji && (
          <Button
            onClick={() => onEmojiSelect(null)}
            variant="secondary"
            className="bg-gray-700 hover:bg-gray-600 text-gray-200"
            icon={<RotateCcw className="w-4 h-4" />}
          >
            Restaurar
          </Button>
        )}
      </div>
    </motion.div>
  );
};

export { EMOJI_RANGES };