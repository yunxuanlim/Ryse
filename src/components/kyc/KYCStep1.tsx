// ============================================
// KYC Step 1: Personal Information
// Cash App Inspired - Clean minimal forms
// ============================================

import { useState, useEffect } from 'react';
import { ChevronDown, User } from 'lucide-react';
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
    <div className="space-y-5 py-4">
      {/* Full Name */}
      <div>
        <label className="text-sm text-gray-600 mb-2 block">Full name (as per MyKad)</label>
        <input
          type="text"
          value={data.fullName}
          onChange={(e) => onUpdate({ fullName: e.target.value.toUpperCase() })}
          placeholder="FULL NAME"
          className="w-full px-4 py-4 bg-gray-100 rounded-2xl focus:outline-none focus:ring-2 focus:ring-black text-gray-900 uppercase"
        />
      </div>

      {/* IC Number */}
      <div>
        <label className="text-sm text-gray-600 mb-2 block">IC Number</label>
        <input
          type="text"
          value={data.icNumber}
          onChange={(e) => handleICChange(e.target.value)}
          placeholder="YYMMDD-SS-NNNN"
          className={`w-full px-4 py-4 bg-gray-100 rounded-2xl focus:outline-none focus:ring-2 focus:ring-black font-mono text-lg ${
            icError ? 'ring-2 ring-red-400' : ''
          }`}
          maxLength={14}
        />
        {icError && (
          <p className="text-red-500 text-sm mt-2">{icError}</p>
        )}
      </div>

      {/* Date of Birth - Auto-filled */}
      {data.dateOfBirth && (
        <div>
          <label className="text-sm text-gray-600 mb-2 block">Date of Birth</label>
          <div className="w-full px-4 py-4 bg-gray-100 rounded-2xl text-gray-500">
            {new Date(data.dateOfBirth).toLocaleDateString('en-MY', {
              day: 'numeric',
              month: 'long',
              year: 'numeric'
            })}
          </div>
        </div>
      )}

      {/* Gender */}
      <div>
        <label className="text-sm text-gray-600 mb-2 block">Gender</label>
        <div className="flex gap-3">
          {['male', 'female'].map((g) => (
            <button
              key={g}
              type="button"
              onClick={() => onUpdate({ gender: g as 'male' | 'female' })}
              className={`flex-1 py-4 rounded-2xl font-medium transition-all ${
                data.gender === g
                  ? 'bg-black text-white'
                  : 'bg-gray-100 text-gray-600'
              }`}
            >
              {g === 'male' ? '👨 Male' : '👩 Female'}
            </button>
          ))}
        </div>
      </div>

      {/* Address */}
      <div>
        <label className="text-sm text-gray-600 mb-2 block">Address Line 1</label>
        <input
          type="text"
          value={data.addressLine1}
          onChange={(e) => onUpdate({ addressLine1: e.target.value })}
          placeholder="Street address"
          className="w-full px-4 py-4 bg-gray-100 rounded-2xl focus:outline-none focus:ring-2 focus:ring-black"
        />
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className="text-sm text-gray-600 mb-2 block">Postcode</label>
          <input
            type="text"
            value={data.postcode}
            onChange={(e) => onUpdate({ postcode: e.target.value.replace(/\D/g, '').slice(0, 5) })}
            placeholder="00000"
            className="w-full px-4 py-4 bg-gray-100 rounded-2xl focus:outline-none focus:ring-2 focus:ring-black"
            maxLength={5}
          />
        </div>
        <div>
          <label className="text-sm text-gray-600 mb-2 block">City</label>
          <input
            type="text"
            value={data.city}
            onChange={(e) => onUpdate({ city: e.target.value })}
            placeholder="City"
            className="w-full px-4 py-4 bg-gray-100 rounded-2xl focus:outline-none focus:ring-2 focus:ring-black"
          />
        </div>
      </div>

      {/* State Dropdown */}
      <div className="relative">
        <label className="text-sm text-gray-600 mb-2 block">State</label>
        <button
          type="button"
          onClick={() => setShowStateDropdown(!showStateDropdown)}
          className="w-full px-4 py-4 bg-gray-100 rounded-2xl flex items-center justify-between text-left"
        >
          <span className={data.state ? 'text-gray-900' : 'text-gray-400'}>
            {data.state || 'Select state'}
          </span>
          <ChevronDown className={`w-5 h-5 text-gray-400 transition-transform ${showStateDropdown ? 'rotate-180' : ''}`} />
        </button>
        
        {showStateDropdown && (
          <div className="absolute z-10 w-full mt-2 bg-white rounded-2xl shadow-lg border border-gray-200 max-h-48 overflow-y-auto">
            {MALAYSIAN_STATES.map((state) => (
              <button
                key={state}
                type="button"
                onClick={() => {
                  onUpdate({ state });
                  setShowStateDropdown(false);
                }}
                className="w-full px-4 py-3 text-left hover:bg-gray-50 text-gray-900 first:rounded-t-2xl last:rounded-b-2xl"
              >
                {state}
              </button>
            ))}
          </div>
        )}
      </div>

      {error && (
        <div className="bg-red-50 rounded-2xl p-4 text-red-700 text-sm">
          {error}
        </div>
      )}
    </div>
  );
}
