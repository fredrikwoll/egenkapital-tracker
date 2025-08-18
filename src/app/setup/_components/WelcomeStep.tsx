import Button from '@/components/ui/Button';

interface WelcomeStepProps {
  onNext: () => void;
}

export default function WelcomeStep({ onNext }: WelcomeStepProps) {
  return (
    <div className="text-center">
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-text-primary mb-4">
          Welcome to Egenkap
        </h1>
        <p className="text-xl text-gray-600 mb-8">
          Your personal finance management tool
        </p>
        <div className="text-left max-w-md mx-auto space-y-4 mb-8">
          <div className="flex items-center space-x-3">
            <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
              <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <span className="text-gray-700">Track your accounts and transactions</span>
          </div>
          <div className="flex items-center space-x-3">
            <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
              <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <span className="text-gray-700">Monitor your financial progress</span>
          </div>
          <div className="flex items-center space-x-3">
            <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
              <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <span className="text-gray-700">Set and achieve your financial goals</span>
          </div>
        </div>
      </div>
      
      <div className="bg-card rounded-lg shadow-sm border p-6 mb-8">
        <h2 className="text-lg font-semibold text-text-primary mb-3">
          Let&apos;s get you started
        </h2>
        <p className="text-text-muted">
          We&apos;ll guide you through a quick setup to customize your experience and create your first account.
          This should only take a few minutes.
        </p>
      </div>

      <Button
        name="Get Started"
        variant="primary"
        handleClick={onNext}
      />
    </div>
  );
}