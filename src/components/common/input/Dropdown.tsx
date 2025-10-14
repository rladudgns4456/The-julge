"use client";

import { useState, useRef, useEffect } from "react";

import { Option, CustomDropdownProps } from "@/types/ui";

type CustomDropdownWithButtonClassNameProps = CustomDropdownProps & {
  className?: string;
  buttonClassName?: string;
};

export default function CustomDropdown({
  label,
  name,
  value,
  options,
  required,
  error,
  onChange,
  className = "",
  buttonClassName = "h-[58px]",
}: CustomDropdownWithButtonClassNameProps) {
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const selectedLabel = options.find(opt => opt.value === value)?.label || "선택";

  return (
    <div className={`flex flex-col gap-1 w-full relative ${className}`} ref={dropdownRef}>
      {label && (
        <label htmlFor={name} className="text-body-2-regular text-gray-50">
          {label}
          {required && <span className="text-red-40 ml-0.5">*</span>}
        </label>
      )}

      <button
        type="button"
        className={`w-full flex justify-between items-center rounded-lg px-3 py-2 text-body-1-regular bg-white border focus:outline-none
          ${
            error
              ? "border-red-40 focus:ring-2 focus:ring-red-30 bg-red-10"
              : "border-gray-30 focus:ring-2 focus:ring-blue-20"
          }
          ${buttonClassName}
        `}
        onClick={() => setOpen(!open)}
      >
        <span className={value ? "text-black" : "text-gray-40"}>{selectedLabel}</span>
        <svg
          className={`w-4 h-4 ml-2 transition-transform ${open ? "rotate-180" : "rotate-0"}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {open && (
        <ul className="absolute top-full left-0 right-0 z-50 mt-1 max-h-48 overflow-y-auto rounded-lg border border-gray-30 bg-white shadow-md animate-fadeIn">
          {options.map((opt, index) => (
            <li
              key={`${opt.value}-${index}`}
              onClick={() => {
                onChange(opt.value);
                setOpen(false);
              }}
              className={`px-3 py-2 cursor-pointer hover:bg-blue-10 ${
                value === opt.value ? "bg-blue-10 font-bold" : ""
              }`}
            >
              {opt.label}
            </li>
          ))}
        </ul>
      )}

      {error && <p className="text-caption text-red-40">{error}</p>}
    </div>
  );
}
