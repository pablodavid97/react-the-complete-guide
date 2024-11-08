const CheckoutForm = ({ cartTotal }) => {
    return (
        <form>
            <h2>Checkout</h2>
            <p>
                Total Amount: <strong>${cartTotal.toFixed(2)}</strong>
            </p>
            <p>Checkout form...</p>
        </form>
    );
};

export default CheckoutForm;
