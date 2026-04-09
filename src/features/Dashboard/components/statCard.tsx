type StatCardProps = {
  title: string;
  subtitle?: string;
  value: string | number;
  icon?: React.ReactNode;
  bgColor?: string;
  iconColor?: string;
  textColor?: string;
  subTextColor?: string;
};

export const StatCard = ({
  title,
  subtitle,
  value,
  icon,
  bgColor = "bg-white",
  iconColor = "text-primary",
  textColor = "text-gray-800",
  subTextColor = "text-gray-800",
}: StatCardProps) => {
  return (
    <div className={`p-5 rounded-xl shadow-md ${bgColor}`}>
      <div className="flex items-center gap-x-4">
        {icon && (
          <div
            className={`p-3 rounded-xl bg-gray-100 flex items-center justify-center ${iconColor}`}
          >
            {icon}
          </div>
        )}
        <div>
          <p className={`text-[20px] font-medium ${textColor}`}>{title}</p>
          {subtitle && (
            <p className={`text-[17px] ${subTextColor}`}>{subtitle}</p>
          )}
        </div>
      </div>

      <h2
        className={`text-[30px] text-secondary font-semibold mt-4 ${textColor}`}
      >
        {value}
      </h2>
    </div>
  );
};
