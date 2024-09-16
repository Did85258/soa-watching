export default function InputLogin({
  name,
  value,
  onChange,
  type,
  placeholder,
}) {
  return (
    <>
      <input
        type={type}
        name={name}
        id={name}
        className=" border  sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500"
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        required
      />
    </>
  );
}
