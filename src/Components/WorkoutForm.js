import React, { useState } from 'react';
import { useWorkoutsContext } from '../Hooks/useWorkoutsContext';
import { useAuthContext } from '../Hooks/useAuthContext';

const WorkoutForm = () => {
  // Hooks
  const { dispatch } = useWorkoutsContext();
  const {user} = useAuthContext();

  const [title, setTitle] = useState('');
  const [load, setLoad] = useState('');
  const [reps, setReps] = useState('');
  const [error, setError] = useState(null);
  const [emptyFields, setEmplyFields] = useState([]);

  // Functions
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!user) {
        setError('You must be logged in');
    }

    const workout = { title, load, reps };

    const response = await fetch("/api/workouts", {
        method: 'POST',
        body: JSON.stringify(workout),
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${user.token}`
        }
    });

    const json = await response.json()
    if (!response.ok) {
        setError(json.error);
        setEmplyFields(json.emptyFields);
    }
    if (response.ok) {
        setEmplyFields([]);
        setError(null);
        setTitle('');
        setLoad('');
        setReps('');
        console.log('new workout added', json);
        dispatch({type: 'CREATE_WORKOUT', payload: json})
    }
  }

  return (
    <form className='create' onSubmit={handleSubmit}>
        <h3>Add a New Workout</h3>

        {/* TITLE */}
        <label>Exersize Title:</label>
        <input
            type="text"
            onChange={(e) => setTitle(e.target.value)}
            value={title}
            className={emptyFields.includes('title') ? 'error' : ''}

        />

        {/* LOAD */}
        <label>Load (in Kg):</label>
        <input
            type="number"
            onChange={(e) => setLoad(e.target.value)}
            value={load}
            className={emptyFields.includes('load') ? 'error' : ''}
        />

        {/* REPS */}
        <label>Reps:</label>
        <input
            type="number"
            onChange={(e) => setReps(e.target.value)}
            value={reps}
            className={emptyFields.includes('reps') ? 'error' : ''}
        />

        <button>Add Workout</button>
        {error && <div className='error'>{error}</div>}
    </form>
  )
}

export default WorkoutForm;