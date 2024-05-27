const Slider = ({ min, max, value, onChange }) => {
    const handleSliderChange = (event) => {
      const newValue = parseInt(event.target.value);
      onChange(newValue);
    };
  
    return (
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <input
          type="range"
          min={min}
          max={max}
          value={value}
          onChange={handleSliderChange}
          style={{ width: '100%' }}
        />
        <span style={{ marginLeft: '10px' }}>{value}</span>
      </div>
    );
  };

  export default Slider;