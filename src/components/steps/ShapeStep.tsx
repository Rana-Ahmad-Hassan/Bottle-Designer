import { StepProps } from '../../types/bottles';
import { bottleOptions } from '../../constants/bottles';

export function ShapeStep({ design, updateDesign, onNext, onReset }: StepProps) {
  return (
    <div className="w-full max-w-5xl mx-auto border rounded-md shadow-sm p-4">
      <div className="grid lg:grid-cols-5 md:grid-cols-3 sm:grid-cols-2 grid-cols-2 gap-4 mt-6">
        {bottleOptions.map((bottle) => (
          <div
            key={bottle.type}
            className={`relative cursor-pointer rounded-lg overflow-hidden border-2 transition-all ${
              design.type === bottle.type ? 'border-primary bg-cyan' : 'border-gray-200 hover:border-gray-300'
            }`}
            onClick={() => updateDesign({ type: bottle.type })}
          >
            <div className="flex flex-col items-center p-3">
              <img src={bottle.image || '/placeholder.svg'} alt={bottle.name} className="h-24 object-contain mb-2" />
              <span className="text-sm text-center text-black">{bottle.name}</span>
            </div>
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
