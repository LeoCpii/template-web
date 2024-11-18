import { useState } from 'react';

type UseDrawer = [boolean, () => void]

export default function useDrawer(): UseDrawer {
    const [open, setOpen] = useState(false);

    const toogleDrawer = () => { setOpen(prev => !prev); };

    return [open, toogleDrawer];
}