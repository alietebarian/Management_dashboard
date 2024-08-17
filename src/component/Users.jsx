import {
  QueryClient,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import React from "react";
import { useSearchContext } from "../context/SearchContext";
import Swal from "sweetalert2";
import { Link } from "react-router-dom";

const fetchData = async () => {
  const response = await fetch(
    "https://gist.githubusercontent.com/alietebarian/825961643878fa3e10e998428a7b18be/raw/7690bc6e00c02d009b28819994af0fa24737a263/data"
  );
  if (!response.ok) throw new Error("Data couldn't be fetched");
  return response.json();
};

const deleteData = async (id) => {
  const response = await fetch(
    `https://gist.githubusercontent.com/alietebarian/825961643878fa3e10e998428a7b18be/raw/7690bc6e00c02d009b28819994af0fa24737a263/data/${id}`,
    {
      method: "DELETE",
    }
  );
  if (!response.ok) throw new Error("Failed to delete the item");
  return response.json();
};

export default function Users() {
  const { searchInput } = useSearchContext();
  const queryClient = useQueryClient();

  const { data, isLoading, error } = useQuery({
    queryKey: ["datas"],
    queryFn: fetchData,
  });

  const mutation = useMutation({
    mutationFn: deleteData,
    onSuccess: () => {
      queryClient.invalidateQueries("datas");
      Swal.fire({
        title: "با موفقیت حذف شد!",
        icon: "success",
      });
    },
  });

  if (isLoading) return <h1>Loading...</h1>;
  if (error) return <h1>Error occurred: {error.message}</h1>;

  const filteredData = data?.filter((item) =>
    item.name.toLowerCase().includes(searchInput.toLowerCase())
  );

  return (
    <div className="flex items-center justify-center min-h-screen p-8">
      <div className="grid grid-cols-4 gap-8 p-30">
        {filteredData?.length === 0 ? (
          <h1 className="text-center text-xl font-bold bg-red-500 ]">
            Not Found
          </h1>
        ) : (
          filteredData?.map((item) => (
            <div
              key={item.id}
              className="w-full h-[380px] rounded-lg shadow-md flex flex-col items-center justify-center bg-white p-20 cursor-pointer"
            >
              <Link to={`/users/${item.id}`}>
                <div className="flex flex-col mb-[10%] text-center">
                  <img
                    src={item.photo}
                    alt="not found"
                    className="rounded-lg h-36 w-full m-auto mb-20 "
                  />
                  <h2 className="w-full font-medium">{item.name}</h2>
                  <span>{item.job}</span>
                </div>
              </Link>
              <button
                className="font-bold border-2 border-red-600 px-9 py-2 mt-2 bg-red-500 rounded-sm shadow-2xl mr-4"
                onClick={() => mutation.mutate(item.id)}
              >
                حذف
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
