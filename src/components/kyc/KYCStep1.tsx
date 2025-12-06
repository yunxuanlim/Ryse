// ============================================
// KYC Step 1: Personal Information
// Project Obsidian - Neon-Noir Dark Theme
// ============================================

import { useState, useEffect } from 'react';
import { ChevronDown } from 'lucide-react';
import { KYCStep1Data, MALAYSIAN_STATES } from '../../types';
import { formatICNumber, validateICNumber } from '../../services/kycService';

// Obsidian Theme Colors
const COLORS = {
  obsidian100: '#060606',
  obsidian200: '#121212',
  neonPrimary: '#39FF14',
  neonDim: '#1B7A0F',
  whiteHigh: '#FFFFFF',
  whiteMedium: 'rgba(255,255,255,0.87)',
  whiteLow: 'rgba(255,255,255,0.60)',
};

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
        <label style={{ color: COLORS.whiteLow }} className="text-sm mb-2 block">
          Full name (as per MyKad)
        </label>
        <input
          type="text"
          value={data.fullName}
          onChange={(e) => onUpdate({ fullName: e.target.value.toUpperCase() })}
          placeholder="FULL NAME"
          className="w-full px-4 py-4 rounded-2xl focus:outline-none focus:ring-2 uppercase transition-all"
          style={{
            backgroundColor: COLORS.obsidian200,
            color: COLORS.whiteHigh,
            borderColor: 'transparent',
          }}
          onFocus={(e) => e.target.style.boxShadow = `0 0 0 2px ${COLORS.neonPrimary}`}
          onBlur={(e) => e.target.style.boxShadow = 'none'}
        />
      </div>

      {/* IC Number */}
      <div>
        <label style={{ color: COLORS.whiteLow }} className="text-sm mb-2 block">
          IC Number
        </label>
        <input
          type="text"
          value={data.icNumber}
          onChange={(e) => handleICChange(e.target.value)}
          placeholder="YYMMDD-SS-NNNN"
          className="w-full px-4 py-4 rounded-2xl focus:outline-none font-mono text-lg transition-all"
          style={{
            backgroundColor: COLORS.obsidian200,
            color: COLORS.whiteHigh,
            boxShadow: icError ? `0 0 0 2px #FF4444` : 'none',
          }}
          maxLength={14}
        />
        {icError && (
          <p className="text-sm mt-2" style={{ color: '#FF4444' }}>{icError}</p>
        )}
      </div>

      {/* Date of Birth - Auto-filled */}
      {data.dateOfBirth && (
        <div>
          <label style={{ color: COLORS.whiteLow }} className="text-sm mb-2 block">
            Date of Birth
          </label>
          <div 
            className="w-full px-4 py-4 rounded-2xl"
            style={{ backgroundColor: COLORS.obsidian200, color: COLORS.whiteLow }}
          >
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
        <label style={{ color: COLORS.whiteLow }} className="text-sm mb-2 block">
          Gender
        </label>
        <div className="flex gap-3">
          {['male', 'female'].map((g) => (
            <button
              key={g}
              type="button"
              onClick={() => onUpdate({ gender: g as 'male' | 'female' })}
              className="flex-1 py-4 rounded-2xl font-medium transition-all"
              style={{
                backgroundColor: data.gender === g ? COLORS.neonPrimary : COLORS.obsidian200,
                color: data.gender === g ? COLORS.obsidian100 : COLORS.whiteMedium,
              }}
            >
              {g === 'male' ? '👨 Male' : '👩 Female'}
            </button>
          ))}
        </div>
      </div>

      {/* Address */}
      <div>
        <label style={{ color: COLORS.whiteLow }} className="text-sm mb-2 block">
          Address Line 1
        </label>
        <input
          type="text"
          value={data.addressLine1}
          onChange={(e) => onUpdate({ addressLine1: e.target.value })}
          placeholder="Street address"
          className="w-full px-4 py-4 rounded-2xl focus:outline-none transition-all"
          style={{
            backgroundColor: COLORS.obsidian200,
            color: COLORS.whiteHigh,
          }}
        />
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div>
          <label style={{ color: COLORS.whiteLow }} className="text-sm mb-2 block">
            Postcode
          </label>
          <input
            type="text"
            value={data.postcode}
            onChange={(e) => onUpdate({ postcode: e.target.value.replace(/\D/g, '').slice(0, 5) })}
            placeholder="00000"
            className="w-full px-4 py-4 rounded-2xl focus:outline-none transition-all"
            style={{
              backgroundColor: COLORS.obsidian200,
              color: COLORS.whiteHigh,
            }}
            maxLength={5}
          />
        </div>
        <div>
          <label style={{ color: COLORS.whiteLow }} className="text-sm mb-2 block">
            City
          </label>
          <input
            type="text"
            value={data.city}
            onChange={(e) => onUpdate({ city: e.target.value })}
            placeholder="City"
            className="w-full px-4 py-4 rounded-2xl focus:outline-none transition-all"
            style={{
              backgroundColor: COLORS.obsidian200,
              color: COLORS.whiteHigh,
            }}
          />
        </div>
      </div>

      {/* State Dropdown */}
      <div className="relative">
        <label style={{ color: COLORS.whiteLow }} className="text-sm mb-2 block">
          State
        </label>
        <button
          type="button"
          onClick={() => setShowStateDropdown(!showStateDropdown)}
          className="w-full px-4 py-4 rounded-2xl flex items-center justify-between text-left transition-all"
          style={{
            backgroundColor: COLORS.obsidian200,
            color: data.state ? COLORS.whiteHigh : COLORS.whiteLow,
          }}
        >
          <span>{data.state || 'Select state'}</span>
          <ChevronDown 
            className={`w-5 h-5 transition-transform ${showStateDropdown ? 'rotate-180' : ''}`}
            style={{ color: COLORS.whiteLow }}
          />
        </button>
        
        {showStateDropdown && (
          <div 
            className="absolute z-10 w-full mt-2 rounded-2xl shadow-lg max-h-48 overflow-y-auto"
            style={{
              backgroundColor: COLORS.obsidian200,
              border: `1px solid ${COLORS.neonDim}`,
            }}
          >
            {MALAYSIAN_STATES.map((state) => (
              <button
                key={state}
                type="button"
                onClick={() => {
                  onUpdate({ state });
                  setShowStateDropdown(false);
                }}
                className="w-full px-4 py-3 text-left transition-colors first:rounded-t-2xl last:rounded-b-2xl"
                style={{ color: COLORS.whiteMedium }}
                onMouseEnter={(e) => e.currentTarget.style.backgroundColor = COLORS.neonDim}
                onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
              >
                {state}
              </button>
            ))}
          </div>
        )}
      </div>

      {error && (
        <div 
          className="rounded-2xl p-4 text-sm"
          style={{
            background: 'repeating-linear-gradient(45deg, #060606, #060606 10px, #1a1a1a 10px, #1a1a1a 20px)',
            color: COLORS.whiteHigh,
            border: '1px solid rgba(255,255,255,0.2)',
          }}
        >
          ⚠️ {error}
        </div>
      )}
    </div>
  );
}
