import './InputGroup.css';

const TextArea = ({ label, value, onChange }) => {
    return (
        <div className='input-group'>
            <label>{label}</label>
            <textarea value={value} onChange={onChange} />
        </div>
    );
};

export default TextArea;
