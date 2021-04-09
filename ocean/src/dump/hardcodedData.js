const goals1 = [
  {
    id: 30000,
    title: 'Software',
    totalTasksNum: 2,
    completedTasksNum: 1,
    completed: false,
    completionPercent: 50,
    tasks: [
      { id: 0, task: 'Research React', completed: true },
      { id: 1, task: 'Make demo app', completed: false }
    ]
  },
  {
    id: 20000,
    title: 'School',
    totalTasksNum: 5,
    completedTasksNum: 3,
    completed: false,
    completionPercent: 60,
    tasks: [
      { id: 0, task: 'study for CSC309', completed: true },
      { id: 1, task: 'study for CSC384', completed: true },
      { id: 2, task: 'drop MIE424', completed: true },
      { id: 3, task: 'submit AI minor form request', completed: false },
      { id: 4, task: 'submit extra form request', completed: false }
    ]
  }
]

const goals2 = [
  {
    id: 20000,
    title: 'Admin Stuff',
    totalTasksNum: 2,
    completedTasksNum: 1,
    completed: false,
    completionPercent: 50,
    tasks: [
      { id: 0, task: 'Research React', completed: true },
      { id: 1, task: 'Make demo app', completed: false }
    ]
  },
  {
    id: 30000,
    title: 'More Admin stuff',
    totalTasksNum: 5,
    completedTasksNum: 3,
    completed: false,
    completionPercent: 60,
    tasks: [
      { id: 0, task: 'study for CSC309', completed: true },
      { id: 1, task: 'study for CSC384', completed: true },
      { id: 2, task: 'drop MIE424', completed: true },
      { id: 3, task: 'submit AI minor form request', completed: false },
      { id: 4, task: 'submit extra form request', completed: false }
    ]
  }
]

const sessions_user_1 = [
  {
    sessionId: 1,
    userId: 1,
    goalId: 2,
    title: "Work on ocean component",
    startTime: new Date(2021, 2, 1, 8, 0, 0),
    endTime: new Date(2021, 2, 1, 12, 0, 0)
  },
  {
    sessionId: 2,
    userId: 1,
    goalId: 1,
    title: "Learn more about React",
    startTime: new Date(2021, 2, 2, 8, 0, 0),
    endTime: new Date(2021, 2, 2, 12, 0, 0)
  }];

  const sessions_other_users = [
    {
      sessionId: 1,
      userId: 1,
      goalId: 2,
      title: "Work on ocean component",
      startTime: new Date(2021, 2, 1, 8, 0, 0),
      endTime: new Date(2021, 2, 1, 12, 0, 0)
    },
    {
      sessionId: 2,
      userId: 1,
      goalId: 1,
      title: "Learn more about React",
      startTime: new Date(2021, 2, 2, 8, 0, 0),
      endTime: new Date(2021, 2, 2, 12, 0, 0)
    }];

const usersList = [
  {
    id: 1,
    username: 'user',
    password: 'user',
    adminFlag: false,
    name: 'Pom',
    tagline: '24yyyyy, 🇨🇦',
    goals: goals1,
    friends: [
      { id: 3, name: 'GrassyMans' },
    ],
    sessions: sessions_user_1
  },
  {
    id: 2,
    username: 'admin',
    password: 'admin',
    adminFlag: true,
    name: 'AdminJim',
    tagline: 'your favourite neighborhood admin',
    goals: goals2,
    friends: [
      { id: 4, name: 'Billy' },
    ],
    sessions: sessions_other_users
  },
  {
    id: 3,
    username: 'a',
    password: 'a',
    adminFlag: false,
    name: 'GrassyMans',
    tagline: '',
    goals: goals2,
    friends: [
    ],
    sessions: sessions_other_users
  },
  {
    id: 4,
    username: 'b',
    password: 'b',
    adminFlag: false,
    name: 'PotatoChip',
    tagline: '',
    goals: goals2,
    friends: [
    ],
    sessions: sessions_other_users
  }
]