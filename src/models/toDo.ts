export type GetToDosResponse = {
  id: number;
  userId: number;
  title: string;
  completed: boolean;
}[];

export type GetToDosRequest = {
  id?: number;
  userId?: number;
  filterByCompleted?: boolean;
  pageSize?: number;
  pageToken?: number;
};
