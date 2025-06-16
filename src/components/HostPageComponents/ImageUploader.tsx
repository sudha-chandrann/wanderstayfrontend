
import axios from "axios";
import { ArrowUpFromLine, Image as ImageDownIcon } from "lucide-react";
import { useState, useRef } from "react";

const CLOUDINARY_CLOUD_URL = `https://api.cloudinary.com/v1_1/${
  import.meta.env.VITE_CLOUDINARY_CLOUD_NAME
}/image/upload`;

interface ImageUploaderProps {
  onFileUpload: (url: string) => void;
  setError:(message:string)=>void;
}

function ImageUploader({ onFileUpload ,setError}: ImageUploaderProps) {

  const [isHovering, setIsHovering] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadStatus, setUploadStatus] = useState<string>("");
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = (selectedFile: File) => {

    const validTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp'];
    if (!validTypes.includes(selectedFile.type)) {
      setError("Please select a valid image file (JPG, PNG, GIF, WEBP)");
      return;
    }

    const maxSize = 5 * 1024 * 1024; 
    if (selectedFile.size > maxSize) {
      setError("File size must be less than 5MB");
      return;
    }

    setFile(selectedFile);
    setUploadStatus("File selected. Click to upload.");
  };

  const handleUpload = async () => {
    if (!file) {
      setError("Please select a file first");
      return;
    }

    setIsUploading(true);
    setUploadStatus("Uploading...");

    try {
      const formData = new FormData();
      formData.append("file", file);
      formData.append(
        "upload_preset",
        import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET
      );

      const response = await axios.post(CLOUDINARY_CLOUD_URL, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      const imageUrl = response.data.secure_url;
      onFileUpload(imageUrl);
      setUploadStatus("Upload successful!");
      setFile(null);

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      console.error('Upload error:', error);
      setError(
        error?.response?.data?.error || 
        "Failed to upload image. Please try again."
      );
    } finally {
      setIsUploading(false);
    }
  };

  const handleClick = () => {
    if (file && !isUploading) {
      handleUpload();
    } else {
      fileInputRef.current?.click();
    }
  };

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = e.target.files;
    if (selectedFiles && selectedFiles.length > 0) {
      handleFileSelect(selectedFiles[0]);
    }
  };

  return (
    <div className={`w-full`}>
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleFileInputChange}
        className="hidden"
      />
      
      <div
        onClick={handleClick}
        onMouseEnter={() => setIsHovering(true)}
        onMouseLeave={() => setIsHovering(false)}
        className={`
          w-full h-[250px] relative rounded-xl border-2 border-dashed 
          ${isHovering ? 'border-rose-400 bg-rose-100' : 'border-rose-300 bg-rose-50'}
          hover:bg-rose-100 transition-all duration-300 cursor-pointer 
          flex flex-col items-center justify-center px-6
          ${isUploading ? 'opacity-75 cursor-not-allowed' : ''}
        `}
      >
        <div className="absolute inset-0 flex items-center justify-center opacity-10">
          <div className="w-32 h-32 rounded-full bg-rose-200 animate-pulse"></div>
        </div>

        <div
          className={`transform transition-transform duration-300 ${
            isHovering ? "scale-110" : "scale-100"
          }`}
        >
          <div className="bg-rose-200 p-6 rounded-full">
            <ImageDownIcon className="size-8 text-rose-600" />
          </div>
        </div>

        <div className="mt-6 text-center flex flex-col items-center">
          <p className="text-lg font-medium text-rose-700 mb-2">
            {file ? "Ready to Upload" : "Upload an Image"}
          </p>
          
          {file && (
            <p className="text-sm text-rose-600 mb-2 font-medium">
              Selected: {file.name}
            </p>
          )}
          
          <p className="text-sm text-rose-500 mb-4">
            {file 
              ? "Click to upload the selected image" 
              : "Drag and drop an image or click to browse"
            }
          </p>

          <button
            disabled={isUploading}
            className={`
              flex items-center justify-center space-x-2
              px-4 py-2 rounded-lg
              ${isUploading 
                ? 'bg-gray-400 cursor-not-allowed' 
                : 'bg-rose-400 hover:bg-rose-600'
              }
              text-white font-medium
              shadow-md hover:shadow-lg
              transition-all duration-300
              ${isHovering && !isUploading ? "transform -translate-y-1" : ""}
            `}
          >
            <ArrowUpFromLine className="w-4 h-4" />
            <span>
              {isUploading 
                ? "Uploading..." 
                : file 
                  ? "Upload Image" 
                  : "Select Image"
              }
            </span>
          </button>
        </div>
        {uploadStatus && (
          <p className={`text-xs mt-4 text-rose-500`}>
            {uploadStatus}
          </p>
        )}
        <p className="text-xs text-rose-400 mt-2">
          Supported formats: JPG, PNG, GIF, WEBP (Max 5MB)
        </p>
      </div>
    </div>
  );
}

export default ImageUploader;