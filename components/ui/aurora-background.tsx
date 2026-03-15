import { cn } from "@/lib/utils";
import React, { ReactNode } from "react";

interface AuroraBackgroundProps extends React.HTMLProps<HTMLDivElement> {
  children: ReactNode;
  showRadialGradient?: boolean;
  as?: "main" | "div";
  fullScreen?: boolean;
}

export const AuroraBackground = ({
  className,
  children,
  showRadialGradient = true,
  as = "main",
  fullScreen = true,
  ...props
}: AuroraBackgroundProps) => {
  const Wrapper = as;

  return (
    <Wrapper className="h-full w-full">
      <div
        className={cn(
          fullScreen
            ? "relative flex h-full min-h-screen w-full flex-col items-center justify-start bg-sky-50 text-slate-950 transition-colors dark:bg-[#0a1020] dark:text-slate-100"
            : "relative flex h-full min-h-0 w-full flex-col items-center justify-start bg-sky-50 text-slate-950 transition-colors dark:bg-[#0a1020] dark:text-slate-100",
          className
        )}
        {...props}
      >
        <div className="absolute inset-0 overflow-hidden">
          <div
            className={cn(
              `[--white-gradient:repeating-linear-gradient(100deg,var(--white)_0%,var(--white)_7%,var(--transparent)_10%,var(--transparent)_12%,var(--white)_16%)]
               [--dark-gradient:repeating-linear-gradient(100deg,var(--black)_0%,var(--black)_7%,var(--transparent)_10%,var(--transparent)_12%,var(--black)_16%)]
               [--aurora:repeating-linear-gradient(100deg,var(--sky-400)_10%,var(--blue-300)_18%,var(--cyan-300)_25%,var(--blue-400)_33%,var(--sky-500)_42%)]
               [background-image:var(--white-gradient),var(--aurora)] dark:[background-image:var(--dark-gradient),var(--aurora)]
               [background-size:300%,_200%] [background-position:50%_50%,50%_50%]
               filter blur-[10px] invert dark:invert-0
               after:content-[""] after:absolute after:inset-0 after:[background-image:var(--white-gradient),var(--aurora)]
               after:dark:[background-image:var(--dark-gradient),var(--aurora)]
               after:[background-size:200%,_100%] after:animate-aurora after:[background-attachment:fixed]
               after:mix-blend-difference pointer-events-none absolute -inset-[10px] opacity-40 will-change-transform`,
              showRadialGradient &&
                `[mask-image:radial-gradient(ellipse_at_100%_0%,black_10%,var(--transparent)_70%)]`
            )}
          ></div>
        </div>
        {children}
      </div>
    </Wrapper>
  );
};
