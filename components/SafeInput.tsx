import React, { useState, useEffect } from 'react';
import { validateNumericInput, sanitizeString } from '../utils/validation';

interface SafeInputProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  type?: 'text' | 'number' | 'email';
  placeholder?: string;
  required?: boolean;
  min?: number;
  max?: number;
  step?: number;
  unit?: string;
  error?: string;
  disabled?: boolean;
  className?: string;
  onBlur?: () => void;
  onFocus?: () => void;
}

const SafeInput: React.FC<SafeInputProps> = ({
  label,
  value,
  onChange,
  type = 'text',
  placeholder,
  required = false,
  min,
  max,
  step,
  unit,
  error,
  disabled = false,
  className = '',
  onBlur,
  onFocus,
}) => {
  const [localError, setLocalError] = useState<string>('');
  const [isTouched, setIsTouched] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    
    if (type === 'number') {
      // Validação para números
      if (newValue === '' || newValue === '-') {
        onChange(newValue);
        setLocalError('');
        return;
      }

      const numValue = parseFloat(newValue);
      if (isNaN(numValue)) {
        setLocalError('Por favor, insira um número válido');
        return;
      }

      if (min !== undefined && numValue < min) {
        setLocalError(`Valor deve ser maior ou igual a ${min}`);
        return;
      }

      if (max !== undefined && numValue > max) {
        setLocalError(`Valor deve ser menor ou igual a ${max}`);
        return;
      }

      setLocalError('');
    } else {
      // Sanitização para texto
      const sanitizedValue = sanitizeString(newValue);
      onChange(sanitizedValue);
    }

    onChange(newValue);
  };

  const handleBlur = () => {
    setIsTouched(true);
    onBlur?.();
  };

  const handleFocus = () => {
    onFocus?.();
  };

  const displayError = error || localError;
  const showError = isTouched && displayError;

  return (
    <div className={`mb-4 ${className}`}>
      <label className="block text-sm font-medium text-gray-700 mb-2">
        {label}
        {required && <span className="text-red-500 ml-1">*</span>}
      </label>
      <div className="relative">
        <input
          type={type}
          value={value}
          onChange={handleChange}
          onBlur={handleBlur}
          onFocus={handleFocus}
          placeholder={placeholder}
          min={min}
          max={max}
          step={step}
          disabled={disabled}
          className={`
            w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500
            ${showError ? 'border-red-300' : 'border-gray-300'}
            ${disabled ? 'bg-gray-100 cursor-not-allowed' : 'bg-white'}
            ${unit ? 'pr-12' : ''}
          `}
          aria-describedby={showError ? `${label}-error` : undefined}
          aria-invalid={showError ? 'true' : 'false'}
        />
        {unit && (
          <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
            <span className="text-gray-500 text-sm">{unit}</span>
          </div>
        )}
      </div>
      {showError && (
        <p
          id={`${label}-error`}
          className="mt-1 text-sm text-red-600"
          role="alert"
        >
          {displayError}
        </p>
      )}
    </div>
  );
};

export default SafeInput;