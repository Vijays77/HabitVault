import React, {useEffect, useState} from 'react';
import API from '../api';
import dayjs from 'dayjs';

export default function Habits(){
  const [habits, setHabits] = useState([]);
  const [title, setTitle] = useState('');

  useEffect(()=>{ fetchHabits() },[]);

  async function fetchHabits(){
    const res = await API.get('/habits');
    setHabits(res.data);
  }

  async function createHabit(e){
    e.preventDefault();
    await API.post('/habits', { title });
    setTitle('');
    fetchHabits();
  }

  async function toggleComplete(habitId){
    const date = dayjs().format('YYYY-MM-DD');
    await API.post(`/habits/${habitId}/complete`, { date });
    fetchHabits();
  }

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold">Your Habits</h2>
      <form onSubmit={createHabit} className="mt-4">
        <input value={title} onChange={e=>setTitle(e.target.value)} placeholder="New habit" className="border p-2 mr-2"/>
        <button className="bg-blue-600 text-white px-3 py-2 rounded">Add</button>
      </form>

      <div className="mt-6 grid gap-4">
        {habits.map(h => (
          <div key={h._id} className="p-4 border rounded flex justify-between items-center">
            <div>
              <div className="font-semibold">{h.title}</div>
              <div className="text-sm text-gray-500">Streak: {calculateStreak(h)}</div>
            </div>
            <div>
              <button onClick={()=>toggleComplete(h._id)} className="px-3 py-2 bg-green-500 text-white rounded">Toggle Today</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// naive streak calculation: longest consecutive ending today
function calculateStreak(habit){
  const completions = habit.completions || [];
  const datesSet = new Set(completions.filter(c=>c.done).map(c=>c.date));
  let count=0;
  let d = require('dayjs')();
  while(d) {
    const s = d.format('YYYY-MM-DD');
    if(datesSet.has(s)){ count++; d = d.subtract(1, 'day'); }
    else break;
  }
  return count;
}
