import { capsuleOptions } from '../../constants/bottles';
import { StepProps } from '../../types/bottles';
export function CapsuleStep({ design, updateDesign, onNext, onBack, onReset }: StepProps) {
  return (
    <div className="w-full max-w-5xl mx-auto p-6 border shadow-sm rounded-md">
      <div>
        <div className="flex flex-col space-y-3">
          <h2 className="text-lg font-bold text-gray-900">Choose capsule for your bottle</h2>
          <div className="grid grid-cols-2 lg:grid-cols-4 md:grid-cols-4 sm:grid-cols-2 gap-2">
            {capsuleOptions.map((capsule) => (
              <div key={capsule.type} className="flex flex-col items-center">
                <div
                  role="button"
                  tabIndex={0}
                  className={`relative cursor-pointer rounded-lg overflow-hidden transition-all p-3 ${
                    design.capsule === capsule.type ? 'border-primary bg-cyan' : 'bg-blue-300/20'
                  }`}
                  onClick={() => updateDesign({ capsule: capsule.type })}
                >
                  <div className="flex justify-center">
                    <img
                      src={capsule.image || '/placeholder.svg'}
                      alt={capsule.name}
                      className="h-24 w-40 object-contain mix-blend-darken"
                    />
                  </div>
                </div>
                <span className="text-sm text-center mt-2">{capsule.name}</span>
              </div>
            ))}
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
            disabled={!design.capsule}
            className="px-4 py-2 text-sm font-medium text-white bg-cyan rounded-md hover:bg-cyan disabled:opacity-50"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
}
