import { StepProps } from '../../types/bottles';
import { models } from '../../constants/models';
import { useEffect } from 'react';
import Scene from '../models-components/bottleScene';

export function ShapeStep({ design, updateDesign, onNext, onReset }: StepProps) {
  useEffect(() => {
    if (!design.shape) {
      updateDesign({ shape: models[0].id });
    }
  }, [design.shape, updateDesign]);

  const handleShapeSelect = (shapeId: string) => {
    if (shapeId !== design.shape) {
      updateDesign({ shape: shapeId });
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto border rounded-md shadow-sm p-4">
      <div>
        {/* Main Preview */}
        <div className="flex flex-col h-96 items-center border border-gray-200 justify-center bg-gray-50 p-0 rounded-lg overflow-hidden">
          <div className="w-full h-full">
            <Scene key={design.shape || models[0].id} modelId={design.shape || models[0].id} />
          </div>
        </div>

        {/* Model Selection Grid */}
        <div className="grid lg:grid-cols-5 md:grid-cols-3 sm:grid-cols-2 grid-cols-2 gap-4 mt-6">
          {models.map((model) => (
            <button
              key={model.id}
              onClick={() => handleShapeSelect(model.id)}
              className={`relative group p-4 rounded-lg transition-all ${
                design.shape === model.id
                  ? 'ring-2 ring-cyan-500 bg-cyan-50'
                  : 'border border-gray-200 hover:border-gray-300 hover:bg-gray-50'
              }`}
            >
              <div className="h-32 w-full">
                <Scene key={`preview-${model.id}`} modelId={model.id} scale={0.8} interactive={false} />
              </div>
              <p className="mt-2 text-sm font-medium text-center text-gray-900">{model.name}</p>
              {design.shape === model.id && (
                <div className="absolute top-2 right-2 w-4 h-4 bg-cyan-500 rounded-full">
                  <span className="sr-only">Selected</span>
                </div>
              )}
            </button>
          ))}
        </div>
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
