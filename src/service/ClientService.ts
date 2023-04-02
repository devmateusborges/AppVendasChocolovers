import useApi from "../hooks/useApi";

const urlBase = "http://localhost:3333/";

export const GetClient = async (): Promise<any> => {
  const { getApi } = useApi();

  const result = await getApi(`${urlBase}Client/`, {
    cache: "no-store",
  });

  return result;
};

export const CreateGroup = async (
  pName: string,
  pDescription: string,
  pColor: string
): Promise<any> => {
  const { getApi } = useApi();

  const result = await getApi(urlBase + "client/", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name: pName,
      description: pDescription,
      color: pColor,
    }),
  });

  return result;
};

export const GetByIdClient = async (pId?: string): Promise<any> => {
  // const { getApi } = useApi();
  // const result = await getApi(`${urlBase}client/${pId}`, {
  //   cache: "no-store",
  // });
};

export const DeleteGroup = async (pId: string): Promise<any> => {
  const { getApi } = useApi();

  const result = await getApi(`${urlBase}Client/${pId}`, { method: "DELETE" });

  return await result;
};

export const FilterGroup = async (pFilter: string): Promise<any> => {
  const { getApi } = useApi();

  const result = await getApi(`${urlBase}Client/filter`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      filter: pFilter,
    }),
  });

  return await result;
};

export const UpdateGroup = async (
  id?: string,
  name?: string,
  description?: string,
  color_hex?: string,
  user_id?: string
): Promise<any> => {
  const { getApi } = useApi();

  const result = await getApi(urlBase + `Client/update/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name_group: name,
      description: description,
      color_hex: color_hex,
      user_id: user_id,
    }),
  });
  return result;
};

export const Clientervice = {
  FilterGroup,
  GetClient,
  DeleteGroup,
  CreateGroup,
  GetByIdClient,
  UpdateGroup,
};
