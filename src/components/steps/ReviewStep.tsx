import { StepProps } from '../../types/bottles';

export function ReviewStep({ onNext, onBack, onReset }: StepProps) {
  return (
    <div className="w-full max-w-4xl mx-auto p-6">
      <div className="mt-8 flex items-end h-[150px] justify-between">
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
