import OpeningHoursImage from "../assets/images/WH.jpg";

export const OpeningHours = () => {
  return (
    <>
      <div>
        <div className=" px-8 md:px-16 flex flex-col gap-y-5 md:flex-row md:gap-x-10 items-center justify-center mb-10">
          <div className="w-full h-55 md:w-120 md:h-60 rounded-xl">
            <img
              className="w-full h-full rounded-xl object-cover"
              src={OpeningHoursImage}
              alt="Opening hours"
            />
          </div>
          <div className="w-full h-55 md:w-120 md:h-60 rounded-xl bg-primary p-6 flex items-center">
            <div>
              <h2 className="text-[30px] md:text-[40px] font-bold text-secondary">
                Work Hours
              </h2>
              <div className="h-1.5 w-15 bg-white"></div>
              <ul className="mt-2">
                <li className="text-[20px]">
                  <span className="font-medium">Days:</span> Monday to Saturday
                </li>
                <li className="text-[20px] text-secondary">
                  <span className="font-medium">Time:</span> 8:00am to 4:00pm
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
