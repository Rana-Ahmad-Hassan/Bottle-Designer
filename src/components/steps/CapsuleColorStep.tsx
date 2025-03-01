import { capsuleVariants } from '../../constants/bottles';
import { StepProps } from '../../types/bottles';

export function CapsuleColorStep({ design, updateDesign, onNext, onBack, onReset }: StepProps) {
  return (
    <div className="w-full max-w-5xl mx-auto border p-6 rounded-md">
      <div>
        <div className="flex flex-col space-y-4">
          <div className="flex justify-between flex-wrap items-center my-2">
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
            {capsuleVariants.map((variant) =>
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
