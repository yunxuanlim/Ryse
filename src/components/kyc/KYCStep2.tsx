// ============================================
// KYC Step 2: MyKad Document Upload
// Project Obsidian - Neon-Noir Dark Theme
// ============================================

import { useState, useRef } from 'react';
import { Camera, Check, RotateCcw, AlertCircle } from 'lucide-react';
import { KYCStep2Data } from '../../types';

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

interface KYCStep2Props {
  data: KYCStep2Data;
  onUpdate: (data: Partial<KYCStep2Data>) => void;
  error: string | null;
}

export function KYCStep2({ data, onUpdate, error }: KYCStep2Props) {
  const [uploadingFront, setUploadingFront] = useState(false);
  const [uploadingBack, setUploadingBack] = useState(false);
  const frontInputRef = useRef<HTMLInputElement>(null);
  const backInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = async (
    file: File,
    side: 'front' | 'back'
  ) => {
    const setSide = side === 'front' ? setUploadingFront : setUploadingBack;
    setSide(true);

    // Create preview URL
    const previewUrl = URL.createObjectURL(file);

    // Simulate OCR extraction delay
    await new Promise(resolve => setTimeout(resolve, 1500));

    // Mock OCR data extraction
    const mockOCRData = {
      extractedName: 'AHMAD BIN ABDULLAH',
      extractedIC: '900101-14-5678',
      confidence: 95,
    };

    if (side === 'front') {
      onUpdate({
        frontImage: file,
        frontPreview: previewUrl,
        ocrData: mockOCRData,
      });
    } else {
      onUpdate({
        backImage: file,
        backPreview: previewUrl,
      });
    }

    setSide(false);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>, side: 'front' | 'back') => {
    const file = e.target.files?.[0];
    if (file) {
      handleFileSelect(file, side);
    }
  };

  const renderUploadZone = (
    side: 'front' | 'back',
    image: File | null,
    preview: string | null,
    isUploading: boolean,
    inputRef: React.RefObject<HTMLInputElement>
  ) => {
    const hasImage = image && preview;

    return (
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <span className="font-medium" style={{ color: COLORS.whiteHigh }}>
            MyKad {side === 'front' ? 'Front' : 'Back'}
          </span>
          {hasImage && (
            <button
              onClick={() => {
                if (side === 'front') {
                  onUpdate({ frontImage: null, frontPreview: null, ocrData: undefined });
                } else {
                  onUpdate({ backImage: null, backPreview: null });
                }
              }}
              className="text-sm flex items-center gap-1 transition-colors"
              style={{ color: COLORS.whiteLow }}
            >
              <RotateCcw className="w-4 h-4" /> Retake
            </button>
          )}
        </div>

        {hasImage ? (
          <div className="relative">
            <img
              src={preview}
              alt={`MyKad ${side}`}
              className="w-full h-48 object-cover rounded-2xl"
              style={{ border: `2px solid ${COLORS.neonPrimary}` }}
            />
            <div 
              className="absolute bottom-3 right-3 px-3 py-1 rounded-full text-sm flex items-center gap-1"
              style={{ backgroundColor: COLORS.neonPrimary, color: COLORS.obsidian100 }}
            >
              <Check className="w-4 h-4" /> Captured
            </div>
          </div>
        ) : (
          <button
            onClick={() => inputRef.current?.click()}
            disabled={isUploading}
            className="w-full h-48 border-2 border-dashed rounded-2xl flex flex-col items-center justify-center gap-3 transition-all"
            style={{ 
              borderColor: COLORS.neonDim,
              backgroundColor: COLORS.obsidian200,
            }}
          >
            {isUploading ? (
              <>
                <div 
                  className="w-10 h-10 rounded-full flex items-center justify-center animate-pulse"
                  style={{ backgroundColor: COLORS.neonDim }}
                >
                  <Camera className="w-5 h-5" style={{ color: COLORS.neonPrimary }} />
                </div>
                <span style={{ color: COLORS.whiteLow }}>Processing...</span>
              </>
            ) : (
              <>
                <div 
                  className="w-14 h-14 rounded-2xl flex items-center justify-center"
                  style={{ backgroundColor: COLORS.neonPrimary }}
                >
                  <Camera className="w-7 h-7" style={{ color: COLORS.obsidian100 }} />
                </div>
                <span className="font-medium" style={{ color: COLORS.whiteMedium }}>Tap to capture</span>
                <span className="text-sm" style={{ color: COLORS.whiteLow }}>or upload a photo</span>
              </>
            )}
          </button>
        )}

        <input
          ref={inputRef}
          type="file"
          accept="image/*"
          capture="environment"
          onChange={(e) => handleInputChange(e, side)}
          className="hidden"
        />
      </div>
    );
  };

  return (
    <div className="space-y-6 py-4">
      {/* Instructions */}
      <div 
        className="rounded-2xl p-4"
        style={{ backgroundColor: COLORS.obsidian200 }}
      >
        <p className="text-sm" style={{ color: COLORS.whiteMedium }}>
          📸 Take clear photos of your MyKad. Make sure all text is readable.
        </p>
      </div>

      {/* Front */}
      {renderUploadZone(
        'front',
        data.frontImage,
        data.frontPreview,
        uploadingFront,
        frontInputRef as React.RefObject<HTMLInputElement>
      )}

      {/* OCR Results */}
      {data.ocrData && (
        <div 
          className="rounded-2xl p-4 space-y-2"
          style={{ 
            backgroundColor: `${COLORS.neonPrimary}15`,
            border: `1px solid ${COLORS.neonDim}`,
          }}
        >
          <div className="flex items-center gap-2 font-medium" style={{ color: COLORS.neonPrimary }}>
            <Check className="w-5 h-5" />
            Information extracted
          </div>
          <div className="text-sm space-y-1" style={{ color: COLORS.whiteMedium }}>
            <p><span style={{ color: COLORS.whiteLow }}>Name:</span> {data.ocrData.extractedName}</p>
            <p><span style={{ color: COLORS.whiteLow }}>IC:</span> {data.ocrData.extractedIC}</p>
            <p><span style={{ color: COLORS.whiteLow }}>Confidence:</span> {data.ocrData.confidence}%</p>
          </div>
        </div>
      )}

      {/* Back */}
      {renderUploadZone(
        'back',
        data.backImage,
        data.backPreview,
        uploadingBack,
        backInputRef as React.RefObject<HTMLInputElement>
      )}

      {/* Error */}
      {error && (
        <div 
          className="rounded-2xl p-4 text-sm flex items-start gap-2"
          style={{
            background: 'repeating-linear-gradient(45deg, #060606, #060606 10px, #1a1a1a 10px, #1a1a1a 20px)',
            color: COLORS.whiteHigh,
            border: '1px solid rgba(255,255,255,0.2)',
          }}
        >
          <AlertCircle className="w-5 h-5 flex-shrink-0" />
          {error}
        </div>
      )}
    </div>
  );
}
