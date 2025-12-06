// ============================================
// KYC Step 2: MyKad Document Upload
// Cash App Inspired - Clean upload interface
// ============================================

import { useState, useRef } from 'react';
import { Camera, Upload, Check, RotateCcw, AlertCircle } from 'lucide-react';
import { KYCStep2Data } from '../../types';

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
          <span className="font-medium text-gray-900">
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
              className="text-sm text-gray-500 flex items-center gap-1"
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
            />
            <div className="absolute bottom-3 right-3 bg-green-500 text-white px-3 py-1 rounded-full text-sm flex items-center gap-1">
              <Check className="w-4 h-4" /> Captured
            </div>
          </div>
        ) : (
          <button
            onClick={() => inputRef.current?.click()}
            disabled={isUploading}
            className="w-full h-48 border-2 border-dashed border-gray-300 rounded-2xl flex flex-col items-center justify-center gap-3 hover:border-gray-400 hover:bg-gray-50 transition-colors"
          >
            {isUploading ? (
              <>
                <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center animate-pulse">
                  <Camera className="w-5 h-5 text-gray-400" />
                </div>
                <span className="text-gray-500">Processing...</span>
              </>
            ) : (
              <>
                <div 
                  className="w-14 h-14 rounded-2xl flex items-center justify-center"
                  style={{ backgroundColor: 'var(--ryse-green, #B9FF00)' }}
                >
                  <Camera className="w-7 h-7 text-black" />
                </div>
                <span className="text-gray-600 font-medium">Tap to capture</span>
                <span className="text-gray-400 text-sm">or upload a photo</span>
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
      <div className="bg-gray-50 rounded-2xl p-4">
        <p className="text-gray-600 text-sm">
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
        <div className="bg-green-50 rounded-2xl p-4 space-y-2">
          <div className="flex items-center gap-2 text-green-700 font-medium">
            <Check className="w-5 h-5" />
            Information extracted
          </div>
          <div className="text-sm text-green-800 space-y-1">
            <p><span className="text-green-600">Name:</span> {data.ocrData.extractedName}</p>
            <p><span className="text-green-600">IC:</span> {data.ocrData.extractedIC}</p>
            <p><span className="text-green-600">Confidence:</span> {data.ocrData.confidence}%</p>
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
        <div className="bg-red-50 rounded-2xl p-4 text-red-700 text-sm flex items-start gap-2">
          <AlertCircle className="w-5 h-5 flex-shrink-0" />
          {error}
        </div>
      )}
    </div>
  );
}
