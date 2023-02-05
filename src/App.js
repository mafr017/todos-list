/** Libs */
import { useState } from 'react';

/** Assets */
import './App.css';

export default function App() {
  // State
  const [kegiatan, kegiatanSet] = useState("")
  const [indeks, indeksSet] = useState(0)
  const [isCompleted, isCompletedSet] = useState(false)
  const [listkegiatans, listkegiatansSet] = useState([]);

  // Handler
  const onSubmitHandler = (e) => {
    e.preventDefault();
    if (kegiatan === "") {
      alert("Tidak boleh Kosong")
    } else {
      console.log(`kegiatans: ${kegiatan}, indeks: ${indeks}, completed: ${isCompleted}`);
      isCompletedSet(false)
      indeksSet((prev) => prev + 1)
      listkegiatansSet((prev) => [...prev, { kegiatan, indeks, isCompleted }])
      kegiatanSet("")
    }
  }
  const editHandler = (value) => {
    kegiatanSet(value.kegiatan)
    listkegiatansSet((prev) => [...prev].filter((e) => e.indeks !== value.indeks))
  }
  const deleteHandler = (value) => {
    listkegiatansSet((prev) => [...prev].filter((e) => e.indeks !== value.indeks))
  }
  const checkCompleteHandler = (value) => {
    const newState = listkegiatans.map(prev =>
      prev.indeks === value.indeks ? { ...prev, isCompleted: !value.isCompleted } : prev
    )
    listkegiatansSet(newState)
  }


  return (
    <div className="App">
      <h1>TODOS</h1>
      <form onSubmit={onSubmitHandler}>
        <div style={{ display: 'flex', gap: '20px' }}>
          <input style={{ width: '500px' }} type={'text'} placeholder='Add todo...' value={kegiatan} onChange={(e) => kegiatanSet(e.target.value)} />
          <button type='submit'>Submit</button>
        </div>
      </form>
      <div>
        {listkegiatans.map((el) => (
          <div style={{ display: 'flex', gap: '10px', marginTop: '10px' }} key={el.indeks}>
            <input value={el.isCompleted} type={'checkbox'} onClick={() => checkCompleteHandler(el)}></input>
            <div style={el.isCompleted ? { textDecoration: 'line-through' } : null}>{el.kegiatan}</div>
            <button onClick={() => { deleteHandler(el) }}>Delete</button>
            <button onClick={() => { editHandler(el) }}>Edit</button>
          </div>
        ))}
      </div>
    </div>
  );
}
