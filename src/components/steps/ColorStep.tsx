import { StepProps } from '../../types/bottles';
import { useState } from 'react';
import { bottleVariants } from '../../constants/bottles';

export function ColorStep({ design, updateDesign, onNext, onBack, onReset }: StepProps) {
  const [activeTab, setActiveTab] = useState<'white' | 'rose' | 'red'>('white');
  const [, setCustomColor] = useState('');

  return (
    <div className="w-full max-w-5xl mx-auto p-6 border rounded-md">
      <div className="flex justify-between items-center flex-wrap gap-4 mb-6">
        <div className="border-b pb-1">
          {Object.keys(bottleVariants).map((key) => (
            <button
              key={key}
              onClick={() => setActiveTab(key as 'white' | 'rose' | 'red')}
              className={`px-4 py-2 text-xs font-medium transition-all ${
                activeTab === key ? 'border-b border-cyan text-black' : 'text-black'
              }`}
            >
              {key === 'white' ? 'White Wine Variants' : key === 'rose' ? 'Rosé Wine Variants' : 'Red Wine Variants'}
            </button>
          ))}
        </div>
        <div className="relative">
          <label className="text-cyan text-sm cursor-pointer">
            Choose my own color
            <input
              type="color"
              className="absolute left-0 top-full mt-1 w-8 h-8 opacity-0 cursor-pointer"
              onChange={(e) => {
                setCustomColor(e.target.value);
                updateDesign({ color: e.target.value });
              }}
            />
          </label>
        </div>
      </div>
      <div className="grid lg:grid-cols-12 md:grid-cols-6 sm:grid-cols-7 grid-cols-6 gap-4 mt-6">
        {bottleVariants[activeTab].map((color) => (
          <button
            key={color.id}
            onClick={() => updateDesign({ color: color.value })}
            className={`p-4 border-2 rounded-lg aspect-square transition-all ${
              design.color === color.id ? 'border-cyan' : 'border-gray-200 hover:border-gray-300'
            }`}
            style={{ backgroundColor: color.value }}
          />
        ))}
      </div>
      <div className="mt-8 flex justify-between">
        <button
          onClick={onBack}
          className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
        >
          Back
        </button>
        <div className="space-x-4">
          <button
            onClick={onReset}
            className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
          >
            Reset
          </button>
          <button
            onClick={onNext}
            disabled={!design.color}
            className="px-4 py-2 text-sm font-medium text-white bg-cyan rounded-md hover:bg-cyan-700 disabled:opacity-50"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
}
