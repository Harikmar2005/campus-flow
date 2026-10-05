/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { HeroNextClass } from './components/HeroNextClass';
import { SmartInfoHUD } from './components/SmartInfoHUD';
import { TimelineDay } from './components/TimelineDay';
import { BottomNav, NavTab } from './components/BottomNav';
import { ClassDetailModal } from './components/ClassDetailModal';
import { FloorRouteModal } from './components/FloorRouteModal';
import { CampusMapModal } from './components/CampusMapModal';
import { TimetableView } from './components/TimetableView';
import { CoursesView } from './components/CoursesView';
import { ProfileView } from './components/ProfileView';
import { SimulationBar } from './components/SimulationBar';
import { USER_PROFILE, WEEK_SCHEDULES, WEDNESDAY_CLASSES } from './data/scheduleData';
import { ClassSession, FreePeriod } from './types';

export default function App() {
  const [activeTab, setActiveTab] = useState<NavTab>('TODAY');
  const [selectedDay, setSelectedDay] = useState<string>('WED');
  
  // Simulation and Live Time State
  const [currentScenario, setCurrentScenario] = useState<'default' | 'in_class' | 'free_period'>('default');
  const [isLiveTicking, setIsLiveTicking] = useState<boolean>(true);
  const [secondsCounter, setSecondsCounter] = useState<number>(42);
  const [minutesRemaining, setMinutesRemaining] = useState<number>(24);
  const [isDeviceFramed, setIsDeviceFramed] = useState<boolean>(true);

  // Modals
  const [activeDetailSession, setActiveDetailSession] = useState<ClassSession | null>(null);
  const [activeMapSession, setActiveMapSession] = useState<ClassSession | null>(null);
  const [isCampusMapOpen, setIsCampusMapOpen] = useState<boolean>(false);

  // Live timer tick effect
  useEffect(() => {
    if (!isLiveTicking) return;

    const timer = setInterval(() => {
      setSecondsCounter((prev) => {
        if (prev <= 1) {
          setMinutesRemaining((m) => Math.max(1, m - 1));
          return 59;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [isLiveTicking]);

  // Handle Scenario Switches
  const handleSetScenario = (scenario: 'default' | 'in_class' | 'free_period') => {
    setCurrentScenario(scenario);
    if (scenario === 'default') {
      setMinutesRemaining(24);
      setSecondsCounter(42);
    } else if (scenario === 'in_class') {
      setMinutesRemaining(0);
      setSecondsCounter(0);
    } else {
      setMinutesRemaining(42);
      setSecondsCounter(15);
    }
  };

  // Get current simulated time string
  const getSimulatedTimeString = () => {
    if (currentScenario === 'default') return '09:36 AM';
    if (currentScenario === 'in_class') return '10:15 AM';
    return '12:30 PM';
  };

  // Target Next Class (Wednesday Cyber Security C-204)
  const nextClassSession = (WEDNESDAY_CLASSES.find(
    (c) => 'id' in c && c.id === 'c2'
  ) as ClassSession) || (WEDNESDAY_CLASSES[0] as ClassSession);

  // Swipe gesture between days
  const daysList = ['MON', 'TUE', 'WED', 'THU', 'FRI'];
  const [touchStartX, setTouchStartX] = useState<number | null>(null);

  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStartX(e.touches[0].clientX);
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX === null) return;
    const touchEndX = e.changedTouches[0].clientX;
    const diff = touchStartX - touchEndX;
    const threshold = 50; // min 50px swipe

    if (diff > threshold) {
      // Swiped left -> next day
      const idx = daysList.indexOf(selectedDay);
      if (idx < daysList.length - 1) {
        setSelectedDay(daysList[idx + 1]);
      }
    } else if (diff < -threshold) {
      // Swiped right -> prev day
      const idx = daysList.indexOf(selectedDay);
      if (idx > 0) {
        setSelectedDay(daysList[idx - 1]);
      }
    }
    setTouchStartX(null);
  };

  // Handle clicking on free period
  const handleSelectFreePeriod = (free: FreePeriod) => {
    setIsCampusMapOpen(true);
  };

  // Handle telemetry clicks
  const handleSelectInsight = (type: 'free' | 'classes' | 'attendance' | 'assignment') => {
    if (type === 'attendance') {
      setActiveTab('COURSES');
    } else if (type === 'free') {
      setIsCampusMapOpen(true);
    } else if (type === 'classes') {
      setActiveTab('TIMETABLE');
    } else if (type === 'assignment') {
      setActiveDetailSession(nextClassSession);
    }
  };

  return (
    <div className="min-h-screen bg-[#07090e] text-slate-100 flex flex-col font-sans selection:bg-amber-400 selection:text-black">
      {/* Top Chrono Simulation Control Bar */}
      <SimulationBar
        currentScenario={currentScenario}
        onSetScenario={handleSetScenario}
        isLiveTicking={isLiveTicking}
        onToggleLiveTicking={() => setIsLiveTicking(!isLiveTicking)}
        isDeviceFramed={isDeviceFramed}
        onToggleDeviceFrame={() => setIsDeviceFramed(!isDeviceFramed)}
      />

      {/* Main App Container: Either Smartphone Chassis or Responsive Full Width */}
      <div className={`flex-1 flex justify-center items-start ${isDeviceFramed ? 'p-0 sm:py-6 sm:px-4' : 'w-full'}`}>
        <div 
          className={`w-full transition-all relative ${
            isDeviceFramed 
              ? 'max-w-[430px] bg-[#090c12] sm:border sm:border-white/15 sm:rounded-[36px] sm:shadow-[0_25px_60px_-15px_rgba(0,0,0,0.8)] sm:ring-1 sm:ring-white/10 sm:overflow-hidden sm:min-h-[880px]' 
              : 'max-w-2xl bg-[#090c12]'
          }`}
        >
          {/* Smartphone Speaker & Dynamic Island Mockup on Desktop Chassis */}
          {isDeviceFramed && (
            <div className="hidden sm:flex items-center justify-between px-6 pt-3 pb-1 bg-[#090c12] text-xs font-mono text-slate-400 select-none">
              <span>{getSimulatedTimeString().split(' ')[0]}</span>
              {/* Dynamic Island pill */}
              <div className="w-24 h-4 bg-black rounded-full border border-white/10 flex items-center justify-center gap-1.5 px-2">
                <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse"></span>
                <span className="text-[8px] font-bold text-amber-300">C-204 · 24m</span>
              </div>
              <div className="flex items-center gap-1.5 text-[10px]">
                <span>5G</span>
                <span>100%</span>
              </div>
            </div>
          )}

          {/* Academic Header with Day Rail */}
          <Header
            selectedDay={selectedDay}
            onSelectDay={(day) => setSelectedDay(day)}
            currentSimulatedTime={getSimulatedTimeString()}
            onOpenMap={() => setIsCampusMapOpen(true)}
          />

          {/* Tab 1: TODAY (Primary Core Experience) */}
          {activeTab === 'TODAY' && (
            <main 
              onTouchStart={handleTouchStart}
              onTouchEnd={handleTouchEnd}
              className="pb-24 overflow-y-auto"
            >
              {/* Hero Section: The centerpiece answering "What is my next class, where is it, how long until it starts?" */}
              <HeroNextClass
                session={nextClassSession}
                minutesUntilStart={minutesRemaining}
                secondsRemaining={secondsCounter}
                isInProgress={currentScenario === 'in_class'}
                onOpenDetails={(s) => setActiveDetailSession(s)}
                onOpenMap={(s) => setActiveMapSession(s)}
              />

              {/* Smart Information Telemetry Strip */}
              <SmartInfoHUD
                freeMinutes={42}
                classesRemaining={2}
                overallAttendance={USER_PROFILE.overallAttendance}
                assignmentTitle="Lab Report #4: Snort Rule Writing"
                assignmentDue="Tomorrow • 11:59 PM"
                onSelectInsight={handleSelectInsight}
              />

              {/* Today's Timeline Spine */}
              <TimelineDay
                items={WEEK_SCHEDULES[selectedDay]?.items || WEDNESDAY_CLASSES}
                currentClassId="c2"
                onSelectSession={(s) => setActiveDetailSession(s)}
                onOpenMap={(s) => setActiveMapSession(s)}
                onSelectFreePeriod={handleSelectFreePeriod}
              />
            </main>
          )}

          {/* Tab 2: TIMETABLE */}
          {activeTab === 'TIMETABLE' && (
            <TimetableView
              onSelectClass={(s) => setActiveDetailSession(s)}
              onOpenMap={(s) => setActiveMapSession(s)}
            />
          )}

          {/* Tab 3: COURSES */}
          {activeTab === 'COURSES' && (
            <CoursesView
              onSelectCourse={(course) => {
                // Find matching session if exists
                const match = WEDNESDAY_CLASSES.find(
                  (c) => 'code' in c && c.code === course.code
                );
                if (match && 'id' in match) {
                  setActiveDetailSession(match as ClassSession);
                }
              }}
            />
          )}

          {/* Tab 4: PROFILE */}
          {activeTab === 'PROFILE' && (
            <ProfileView />
          )}

          {/* Fixed Bottom Navigation (TODAY, TIMETABLE, COURSES, PROFILE) */}
          <BottomNav
            activeTab={activeTab}
            onTabChange={(tab) => setActiveTab(tab)}
            nextClassKicker="Starts in 24m"
          />
        </div>
      </div>

      {/* Class Dossier & Wayfinding Modal */}
      {activeDetailSession && (
        <ClassDetailModal
          session={activeDetailSession}
          onClose={() => setActiveDetailSession(null)}
          onOpenMap={(s) => {
            setActiveDetailSession(null);
            setActiveMapSession(s);
          }}
        />
      )}

      {/* Architectural Floor Route Modal */}
      {activeMapSession && (
        <FloorRouteModal
          session={activeMapSession}
          onClose={() => setActiveMapSession(null)}
        />
      )}

      {/* Campus Master Spatial Wayfinding Map */}
      {isCampusMapOpen && (
        <CampusMapModal
          onClose={() => setIsCampusMapOpen(false)}
          targetRoom="Room C-204"
        />
      )}
    </div>
  );
}
