import { Upload } from 'lucide-react';
import { StepProps } from '../../types/bottles';

export function LabelStep({ design, updateDesign, onNext, onBack, onReset }: StepProps) {
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      updateDesign({ label: file });
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto p-6 border shadow-sm rounded-md">
      <div>
        <div className="flex border flex-col items-center justify-center bg-gray-50 p-5 rounded-lg">
          {design.label ? (
            <img src={URL.createObjectURL(design.label)} alt="Uploaded label" className="max-w-full h-auto" />
          ) : (
            <div className="w-64 h-96 flex items-center justify-center border-2 border-dashed border-gray-300 rounded-lg">
              <p className="text-gray-500 text-sm">Label preview will appear here</p>
            </div>
          )}
        </div>
        <div className="flex flex-col space-y-4">
          <h2 className="text-lg font-bold text-gray-900">Upload and Adjust Label</h2>

          {design.label && (
            <div className="bg-green-50 p-4 rounded-lg">
              <p className="text-green-800 text-sm">Label uploaded: {design.label.name}</p>
            </div>
          )}
          <div className="border-2 border-dashed border-gray-300 rounded-lg p-2">
            <div className="flex flex-col items-center justify-center text-center">
              <Upload className="h-12 w-12 text-gray-400" />
              <p className="mt-4 text-sm text-gray-600">Select a Label or drag and drop here</p>
              <p className="mt-1 text-xs text-gray-500">JPG, PNG or PDF files up to 10MB</p>
              <input
                type="file"
                accept=".jpg,.jpeg,.png,.pdf"
                onChange={handleFileChange}
                className="mt-4 block w-full text-sm text-gray-500
                  file:mr-4 file:py-2 file:px-4
                  file:rounded-full file:border-0
                  file:text-sm file:font-semibold
                  file:bg-cyan-50 file:text-cyan-700
                  hover:file:bg-cyan-100"
              />
            </div>
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
