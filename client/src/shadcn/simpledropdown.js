import React, { useState, useRef, useEffect } from 'react';
import { cn } from '../utils/cn';

export function SimpleDropdown({ trigger, children, align = "start", disabled = false }) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    if (disabled) {
      setIsOpen(false);
      return;
    }},[disabled])

  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  

  return (
    <div className="relative" ref={dropdownRef}>
      <div onClick={() => !disabled && setIsOpen(!isOpen)}>
        {trigger}
      </div>
      
      {isOpen && (
        <div
          className={cn(
            "absolute bottom-full mb-2 min-w-[10rem] rounded-md border bg-white shadow-lg z-50",
            align === "start" && "left-0",
            align === "end" && "right-0",
            align === "center" && "left-1/2 -translate-x-1/2"
          )}
        >
          <div className="p-1">
            {React.Children.map(children, child => (
              <div
                className="px-2 py-1 text-xs rounded-sm cursor-pointer hover:bg-gray-100 transition-colors"
                onClick={() => setIsOpen(false)}
              >
                {child}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export function SimpleDropdownItem({ children, onClick }) {
  return (
    <div onClick={onClick}>
      {children}
    </div>
  );
}

export function SimpleDropdownSeparator() {
  return (
    <div className="my-1 h-px bg-gray-200" />
  );
}