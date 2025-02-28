import { StepProps } from '../../types/bottles';
import { textureTypes, bottleColors } from '../../constants/bottles';

export function TextureStep({ design, updateDesign, onNext, onBack, onReset }: StepProps) {
  return (
    <div className="w-full max-w-4xl mx-auto p-6 border">
      <div className=" gap-8">
        <div className="flex flex-col border items-center justify-center bg-gray-50 p-3 rounded-lg">
          <div
            className={`w-64 h-96 rounded-lg ${design.texture || 'none'}`}
            style={{
              backgroundColor: bottleColors.find((c) => c.id === design.color)?.value || 'transparent',
              boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
            }}
          />
        </div>
        <div className="flex flex-col space-y-4">
          <h2 className="text-lg font-bold text-gray-900">Choose texture for your bottle</h2>
          <div className="grid lg:grid-cols-5 md:grid-cols-3 sm:grid-cols-2 grid-cols-2 gap-4">
            {textureTypes.map((texture) => (
              <button
                key={texture.id}
                onClick={() => updateDesign({ texture: texture.id })}
                className={`p-4 border-2 rounded-lg transition-all ${
                  design.texture === texture.id ? 'border-cyan bg-cyan' : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <div className={`w-full h-32 rounded-lg ${texture.id}`} />
                <p className="mt-2 text-sm text-black text-center">{texture.name}</p>
              </button>
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
            disabled={!design.texture}
            className="px-4 py-2 text-sm font-medium text-white bg-cyan rounded-md hover:bg-cyan disabled:opacity-50"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
}
