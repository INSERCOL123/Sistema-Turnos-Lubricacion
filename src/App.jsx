
import { useState, useEffect } from "react";
import { db } from "./firebase";
import { collection, addDoc, onSnapshot, query, orderBy, deleteDoc, doc } from "firebase/firestore";

export default function App() {
  const [currentTurn, setCurrentTurn] = useState(null);
  const [queue, setQueue] = useState([]);
  const [role, setRole] = useState("cliente");

  useEffect(() => {
    const q = query(collection(db, "turnos"), orderBy("timestamp", "asc"));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const list = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setQueue(list);
      setCurrentTurn(list[0]?.numero || 0);
    });
    return () => unsubscribe();
  }, []);

  const tomarTurno = async () => {
    const nuevoTurno = (queue[queue.length - 1]?.numero || 0) + 1;
    await addDoc(collection(db, "turnos"), {
      numero: nuevoTurno,
      timestamp: new Date(),
    });
    alert(`Tu turno es: ${nuevoTurno}`);
    imprimirTurno(nuevoTurno);
    enviarWhatsapp(nuevoTurno);
  };

  const siguienteTurno = async () => {
    if (queue.length > 0) {
      const docId = queue[0].id;
      await deleteDoc(doc(db, "turnos", docId));
    }
  };

  const imprimirTurno = (turno) => {
    const printWindow = window.open('', '', 'width=300,height=200');
    printWindow.document.write(`<h1>Lubricadora XYZ</h1><p>Turno: <strong>${turno}</strong></p>`);
    printWindow.document.close();
    printWindow.print();
  };

  const enviarWhatsapp = (turno) => {
    const mensaje = `Hola, tu turno en Lubricadora XYZ es: ${turno}`;
    const numero = prompt("Ingrese número de WhatsApp (con código país, ej: 573001112222):");
    if (numero) {
      window.open(`https://wa.me/${numero}?text=${encodeURIComponent(mensaje)}`);
    }
  };

  return (
    <div className="text-center p-10">
      <h1 className="text-3xl font-bold mb-6">Turnos - Lubricadora</h1>
      <div className="mb-4">
        <button onClick={() => setRole("cliente")} className="mr-2 px-3 py-1 bg-gray-200 rounded">Cliente</button>
        <button onClick={() => setRole("admin")} className="px-3 py-1 bg-gray-400 text-white rounded">Administrador</button>
      </div>
      {role === "cliente" && (
        <>
          <div className="bg-blue-100 p-4 rounded-xl mt-4">
            <p className="text-lg">Turno actual:</p>
            <p className="text-4xl font-bold text-blue-700">{currentTurn || '-'}</p>
          </div>
          <button onClick={tomarTurno} className="mt-6 px-4 py-2 bg-blue-600 text-white rounded-xl">Tomar Turno</button>
        </>
      )}
      {role === "admin" && (
        <>
          <h2 className="text-xl font-bold">Panel Administrativo</h2>
          <div className="mt-4 text-left max-w-md mx-auto">
            <h3 className="font-semibold mb-2">Cola de Turnos:</h3>
            <ul className="bg-gray-100 rounded-xl p-4">
              {queue.map(turno => (
                <li key={turno.id} className="mb-1">Turno #{turno.numero}</li>
              ))}
            </ul>
            <button onClick={siguienteTurno} className="mt-4 px-4 py-2 bg-green-600 text-white rounded-xl">Llamar siguiente turno</button>
          </div>
        </>
      )}
    </div>
  );
}
