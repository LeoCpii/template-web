import Stack from '@/components/Stack';
import createComponent from '@/core/createComponent';

interface ModalFooterProps { children: React.ReactNode; }
function ModalFooter({ children }: ModalFooterProps) {
    return (
        <Stack orientation="row" justify="flex-end" align="center">
            {children}
        </Stack>
    );
}

export default createComponent(ModalFooter);