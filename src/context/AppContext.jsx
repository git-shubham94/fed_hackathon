import React, { createContext, useState, useContext, useEffect } from 'react';
import { students as initialStudents, achievements as initialAchievements, participations as initialParticipations, activityCategories } from '../data/mockData';

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(() => {
    const saved = localStorage.getItem('currentUser');
    return saved ? JSON.parse(saved) : null;
  });

  const [userList, setUserList] = useState(() => {
    const saved = localStorage.getItem('userList');
    return saved ? JSON.parse(saved) : initialStudents;
  });

  const [achievementList, setAchievementList] = useState(() => {
    const saved = localStorage.getItem('achievements');
    return saved ? JSON.parse(saved) : initialAchievements;
  });

  const [participationList, setParticipationList] = useState(() => {
    const saved = localStorage.getItem('participations');
    return saved ? JSON.parse(saved) : initialParticipations;
  });

  useEffect(() => {
    localStorage.setItem('achievements', JSON.stringify(achievementList));
  }, [achievementList]);

  useEffect(() => {
    localStorage.setItem('participations', JSON.stringify(participationList));
  }, [participationList]);

  useEffect(() => {
    if (currentUser) {
      localStorage.setItem('currentUser', JSON.stringify(currentUser));
    } else {
      localStorage.removeItem('currentUser');
    }
  }, [currentUser]);

  useEffect(() => {
    localStorage.setItem('userList', JSON.stringify(userList));
  }, [userList]);

  const registerStudent = (userData) => {
    const emailExists = userList.some(user => user.email === userData.email);
    if (emailExists) {
      return false;
    }

    const newStudent = {
      id: Date.now(),
      name: userData.name,
      email: userData.email,
      password: userData.password,
      rollNumber: userData.rollNumber,
      cohort: userData.cohort,
      department: userData.department,
      phone: userData.phone || '',
      registeredDate: new Date().toISOString()
    };

    const updatedList = [...userList, newStudent];
    setUserList(updatedList);
    return true;
  };

  const addAchievement = (achievement) => {
    const newAchievement = { 
      ...achievement, 
      id: Date.now(),
      studentId: parseInt(achievement.studentId)
    };
    setAchievementList([...achievementList, newAchievement]);
  };

  const updateAchievement = (id, updatedAchievement) => {
    setAchievementList(
      achievementList.map(a => a.id === id ? { ...updatedAchievement, id } : a)
    );
  };

  const deleteAchievement = (id) => {
    setAchievementList(achievementList.filter(a => a.id !== id));
  };

  const addParticipation = (participation) => {
    const newParticipation = { 
      ...participation, 
      id: Date.now(),
      studentId: parseInt(participation.studentId)
    };
    setParticipationList([...participationList, newParticipation]);
  };

  const updateParticipation = (id, updatedParticipation) => {
    setParticipationList(
      participationList.map(p => p.id === id ? { ...updatedParticipation, id } : p)
    );
  };

  const deleteParticipation = (id) => {
    setParticipationList(participationList.filter(p => p.id !== id));
  };

  const value = {
    currentUser,
    setCurrentUser,
    students: userList,
    achievementList,
    participationList,
    activityCategories,
    addAchievement,
    updateAchievement,
    deleteAchievement,
    addParticipation,
    updateParticipation,
    deleteParticipation,
    registerStudent
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useAppContext must be used within AppProvider');
  }
  return context;
};
