export default function Label({ children, className }) {
    return (
        <label
            className={
                className ? className : "text-lg font-semibold text-gray-700 block "
            }
        >
            {children}
        </label>
    );
}