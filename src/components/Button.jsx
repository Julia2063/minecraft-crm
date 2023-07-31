import cn from 'classnames';

export const Button = ({ callback, label, type, className }) => {
    return (
      <button
        type={type}
        onClick={callback}
        className={cn("bg-[#00B488] w-max h-[36px] rounded hover:bg-[#01a179] active:bg-[#00B488] px-[10px]", className)}
      >
        <span className={`text-white`}>{label}</span>
      </button>
    );
  };
  