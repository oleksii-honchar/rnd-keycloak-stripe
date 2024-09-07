import { useRouteError } from "react-router-dom";

export function ErrorBoundary() {
  const error = useRouteError();
  console.error(error);

  return (
    <div
      className={`
      min-h-screen 
      flex flex-col items-center justify-center
      bg-white
    `}
    >
      <div
        className={`
          max-w-md rounded-3xl shadow-xl
          p-10 border-2 border-md3-sys-light-error
          text-md3-sys-light-on-error-container
          bg-gradient-to-br
          from-md3-sys-light-error-container/10
          to-md3-sys-light-error-container
            
        `}
      >
        <h1 className="text-3xl font-bold leading-7 pb-4">Oops!</h1>
        <p>Sorry, an unexpected error has occurred.</p>
        <h2 className="text-1xl font-bold leading-7 pt-4">
          <i>
            {error.status} : {error.statusText || error.message}
          </i>
        </h2>
      </div>
    </div>
  );
}
