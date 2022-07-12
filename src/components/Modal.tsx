import cn from 'classnames';
import React from 'react';
import Button from 'components/Button';

type Action = {
    type: 'primary' | 'secondary';
    text: string;
    onClick: React.MouseEventHandler<HTMLButtonElement>;
};

type Props = {
    isOpen?: boolean;
    text: string;
    actions: Action[];
};

const Modal = (props: Props) => {
    return (
        <div
            className={cn(
                'h-fit absolute inset-1/2 -translate-x-1/2 -translate-y-1/2 w-80 bg-zinc-700 shadow-md rounded border-t-2 border-zinc-500 transition-opacity duration-500',
                { 'opacity-100': props.isOpen },
                { 'invisible opacity-0': !props.isOpen }
            )}
        >
            <div className="bg-zinc-700 p-2 border-b-2 border-zinc-800">
                <div className="p-2">{props.text}</div>
                <div className="flex justify-end items-end">
                    {props.actions.map((action) => (
                        <Button
                            key={action.text}
                            children={action.text}
                            variant={action.type}
                            onClick={action.onClick}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Modal;
