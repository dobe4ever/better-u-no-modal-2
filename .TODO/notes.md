// user object and 'users' table cols
export type User = {
  id: string
  email: string
  password: string
  confirmPassword: string
  username: string
  DisplayName: string
  avatar_url: string
  created_at: string
  plan: boolean
}

// habit object and 'habits' table cols
export type Habit = {
  userId: string // identifier

  id: string
  title: String
  genContent: string
  category: string
  color: number
  mon: ConstrainBoolean
  tue: boolean
  wed: boolean
  thu: boolean
  fri: boolean
  sat: boolean
  sun: boolean
  reminder: string
  notes: string
  completed: boolean
}

// HabitsList object and 'habits_lists' table cols
export type HabitsList = {
  userId: string // identifier
  id: string
  date: string
  habits: [] // list of Habit objects set to repeat this day
}

// HabitsList object and 'habits_lists' table cols
export type HabitsListsHistory = {
  userId: string // identifier
  habitsListDate: string // identifier
  HabitsLists: [] // list of HabitsLists objects
}


// CreateHabit
// UpdateHabit
// DeleteHabit

// CreateHabitsList
// UpdateHabitList
// HabitListToHistory
