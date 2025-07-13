import React, { useState, useRef, useEffect } from "react";
import img from "../../../assets/DefaultCover.jpg";

const Cover = ({ 
  onRemove, 
  isBuilder = true, 
  field, 
  onUpdate,
  register // ✅ added register prop for consistency
}) => {
  const [previewUrl, setPreviewUrl] = useState(field?.previewUrl || img);
  const fileInputRef = useRef();

  useEffect(() => {
    if (field?.previewUrl) {
      setPreviewUrl(field.previewUrl);
    }
  }, [field]);

  const handleClick = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file && file.type.startsWith("image/")) {
      const url = URL.createObjectURL(file);
      setPreviewUrl(url);
      if (onUpdate) {
        onUpdate({ previewUrl: url });
      }
    }
  };

  // Used to create unique field names for registration (if needed in future)
  const fieldKey = field?.description || "Cover";

  return (
    <div id="Cover" className="w-full relative group">
      {/* Banner Image */}
      <img
        src={previewUrl}
        alt="Cover"
        className="w-full max-h-[150px] object-cover z-0"
        style={{ maxWidth: "1920px" }}
      />

      {/* Controls (only in builder mode) */}
      {isBuilder && (
        <>
          <div className="absolute inset-0 flex justify-center items-center opacity-0 group-hover:opacity-100 transition-opacity z-10">
            <div className="flex items-center space-x-3 bg-white/80 px-4 py-2 rounded-full shadow text-center">
              {/* Upload Button */}
              <div className="flex items-center justify-center">
                <input
                  type="file"
                  accept="image/*"
                  ref={fileInputRef}
                  onChange={handleFileChange}
                  className="hidden"
                />
                <button onClick={handleClick} className="flex items-center justify-center">
                  {/* Upload Icon */}
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="34.5 35 25 25"
                    width="20"
                    height="20"
                    className="text-black"
                  >
                    <g clipPath="url(#clip0_604_782)">
                      <path
                        d="M57.4163 37.0833H36.583V57.9167H48.283C47.7815 56.9514 47.52 55.8795 47.5205 54.7917C47.5205 52.8125 48.3705 51.0313 49.7247 49.7927L43.8747 43.9438L38.6663 49.1521V39.1667H55.333V48.1C56.06 48.2131 56.7636 48.4439 57.4163 48.7833V37.0833Z"
                        fill="#5D5D5D"
                      />
                      <path
                        d="M51.1663 40.4688C50.4066 40.4688 49.678 40.7706 49.1408 41.3078C48.6036 41.845 48.3018 42.5736 48.3018 43.3333C48.3018 44.0931 48.6036 44.8217 49.1408 45.3589C49.678 45.8961 50.4066 46.1979 51.1663 46.1979C51.9261 46.1979 52.6547 45.8961 53.1919 45.3589C53.7291 44.8217 54.0309 44.0931 54.0309 43.3333C54.0309 42.5736 53.7291 41.845 53.1919 41.3078C52.6547 40.7706 51.9261 40.4688 51.1663 40.4688ZM53.2497 60H55.333V55.8333H59.4997V53.75H55.333V49.5833H53.2497V53.75H49.083V55.8333H53.2497V60Z"
                        fill="#5D5D5D"
                      />
                    </g>
                    <defs>
                      <clipPath id="clip0_604_782">
                        <rect
                          width="25"
                          height="25"
                          fill="white"
                          transform="translate(34.5 35)"
                        />
                      </clipPath>
                    </defs>
                  </svg>
                </button>
              </div>

              {/* Remove Button */}
              <button onClick={onRemove} className="flex items-center justify-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="w-5 h-5 text-black"
                  title="Remove Image"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
                  />
                </svg>
              </button>
            </div>
          </div>

          {/* Dimension Label */}
          {previewUrl === img && (
            <div className="absolute bottom-1 right-2 bg-black/70 text-white text-xs px-2 py-0.5 rounded-sm z-20 opacity-0 group-hover:opacity-100 transition-opacity">
              1920 × 150 fits the best
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default Cover;