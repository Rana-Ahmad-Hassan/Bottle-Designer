import { StepProps } from '../../types/bottles';
import { capsuleTypes } from '../../constants/bottles';
import { capsules } from '../../constants/models';
import Scene from '../models-components/bottleScene';
import CapsuleScene from '../models-components/capsuleScene';
export function CapsuleStep({ design, updateDesign, onNext, onBack, onReset }: StepProps) {
  return (
    <div className="w-full max-w-4xl mx-auto p-6 border shadow-sm rounded-md">
      <div>
        <div className="w-full h-96 flex items-center justify-center border border-gray-200 bg-gray-100 p-0 rounded-lg overflow-hidden">
          <div className="w-1/2 h-full">
            <Scene key={design.shape} modelId={design.shape} color={design.color} capsuleModelId={design.capsule} />
          </div>
          {/* <div className="w-1/2 h-full">
            <CapsuleScene
              key={`preview-${design.capsule}`}
              capsuleModelId={design.capsule}
              className="w-full h-full"
              interactive={true}
            />
          </div> */}
        </div>
        <div className="flex flex-col space-y-3">
          <h2 className="text-lg font-bold text-gray-900">Choose capsule for your bottle</h2>
          <div className="grid grid-cols-2 lg:grid-cols-4 md:grid-cols-4 sm:grid-cols-2 gap-2">
            {capsules.map((capsule) => (
              <button
                key={capsule.id}
                onClick={() => updateDesign({ capsule: capsule.id })}
                className={` rounded-lg border py-1 transition-all ${
                  design.capsule === capsule.id ? 'border-cyan bg-cyan' : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <CapsuleScene
                  key={`preview-${capsule.id}`}
                  capsuleModelId={capsule.id}
                  interactive={false}
                  className="w-full h-auto"
                />
                <p className="mt-2 text-sm text-black text-center">{capsule.name}</p>
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
