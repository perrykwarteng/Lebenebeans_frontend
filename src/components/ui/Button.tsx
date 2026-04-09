type btn = {
  Stlye?: string;
  text: string;
  type?: string;
  action?: () => void;
  isDisabled?: boolean;
};

export const Button = ({ Stlye, type, text, action, isDisabled }: btn) => {
  const defaultStlye = `${isDisabled ? "bg-secondary text-white" : "bg-primary hover:bg-secondary text-secondary hover:text-white"} px-5 py-2 text-[19px] text-center rounded-xl`;
  return (
    <button
      className={`${Stlye || defaultStlye} cursor-pointer transition all duration-150`}
      disabled={isDisabled}
      typeof={`${type}`}
      onClick={action}
    >
      {text}
    </button>
  );
};
