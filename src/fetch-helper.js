import mockData from "./mockData";

async function Call(baseUri, useCase, dtoIn, method, useMockData) {
  console.log(`Calling ${useCase} with mock data: ${useMockData}`);
  if (useMockData) {
    console.log(`Returning mock data for ${useCase}:`, mockData[useCase]);
    return { ok: true, status: 200, data: mockData[useCase] };
  }

  let response;
  if (!method || method === "get") {
    response = await fetch(
      `${baseUri}/${useCase}${
        dtoIn && Object.keys(dtoIn).length
          ? `?${new URLSearchParams(dtoIn)}`
          : ""
      }`
    );
  } else {
    response = await fetch(`${baseUri}/${useCase}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(dtoIn),
    });
  }
  const data = await response.json();
  console.log(`Received response for ${useCase}:`, data);
  return { ok: response.ok, status: response.status, data };
}

const baseUri = "http://localhost:3000";

const FetchHelper = {
  list: {
    get: async (dtoIn, useMockData) => {
      return await Call(baseUri, "list/get", dtoIn, "get", useMockData);
    },
    create: async (dtoIn, useMockData) => {
      return await Call(baseUri, "list/create", dtoIn, "post", useMockData);
    },
    update: async (dtoIn, useMockData) => {
      return await Call(baseUri, "list/update", dtoIn, "post", useMockData);
    },
    delete: async (dtoIn, useMockData) => {
      return await Call(baseUri, "list/delete", dtoIn, "post", useMockData);
    },
    list: async (dtoIn, useMockData) => {
      return await Call(baseUri, "list/list", dtoIn, "get", useMockData);
    },
  },

  item: {
    get: async (dtoIn, useMockData) => {
      return await Call(baseUri, "item/get", dtoIn, "get", useMockData);
    },
    create: async (dtoIn, useMockData) => {
      return await Call(baseUri, "item/create", dtoIn, "post", useMockData);
    },
    update: async (dtoIn, useMockData) => {
      return await Call(baseUri, "item/update", dtoIn, "post", useMockData);
    },
    delete: async (dtoIn, useMockData) => {
      return await Call(baseUri, "item/delete", dtoIn, "post", useMockData);
    },
    list: async (useMockData) => {
      return await Call(baseUri, "item/list", null, "get", useMockData);
    },
  },
};

export default FetchHelper;
