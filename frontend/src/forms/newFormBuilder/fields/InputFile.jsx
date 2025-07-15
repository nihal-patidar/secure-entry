import React, { useRef, useState } from "react";

const InputFile = ({
  name = "Upload File",
  isPreview = false,
  field = {},
  onUpdate,
  register, // ✅ used in preview mode only
}) => {
  const inputRef = useRef();
  const [fileName, setFileName] = useState(field.fileName || "");
  const [description, setDescription] = useState(field.description || name);
  const [note, setNote] = useState(field.note || "");
  const [maxSize, setMaxSize] = useState(field.maxSize || 1024); // Max size in KB
  const [error, setError] = useState("");
  const [previewUrl, setPreviewUrl] = useState(field.previewUrl || "");
  const [selectedFile, setSelectedFile] = useState(null);

  // Extract type from name ("Upload File" or "Upload Image") or use field.type
  const type = field.type || name.split(" ")[1] || "File";

  // Used to create unique field names for registration
  const fieldKey = field.description || description || name;

  // Define accepted file types based on type
  const getAcceptedFileTypes = () => {
    if (type === "Upload Image" || type.toLowerCase() === "image") {
      return ".jpeg,.jpg,.png,.gif,.bmp,.webp,.svg,.tiff,.ico";
    }
    return "*/*";
  };

  // Validate file type for images
  const validateFileType = (file) => {
    if (type === "Upload Image" || type.toLowerCase() === "image") {
      const allowedTypes = [
        'image/jpeg',
        'image/jpg', 
        'image/png',
        'image/gif',
        'image/bmp',
        'image/webp',
        'image/svg+xml',
        'image/tiff',
        'image/x-icon',
        'image/vnd.microsoft.icon'
      ];
      
      if (!allowedTypes.includes(file.type)) {
        setError(`Only image files are allowed (JPEG, PNG, GIF, BMP, WebP, SVG, TIFF, ICO)`);
        return false;
      }
    }
    
    setError("");
    return true;
  };

  const handleFileClick = () => {
    inputRef.current?.click();
  };

  const validateFileSize = (file) => {
    if (!maxSize || !file) return true;
    
    const fileSizeKB = file.size / 1024; // Convert bytes to KB
    const maxSizeKB = parseInt(maxSize);
    
    if (fileSizeKB > maxSizeKB) {
      setError(`File size (${Math.round(fileSizeKB)}KB) exceeds maximum allowed size (${maxSizeKB}KB)`);
      return false;
    }
    
    return true;
  };

  const handleFileChange = (event) => {
    const file = event.target.files?.[0];
    if (file) {
      // Validate file type first
      if (!validateFileType(file)) {
        event.target.value = "";
        setPreviewUrl("");
        setSelectedFile(null);
        return;
      }

      // Then validate file size
      if (validateFileSize(file)) {
        setFileName(file.name);
        setSelectedFile(file);
        
        // Create preview URL for the file
        const fileUrl = URL.createObjectURL(file);
        setPreviewUrl(fileUrl);
        
        setError(""); // Clear any previous errors
        onUpdate?.({ ...field, fileName: file.name, file: file, previewUrl: fileUrl });
      } else {
        // Clear the input if file is too large
        event.target.value = "";
        setPreviewUrl("");
        setSelectedFile(null);
      }
    }
  };

  const openFilePreview = () => {
    if (previewUrl) {
      window.open(previewUrl, '_blank');
    }
  };

  const downloadFile = () => {
    if (selectedFile) {
      const url = URL.createObjectURL(selectedFile);
      const a = document.createElement('a');
      a.href = url;
      a.download = selectedFile.name;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    }
  };

  const getFileIcon = (fileName) => {
    const ext = fileName.split('.').pop()?.toLowerCase();
    switch (ext) {
      case 'pdf':
        return (
          <svg className="w-8 h-8 text-red-500" fill="currentColor" viewBox="0 0 24 24">
            <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-5 14H7v-2h7v2zm3-4H7v-2h10v2zm0-4H7V7h10v2z"/>
          </svg>
        );
      case 'doc':
      case 'docx':
        return (
          <svg className="w-8 h-8 text-blue-500" fill="currentColor" viewBox="0 0 24 24">
            <path d="M14,2H6A2,2 0 0,0 4,4V20A2,2 0 0,0 6,22H18A2,2 0 0,0 20,20V8L14,2M18,20H6V4H13V9H18V20Z"/>
          </svg>
        );
      case 'xls':
      case 'xlsx':
        return (
          <svg className="w-8 h-8 text-green-500" fill="currentColor" viewBox="0 0 24 24">
            <path d="M14,2H6A2,2 0 0,0 4,4V20A2,2 0 0,0 6,22H18A2,2 0 0,0 20,20V8L14,2M18,20H6V4H13V9H18V20Z"/>
          </svg>
        );
      case 'txt':
        return (
          <svg className="w-8 h-8 text-gray-500" fill="currentColor" viewBox="0 0 24 24">
            <path d="M14,2H6A2,2 0 0,0 4,4V20A2,2 0 0,0 6,22H18A2,2 0 0,0 20,20V8L14,2M18,20H6V4H13V9H18V20Z"/>
          </svg>
        );
      default:
        return (
          <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
        );
    }
  };

  const handleChange = (setter, key) => (e) => {
    setter(e.target.value);
    onUpdate?.({ ...field, [key]: e.target.value });
  };

  const handleMaxSizeChange = (e) => {
    const value = e.target.value;
    // Only allow numbers
    if (value === "" || /^\d+$/.test(value)) {
      setMaxSize(value);
      onUpdate?.({ ...field, maxSize: value });
    }
  };

  const getPlaceholderText = () => {
    if (type === "Upload Image") {
      return "Click to choose image";
    }
    return `Click to choose ${type}`;
  };

  const getFileTypeHint = () => {
    if (type === "Upload Image") {
      return "Accepted formats: JPEG, PNG, GIF, BMP, WebP, SVG, TIFF, ICO";
    }
    return null;
  };

  return (
    <div className="w-full relative group bg-white rounded-lg">
      <div className="max-w-3xl mx-auto bg-white px-8 rounded-lg space-y-4">
        {/* Description Heading with optional red asterisk */}
        {isPreview ? (
          <div className="text-black text-lg font-medium">
            {description}
            {field.required && <span className="text-red-500 ml-1">*</span>}
          </div>
        ) : (
          <input
            type="text"
            value={description}
            onChange={handleChange(setDescription, "description")}
            className="text-black bg-white text-lg font-medium outline-none rounded px-1 py-0.5 w-full"
            placeholder={`Heading (e.g., Upload ${type})`}
          />
        )}

        {/* Max Size Input (Builder Mode Only) */}
        {!isPreview && (
          <div className="flex items-center space-x-2">
            <label className="text-sm text-gray-600 whitespace-nowrap">Max Size:</label>
            <input
              type="text"
              value={maxSize}
              onChange={handleMaxSizeChange}
              className="text-sm text-gray-600 bg-white outline-none rounded px-2 py-1 border border-gray-300 w-20"
              placeholder="KB"
            />
            <span className="text-sm text-gray-500">KB (leave empty for no limit)</span>
          </div>
        )}

        {/* File Type Hint for Images */}
        {type === "Upload Image" && (
          <div className="text-xs text-gray-500">
            {getFileTypeHint()}
          </div>
        )}

        {/* File/Image Upload Box */}
        {isPreview && typeof register === "function" ? (
          // React Hook Form registered file input - stores the actual file object
          <div className="w-full">
            <input
              {...register(fieldKey, {
                validate: (fileList) => {
                  if (!fileList || fileList.length === 0) return true;
                  const file = fileList[0];
                  
                  // Validate file type
                  if (type === "Upload Image" || type.toLowerCase() === "image") {
                    const allowedTypes = [
                      'image/jpeg',
                      'image/jpg', 
                      'image/png',
                      'image/gif',
                      'image/bmp',
                      'image/webp',
                      'image/svg+xml',
                      'image/tiff',
                      'image/x-icon',
                      'image/vnd.microsoft.icon'
                    ];
                    
                    if (!allowedTypes.includes(file.type)) {
                      return "Only image files are allowed (JPEG, PNG, GIF, BMP, WebP, SVG, TIFF, ICO)";
                    }
                  }
                  
                  // Validate file size
                  if (maxSize) {
                    const fileSizeKB = file.size / 1024;
                    const maxSizeKB = parseInt(maxSize);
                    if (fileSizeKB > maxSizeKB) {
                      return `File size exceeds ${maxSize}KB limit`;
                    }
                  }
                  
                  return true;
                }
              })}
              type="file"
              accept={getAcceptedFileTypes()}
              className="w-full px-4 py-3 border-2 border-dashed border-gray-200 rounded-lg bg-white cursor-pointer hover:border-blue-400 transition duration-200 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-medium file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
            />
            {maxSize && (
              <div className="text-xs text-gray-500 mt-1">
                Maximum file size: {maxSize}KB
              </div>
            )}
          </div>
        ) : (
          // Interactive file upload for builder/non-preview mode
          <div>
            <div
              onClick={handleFileClick}
              className={`w-full flex items-center justify-between px-4 py-3 border-2 border-dashed rounded-lg transition duration-200 ${
                isPreview
                  ? "border-gray-200 bg-white cursor-pointer hover:border-blue-400"
                  : "border-gray-300 bg-gray-50 cursor-pointer hover:border-blue-500"
              }`}
            >
              <span className="text-gray-500 text-sm truncate max-w-[70%]">
                {fileName ? `Selected: ${fileName}` : getPlaceholderText()}
              </span>
              <span className="text-blue-600 font-medium">Browse</span>
              <input
                type="file"
                ref={inputRef}
                onChange={handleFileChange}
                accept={getAcceptedFileTypes()}
                className="hidden"
              />
            </div>
            {error && (
              <div className="text-red-500 text-xs mt-1">{error}</div>
            )}
            {maxSize && !error && (
              <div className="text-xs text-gray-500 mt-1">
                Maximum file size: {maxSize}KB
              </div>
            )}
          </div>
        )}

        {/* File Preview */}
        {previewUrl && (
          <div className="w-full bg-gray-50 rounded-lg p-4 border border-gray-200">
            <div className="text-sm text-gray-600 mb-3">Preview:</div>
            {(type === "Upload Image" || type.toLowerCase() === "image") ? (
              <div className="space-y-3">
                <div className="flex justify-center">
                  <img
                    src={previewUrl}
                    alt="Preview"
                    className="max-h-64 max-w-full rounded-lg shadow-sm object-contain border cursor-pointer hover:shadow-md transition-shadow"
                    onClick={openFilePreview}
                    title="Click to open in new tab"
                  />
                </div>
                <div className="flex justify-center space-x-2">
                  <button
                    onClick={openFilePreview}
                    className="px-3 py-1 bg-blue-500 text-white text-sm rounded hover:bg-blue-600 transition-colors"
                  >
                    Open in New Tab
                  </button>
                  <button
                    onClick={downloadFile}
                    className="px-3 py-1 bg-green-500 text-white text-sm rounded hover:bg-green-600 transition-colors"
                  >
                    Download
                  </button>
                </div>
              </div>
            ) : (
              <div className="space-y-3">
                <div className="flex items-center space-x-3 p-3 bg-white rounded border">
                  <div className="flex-shrink-0">
                    {getFileIcon(fileName)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-sm font-medium text-gray-900 truncate">{fileName}</div>
                    <div className="text-xs text-gray-500">
                      {selectedFile ? `${(selectedFile.size / 1024).toFixed(1)} KB` : 'File selected'}
                    </div>
                  </div>
                </div>
                <div className="flex justify-center space-x-2">
                  <button
                    onClick={openFilePreview}
                    className="px-3 py-1 bg-blue-500 text-white text-sm rounded hover:bg-blue-600 transition-colors"
                  >
                    Open in New Tab
                  </button>
                  <button
                    onClick={downloadFile}
                    className="px-3 py-1 bg-green-500 text-white text-sm rounded hover:bg-green-600 transition-colors"
                  >
                    Download
                  </button>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Note */}
        {isPreview ? (
          note && <div className="text-xs text-gray-400 mt-1">{note}</div>
        ) : (
          <input
            type="text"
            value={note}
            onChange={handleChange(setNote, "note")}
            className="text-sm text-gray-500 bg-white outline-none rounded-md w-full"
            placeholder={`Note (about the ${type === "Upload Image" ? "image" : type.toLowerCase()}, optional)`}
          />
        )}
      </div>
    </div>
  );
};

export default InputFile;