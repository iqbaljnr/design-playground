import type { ButtonHTMLAttributes, ReactNode } from 'react';
import { Link, type LinkProps } from 'react-router-dom';

export type ButtonVariant =
  | 'primary'
  | 'secondary'
  | 'cobalt'
  | 'orange'
  | 'dark'
  | 'ghost';

export type ButtonSize = 'sm' | 'md' | 'lg';

const VARIANT_CLASSES: Record<ButtonVariant, string> = {
  primary:
    'bg-dark text-white border border-dark hover:bg-[#2A2928] hover:border-[#2A2928]',
  secondary:
    'bg-elevated text-ink border border-border-strong hover:border-dark hover:bg-surface',
  cobalt:
    'bg-brand-magenta text-white border border-brand-magenta hover:bg-brand-magenta-hover hover:border-brand-magenta-hover',
  orange:
    'bg-brand-orange text-ink border border-[#E07630] hover:bg-[#F37F33] hover:border-dark',
  dark:
    'bg-dark text-white border border-dark hover:bg-[#2A2928]',
  ghost:
    'bg-transparent text-muted border border-transparent hover:text-ink hover:bg-surface',
};

const SIZE_CLASSES: Record<ButtonSize, string> = {
  sm: 'min-h-[38px] px-4 py-1.5 text-xs',
  md: 'min-h-[44px] px-5 py-2.5 text-sm',
  lg: 'min-h-[48px] px-6 py-3 text-sm',
};

const BASE_CLASSES =
  'btn-press inline-flex items-center justify-center gap-2 rounded-lg font-display font-semibold tracking-[-0.01em] cursor-pointer select-none disabled:opacity-45 disabled:cursor-not-allowed';

interface SharedProps {
  variant?: ButtonVariant;
  size?: ButtonSize;
  className?: string;
  children: ReactNode;
}

type ActionButtonProps = SharedProps &
  ButtonHTMLAttributes<HTMLButtonElement> & {
    to?: never;
  };

type LinkButtonProps = SharedProps &
  Omit<LinkProps, 'className'> & {
    to: string;
  };

export type ButtonProps = ActionButtonProps | LinkButtonProps;

export function Button({
  variant = 'primary',
  size = 'md',
  className = '',
  children,
  ...rest
}: ButtonProps) {
  const classes = `${BASE_CLASSES} ${VARIANT_CLASSES[variant]} ${SIZE_CLASSES[size]} ${className}`;

  if ('to' in rest && rest.to !== undefined) {
    const { to, ...linkProps } = rest as LinkButtonProps;
    return (
      <Link to={to} className={classes} {...linkProps}>
        {children}
      </Link>
    );
  }

  const buttonProps = rest as ButtonHTMLAttributes<HTMLButtonElement>;
  return (
    <button
      type={buttonProps.type ?? 'button'}
      className={classes}
      {...buttonProps}
    >
      {children}
    </button>
  );
}
