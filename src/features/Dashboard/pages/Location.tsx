import { CiSearch } from "react-icons/ci";
import { DashboardLayout } from "../layout/DashboardLayout";
import { MdOutlineEditLocationAlt, MdOutlineDelete } from "react-icons/md";
import { IoMdAddCircleOutline } from "react-icons/io";
import { useMutation, useQuery } from "@tanstack/react-query";
import {
  createLocations,
  deleteLocations,
  getLocations,
  updateLocations,
} from "../service";
import type { LocationType } from "../type";
import { Modal } from "../../../components/ui/modal";
import { useState } from "react";
import { toast } from "sonner";
import { InputField } from "../../../components/ui/Input";
import { Button } from "../../../components/ui/Button";
import { FullPageLoader } from "../../../components/ui/fullPageLoader";

const PAGE_SIZE = 10;

export const Location = () => {
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [createModalOpen, setCreateModalOpen] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [id, setId] = useState<number | null>(null);
  const [formData, setFormData] = useState<LocationType>({
    name: "",
    price: 0,
  });
  const [page, setPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");

  const getformData = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const { data, isLoading, refetch } = useQuery({
    queryKey: ["locations", page],
    queryFn: () => getLocations(),
  });

  const paginatedData = data
    ? [...data].reverse().slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE)
    : [];

  const searchLocData =
    searchTerm.trim() && data
      ? data.filter((loc: LocationType) =>
          loc.name.toLowerCase().includes(searchTerm.toLowerCase()),
        )
      : [];

  const searchLocation = searchLocData.slice(
    (page - 1) * PAGE_SIZE,
    page * PAGE_SIZE,
  );

  const totalPages = data ? Math.ceil(data.length / PAGE_SIZE) : 1;
  const totalSearchPages = searchLocData
    ? Math.ceil(searchLocData.length / PAGE_SIZE)
    : 1;
  const { mutate: deleteLocationsMutation } = useMutation({
    mutationFn: deleteLocations,
    onSuccess: () => {
      toast.success("Deleted Location Successfully");
      refetch();
    },
    onError: () => {
      toast.error("Location Deletion Failed");
    },
  });

  const { mutate: createLocationsMutation } = useMutation({
    mutationFn: createLocations,
    onSuccess: () => {
      toast.success("Location Created Successfully");
      refetch();
    },
    onError: () => {
      toast.error("Failed Creating Location");
    },
  });

  const { mutate: updateLocationsMutation } = useMutation({
    mutationFn: ({ data, id }: { data: LocationType; id: number }) =>
      updateLocations(data, id),
    onSuccess: () => {
      toast.success("Location Updated Successfully");
      refetch();
    },
    onError: () => {
      toast.error("Failed Updating Location");
    },
  });

  const openCreateModal = () => {
    setIsEditMode(false);
    setFormData({ name: "", price: 0 });
    setCreateModalOpen(true);
  };

  const openEditModal = (loc: LocationType) => {
    setIsEditMode(true);
    setFormData({
      id: loc.id,
      name: loc.name,
      price: loc.price,
    });
  };

  const handleSubmitLocation = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (isEditMode && id) {
      updateLocationsMutation({ data: formData, id });
    } else if (createModalOpen) {
      createLocationsMutation(formData);
    }
    setFormData({ name: "", price: 0 });
    setIsEditMode(false);
    setCreateModalOpen(false);
  };

  const handleDelete = () => {
    if (id !== null) deleteLocationsMutation(id);
    setDeleteModalOpen(false);
  };

  const displayData =
    searchLocation && searchLocation.length > 0
      ? searchLocation
      : paginatedData;

  return (
    <>
      <DashboardLayout>
        <div>
          <h1 className="text-[25px] text-secondary font-medium">
            Delivery Location
          </h1>
          <p className="text-gray-400 -mt-1">List of all Locations</p>
          <p className="text-gray-400 -mt-1">
            Locations Added: {data?.length ?? 0}
          </p>

          <div className="my-5 bg-white p-3 rounded-lg flex flex-col md:flex-row md:items-center gap-3 md:gap-5">
            <div className="w-full md:w-3/5 flex items-center border border-secondary rounded-lg relative">
              <CiSearch className="absolute ml-2 text-gray-400" />
              <input
                type="text"
                name="search"
                placeholder="Search for delivery location..."
                onChange={(e) => {
                  setSearchTerm(e.target.value);
                }}
                className="bg-transparent outline-none px-7 py-3 w-full"
              />
            </div>
            <div
              className="w-full md:w-2/5 py-3 px-4 border bg-secondary text-white rounded-lg flex items-center justify-center gap-x-2 font-medium cursor-pointer"
              onClick={openCreateModal}
            >
              <IoMdAddCircleOutline />
              <p>Add Location</p>
            </div>
          </div>

          <div className="overflow-x-auto bg-white rounded-xl shadow-md">
            <table className="min-w-full text-sm text-left">
              <thead className="bg-gray-100 text-gray-600 uppercase text-xs">
                <tr>
                  <th className="px-6 py-3">Location</th>
                  <th className="px-6 py-3">Delivery Price</th>
                  <th className="px-6 py-3 text-right">Actions</th>
                </tr>
              </thead>

              <tbody>
                {isLoading ? (
                  <FullPageLoader />
                ) : displayData?.length > 0 ? (
                  displayData.map((loc: LocationType) => (
                    <tr
                      key={loc.id}
                      className="border-b border-gray-300 hover:bg-gray-50 transition"
                    >
                      <td className="px-6 py-4 font-medium text-secondary">
                        {loc.name}
                      </td>

                      <td className="px-6 py-4 text-secondary">
                        Ghc {loc.price}
                      </td>

                      <td className="px-6 py-4">
                        <div className="flex justify-end gap-3">
                          <button
                            className="p-2 rounded-full hover:bg-blue-100 transition"
                            onClick={() => {
                              openEditModal(loc);
                              setId(loc.id!);
                            }}
                          >
                            <MdOutlineEditLocationAlt className="text-secondary text-xl" />
                          </button>

                          <button
                            className="p-2 rounded-full hover:bg-red-100 transition"
                            onClick={() => {
                              setDeleteModalOpen(true);
                              setId(loc.id!);
                            }}
                          >
                            <MdOutlineDelete className="text-red-500 text-xl" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={3} className="text-center py-6">
                      No Data
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          <div className="flex justify-center gap-4 mt-6">
            <button
              className="px-4 py-2 bg-secondary text-white rounded"
              disabled={page === 1}
              onClick={() => setPage((p) => Math.max(p - 1, 1))}
            >
              Previous
            </button>

            <span className="px-4 py-2">
              Page {page} of {totalSearchPages ? totalSearchPages : totalPages}
            </span>

            <button
              className="px-4 py-2 bg-secondary text-white rounded"
              disabled={page === totalPages}
              onClick={() => setPage((p) => Math.min(p + 1, totalPages))}
            >
              Next
            </button>
          </div>

          <Modal
            title="Delete Location"
            isOpen={deleteModalOpen}
            onClose={() => {
              setDeleteModalOpen(false);
            }}
            size="md"
          >
            <p className="mb-4">
              Are you sure you want to delete this location?
            </p>
            <div className="flex justify-end gap-3">
              <button
                onClick={() => {
                  setDeleteModalOpen(false);
                  setIsEditMode(false);
                }}
                className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
              >
                No, Keep Order
              </button>
              <button
                onClick={handleDelete}
                className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
              >
                Delete Location
              </button>
            </div>
          </Modal>

          <Modal
            title={isEditMode ? "Update Location" : "Add New Location"}
            isOpen={isEditMode || createModalOpen}
            onClose={() => {
              setCreateModalOpen(false);
              setIsEditMode(false);
            }}
            size="md"
          >
            <form onSubmit={handleSubmitLocation}>
              <InputField
                label="Location Name"
                type="text"
                name="name"
                placeholder="Enter location name"
                value={formData.name}
                onChange={getformData}
              />
              <div className="my-3">
                <InputField
                  label="Delivery Amount"
                  type="text"
                  name="price"
                  placeholder="Enter delivery amount"
                  value={formData.price}
                  onChange={getformData}
                />
              </div>
              <Button
                text={isEditMode ? "Update Location" : "Add Location"}
                Stlye="w-full bg-secondary text-white px-5 py-3 mt-2.5 text-center rounded-xl"
              />
            </form>
          </Modal>
        </div>
      </DashboardLayout>
    </>
  );
};
