const Snackbar = ({ type = 'success', message }) => {
    return <p className={`snackbar ${type}`}>{message}</p>;
};

export default Snackbar;
