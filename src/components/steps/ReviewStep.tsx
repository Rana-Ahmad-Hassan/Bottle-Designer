import { bottleShapes, bottleColors, capsuleTypes } from '../../constants/bottles';
import { StepProps } from '../../types/bottles';

export function ReviewStep({ design, onNext, onBack, onReset }: StepProps) {
  const selectedBottle = bottleShapes.find((b) => b.id === design.shape);
  const selectedColor = bottleColors.find((c) => c.id === design.color);
  const selectedCapsule = capsuleTypes.find((c) => c.id === design.capsule);
  const selectedCapsuleColor = bottleColors.find((c) => c.id === design.capsuleColor);

  return (
    <div className="w-full max-w-4xl mx-auto p-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="flex flex-col space-y-6">
          <h2 className="text-2xl font-bold text-gray-900">Review your design</h2>

          <div className="space-y-4">
            <div className="bg-white p-4 rounded-lg border border-gray-200">
              <h3 className="font-semibold text-gray-700">Bottle Shape</h3>
              <p className="text-gray-600">{selectedBottle?.name || 'Not selected'}</p>
            </div>

            <div className="bg-white p-4 rounded-lg border border-gray-200">
              <h3 className="font-semibold text-gray-700">Bottle Color</h3>
              <div className="flex items-center space-x-2">
                <div className="w-6 h-6 rounded-full" style={{ backgroundColor: selectedColor?.value }} />
                <p className="text-gray-600">{selectedColor?.name || 'Not selected'}</p>
              </div>
            </div>

            <div className="bg-white p-4 rounded-lg border border-gray-200">
              <h3 className="font-semibold text-gray-700">Capsule</h3>
              <p className="text-gray-600">{selectedCapsule?.name || 'Not selected'}</p>
            </div>

            <div className="bg-white p-4 rounded-lg border border-gray-200">
              <h3 className="font-semibold text-gray-700">Capsule Color</h3>
              <div className="flex items-center space-x-2">
                <div className="w-6 h-6 rounded-full" style={{ backgroundColor: selectedCapsuleColor?.value }} />
                <p className="text-gray-600">{selectedCapsuleColor?.name || 'Not selected'}</p>
              </div>
            </div>

            <div className="bg-white p-4 rounded-lg border border-gray-200">
              <h3 className="font-semibold text-gray-700">Label</h3>
              <p className="text-gray-600">{design.label ? design.label.name : 'No label uploaded'}</p>
            </div>

            <div className="bg-white p-4 rounded-lg border border-gray-200">
              <h3 className="font-semibold text-gray-700">Texture</h3>
              <p className="text-gray-600">{design.texture || 'None'}</p>
            </div>
          </div>
        </div>
        <div className="flex flex-col items-center justify-center bg-gray-50 p-8 rounded-lg">
          <div
            className={`w-64 h-96 rounded-lg ${design.texture || ''}`}
            style={{
              backgroundColor: selectedColor?.value || 'transparent',
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
            className="px-4 py-2 text-sm font-medium text-white bg-cyan rounded-md hover:bg-cyan"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
}
