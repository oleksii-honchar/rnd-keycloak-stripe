import type { Placement } from "@floating-ui/react";
import {
  FloatingArrow,
  FloatingPortal,
  arrow,
  autoPlacement,
  autoUpdate,
  offset,
  safePolygon,
  shift,
  useClick,
  useDismiss,
  useFloating,
  useFocus,
  useHover,
  useInteractions,
  useMergeRefs,
  useRole,
  useTransitionStyles,
} from "@floating-ui/react";
import pino from "pino";
import * as React from "react";
import { useRef } from "react";

const logger = pino({ name: "Tooltip" });

interface TooltipOptions {
  initialOpen?: boolean;
  placement?: Placement;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  enableHandleClose?: boolean;
  debug?: boolean;
  useArrow?: boolean;
  allowedPlacements?: Placement[];
}

export function useTooltip({
  initialOpen = false,
  placement = "top",
  allowedPlacements = ["bottom"],
  open: controlledOpen,
  onOpenChange: setControlledOpen,
  enableHandleClose = false,
  debug = false,
  useArrow = true,
}: TooltipOptions = {}) {
  const [uncontrolledOpen, setUncontrolledOpen] = React.useState(initialOpen);

  const open = controlledOpen ?? uncontrolledOpen;
  const setOpen = setControlledOpen ?? setUncontrolledOpen;

  debug && logger.log(`open=${open}`);

  const ARROW_HEIGHT = 7;
  const GAP = 2;
  const arrowRef = useRef(null);

  // https://floating-ui.com/docs/react
  const data = useFloating({
    placement,
    open,
    onOpenChange: setOpen,
    whileElementsMounted: autoUpdate,
    middleware: [
      useArrow &&
        arrow({
          element: arrowRef.current,
        }),
      offset(ARROW_HEIGHT + GAP),
      autoPlacement({
        crossAxis: true,
        allowedPlacements: allowedPlacements,
        // allowedPlacements: ['bottom', 'bottom-start', 'bottom-end'],
      }),
      shift({ padding: 5 }),
    ],
  });

  const context = data.context;

  const click = useClick(context);
  const hover = useHover(context, {
    move: false,
    // enabled: controlledOpen == null,
    enabled: false,
    handleClose:
      (enableHandleClose &&
        safePolygon({
          requireIntent: false,
        })) ||
      null,
  });
  const focus = useFocus(context, {
    enabled: controlledOpen == null,
  });
  const dismiss = useDismiss(context);
  const role = useRole(context, { role: "tooltip" });

  const interactions = useInteractions([hover, focus, dismiss, role, click]);

  const { isMounted, styles } = useTransitionStyles(context, {
    initial: {
      opacity: 0,
    },
    open: {
      opacity: 1,
    },
    close: {
      opacity: 0,
    },
    duration: {
      open: 300,
      close: 150,
    },
  });

  return React.useMemo(
    () => ({
      open,
      useArrow,
      setOpen,
      arrowRef,
      ...interactions,
      ...data,
      transition: {
        isMounted,
        style: styles,
      },
    }),
    [open, setOpen, interactions, data, arrowRef, styles, isMounted, useArrow],
  );
}

type ContextType = ReturnType<typeof useTooltip> | null;

const TooltipContext = React.createContext<ContextType>(null);

export const useTooltipContext = () => {
  const context = React.useContext(TooltipContext);

  if (context == null) {
    throw new Error("Tooltip components must be wrapped in <Tooltip />");
  }

  return context;
};

export function Tooltip({
  children,
  ...options
}: { children: React.ReactNode } & TooltipOptions) {
  // This can accept any props as options, e.g. `placement`,
  // or other positioning options.
  const tooltip = useTooltip(options);
  return (
    <TooltipContext.Provider value={tooltip}>
      {children}
    </TooltipContext.Provider>
  );
}

export const TooltipTrigger = React.forwardRef<
  HTMLElement,
  React.HTMLProps<HTMLElement> & { asChild?: boolean }
>(function TooltipTrigger({ children, asChild = false, ...props }, propRef) {
  const context = useTooltipContext();
  const childrenRef = (children as any).ref;
  const ref = useMergeRefs([context.refs.setReference, propRef, childrenRef]);

  // `asChild` allows the user to pass any element as the anchor
  if (asChild && React.isValidElement(children)) {
    return React.cloneElement(
      children,
      context.getReferenceProps({
        ref,
        ...props,
        ...children.props,
        "data-state": context.open ? "open" : "closed",
      }),
    );
  }

  return (
    <button
      ref={ref}
      // The user can style the trigger based on the state
      data-state={context.open ? "open" : "closed"}
      {...context.getReferenceProps(props)}
    >
      {children}
    </button>
  );
});

export const TooltipContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLProps<HTMLDivElement>
>(function TooltipContent({ style, children, ...props }, propRef) {
  const context = useTooltipContext();
  const ref = useMergeRefs([context.refs.setFloating, propRef]);

  if (!context.transition.isMounted) return null;

  //logger.log(JSON.stringify(context.transition));

  return (
    <FloatingPortal>
      {context.transition.isMounted && (
        <div
          data-id="tooltip"
          ref={ref}
          style={{
            ...style,
            ...context.floatingStyles,
            ...context.transition.style,
          }}
          {...context.getFloatingProps(props)}
        >
          {context.useArrow && (
            <FloatingArrow
              ref={context.arrowRef}
              context={context}
              tipRadius={2}
              className="Tooltip-arrow"
            />
          )}

          {children}
        </div>
      )}
    </FloatingPortal>
  );
});
