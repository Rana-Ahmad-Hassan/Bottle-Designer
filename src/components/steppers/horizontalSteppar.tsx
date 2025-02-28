import { Check } from 'lucide-react';
import clsx from 'clsx';

interface Step {
  id: number;
  name: string;
  status: 'complete' | 'current' | 'upcoming';
}

interface HorizontalStepperProps {
  steps: Step[];
}

export function HorizontalStepper({ steps }: HorizontalStepperProps) {
  return (
    <nav aria-label="Progress" className="w-full max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 overflow-x-auto">
      <ol className="flex items-center">
        {steps.map((step, stepIdx) => (
          <li
            key={step.name}
            className={clsx(stepIdx !== steps.length - 1 ? 'pr-8 sm:pr-20' : '', 'relative flex items-center')}
          >
            {step.status === 'complete' ? (
              <>
                <div className="absolute inset-0 flex items-center" aria-hidden="true">
                  <div className="h-0.5 w-full bg-cyan" />
                </div>
                <div className="relative flex h-8 w-8 items-center justify-center rounded-full bg-cyan">
                  <Check className="h-5 w-5 text-white" />
                  <span className="sr-only">{step.name}</span>
                </div>
                <span className="absolute mt-16 w-32  text-xs font-medium text-cyan">{step.name}</span>
              </>
            ) : step.status === 'current' ? (
              <>
                <div className="absolute inset-0 flex items-center" aria-hidden="true">
                  <div className="h-0.5 w-full bg-gray-300" />
                </div>
                <div
                  className="relative flex h-8 w-8 items-center justify-center rounded-full border-2 border-cyan bg-white"
                  aria-current="step"
                >
                  <span className="h-2.5 w-2.5 rounded-full bg-cyan" />
                  <span className="sr-only">{step.name}</span>
                </div>
                <span className="absolute mt-16 w-32  text-xs font-medium text-cyan">{step.name}</span>
              </>
            ) : (
              <>
                <div className="absolute inset-0 flex items-center" aria-hidden="true">
                  <div className="h-0.5 w-full bg-gray-300" />
                </div>
                <div className="relative flex h-8 w-8 items-center justify-center rounded-full border-2 border-gray-300 bg-white">
                  <span className="text-gray-500">{step.id}</span>
                  <span className="sr-only">{step.name}</span>
                </div>
                <span className="absolute mt-16 w-32  text-xs font-medium text-gray-500">{step.name}</span>
              </>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}
