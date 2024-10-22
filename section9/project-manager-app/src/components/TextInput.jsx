import './InputGroup.css';

const TextInput = ({ label, value, onChange }) => {
    return (
        <div className='input-group'>
            <label>{label}</label>
            <input type='text' value={value} onChange={onChange} required />
        </div>
    );
};

export default TextInput;
