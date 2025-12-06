// ============================================
// KYC Step 2: Document Upload (MyKad)
// ============================================

import { useState, useRef } from 'react';
import { FileText, Camera, Upload, X, Check, AlertCircle, RotateCcw } from 'lucide-react';
import { KYCStep2Data } from '../../types';

interface KYCStep2Props {
  data: KYCStep2Data;
  onUpdate: (data: Partial<KYCStep2Data>) => void;
  error: string | null;
}

type DocumentSide = 'front' | 'back';

export function KYCStep2({ data, onUpdate, error }: KYCStep2Props) {
  const [activeCapture, setActiveCapture] = useState<DocumentSide | null>(null);
  const [cameraStream, setCameraStream] = useState<MediaStream | null>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const fileInputFrontRef = useRef<HTMLInputElement>(null);
  const fileInputBackRef = useRef<HTMLInputElement>(null);

  const startCamera = async (side: DocumentSide) => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: 'environment', width: 1280, height: 720 }
      });
      setCameraStream(stream);
      setActiveCapture(side);
      
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        videoRef.current.play();
      }
    } catch (err) {
      console.error('Camera access error:', err);
      alert('Unable to access camera. Please check permissions or upload a file instead.');
    }
  };

  const stopCamera = () => {
    if (cameraStream) {
      cameraStream.getTracks().forEach(track => track.stop());
      setCameraStream(null);
    }
    setActiveCapture(null);
  };

  const capturePhoto = () => {
    if (!videoRef.current || !canvasRef.current || !activeCapture) return;

    const video = videoRef.current;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    
    if (!ctx) return;

    // Set canvas size to video size
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    
    // Draw video frame to canvas
    ctx.drawImage(video, 0, 0);
    
    // Convert to blob
    canvas.toBlob((blob) => {
      if (blob) {
        const file = new File([blob], `mykad-${activeCapture}.jpg`, { type: 'image/jpeg' });
        const preview = canvas.toDataURL('image/jpeg', 0.9);
        
        if (activeCapture === 'front') {
          onUpdate({ idFrontFile: file, idFrontPreview: preview });
        } else {
          onUpdate({ idBackFile: file, idBackPreview: preview });
        }
      }
      stopCamera();
    }, 'image/jpeg', 0.9);
  };

  const handleFileUpload = (side: DocumentSide, file: File) => {
    if (!file.type.startsWith('image/')) {
      alert('Please select an image file');
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      alert('File size must be less than 5MB');
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      const preview = e.target?.result as string;
      if (side === 'front') {
        onUpdate({ idFrontFile: file, idFrontPreview: preview });
      } else {
        onUpdate({ idBackFile: file, idBackPreview: preview });
      }
    };
    reader.readAsDataURL(file);
  };

  const clearDocument = (side: DocumentSide) => {
    if (side === 'front') {
      onUpdate({ idFrontFile: null, idFrontPreview: null });
    } else {
      onUpdate({ idBackFile: null, idBackPreview: null });
    }
  };

  // Camera capture modal
  if (activeCapture) {
    return (
      <div className="fixed inset-0 bg-black z-50 flex flex-col">
        {/* Camera View */}
        <div className="flex-1 relative">
          <video
            ref={videoRef}
            autoPlay
            playsInline
            className="w-full h-full object-cover"
          />
          
          {/* Guide Overlay */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div className="w-[90%] aspect-[1.6/1] border-2 border-white/50 rounded-xl">
              <div className="absolute top-4 left-4 w-8 h-8 border-t-2 border-l-2 border-white rounded-tl-lg" />
              <div className="absolute top-4 right-4 w-8 h-8 border-t-2 border-r-2 border-white rounded-tr-lg" />
              <div className="absolute bottom-4 left-4 w-8 h-8 border-b-2 border-l-2 border-white rounded-bl-lg" />
              <div className="absolute bottom-4 right-4 w-8 h-8 border-b-2 border-r-2 border-white rounded-br-lg" />
            </div>
          </div>

          {/* Instructions */}
          <div className="absolute top-8 left-0 right-0 text-center">
            <span className="bg-black/60 text-white px-4 py-2 rounded-full text-sm">
              Position your MyKad ({activeCapture === 'front' ? 'FRONT' : 'BACK'}) within the frame
            </span>
          </div>
        </div>

        {/* Controls */}
        <div className="bg-black p-6 flex items-center justify-around">
          <button
            onClick={stopCamera}
            className="w-14 h-14 bg-white/20 rounded-full flex items-center justify-center"
          >
            <X className="w-6 h-6 text-white" />
          </button>
          
          <button
            onClick={capturePhoto}
            className="w-20 h-20 bg-white rounded-full flex items-center justify-center border-4 border-purple-500"
          >
            <div className="w-16 h-16 bg-purple-500 rounded-full" />
          </button>
          
          <div className="w-14 h-14" /> {/* Spacer */}
        </div>

        {/* Hidden canvas for capture */}
        <canvas ref={canvasRef} className="hidden" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center mb-6">
        <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
          <FileText className="w-8 h-8 text-white" />
        </div>
        <h3 className="text-gray-900 text-xl font-semibold">Upload MyKad</h3>
        <p className="text-gray-500 text-sm mt-1">Take clear photos of your IC (front & back)</p>
      </div>

      {/* Tips */}
      <div className="bg-blue-50 border border-blue-100 rounded-xl p-4">
        <h4 className="text-blue-900 font-medium text-sm mb-2">📸 Tips for a clear photo:</h4>
        <ul className="text-blue-700 text-xs space-y-1">
          <li>• Good lighting, avoid glare</li>
          <li>• Place on flat, dark surface</li>
          <li>• All corners visible</li>
          <li>• Text clearly readable</li>
        </ul>
      </div>

      {/* Document Cards */}
      <div className="space-y-4">
        {/* Front of IC */}
        <DocumentCard
          title="MyKad Front"
          description="Photo side with your face"
          preview={data.idFrontPreview}
          onCapture={() => startCamera('front')}
          onUpload={() => fileInputFrontRef.current?.click()}
          onClear={() => clearDocument('front')}
        />
        <input
          ref={fileInputFrontRef}
          type="file"
          accept="image/*"
          className="hidden"
          onChange={(e) => {
            const file = e.target.files?.[0];
            if (file) handleFileUpload('front', file);
          }}
        />

        {/* Back of IC */}
        <DocumentCard
          title="MyKad Back"
          description="Address side"
          preview={data.idBackPreview}
          onCapture={() => startCamera('back')}
          onUpload={() => fileInputBackRef.current?.click()}
          onClear={() => clearDocument('back')}
        />
        <input
          ref={fileInputBackRef}
          type="file"
          accept="image/*"
          className="hidden"
          onChange={(e) => {
            const file = e.target.files?.[0];
            if (file) handleFileUpload('back', file);
          }}
        />
      </div>

      {/* Status */}
      <div className="flex items-center justify-center gap-6 text-sm">
        <div className={`flex items-center gap-2 ${data.idFrontFile ? 'text-green-600' : 'text-gray-400'}`}>
          {data.idFrontFile ? <Check className="w-4 h-4" /> : <div className="w-4 h-4 border-2 border-current rounded-full" />}
          Front
        </div>
        <div className={`flex items-center gap-2 ${data.idBackFile ? 'text-green-600' : 'text-gray-400'}`}>
          {data.idBackFile ? <Check className="w-4 h-4" /> : <div className="w-4 h-4 border-2 border-current rounded-full" />}
          Back
        </div>
      </div>

      {/* Error Display */}
      {error && (
        <div className="bg-red-50 border border-red-200 rounded-xl p-4 text-red-700 text-sm flex items-start gap-3">
          <AlertCircle className="w-5 h-5 flex-shrink-0 mt-0.5" />
          <span>{error}</span>
        </div>
      )}
    </div>
  );
}

// Document Card Component
interface DocumentCardProps {
  title: string;
  description: string;
  preview: string | null;
  onCapture: () => void;
  onUpload: () => void;
  onClear: () => void;
}

function DocumentCard({ title, description, preview, onCapture, onUpload, onClear }: DocumentCardProps) {
  if (preview) {
    return (
      <div className="relative">
        <div className="aspect-[1.6/1] rounded-xl overflow-hidden border-2 border-green-500 bg-gray-100">
          <img src={preview} alt={title} className="w-full h-full object-cover" />
        </div>
        <div className="absolute top-2 right-2 flex gap-2">
          <button
            onClick={onClear}
            className="w-8 h-8 bg-red-500 text-white rounded-full flex items-center justify-center shadow-lg"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
        </div>
        <div className="absolute bottom-2 left-2 bg-green-500 text-white px-3 py-1 rounded-full text-xs flex items-center gap-1">
          <Check className="w-3 h-3" />
          {title}
        </div>
      </div>
    );
  }

  return (
    <div className="border-2 border-dashed border-gray-300 rounded-xl p-6 bg-gray-50">
      <div className="text-center mb-4">
        <h4 className="text-gray-900 font-medium">{title}</h4>
        <p className="text-gray-500 text-sm">{description}</p>
      </div>
      <div className="flex gap-3">
        <button
          onClick={onCapture}
          className="flex-1 py-3 bg-gradient-to-r from-purple-500 to-blue-500 text-white rounded-xl flex items-center justify-center gap-2"
        >
          <Camera className="w-5 h-5" />
          Camera
        </button>
        <button
          onClick={onUpload}
          className="flex-1 py-3 border border-gray-300 text-gray-700 rounded-xl flex items-center justify-center gap-2 hover:bg-gray-100"
        >
          <Upload className="w-5 h-5" />
          Upload
        </button>
      </div>
    </div>
  );
}

