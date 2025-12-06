// ============================================
// KYC Step 1: Personal Information
// Cash App Inspired - Clean Forms
// ============================================

import { useState, useEffect } from 'react';
import { ChevronDown } from 'lucide-react';
import { KYCStep1Data, MALAYSIAN_STATES } from '../../types';
import { formatICNumber, validateICNumber } from '../../services/kycService';

interface KYCStep1Props {
  data: KYCStep1Data;
  onUpdate: (data: Partial<KYCStep1Data>) => void;
  error: string | null;
}

export function KYCStep1({ data, onUpdate, error }: KYCStep1Props) {
  const [showStateDropdown, setShowStateDropdown] = useState(false);
  const [icError, setIcError] = useState<string | null>(null);

  useEffect(() => {
    if (data.icNumber && data.icNumber.replace(/-/g, '').length >= 6) {
      const cleanIC = data.icNumber.replace(/-/g, '');
      const year = parseInt(cleanIC.substring(0, 2));
      const month = cleanIC.substring(2, 4);
      const day = cleanIC.substring(4, 6);
      const fullYear = year <= 30 ? 2000 + year : 1900 + year;
      const dateStr = `${fullYear}-${month}-${day}`;
      const date = new Date(dateStr);
      if (!isNaN(date.getTime())) {
        onUpdate({ dateOfBirth: dateStr });
      }
    }
  }, [data.icNumber]);

  const handleICChange = (value: string) => {
    const formatted = formatICNumber(value);
    onUpdate({ icNumber: formatted });
    
    if (formatted.replace(/-/g, '').length === 12) {
      const validation = validateICNumber(formatted);
      if (!validation.isValid) {
        setIcError(validation.errors[0]?.message || 'Invalid IC number');
      } else {
        setIcError(null);
      }
    } else {
      setIcError(null);
    }
  };

  return (
    <div className="space-y-6">
      {/* Full Name */}
      <div>
        <label className="text-sm font-medium text-gray-700 mb-2 block">
          Full Name
        </label>
        <input
          type="text"
          value={data.fullName}
          onChange={(e) => onUpdate({ fullName: e.target.value.toUpperCase() })}
          placeholder="Full name as per MyKad"
          className="w-full px-4 py-4 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent text-gray-900 uppercase"
        />
      </div>

      {/* IC Number */}
      <div>
        <label className="text-sm font-medium text-gray-700 mb-2 block">
          IC Number (MyKad)
        </label>
        <input
          type="text"
          value={data.icNumber}
          onChange={(e) => handleICChange(e.target.value)}
          placeholder="YYMMDD-SS-NNNN"
          className={`w-full px-4 py-4 border rounded-xl focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent font-mono text-lg ${
            icError ? 'border-red-300' : 'border-gray-200'
          }`}
          maxLength={14}
        />
        {icError ? (
          <p className="text-red-500 text-xs mt-1">{icError}</p>
        ) : (
          <p className="text-gray-400 text-xs mt-1">Format: 900101-14-5678</p>
        )}
      </div>

      {/* Date of Birth */}
      <div>
        <label className="text-sm font-medium text-gray-700 mb-2 block">
          Date of Birth
        </label>
        <input
          type="text"
          value={data.dateOfBirth ? new Date(data.dateOfBirth).toLocaleDateString('en-GB') : ''}
          className="w-full px-4 py-4 border border-gray-200 rounded-xl bg-gray-50 text-gray-500"
          disabled
          placeholder="Auto-filled from IC"
        />
        <p className="text-gray-400 text-xs mt-1">Auto-extracted from IC number</p>
      </div>

      {/* Gender */}
      <div>
        <label className="text-sm font-medium text-gray-700 mb-2 block">
          Gender
        </label>
        <div className="grid grid-cols-2 gap-3">
          <button
            type="button"
            onClick={() => onUpdate({ gender: 'male' })}
            className={`py-4 px-4 rounded-xl border transition-all font-medium ${
              data.gender === 'male'
                ? 'border-black bg-black text-white'
                : 'border-gray-200 text-gray-600 hover:border-gray-300'
            }`}
          >
            Male
          </button>
          <button
            type="button"
            onClick={() => onUpdate({ gender: 'female' })}
            className={`py-4 px-4 rounded-xl border transition-all font-medium ${
              data.gender === 'female'
                ? 'border-black bg-black text-white'
                : 'border-gray-200 text-gray-600 hover:border-gray-300'
            }`}
          >
            Female
          </button>
        </div>
      </div>

      {/* Address Section */}
      <div className="pt-4 border-t border-gray-100">
        <p className="text-sm font-medium text-gray-700 mb-4">Address (Optional)</p>
        
        <div className="space-y-3">
          <input
            type="text"
            value={data.addressLine1 || ''}
            onChange={(e) => onUpdate({ addressLine1: e.target.value })}
            placeholder="Address Line 1"
            className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
          />

          <input
            type="text"
            value={data.addressLine2 || ''}
            onChange={(e) => onUpdate({ addressLine2: e.target.value })}
            placeholder="Address Line 2 (Optional)"
            className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
          />

          <div className="grid grid-cols-2 gap-3">
            <input
              type="text"
              value={data.city || ''}
              onChange={(e) => onUpdate({ city: e.target.value })}
              placeholder="City"
              className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
            />
            <input
              type="text"
              value={data.postcode || ''}
              onChange={(e) => onUpdate({ postcode: e.target.value.replace(/\D/g, '').slice(0, 5) })}
              placeholder="Postcode"
              className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
              maxLength={5}
            />
          </div>

          {/* State Dropdown */}
          <div className="relative">
            <button
              type="button"
              onClick={() => setShowStateDropdown(!showStateDropdown)}
              className="w-full px-4 py-3 border border-gray-200 rounded-xl text-left flex items-center justify-between"
            >
              <span className={data.state ? 'text-gray-900' : 'text-gray-400'}>
                {data.state || 'Select State'}
              </span>
              <ChevronDown className={`w-5 h-5 text-gray-400 transition-transform ${showStateDropdown ? 'rotate-180' : ''}`} />
            </button>
            
            {showStateDropdown && (
              <div className="absolute z-10 w-full mt-1 bg-white border border-gray-200 rounded-xl shadow-lg max-h-48 overflow-y-auto">
                {MALAYSIAN_STATES.map((state) => (
                  <button
                    key={state}
                    type="button"
                    onClick={() => {
                      onUpdate({ state });
                      setShowStateDropdown(false);
                    }}
                    className="w-full px-4 py-3 text-left hover:bg-gray-50 text-gray-700"
                  >
                    {state}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {error && (
        <p className="text-red-500 text-sm">{error}</p>
      )}
    </div>
  );
}
