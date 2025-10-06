"use client";
import { HeroUIProvider } from "@heroui/system";
import { ReactNode } from "react";

interface IProps {
  children: ReactNode;
}

export const Providers = ({ children }: IProps) => {
  return <HeroUIProvider>{children}</HeroUIProvider>;
};
