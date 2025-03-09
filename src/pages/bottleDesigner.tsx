import { useState } from 'react';
import { ShapeStep } from '../components/steps/ShapeStep';
import { ColorStep } from '../components/steps/ColorStep';
import { CapsuleStep } from '../components/steps/CapsuleStep';
import { CapsuleColorStep } from '../components/steps/CapsuleColorStep';
import { LabelStep } from '../components/steps/LabelStep';
import { TextureStep } from '../components/steps/TextureStep';
import { ReviewStep } from '../components/steps/ReviewStep';
import { BackgroundStep } from '../components/steps/BackGroundStep';
import { BottleDesign } from '../types/bottles';
import { steps } from '../constants/steps';
import BottlePreview from '../components/canvas/Preview';
import { HorizontalStepper } from '../components/steppers/HorizontalSteppar';
import { VerticalStepper } from '../components/steppers/VerticalStepper';
import Modal from '../components/modal/modal';

const initialDesign: BottleDesign = {
  type: 'burgundy',
  color: 'silver',
  capsule: '',
  capsuleColor: '',
  label: '',
  texture: 'smooth',
  background: '',
};

function BottleDesigner() {
  const [currentStep, setCurrentStep] = useState(0);
  const [design, setDesign] = useState<BottleDesign>(initialDesign);
  const [isResetModalOpen, setIsResetModalOpen] = useState(false); 

  const updateDesign = (updates: Partial<BottleDesign>) => {
    setDesign((prev) => ({ ...prev, ...updates }));
  };

  const handleNext = () => {
    setCurrentStep((prev) => Math.min(prev + 1, steps.length - 1));
  };

  const handleBack = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 0));
  };

  const handleReset = () => {
    setIsResetModalOpen(true); 
  };

  const confirmReset = () => {
    setIsResetModalOpen(false);
    setDesign(initialDesign);
    setCurrentStep(0);
  };

  const handleSave = () => {
    requestAnimationFrame(() => {
      const canvas = document.querySelector('#bottle-preview canvas') as HTMLCanvasElement;
      if (!canvas) return;
      const gl = canvas.getContext('webgl2') || canvas.getContext('webgl');
      if (!gl) return;

      const tempCanvas = document.createElement('canvas');
      const tempCtx = tempCanvas.getContext('2d');
      if (!tempCtx) return;

      tempCanvas.width = canvas.width;
      tempCanvas.height = canvas.height;

      const bgImage = new Image();
      bgImage.crossOrigin = 'anonymous';
      bgImage.src = design.background;

      bgImage.onload = () => {
        tempCtx.drawImage(bgImage, 0, 0, tempCanvas.width, tempCanvas.height);
        tempCtx.drawImage(canvas, 0, 0);
        tempCanvas.toBlob(
          (blob) => {
            if (blob) {
              const url = URL.createObjectURL(blob);
              const link = document.createElement('a');
              link.download = `bottle-design-${Date.now()}.png`;
              link.href = url;
              link.click();
              URL.revokeObjectURL(url);
            }
          },
          'image/png',
          1.0,
        );
      };
    });
  };

  const currentStepComponent = () => {
    switch (currentStep) {
      case 0:
        return (
          <ShapeStep
            design={design}
            updateDesign={updateDesign}
            onNext={handleNext}
            onBack={handleBack}
            onReset={handleReset}
          />
        );
      case 1:
        return (
          <ColorStep
            design={design}
            updateDesign={updateDesign}
            onNext={handleNext}
            onBack={handleBack}
            onReset={handleReset}
          />
        );
      case 2:
        return (
          <CapsuleStep
            design={design}
            updateDesign={updateDesign}
            onNext={handleNext}
            onBack={handleBack}
            onReset={handleReset}
          />
        );
      case 3:
        return (
          <CapsuleColorStep
            design={design}
            updateDesign={updateDesign}
            onNext={handleNext}
            onBack={handleBack}
            onReset={handleReset}
          />
        );
      case 4:
        return (
          <LabelStep
            design={design}
            updateDesign={updateDesign}
            onNext={handleNext}
            onBack={handleBack}
            onReset={handleReset}
          />
        );
      case 5:
        return (
          <TextureStep
            design={design}
            updateDesign={updateDesign}
            onNext={handleNext}
            onBack={handleBack}
            onReset={handleReset}
          />
        );
      case 6:
        return (
          <ReviewStep
            design={design}
            updateDesign={updateDesign}
            onNext={handleNext}
            onBack={handleBack}
            onReset={handleReset}
          />
        );
      case 7:
        return (
          <BackgroundStep
            design={design}
            updateDesign={updateDesign}
            onNext={handleSave}
            onBack={handleBack}
            onReset={handleReset}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 overflow-x-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col md:flex-row gap-8 max-w-full flex-wrap">
          <div className="w-full hidden sm:flex md:w-64 flex-shrink-0 border p-6 rounded-md shadow-sm min-w-0">
            <VerticalStepper
              steps={steps.map((step, idx) => ({
                ...step,
                status: idx < currentStep ? 'complete' : idx === currentStep ? 'current' : 'upcoming',
              }))}
            />
          </div>
          <div className="sm:hidden w-full mb-16 min-w-0">
            <HorizontalStepper
              steps={steps.map((step, idx) => ({
                ...step,
                status: idx < currentStep ? 'complete' : idx === currentStep ? 'current' : 'upcoming',
              }))}
            />
          </div>
          <div className="flex-1 border p-4 rounded-md w-full min-w-0">
            <div>
              <BottlePreview design={design} />
            </div>
            {currentStepComponent()}
          </div>
        </div>
      </div>

      <Modal
        isOpen={isResetModalOpen}
        onClose={() => setIsResetModalOpen(false)}
        onConfirm={confirmReset}
        title="Confirm Reset"
        message="Are you sure you want to reset your bottle design? This action cannot be undone."
      />
    </div>
  );
}

export default BottleDesigner;
