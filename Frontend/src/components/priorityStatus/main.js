import { PriorityStatus } from "./PriorityStatus";

export default {
  title: "components/priorityStatus",
  component: PriorityStatus,
};

export const Default = {
  args: {
    medium: true,
    low: true,
    high: true,
    className: {},
    divClassName: {},
    text: "Medium",
  },
};
