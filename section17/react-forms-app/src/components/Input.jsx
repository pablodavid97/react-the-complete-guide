const Input = ({ id, label, error, errorMsg, ...props }) => {
    return (
        <div className='control no-margin'>
            <label htmlFor={id}>{label}</label>
            <input id={id} {...props} />
            <div className='control-error'>{error && <p>{errorMsg}</p>}</div>
        </div>
    );
};

export default Input;
