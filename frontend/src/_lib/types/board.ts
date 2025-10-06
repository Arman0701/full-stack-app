export type BoardProps = {
  list: Task[];
};

export type Task = {
  id: string;
  title: string;
  description: string;
  complete: boolean;
};
