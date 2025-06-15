
import { useRef, useState } from "react";
import { ArrowUp } from "lucide-react";

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
    <div className="flex flex-col items-center justify-center p-8 rounded-xl bg-white shadow-lg border border-border max-w-md w-full mx-auto relative">
      <label
        htmlFor="sketch-upload"
        className={`flex flex-col items-center justify-center cursor-pointer rounded-lg w-full min-h-[180px] ${disabled ? 'opacity-60 cursor-not-allowed' : 'hover:bg-indigo-50 transition-colors'}`}
      >
        {preview ? (
          <img src={preview} alt="Preview" className="object-contain rounded-lg max-h-[160px] mb-2 border" />
        ) : (
          <div className="flex flex-col items-center">
            <ArrowUp className="w-10 h-10 text-indigo-600 mb-2" />
            <span className="font-semibold text-lg">Upload or Snap a Sketch</span>
            <span className="text-xs text-muted-foreground mt-1">PNG, JPG, up to 5MB</span>
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
      <button
        className="mt-4 text-indigo-700 border border-indigo-200 px-3 py-1 rounded text-xs hover:bg-indigo-50 transition-colors"
        type="button"
        disabled={disabled}
        onClick={() => inputRef.current?.click()}
      >
        {preview ? "Replace Image" : "Choose Image"}
      </button>
      {!preview && <p className="mt-4 text-xs text-gray-400 text-center max-w-xs">Or, use your phone camera on mobile (coming soon)</p>}
    </div>
  );
};

export default SketchUploader;
