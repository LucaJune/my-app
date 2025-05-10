const mockData = {
  cz: {
    "list/get": { id: 1, name: "Mockovací nákupní seznam" },
    "list/create": { id: 2, name: "Nový mockovací nákupní seznam" },
    "list/update": { id: 1, name: "Aktualizovaný mockovací nákupní seznam" },
    "list/delete": { success: true },
    "list/list": [
      { id: 1, name: "Mockovací nákupní seznam" },
      { id: 2, name: "Další mockovací seznam" },
    ],
    "item/get": { id: 1, name: "Mockovací položka" },
    "item/create": { id: 2, name: "Nová mockovací položka" },
    "item/update": { id: 1, name: "Aktualizovaná mockovací položka" },
    "item/delete": { success: true },
    "item/list": [
      { id: 1, name: "Mockovací položka" },
      { id: 2, name: "Další mockovací položka" },
      { id: 3, name: "Další mockovací položka" },
      { id: 4, name: "Další mockovací položka" },
      { id: 5, name: "Další mockovací položka" },
    ],
  },
  en: {
    "list/get": { id: 1, name: "Mock Shopping List" },
    "list/create": { id: 2, name: "New Mock Shopping List" },
    "list/update": { id: 1, name: "Updated Mock Shopping List" },
    "list/delete": { success: true },
    "list/list": [
      { id: 1, name: "Mock Shopping List" },
      { id: 2, name: "Another Mock List" },
    ],
    "item/get": { id: 1, name: "Mock Item" },
    "item/create": { id: 2, name: "New Mock Item" },
    "item/update": { id: 1, name: "Updated Mock Item" },
    "item/delete": { success: true },
    "item/list": [
      { id: 1, name: "Mock Item" },
      { id: 2, name: "Another Mock Item" },
      { id: 3, name: "Another Mock Item" },
      { id: 4, name: "Another Mock Item" },
      { id: 5, name: "Another Mock Item" },
    ],
  },
};

export default mockData;
