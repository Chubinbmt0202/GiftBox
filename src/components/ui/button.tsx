import * as React from "react"
import { cn } from "../../lib/utils"

export interface ButtonProps
    extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: "default" | "outline" | "ghost" | "link" | "secondary"
    size?: "default" | "sm" | "lg" | "icon"
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
    ({ className, variant = "default", size = "default", ...props }, ref) => {
        return (
            <button
                ref={ref}
                className={cn(
                    "inline-flex items-center justify-center whitespace-nowrap rounded-xl text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-primary-900 disabled:pointer-events-none disabled:opacity-50",
                    {
                        "bg-primary-900 text-white shadow hover:bg-primary-800": variant === "default",
                        "border border-primary-200 bg-transparent shadow-sm hover:bg-primary-50": variant === "outline",
                        "hover:bg-primary-50 text-primary-900": variant === "ghost",
                        "text-primary-900 underline-offset-4 hover:underline": variant === "link",
                        "bg-primary-100 text-primary-900 shadow-sm hover:bg-primary-200": variant === "secondary",
                        "h-10 px-4 py-2": size === "default",
                        "h-8 rounded-lg px-3 text-xs": size === "sm",
                        "h-12 rounded-2xl px-8 text-base": size === "lg",
                        "h-9 w-9": size === "icon",
                    },
                    className
                )}
                {...props}
            />
        )
    }
)
Button.displayName = "Button"

export { Button }
