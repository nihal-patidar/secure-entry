import React, { useRef, useState, useEffect } from "react";
import { X } from "lucide-react";

const Timer = ({ 
  field, 
  onUpdate, 
  isBuilder = true, 
  onRemove,
  register, // ✅ used in preview mode only
}) => {
  const refs = [useRef(), useRef(), useRef(), useRef()];

  const [timeData, setTimeData] = useState({
    days: field?.defaultValue?.days || 0,
    hours: field?.defaultValue?.hours || 0,
    minutes: field?.defaultValue?.minutes || 0,
    seconds: field?.defaultValue?.seconds || 0,
  });

  // Used to create unique field names for registration
  const fieldKey = field?.label || "Timer";

  const getValues = () => {
    return refs.map((ref) => {
      const val = ref.current?.innerText || "0";
      return parseInt(val.replace(/\D/g, ""), 10) || 0;
    });
  };

  const normalizeTime = () => {
    let [d, h, m, s] = getValues();

    m += Math.floor(s / 60);
    s %= 60;

    h += Math.floor(m / 60);
    m %= 60;

    d += Math.floor(h / 24);
    h %= 24;

    const normalizedTime = { days: d, hours: h, minutes: m, seconds: s };

    refs[0].current.innerText = String(d).padStart(2, "0");
    refs[1].current.innerText = String(h).padStart(2, "0");
    refs[2].current.innerText = String(m).padStart(2, "0");
    refs[3].current.innerText = String(s).padStart(2, "0");

    setTimeData(normalizedTime);

    if (isBuilder && onUpdate) {
      onUpdate({ defaultValue: normalizedTime });
    }
  };

  const handleInput = (e, maxLength) => {
    const text = e.currentTarget.innerText;
    const cleaned = text.replace(/\D/g, "");
    if (text !== cleaned || cleaned.length > maxLength) {
      e.currentTarget.innerText = cleaned.slice(0, maxLength);
    }
  };

  const handleKeyDown = (e) => {
    const allowedKeys = ["Backspace", "ArrowLeft", "ArrowRight", "Delete", "Tab"];
    if (!/[0-9]/.test(e.key) && !allowedKeys.includes(e.key)) {
      e.preventDefault();
    }
  };

  useEffect(() => {
    if (refs[0].current) refs[0].current.innerText = String(timeData.days).padStart(2, "0");
    if (refs[1].current) refs[1].current.innerText = String(timeData.hours).padStart(2, "0");
    if (refs[2].current) refs[2].current.innerText = String(timeData.minutes).padStart(2, "0");
    if (refs[3].current) refs[3].current.innerText = String(timeData.seconds).padStart(2, "0");
  }, [timeData]);

  return (
    <div className="w-full relative group bg-white rounded-lg p-4">
      {/* Timer Box */}
      <div className="flex justify-center relative">
        <div className="border relative group border-gray-200 rounded-lg text-gray-900 text-2xl font-medium px-4 py-3 flex justify-center items-center bg-white shadow-sm">

          {/* Remove Button: Only show in builder mode */}
          {isBuilder && (
            <button
              onClick={onRemove}
              className="absolute -top-3 -right-3 opacity-0 group-hover:opacity-100 text-gray-400 hover:text-red-500 transition-all z-10 bg-white rounded-full p-[2px] shadow"
            >
              <X className="w-4 h-4" />
            </button>
          )}

          {/* Hidden inputs for form registration in preview mode */}
          {!isBuilder && typeof register === "function" && (
            <>
              <input
                {...register(`${fieldKey}_days`)}
                type="hidden"
                value={timeData.days}
              />
              <input
                {...register(`${fieldKey}_hours`)}
                type="hidden"
                value={timeData.hours}
              />
              <input
                {...register(`${fieldKey}_minutes`)}
                type="hidden"
                value={timeData.minutes}
              />
              <input
                {...register(`${fieldKey}_seconds`)}
                type="hidden"
                value={timeData.seconds}
              />
            </>
          )}

          {/* Timer Display */}
          {["Days", "Hours", "Minutes", "Seconds"].map((label, index) => {
            const maxLength = index === 0 ? 3 : 2;
            const key = ["days", "hours", "minutes", "seconds"][index];

            return (
              <div key={label} className="flex items-center">
                {isBuilder ? (
                  <span
                    ref={refs[index]}
                    className="px-2 font-mono tracking-wider outline-none min-w-[2ch] text-center rounded"
                    contentEditable
                    suppressContentEditableWarning
                    onInput={(e) => handleInput(e, maxLength)}
                    onKeyDown={handleKeyDown}
                    onBlur={normalizeTime}
                  >
                    {String(timeData[key] || 0).padStart(index === 0 ? 2 : 2, "0")}
                  </span>
                ) : (
                  <span className="px-2 font-mono tracking-wider min-w-[2ch] text-center">
                    {String(timeData[key] || 0).padStart(index === 0 ? 2 : 2, "0")}
                  </span>
                )}
                <span className="text-gray-600 mx-1 text-sm font-normal">
                  {label.slice(0, index >= 2 ? 3 : label.length)}
                </span>
                {index < 3 && <span className="mx-2 text-gray-400">:</span>}
              </div>
            );
          })}
        </div>
      </div>

      {/* Helper Text (if any) */}
      {field?.helperText && (
        <p className="mt-2 text-sm text-gray-500">{field.helperText}</p>
      )}
    </div>
  );
};

export default Timer;