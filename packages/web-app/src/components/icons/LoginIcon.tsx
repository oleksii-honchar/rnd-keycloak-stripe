import React from "react";

interface LoginIconProps {
  className?: string;
}

export const LoginIcon = ({ className = "" }: LoginIconProps) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className={`icon ${className}`}
    width="44"
    height="44"
    viewBox="0 0 24 24"
    strokeWidth="1.5"
    stroke="currentColor"
    fill="none"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path stroke="none" d="M0 0h24v24H0z" fill="none" />
    <path d="M9 8v-2a2 2 0 0 1 2 -2h7a2 2 0 0 1 2 2v12a2 2 0 0 1 -2 2h-7a2 2 0 0 1 -2 -2v-2" />
    <path d="M3 12h13l-3 -3" />
    <path d="M13 15l3 -3" />
  </svg>
);
