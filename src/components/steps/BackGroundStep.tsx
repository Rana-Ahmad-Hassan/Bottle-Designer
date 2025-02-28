import { StepProps } from '../../types/bottles';
import { backgroundTypes, bottleColors } from '../../constants/bottles';

export function BackgroundStep({ design, updateDesign, onNext, onBack, onReset }: StepProps) {
  return (
    <div className="w-full max-w-4xl mx-auto p-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="flex flex-col space-y-4">
          <h2 className="text-2xl font-bold text-gray-900">Choose background for your bottle</h2>
          <div className="grid grid-cols-2 gap-4">
            {backgroundTypes.map((bg) => (
              <button
                key={bg.id}
                onClick={() => updateDesign({ background: bg.id })}
                className={`p-4 border-2 rounded-lg transition-all ${
                  design.background === bg.id ? 'border-cyan-600' : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <div className="w-full h-32 rounded-lg" style={{ background: bg.value }} />
                <p className="mt-2 text-sm text-center">{bg.name}</p>
              </button>
            ))}
          </div>
        </div>
        <div
          className="flex flex-col items-center justify-center p-8 rounded-lg"
          style={{
            background: backgroundTypes.find((bg) => bg.id === design.background)?.value || 'transparent',
          }}
        >
          <div
            className={`w-64 h-96 rounded-lg ${design.texture || ''}`}
            style={{
              backgroundColor: bottleColors.find((c) => c.id === design.color)?.value || 'transparent',
              boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
            }}
          >
            {design.label && (
              <img src={URL.createObjectURL(design.label)} alt="Bottle label" className="w-full h-auto" />
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
            className="px-4 py-2 text-sm font-medium text-white bg-cyan-600 rounded-md hover:bg-cyan-700"
          >
            Save Design
          </button>
        </div>
      </div>
    </div>
  );
}
