"use client";
import * as React from "react";
import * as DialogPrimitive from "@radix-ui/react-dialog";

export const Dialog = DialogPrimitive.Root;
export const DialogTrigger = DialogPrimitive.Trigger;
export const DialogPortal = DialogPrimitive.Portal;
export const DialogOverlay = DialogPrimitive.Overlay;
export const DialogContent = DialogPrimitive.Content;
export const DialogClose = DialogPrimitive.Close;

// Header e Footer personalizados
export const DialogHeader: React.FC<React.PropsWithChildren<{ className?: string }>> = ({ children, className }) => (
  <div className={`px-4 py-2 border-b ${className}`}>{children}</div>
);

export const DialogFooter: React.FC<React.PropsWithChildren<{ className?: string }>> = ({ children, className }) => (
  <div className={`px-4 py-2 border-t flex justify-end ${className}`}>{children}</div>
);

export const DialogTitle: React.FC<React.PropsWithChildren<{ className?: string }>> = ({ children, className }) => (
  <h2 className={`text-lg font-semibold ${className}`}>{children}</h2>
);
