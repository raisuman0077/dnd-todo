const options = {
  pending: [
    { title: "Completed", value: "completed" },
    { title: "In-Complete", value: "incomplete" },
    { title: "Canceled", value: "canceled" },
  ],
  completed: [
    { title: "Pending", value: "pending" },
    { title: "In-Complete", value: "incomplete" },
    { title: "Canceled", value: "canceled" },
  ],
  incomplete: [
    { title: "Pending", value: "pending" },
    { title: "Completed", value: "completed" },
    { title: "Canceled", value: "canceled" },
  ],
};

const filterOptions = [
  { title: "All", value: "all" },
  { title: "Pending", value: "pending" },
  { title: "Completed", value: "completed" },
  { title: "In-Complete", value: "incomplete" },
  { title: "Canceled", value: "canceled" },
];

export { options, filterOptions };
