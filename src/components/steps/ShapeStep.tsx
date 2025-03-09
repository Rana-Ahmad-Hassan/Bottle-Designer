import { StepProps } from '../../types/bottles';
import { bottleOptions } from '../../constants/bottles';

export function ShapeStep({ design, updateDesign, onNext, onReset }: StepProps) {
  return (
    <div className="w-full max-w-5xl mx-auto border rounded-md shadow-sm p-4">
      <div className="grid lg:grid-cols-6 md:grid-cols-3 sm:grid-cols-2 grid-cols-2 gap-4 mt-6">
        {bottleOptions.map((bottle) => (
          <div key={bottle.type} className="flex flex-col items-center">
            <div
              className={`relative cursor-pointer rounded-lg overflow-hidden transition-all p-3 ${
                design.type === bottle.type ? 'bg-cyan' : 'bg-blue-300/25'
              }`}
              onClick={() => updateDesign({ type: bottle.type })}
            >
              <div className="flex justify-center">
                <img
                  src={bottle.image || '/placeholder.svg'}
                  alt={bottle.name}
                  className="h-24 w-24 mix-blend-darken object-contain mb-2"
                />
              </div>
            </div>
            <span className="text-xs text-center text-black mt-2">{bottle.name}</span>
          </div>
        ))}
      </div>

      <div className="mt-8 flex justify-end space-x-4">
        <button
          onClick={onReset}
          className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
        >
          Reset
        </button>
        <button onClick={onNext} className="px-4 py-2 text-sm font-medium text-white bg-cyan rounded-md hover:bg-cyan">
          Next
        </button>
      </div>
    </div>
  );
}
