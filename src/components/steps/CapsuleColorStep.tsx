import { StepProps } from '../../types/bottles';
import CapsuleScene from '../models-components/capsuleScene';

const bottleVariants = [
  { id: 'white', name: 'White', colors: Array.from({ length: 10 }, (_, i) => `hsl(60, 100%, ${90 - i * 2}%)`) },
  { id: 'rose', name: 'Rosé', colors: Array.from({ length: 10 }, (_, i) => `hsl(0, 70%, ${90 - i * 2}%)`) },
  { id: 'red', name: 'Red', colors: Array.from({ length: 4 }, (_, i) => `hsl(350, 60%, ${80 - i * 2}%)`) },
];

export function CapsuleColorStep({ design, updateDesign, onNext, onBack, onReset }: StepProps) {
  return (
    <div className="w-full max-w-4xl mx-auto border p-6 rounded-md">
      <div>
        <div className="flex flex-col items-center justify-center border bg-gray-100 p-8 rounded-lg">
          <div className="w-64 h-96 rounded-lg">
            <CapsuleScene
              key={`preview-${design.capsule}`}
              capsuleModelId={design.capsule}
              className="w-full h-full"
              interactive={false}
              color={design.capsuleColor}
            />
          </div>
        </div>
        <div className="flex flex-col space-y-4">
          <div className='flex justify-between flex-wrap items-center my-2'>
            <h2 className="text-lg font-bold text-gray-900">Choose capsule color</h2>
            <div className="relative">
              <label className="text-cyan text-sm cursor-pointer">
                Choose my own color
                <input
                  type="color"
                  className="absolute left-0 top-full mt-1 w-8 h-8 opacity-0 cursor-pointer"
                  onChange={(e) => {
                    updateDesign({ capsuleColor: e.target.value });
                  }}
                />
              </label>
            </div>
          </div>
          <div className="grid lg:grid-cols-12 md:grid-cols-6 sm:grid-cols-7 grid-cols-6 gap-4 mt-6">
            {bottleVariants.map((variant) =>
              variant.colors.map((color, index) => (
                <button
                  key={`${variant.id}-${index}`}
                  onClick={() => updateDesign({ capsuleColor: color })}
                  className={`p-4 border-2 rounded-lg aspect-square transition-all ${
                    design.capsuleColor === color ? 'border-cyan' : 'border-gray-200 hover:border-gray-300'
                  }`}
                  style={{ backgroundColor: color }}
                />
              )),
            )}
          </div>
        </div>
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
            disabled={!design.capsuleColor}
            className="px-4 py-2 text-sm font-medium text-white bg-cyan rounded-md hover:bg-cyan-600 disabled:opacity-50"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
}
