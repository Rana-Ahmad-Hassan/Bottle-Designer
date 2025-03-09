import { Check } from 'lucide-react';
import clsx from 'clsx';

interface Step {
  id: number;
  name: string;
  status: 'complete' | 'current' | 'upcoming';
}

interface StepperProps {
  steps: Step[];
}

export function VerticalStepper({ steps }: StepperProps) {
  return (
    <nav aria-label="Progress" className="w-full max-w-xs">
      <ol className="overflow-hidden">
        {steps.map((step, stepIdx) => (
          <li key={step.name} className={clsx(stepIdx !== steps.length - 1 ? 'pb-8' : '', 'relative')}>
            {step.status === 'complete' ? (
              <>
                <div className="absolute left-4 top-4 -ml-px mt-0.5 h-full w-0.5 bg-cyan" aria-hidden="true" />
                <div className="group relative flex items-center">
                  <span className="flex h-12 items-center">
                    <span className="relative z-10 flex h-8 w-8 items-center justify-center rounded-full bg-cyan">
                      <Check className="h-5 w-5 text-white" />
                    </span>
                  </span>
                  <span className="ml-4 flex min-w-0 flex-col">
                    <span className="text-sm font-medium text-cyan">{step.name}</span>
                  </span>
                </div>
              </>
            ) : step.status === 'current' ? (
              <>
                <div className="absolute left-4 top-4 -ml-px mt-0.5 h-full w-0.5 bg-gray-300" aria-hidden="true" />
                <div className="group relative flex items-center" aria-current="step">
                  <span className="flex h-12 items-center" aria-hidden="true">
                    <span className="relative z-10 flex h-8 w-8 items-center justify-center rounded-full border-2 border-cyan-600 bg-white">
                      <span className="h-2.5 w-2.5 rounded-full bg-cyan" />
                    </span>
                  </span>
                  <span className="ml-4 flex min-w-0 flex-col">
                    <span className="text-sm font-medium text-cyan">{step.name}</span>
                  </span>
                </div>
              </>
            ) : (
              <>
                <div className="absolute left-4 top-4 -ml-px mt-0.5 h-full w-0.5 bg-gray-300" aria-hidden="true" />
                <div className="group relative flex items-center">
                  <span className="flex h-12 items-center" aria-hidden="true">
                    <span className="relative z-10 flex h-8 w-8 items-center justify-center rounded-full border-2 border-gray-300 bg-white">
                      <h1 className="text-black">{step.id}</h1>
                    </span>
                  </span>
                  <span className="ml-4 flex min-w-0 flex-col">
                    <span className="text-sm font-medium text-gray-500">{step.name}</span>
                  </span>
                </div>
              </>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}
