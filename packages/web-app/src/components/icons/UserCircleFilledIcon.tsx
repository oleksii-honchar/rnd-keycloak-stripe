import React from "react";

interface UserCircleFilledIconProps {
  className?: string;
}

export const UserCircleFilledIcon = ({
  className = "",
}: UserCircleFilledIconProps) => (
  <svg
    fill="none"
    viewBox="0 0 24 24"
    className={`icon ${className}`}
    strokeWidth="1.5"
    width="44"
    height="44"
    stroke="currentColor"
    xmlns="http://www.w3.org/2000/svg"
  >
    <defs></defs>
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M 15 9.75 C 15 12.059 12.5 13.503 10.5 12.348 C 9.572 11.812 9 10.822 9 9.75 C 9 7.441 11.5 5.997 13.5 7.152 C 14.428 7.688 15 8.678 15 9.75 Z"
      style="fill: rgb(77, 77, 77);"
    ></path>
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M 17.981 18.725 C 16.335 20.193 14.206 21.003 12 21 C 9.794 21.003 7.664 20.193 6.018 18.725 M 17.982 18.725 C 16.56542041528107 16.849451431880215 14.350399029767141 15.74786643764869 12 15.75 C 9.649600970232859 15.74786643764869 7.434579584718925 16.849451431880215 6.018 18.725"
      style="fill: rgb(77, 77, 77);"
    ></path>
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M 17.980999999999998 18.725 C 23.157680347261373 14.120439154243062 21.4085222307239 5.638667766939168 14.832515391396544 3.457811501817636 C 8.256508552069189 1.2769552366961037 1.785658117992469 7.032656293892275 3.1849846100584482 13.818073404770745 C 3.576399679302696 15.716068278279058 4.569995757911292 17.43702716985628 6.017999999999999 18.725"
    ></path>
  </svg>
);
