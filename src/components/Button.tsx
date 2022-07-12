import cn from 'classnames';
import React from 'react';

type ButtonProps = {
    variant?: 'primary' | 'secondary';
} & React.DetailedHTMLProps<
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
>;

const Button = ({ variant = 'primary', ...buttonProps }: ButtonProps) => (
    <button
        className={cn(
            'text-white font-medium rounded text-sm px-5 py-2.5 uppercase',
            'focus:outline-none',
            'disabled:opacity-40 disabled:cursor-not-allowed',
            {
                'bg-yellow-500 enabled:hover:bg-yellow-600':
                    variant === 'primary',
                'bg-zinc-600 enabled:hover:bg-zinc-700': variant === 'secondary'
            }
        )}
        {...buttonProps}
    />
);

export default Button;
