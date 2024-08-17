import { useMutation, useQueryClient } from "@tanstack/react-query";
import React from "react";
import { useForm } from "react-hook-form";

export default function NewUser() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const addUser = async (newUser) => {
    const data = await fetch(
      "https://gist.githubusercontent.com/alietebarian/825961643878fa3e10e998428a7b18be/raw/7690bc6e00c02d009b28819994af0fa24737a263/data",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newUser),
      }
    );
    return data.json();
  };

  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: addUser,
    onSuccess: () => {
        queryClient.invalidateQueries('users')
    }
  });

  const onSubmit = (data) => {
    mutation.mutate(data)
  };

  return (
    <div className="w-[80%] max-h-[80%] bg-white m-auto mt-[100px] flex flex-col rounded-sm">
      <h1 className="m-auto p-8 text-2xl font-bold">اضافه کردن کاربر جدید</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col m-auto">
        <label className="mr-3 text-lg font-bold pt-2">عکس</label>
        <input
          type="text"
          className="p-3 m-2 w-[800px] focus:outline-none bg-slate-100 rounded-sm mr-7"
          {...register("photo", {
            required: "این فیلد الزامی است",
          })}
        />
        {errors.photo && (
          <p className="mr-7 pb-5 text-red-500 font-bold ">
            {errors.photo.message}
          </p>
        )}

        <label className="mr-3 text-lg font-bold pt-2">نام</label>
        <input
          type="text"
          className="p-3 m-2 w-[800px] focus:outline-none bg-slate-100 rounded-sm mr-7"
          {...register("name", {
            required: "این فیلد الزامی است",
          })}
        />
        {errors.name && (
          <p className="mr-7 pb-5 text-red-500 font-bold ">
            {errors.name.message}
          </p>
        )}

        <label className="mr-3 text-lg font-bold pt-2">نام خانوادگی</label>
        <input
          type="text"
          className="p-3 m-2 w-[800px] focus:outline-none bg-slate-100 rounded-sm mr-7"
          {...register("family", {
            required: "این فیلد الزامی است",
          })}
        />
        {errors.family && (
          <p className="mr-7 pb-5 text-red-500 font-bold ">
            {errors.family.message}
          </p>
        )}

        <label className="mr-3 text-lg font-bold pt-2">موقعیت شغلی</label>
        <input
          type="text"
          className="p-3 m-2 w-[800px] focus:outline-none bg-slate-100 rounded-sm mr-7"
          {...register("job", {
            required: "این فیلد الزامی است",
          })}
        />
        {errors.job && (
          <p className="mr-7 pb-5 text-red-500 font-bold ">
            {errors.job.message}
          </p>
        )}

        <input type="submit" className="p-8 font-bold text-xl cursor-pointer" />
      </form>
    </div>
  );
}
