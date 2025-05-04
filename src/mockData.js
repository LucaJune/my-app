const mockData = {
  // Mock data for shopping list
  "list/get": { id: 1, name: "Mock Shopping List" },
  "list/create": { id: 2, name: "New Mock Shopping List" },
  "list/update": { id: 1, name: "Updated Mock Shopping List" },
  "list/delete": { success: true },
  "list/list": [
    { id: 1, name: "Mock Shopping List" },
    { id: 2, name: "Another Mock List" },
  ],

  // Mock data for item
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
};

export default mockData;
