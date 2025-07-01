import React, { useState } from "react";
import { ChevronDown } from "lucide-react";

const PhoneNumberField = ({ onRemove, isPreview = false, field = {}, onUpdate }) => {
  const [phoneNumber, setPhoneNumber] = useState(field.phoneNumber || "");
  const [selectedCountry, setSelectedCountry] = useState(field.selectedCountry || "IN");
  const [description, setDescription] = useState(field.description || "Phone Number");
  const [phonePlaceholder, setPhonePlaceholder] = useState(field.phonePlaceholder || "Enter your phone number");
  const [note, setNote] = useState(field.note || "Note/Instruction (If any)");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const countries = [
    { code: "IN", name: "India", flag: "🇮🇳", dialCode: "+91" },
    { code: "PK", name: "Pakistan", flag: "🇵🇰", dialCode: "+92" },
    { code: "BD", name: "Bangladesh", flag: "🇧🇩", dialCode: "+880" },
    { code: "NP", name: "Nepal", flag: "🇳🇵", dialCode: "+977" },
    { code: "BT", name: "Bhutan", flag: "🇧🇹", dialCode: "+975" },
    { code: "MM", name: "Myanmar (Burma)", flag: "🇲🇲", dialCode: "+95" },
    { code: "CN", name: "China", flag: "🇨🇳", dialCode: "+86" },
    { code: "AF", name: "Afghanistan", flag: "🇦🇫", dialCode: "+93" },
    { code: "LK", name: "Sri Lanka", flag: "🇱🇰", dialCode: "+94" },
    { code: "US", name: "United States", flag: "🇺🇸", dialCode: "+1" },
    { code: "GB", name: "United Kingdom", flag: "🇬🇧", dialCode: "+44" },
    { code: "CA", name: "Canada", flag: "🇨🇦", dialCode: "+1" },
    { code: "AU", name: "Australia", flag: "🇦🇺", dialCode: "+61" },
  ];

  const selectedCountryData = countries.find((c) => c.code === selectedCountry);

  const handlePhoneNumberChange = (e) => {
    const value = e.target.value.replace(/[^\d\s-]/g, "");
    setPhoneNumber(value);
    if (onUpdate) onUpdate({ ...field, phoneNumber: value });
  };

  const handleCountrySelect = (code) => {
    setSelectedCountry(code);
    setIsDropdownOpen(false);
    if (onUpdate) onUpdate({ ...field, selectedCountry: code });
  };

  const handleDescriptionChange = (value) => {
    setDescription(value);
    if (onUpdate) onUpdate({ ...field, description: value });
  };

  const handlePlaceholderChange = (value) => {
    setPhonePlaceholder(value);
    if (onUpdate) onUpdate({ ...field, phonePlaceholder: value });
  };

  const handleNoteChange = (value) => {
    setNote(value);
    if (onUpdate) onUpdate({ ...field, note: value });
  };

  return (
    <div className="w-full relative group bg-white rounded-lg p-4">
      <div className="max-w-3xl mx-auto relative bg-white shadow-sm px-8 py-6 rounded-lg space-y-4">
        
        {/* Label with asterisk */}
        {isPreview ? (
          <div className="text-black text-lg font-medium">
            {field.description || "Phone Number"}
            {field.required && <span className="text-red-500 ml-1">*</span>}
          </div>
        ) : (
          <input
            value={description}
            onChange={(e) => handleDescriptionChange(e.target.value)}
            className="text-black bg-white text-lg font-medium w-full outline-none px-1 py-0.5"
          />
        )}

        {/* Phone Input + Country */}
        <div className="flex flex-col">
          <div className="flex rounded-lg">
            {/* Country Code Dropdown */}
            <div className="relative">
              <button
                type="button"
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className="flex items-center gap-2 px-3 py-2 bg-gray-50"
              >
                <span className="text-lg">{selectedCountryData?.flag}</span>
                <span className="text-sm font-medium">{selectedCountryData?.dialCode}</span>
                <ChevronDown
                  size={14}
                  className={`transform transition-transform ${isDropdownOpen ? "rotate-180" : ""}`}
                />
              </button>

              {isDropdownOpen && (
                <div className="absolute top-full left-0 mt-1 w-64 bg-white rounded-lg shadow-lg z-10 max-h-60 overflow-y-auto">
                  {countries.map((country) => (
                    <button
                      key={country.code}
                      onClick={() => handleCountrySelect(country.code)}
                      className="w-full flex items-center gap-3 px-3 py-2 text-left hover:bg-gray-100"
                    >
                      <span className="text-lg">{country.flag}</span>
                      <div className="flex-1">
                        <div className="text-sm font-medium">{country.name}</div>
                        <div className="text-xs text-gray-500">{country.dialCode}</div>
                      </div>
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Phone Number Input */}
            <input
              value={phoneNumber}
              onChange={handlePhoneNumberChange}
              type="tel"
              placeholder={phonePlaceholder}
              className="flex-1 px-4 py-2 rounded-lg border ml-2 outline-none bg-white"
              maxLength={10}
            />
          </div>

          {/* Editable Placeholder in builder only */}
          {!isPreview && (
            <input
              value={phonePlaceholder}
              onChange={(e) => handlePlaceholderChange(e.target.value)}
              className="text-xs text-gray-400 bg-white mt-1 outline-none px-1 py-0.5"
              title="Edit placeholder"
            />
          )}
        </div>

        {/* Note Field */}
        {isPreview ? (
          <div className="text-xs text-gray-400">{field.note || ""}</div>
        ) : (
          <input
            value={note}
            onChange={(e) => handleNoteChange(e.target.value)}
            placeholder="Note (optional)..."
            className="text-xs text-gray-400 bg-white mt-2 outline-none px-1 py-0.5 w-full"
          />
        )}
      </div>
    </div>
  );
};

export default PhoneNumberField;
