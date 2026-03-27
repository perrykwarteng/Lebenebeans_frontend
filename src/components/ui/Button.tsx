type btn = {
  Stlye?: string;
  text: string;
  type?: string;
  action?: () => void;
  isDisabled?: boolean;
};

export const Button = ({ Stlye, type, text, action, isDisabled }: btn) => {
  const defaultStlye =
    "bg-primary hover:bg-secondary hover:text-white px-5 py-2 text-center rounded-xl text-secondary";
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
