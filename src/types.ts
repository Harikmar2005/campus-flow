export type ClassStatus = 'completed' | 'current' | 'next' | 'upcoming' | 'free';

export interface ClassSession {
  id: string;
  code: string;
  title: string;
  startTime: string; // "10:00 AM"
  endTime: string;   // "11:00 AM"
  startMinutes: number; // minutes from midnight, e.g. 600 for 10:00
  endMinutes: number;   // 660 for 11:00
  room: string;
  building: string;
  floor: string;
  wing?: string;
  walkingMinutes: number;
  distanceMeters: number;
  professor: {
    name: string;
    title: string;
    cabin: string;
    email: string;
  };
  attendance: {
    attended: number;
    total: number;
    percentage: number;
    safeSkips: number;
  };
  topicToday: string;
  assignmentDue?: {
    title: string;
    deadline: string;
    urgent?: boolean;
  };
  notes?: string;
  type: 'Lecture' | 'Lab' | 'Tutorial' | 'Seminar';
}

export interface FreePeriod {
  id: string;
  startTime: string;
  endTime: string;
  durationMinutes: number;
  suggestedLocations: string[];
}

export interface DaySchedule {
  dayName: string; // "Monday", "Tuesday", etc.
  dayShort: string; // "MON", "TUE"
  dateNum: number;  // 8
  fullDate: string; // "Wednesday • 08 October"
  items: (ClassSession | { isFree: true; free: FreePeriod })[];
}

export interface CourseSummary {
  code: string;
  name: string;
  credits: number;
  type: 'Core' | 'Elective' | 'Lab';
  faculty: string;
  room: string;
  attendancePct: number;
  classesAttended: number;
  totalClasses: number;
  nextExam: string;
  syllabusProgress: number;
}
