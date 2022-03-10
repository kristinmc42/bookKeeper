import "./Select.scss";

function Select({ name, id, onChange }){
  return (
    <select name={name} id={id} onChange={onChange}>
      <option value="">- Select one -</option>
      <option value="read">Read</option>
      <option value="currentlyReading">Currently Reading</option>
      <option value="toRead">To Read</option>
    </select>
  )
}

export default Select;