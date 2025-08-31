export const taskEndpoints = {
  getAll: `/tasks`,
  getById: (id: number) => `/tasks/${id}`,
  create: `/tasks`,
  update: (id: number) => `/tasks/${id}`,
  delete: (id: number) => `/tasks/${id}`,
};
