export default function Tabs({ children, buttons, ButtonsWrapper = 'menu' }) {
    return (
        <>
            <ButtonsWrapper>{buttons}</ButtonsWrapper>
            {children}
        </>
    );
}
