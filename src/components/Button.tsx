import cn from 'classnames';
import React from 'react';

const Button = (
    props: React.DetailedHTMLProps<
        React.ButtonHTMLAttributes<HTMLButtonElement>,
        HTMLButtonElement
    >
) => (
    <button
        className={cn(
            'text-white bg-zinc-600 font-medium rounded-lg text-sm px-5 py-2.5',
            'focus:outline-none',
            'enabled:hover:bg-zinc-700',
            'disabled:opacity-40 disabled:cursor-not-allowed'
        )}
        {...props}
    />
);

export default Button;
