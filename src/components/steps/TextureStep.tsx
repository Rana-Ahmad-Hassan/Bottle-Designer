import { StepProps } from '../../types/bottles';
import { TextureType } from '../../types/bottles';

const textureOptions: { type: TextureType; name: string; description: string }[] = [
    {
      type: "smooth",
      name: "Smooth Glass",
      description: "Classic smooth glass texture with high transparency",
    },
    {
      type: "rough",
      name: "Rough Glass",
      description: "Textured surface with slight imperfections",
    },
    {
      type: "hammered",
      name: "Hammered Glass",
      description: "Distinctive hammered pattern effect",
    },
    {
      type: "frosted",
      name: "Frosted Glass",
      description: "Matte finish with translucent effect",
    },
    {
      type: "matte",
      name: "Matte Finish",
      description: "Non-reflective matte surface",
    },
  ]
export function TextureStep({ design, updateDesign, onNext, onBack, onReset }: StepProps) {
  return (
    <div className="w-full max-w-5xl mx-auto p-6 border rounded-md">
      <div className=" gap-8">
        <div className="flex flex-col space-y-4">
          <h2 className="text-lg font-bold text-gray-900">Choose texture for your bottle</h2>
          <div className="grid lg:grid-cols-5 md:grid-cols-3 sm:grid-cols-2 grid-cols-2 gap-4">
          {textureOptions.map((texture) => (
          <div
            key={texture.type}
            className={`relative cursor-pointer h-[150px] items-center flex justify-center rounded-lg overflow-hidden border-2 p-4 transition-all ${
              design.texture === texture.type ? "border-cyan" : "border-gray-200 hover:border-gray-300"
            }`}
            onClick={() => updateDesign({ texture: texture.type })}
          >
            <h4 className="font-medium text-sm text-black mb-1">{texture.name}</h4>
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
