import type { SVGProps } from "react";


export function PencilIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="1em"
      height="1em"
      viewBox="0 0 24 24"
      {...props}
    >
      <path
        fill="currentColor"
        fillRule="evenodd"
        d="M3 18L15 6l3 3L6 21H3v-3ZM16 5l2-2l3 3l-2.001 2.001L16 5Z"
      ></path>
    </svg>
  );
}


export function EraserIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="1em"
      height="1em"
      viewBox="0 0 24 24"
      {...props}
    >
      <path
        fill="currentColor"
        fillRule="evenodd"
        d="M18 4v16a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2ZM8 4v4h8V4H8Z"
      ></path>
    </svg>
  );
}


export function GrabIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="1em"
      height="1em"
      viewBox="0 0 256 256"
      {...props}
    >
      <path
        fill="currentColor"
        d="M188 80a27.8 27.8 0 0 0-13.4 3.4a28 28 0 0 0-46.6-11A28 28 0 0 0 80 92v16H68a28.1 28.1 0 0 0-28 28v16a88 88 0 0 0 176 0v-44a28.1 28.1 0 0 0-28-28Zm12 72a72 72 0 0 1-144 0v-16a12 12 0 0 1 12-12h12v24a8 8 0 0 0 16 0V92a12 12 0 0 1 24 0v32a8 8 0 0 0 16 0V92a12 12 0 0 1 24 0v32a8 8 0 0 0 16 0v-16a12 12 0 0 1 24 0Z"
      ></path>
    </svg>
  );
}


export function TrashIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="1em"
      height="1em"
      viewBox="0 0 256 256"
      {...props}
    >
      <path
        fill="currentColor"
        d="M216 48h-40v-8a24.1 24.1 0 0 0-24-24h-48a24.1 24.1 0 0 0-24 24v8H40a8 8 0 0 0 0 16h8v144a16 16 0 0 0 16 16h128a16 16 0 0 0 16-16V64h8a8 8 0 0 0 0-16ZM96 40a8 8 0 0 1 8-8h48a8 8 0 0 1 8 8v8H96Zm96 168H64V64h128Zm-80-104v64a8 8 0 0 1-16 0v-64a8 8 0 0 1 16 0Zm48 0v64a8 8 0 0 1-16 0v-64a8 8 0 0 1 16 0Z"
      ></path>
    </svg>
  );
}


export function SpinnerIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="1em"
      height="1em"
      viewBox="0 0 24 24"
      {...props}
    >
      <path
        fill="currentColor"
        d="M12,1A11,11,0,1,0,23,12,11,11,0,0,0,12,1Zm0,19a8,8,0,1,1,8-8A8,8,0,0,1,12,20Z"
        opacity=".25"
      ></path>
      <path
        fill="currentColor"
        d="M10.14,1.16a11,11,0,0,0-9,8.92A1.59,1.59,0,0,0,2.46,12,1.52,1.52,0,0,0,4.11,10.7a8,8,0,0,1,6.66-6.61A1.42,1.42,0,0,0,12,2.69h0A1.57,1.57,0,0,0,10.14,1.16Z"
      >
        <animateTransform
          attributeName="transform"
          dur="0.75s"
          repeatCount="indefinite"
          type="rotate"
          values="0 12 12;360 12 12"
        ></animateTransform>
      </path>
    </svg>
  );
}


export function BookmarkIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="1em"
      height="1em"
      viewBox="0 0 256 256"
      {...props}
    >
      <path
        fill="currentColor"
        d="M184 32H72a16 16 0 0 0-16 16v176a8.1 8.1 0 0 0 4.1 7a7.8 7.8 0 0 0 3.9 1a7.6 7.6 0 0 0 4.2-1.2l59.8-37.4l59.8 37.4A8 8 0 0 0 200 224V48a16 16 0 0 0-16-16Zm0 177.6l-51.8-32.4a8 8 0 0 0-8.4 0L72 209.6V48h112Z"
      ></path>
    </svg>
  );
}


export function EnlargeIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="1em"
      height="1em"
      viewBox="0 0 256 256"
      {...props}
    >
      <path
        fill="currentColor"
        d="M216 48v48a8 8 0 0 1-16 0V67.3l-42.3 42.4a8.2 8.2 0 0 1-11.4 0a8.1 8.1 0 0 1 0-11.4L188.7 56H160a8 8 0 0 1 0-16h48a8 8 0 0 1 8 8ZM98.3 146.3L56 188.7V160a8 8 0 0 0-16 0v48a8 8 0 0 0 8 8h48a8 8 0 0 0 0-16H67.3l42.4-42.3a8.1 8.1 0 0 0-11.4-11.4Z"
      ></path>
    </svg>
  );
}