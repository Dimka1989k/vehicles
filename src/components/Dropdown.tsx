interface DropdownProps {
  options: { id: string | number; name: string }[];
  value: string | number;
  onChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
  label: string;
}

const Dropdown: React.FC<DropdownProps> = ({ options, value, onChange, label }) => (
  <div className="flex flex-col w-full">
    <label className="mb-2 text-lg font-semibold text-gray-700">{label}</label>
    <select
      className="p-3 border rounded-lg shadow-sm bg-gray-50 hover:bg-white focus:ring-2 focus:ring-blue-400 focus:outline-none"
      value={value}
      onChange={onChange}
    >
      <option value="" disabled>
        Select
      </option>
      {options.map((opt) => (
        <option key={opt.id} value={opt.id}>
          {opt.name}
        </option>
      ))}
    </select>
  </div>
);

export default Dropdown;