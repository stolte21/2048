type Props = {
    label: string;
    text: string | number;
};

const Stat = (props: Props) => (
    <div className="w-full text-white bg-zinc-500 text-center rounded p-4">
        <dl>
            <dt className="text-neutral-300">{props.label}</dt>
            <dd className="font-bold">{props.text}</dd>
        </dl>
    </div>
);

export default Stat;
