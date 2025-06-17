
import { useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Upload, Image, Camera } from "lucide-react";

interface AnimatedSketchUploaderProps {
  onImageSelected: (img: string) => void;
  disabled?: boolean;
}

const AnimatedSketchUploader = ({ onImageSelected, disabled }: AnimatedSketchUploaderProps) => {
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
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="bg-white rounded-2xl shadow-xl border border-gray-100 p-6 md:p-8 max-w-md w-full mx-auto relative overflow-hidden"
    >
      <motion.div 
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500"
      />
      
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="text-center mb-6"
      >
        <h3 className="text-xl font-bold text-gray-900 mb-2">Upload Your Sketch</h3>
        <p className="text-gray-600 text-sm">Start by uploading a hand-drawn wireframe or UI sketch</p>
      </motion.div>

      <motion.label
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        htmlFor="sketch-upload"
        className={`flex flex-col items-center justify-center cursor-pointer rounded-xl w-full min-h-[200px] border-2 border-dashed transition-all duration-300 ${
          disabled 
            ? 'opacity-60 cursor-not-allowed border-gray-200 bg-gray-50' 
            : preview
            ? 'border-indigo-300 bg-indigo-50/50 hover:bg-indigo-50 hover:border-indigo-400'
            : 'border-gray-300 bg-gray-50 hover:border-indigo-400 hover:bg-indigo-50/50'
        }`}
      >
        <AnimatePresence mode="wait">
          {preview ? (
            <motion.div 
              key="preview"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.3 }}
              className="relative group"
            >
              <img 
                src={preview} 
                alt="Preview" 
                className="object-contain rounded-lg max-h-[180px] mb-3 border shadow-md group-hover:shadow-lg transition-shadow" 
              />
              <motion.div 
                initial={{ opacity: 0 }}
                whileHover={{ opacity: 1 }}
                className="absolute inset-0 bg-black/20 transition-opacity rounded-lg flex items-center justify-center"
              >
                <div className="bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-sm font-medium text-gray-700">
                  Click to replace
                </div>
              </motion.div>
            </motion.div>
          ) : (
            <motion.div 
              key="upload"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
              className="flex flex-col items-center text-center"
            >
              <motion.div 
                whileHover={{ scale: 1.1, rotate: 5 }}
                transition={{ duration: 0.3 }}
                className="w-16 h-16 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-full flex items-center justify-center mb-4 shadow-lg"
              >
                <Upload className="w-8 h-8 text-white" />
              </motion.div>
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
            </motion.div>
          )}
        </AnimatePresence>
        <input
          id="sketch-upload"
          ref={inputRef}
          type="file"
          accept="image/png,image/jpeg"
          className="hidden"
          disabled={disabled}
          onChange={handleFileChange}
        />
      </motion.label>
      
      <div className="mt-6 flex justify-center">
        <motion.button
          whileHover={{ scale: 1.05, y: -2 }}
          whileTap={{ scale: 0.95 }}
          className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-6 py-2.5 rounded-xl font-medium shadow-lg hover:shadow-xl transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
          type="button"
          disabled={disabled}
          onClick={() => inputRef.current?.click()}
        >
          {preview ? "Replace Image" : "Choose File"}
        </motion.button>
      </div>
      
      {!preview && (
        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="mt-4 text-xs text-gray-400 text-center"
        >
          Mobile camera support coming soon
        </motion.p>
      )}
    </motion.div>
  );
};

export default AnimatedSketchUploader;
