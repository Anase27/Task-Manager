// export interface Task {
//     id: string;
//     volumeInfo: {
//       title: string;
//       authors: Array<string>;
//     };
// }
export interface Task {
    id: string;
    name: string;
    description: string;
    duedate: string;
    priorityLevel: string;
    status: string;
}