import { DashboardLayout } from "../layout/DashboardLayout";
import { HiMiniCalendarDateRange } from "react-icons/hi2";
import { StatCard } from "../components/statCard";
import { useQuery } from "@tanstack/react-query";
import { getStatCard } from "../service";
import { FiShoppingCart } from "react-icons/fi";
import { FaMoneyCheckAlt } from "react-icons/fa";
import { formatCurrency } from "../../../utils/currencyDecimal";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";
import { DateRange, type RangeKeyDict, type Range } from "react-date-range";
import { useState, useEffect, useRef, useMemo } from "react";
import type { statCardType } from "../type";

export const Dashboard = () => {
  const [showPicker, setShowPicker] = useState(false);

  const [range, setRange] = useState<Range[]>([
    {
      startDate: new Date(new Date().setMonth(new Date().getMonth() - 1)),
      endDate: new Date(),
      key: "selection",
    },
  ]);

  const pickerRef = useRef<HTMLDivElement>(null);

  const { data, isLoading, refetch } = useQuery<statCardType>({
    queryKey: [
      "StatCard",
      range[0]?.startDate?.toISOString(),
      range[0]?.endDate?.toISOString(),
    ],
    queryFn: () => getStatCard(range[0]?.startDate, range[0]?.endDate),
  });

  useEffect(() => {
    if (data?.from && data?.to) {
      setRange([
        {
          startDate: new Date(data.from),
          endDate: new Date(data.to),
          key: "selection",
        },
      ]);
    }
  }, [data]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        pickerRef.current &&
        !pickerRef.current.contains(event.target as Node)
      ) {
        setShowPicker(false);
      }
    };
    if (showPicker) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [showPicker]);

  useEffect(() => {
    refetch();
  }, [range, refetch]);

  const dashboardStats = useMemo(
    () => [
      {
        id: 1,
        title: "Total Orders",
        subtitle: "Orders made this period",
        value: data?.totalOrders?.toLocaleString() || "0",
        icon: <FiShoppingCart className="text-[22px]" />,
      },
      {
        id: 2,
        title: "Total Revenue",
        subtitle: "Total earnings this period",
        value: formatCurrency(Number(data?.totalRevenue ?? 0)),
        icon: <FaMoneyCheckAlt className="text-[22px]" />,
      },
      {
        id: 3,
        title: "Amount To Be Paid",
        subtitle: "Amount to be paid this period",
        value: formatCurrency(Number(data?.amountToPay ?? 0)),
        icon: <FaMoneyCheckAlt className="text-[22px]" />,
      },
    ],
    [data],
  );

  return (
    <DashboardLayout>
      <div className="flex items-center justify-between relative">
        <div>
          <h1 className="text-[25px] text-secondary font-medium">Dashboard</h1>
          <p className="text-gray-400 -mt-1">Overview of Sales and Orders</p>
        </div>

        <div
          onClick={() => setShowPicker(!showPicker)}
          className="py-2 px-4 border border-primary rounded-lg flex items-center gap-x-2 font-medium cursor-pointer select-none"
        >
          <HiMiniCalendarDateRange className="text-secondary text-[28px]" />
          <p>
            {range[0].startDate!.toLocaleDateString()} -{" "}
            {range[0].endDate!.toLocaleDateString()}
          </p>
        </div>

        {showPicker && (
          <div
            ref={pickerRef}
            className="absolute right-0 top-16 z-50 shadow-lg bg-white rounded-lg"
          >
            <DateRange
              editableDateInputs
              ranges={range}
              onChange={(item: RangeKeyDict) => {
                const selection = item.selection;
                setRange([
                  {
                    startDate: selection.startDate,
                    endDate: selection.endDate,
                    key: "selection",
                  },
                ]);
              }}
              maxDate={new Date()}
              moveRangeOnFirstSelection={false}
              months={1}
              direction="horizontal"
              showDateDisplay
            />
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-4 my-6">
        {dashboardStats.map((stat) => (
          <StatCard
            key={stat.id}
            title={isLoading ? "Loading..." : stat.title}
            subtitle={isLoading ? "" : stat.subtitle}
            value={isLoading ? "..." : stat.value}
            icon={isLoading ? null : stat.icon}
            bgColor={stat.id === 1 ? "bg-primary" : "bg-white"}
            iconColor={stat.id === 1 ? "text-primary" : "text-secondary"}
            textColor={stat.id === 1 ? "text-white" : "text-secondary"}
            subTextColor={stat.id === 1 ? "text-white" : "text-secondary"}
          />
        ))}
      </div>
    </DashboardLayout>
  );
};
