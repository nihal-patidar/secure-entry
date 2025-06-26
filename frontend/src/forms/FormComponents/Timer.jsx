import { useRef } from "react";

export default function StartTimer({ time }) {
  const refs = [useRef(), useRef(), useRef(), useRef()];

  const getValues = () => {
    return refs.map((ref, i) => {
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

    refs[0].current.innerText = String(d).padStart(2, "0");
    refs[1].current.innerText = String(h).padStart(2, "0");
    refs[2].current.innerText = String(m).padStart(2, "0");
    refs[3].current.innerText = String(s).padStart(2, "0");
  };

  const handleInput = (e, maxLength) => {
    const text = e.currentTarget.innerText;
    const cleaned = text.replace(/\D/g, "");
    if (text !== cleaned || cleaned.length > maxLength) {
      e.currentTarget.innerText = cleaned.slice(0, maxLength);
    }
  };

  const handleKeyDown = (e) => {
    const allowedKeys = [
      "Backspace",
      "ArrowLeft",
      "ArrowRight",
      "Delete",
      "Tab",
    ];
    if (!/[0-9]/.test(e.key) && !allowedKeys.includes(e.key)) {
      e.preventDefault();
    }
  };

  return (
    <div className="flex justify-center mt-8 max-w-[60vw]">
      <div className="border border-gray-300 rounded-lg text-gray-900 text-2xl font-medium px-4 py-2 flex justify-center items-center">
        {["Days", "Hours", "Min", "Sec"].map((label, index) => {
          const maxLength = index === 0 ? 3 : 2;
          return (
            <div key={label} className="flex items-center">
              <span
                ref={refs[index]}
                className="px-2 font-mono tracking-wider outline-none min-w-[2ch] text-center"
                contentEditable
                suppressContentEditableWarning
                onInput={(e) => handleInput(e, maxLength)}
                onKeyDown={handleKeyDown}
                onBlur={normalizeTime}
              >
                {String(time[label.toLowerCase()] || 0).padStart(
                  index === 0 ? 2 : 2,
                  "0"
                )}
              </span>
              <span className="text-black mx-1">{label}</span>
              {index < 3 && <span className="mx-1 text-gray-500">:</span>}
            </div>
          );
        })}
      </div>
    </div>
  );
}
