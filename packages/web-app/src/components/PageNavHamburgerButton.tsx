import { DisclosureButton } from "@headlessui/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import PropTypes from "prop-types";

export function PageNavHamburgerButton({ open = false }) {
  return (
    <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
      <DisclosureButton
        className={`
        inline-flex items-center justify-center rounded-md p-2 
        text-md-sys-light-on-surface/80 
        hover:text-md-sys-light-on-primary/90
        hover:bg-md-ref-pal-primary600/40
        focus:outline-none focus:ring-2 focus:ring-inset focus:ring-md-sys-light-outline
      `}
      >
        <span className="sr-only">Open main menu</span>
        {open ? (
          <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
        ) : (
          <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
        )}
      </DisclosureButton>
    </div>
  );
}

PageNavHamburgerButton.propTypes = {
  open: PropTypes.bool.isRequired,
};
