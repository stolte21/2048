type TileColors = Record<
    number | 'placeholder',
    {
        text: string;
        bg: string;
    }
>;

const Colors: TileColors = {
    2: {
        text: 'text-black',
        bg: 'bg-stone-200'
    },
    4: {
        text: 'text-gray-900',
        bg: 'bg-stone-400'
    },
    8: {
        text: 'text-white',
        bg: 'bg-orange-400'
    },
    16: {
        text: 'text-white',
        bg: 'bg-orange-500'
    },
    32: {
        text: 'text-white',
        bg: 'bg-orange-700'
    },
    64: {
        text: 'text-white',
        bg: 'bg-orange-900'
    },
    128: {
        text: 'text-white',
        bg: 'bg-amber-400'
    },
    256: {
        text: 'text-white',
        bg: 'bg-amber-600'
    },
    512: {
        text: 'text-white',
        bg: 'bg-yellow-800'
    },
    1024: {
        text: 'text-white',
        bg: 'bg-yellow-600'
    },
    2048: {
        text: 'text-white',
        bg: 'bg-yellow-400'
    },
    placeholder: {
        text: 'text-black',
        bg: 'bg-zinc-600'
    }
};

const Tile = {
    Colors
};

export default Tile;
