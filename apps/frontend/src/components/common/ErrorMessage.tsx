import React from "react";

export interface ErrorMessageProps {
  message: string;
  className?: string;
  onRetry?: () => void;
}

export const ErrorMessage: React.FC<ErrorMessageProps> = ({
  message,
  className = "",
  onRetry,
}) => {
  return (
    <div
      className={`rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700 ${className}`}
      role="alert"
    >
      <p className="font-medium">{message}</p>
      {onRetry && (
        <button
          type="button"
          onClick={onRetry}
          className="mt-2 text-red-600 underline hover:no-underline focus:outline-none"
        >
          Reintentar
        </button>
      )}
    </div>
  );
};

export default ErrorMessage;
