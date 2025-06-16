
import { useRef, useState } from "react";
import { Upload, Image, Camera } from "lucide-react";

interface SketchUploaderProps {
  onImageSelected: (img: string) => void;
  disabled?: boolean;
}

const SketchUploader = ({ onImageSelected, disabled }: SketchUploaderProps) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [preview, setPreview] = useState<string | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (evt) => {
      const dataUrl = evt.target?.result as string;
      setPreview(dataUrl);
      onImageSelected(dataUrl);
    };
    reader.readAsDataURL(file);
  };

  return (
    <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-8 max-w-md w-full mx-auto relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500"></div>
      
      <div className="text-center mb-6">
        <h3 className="text-xl font-bold text-gray-900 mb-2">Upload Your Sketch</h3>
        <p className="text-gray-600 text-sm">Start by uploading a hand-drawn wireframe or UI sketch</p>
      </div>

      <label
        htmlFor="sketch-upload"
        className={`flex flex-col items-center justify-center cursor-pointer rounded-xl w-full min-h-[200px] border-2 border-dashed transition-all duration-200 ${
          disabled 
            ? 'opacity-60 cursor-not-allowed border-gray-200 bg-gray-50' 
            : preview
            ? 'border-indigo-300 bg-indigo-50/50 hover:bg-indigo-50'
            : 'border-gray-300 bg-gray-50 hover:border-indigo-400 hover:bg-indigo-50/50'
        }`}
      >
        {preview ? (
          <div className="relative group">
            <img 
              src={preview} 
              alt="Preview" 
              className="object-contain rounded-lg max-h-[180px] mb-3 border shadow-md group-hover:shadow-lg transition-shadow" 
            />
            <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity rounded-lg flex items-center justify-center">
              <div className="bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-sm font-medium text-gray-700">
                Click to replace
              </div>
            </div>
          </div>
        ) : (
          <div className="flex flex-col items-center text-center">
            <div className="w-16 h-16 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-full flex items-center justify-center mb-4 shadow-lg">
              <Upload className="w-8 h-8 text-white" />
            </div>
            <span className="font-semibold text-lg text-gray-900 mb-2">Drop your sketch here</span>
            <span className="text-sm text-gray-500 mb-4">or click to browse files</span>
            <div className="flex items-center gap-4 text-xs text-gray-400">
              <div className="flex items-center gap-1">
                <Image className="w-4 h-4" />
                PNG, JPG
              </div>
              <div className="flex items-center gap-1">
                <Camera className="w-4 h-4" />
                Up to 5MB
              </div>
            </div>
          </div>
        )}
        <input
          id="sketch-upload"
          ref={inputRef}
          type="file"
          accept="image/png,image/jpeg"
          className="hidden"
          disabled={disabled}
          onChange={handleFileChange}
        />
      </label>
      
      <div className="mt-6 flex justify-center">
        <button
          className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-6 py-2.5 rounded-xl font-medium shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
          type="button"
          disabled={disabled}
          onClick={() => inputRef.current?.click()}
        >
          {preview ? "Replace Image" : "Choose File"}
        </button>
      </div>
      
      {!preview && (
        <p className="mt-4 text-xs text-gray-400 text-center">
          Mobile camera support coming soon
        </p>
      )}
    </div>
  );
};

export default SketchUploader;
