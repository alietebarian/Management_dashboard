import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Calendar } from "react-multi-date-picker";
import persian from "react-date-object/calendars/persian";
import persian_fa from "react-date-object/locales/persian_fa";
import DatePicker from "react-multi-date-picker";
import TimePicker from "react-multi-date-picker/plugins/time_picker";
import transition from "react-element-popper/animations/transition";

export default function UserDetails() {
  const { id } = useParams();
  const [user, setUser] = useState();
  const [enterDate, setEnterDate] = useState(null);
  const [enterTime, setEnterTime] = useState(null);
  const [exitDate, setExitDate] = useState(null);
  const [exitTime, setExitTime] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `https://gist.githubusercontent.com/alietebarian/825961643878fa3e10e998428a7b18be/raw/7690bc6e00c02d009b28819994af0fa24737a263/data`
        );
        const data = await response.json();

        const foundUser = data.find((item) => item.id === parseInt(id));

        if (foundUser) {
          setUser(foundUser);
        } else {
          console.error("User not found");
        }
      } catch (error) {
        console.error("Failed to fetch user:", error);
      }
    };

    fetchData();
  }, [id]);

  if (!user) {
    return (
      <h2 className="bg-red-500 w-[50%] p-8 rounded-sm m-auto mt-16 text-center font-bold text-2xl">
        User not found
      </h2>
    );
  }

  const handleEnterDateChange = (date) => {
    setEnterDate(date);
  };

  const handleEnterTimeChange = (time) => {
    setEnterTime(time);
  };

  const handleExitDateChange = (date) => {
    setExitDate(date);
  };

  const handleExitTimeChange = (time) => {
    setExitTime(time);
  };

  const days =
    ((exitDate?.year || 0) - (enterDate?.year || 0)) * 365 +
    ((exitDate?.month.number || 0) - (enterDate?.month.number || 0)) +
    ((exitDate?.day || 0) - (enterDate?.day || 0));

  const hours =
    (exitTime?.hour || 0) -
    (enterTime?.hour || 0) +
    ((exitTime?.minute || 0) - (enterTime?.minute || 0));

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-8 ">
      <div className="w-full max-w-md rounded-lg shadow-md flex flex-col items-center justify-center p-10 bg-slate-100">
        <img
          src={user.photo}
          alt={user.name}
          className="w-[260px] mb-4 rounded-lg"
        />
        <span className="text-lg font-bold">{user.name}</span>
        <span className="text-sm text-gray-600">{user.job}</span>
        <div className="p-6 ">
          <span className="ml-2 font-medium">تاریخ ورود</span>
          <DatePicker
            calendar={persian}
            locale={persian_fa}
            animations={[transition({ duration: 800, from: 35 })]}
            value={enterDate}
            onChange={handleEnterDateChange}
          />
        </div>
        <div>
          <span className="ml-2 font-medium">زمان ورود</span>
          <DatePicker
            disableDayPicker
            format="HH:mm"
            plugins={[<TimePicker hideSeconds />]}
            value={enterTime}
            onChange={handleEnterTimeChange}
          />
        </div>

        <div className="p-6 ">
          <span className="ml-2 font-medium">تاریخ خروج</span>
          <DatePicker
            calendar={persian}
            locale={persian_fa}
            animations={[transition({ duration: 800, from: 35 })]}
            value={exitDate}
            onChange={handleExitDateChange}
          />
        </div>
        <div>
          <span className="ml-2 font-medium">زمان خروج</span>
          <DatePicker
            disableDayPicker
            format="HH:mm"
            plugins={[<TimePicker hideSeconds />]}
            value={exitTime}
            onChange={handleExitTimeChange}
          />
        </div>

        <span className="py-5">روزهای حاضر در شرکت: {days}</span>
        <span>ساعات حضور در شرکت: {hours}</span>
      </div>
    </div>
  );
}
