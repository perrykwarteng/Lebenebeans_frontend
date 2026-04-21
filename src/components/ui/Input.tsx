import React, { useState } from "react";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";

interface InputType {
  label?: string;
  name: string;
  type?: string;
  placeholder?: string;
  value?: string | number;
  checked?: boolean;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  className?: string;
  maxLength?: number;
}

export const InputField = ({
  label,
  name,
  type = "text",
  placeholder,
  value,
  onChange,
  checked,
  className = "",
  maxLength = 10,
}: InputType) => {
  const [showPassword, setShowPassword] = useState(false);
  const togglePassword = () => setShowPassword(!showPassword);

  if (type === "radio") {
    return (
      <label
        className={`flex items-center gap-2 cursor-pointer text-secondary ${className}`}
      >
        <input
          type="radio"
          name={name}
          value={value}
          checked={checked}
          onChange={onChange}
        />
        {label}
      </label>
    );
  }

  return (
    <div className="flex flex-col gap-1 relative">
      {label && (
        <label htmlFor={name} className="md:text-[16px] text-secondary">
          {label}
        </label>
      )}

      <input
        type={type === "password" ? (showPassword ? "text" : "password") : type}
        name={name}
        id={name}
        value={value}
        placeholder={placeholder}
        max={maxLength}
        onChange={onChange}
        className={`bg-white w-full rounded-[10px] p-3 border border-primary ${className} pr-10`}
      />

      {type === "password" && (
        <button
          type="button"
          onClick={togglePassword}
          className="absolute right-3 top-13 translate-y-[-50%] text-gray-500"
        >
          {showPassword ? (
            <AiOutlineEyeInvisible size={20} />
          ) : (
            <AiOutlineEye size={20} />
          )}
        </button>
      )}
    </div>
  );
};
