import images from '@/Images';
import { POLL_TYPES } from './PollTypes';

export const pollsData = [
  {
    avatar: images.Avatar,
    name: "Arlene McCoy",
    pollType: POLL_TYPES.MULTI_CHOICE,
    votes: {
      icon: images.whiteEye,
      count: 20
    },
    question: "Sales Deal with Toyota - Azure HF - AMS Amplify ?",
    pollIcon: images.multiChoice,
    options: [
      {
        text: "Yes",
        icon: images.smallAvatar,
        count: 75,
        progressWidth: 205,
        progressColor: "bg-green-600"
      },
      {
        text: "No",
        icon: images.smallAvatar,
        count: 40,
        progressWidth: 86,
        progressColor: "bg-red-500"
      }
    ],
    timestamp: "01/07/2024, 10:00 AM"
  },
  {
    avatar: images.Avatar,
    name: "Arlene McCoy", 
    pollType: POLL_TYPES.SINGLE_CHOICE,
    votes: {
      icon: images.whiteEye,
      count: 20
    },
    question: "Sales Deal with Toyota - Azure HF - AMS Amplify ?",
    pollIcon: images.multiChoice,
    options: [
      {
        text: "Yes",
        icon: images.smallAvatar,
        count: 75,
        progressWidth: 205,
        progressColor: "bg-green-600"
      },
      {
        text: "No",
        icon: images.smallAvatar,
        count: 40,
        progressWidth: 86,
        progressColor: "bg-red-500"
      }
    ],
    timestamp: "01/07/2024, 10:00 AM"
  }
];